export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log(
    "/api/test",
    "- info:",
    "Received new request from frontend!",
  );

  res.socket.server.io.emit("test");

  console.log(
    "/api/test",
    "- info:",
    "test event emitted from backend!",
  );

  res.status(200).json({ msg: 'test event emitted from backend' })
}
