import PropTypes from "prop-types";
import { useFormContext, FormController, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

// Prop types validator
RHFTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
helperText: PropTypes.node, // can accept any valid react node as its value node is a single <></>
};

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}       // Use to uniquely indentify the field in the form *required
      control={control} // Props for the form from rhf library
      render={({ field, fieldState: { error } }) => ( // How the controller should render the form input component
        <TextField
          {...field}  // onChange, onClick, onBlur...
          fullWidth 
          value={     // value stored in the field
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error} // This !! essentially typecasts into a boolean. If it is true, the field is rendered that way
          helperText={error ? error.message : helperText}   // Text showed below the input in the form
          {...other}    // destructore all the other props
        />
      )}
    />
  );
}
