import { Resend } from 'resend';
import SignupEmail from '../../../emails/signup';
import { BaseEmailProp } from '../_constants/types';

const MY_EMAIL = process.env.MY_EMAIL;

const resend = new Resend(process.env.RESEND_API_KEY);




export async function sendEmail( data:BaseEmailProp,email:string) {
  try {
    
    const { data:info, error } = await resend.emails.send({
      from: 'Royoltech Lmt <info@royoltech.com>',
      to: [email],
      subject: 'Hello world',
      react: SignupEmail(data),
    });
  
    if (error) {
      return Response.json(error,{status:400})
    }
    return Response.json(info)
  } catch (error) {
    console.log("ERROR---> ", error);
    return Response.json(error);
  }
}
