import { useLocation } from 'react-router-dom';

export function useQuerys() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}