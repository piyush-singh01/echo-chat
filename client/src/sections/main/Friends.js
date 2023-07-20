import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  Stack,
  Tab,
  Tabs,
  Button,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const UserList = () => {
    return (
        <>
            
        </>
    )
}

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newVal) => {
    setValue(newVal); //e.target.value?
  };
  return (
    <>
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
        {/* <DialogTitle>{"Friends"}</DialogTitle> */}
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Explore" />
            <Tab label="Friends" />
            <Tab label="Requests" />
          </Tabs>
        </Stack>
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.4}>
              {() => {
                switch (value) {
                  case 0:
                    break;
                  case 1:
                    break;
                  case 3:
                    break;
                }
              }}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Friends;
