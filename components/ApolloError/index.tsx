import React from "react";
import { Alert } from "react-bootstrap";

interface ApolloErrorProps {
  error: {
    graphQLErrors?: Array<{ message: string; extensions: any }>;
  };
}

const ApolloError: React.FC<ApolloErrorProps> = ({ error }) => {
  return (
    <div>
      <pre>
        Bad:
        {error?.graphQLErrors?.map(({ message }, i) => (
          <Alert variant="warning" key={i}>
            {message}
          </Alert>
        ))}
      </pre>
    </div>
  );
};

export default ApolloError;
