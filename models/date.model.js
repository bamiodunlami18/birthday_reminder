const db = require('../configs/db.js');
const validator = require('validator');

const dateSchema = new db.Schema({
  user_id: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
  },

  date: {
    type: String,
    validator: {
      validator: (item) => {
        validator.isDate(item);
      },
    },
  },
});

const Birthdate = db.model('Birthdate', dateSchema);

async function createDate() {
  const date = new Birthae({
    user_id: '694ae4630da32ec34c80da81',
    date: new Date(Date.now()).toJSON(),
  });

  await date.save();
  console.log(date)
}

// createDate();

module.exports = {
  Birthdate,
  createDate,
};
