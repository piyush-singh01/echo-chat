import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

// ? Note: InputProps vs inputProps.
/**
 * ? inputProps is directly for the underlying <input></input> element in the text field. FOr instance, inputProps={{ maxLength: 50 }}
 *
 * ? InputProps is for the <Input /> react component from MUI. For instance start and end adorments.
 */

// Custom OTP field
const RHFCodes = ({ keyName = "", inputs = [], ...other }) => {
  const { control } = useFormContext();
  const codesRef = useRef(null);

  const handleChangeToNextField = (e, handleChange) => {
    const { maxLength, value, name } = e.target;
    const fieldIndex = Number(name.replace(keyName, "")); // remove code from code1

    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIndex + 1}]`
    );

    if (value.length > maxLength) {
      // if the value that we are trying to enter is more than 1 (say by ctrlV from somewhere else)
      e.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIndex < 6 && nextField != null) {
      nextField.focus(); //focus on the next field
    }
    handleChange(e); // calling this is nessesory to update the form state. (whereever it is being used, in react hook form or elsewhere)
  };

  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"center"}
      ref={codesRef}
    >
      {inputs.map((input_name, idx) => (
        <Controller
          key={input_name}
          name={`${keyName}${idx + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={idx === 0}
              placeholder="_"
              onChange={(e) => {
                handleChangeToNextField(e, field.onChange); // see field is useful here, we can get the onChange event of the field from here.
              }}
              onFocus={(e) => e.currentTarget.select()} // select the entire text content(only 1 char here) when focus is brought on it.
              inputProps={{ maxLength: 1, type: "number" }}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
            />
          )}
        ></Controller>
      ))}
    </Stack>
  );
};

export default RHFCodes;
