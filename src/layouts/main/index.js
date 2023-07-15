import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";

const isAuthenticated = true;
const MainLayout = () => {
  if(isAuthenticated) {
    return <Navigate to="/app" />;
  }
  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%", mt: 7 }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
