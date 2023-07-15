import React from "react";
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
import { CallList, ChatList } from "../../data";
import CallLogElement from "../../components/CallLogElement";

// TODO: make it in a common file, in a new folder called Search in components and import
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
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
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." />
              </Search>
            </Stack>
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
                <IconButton onClick={() => {}}>
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
      </Stack>
    </>
  );
};

export default Call;
