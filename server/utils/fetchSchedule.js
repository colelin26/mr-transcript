const UWAPI = require('./UWAPI');

const fs = require('fs');
(async () => {
  try {
    const schedule = await UWAPI.getAllSchedules(process.env.API_KEY);
    console.log(` Successfully scraped ${schedule.length} course time`);
    fs.writeFileSync('schedule.json', JSON.stringify(schedule));
  } catch (err) {
    fs.writeFileSync('schedule.json', JSON.stringify(schedule));
  }
})();
