import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";

const GeneralApp = () => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: `calc(100vw - 420px)`,
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
      {/* <Contact /> */}
    </Stack>
  );
};

export default GeneralApp;
