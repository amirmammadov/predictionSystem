export interface ContextProps {
  isAuthenticated: boolean;
  login: (val: string) => void;
  logout: () => void;
}

export interface IPropertyItem {
  value: string;
  index: number;
  dataID?: string;
  setActiveCard: (val: number | null) => void;
}

export interface FormValues {
  optionOne: string;
  optionTwo: string;
  processName: string;
}

export interface IProperty {
  id: number;
  value: string;
  status: string;
}
