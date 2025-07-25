
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Calendar, TrendingUp } from 'lucide-react';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function GoalsView() {
  const goals = [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Productivity': return 'bg-blue-100 text-blue-800';
      case 'Project': return 'bg-green-100 text-green-800';
      case 'Learning': return 'bg-purple-100 text-purple-800';
      case 'Team': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Goals Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Goals & Objectives</h2>
          <p className="text-blue-600">Track your progress and achieve your targets</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{goals.length}</div>
            <p className="text-blue-600 text-sm">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Avg Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">55%</div>
            <p className="text-green-600 text-sm">Overall completion</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Due Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">2</div>
            <p className="text-purple-600 text-sm">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-blue-900">{goal.title}</h3>
                    <p className="text-blue-600 text-sm">{goal.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Progress: {goal.current} / {goal.target}</span>
                    <span className="text-blue-700 font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-blue-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-300">
                    Update Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <FloatingActionButton />
    </div>
  );
}
