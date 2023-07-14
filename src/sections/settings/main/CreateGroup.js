import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Scrollbars from "react-custom-scrollbars-2";
import FormProvider from "../../../components/hook-form/FormProvider";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import RHFAutoComplete from "../../../components/hook-form/RHFAutoComplete";

const MEMBERS = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

const CreateGroupForm = ({ handleClose }) => {
  const CreateGroupSchema = Yup.object().shape({
    title: Yup.string()
      .required("Group Name is Required")
      .min(3, "Group Name should be at least 3 charachters")
      .max(20, "Group name should be at most 20 charachters"),

    members: Yup.array().min(2, "Group should have at least 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(CreateGroupSchema),
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
      <Stack spacing={3} m={1}>
        <RHFTextField name="title" label="Group Name" />
        <RHFAutoComplete
          name={"members"}
          label={"Members"}
          multiple
          freesolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  // TODO: Create a reusable component
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Create Group"}</DialogTitle>

      <DialogContent sx={{ mt: 4 }}>
        {/* Create Group Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction={"row-reverse"} alignItems={"center"}>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button type="submit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroup;
