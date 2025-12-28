const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: "bamiodunlami18@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const birthday_reminder = async (to, username) => {
  const info = await transporter.sendMail({
    from: '"Bamidele" <bamiodunlami18@gmail.com>',
    to: to,
    subject: '🎂 Happy Birthday',
    html: wishes.replace('{{name}}', username),
  });

  console.log('Message sent:', info.messageId);
};

const confirmation = async (to, username) => {
  const info = await transporter.sendMail({
    from: '"Bamidele" <bamiodunlami18@gmail.com>',
    to: to,
    subject: 'Successful',
    html: onboard.replace('{{name}}', username),
  });

  console.log('Message sent:', info.messageId);
};

const wishes = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Happy Birthday!</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, Helvetica, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #ffa600, #ff3d81);
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 20px;
      color: #333333;
      line-height: 1.6;
      text-align: center;
    }
    .content h2 {
      color: #ff3d81;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      margin: 10px 0;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #ff3d81;
      color: #ffffff;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>🎉 Happy Birthday! 🎂</h1>
    </div>

    <div class="content">
      <h2>Dear {{name}},</h2>
      <p>
        Wishing you a day filled with happiness, laughter, and everything you enjoy.
      </p>
      <p>
        May this year bring you exciting opportunities, good health, and great memories!
      </p>
    </div>

    <div class="footer">
      <p>Much love ❤️ from Bamidele</p>
    </div>
  </div>
</body>
</html>
`;

const onboard = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Birthday Saved</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, Helvetica, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #ffa600, #ff3d81);
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 20px;
      color: #333333;
      line-height: 1.6;
      text-align: center;
    }
    .content h2 {
      color: #ff3d81;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      margin: 10px 0;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #ff3d81;
      color: #ffffff;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>🎉Birthday Saved</h1>
    </div>

    <div class="content">
      <h2>Dear {{name}},</h2>
      <p>Your Birthday details has be successfully saved</p>
    </div>

    <div class="footer">
      <p>Much love ❤️ from Bamidele</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  birthday_reminder,
  confirmation,
};
