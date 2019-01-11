const request = require('superagent');

const APILINK = (letter, number, key) =>
  `https://api.uwaterloo.ca/v2/courses/${letter}/${number}.json?key=${key}`;

exports.getCourseInfo = async (letter, number, key) => {
  const res = await request.get(APILINK(letter, number, key));
  return res.body.data;
};
