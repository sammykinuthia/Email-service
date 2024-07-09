import { Resend } from "resend";
import SignupEmail from "../../../emails/signup";

const MY_EMAIL = process.env.MY_EMAIL;

const resend = new Resend(process.env.RESEND_API_KEY);

type Prop = {
  to: string;
  subject: string;
  intro: string;
  body?: string;
  [key: string]: any;
};

export async function sendEmail(data: Prop) {
  try {
    const { to, ...sendProp } = data;
    const { data: info, error } = await resend.emails.send({
      from: "Royoltech Solutions <admin@royoltech.com>",
      to: [to],
      subject: sendProp.subject,
      react: SignupEmail(sendProp),
    });

    if (error) {
      return Response.json(error, { status: 400 });
    }
    return Response.json(info);
  } catch (error) {
    console.log("ERROR---> ", error);
    return Response.json(error);
  }
}
