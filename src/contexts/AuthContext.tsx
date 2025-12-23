import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin?: boolean;
}

interface Application {
  id: string;
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  passportNumber: string;
  status: 'processing' | 'accepted';
  submittedAt: string;
}

interface AuthContextType {
  user: User | null;
  applications: Application[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  submitApplication: (fullName: string, email: string, passportNumber: string) => void;
  approveApplication: (applicationId: string) => void;
  getUserApplication: () => Application | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<(User & { password: string })[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    const storedApplications = localStorage.getItem('applications');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedApplications) setApplications(JSON.parse(storedApplications));

    // Create admin user if not exists
    const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const adminExists = existingUsers.some((u: User) => u.email === 'admin@evisa.gov');
    if (!adminExists) {
      const adminUser = {
        id: 'admin-1',
        name: 'مدير النظام',
        email: 'admin@evisa.gov',
        phone: '0000000000',
        password: 'admin123',
        isAdmin: true
      };
      const updatedUsers = [...existingUsers, adminUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, password: string): boolean => {
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      password,
      isAdmin: false
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const submitApplication = (fullName: string, email: string, passportNumber: string) => {
    if (!user) return;

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      fullName,
      email,
      passportNumber,
      status: 'processing',
      submittedAt: new Date().toISOString()
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  const approveApplication = (applicationId: string) => {
    const updatedApplications = applications.map(app =>
      app.id === applicationId ? { ...app, status: 'accepted' as const } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  const getUserApplication = () => {
    if (!user) return undefined;
    return applications.find(app => app.userId === user.id);
  };

  return (
    <AuthContext.Provider value={{
      user,
      applications,
      login,
      register,
      logout,
      submitApplication,
      approveApplication,
      getUserApplication
    }}>
      {children}
    </AuthContext.Provider>
  );
};
