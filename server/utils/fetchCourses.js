const UWAPI = require('./UWAPI');
const fs = require('fs');

(async () => {
  try {
    const courses = await UWAPI.getAllCourses(process.env.API_KEY);
    console.log(process.env.API_KEY);
    console.log(` Successfully requested ${courses.length} course time`);
    await fs.writeFileSync('courses.json', JSON.stringify(courses));
  } catch (err) {
    fs.writeFileSync('courses.json', JSON.stringify(courses));
  }
})();
