import { useAuth } from '@/contexts/AuthContext';

export function useIsAdmin() {
  const { user, isAdmin } = useAuth();
  
  // Check if user is admin based on email
  // Admin credentials: email: maqboolali741@gmail.com, password: Maqbool123456@@##
  if (!user) return false;
  
  // Check if email matches admin email
  return isAdmin || user.email?.toLowerCase() === 'maqboolali741@gmail.com' || user.user_metadata?.isAdmin === true;
}

