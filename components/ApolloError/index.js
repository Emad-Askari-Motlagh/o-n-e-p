import React from "react";
import { Alert } from "react-bootstrap";
export default function ApolloError({ error }) {
  return (
    <div>
      <pre>
        Bad:{" "}
        {error?.graphQLErrors?.map(({ message, extensions }, i) => (
          <Alert variant="warning" key={i}>
            {extensions.originalError.message}
          </Alert>
        ))}
      </pre>
    </div>
  );
}
