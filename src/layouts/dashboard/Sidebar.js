import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Divider, Avatar, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data/index";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";

import useSettings from "../../hooks/useSettings";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // console.log(theme);   // is an object

  const [selected, setSelected] = useState(0); // The idx 0 is the default selected.

  const { onToggleMode } = useSettings(); // get onToggleMode from useSetting custom hook

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/app";
      case 1:
        return "/group";
      case 2:
        return "/call";
      case 3:
        return "/settings";
      default:
        return "/app";
    }
  };

  return (
    <>
      {/* The SideBar */}
      <Box
        p={2} // 2 means 2*8 = 16px
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        {/* Stack is a container having flex properties */}
        <Stack
          direction="column"
          alignItems={"center"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent={"space-between"}
          spacing={3}
        >
          {/*Take 100% of the width available to it. */}

          <Stack
            alignItems={"center"}
            spacing={4}
            justifyContent={"space-between"}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: 64,
                height: 64,
                borderRadius: 1.5, //any numerical value borderradius will be multiplied by 8, as 8 is the default spacing in material ui. so 12/8=1.5
              }}
            >
              <img src={Logo} alt="Logo" />
            </Box>

            <Stack
              sx={{ width: "max-content" }}
              direction={"column"}
              alignItems={"center"}
              spacing={3}
            >
              {/*For max-content means in text that the item will be its full width, even if the container is smaller */}
              {Nav_Buttons.map((ele) =>
                // Wrap it around a box, for selected icon.
                ele.index === selected ? (
                  <Box
                    key={ele.index}
                    p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    {/*Key for the Box */}
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={ele.index}
                    >
                      {ele.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    key={ele.index}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "#000",
                    }}
                    onClick={() => {
                      setSelected(ele.index);
                      navigate(getPath(ele.index));
                    }}
                  >
                    {ele.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />

              {/*From Phosphor react library*/}
              {selected === 3 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ color: "#fff", width: "max-content" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.text.primary
                        : "#000",
                  }}
                  onClick={() => {
                    setSelected(3);
                    navigate(getPath(3));
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>

          <Stack spacing={4} alignItems={"center"}>
            {/* <AntSwitch onChange={() => onToggleMode()} defaultChecked /> */}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "text.primary",
                borderRadius: 1,
                p: 2,
              }}
            >
              <IconButton onClick={() => onToggleMode()} color="inherit">
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>

            {/*************/}
            {/* TODO: make it clickable(mouse pointer changes on hover)*/}
            <Avatar
              id="login-avatar"
              src={faker.image.avatar()}
              sx={{ cursor: "pointer" }}
              onClick={handleClick}
            ></Avatar>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "login-avatar",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
              transformOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
            >
              {Profile_Menu.map((ele, i) => {
                return (
                  <MenuItem key={i} onClick={handleClose}>
                    {ele.title}
                  </MenuItem>
                );
              })}
            </Menu>
            {/*************/}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
