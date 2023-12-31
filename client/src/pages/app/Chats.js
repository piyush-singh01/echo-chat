import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Stack, IconButton, Button, Divider, Avatar, Badge } from "@mui/material";
import { ArchiveBox, CircleDashed, Plus, Users } from "phosphor-react";
import { ChatList } from "../../data";
import { Scrollbars } from "react-custom-scrollbars-2";
import StyledBadge from "../../components/ui-components/StyledBadge";
import Friends from "../../sections/app/Friends";
import { useDispatch, useSelector } from "react-redux";
import { SET } from "../../redux/slices/conversation";
import { socket } from "../../socket";
import SearchBar from "../../components/ui-components/SearchBar";
import useLocalStorage from "../../hooks/useLocalStorage";

const ChatElement = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#FFF",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      p={2}
      onClick={() => {
        dispatch(SelectConversation({ room_id: props._id })); // write now this id comes from fake data in ChatList
      }}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent="space-between">
        <Stack direction={"row"} spacing={2}>
          {props.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={props.img} />
            </StyledBadge>
          ) : (
            <Avatar src={props.img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{props.name}</Typography>
            <Typography
              variant="caption"
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
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {props.time}
          </Typography>
          <Badge color="primary" badgeContent={props.unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

const Chats = () => {
  const theme = useTheme();
  const [user_id, _, __] = useLocalStorage('user_id')

  // No, we are not gonna use web sockets for fetching dms.
  // useEffect(() => {
  //   socket.emit(
  //     "get_direct_conversations",
  //     ({ user_id },
  //     (data) => {
  //       // data is the exisiting conversation, this call back is passed to the socket event listerner in the server.
  //     })
  //   );
  // }, []);

  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const handleCloseDialogueBox = () => {
    setIsOpenDialogueBox(false);
  };
  const handleOpenDialogueBox = () => {
    setIsOpenDialogueBox(true);
  };

  const { conversations } = useSelector((state) => state.conversation.direct_chat);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* ***** */}
        <Stack spacing={2} p={3} sx={{ height: "100vh" }}>
          {/*Put it in an even bigger container and padding of 3*/}
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <IconButton onClick={handleOpenDialogueBox}>
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          {/* ***** */}
          <SearchBar />
          {/* ***** */}
          <Stack spacing={1}>
              <Button sx={{ width: "100%" }} onClick={handleOpenDialogueBox}>
                Start new Conversation
              </Button>
            <Divider />
          </Stack>
          {/* **** */}

          <Scrollbars className="scroll-bars" autoHide autoHideTimeout={500} autoHideDuration={100}>
            <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, height: "100%" }}>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: theme.palette.text.default }}>
                  Pinned Chats
                </Typography>
                {conversations.filter((ele) => ele.pinned).map((ele, idx) => {
                  return <ChatElement key={idx} {...ele} />;
                })}
              </Stack>
              {/**/}
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: theme.palette.text.default }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((ele) => !ele.pinned)
                  .map((ele, idx) => {
                    return <ChatElement key={idx} {...ele} />;
                  })}
              </Stack>
            </Stack>
          </Scrollbars>

          {/* **** */}
        </Stack>
      </Box>
      {isOpenDialogueBox && <Friends open={isOpenDialogueBox} handleClose={handleCloseDialogueBox} />}
    </>
  );
};

export default Chats;
