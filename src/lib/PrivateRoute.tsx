import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
