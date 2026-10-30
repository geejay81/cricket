import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
type Props = {
  children: React.ReactNode;
};

export function AuthGuard({
  children,
}: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}