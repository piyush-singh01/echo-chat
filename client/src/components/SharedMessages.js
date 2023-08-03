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
import { UpdateSidebar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import Scrollbars from "react-custom-scrollbars-2";
import { Shared_docs, Shared_links } from "../data";
import { DocumentMessage, LinkMessage } from "./Conversation/MessageTypes";

const SharedMessages = () => {
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
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
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
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background.default,
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebar("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

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
            {(() => {
              switch (value) {
                case 0:
                  return (
                    <Grid container spacing={2}>
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => {
                        return (
                          <Grid item xs={4}>
                            <img
                              src={faker.image.avatar()}
                              alt={faker.name.fullName()}
                            ></img>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
                  // Media
                case 1:
                  return Shared_links.map((ele) => {
                    return <LinkMessage ele={ele} />;
                  });
                  // Links
                case 2:
                  return Shared_docs.map((ele) => {
                    return <DocumentMessage ele={ele} />;
                  });
                  //Docs
                default:
                  //Media
                  break;
              }
            })()}
          </Stack>
        </Scrollbars>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
