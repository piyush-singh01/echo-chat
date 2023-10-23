/* COMMON DASHBOARD LAYOUT FOR USER ROUTES */

// IMPORTS
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/snackbar";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoadingSocket from "../../components/misc/LoadingSocket";
import { GetMyProfile } from "../../redux/slices/app";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { allConversations } = useSelector((state) => state.direct_conversation);

  const [user_id, ,] = useLocalStorage("user_id");

  const [currSocket, setCurrSocket] = useState(socket);

  useEffect(() => {
    if (!socket && isLoggedIn) {
      connectSocket(user_id);
      setCurrSocket(socket);
    }

    if (!isLoggedIn) {
      console.log(socket);
      disconnectSocket();
      setCurrSocket(undefined);
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
      {currSocket ? <Outlet /> : <LoadingSocket />}
    </Stack>
  );
};

export default DashboardLayout;
