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
import { Button } from '@/components/ui/button';
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
  Award,
  FileText,
  Brain,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { AuthDialog } from '@/components/AuthDialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
    viewId: "tasks"
  },
  {
    title: "Projects",
    url: "#projects",
    icon: Kanban,
    description: "Track progress",
    viewId: "projects"
  },
  {
    title: "Focus",
    url: "#focus",
    icon: Timer,
    description: "Time tracking & focus",
    viewId: "focus"
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

export function AppSidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (c: boolean) => void }) {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const { tasks } = useTasks();
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);

  // Calculate today's progress
  const todaysTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.created_at).toDateString();
    return taskDate === today;
  });
  
  const completedTodaysTasks = todaysTasks.filter(task => task.completed);
  const progressPercentage = todaysTasks.length > 0 
    ? Math.round((completedTodaysTasks.length / todaysTasks.length) * 100)
    : 0;

  const handleNavigation = (viewId: string) => {
    if (!user && viewId !== 'dashboard') {
      setAuthDialogOpen(true);
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature.",
      });
      return;
    }
    
    // Dispatch custom event to communicate with MainContent
    window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId } }));
    toast({
      title: "Navigation",
      description: `Switched to ${viewId.charAt(0).toUpperCase() + viewId.slice(1)} view`,
    });
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    if (!user) {
      setAuthDialogOpen(true);
      toast({
        title: "Authentication Required",
        description: "Please sign in to create tasks.",
      });
      return;
    }
    
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to sign out. Please try again.';
      toast({
        title: "Error",
        description: errMsg,
        variant: "destructive",
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

  // Sidebar navigation with tooltips and active highlighting
  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  return (
    <div className={`${sidebarWidth} transition-all duration-200 h-full`}>
      <Sidebar className="border-r-0 shadow-xl bg-white h-full" aria-label="Main navigation">
        <SidebarHeader className="border-b px-6 py-5 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg text-blue-800">FlowState</span>
                <span className="text-xs text-blue-600">Your productivity hub</span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '»' : '«'}
          </Button>
        </SidebarHeader>
        <SidebarContent className="flex-1 flex flex-col justify-between">
          <SidebarMenu>
            {navigationItems.map((item, idx) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <SidebarMenuItem
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${window.location.hash === item.url ? 'bg-blue-100 text-blue-800 font-bold' : 'hover:bg-blue-50 text-blue-700'}`}
                    tabIndex={0}
                    aria-current={window.location.hash === item.url ? 'page' : undefined}
                    onClick={() => handleNavigation(item.viewId)}
                    onKeyDown={e => { if (e.key === 'Enter') handleNavigation(item.viewId); }}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuItem>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </SidebarMenu>
          <SidebarMenu>
            {bottomItems.map((item, idx) => (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <SidebarMenuItem
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${window.location.hash === item.url ? 'bg-blue-100 text-blue-800 font-bold' : 'hover:bg-blue-50 text-blue-700'}`}
                    tabIndex={0}
                    aria-current={window.location.hash === item.url ? 'page' : undefined}
                    onClick={() => handleNavigation(item.viewId)}
                    onKeyDown={e => { if (e.key === 'Enter') handleNavigation(item.viewId); }}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuItem>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t px-4 py-3 flex items-center justify-between">
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-blue-600 hover:text-blue-800 w-full">
              {collapsed ? <span>⎋</span> : 'Sign Out'}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setAuthDialogOpen(true)} className="text-blue-600 hover:text-blue-800 w-full">
              {collapsed ? <span>⇥</span> : 'Sign In'}
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
}
