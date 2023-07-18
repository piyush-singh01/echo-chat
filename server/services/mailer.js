import sgMail from "@sendgrid/mail";
import 'dotenv/config'

sgMail.setApiKey(process.env.SEND_GRID_KEY);

const sendSGMail = async ({
  recipient,
  sender,
  subject,
  html,
  text,
  attachments,
}) => {
  try {
    const from = sender || "echochat.automail@gmail.com";
    const msg = {
      to: recipient, // email of recipient
      from: from, // verified sender
      subject,
      html: html,
      text: text,
      attachments,
    };
    return sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

export const sendEmail = async (args) => {
  if (process.env.NODE_ENV === "development") {
    return new Promise.resolve(); //if in development mode, we will get a promise that will be immediately resolved, but the actual email is not gonna be send.
  } else {
    return sendSGMail(args);
  }
};
