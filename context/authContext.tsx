import { AnimatedBootSplash } from "@/components/AnimatedBootsplash";
import {
  BalooThambi2_400Regular,
  BalooThambi2_500Medium,
  useFonts
} from '@expo-google-fonts/baloo-thambi-2';
import auth from '@react-native-firebase/auth';
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  user: any | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  user: null,
  logIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [splashVisible, setSplashVisible] = useState(true);
  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    'BalooThambi2-Regular': BalooThambi2_400Regular,
    'BalooThambi2-Medium': BalooThambi2_500Medium,
  });

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/login");
    } catch (error: any) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isReady) {
      const timer = setTimeout(() => {
        setSplashVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, isReady]);

  return (
    <AnimatedBootSplash
      animationEnded={!splashVisible}
      onAnimationEnd={() => {
        setSplashVisible(false);
      }}
    >
      <AuthContext.Provider
        value={{
          isReady,
          isLoggedIn,
          user,
          logIn,
          signUp,
          logOut,
        }}
      >
        {fontsLoaded ? children : null}
      </AuthContext.Provider>
    </AnimatedBootSplash>
  );
}