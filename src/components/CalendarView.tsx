
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, CalendarGrid, CalendarCell } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Clock, Users, MapPin, Video, Sparkles, Settings } from 'lucide-react';
import { FloatingActionButton } from './ui/FloatingActionButton';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'meeting' | 'task' | 'focus' | 'break';
  attendees?: string[];
  location?: string;
  description?: string;
  color: string;
  isRecurring?: boolean;
  recurringPattern?: string;
}

interface TimeBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'focus' | 'meeting' | 'break' | 'task';
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: number;
}

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isAIScheduling, setIsAIScheduling] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const generateAITimeBlocks = () => {
    // AI-powered time blocking logic would go here
    // This would analyze tasks, priorities, and availability to suggest optimal time blocks
    setTimeBlocks([]);
  };

  const handleCreateEvent = (eventData: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title || '',
      date: eventData.date || selectedDate.toISOString().split('T')[0],
      time: eventData.time || '09:00',
      duration: eventData.duration || 60,
      type: eventData.type || 'meeting',
      color: eventData.color || '#3B82F6',
      ...eventData,
    };
    setEvents([...events, newEvent]);
    setIsCreatingEvent(false);
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getTimeBlocksForDate = (date: Date) => {
    // Filter time blocks for the selected date
    return timeBlocks;
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar & Time Blocking</h2>
          <p className="text-gray-600">AI-powered scheduling and time management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setViewMode('month')}>
            Month
          </Button>
          <Button variant="outline" onClick={() => setViewMode('week')}>
            Week
          </Button>
          <Button variant="outline" onClick={() => setViewMode('day')}>
            Day
          </Button>
          <Button onClick={generateAITimeBlocks} disabled={isAIScheduling}>
            <Sparkles className="w-4 h-4 mr-2" />
            AI Schedule
          </Button>
          <Dialog open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Event title..." />
                <Input type="date" />
                <Input type="time" />
                <Input type="number" placeholder="Duration (minutes)" />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Meeting</Button>
                  <Button variant="outline" className="flex-1">Task</Button>
                  <Button variant="outline" className="flex-1">Focus</Button>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreatingEvent(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleCreateEvent({})}>
                    Create Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Calendar
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Meetings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>Focus</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Time Blocks */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Time Blocks
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {getTimeBlocksForDate(selectedDate).map(block => (
                      <div
                        key={block.id}
                        className="p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{block.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {block.startTime} - {block.endTime}
                            </p>
                          </div>
                          <Badge
                            variant={
                              block.priority === 'high' ? 'destructive' :
                              block.priority === 'medium' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {block.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {block.estimatedDuration} min
                          </span>
                          {block.type === 'meeting' && (
                            <>
                              <Users className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Team</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {selectedDate.toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                    style={{ borderLeftColor: event.color, borderLeftWidth: '4px' }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">
                        {event.time} • {event.duration} min
                      </p>
                      {event.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {event.type === 'meeting' && event.attendees && (
                        <Badge variant="outline" className="text-xs">
                          {event.attendees.length} attendees
                        </Badge>
                      )}
                      {event.isRecurring && (
                        <Badge variant="secondary" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                {getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No events scheduled for this date
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
}
