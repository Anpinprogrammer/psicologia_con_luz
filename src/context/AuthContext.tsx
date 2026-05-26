import { createContext, useContext, useState, useEffect } from 'react'
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase'

export interface AuthUser {
  name:     string
  email:    string
  avatar:   string
  provider: 'google' | 'email'
}

interface AuthContextType {
  user:    User | null
  setUser: (user: User | null) => void
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }> 
  signInWithGoogle: (m: string) => void
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user:    null,
  setUser: () => {},
  loading: false,
  signUp: async()=>({ error:null }),
  signInWithGoogle: async(m: string) => {},
  signIn: async() => ({ error: null }),
  signOut: async () => {} 
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null)
      }
    )
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async (m : string) => {
    await supabase.auth.signInWithOAuth({
      provider:'google',
    
      options:{
        redirectTo:`${window.location.origin}/auth/callback?mode=${m}`
      }
    })
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
        },
      },
    });

    if(!data.user){
      return { error: error as Error | null}
    }

    const userId = data.user.id
    await supabase
      .from('profiles')
      .insert({
        id:userId,
        name: fullName,
        role: 'patient'
      })
    return { error: error as Error | null };
  };

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut();
    setLoading(false)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)