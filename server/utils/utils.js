const moment = require('moment');

const REGEXES = {
  filetype: /\/(\w+)/i,
}

module.exports.generateFilename = (str, mimetype) => {
  const filetype = mimetype.match(REGEXES.filetype)[1];
  const time = moment().toISOString();
  const filename = str.replace(`.${filetype}`, '');
  return `${filename} ${time}.${filetype}`;
};
