
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
import { useToast } from '@/hooks/use-toast';

const navigationItems = [
  {
    title: "Dashboard",
    url: "#dashboard",
    icon: BarChart3,
    description: "Overview & insights",
    viewId: "dashboard"
  },
  {
    title: "Tasks",
    url: "#tasks",
    icon: CheckSquare,
    description: "Manage your work",
    badge: "8",
    viewId: "tasks"
  },
  {
    title: "Projects",
    url: "#projects",
    icon: Kanban,
    description: "Track progress",
    badge: "3",
    viewId: "projects"
  },
  {
    title: "Calendar",
    url: "#calendar",
    icon: Calendar,
    description: "Schedule & events",
    viewId: "calendar"
  },
  {
    title: "Time Tracking",
    url: "#time",
    icon: Clock,
    description: "Monitor productivity",
    viewId: "time"
  },
  {
    title: "Goals",
    url: "#goals",
    icon: Target,
    description: "Set & achieve",
    viewId: "goals"
  },
];

const quickActions = [
  {
    title: "Quick Task",
    icon: Zap,
    color: "text-blue-600",
    action: "task"
  },
  {
    title: "Achievements",
    icon: Award,
    color: "text-blue-800",
    action: "achievements"
  },
];

const bottomItems = [
  {
    title: "Team",
    url: "#team",
    icon: Users,
    description: "Collaborate together",
    viewId: "team"
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
    description: "Customize your workspace",
    viewId: "settings"
  },
];

export function AppSidebar() {
  const { toast } = useToast();

  const handleNavigation = (viewId: string) => {
    // Dispatch custom event to communicate with MainContent
    window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId } }));
    toast({
      title: "Navigation",
      description: `Switched to ${viewId.charAt(0).toUpperCase() + viewId.slice(1)} view`,
    });
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    if (action === 'task') {
      handleNavigation('tasks');
      toast({
        title: "Quick Task",
        description: "Creating a new task...",
      });
    } else if (action === 'achievements') {
      toast({
        title: "Achievements",
        description: "Viewing your achievements...",
      });
    }
  };

  // Listen for navigation events in MainContent
  React.useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      // This could be used to update sidebar state if needed
      console.log('Navigation event received:', event.detail);
    };

    window.addEventListener('navigate', handleNavigationEvent as EventListener);
    return () => window.removeEventListener('navigate', handleNavigationEvent as EventListener);
  }, []);

  return (
    <Sidebar className="border-r-0 shadow-xl bg-white">
      <SidebarHeader className="border-b px-6 py-5 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-blue-800">
              Horizon Work Studio
            </span>
            <span className="text-xs text-blue-600">Your productivity hub</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={() => handleQuickAction(action.action)}
                  className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-1"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-xs font-medium text-blue-700">{action.title}</span>
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-blue-50 hover:text-blue-800 transition-all duration-200 rounded-xl mb-1 group"
                  >
                    <button 
                      onClick={() => handleNavigation(item.viewId)}
                      className="flex items-center justify-between px-3 py-3 w-full text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 text-xs bg-blue-200 text-blue-700">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progress Indicator */}
        <SidebarGroup>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Today's Progress</span>
              <span className="text-sm font-bold text-blue-700">75%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-blue-600 mt-2">6 of 8 tasks completed</p>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4 bg-blue-50/50">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                className="hover:bg-blue-100 transition-all duration-200 rounded-lg group"
              >
                <button 
                  onClick={() => handleNavigation(item.viewId)}
                  className="flex items-center space-x-3 px-3 py-2 w-full text-left"
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-blue-600">{item.description}</span>
                  </div>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
