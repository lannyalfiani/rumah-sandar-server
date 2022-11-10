const app = require('./app')
const { jobTask } = require("../cron/every_10_minutes")

describe('cron running', () => {
  test('cron is running to restart everyday at 6 AM', async () => {
    const result = await jobTask()
    console.log(result);
    expect.any(String)
  });
});


//! mocking find all Match pake resolved value


//! mocking find all Class pake resolved valu