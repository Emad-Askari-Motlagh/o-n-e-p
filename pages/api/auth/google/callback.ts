import { OAuth2Client } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oAuth2Client = new OAuth2Client();
  if (req.method === "GET") {
    const code = req.query.code as string;

    try {
      if (code) {
        const data = await oAuth2Client.getToken(code);
        console.log("Successfully authenticated");
        oAuth2Client.setCredentials(data.tokens);
        const authed = true;
        res.redirect("/");
      } else {
        throw new Error("Authentication");
      }
    } catch (err) {
      res.send(err);
      // Get an access token based on our OAuth code
      console.log("Error authenticating");
      console.log(err);
    }

    res.json({ message: "completed" });
  } else {
    res.end();
  }
}
