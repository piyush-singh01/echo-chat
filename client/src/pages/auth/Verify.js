import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import VerifyForm from "../../sections/auth/VerifyForm";

const Verify = () => {
  const { email } = useSelector((state) => state.auth);

  if (!email) {
    return <Navigate to='/auth/login' />;
  }
  return (
    <>
      <Stack spacing={2} sx={{ mb: 4, position: "relative" }}>
        <Typography variant='h3' paragraph={true}>
          Verify
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Enter the 6 digit verification OTP sent to{" "}
          <Typography
            sx={{
              color: "text.primary",
              fontFamily: "Arial",
            }}
            component={"span"}
            variant='subtitle2'
          >
            {email}
          </Typography>
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
      <VerifyForm email={email} />
    </>
  );
};

export default Verify;
