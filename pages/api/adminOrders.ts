import payedItemSchema from "server/mongoSchema/payedItemSchema";
import dbInit from "@/lib/dbInit";
import { NextApiRequest, NextApiResponse } from "next";

let clients: { id: number; res: NextApiResponse<any> }[] = [];
const myOrders: any[] = [];

const orderFetcher = async () => {
  const fetchedOrders = await payedItemSchema
    .find({})
    .populate({ path: "costumer", model: "Costumer" })
    .populate("product");
  console.log(fetchedOrders);
  return fetchedOrders;
};

function sendEventsToAll(newFact: any, orders: any[]) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await dbInit();

      const headers = {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
      };

      res.writeHead(200, headers);

      const clientId = Date.now();

      const newClient = {
        id: clientId,
        res,
      };

      payedItemSchema.watch().on("change", async (operation) => {
        if (operation.operationType === "insert") {
          const orders = await orderFetcher();
          const data = `data: ${JSON.stringify(orders)}\n\n`;

          res.write(data);

          clients.push(newClient);

          req.on("close", () => {
            console.log(`${clientId} Connection closed`);
            clients = orders;
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const newFact = req.body;
      myOrders.push(newFact);
      res.json(newFact);
      const orders = await orderFetcher();
      sendEventsToAll(newFact, orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default handler;
