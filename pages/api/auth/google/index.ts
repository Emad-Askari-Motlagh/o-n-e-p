import Realm from "realm";
import { google } from "googleapis";
import { OAuth2Client, GoogleAuth } from "google-auth-library";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Configure and instantiate Google OAuth2.0 client
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();
    const url = `https://dns.googleapis.com/dns/v1/projects/${"order-app-375121"}`;
    const response = await client.request({ url });
    console.log(response.data);
  } else {
    res.end();
  }
}
