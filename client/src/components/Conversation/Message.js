import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { TimeLine, TextMessage, MediaMessage, ReplyMessage, LinkMessage, DocumentMessage } from "./MessageTypes";

const Message = ({menu}) => {
  return (
    <>
      <Box p={3}>
        <Stack spacing={3}>
          {Chat_History.map((ele, idx) => {
            switch (ele.type) {
              case "divider":
                return <TimeLine key={idx} {...ele} />
              case "msg":
                switch (ele.subtype) {
                  case "img":
                    return <MediaMessage key={idx} {...ele} menu={menu} />
                  case "doc":
                    return <DocumentMessage key={idx} {...ele} menu={menu} />
                  case "link":
                    return <LinkMessage key={idx} {...ele} menu={menu} />
                  case "reply":
                    return <ReplyMessage key={idx} {...ele} menu={menu} />
                  default:
                    return <TextMessage key={idx} {...ele} menu={menu} />
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
