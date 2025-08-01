
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, Square, Calendar, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function TimeTrackingView() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    setCurrentTime(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    );
  }, [seconds]);

  const handleStartPause = () => {
    setIsTracking(!isTracking);
    toast({
      title: isTracking ? "Timer Paused" : "Timer Started",
      description: isTracking ? "Time tracking has been paused" : "Time tracking has started",
    });
  };

  const handleStop = () => {
    setIsTracking(false);
    setSeconds(0);
    setCurrentTime('00:00:00');
    toast({
      title: "Timer Stopped",
      description: "Time tracking has been stopped and reset",
    });
  };

  const timeEntries = [];

  const todayTotal = "00:00:00";
  const weekTotal = "00:00:00";

  return (
    <div className="space-y-6 relative">
      {/* Time Tracker Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-blue-800">Current Session</CardTitle>
            <div className="text-3xl font-mono text-blue-900 mt-4">{currentTime}</div>
          </CardHeader>
          <CardContent className="flex justify-center space-x-2">
            <Button
              onClick={handleStartPause}
              className={`${isTracking ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isTracking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isTracking ? 'Pause' : 'Start'}
            </Button>
            <Button variant="outline" className="border-blue-300" onClick={handleStop}>
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800 flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today
            </CardTitle>
            <div className="text-2xl font-mono text-green-900 mt-4">{todayTotal}</div>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-800 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              This Week
            </CardTitle>
            <div className="text-2xl font-mono text-purple-900 mt-4">{weekTotal}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">{entry.task}</h4>
                    <p className="text-sm text-blue-600">{entry.project}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-blue-800">{entry.duration}</span>
                  <Badge variant="secondary" className="bg-blue-200 text-blue-700">
                    {entry.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <FloatingActionButton />
    </div>
  );
}
