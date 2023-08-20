// IMPORTS
import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Link, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CircleDashed, Plus } from "phosphor-react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CallList } from "../../data";

// Component Imports
import CallLogElement from "../../components/CallLogElement";
import StartCall from "../../sections/main/StartCall";
import SearchBar from "../../components/ui-components/SearchBar";
import EmptyRightPane from "../../components/misc/EmptyRightPane";

const Call = () => {
  const theme = useTheme();

  const [isStartCallDialogueOpen, setIsStartCallDialogueOpen] = useState(false);
  const handleOpenCallDialogue = () => {
    setIsStartCallDialogueOpen(true);
  };
  const handleCloseCallDialogue = () => {
    setIsStartCallDialogueOpen(false);
  };

  return (
    <>
      <Stack direction='row' sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            height: "100vh",
            width: 320,
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ height: "100%" }}>
            <Stack alignItems={"center"} direction='row' justifyContent='space-between'>
              <Typography variant='h5'>Call Logs</Typography>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>

            {/* *********** */}
            <SearchBar />
            {/* *********** */}
            <Stack spacing={1}>
              <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
                <Typography variant='subtitle2' sx={{}} component={Link}>
                  New Call
                </Typography>
                <IconButton onClick={handleOpenCallDialogue}>
                  <Plus style={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>

            {/* *************** */}
            <Scrollbars className='scroll-bars' autoHide autoHideTimeout={500} autoHideDuration={100}>
              <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, height: "100%" }}>
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
            backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.paper,
            
          }}
        >
          {/* We don't need to render a new conversation here. */}
          <EmptyRightPane />
        </Box>
      </Stack>
      {isStartCallDialogueOpen && (
        <StartCall open={isStartCallDialogueOpen} handleClose={handleCloseCallDialogue} />
      )}
    </>
  );
};

export default Call;
