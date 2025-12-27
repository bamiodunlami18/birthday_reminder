require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// const ejs = require('ejs');
const { rateLimit } = require('express-rate-limit');
const path = require('path');
global.appRoot = path.resolve(__dirname);

const app = express();

const db = require('./configs/db.js');
const userDb = require('./models/user.model.js');
const dateDb = require('./models/date.model.js');

const validator = require('./services/validator.services.js');
const bodyParser = require('body-parser');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
    },
  })
);
app.use(morgan('tiny'));
app.use(express.json());
// app.use(
//   rateLimit({
//     windowMs: 10 * 60 * 1000,
//     limit: 20,
//     standardHeaders: 'draft-8',
//     legacyHeaders: false,
//     ipv6Subnet: 56,
//   })
// );

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/creat-birthday', validator, async (req, res) => {
  const { username, email, dob } = req.body;

  // check db for username or email
  try {
    const findUser = await userDb.find({ $or: [{ username: username }, { email: email }] });
    if (findUser.length)
      return res.send({
        success: false,
        data: 'Username or email already exist',
      });

    //save details
    const saveUser = new userDb({
      username: username,
      email: email,
    });
    await saveUser.save();

    //save date
    const saveDob = new dateDb({
      user_id: saveUser._id,
      year: dob.slice(0, 4),
      month: dob.slice(5, 7),
      day: dob.slice(8, 10),
    });
    await saveDob.save();

    return res.send({
      success: true,
      data: saveUser,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log('app started on port', PORT);
});
