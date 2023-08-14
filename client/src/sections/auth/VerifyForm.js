import React from "react";
import FormProvider from "../../components/forms/FormProvider"; // import from that index js file?
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import RHFCodes from "../../components/forms/RHFCodes";
import { VerifyEmail } from "../../redux/slices/auth";

// TODO: This verify page should not be visible if we have not send any OTP.
const VerifyForm = ({ email }) => {
  const dispatch = useDispatch();

  // ? should this not better be an array?
  const VerifyFormSchema = Yup.object().shape({
    code1: Yup.string().required("Fill the complete OTP"),
    code2: Yup.string().required("Fill the complete OTP"),
    code3: Yup.string().required("Fill the complete OTP"),
    code4: Yup.string().required("Fill the complete OTP"),
    code5: Yup.string().required("Fill the complete OTP"),
    code6: Yup.string().required("Fill the complete OTP"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyFormSchema),
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
      dispatch(
        VerifyEmail({
          // TODO: encapsulate this otp soup with some higher order logic
          email: email,
          otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        })
      );
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
      <Stack spacing={3} mb={5}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        {/* Add a custom OTP input instead of a Text Field */}
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />
      </Stack>

      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Verify OTP
      </Button>
    </FormProvider>
  );
};

export default VerifyForm;
