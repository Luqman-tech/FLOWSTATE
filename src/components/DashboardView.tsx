
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, CheckSquare, Clock, TrendingUp, Users, Target, ArrowRight, Star, Zap, Plus, X, Calendar, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function DashboardView() {
  const { toast } = useToast();

  const stats = [];

  const recentTasks = [];

  const projects = [];

  const quickActions = [];

  const [fabOpen, setFabOpen] = React.useState(false);
  const handleFabToggle = () => setFabOpen((open) => !open);
  const handleNavigate = (viewId: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId } }));
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'task':
        // Navigate to tasks view
        window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId: 'tasks' } }));
        toast({
          title: "Create Task",
          description: "Navigating to tasks page...",
        });
        break;
      case 'meeting':
        // Navigate to calendar view
        window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId: 'calendar' } }));
        toast({
          title: "Schedule Meeting",
          description: "Navigating to calendar page...",
        });
        break;
      case 'time':
        // Navigate to time tracking view
        window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId: 'time' } }));
        toast({
          title: "Track Time",
          description: "Navigating to time tracking page...",
        });
        break;
      case 'reports':
        toast({
          title: "View Reports",
          description: "Opening reports dashboard...",
        });
        break;
    }
  };

  const handleQuickStart = () => {
    toast({
      title: "Quick Start",
      description: "Starting your productivity session...",
    });
  };

  const handleViewAllTasks = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId: 'tasks' } }));
    toast({
      title: "View All Tasks",
      description: "Navigating to tasks page...",
    });
  };

  const handleStarProject = (projectName: string) => {
    toast({
      title: "Project Starred",
      description: `${projectName} has been added to favorites`,
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-blue-100">You have 8 tasks due today. Let's get productive!</p>
          </div>
          <Button 
            variant="secondary" 
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            onClick={handleQuickStart}
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Start
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => handleQuickAction(action.action)}
          >
            <CardContent className="p-4 text-center">
              <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <p className="font-medium text-blue-900">{action.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</p>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-700 font-medium">{stat.change}</span>
                    <TrendingUp className="h-3 w-3 text-blue-700 ml-1" />
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
                <span>Recent Tasks</span>
              </CardTitle>
              <CardDescription>Your latest task activities</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-200 hover:bg-blue-50"
              onClick={handleViewAllTasks}
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-4 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 group-hover:text-blue-700 transition-colors">{task.title}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'} className={task.priority === 'High' ? 'bg-blue-600' : ''}>
                          {task.priority}
                        </Badge>
                        <span className="text-sm text-blue-600 flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {task.due}
                        </span>
                        <span className="text-sm text-blue-600">{task.assignee}</span>
                      </div>
                    </div>
                    <Badge variant={task.status === 'Completed' ? 'default' : task.status === 'In Progress' ? 'secondary' : 'outline'} className={task.status === 'Completed' ? 'bg-blue-600' : ''}>
                      {task.status}
                    </Badge>
                  </div>
                  {task.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">Progress</span>
                        <span className="font-medium text-blue-900">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Active Projects</span>
            </CardTitle>
            <CardDescription>Track your project milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="space-y-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">{project.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={project.priority === 'High' ? 'destructive' : 'default'} className={project.priority === 'High' ? 'bg-blue-600' : 'bg-blue-500'}>
                          {project.priority}
                        </Badge>
                        <Badge variant={
                          project.status === 'On Track' ? 'default' : 
                          project.status === 'Ahead' ? 'default' : 'destructive'
                        } className={project.status !== 'At Risk' ? 'bg-blue-600' : ''}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <Star 
                      className="h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer transition-colors" 
                      onClick={() => handleStarProject(project.name)}
                    />
                  </div>
                  <Progress value={project.progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-blue-600">
                    <span>{project.progress}% complete</span>
                    <span>Due {project.dueDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <Users className="h-4 w-4 mr-1" />
                    {project.team} team members
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
