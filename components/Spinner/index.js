import React from "react";
import { Alert, Spinner as LoadingSpinner } from "react-bootstrap";

export default function Spinner(props) {
  return (
    <div>
      <LoadingSpinner
        {...props}
        className="text-center m-auto align-self-center justify-content-md-center"
        animation="border"
      />
    </div>
  );
}
