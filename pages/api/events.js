import dbInit from "../../lib/dbInit";
import Orders from "../../server/mongoSchema/orderschema";
import NextCors from "nextjs-cors";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

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
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
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

      const orders = await orderFetcher();
      const data = `data: ${JSON.stringify(orders)}\n\n`;
      res.write(data);

      const clientId = Date.now();

      const newClient = {
        id: clientId,
        res,
      };

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

export default allowCors(handler);
