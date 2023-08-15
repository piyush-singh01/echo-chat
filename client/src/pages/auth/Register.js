import { Stack, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import AuthSocial from "../../sections/auth/AuthSocial";
import RegisterForm from "../../sections/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 4, position: "relative" }}>
        <Typography variant='h4'>Get started with Tawk.</Typography>

        <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'> Already have an account? </Typography>

          <Link component={RouterLink} to={"/auth/login"} variant='subtitle2'>
            Sign in
          </Link>
        </Stack>
      </Stack>
      <RegisterForm />
      <Typography
        component='div'
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption", // This typography sx is only valid in MUI.
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline='always' color='text.primary'>
          Terms of Service
        </Link>
        {" and "}
        <Link underline='always' color='text.primary'>
          Privacy Policy
        </Link>
        .
      </Typography>

      <AuthSocial />
    </>
  );
};

export default RegisterPage;
