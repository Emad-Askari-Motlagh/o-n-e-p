import React, { useEffect, useRef, useState } from "react";
import { useSubscription, useMutation, gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Button } from "react-bootstrap";
import useSocketIo from "hooks/SocketIo.hook";
import {
  PostMessageMutation,
  PostMessageMutationVariables,
} from "@/server/generated/graphql";

const POST_MESSAGE = gql`
  mutation PostMessage($user: String!, $content: String!) {
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

interface Message {
  content: string;
  user: string;
  id: string;
}

const Messages: React.FC<{ user: string }> = ({ user }) => {
  return null;
};

const user = "User_" + String(new Date().getTime());

const Chat: React.FC = () => {
  const [state, stateSet] = useState<{ user: string; content: string }>({
    user: "Jack",
    content: "",
  });
  const { data, connected } = useSocketIo("/api/socket");

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const [postMessage] = useMutation<
    PostMessageMutation,
    PostMessageMutationVariables
  >(POST_MESSAGE);
  const { data: messageData } = useQuery(MESSAGE);
  const { data: subscriptionData } = useSubscription(GET_MESSAGES);

  const [msg, setMsg] = useState("");

  const sendMessage = async () => {
    if (msg) {
      postMessage({ variables: { user, content: msg } });
      const message = {
        user,
        msg,
      };
      const resp = await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (resp.ok) setMsg("");
    }
    inputRef?.current?.focus();
  };

  const messages: Message[] = data || messageData?.messages || [];

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
      {messages.length ? (
        messages.map((chat, i) => (
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
