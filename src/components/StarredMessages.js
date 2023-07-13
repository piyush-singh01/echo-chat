import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "./AntSwitch";
import Scrollbars from "react-custom-scrollbars-2";
import {
  BreakfastDiningOutlined,
  FormatAlignJustify,
} from "@mui/icons-material";
import { Shared_docs, Shared_links } from "../data";
import { DocumentMessage, LinkMessage } from "./Conversation/MessageTypes";
import Message from "./Conversation/Message";

const StarredMessage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 320, height: "100%" }}>
      <Stack
        sx={{
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              p: 2,
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebar("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>

        {/* BODY */}
        <Scrollbars>
          <Stack
            sx={{
              //   height: "100%",
              position: "relative",
              flexGrow: 1,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background.paper,
            }}
            p={2}
            spacing={2}
          >
            <Message menu={false} />
          </Stack>
        </Scrollbars>
      </Stack>
    </Box>
  );
};

export default StarredMessage;
