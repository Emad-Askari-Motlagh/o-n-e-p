import dbInit from "@/lib/dbInit";
import Orders from "@/server/mongoSchema/orderschema";
import { pusher } from "@/lib/pusher";
// public channel handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    const changeStream = Orders.watch();
    var i = 0;
    async function callPusher(data) {
      try {
        await pusher.trigger("rooted-temple-840", "message", {
          message: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
    }
    changeStream.on("change", async (ok) => {
      const orders = await getOrders();
      i += 1;
      console.log(i);
      await callPusher(orders);
    });

    async function getOrders() {
      try {
        const orders = await Orders.find({})
          .populate("costumer")
          .populate("product");
        return orders;
      } catch (err) {
        console.log(err);
      }
    }

    res.json({ message: "completed" });
  } else {
    res.end();
  }
}
