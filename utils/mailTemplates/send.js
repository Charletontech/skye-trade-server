const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Create transporter
const transporter = nodemailer.createTransport({
  host: "workplace.truehost.cloud",
  port: 587,
  secure: false,
  auth: {
    user: "support@skye-trade.com",
    pass: "Admin-skye25",
  },
});

// Read the HTML template
const htmlTemplate = fs.readFileSync(path.join(__dirname, "test.html"), "utf8");

// Email options
const mailOptions = {
  from: '"Skye Trade" <support@skye-trade.com>',
  to: "ukacharlie@gmail.com",
  subject: "Welcome to SkyeTrade Finance",
  html: htmlTemplate,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
