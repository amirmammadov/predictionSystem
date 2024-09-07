export interface ContextProps {
  isAuthenticated: boolean;
  login: (val: string) => void;
  logout: () => void;
}

export interface IPropertyItem {
  value: string;
  index: number;
  setActiveCard: (val: number | null) => void;
}
