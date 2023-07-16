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
  Grid,
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
import Scrollbars from "react-custom-scrollbars-2";

const list = [
  // {
  //   key: 0,
  //   title: "Mark as unread",
  //   combination: ["CTRL", "SHIFT", "U"],
  // },
  {
    key: 1,
    title: "Mute",
    combination: ["CTRL", "SHIFT", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["CTRL", "SHIFT", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["CTRL", "SHIFT", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["CTRL", "SHIFT", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["CTRL", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["CTRL", "SHIFT", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["CTRL", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "SHIFT", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["CTRL", "SHIFT", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["CTRL", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["SHIFT", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["SHIFT", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["SHIFT", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["CTRL", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["CTRL", "S"],
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Shortcuts = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={"md"}
        fullWidth
        sx={{ p: 4 }}
      >
        <DialogTitle>{"Keyboard Shortcuts"}</DialogTitle>
          <DialogContent sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {list.map(({ key, title, combination }) => {
                return (
                  <Grid item xs={6}>
                    <Stack
                      sx={{ width: "100%" }}
                      justifyContent="space-between"
                      key={key}
                      spacing={3}
                      direction={"row"}
                      alignItems="center"
                    >
                      <Typography variant="caption" sx={{ fontSize: 12 }}>
                        {title}
                      </Typography>
                      <Stack spacing={2} direction="row">
                        {combination.map((el) => {
                          return (
                            <Button
                              size="small"
                              sx={{ color: "#212121"}}
                              disabled
                              variant="contained"
                            >
                              {el}
                            </Button>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shortcuts;
