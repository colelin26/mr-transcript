const request = require('superagent');
const Promise = require('bluebird');

const singleCourseLink = (letter, number, key) =>
  `https://api.uwaterloo.ca/v2/courses/${letter}/${number}.json?key=${key}`;

const allCourses = key => `https://api.uwaterloo.ca/v2/courses.json?key=${key}`;

const singleCourseSchedule = (key, subject, catalog_number) =>
  `https://api.uwaterloo.ca/v2/courses/${subject}/${catalog_number}/schedule.json?key=${key}`;

exports.getCourseInfo = async (letter, number, key) => {
  const res = await request.get(singleCourseLink(letter, number, key));
  return res.body.data;
};

exports.getAllCourses = async key => {
  const res = await request.get(allCourses(key));
  return res.body.data;
};

exports.getAllSchedules = async key => {
  const courses = await exports.getAllCourses(key);
  const allSchedules = [];
  let currentIndex;
  await Promise.each(courses, async course => {
    const scheduleLink = singleCourseSchedule(key, course.subject, course.catalog_number);
    try {
      const res = await request.get(scheduleLink);
      res.body.data.forEach((course, index) => {
        const serializedJSON = {};
        serializedJSON.subject = course.subject;
        serializedJSON.catalog_number = course.catalog_number;
        serializedJSON.title = course.title;
        let combined = Object.assign(serializedJSON, course.classes[0].date);
        combined = Object.assign(combined, course.classes[0].location);
        combined = Object.assign(combined, course.classes[0].instructors);
        currentIndex = index;
        allSchedules.push(combined);
      });
      console.log(allSchedules.length);
    } catch (err) {
      console.log(`index is at ${currentIndex}`);
      console.log(err);
      return allSchedules;
    }
  });
  return allSchedules;
};
