import React, { useCallback } from "react";
import FormProvider from "../../components/forms/FormProvider"; // import from that index js file?
import RHFTextField from "../../components/forms/RHFTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Stack,
} from "@mui/material";

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    about: Yup.string().required("About can not be empty"),

    avatarUrl: Yup.string().required("Avatar is required").nullable(true), // Note this is also a string. This can be null
  });

  const defaultValues = {
    name: "",
    about: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue, // can dynamically update the value of a field
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }, // very useful library
  } = methods;

  const values = watch(); // gives all values from the form

  // a file picker, we are handling the drop down of a file in file picker. We use useCallback to memoize this function.
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]; // The acceptedFiles is an array object.

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true }); // validate again after assigning a new value to the `avatarUrl`
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      // make a call to server
      console.log(data);
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
      <Stack spacing={3} mb={4}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="name"
          label="Name"
          helperText={"This name is public"}
        />
        <RHFTextField
          multiline
          rows={3} // 3 rows will be visible
          maxRows={5} // max rows that can be visible, this will be techincally overwritten by the fixed number of rows that is 3 here.
          inputProps={{ maxLength: 100 }}
          name="about"
          label="About"
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
        Save
      </Button>
    </FormProvider>
  );
};

export default ProfileForm;
