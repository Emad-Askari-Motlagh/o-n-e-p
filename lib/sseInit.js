export default async function sseInit({ uri }) {
  try {
    const sse = new EventSource(uri, {
      withCredentials: true,
    });

    function getRealtimeData(data) {
      return data;
      // process the data here,
      // then pass it to state to be rendered
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here

      sse.close();
    };
  } catch (err) {
    console.log(err);
  }
}
