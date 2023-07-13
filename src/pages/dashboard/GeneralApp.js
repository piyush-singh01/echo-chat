import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);     //Just using the sidebar from app. Get the 'app' slice from store from useSelector hook. Can access a specific slice from the store this way
  
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? `calc(100vw - 740px)`: `calc(100vw - 420px)`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#F0F4FA",
        }}
      >
        {/* Render conversation here, or something else depending on the page */}
        <Conversation />
      </Box>

      {/* Render the Contact info here now */}
      {sidebar.open && (() => {
        switch(sidebar.type) {
          case "CONTACT":
            return <Contact/>
          case "STARRED":
            return <StarredMessage />
          case "SHARED":
            return <SharedMessages />
          default:
            return <Contact/>
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;
