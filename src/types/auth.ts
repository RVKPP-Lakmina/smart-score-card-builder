export interface AuthContextProps {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
  }
  
  export interface AuthProviderProps {
    children: React.ReactNode;
  }