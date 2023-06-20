import { Outlet, useNavigate } from "react-router-dom";
import { useUserQuery } from "../services/userAPI";
import { useEffect } from "react";

const AuthMiddleware = () => {
  const { data, isFetching } = useUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && !data) {
      navigate("/login");
    }
  }, [data, isFetching]);

  return <Outlet />;
};

export default AuthMiddleware;
