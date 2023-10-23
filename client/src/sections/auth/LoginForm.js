import React from "react";
import FormProvider from "../../components/forms/FormProvider"; // import from that index js file?
import RHFTextField from "../../components/forms/RHFTextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { LoginUser, LogoutUser } from "../../redux/slices/auth.js";
import { useDispatch } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { GetMyProfile } from "../../redux/slices/app";
import { FetchAllConversationsList } from "../../redux/slices/conversation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [_, setUserID, removeUserID] = useLocalStorage("user_id");

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required").email("Not a valid email address"),
    password: Yup.string().required("Password is Required"), // TODO: see more of this, how can errors be customized, add lenght to password.
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }, // very useful library
  } = methods;

  const onSubmit = async (data) => {
    try {
      // make an api call to server
      await Promise.resolve(dispatch(LoginUser(data, setUserID))).then(async () => {
        await Promise.resolve(dispatch(GetMyProfile()));
        await Promise.resolve(dispatch(FetchAllConversationsList()));
      });
    } catch (err) {
      console.log(err);
      reset();
      setError("After Submitting... ", {
        ...errors,
        message: errors.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/forgot-password"
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          color: (theme) => (theme.palette.mode === "light" ? "common.white" : "grey.800"),
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) => (theme.palette.mode === "light" ? "common.white" : "grey.800"),
          },
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
