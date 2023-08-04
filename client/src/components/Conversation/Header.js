import React from "react";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import StyledBadge from "../ui-components/StyledBadge";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
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
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%", width: "100%" }}
        >
          <Stack
            onClick={() => dispatch(ToggleSidebar())}
            direction={"row"}
            spacing={2}
            sx={{cursor:"pointer"}}
          >
            {/*Event Listener for toggling sidebar */}
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  alt={faker.name.fullName()}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            </Box>
            <Stack
              direction={"column"}
              sx={{ height: "100%" }}
              justifyContent={"center"}
              spacing={0.2}
            >
              <Typography>{faker.name.fullName()}</Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <CaretDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
