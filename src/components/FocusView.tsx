import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timer, Play, Pause, RotateCcw, Target, BarChart3, Zap, Coffee } from 'lucide-react';
import { FloatingActionButton } from './ui/FloatingActionButton';

interface FocusSession {
  id: string;
  task: string;
  duration: number;
  completed: boolean;
  startTime: string;
  endTime?: string;
  breaks: number;
  productivity: number;
}

interface TimeTracking {
  date: string;
  totalFocusTime: number;
  totalBreakTime: number;
  sessions: number;
  productivity: number;
}

export function FocusView() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [currentMode, setCurrentMode] = useState<'focus' | 'break' | 'longBreak'>('focus');
  const [currentTask, setCurrentTask] = useState('');
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [timeTracking, setTimeTracking] = useState<TimeTracking[]>([]);
  const [isDistractionBlocked, setIsDistractionBlocked] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const focusTime = 25 * 60; // 25 minutes
  const breakTime = 5 * 60; // 5 minutes
  const longBreakTime = 15 * 60; // 15 minutes

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startSession = () => {
    if (!currentTask.trim()) {
      alert('Please enter a task to focus on');
      return;
    }
    setIsRunning(true);
    setTimeLeft(currentMode === 'focus' ? focusTime : currentMode === 'break' ? breakTime : longBreakTime);
  };

  const pauseSession = () => {
    setIsRunning(false);
  };

  const resetSession = () => {
    setIsRunning(false);
    setTimeLeft(currentMode === 'focus' ? focusTime : currentMode === 'break' ? breakTime : longBreakTime);
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (currentMode === 'focus') {
      const session: FocusSession = {
        id: Date.now().toString(),
        task: currentTask,
        duration: focusTime,
        completed: true,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        breaks: 0,
        productivity: Math.random() * 40 + 60, // Random productivity score 60-100
      };
      setSessions([session, ...sessions]);
      
      // Switch to break mode
      setCurrentMode('break');
      setTimeLeft(breakTime);
    } else {
      // Switch back to focus mode
      setCurrentMode('focus');
      setTimeLeft(focusTime);
    }
  };

  const toggleDistractionBlocking = () => {
    setIsDistractionBlocked(!isDistractionBlocked);
    // In a real app, this would integrate with browser extensions or system-level blocking
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const total = currentMode === 'focus' ? focusTime : currentMode === 'break' ? breakTime : longBreakTime;
    return ((total - timeLeft) / total) * 100;
  };

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(s => s.startTime.startsWith(today));
    const totalFocusTime = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const totalBreaks = todaySessions.reduce((sum, s) => sum + s.breaks, 0);
    const avgProductivity = todaySessions.length > 0 
      ? todaySessions.reduce((sum, s) => sum + s.productivity, 0) / todaySessions.length 
      : 0;

    return {
      focusTime: totalFocusTime,
      breaks: totalBreaks,
      sessions: todaySessions.length,
      productivity: avgProductivity,
    };
  };

  const todayStats = getTodayStats();

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Focus & Time Tracking</h2>
          <p className="text-gray-600">Stay focused and track your productivity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isDistractionBlocked ? 'default' : 'outline'}
            onClick={toggleDistractionBlocking}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isDistractionBlocked ? 'Blocking Active' : 'Block Distractions'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  {currentMode === 'focus' ? 'Focus Session' : 'Break Time'}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="text-center space-y-6">
                  {/* Timer Display */}
                  <div className="text-6xl font-mono font-bold text-gray-900">
                    {formatTime(timeLeft)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <Progress value={getProgressPercentage()} className="h-3" />
                  </div>

                  {/* Current Task */}
                  {currentMode === 'focus' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Current Task</label>
                      <input
                        type="text"
                        value={currentTask}
                        onChange={(e) => setCurrentTask(e.target.value)}
                        placeholder="What are you working on?"
                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isRunning}
                      />
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    {!isRunning ? (
                      <Button onClick={startSession} size="lg" disabled={currentMode === 'focus' && !currentTask.trim()}>
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={pauseSession} size="lg" variant="outline">
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetSession} variant="outline" size="lg">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Mode Indicators */}
                  <div className="flex items-center gap-4">
                    <Badge variant={currentMode === 'focus' ? 'default' : 'secondary'}>
                      <Target className="w-3 h-3 mr-1" />
                      Focus
                    </Badge>
                    <Badge variant={currentMode === 'break' ? 'default' : 'secondary'}>
                      <Coffee className="w-3 h-3 mr-1" />
                      Break
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and History */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(todayStats.focusTime / 60)}
                    </div>
                    <div className="text-sm text-gray-500">Minutes Focused</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {todayStats.sessions}
                    </div>
                    <div className="text-sm text-gray-500">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(todayStats.productivity)}
                    </div>
                    <div className="text-sm text-gray-500">Productivity %</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {todayStats.breaks}
                    </div>
                    <div className="text-sm text-gray-500">Breaks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-3">
                    {sessions.slice(0, 5).map(session => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{session.task}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(session.startTime).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {Math.round(session.duration / 60)}m
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round(session.productivity)}%
                          </div>
                        </div>
                      </div>
                    ))}
                    {sessions.length === 0 && (
                      <p className="text-gray-500 text-center py-4 text-sm">
                        No sessions yet today
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
} 