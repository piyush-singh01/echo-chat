import React, { useState } from "react";
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
import { Scrollbars } from "react-custom-scrollbars-2";
import StyledBadge from "../../components/StyledBadge";
import { CallList } from "../../data";
import CallLogElement from "../../components/CallLogElement";
import StartCall from "../../sections/main/StartCall";
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";
import EmptyRightPane from "../../components/EmptyRightPane";
import Conversation from "../../components/Conversation";

// TODO: Create a seperate component for this chat element
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
            <Typography variant="caption">{props.msg}</Typography>
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

const Call = () => {
  const theme = useTheme();

  const [isStartCallDialogueOpen, setIsStartCallDialogueOpen] = useState(false);
  const handleOpenCallDialogue = () => {
    setIsStartCallDialogueOpen(true);
  };
  const handleCloseCallDialogue = () => {
    setIsStartCallDialogueOpen(false);
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
              <Typography variant="h5">Call Logs</Typography>
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
                  New Call
                </Typography>
                <IconButton onClick={handleOpenCallDialogue}>
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
                <Stack spacing={2.4} mt={1}>
                  {CallList.map((ele) => {
                    return <CallLogElement {...ele} />;
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
          {/* We don't need to render a new conversation here. */}
          <EmptyRightPane />
        </Box>
      </Stack>
      {isStartCallDialogueOpen && (
        <StartCall
          open={isStartCallDialogueOpen}
          handleClose={handleCloseCallDialogue}
        />
      )}
    </>
  );
};

export default Call;
