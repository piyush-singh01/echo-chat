/* COMMONG DASHBOARD LAYOUT FOR USER ROUTES */

// IMPORTS
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/snackbar";
import useLocalStorage from "../../hooks/useLocalStorage";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const [user_id, _, __] = useLocalStorage('user_id')

  useEffect(() => {
    // ! Why are we even doing this? why reload
    // window.onload = function () {
    // this logic here ensures that page is reloaded only once
    //   if (!window.location.hash) {
    //     window.location = window.location + "#loaded";
    //     window.location.reload();
    //   }
    // };
    // window.onload(); // ? why tf are we calling an event listener

    if (!socket) {
      connectSocket(user_id);
    }

    socket.on("new_friend_request", (data) => {
      dispatch(showSnackBar({ severity: "success", message: data.message }));
    });

    socket.on("request_accepted", (data) => {
      dispatch(showSnackBar({ severity: "success", message: data.message }));
    });

    socket.on("request_sent", (data) => {
      dispatch(showSnackBar({ severity: "success", message: data.message }));
    });

    // socket.on('start_chat', (data) => {
    //   console.log(data);
    //   const exisiting_conversation = conversations.find((el) => el.id === data._id)
    //   if(exisiting_conversation) {
    //     dispatch(UpdateDirectConversation({conversation:data}));
    //   }
    // })

    // a clean up function, returned by useEffect hook, runs when any value in dependency array changes or when a component, mounted to the useEffect, unmounts.
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket]); // call when login state changes or socket changes

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
