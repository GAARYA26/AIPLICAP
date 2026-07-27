import { createContext, useContext, useState } from "react";

// Frontend-only placeholder for auth state. No real user data is stored —
// just a boolean so the Navbar/pages can react to "logged in vs not".
// Replace this with real session/JWT handling once the Spring Boot auth
// API exists (e.g. call it inside `login()`, store the token, etc.).
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
