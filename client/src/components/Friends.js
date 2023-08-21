// Imports
import React from "react";
import { socket } from "../socket";
// UI Imports
import { Stack, Box, Typography, IconButton, Avatar, Button } from "@mui/material";
import StyledBadge from "./ui-components/StyledBadge";
import { useTheme } from "@mui/material/styles";
import { Chat } from "phosphor-react";

// Custom Hooks
import useLocalStorage from "../hooks/useLocalStorage";

export const UserComponent = ({ firstName, lastName, _id, online, img }) => {
  const theme = useTheme();
  const [user_id, _, __] = useLocalStorage('user_id');
  const name = `${firstName} ${lastName}`;
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      p={2}
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("friend_request", { to: _id, from: user_id }, () => {
                // _id from props, user_id from local storage.
                alert("request sent"); // TODO: not alert, call snackbar
              });
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const FriendRequestComponent = ({ firstName, lastName, _id, online, img, request_id }) => {
  const theme = useTheme();
  const [user_id, _, __] = useLocalStorage('user_id')
  const name = `${firstName} ${lastName}`;
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      p={2}
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button
            onClick={() => {
              socket.emit("accept_request", { request_id: request_id }, () => {
                // _id from props, user_id from local storage.
                alert("request sent"); // TODO: not alert, call snackbar
              });
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const FriendComponent = ({ firstName, lastName, _id, online, img }) => {
  const theme = useTheme();
  const [user_id, _, __] = useLocalStorage('user_id')
  const name = `${firstName} ${lastName}`;
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      p={2}
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              socket.emit("start_conversation", { to: _id, from: user_id });
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
