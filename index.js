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

app.use(helmet());
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

app.listen(PORT, () => {
  console.log('app started on port', PORT);
});
