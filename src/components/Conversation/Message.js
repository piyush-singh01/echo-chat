import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocumentMessage } from "./MessageTypes";

const Message = () => {
  return (
    <>
      <Box p={3}>
        <Stack spacing={3}>
          {Chat_History.map((ele) => {
            switch (ele.type) {
              case "divider":
                return <TimeLine {...ele} />
              case "msg":
                switch (ele.subtype) {
                  case "img":
                    return <MediaMessage {...ele} />
                  case "doc":
                    return <DocumentMessage {...ele} />
                  case "link":
                    return <LinkMessage {...ele} />
                  case "reply":
                    return <ReplyMessage {...ele} />
                  default:
                    return <TextMessage {...ele} />
                }
              default:
                <></>;
                break;
            }
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Message;
