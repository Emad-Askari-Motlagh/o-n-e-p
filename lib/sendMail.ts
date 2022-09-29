import sgMail from "@sendgrid/mail";

interface MSG {
  to: string; // Change to your recipient
  from: string; // Change to your verified sender
  subject: string;
  templateId: string;
  dynamicTemplateData: object;
}
const api_key: string | undefined = process.env.SENDGRID_API_KEY;

export default async function sendMail(msg: MSG) {
  sgMail.setApiKey(api_key as string);
  await sgMail.send(msg);
  return sgMail;
}
