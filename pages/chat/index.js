import React, { useEffect, useId, useRef, useState } from "react";
import { useSubscription, useMutation, gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Button } from "react-bootstrap";
import useSocketIo from "hooks/SocketIo.hook";

const POST_MESSAGE = gql`
  mutation ($user: String!, $content: String!) {
    PostMessage(user: $user, content: $content)
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

const Messages = ({ user }) => {
  return null;
};

// create random user
const user = "User_" + String(new Date().getTime());
const Chat = () => {
  const [state, stateSet] = React.useState({
    user: "Jack",
    content: "",
  });
  const { data, connected } = useSocketIo("/api/socket");

  const inputRef = useRef(null);
  useEffect(() => {
    console.log(data);
  }, [data]);

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
      const resp = await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <Container>
      <Messages user={state.user} />
      <Row>
        <Col xs={8}>
          <input
            ref={inputRef}
            label="Content"
            value={msg}
            disabled={!connected}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          <Button
            onClick={sendMessage}
            disabled={!connected}
            style={{ width: "100%" }}>
            Send
          </Button>
        </Col>
      </Row>
      {data.length ? (
        data.map((chat, i) => (
          <div key={"msg_" + i}>
            <span>{chat.user === user ? "Me" : chat.user}</span>: {chat.msg}
          </div>
        ))
      ) : (
        <div>No chat messages</div>
      )}
    </Container>
  );
};

export default Chat;
