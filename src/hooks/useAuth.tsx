
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setError(error.message);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        setError(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) {
        const errorMessage = error.message || 'Failed to sign in';
        setError(errorMessage);
        toast({
          title: "Sign In Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return { error: errorMessage };
      }
      
      return {};
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during sign in';
      console.error('Sign in error:', err);
      setError(errorMessage);
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (!error) {
        // Insert into your own users table
        await supabase.from('users').insert([
          { id: data.user.id, email: data.user.email }
        ]);
      }
      
      if (error) {
        const errorMessage = error.message || 'Failed to sign up';
        setError(errorMessage);
        toast({
          title: "Sign Up Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return { error: errorMessage };
      }
      
      toast({
        title: "Sign Up Successful",
        description: "Please check your email to verify your account.",
      });
      
      return {};
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during sign up';
      console.error('Sign up error:', err);
      setError(errorMessage);
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        const errorMessage = error.message || 'Failed to sign out';
        setError(errorMessage);
        toast({
          title: "Sign Out Failed",
          description: errorMessage,
          variant: "destructive",
        });
        return { error: errorMessage };
      }
      
      return {};
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during sign out';
      console.error('Sign out error:', err);
      setError(errorMessage);
      toast({
        title: "Sign Out Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signIn, signUp, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.warn('useAuth must be used within an AuthProvider. Returning null values.');
    return {
      user: null,
      session: null,
      signIn: async () => ({ error: 'Auth not available' }),
      signUp: async () => ({ error: 'Auth not available' }),
      signOut: async () => ({ error: 'Auth not available' }),
      loading: false,
      error: 'Auth provider not found'
    };
  }
  return context;
};
