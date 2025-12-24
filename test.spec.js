const { createDate } = require('./models/date.model');

it('should return string of date created', async () => {
  const saveDate = await createDate;
  expect(saveDate).toBeDefined();
});
