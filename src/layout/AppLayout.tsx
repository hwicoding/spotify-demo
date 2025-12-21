import React from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <div>
            SideBar
            <Outlet />
        </div>
    );
};
export default AppLayout;