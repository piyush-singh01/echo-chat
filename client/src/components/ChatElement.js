import React from "react";

// MUI and Phosphor Imports
import { Box, Stack, Typography, Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Component Imports
import StyledBadge from "./ui-components/StyledBadge";

const ChatElement = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#FFF",
      }}
      p={2}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent='space-between'>
        <Stack direction={"row"} spacing={2}>
          {props.online ? (
            <StyledBadge
              overlap='circular'
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant='dot'
            >
              <Avatar src={props.img} />
            </StyledBadge>
          ) : (
            <Avatar src={props.img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{props.name}</Typography>
            <Typography
              variant='caption'
              sx={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.msg}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {props.time}
          </Typography>
          <Badge color='primary' badgeContent={props.unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
