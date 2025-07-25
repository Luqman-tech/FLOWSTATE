
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Users, MoreHorizontal, Target, TrendingUp } from 'lucide-react';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function ProjectsView() {
  const [projects, setProjects] = useState([]);

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
    <div className="space-y-4 md:space-y-6 relative">
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
              {projects.reduce((acc, p) => acc + (p.teamMembers?.length || 0), 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Create your first project to get started</p>
            <CreateProjectDialog
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              }
              onProjectCreated={handleProjectCreated}
            />
          </div>
        ) : (
          projects.map((project) => (
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
                      {project.tasks?.completed || 0}/{project.tasks?.total || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">
                      ${(project.budget?.spent || 0).toLocaleString()}/${(project.budget?.allocated || 0).toLocaleString()}
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
                    {project.teamMembers?.slice(0, 4).map((member, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                        title={member.name}
                      >
                        {member.avatar}
                      </div>
                    )) || (
                      <span className="text-xs text-gray-500">No team members assigned</span>
                    )}
                    {(project.teamMembers?.length || 0) > 4 && (
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                        +{(project.teamMembers?.length || 0) - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  )) || <span className="text-xs text-gray-500">No tags</span>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <FloatingActionButton />
    </div>
  );
}
