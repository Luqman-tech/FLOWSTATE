
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  completed: boolean;
  due_date?: string;
  project_id?: number;
  assignee_id?: number;
  created_by?: number;
  created_at: string;
  updated_at?: string;
}

export const useTasks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      console.log('Fetching tasks...');
      
      if (!user) {
        console.log('No user found, returning empty array');
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching tasks:', error);
          toast({
            title: "Error Loading Tasks",
            description: "Failed to load tasks. Please try again.",
            variant: "destructive",
          });
          return [];
        }
        
        console.log('Tasks fetched:', data);
        return data as Task[];
      } catch (err) {
        console.error('Unexpected error fetching tasks:', err);
        toast({
          title: "Error Loading Tasks",
          description: "An unexpected error occurred while loading tasks.",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!user,
    retry: 2,
    retryDelay: 1000,
  });

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Partial<Task>) => {
      console.log('Creating task:', newTask);
      
      if (!user) {
        throw new Error('User must be logged in to create tasks');
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          ...newTask,
          created_by: Number(user?.id),
          completed: false,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating task:', error);
        throw new Error(error.message || 'Failed to create task');
      }
      
      console.log('Task created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      });
    },
    onError: (error: Error) => {
      console.error('Create task error:', error);
      toast({
        title: "Error Creating Task",
        description: error.message || "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Task> }) => {
      console.log('Updating task:', id, updates);
      
      if (!user) {
        throw new Error('User must be logged in to update tasks');
      }

      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating task:', error);
        throw new Error(error.message || 'Failed to update task');
      }
      
      console.log('Task updated:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      console.error('Update task error:', error);
      toast({
        title: "Error Updating Task",
        description: error.message || "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log('Deleting task:', id);
      
      if (!user) {
        throw new Error('User must be logged in to delete tasks');
      }

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting task:', error);
        throw new Error(error.message || 'Failed to delete task');
      }
      
      console.log('Task deleted:', id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Task deleted",
        description: "Your task has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      console.error('Delete task error:', error);
      toast({
        title: "Error Deleting Task",
        description: error.message || "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    tasks,
    isLoading,
    error: error?.message || null,
    refetch,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
