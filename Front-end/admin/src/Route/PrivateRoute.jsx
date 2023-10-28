import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));
  // const [login, setLogin] = useState(true);
  // const [authenticated, setAuthenticated] = useState(false);
  let authenticated = 'false';

  useEffect(() => {
    authenticated = (JSON.parse(localStorage.getItem("authenticated")));
    // setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    // localStorage.setItem("authenticated", authenticated);
    // localStorage.setItem("login", login);
  }, []);

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />
  );
};

export default PrivateRoute;
