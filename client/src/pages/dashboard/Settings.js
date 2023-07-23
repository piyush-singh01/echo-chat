import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Shortcuts from "../../sections/settings/Shortcuts";
import { useNavigate } from "react-router-dom";

// Assets Import
import Setting from "../../assets/Illustration/Setting.svg";

// MUI and Phosphor imports
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import ThemeDialogue from "../../sections/settings/ThemeDialogue";

const Settings = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isShortcutDialogOpen, setIsShortcutDialogOpen] = useState(false);
  const handleOpenShortcut = () => {
    setIsShortcutDialogOpen(true);
  };
  const handleCloseShortcut = () => {
    setIsShortcutDialogOpen(false);
  };

  const [isThemeDialogueOpen, setIsThemeDialogueOpen] = useState(false);
  const handleOpenTheme = () => {
    setIsThemeDialogueOpen(true);
  }
  const handleCloseTheme = () => {
    setIsThemeDialogueOpen(false);
  }

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: handleOpenTheme,
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcut,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            height: "100vh",
            width: "320px",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Scrollbars>
            <Stack p={4} spacing={3}>
              {/* Header */}
              <Stack direction="row" alignItems={"center"} spacing={3}>
                <IconButton onClick={() => navigate("/app")}>
                  <CaretLeft size={24} color={"#4B4B4B"} />
                </IconButton>

                <Typography variant="h5">Settings</Typography>
              </Stack>

              {/* Profile */}
              <Stack direction="row" spacing={3}>
                <Avatar
                  src={faker.image.avatar()}
                  sx={{ height: 56, width: 56 }}
                />
                <Stack spacing={0.5}>
                  <Typography variant="article">{`${faker.name.firstName()} ${faker.name.lastName()}`}</Typography>
                  <Typography variant="body2">
                    {faker.random.words()}
                  </Typography>
                </Stack>
              </Stack>
              {/* List */}
              <Stack spacing={4}>
                {list.map(({ key, icon, title, onclick }) => {
                  return (
                    <>
                      <Stack
                        onClick={onclick}
                        sx={{ cursor: "pointer" }}
                        spacing={2}
                      >
                        <Stack
                          alignItems={"center"}
                          direction="row"
                          spacing={2}
                        >
                          {icon}
                          <Typography variant="body2">{title}</Typography>
                        </Stack>
                        {key !== 7 && <Divider />}
                      </Stack>
                    </>
                  );
                })}
              </Stack>
            </Stack>
          </Scrollbars>
        </Box>
        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ height: "100%", width: "100%" }}
          >
            <img
              src={Setting}
              alt={"settings logo"}
              style={{ height: "400px", width: "400px" }}
            />
          </Stack>
        </Box>
      </Stack>
      <Shortcuts
        open={isShortcutDialogOpen}
        handleClose={() => {
          handleCloseShortcut();
        }}
      />
      <ThemeDialogue open={isThemeDialogueOpen} handleClose={handleCloseTheme} />
    </>
  );
};

export default Settings;
