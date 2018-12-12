const moment = require('moment');

module.exports.generateFilename = str => {
  const time = moment().toISOString();
  return `${str} ${time}`;
};
