
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckSquare, Clock, TrendingUp, Users, Target } from 'lucide-react';

export function DashboardView() {
  const stats = [
    {
      title: "Active Tasks",
      value: "24",
      change: "+12%",
      icon: CheckSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Completed Today",
      value: "8",
      change: "+3",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Time Tracked",
      value: "6.5h",
      change: "+1.2h",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const recentTasks = [
    { id: 1, title: "Review project proposal", priority: "High", due: "Today", status: "In Progress" },
    { id: 2, title: "Update documentation", priority: "Medium", due: "Tomorrow", status: "Pending" },
    { id: 3, title: "Team meeting preparation", priority: "High", due: "Today", status: "Completed" },
    { id: 4, title: "Client presentation", priority: "High", due: "Friday", status: "In Progress" },
  ];

  const projects = [
    { name: "Website Redesign", progress: 75, dueDate: "Dec 15", team: 5, status: "On Track" },
    { name: "Mobile App", progress: 45, dueDate: "Jan 30", team: 8, status: "At Risk" },
    { name: "Marketing Campaign", progress: 90, dueDate: "Dec 1", team: 3, status: "Ahead" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
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
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              <span>Recent Tasks</span>
            </CardTitle>
            <CardDescription>Your latest task activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {task.due}
                      </span>
                    </div>
                  </div>
                  <Badge variant={task.status === 'Completed' ? 'default' : 'outline'}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Project Progress</span>
            </CardTitle>
            <CardDescription>Track your project milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <Badge variant={
                      project.status === 'On Track' ? 'default' : 
                      project.status === 'Ahead' ? 'default' : 'destructive'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{project.progress}% complete</span>
                    <span>Due {project.dueDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {project.team} team members
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
