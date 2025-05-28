
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter, Calendar, User, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Input 
            placeholder="Search tasks..." 
            className="w-64"
          />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="assignee">Assignee</SelectItem>
              <SelectItem value="due_date">Due Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Task Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
          <TabsTrigger value="to_do">To Do ({filterTasksByStatus('to_do').length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({filterTasksByStatus('in_progress').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterTasksByStatus('completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="to_do" className="space-y-4 mt-6">
          {filterTasksByStatus('to_do').map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="in_progress" className="space-y-4 mt-6">
          {filterTasksByStatus('in_progress').map((task) => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
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
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge variant="outline">
                {task.status}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                {task.assignee}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
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
