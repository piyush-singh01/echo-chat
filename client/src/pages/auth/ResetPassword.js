import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 4, position: "relative" }}>
        <Typography variant='h3' paragraph={true}>
          Reset Password
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>Enter the new password.</Typography>
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
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
