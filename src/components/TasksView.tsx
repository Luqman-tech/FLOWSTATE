
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter, Calendar, User, MoreHorizontal, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function TasksView() {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'Completed' : 'To Do' }
        : task
    ));
  };

  const handleTaskCreated = (newTask: any) => {
    setTasks(prev => [...prev, newTask]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'default';
      case 'To Do': return 'outline';
      default: return 'outline';
    }
  };

  const filterTasksByStatus = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status.toLowerCase().replace(' ', '_') === status);
  };

  return (
    <div className="space-y-4 md:space-y-6 relative">
      {/* Header Actions - Mobile Optimized */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-10 w-full md:w-64"
            />
          </div>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="assignee">Assignee</SelectItem>
                <SelectItem value="due_date">Due Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="sm:hidden">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CreateTaskDialog
          trigger={
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          }
          onTaskCreated={handleTaskCreated}
        />
      </div>

      {/* Task Tabs - Mobile Optimized */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <span className="hidden sm:inline">All Tasks</span>
            <span className="sm:hidden">All</span>
            <span className="ml-1">({tasks.length})</span>
          </TabsTrigger>
          <TabsTrigger value="to_do" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <span className="hidden sm:inline">To Do</span>
            <span className="sm:hidden">Todo</span>
            <span className="ml-1">({filterTasksByStatus('to_do').length})</span>
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <span className="hidden sm:inline">In Progress</span>
            <span className="sm:hidden">Progress</span>
            <span className="ml-1">({filterTasksByStatus('in_progress').length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <span className="hidden sm:inline">Completed</span>
            <span className="sm:hidden">Done</span>
            <span className="ml-1">({filterTasksByStatus('completed').length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first task</p>
              <CreateTaskDialog
                trigger={
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Task
                  </Button>
                }
                onTaskCreated={handleTaskCreated}
              />
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </TabsContent>

        <TabsContent value="to_do" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('to_do').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks in To Do</p>
            </div>
          ) : (
            filterTasksByStatus('to_do').map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('in_progress').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks in progress</p>
            </div>
          ) : (
            filterTasksByStatus('in_progress').map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('completed').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No completed tasks</p>
            </div>
          ) : (
            filterTasksByStatus('completed').map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))
          )}
        </TabsContent>
      </Tabs>
      <FloatingActionButton />
    </div>
  );
}

function TaskCard({ task, onToggle }: { task: any; onToggle: (id: number) => void }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow duration-200 ${task.completed ? 'opacity-75' : ''}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start space-x-3 md:space-x-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
          />
          <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className={`font-semibold text-base md:text-lg break-words ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm break-words">{task.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                {task.priority}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {task.status}
              </Badge>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="truncate max-w-24 md:max-w-none">{task.assignee}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm text-gray-500">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="whitespace-nowrap">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 md:gap-2">
              {task.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
