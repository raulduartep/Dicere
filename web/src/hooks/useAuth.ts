import { useContext } from 'react';
import AuthContext from '../contexts/auth';

export const useAuth = () => {
  const { invalidate, isValidated, validate } = useContext(AuthContext);

  return {
    signIn: validate,
    isSigned: isValidated,
    signOut: invalidate,
  };
};
