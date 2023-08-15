import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ForgotPasswordForm from "../../sections/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h3' paragraph>
          Forgot your password?
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Enter the email address associated with your account to receive the link to reset password.
        </Typography>

        <Link
          component={RouterLink}
          to='/auth/login'
          color='inherit'
          variant='subtitle2'
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          <CaretLeft />
          Go back to the Sign In page
        </Link>
      </Stack>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
