
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckSquare, 
  Kanban, 
  BarChart3, 
  Users, 
  Settings, 
  Clock,
  Target,
  Zap,
  Award
} from 'lucide-react';

const navigationItems = [
  {
    title: "Dashboard",
    url: "#dashboard",
    icon: BarChart3,
    description: "Overview & insights",
  },
  {
    title: "Tasks",
    url: "#tasks",
    icon: CheckSquare,
    description: "Manage your work",
    badge: "8",
  },
  {
    title: "Projects",
    url: "#projects",
    icon: Kanban,
    description: "Track progress",
    badge: "3",
  },
  {
    title: "Calendar",
    url: "#calendar",
    icon: Calendar,
    description: "Schedule & events",
  },
  {
    title: "Time Tracking",
    url: "#time",
    icon: Clock,
    description: "Monitor productivity",
  },
  {
    title: "Goals",
    url: "#goals",
    icon: Target,
    description: "Set & achieve",
  },
];

const quickActions = [
  {
    title: "Quick Task",
    icon: Zap,
    color: "text-blue-600",
  },
  {
    title: "Achievements",
    icon: Award,
    color: "text-purple-600",
  },
];

const bottomItems = [
  {
    title: "Team",
    url: "#team",
    icon: Users,
    description: "Collaborate together",
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
    description: "Customize your workspace",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 shadow-xl bg-white">
      <SidebarHeader className="border-b px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Horizon Work Studio
            </span>
            <span className="text-xs text-gray-500">Your productivity hub</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-1"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-xs font-medium text-gray-700">{action.title}</span>
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 group"
                  >
                    <a href={item.url} className="flex items-center justify-between px-3 py-3">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progress Indicator */}
        <SidebarGroup>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Today's Progress</span>
              <span className="text-sm font-bold text-blue-600">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">6 of 8 tasks completed</p>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4 bg-gray-50/50">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                className="hover:bg-gray-100 transition-all duration-200 rounded-lg group"
              >
                <a href={item.url} className="flex items-center space-x-3 px-3 py-2">
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
