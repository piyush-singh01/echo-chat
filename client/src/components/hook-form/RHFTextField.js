import PropTypes from "prop-types";
import { useFormContext, FormController, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

// Prop types validator
RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node, // can accept any valid react node as its value. node is a single <></>
};

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error} // This !! essentially typecasts into a boolean
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
