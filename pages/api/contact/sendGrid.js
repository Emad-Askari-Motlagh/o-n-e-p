import sgMail from "@sendgrid/mail";

export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const { token, reciever, sender } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: reciever, // Change to your recipient
      from: sender, // Change to your verified sender
      subject: "Costumer request",
      templateId: "d-a67f652d66a84353abe2760295691596",
      dynamicTemplateData: {
        token,
      },
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(200).send("Email sent");
      })
      .catch((error) => {
        console.error(error);
        Rewind.satus(500).send({ err: "Couldnt send the email" });
      });
  } else {
    // Handle any other HTTP method
  }
}
