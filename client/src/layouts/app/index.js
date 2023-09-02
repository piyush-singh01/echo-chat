/* COMMON DASHBOARD LAYOUT FOR USER ROUTES */

// IMPORTS
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/snackbar";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoadingSocket from "../../components/misc/LoadingSocket";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.conversation.direct_chat);

  const [user_id, ,] = useLocalStorage("user_id");

  useEffect(() => {
    if (!socket && isLoggedIn) {
      connectSocket(user_id);
      console.log(socket);
    }

    if (!isLoggedIn) {
      console.log(socket);
      disconnectSocket();
    }

    // clean up function
    return () => {};
  }, [isLoggedIn]); // call when login state changes, or during the initial run

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction={"row"}>
      <Sidebar />
      {socket ? <Outlet /> : <LoadingSocket />}
    </Stack>
  );
};

export default DashboardLayout;
