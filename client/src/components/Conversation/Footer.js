import React, { useState } from "react";
import {
  Stack,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Tooltip
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";

const StyledInput = styled(TextField)(({ theme }) => ({
  // Note ".MuiInputBase-input" is the classname itself
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({ setIsPickerOpen }) => {
  const theme = useTheme();
  const toggleEmojiPicker = () => {
    setIsPickerOpen((prev) => !prev);
  }

  const toggleAttachmentPicker = () => {
    setIsAttachmentPickerOpen((prev) => !prev);
  }

  const [isAttachmentPickerOpen, setIsAttachmentPickerOpen] = useState(false);
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={3}
      sx={{ width: "100%" }}
    >
      <StyledInput
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        InputProps={{
          disableUnderline: true,
          // TODO: transition?
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              <Stack sx={{ position: "relative" , display: isAttachmentPickerOpen ? "inline-block": "none"}}>
                {Actions.map((ele, idx) => (
                  <Tooltip key={idx} title={ele.title} placement="right">
                    <Fab
                      sx={{
                        position: "absolute",
                        top: -ele.y,
                        backgroundColor: ele.color,
                      }}
                      color="primary" // on hover this effecting
                      aria-label="add"
                    >
                      {ele.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
                <IconButton onClick={() => toggleAttachmentPicker()}>
                  <LinkSimple />
                </IconButton>
            </Stack>
          ),
          endAdornment: (
              <IconButton onClick={() => toggleEmojiPicker()}>
                <Smiley />
              </IconButton>
          ),
        }}
      />
      <Box
        sx={{
          height: 48,
          width: 48,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack
          sx={{ height: "100%", width: "100%" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton>
            <PaperPlaneTilt color="#fff" />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};

const Footer = () => {
  const theme = useTheme();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#FAF8FF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
        p={2}
      >
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: isPickerOpen ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 81,
              right: 90,
            }}
          >
            {/*Sure?, fixed positioning? well yeah */}
            <Picker
              data={data}
              /*onEmojiSelect={}*/ theme={theme.palette.mode}
            />
          </Box>
          <ChatInput setIsPickerOpen={setIsPickerOpen} />
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
