import { ReactNode } from "react";

interface IShowFallback {
  isLoading: boolean;
  children: ReactNode;
  fallback: ReactNode;
}

export const ShowFallBack: React.FC<IShowFallback> = ({ 
  isLoading,
  fallback, 
  children 
}) => isLoading ? fallback : children