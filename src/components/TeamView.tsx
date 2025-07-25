
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, Mail, Calendar, Activity } from 'lucide-react';
import { FloatingActionButton } from './ui/FloatingActionButton';

export function TeamView() {
  const teamMembers = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'away': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="space-y-6 relative">
      {/* Team Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Team Members</h2>
          <p className="text-blue-600">Collaborate and manage your team</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{teamMembers.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Active Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {teamMembers.filter(m => m.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              {teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Avg Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">
              {Math.round(teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0) / teamMembers.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-blue-900">{member.name}</h3>
                      <p className="text-blue-600 text-sm">{member.role}</p>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-blue-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Current task:</strong> {member.currentTask}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Completed tasks: <span className="font-medium">{member.tasksCompleted}</span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-blue-300">
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-300">
                      View Profile
                    </Button>
                  </div>
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
