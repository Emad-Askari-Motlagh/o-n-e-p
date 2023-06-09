import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import JWT from "jsonwebtoken";
import User from "@/server/mongoSchema/userSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_key: string | undefined = process.env.SENDGRID_API_KEY;
  
  if (req.method === "POST") {
    try {
      const { email, sender }: { email: string; sender: string } = req.body;

      const token = JWT.sign({ email }, "MY_SECRET");

      const msg = {
        to: email,
        from: sender,
        subject: "Costumer request",
        templateId: "d-a67f652d66a84353abe2760295691596",
        dynamicTemplateData: {
          token,
        },
      };

      sgMail.setApiKey(api_key as string);
      await sgMail.send(msg);

      res.status(200).send("Email sent");
    } catch (error: any) {
      console.error("Error sending email:", error);

      if (error.response) {
        console.error(error.response.body);
      }

      res.status(500).send(error.message || "Error sending email");
    }
  } else {
    res.status(404).end();
  }
}
