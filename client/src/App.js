import React from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
// css
import "./App.css";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { collapseSnackBar } from "./redux/slices/app";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


function App() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.app);
  const { open, message, severity } = snackbar;
  return (
    <>
      <ThemeProvider>
        {/* <ThemeSettings> */} <Router /> {/* </ThemeSettings> */}
      </ThemeProvider>
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            console.log("Snackbar is closed");
            dispatch(collapseSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(collapseSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
