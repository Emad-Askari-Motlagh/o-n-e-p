// public channel handler
export default async function handler(req, res) {
  if (req.method === "GET") {
    const code = req.query.code;
    if (code) {
      // Get an access token based on our OAuth code
      oAuth2Client.getToken(code, function (err, tokens) {
        if (err) {
          console.log("Error authenticating");
          console.log(err);
        } else {
          console.log("Successfully authenticated");
          oAuth2Client.setCredentials(tokens);
          authed = true;
          res.redirect("/");
        }
      });
    }

    res.json({ message: "completed" });
  } else {
    res.end();
  }
}
