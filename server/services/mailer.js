import sgMail from "@sendgrid/mail";
import 'dotenv/config'

sgMail.setApiKey(process.env.SEND_GRID_KEY);

const sendSGMail = (async = ({
  recipient,
  sender,
  subject,
  html,
  text,
  attachments,
}) => {
  try {
    const from = sender || "myemail@email.com"; //TODO: add an actual verified(by sg) email here.
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
});

const sendEmail = async (args) => {
  if (process.env.NODE_ENV === "development") {
    return new Promise.resolve(); //if in development mode, we will get a promise that will be immediately resolved, but the actual email is not gonna be send.
  } else {
    return sendSGMail(args);
  }
};
