import { createContext, useState, useContext, ReactNode } from 'react';
import { ApiClient } from '../api/apiClient';

type UserContextType = {
  selectedUser: ApiClient.UserDTO | null;
  setSelectedUser: (user: ApiClient.UserDTO | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<ApiClient.UserDTO | null>(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
