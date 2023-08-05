import React from "react";
import { Stack, Typography } from "@mui/material";
import EmptyChatBox2 from "../../assets/EmptyChatBox2.svg";

const EmptyRightPane = () => {
  return (
    <>
      <Stack
        direction={"column"}
        sx={{ height: "100%", width: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img
          src={EmptyChatBox2}
          alt="No Chat"
          style={{ height: "320px", width: "320px" }}
        />
        <Typography variant="subtitle2">
          Select a conversation or start a new one.
        </Typography>
      </Stack>
    </>
  );
};

export default EmptyRightPane;
