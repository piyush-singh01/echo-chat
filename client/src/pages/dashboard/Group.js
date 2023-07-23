import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

// MUI and Phosphor Imports
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
  InputBase,
  Avatar,
  Badge,
} from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { CircleDashed, MagnifyingGlass, Plus } from "phosphor-react";

// Component Imports
import StyledBadge from "../../components/StyledBadge";
import { ChatList } from "../../data";
import CreateGroup from "../../sections/main/CreateGroup";
import SearchBar from "../../components/SearchBar";
import Conversation from "../../components/Conversation";
import EmptyRightPane from "../../components/EmptyRightPane";
import { useSelector } from "react-redux";

// TODO: Send this chat element to components
const ChatElement = (props) => {
  const theme = useTheme();
  return (
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

const Group = () => {
  const theme = useTheme();

  const [isOpenNewGroupDialogue, setIsOpenNewGroupDialogue] = useState(false);
  const handleOpenGroupDialogue = () => {
    setIsOpenNewGroupDialogue(true);
  };
  const handleCloseGroupDialogue = () => {
    setIsOpenNewGroupDialogue(false);
  };

  const { room_id, chat_type } = useSelector((state) => state.app);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ height: "100%" }}>
            <Stack
              alignItems={"center"}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="h5">Groups</Typography>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>

            {/* *********** */}
            <SearchBar />
            {/* *********** */}
            <Stack spacing={1}>
              <Stack
                justifyContent={"space-between"}
                alignItems={"center"}
                direction={"row"}
              >
                <Typography variant="subtitle2" sx={{}} component={Link}>
                  Create New Group
                </Typography>
                <IconButton onClick={handleOpenGroupDialogue}>
                  <Plus style={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>

            {/* *************** */}
            <Scrollbars
              className="scroll-bars"
              autoHide
              autoHideTimeout={500}
              autoHideDuration={100}
            >
              <Stack
                spacing={2}
                direction={"column"}
                sx={{ flexGrow: 1, height: "100%" }}
              >
                <Stack spacing={2.4}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.text.default }}
                  >
                    Pinned Groups
                  </Typography>
                  {ChatList.filter((ele) => ele.pinned).map((ele) => {
                    return <ChatElement {...ele} />;
                  })}
                </Stack>
                {/**/}
                <Stack spacing={2.4}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.text.default }}
                  >
                    All Groups
                  </Typography>
                  {ChatList.filter((ele) => !ele.pinned).map((ele) => {
                    return <ChatElement {...ele} />;
                  })}
                </Stack>
              </Stack>
            </Scrollbars>
            {/*  */}
          </Stack>
        </Box>
        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        >
          {room_id !== null && chat_type === "indivisual" ? (
            // TODO: what else can be rendered here?
            <Conversation />
          ) : (
            <EmptyRightPane />
          )}
        </Box>
      </Stack>
      {isOpenNewGroupDialogue && (
        <CreateGroup
          open={isOpenNewGroupDialogue}
          handleClose={handleCloseGroupDialogue}
        />
      )}
    </>
  );
};

export default Group;
