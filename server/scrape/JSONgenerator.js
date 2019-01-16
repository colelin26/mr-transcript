const REGEXES = {
  //initial filter
  init: {
    content: /Beginning of Undergraduate Record\s*(\w[\S\s]+\w)\s*End of Undergraduate Unofficial Transcript/i,
    termDate: /((?:Fall|Winter|Spring)\s(?:\d{4}))/gi,
    filterOut: /University of Waterloo[\s\S]*Ontario\sEducation\sNbr:\s\d+|Milestones[\S\s]*/gi
  },

  Milestones: /(Milestones[\S\s]*)Scholarships and Awards/i,
  ScholarshipsAwards: /Scholarships and Awards[\S\s]*/i,
  term: {
    // the date of the courses in a term
    termDate: /(Fall|Winter|Spring)\s(\d{4})/i,
    // the heading information of a term
    termHeader: /Level: +([0-9][A-Z]) +Load: ((?:\w|-)+) +Form Of Study: ([\w]{9}|[\w|-]{5} [\w]{8})/i,
    // course that has a grade
    courseFinished: /(\w+) +(\d+\w?)\s+(.+) +(\d.\d\d) +(\d.\d\d) +(\d+|\w+)\n( +(?:.+)\n)?/,
    // course that does not have a grade yet
    courseUnfinished: /(\w+) +(\d+\w?) +([\/\(\)\w &-]+)\n( +(?:\w[\/\(\)\w &-]+)\n)?/,
    gpaAndStanding: /In GPA[\s\S]*Effective \d{2}\/\d{2}\/\d{4}/gi,
    Program: /([ \S]+)\n/
  },
  invalidExtraField: /In GPA    Earned|Degree Requirement, Not in Average/gi
};

const SELECTORS = {
  termDate: {
    term: 1,
    year: 2
  },
  termHeader: {
    level: 1,
    course_load: 2,
    form_of_study: 3
  },
  courseFinished: {
    course_letter: 1,
    course_number: 2,
    course_name: 3,
    attempted_credit: 4,
    earned_credit: 5,
    percentage_grade: 6,
    extra_info: 7
  },
  courseUnfinished: {
    course_letter: 1,
    course_number: 2,
    course_name: 3,
    extra_info: 4
  }
};

const TONUMBER = {
  courseFinished: [4, 5, 6]
};

function scrapeWithSelector(str, regex, selector, toNumber) {
  const obj = {};
  const matched_results = str.match(regex);
  for (const sel in selector) {
    if (sel !== 'extra_info') obj[sel] = matched_results[selector[sel]].trim();
    if (toNumber !== undefined && toNumber.length > 0 && toNumber.includes(selector[sel])) {
      obj[sel] = +obj[sel];
    }
  }
  if (matched_results[selector['extra_info']] !== undefined) {
    if (!REGEXES.invalidExtraField.test(matched_results[selector['extra_info']].trim())) {
      obj['course_name'] = `${matched_results[selector['course_name']].trim()} ${matched_results[
        selector['extra_info']
      ].trim()}`;
    }
  }
  return obj;
}

function scrapeCoursesFromTerm(str, regex, selector, toNumber) {
  str = str.replace(REGEXES.term.gpaAndStanding, '');
  const regexG = new RegExp(regex, 'gi');
  const coursesStr = str.match(regexG);
  if (coursesStr === null) return [];
  const courses = coursesStr.map(str => scrapeWithSelector(str, regex, selector, toNumber));
  return courses;
}

function scrapeTerm(str, ...other) {
  const header = scrapeWithSelector(str, REGEXES.term.termHeader, SELECTORS.termHeader);
  const coursesFinished = scrapeCoursesFromTerm(
    str,
    REGEXES.term.courseFinished,
    SELECTORS.courseFinished,
    TONUMBER.courseFinished
  );
  const coursesUnfinished = scrapeCoursesFromTerm(
    str,
    REGEXES.term.courseUnfinished,
    SELECTORS.courseUnfinished
  );
  const coursesArr = coursesFinished.concat(coursesUnfinished);
  const coursesArrFinal = coursesArr.map(course => Object.assign(course, header, ...other));
  return coursesArrFinal;
}

exports.txt_to_JSON = function txt_to_JSON(txt) {
  try {
    const content = txt.match(REGEXES.init.content)[1];
    const milestones = content.match(REGEXES.Milestones)[1];
    const scholarshipsAwards = content.match(REGEXES.ScholarshipsAwards)[0];
    const termStrs = content.replace(REGEXES.init.filterOut, '').split(REGEXES.init.termDate);
    if (termStrs[0] === '') termStrs.shift();
    else throw new Error('Expected the first element to be an empty string');
    if (termStrs.length % 2 !== 0) throw new Error('Expected terms to have even length');
    let courses = [];
    for (let i = 0; i < termStrs.length; i = i + 2) {
      const date = scrapeWithSelector(termStrs[i], REGEXES.term.termDate, SELECTORS.termDate);
      if (!(process.env.NODE_ENV === 'production')) console.log(termStrs[i + 1]);
      courses = courses.concat(scrapeTerm(termStrs[i + 1], date));
    }
    courses.forEach((elem, index) => {
      elem.id = index;
      elem.tag = {};
    });
    return courses;
  } catch (err) {
    throw new Error(`Encountered error in scraping the transcript with REGEXES\nMsg:${err.stack}`);
  }
};
