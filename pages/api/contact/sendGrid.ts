import storeJwt from "lib/storeJwt";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import sgMail from "@sendgrid/mail";
import JWT from "jsonwebtoken";
import sendMail from "@/lib/sendMail";
import User from "@/server/mongoSchema/userSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_key: string | undefined = process.env.SENDGRID_API_KEY;
  if (req.method === "POST") {
    try {
      const { email, sender }: { email: string; sender: string } = req.body;

      //Create the json web token
      // var token = storeJwt({ email });
      const token = JWT.sign({ email }, "MY_SECRET");
      //  Process a POST request
      const msg = {
        to: email, // Change to your recipient
        from: sender, // Change to your verified sender
        subject: "Costumer request",
        templateId: "d-a67f652d66a84353abe2760295691596",
        dynamicTemplateData: {
          token,
        },
      };
      sgMail.setApiKey(api_key as string);
      await sgMail.send(msg);
      //Replace the old token with new one
      // const user = await User.findOneAndUpdate({ email }, { token });
      // console.log(user);

      res.status(200).send("Email sent");
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
      res.status(500).send(error.message || "Error from sendgrid server");
    }
  }
}
