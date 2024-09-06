export interface ContextProps {
  isAuthenticated: boolean;
  login: (val: string) => void;
  logout: () => void;
}
