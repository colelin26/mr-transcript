const Promise = require('bluebird');
const extract = Promise.promisify(require('pdf-text-extract'));
const gpacal = require('./gpaCalculator');
const jsonGene = require('./JSONgenerator');
const UWAPI = require('../utils/UWAPI');
require('dotenv').config();

async function readPDF(filePath) {
  try {
    const txt = await extract(filePath);
    return txt.join('\n');
  } catch (err) {
    throw new Error(err);
  }
}

async function scrapePDF(filePath) {
  try {
    const txt = await readPDF(filePath);
    if (!(process.env.NODE_ENV === 'production')) console.log(txt);
    const courses = jsonGene.txt_to_JSON(txt);
    gpacal.courses_add_fpo(courses);
    const transcriptJSON = {};
    transcriptJSON.courses = courses;
    transcriptJSON.passedCourses = [];
    await Promise.each(courses, async course => {
      const course_data = await UWAPI.getCourseInfo(
        course.course_letter,
        course.course_number,
        process.env.API_KEY
      );
      course.url = course_data.url;
      course.description = course_data.description;
      course.course_name = course_data.title;
      if (course.percentage_grade && course.percentage_grade >= 60)
        transcriptJSON.passedCourses.push(`${course.course_letter} ${course.course_number}`);
    });
    transcriptJSON.fpo_avg = gpacal.courses_avg_fpo(transcriptJSON.courses);
    return transcriptJSON;
  } catch (err) {
    throw new Error(err.stack);
  }
}

exports.scrapePDF = scrapePDF;
