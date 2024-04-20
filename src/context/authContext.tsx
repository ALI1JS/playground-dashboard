import React, { createContext, useContext, useState } from "react";
import Dashboard from "../pages/home";
import OwnerDetailsPage from "../pages/owner-details";
import UsersActivation from "../pages/users-activation";
import OwnersDisplay from "../pages/owners";
import Nav from "../components/nav/nav.comp";

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  login: (username: string, role: string) => Promise<string>;
  logout: () => void;
  user: User;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => 'Not implemented',
  logout: () => {},
  user: { username: 'ALI', isAuthenticated: false }
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthWrapper: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', isAuthenticated: false });

  const login = (username: string, role: string): Promise<string> => {
    // Simulating API call
    return new Promise((resolve, reject) => {
      if (username === "ali" && role === "admin") {
        setUser({ username: username, isAuthenticated: true });
        resolve('Success');
      } else {
        reject('Unauthorized');
      }
    });
  };

  const logout = (): void => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      <>
        <Dashboard />
        <OwnerDetailsPage />
        <UsersActivation />
        <OwnersDisplay />
        <Nav />
      </>
    </AuthContext.Provider>
  );
};
