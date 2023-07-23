import React from "react";
import { useSelector } from "react-redux";

// MUI Imports
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Component Imports
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessages";
import EmptyRightPane from "../../components/EmptyRightPane";


const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, room_id, chat_type } = useSelector((store) => store.app);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? `calc(100vw - 740px)` : `calc(100vw - 420px)`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#F0F4FA",
              borderBottom:
              room_id !== null && chat_type === "indivisual"
                ? "none"
                : "6px solid #0162C4",
        }}
      >
        {/* Render conversation here, or something else depending on the page */}
        {room_id !== null && chat_type === "indivisual" ? (
          <Conversation />
        ) : (
          <EmptyRightPane />
        )}
      </Box>

      {/* Render the Contact info here now */}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessage />;
            case "SHARED":
              return <SharedMessages />;
            default:
              return <Contact />;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
