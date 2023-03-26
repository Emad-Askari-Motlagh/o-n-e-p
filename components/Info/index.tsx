import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function Info({ children }: { children: string }) {
  return (
    <div>
      <Alert style={{ margin: "1rem auto" }} severity="info">
        {children}
      </Alert>
    </div>
  );
}
