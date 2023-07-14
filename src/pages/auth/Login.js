import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import AuthSocial from "../../sections/settings/auth/AuthSocial";
import LoginForm from "../../sections/settings/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Stack spacing={1} sx={{ mb: 4, position: "relative" }}>
        <Typography variant="h4">Login to Tawk</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>
          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
          >
            Create an account
          </Link>
        </Stack>
        {/* Login Form */}
        <LoginForm />
        {/* Social Methods of Login */}
        <AuthSocial /> 
      </Stack>
    </>
  );
};

export default LoginPage;
