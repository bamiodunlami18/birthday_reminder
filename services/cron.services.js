const cron = require('node-cron');
const userDb = require('../models/user.model.js');
const { birthday_reminder } = require('./email.services.js');

const lookupBirthday = async () => {
  const date = new Date();
  const findDate = await userDb.find({ day: date.getDate(), month: date.getMonth() + 1 }).select(['username', 'email']);
  if (!findDate.length) return;
  sendEmail(findDate);
};

const sendEmail = (data) => {
  console.log(data);
  data.forEach((el) => {
    setTimeout(() => {
      birthday_reminder(el.email, el.username);
    }, 3000);
  });
};

//daily task 7am
cron.schedule(
  '0 7 * * *',
  () => {
    lookupBirthday();
  },
  {
    scheduled: true,
    timezone: 'Africa/Lagos',
  }
);

module.exports = cron;
