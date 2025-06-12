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
      message,
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

async function sendAutomatedMail() {}
module.exports = {
  sendMailTemplate,
  sendAutomatedMail,
};
