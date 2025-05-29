
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, Square, Calendar, BarChart3 } from 'lucide-react';

export function TimeTrackingView() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00:00');

  const timeEntries = [
    {
      id: 1,
      task: "Design landing page",
      project: "Website Redesign",
      duration: "02:30:15",
      date: "2025-01-15",
      status: "completed"
    },
    {
      id: 2,
      task: "User authentication",
      project: "Mobile App",
      duration: "01:45:30",
      date: "2025-01-15",
      status: "completed"
    },
    {
      id: 3,
      task: "API documentation",
      project: "Backend API",
      duration: "03:15:20",
      date: "2025-01-14",
      status: "completed"
    }
  ];

  const todayTotal = "07:31:05";
  const weekTotal = "42:15:30";

  return (
    <div className="space-y-6">
      {/* Time Tracker Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-blue-800">Current Session</CardTitle>
            <div className="text-3xl font-mono text-blue-900 mt-4">{currentTime}</div>
          </CardHeader>
          <CardContent className="flex justify-center space-x-2">
            <Button
              onClick={() => setIsTracking(!isTracking)}
              className={`${isTracking ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isTracking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isTracking ? 'Pause' : 'Start'}
            </Button>
            <Button variant="outline" className="border-blue-300">
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
    </div>
  );
}
