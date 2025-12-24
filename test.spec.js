const { createDate } = require('./models/date.model');
const jest = require('jest')

jest.mock('mongoose')

it('should return string of date created', async () => {
  const saveDate = await createDate;
  expect(saveDate).toBeDefined()
});
