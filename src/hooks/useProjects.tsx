
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: string;
  priority?: string;
  start_date?: string;
  end_date?: string;
  budget_allocated?: number;
  budget_spent?: number;
  progress?: number;
  created_by?: number;
  created_at: string;
  updated_at?: string;
}

export const useProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      console.log('Fetching projects...');
      
      if (!user) {
        console.log('No user found, returning empty array');
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
          toast({
            title: "Error Loading Projects",
            description: "Failed to load projects. Please try again.",
            variant: "destructive",
          });
          return [];
        }
        
        console.log('Projects fetched:', data);
        return data as Project[];
      } catch (err) {
        console.error('Unexpected error fetching projects:', err);
        toast({
          title: "Error Loading Projects",
          description: "An unexpected error occurred while loading projects.",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!user,
    retry: 2,
    retryDelay: 1000,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (newProject: Partial<Project>) => {
      console.log('Creating project:', newProject);
      
      if (!user) {
        throw new Error('User must be logged in to create projects');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...newProject,
          created_by: Number(user?.id),
          progress: 0,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        throw new Error(error.message || 'Failed to create project');
      }
      
      console.log('Project created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project created",
        description: "Your project has been created successfully.",
      });
    },
    onError: (error: Error) => {
      console.error('Create project error:', error);
      toast({
        title: "Error Creating Project",
        description: error.message || "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Project> }) => {
      console.log('Updating project:', id, updates);
      
      if (!user) {
        throw new Error('User must be logged in to update projects');
      }

      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        throw new Error(error.message || 'Failed to update project');
      }
      
      console.log('Project updated:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      console.error('Update project error:', error);
      toast({
        title: "Error Updating Project",
        description: error.message || "Failed to update project. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    projects,
    isLoading,
    error: error?.message || null,
    refetch,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
  };
};
