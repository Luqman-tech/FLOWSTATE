
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

export function TasksView() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new landing page",
      description: "Create mockups and wireframes for the new product landing page",
      priority: "High",
      status: "In Progress",
      assignee: "Sarah Chen",
      dueDate: "2025-01-15",
      tags: ["Design", "Frontend"],
      completed: false
    },
    {
      id: 2,
      title: "Implement user authentication",
      description: "Add login, logout, and registration functionality",
      priority: "High",
      status: "To Do",
      assignee: "Alex Kumar",
      dueDate: "2025-01-20",
      tags: ["Backend", "Security"],
      completed: false
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document all REST API endpoints with examples",
      priority: "Medium",
      status: "In Progress",
      assignee: "Maria Rodriguez",
      dueDate: "2025-01-18",
      tags: ["Documentation", "API"],
      completed: false
    },
    {
      id: 4,
      title: "Setup CI/CD pipeline",
      description: "Configure automated testing and deployment",
      priority: "Medium",
      status: "Completed",
      assignee: "John Smith",
      dueDate: "2025-01-10",
      tags: ["DevOps", "Automation"],
      completed: true
    },
    {
      id: 5,
      title: "User feedback analysis",
      description: "Analyze customer feedback from last quarter",
      priority: "Low",
      status: "To Do",
      assignee: "Emily Davis",
      dueDate: "2025-01-25",
      tags: ["Research", "Analysis"],
      completed: false
    }
  ]);

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
    <div className="space-y-4 md:space-y-6">
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
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="to_do" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('to_do').map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('in_progress').map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 md:space-y-4 mt-4 md:mt-6">
          {filterTasksByStatus('completed').map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>
      </Tabs>
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
