import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios predefinidos para testing
const predefinedUsers: User[] = [
  {
    id: 1,
    email: 'admin@alpha.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@alpha.com',
    password: 'user123',
    name: 'Usuario Demo',
    role: 'user'
  },
  {
    id: 3,
    email: 'test@alpha.com',
    password: 'test123',
    name: 'Usuario Test',
    role: 'user'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = predefinedUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Verificar si hay usuario guardado en localStorage al cargar
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
