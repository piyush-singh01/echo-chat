import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import Scrollbars from "react-custom-scrollbars-2";

const Conversation = () => {
  const theme = useTheme();
  return (
    <>
      <Stack height={"100%"} maxHeight={"100vh"} width={"100%"}>
        <Header />
        <Scrollbars>
          <Box width={"100%"} sx={{ flexGrow: 1, height: "100%" }}>
            <Message menu={true} />
          </Box>
        </Scrollbars>
        <Footer />
      </Stack>
    </>
  );
};

export default Conversation;
