import { useLocation } from 'react-router-dom';

export function useQuery<T extends { [key: string]: string }>(): T {
  const queryParams = new URLSearchParams(useLocation().search);

  return Object.fromEntries(queryParams) as T;
}
