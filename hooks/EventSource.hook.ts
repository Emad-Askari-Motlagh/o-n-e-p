import React, { useEffect, useState } from "react";

const useEventSource = (uri) => {
  const [data, setData] = useState([]);
  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      let events = new EventSource(uri);

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setData([...parsedData]);
        // const res = parsedData.filter((item) => !data.includes(item));
      };
      setListening(true);
      if (events) () => events.close();
    }
  }, []);
  return {
    data,
  };
};
export default useEventSource;
