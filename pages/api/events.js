import dbInit from "../../lib/dbInit";
import Orders from "../../server/mongoSchema/orderschema";
import cors from "cors";
import { NextResponse } from "node_modules/next/server";
let i = 0;
let clients = [];
const myOrders = [];

const orderFetcher = async () => await Orders.find();
function sendEventsToAll(newFact, orders) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}
async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Process a POST request
      const headers = {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
      };

      res.writeHead(200, headers);

      // const orders = await orderFetcher();
      // const data = `data: ${JSON.stringify(orders)}\n\n`;
      // res.write(data);

      // const clientId = Date.now();

      // const newClient = {
      //   id: clientId,
      //   res,
      // };

      Orders.watch().on("change", async (ok) => {
        await dbInit();
        const orders = await orderFetcher();
        const data = `data: ${JSON.stringify(orders)}\n\n`;
        res.write(data);
      });

      req.on("close", () => {
        console.log(`${clientId} Connection closed`);
      });
    } catch (err) {
      console.log(err);
    }

    // res.flush();
  } else if (req.method === "POST") {
    //Handle any other HTTP method
    res.end();
  }
}
export default handler;
