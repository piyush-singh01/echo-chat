import React from "react";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Sidebar from "./Sidebar";

// The main element('/')
// One component common in all will be the sidebar, so the side bar will be one part of the layout.
const DashboardLayout = () => {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
      {/* Passes this on to children basically. This Outlet will render child route elements. First this element is rendered here, and then it will render the index route of the child route elements(or nothing if there is not child). This allows nested UI to show up when child routes are rendered */}
    </Stack>
  );
};

export default DashboardLayout;
