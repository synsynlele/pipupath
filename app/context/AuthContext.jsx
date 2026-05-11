"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { supabase }
from "../../lib/supabase/client";

const AuthContext =
  createContext({});

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ====================================
  // INITIAL SESSION
  // ====================================

  useEffect(() => {

    async function getSession() {

      const {
        data: { session }
      } = await supabase.auth
        .getSession();

      setUser(session?.user || null);

      setLoading(false);

    }

    getSession();

    // ====================================
    // AUTH LISTENER
    // ====================================

    const {
      data: authListener
    } = supabase.auth
      .onAuthStateChange(
        async (_event, session) => {

          setUser(
            session?.user || null
          );

          setLoading(false);

        }
      );

    return () => {

      authListener.subscription
        .unsubscribe();

    };

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

// ====================================
// CUSTOM HOOK
// ====================================

export function useAuth() {

  return useContext(AuthContext);

}