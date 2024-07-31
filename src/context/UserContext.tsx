import { createContext, useState, useContext, ReactNode } from 'react';
import { Participant } from '../types/types';

type UserContextType = {
  selectedUser: Participant | null;
  setSelectedUser: (user: Participant | null) => void;
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
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
