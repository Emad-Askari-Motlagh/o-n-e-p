import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import sgMail from "@sendgrid/mail";
import JWT from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, sender }: { email: string; sender: string } = req.body;
      var token = JWT.sign({ email }, "MY_SECRET");
      //  Process a POST request

      sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
      const msg = {
        to: email, // Change to your recipient
        from: sender, // Change to your verified sender
        subject: "Costumer request",
        templateId: "d-a67f652d66a84353abe2760295691596",
        dynamicTemplateData: {
          token,
        },
      };
      await sgMail.send(msg);

      console.log(token);
      // console.log("Email sent");
      res.status(200).send("Email sent");
    } catch (err: any) {
      res.status(500).send(err.message || "Error from sendgrid server");
    }
  }
}
