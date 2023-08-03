//TODO: Similar for chat element as well?

import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

import StyledBadge from "./StyledBadge";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from "phosphor-react";

const CallLogElement = (props) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#FFF",
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Stack direction={"row"} spacing={2}>
            {props.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.name.fullName()}
                />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            )}
            <Stack spacing={0.3}>
              <Typography
                variant="subtitle2"
                sx={{
                  maxWidth: "125px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {faker.name.fullName()}
              </Typography>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {props.incoming ? (
                  <ArrowDownLeft color={props.missed ? "red" : "green"} />
                ) : (
                  <ArrowUpRight color={props.missed ? "red" : "green"} />
                )}
                {/* TODO: Color to a bit more grey */}
                <Typography sx={{ fontWeight: 600 }} variant="caption">
                  Yesterday, 10:38
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <IconButton size="small">
            <Phone color="green" />
          </IconButton>
          <IconButton size="small" color="primary">
            <VideoCamera />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default CallLogElement;
