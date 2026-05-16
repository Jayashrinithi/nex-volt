import { Navigate } from "react-router-dom";

import { Auth } from "./auth";

function PrivateRoute({ children }) {
  return Auth.isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;