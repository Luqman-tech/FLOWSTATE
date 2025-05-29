
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Users, MoreHorizontal, Target, TrendingUp } from 'lucide-react';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';

export function ProjectsView() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      description: "Complete overhaul of the shopping experience with new UI/UX",
      status: "In Progress",
      progress: 65,
      startDate: "2024-12-01",
      endDate: "2025-02-15",
      teamMembers: [
        { name: "Sarah Chen", avatar: "SC" },
        { name: "Alex Kumar", avatar: "AK" },
        { name: "Maria Rodriguez", avatar: "MR" },
        { name: "John Smith", avatar: "JS" }
      ],
      tasks: { total: 24, completed: 16 },
      budget: { allocated: 50000, spent: 32000 },
      priority: "High",
      tags: ["Frontend", "UX/UI", "E-commerce"]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      status: "Planning",
      progress: 25,
      startDate: "2025-01-15",
      endDate: "2025-06-30",
      teamMembers: [
        { name: "Emily Davis", avatar: "ED" },
        { name: "Michael Brown", avatar: "MB" },
        { name: "Lisa Wang", avatar: "LW" }
      ],
      tasks: { total: 45, completed: 8 },
      budget: { allocated: 75000, spent: 15000 },
      priority: "High",
      tags: ["Mobile", "React Native", "API"]
    },
    {
      id: 3,
      name: "Data Analytics Dashboard",
      description: "Real-time analytics and reporting system for business insights",
      status: "In Progress",
      progress: 80,
      startDate: "2024-11-01",
      endDate: "2025-01-31",
      teamMembers: [
        { name: "David Wilson", avatar: "DW" },
        { name: "Anna Martinez", avatar: "AM" }
      ],
      tasks: { total: 18, completed: 14 },
      budget: { allocated: 30000, spent: 24000 },
      priority: "Medium",
      tags: ["Analytics", "Dashboard", "Data Viz"]
    },
    {
      id: 4,
      name: "Customer Support Portal",
      description: "Self-service portal with chatbot and knowledge base",
      status: "Completed",
      progress: 100,
      startDate: "2024-09-01",
      endDate: "2024-12-15",
      teamMembers: [
        { name: "Robert Kim", avatar: "RK" },
        { name: "Sophie Turner", avatar: "ST" }
      ],
      tasks: { total: 22, completed: 22 },
      budget: { allocated: 40000, spent: 38000 },
      priority: "Medium",
      tags: ["Support", "Chatbot", "Knowledge Base"]
    }
  ]);

  const handleProjectCreated = (newProject: any) => {
    setProjects(prev => [...prev, newProject]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'default';
      case 'Planning': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 text-sm md:text-base">Manage and track your project portfolio</p>
        </div>
        <CreateProjectDialog
          trigger={
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">New</span>
            </Button>
          }
          onProjectCreated={handleProjectCreated}
        />
      </div>

      {/* Stats Cards - Mobile Optimized Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              <span className="text-xs md:text-sm font-medium text-gray-600">Total</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{projects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              <span className="text-xs md:text-sm font-medium text-gray-600">Active</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {projects.filter(p => p.status === 'In Progress').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              <span className="text-xs md:text-sm font-medium text-gray-600">Done</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {projects.filter(p => p.status === 'Completed').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
              <span className="text-xs md:text-sm font-medium text-gray-600">Team</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
              {projects.reduce((acc, p) => acc + p.teamMembers.length, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg break-words">{project.name}</CardTitle>
                  <p className="text-xs md:text-sm text-gray-600 break-words">{project.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={getStatusColor(project.status)} className="text-xs">
                  {project.status}
                </Badge>
                <Badge variant={getPriorityColor(project.priority)} className="text-xs">
                  {project.priority}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 md:space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Tasks and Budget - Mobile Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tasks</span>
                  <span className="font-medium">
                    {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">
                    ${project.budget.spent.toLocaleString()}/${project.budget.allocated.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Timeline - Mobile Optimized */}
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-gray-600">Timeline</span>
                <span className="font-medium text-right">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>

              {/* Team Members */}
              <div className="space-y-2">
                <span className="text-xs md:text-sm text-gray-600">Team</span>
                <div className="flex items-center space-x-2">
                  {project.teamMembers.slice(0, 4).map((member, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      title={member.name}
                    >
                      {member.avatar}
                    </div>
                  ))}
                  {project.teamMembers.length > 4 && (
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                      +{project.teamMembers.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
