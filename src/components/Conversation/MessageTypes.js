import {
  Divider,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DownloadSimple, Image } from "phosphor-react";
import React from "react";

export const DocumentMessage = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={props.incoming ? "start" : "end"}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: props.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction={"row"}
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Image size={42} />
              <Typography variant="caption">Image.png</Typography>
              <IconButton>
                <DownloadSimple size={32} />
              </IconButton>
            </Stack>
            <Typography
              variant="body2"
              color={props.incoming ? theme.palette.text : "#fff"}
            >
              {props.message}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const LinkMessage = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={props.incoming ? "start" : "end"}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: props.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack
            direction={"column"}
            p={1}
            spacing={2}
            alignItems={"start"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={props.preview}
              alt={props.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={0}>
              <Typography variant="subtitle2">Embed Caption</Typography>
              <Typography
                variant="subtitle2"
                xs={{ color: theme.palette.primary.main }}
                component={Link}
                to="//https://www.youtube.com" // what is this?
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={props.incoming ? theme.palette.text : "#fff"}
            >
              {props.message}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const ReplyMessage = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={props.incoming ? "start" : "end"}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: props.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction="column"
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color={theme.palette.text}>
                {props.message}
              </Typography>
            </Stack>
            <Stack direction={"row"}  justifyContent={props.incoming ? "start" : "end"}>
              <Typography
                variant="body2"
                color={props.incoming ? theme.palette.text : "#fff"}
              >
                {props.reply}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const MediaMessage = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={props.incoming ? "start" : "end"}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: props.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={1.4}>
            <img
              src={props.img}
              alt={props.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Typography
              variant="body2"
              color={props.incoming ? theme.palette.text : "#fff"}
            >
              {props.message}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export const TextMessage = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={props.incoming ? "start" : "end"}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: props.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography
            variant="body2"
            color={props.incoming ? theme.palette.text : "#fff"}
          >
            {props.message}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export const TimeLine = (props) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Divider width={"46%"} />
        <Typography variant="caption">{props.text}</Typography>
        <Divider width={"46%"} />
      </Stack>
    </>
  );
};
