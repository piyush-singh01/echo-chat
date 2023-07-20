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
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers());
  }, []);
  const { users } = useSelector((state) => state.app);
  return (
    <>
      <h1>Hello</h1>
      {users.map((user, idx) => {
        return <>{user}</>; // TODO: Render User Component here
      })}
    </>
  );
};

const FriendList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);
  const { friends } = useSelector((state) => state.app);
  return (
    <>
      <h1>Hello</h1>
      {friends.map((friend, idx) => {
        return <>{friend}</>; // TODO: Render User Component here
      })}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, []);
  const { friendRequests } = useSelector((state) => state.app);
  return (
    <>
      <h1>Hello</h1>
      {friendRequests.map((friendRequest, idx) => {
        return <>{friendRequest}</>; // TODO: Render User Component here
      })}
    </>
  );
};

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
              {(() => {
                switch (value) {
                  case 0: // all users
                    return <UserList />;
                  case 1: // all friends
                    return <FriendList />;
                  case 2: // all friend requests
                    return <FriendRequestList />;
                }
              })()}
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
