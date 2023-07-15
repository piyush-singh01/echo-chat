import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
  InputBase,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  MagnifyingGlass,
  Phone,
  PhoneCall,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import RHFAutoComplete from "../../components/hook-form/RHFAutoComplete";
import StyledBadge from "../../components/StyledBadge";
import { styled, alpha } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

// TODO: make it in a common file, in a new folder called Search in components and import
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  border: "thin solid",
  // backgroundColor: alpha(theme.palette.background.paper, 0),
  // TODO: Note here, background color is different, when creating a seperate resusable componet, need to keep this in mind
  backgroundColor: theme.palette.background.default,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvent: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(${theme.spacing(4)} + 1em)`,
    width: "100%",
  },
}));

const CallElement = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#FFF",
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {props.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
        </Stack>

        <Stack
          spacing={0.3}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"}>
            <IconButton>
              <PhoneCall color="green" />
            </IconButton>
            <IconButton color="primary">
              <VideoCamera />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

const StartCall = ({ open, handleClose }) => {
  // TODO: Create a reusable component
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Start Call"}</DialogTitle>

      <DialogContent sx={{ mt: 4 }}>
        <Stack sx={{ width: "100%" }} mb={2}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>
        </Stack>
        <CallElement />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartCall;
