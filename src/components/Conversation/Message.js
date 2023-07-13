import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocumentMessage } from "./MessageTypes";

const Message = ({menu}) => {
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
                    return <MediaMessage {...ele} menu={menu} />
                  case "doc":
                    return <DocumentMessage {...ele} menu={menu} />
                  case "link":
                    return <LinkMessage {...ele} menu={menu} />
                  case "reply":
                    return <ReplyMessage {...ele} menu={menu} />
                  default:
                    return <TextMessage {...ele} menu={menu} />
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
