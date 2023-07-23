import React from "react";
import PageNotFound from "../assets/Illustration/PageNotFound.svg";
import { Stack, Typography } from "@mui/material";

const Page404 = () => {
  return (
    <Stack sx={{ height: "100%", width: "100%" }} alignItems={'center'} justifyContent={'center'}>
      <img
        src={PageNotFound}
        alt="404 Not Found"
        style={{ height: "400px", width: "400px" }}
      />
      <Typography variant="subtitle2">
        The page you are looking for can not be found.
      </Typography>
    </Stack>
  );
};

export default Page404;
