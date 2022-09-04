import dbInit from "@/lib/dbInit";
import Orders from "@/server/mongoSchema/orderschema";
import NextCors from "nextjs-cors";
let i = 0;
let clients = [];
const myOrders = [];

const orderFetcher = async () =>
  await Orders.find({})
    .populate({ path: "costumer", model: "Costumer" })
    .populate("product");
function sendEventsToAll(newFact, orders) {
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(newFact)}\n\n`)
  );
}
async function handler(req, res) {
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });
  if (req.method === "GET") {
    try {
      await dbInit();

      // Process a POST request
      const headers = {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
      };

      res.writeHead(200, headers);
      const orders = await orderFetcher();
      const data = `data: ${JSON.stringify(orders)}\n\n`;
      res.write(data);
      var i = 1;

      setInterval(() => {
        i++;
        const data = `data: ${JSON.stringify(orders)}\n\n`;
        res.write(data);
      }, 20000);

      const clientId = Date.now();

      const newClient = {
        id: clientId,
        res,
      };

      // Orders.watch().on("change", async (ok) => {
      //   const orders = await orderFetcher();
      //   const data = `data: ${JSON.stringify(orders)}\n\n`;
      //   res.write(data);
      // });

      clients.push(newClient);

      req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        clients = orders;
      });
    } catch (err) {
      console.log(err);
    }

    // res.flush();
  } else if (req.method === "POST") {
    //Handle any other HTTP method

    const newFact = req.body;
    myOrders.push(newFact);
    res.json(newFact);
    const orders = await orderFetcher();
    return sendEventsToAll(newFact, orders);
  }
}
export default handler;
