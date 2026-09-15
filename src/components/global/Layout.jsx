
import React from "react";
import Header from "./Header";
import Myside from "./Myside";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-1 overflow-hidden">
          <Myside collapsed={collapsed} />
          <div className="w-full h-full p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
