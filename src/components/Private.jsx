
import Layout from "./global/Layout";
import { Outlet, Navigate } from "react-router-dom";

const Private = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? <Layout /> : <Navigate to="/login" />;
};

export default Private;