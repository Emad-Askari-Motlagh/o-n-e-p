import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },

  components: {
    MuiOutlinedInput: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          color: "primary",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiSelect: {
      defaultProps: {
        color: "info",
      },
      styleOverrides: {
        filled: {
          color: "primary",
        },
      },
    },
    MuiInput: {
      defaultProps: {
        color: "primary",
      },
    },
  },
});

export default function withMuiType<P>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithMuiTheme = (props: P & JSX.IntrinsicAttributes) => {
    return (
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );
  };
  return ComponentWithMuiTheme;
}
