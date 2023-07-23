import React from "react";
import {
  Stack,
  InputBase,
} from "@mui/material";
import {  styled, alpha } from "@mui/material/styles";
import {  MagnifyingGlass } from "phosphor-react";
import StyledBadge from './StyledBadge';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  border: "thin solid", // TODO: Need to add this here while refactoring
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvent: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(${theme.spacing(4)} + 1em)`,
    width: "100%",
  },
}));

const SearchBar = () => {
  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search..." />
        </Search>
      </Stack>
    </>
  );
};


export default SearchBar