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
import {
  FriendComponent,
  FriendRequestComponent,
  UserComponent,
} from "../../components/Friends";

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
      {users?.map((user, idx) => {
        // user contains _id firstName, lastName, email, password?  // ? no need to send all right? TODO: send only required data
        return <UserComponent key={user._id} {...user} />;
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
      {friends?.map((friend, idx) => {
        // {friend: {_id, firstName, lastName...}}
        return <FriendComponent key={friend._id} {...friend} />; // TODO: Render User Component here
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
      {friendRequests?.map((friendRequest, idx) => {
        return (
          <FriendRequestComponent
            key={friendRequest._id}
            {...friendRequest.sender}
          />
        ); // TODO: Render User Component here
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
