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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebar } from "../../redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "../ui-components/AntSwitch";
import Scrollbars from "react-custom-scrollbars-2";

const BlockDialogue = ({ open, handleClose }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Block Contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} color="error">Block</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialogue = ({ open, handleClose }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete Chat"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete chats with this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

const ContactInfo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleBlockDialogueClose = () => {
    setIsBlockOpen(false);
  };

  const handleDeleteDialogueClose = () => {
    setIsDeleteOpen(false);
  };

  return (
    <Box sx={{ width: 320, height: "100%" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(ToggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Scrollbars>
          <Stack
            sx={{
              height: "100%",
              position: "relative",
              marginBottom: 8,
              flexGrow: 1,
            }}
            p={2}
            spacing={2}
          >
            <Stack alignItems={"center"} direction={"row"} spacing={3}>
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.firstName()}
                sx={{ height: 64, width: 64 }}
              />
              <Stack spacing={0.5}>
                <Typography variant="article" fontWeight={600}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {"+91 05959 95959"}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-evenly"}
            >
              <Stack alignItems={"center"} spacing={1}>
                <IconButton>
                  <Phone />
                </IconButton>

                <Typography variant="overline">Voice</Typography>
              </Stack>
              <Stack alignItems={"center"} spacing={1}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">Video</Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                About
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Random text in the about section, long to test for overflow
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle2">Media, Links & Docs</Typography>
              <Button
                onClick={() => {
                  dispatch(UpdateSidebar("SHARED"));
                }}
                endIcon={<CaretRight />}
              >
                401
              </Button>
            </Stack>
            <Stack direction={"row"} alignItems="center" spacing={2}>
              {[1, 2, 3].map((el) => (
                <Box>
                  <img
                    src={faker.image.city()}
                    alt={faker.internet.userName()}
                  />
                </Box>
              ))}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Star size={21} />
                <Typography variant="subtitle2">Starred Messages</Typography>
              </Stack>

              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebar("STARRED"));
                }}
              >
                <CaretRight />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Bell size={21} />
                <Typography variant="subtitle2">Mute Notifications</Typography>
              </Stack>
              <AntSwitch />
            </Stack>
            <Divider />
            <Typography variant="body2">1 group in common</Typography>
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Avatar
                src={faker.image.imageUrl()}
                alt={faker.name.fullName()}
              />
              <Stack direction="column" spacing={0.5}>
                <Typography variant="subtitle2">The Boyz</Typography>
                <Typography variant="caption">
                  Owl, Parrot, Rabbit , You
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Button
                onClick={() => {
                  setIsBlockOpen(true);
                }}
                fullWidth
                startIcon={<Prohibit />}
                variant="outlined"
              >
                Block
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteOpen(true);
                }}
                fullWidth
                startIcon={<Trash />}
                variant="outlined"
                color="error" // TODO: see the palette, error doesn't sound right.
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Scrollbars>
      </Stack>
      {isBlockOpen && (
        <BlockDialogue
          open={isBlockOpen}
          handleClose={handleBlockDialogueClose}
        />
      )}
      {isDeleteOpen && (
        <DeleteDialogue
          open={isDeleteOpen}
          handleClose={handleDeleteDialogueClose}
        />
      )}
    </Box>
  );
};

export default ContactInfo;
