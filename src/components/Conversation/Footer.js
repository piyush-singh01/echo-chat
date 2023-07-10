import React from "react";
import {
  Stack,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
} from "phosphor-react";


const StyledInput = styled(TextField)(({ theme }) => ({
    // Note ".MuiInputBase-input" is the classname itself
    "& .MuiInputBase-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  }));


const Footer = () => {
    const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#FAF8FF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{ width: "100%" }}
        >
          <StyledInput
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <IconButton>
                  <LinkSimple />
                </IconButton>
              ),
              endAdornment: (
                <IconButton>
                  <Smiley />
                </IconButton>
              ),
            }}
          />
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton>
                <PaperPlaneTilt color="#fff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
