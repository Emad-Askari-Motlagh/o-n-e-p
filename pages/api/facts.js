export default handler = async (req, res) => {
  let clients = [];
  let facts = [];

  if (req.method === "GET") {
    // Process a POST request
    // function sendEventsToAll(newFact) {
    //   clients.forEach((client) =>
    //     client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
    //   );
    // }

    // async function addFact(req, res) {
    //   const newFact = req.body;
    //   facts.push(newFact);
    //   res.json(newFact);
    //   return sendEventsToAll(newFact);
    // }
    // await addFact(req, res);
    res.send("ff");
  } else {
    // Handle any other HTTP method
    res.end();
  }
};
