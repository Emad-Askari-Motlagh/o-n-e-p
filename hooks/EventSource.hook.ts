import React, { useEffect, useRef, useState } from "react";

const useEventSource = (uri: string) => {
  const [data, setData] = useState([]);
  const [listening, setListening] = useState(false);
  const eventSourceRef = useRef(null);
  // useEffect(() => {
  //   if (!listening) {
  //     eventSourceRef.current = new EventSource(uri);
  //     eventSourceRef.current.addEventListener("error", reconnect);
  //     eventSourceRef.current.addEventListener("message", handleMessage);
  //     eventSourceRef.current.onmessage = (event) => {
  //       const parsedData = JSON.parse(event.data);
  //       setData([...parsedData]);
  //       // const res = parsedData.filter((item) => !data.includes(item));
  //     };
  //     setListening(true);
  //     if (eventSourceRef.current) () => eventSourceRef.current.close();
  //   }
  // }, [listening, uri]);

  // const eventSourceRef = useRef(null);

  const connect = (uri) => {
    eventSourceRef.current = new EventSource(uri);

    eventSourceRef.current.addEventListener("error", reconnect);
    eventSourceRef.current.addEventListener("message", handleMessage);
  };

  const reconnect = () => {
    eventSourceRef.current.close();
    setTimeout(connect, 2000); // Delay before reconnecting (e.g., 2 seconds)
  };

  const handleMessage = (event) => {
    // Handle the received message
    const parsedData = JSON.parse(event.data);
    console.log(parsedData);
    setData([...parsedData]);
  };

  useEffect(() => {
    connect(uri);

    return () => {
      eventSourceRef.current.close(); // Close the connection when the component unmounts
    };
  }, [uri]);
  return {
    data,
  };
};
export default useEventSource;
