import React, { useEffect, useId, useRef, useState } from "react";
import { useSubscription, useMutation, gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Button } from "react-bootstrap";

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const MESSAGE = gql`
  query {
    messages {
      content
      user
      id
    }
  }
`;
const GET_MESSAGES = gql`
  subscription {
    messages {
      content
      id
      user
    }
  }
`;

// create random user
const user = "User_" + String(new Date().getTime());
const Chat = () => {
  const [state, stateSet] = React.useState({
    user: "Jack",
    content: "",
  });

  const { subscribeToMore, ...result } = useQuery(MESSAGE);
  const [postMessage] = useMutation(POST_MESSAGE);
  const { data, loading, error } = useSubscription(GET_MESSAGES);

  const inputRef = useRef(null);
  const actualData = data ? data : result.data;
  // init chat and message

  const [msg, setMsg] = useState("");

  const sendMessage = async () => {
    if (msg) {
      postMessage({ variables: { user, content: msg } });
      // build message obj
      const message = {
        user,
        msg,
      };

      // dispatch message to other users

      // reset field if OK
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <input
            ref={inputRef}
            label="Content"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button onClick={sendMessage} style={{ width: "100%" }}>
            Send
          </Button>
        </Col>
      </Row>
      {true ? (
        actualData?.messages?.map((res, i) => {
          return (
            <div key={"msg_" + i} tw="mt-1">
              <span>{res.user}</span>:<span>{res.content}</span>
            </div>
          );
        })
      ) : (
        <div tw="text-sm text-center text-gray-400 py-6">No chat messages</div>
      )}
    </Container>
  );
};

export default Chat;
