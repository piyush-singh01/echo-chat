import React from "react";
import { useDispatch } from "react-redux";
import { UpdateSidebar } from "../../redux/slices/app";
import Scrollbars from "react-custom-scrollbars-2";

import { Box, IconButton, Stack, Typography, Tabs, Tab, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";

import { DocumentMessage, LinkMessage } from "../conversation/MessageTypes";
import { Shared_docs, Shared_links } from "../../data";

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
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
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
              backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
            }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebar("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant='subtitle2'>Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Media' />
          <Tab label='Links' />
          <Tab label='Docs' />
        </Tabs>

        {/* BODY */}
        <Scrollbars>
          <Stack
            sx={{
              //   height: "100%",
              position: "relative",
              flexGrow: 1,
              backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            }}
            p={2}
            spacing={2}
          >
            {(() => {
              switch (value) {
                case 0:
                  return (
                    <Grid container spacing={2}>
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((el, idx) => {
                        return (
                          <Grid key={idx} item xs={4}>
                            <img src={faker.image.avatar()} alt={faker.name.fullName()}></img>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
                // Media
                case 1:
                  return Shared_links.map((ele, idx) => {
                    return <LinkMessage key={idx} ele={ele} />;
                  });
                // Links
                case 2:
                  return Shared_docs.map((ele, idx) => {
                    return <DocumentMessage key={idx} ele={ele} />;
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
