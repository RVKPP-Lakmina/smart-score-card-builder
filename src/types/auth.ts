export interface AuthContextProps {
  accessToken: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthFormProps {
  setIsLoading: (loading: boolean) => void;
}

export interface FormData {
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface ShowPassword {
  password: boolean;
  confirmPassword: boolean;
}