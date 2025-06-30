require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

async function sendMailTemplate({ heading, greeting, message, recipient }) {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(
      __dirname,
      "mailTemplates",
      "dynamicTemplate.hbs"
    );
    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);
    const replacements = {
      heading,
      greeting,
      message: new handlebars.SafeString(message),
      year: new Date().getFullYear(),
    };

    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.MAIL_FROM,
      to: `${recipient}`,
      html: htmlToSend,
      subject: heading,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      console.log("Email sent:", info.response);
      resolve(true);
    });
  });
}

async function sendAutomatedMail(mailType, recipient, token, identifier) {
  try {
    const mailTypes = {
      signup: {
        heading: "Welcome Aboard!",
        template: "welcome.html",
        isStatic: true,
      },
      withdrawal: {
        heading: "Withdrawal Process Initiated!",
        template: "withdrawal.html",
        isStatic: true,
      },
      fp: {
        heading: "Password Reset: Recovery Token",
        template: "forget-password.hbs",
        isStatic: false,
      },
    };

    const config = mailTypes[mailType];
    if (!config) throw new Error("Invalid mail type");

    let htmlTemplate;
    const templatePath = path.join(__dirname, "mailTemplates", config.template);

    if (config.isStatic) {
      htmlTemplate = fs.readFileSync(templatePath, "utf8");
    } else {
      const source = fs.readFileSync(templatePath, "utf8");
      const compiled = handlebars.compile(source);
      // conditional switch statement here for more dynamic templates
      htmlTemplate = compiled({ token, identifier });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: recipient,
      html: htmlTemplate,
      subject: config.heading,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending automated mail:", error);
    throw error;
  }
}
module.exports = {
  sendMailTemplate,
  sendAutomatedMail,
};
