const db = require('../configs/db.js');

const dateSchema = new db.Schema({
  user_id: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
  },

  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
});

const Birthdate = new db.model('Birthdate', dateSchema);

module.exports = Birthdate;
