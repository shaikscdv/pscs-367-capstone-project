import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

// eslint-disable-next-line react/prop-types
export default function AuthRoute({ children }) {
  const location = useLocation(); //Koi page thi student login kare toh student pacho ae page par ej avijai , ...returnUrl

  const { user } = useAuth();
  return (
    <>
      {user ? (
        children
      ) : (
        <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
      )}
    </>
  );
}
