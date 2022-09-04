import { pusher } from "@/lib/pusher";

// presence channel handler
export default async function handler(req, res) {
  const { message } = req.body;
  // trigger a new post event via pusher
  await pusher.trigger("rooted-temple-840", "chat-update", {
    message,
  });

  res.json({ status: 200 });
}
