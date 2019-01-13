export const defaultSchema = {
  90: 4.0,
  85: 3.9,
  80: 3.7,
  77: 3.3,
  73: 3.0,
  70: 2.8,
  67: 2.3,
  63: 2.0,
  60: 1.7,
  57: 1.3,
  53: 1.0,
  50: 0.7
};

export const createCourse = course => {
  course.tag = {};
  if (Number(course.percentage_grade)) course.tag.hasGrade = true;
  if (Number(course.percentage_grade) && Number(course.fpo_scale)) course.tag.InAvg = true;
  return Object.assign({}, course);
};

// return the fpo correspondence of a course
export const percentageToFPO = (percentageGrade, schema = defaultSchema) => {
  const conditions = Object.keys(schema)
    .sort()
    .reverse();
  for (let i = 0; i < conditions.length; i++) {
    if (Number(percentageGrade) > Number(conditions[i])) {
      return schema[conditions[i]];
    }
  }
  return 0;
};

// Logic: percentage_grade(defined) > force >

export const courseFilter = (
  course,
  courseLetterRegex,
  selectedTags,
  lowerbound = 0,
  upperbound = 0
) => {
  if (course.percentage_grade === undefined) return false;
  if (isNaN(course.percentage_grade)) return false;
  if (isNaN(course.hasGrade)) return false;
  if (course.percentage_grade < lowerbound) return false;
  if (course.percentage_grade > upperbound) return false;
  if (courseLetterRegex !== undefined && courseLetterRegex.test(course.course_letter)) return false;
  if (selectedTags !== undefined) {
    let containsTag = false;
    for (const key in course.tag) {
      if (Object.prototype.hasOwnProperty.call(selectedTags, key)) containsTag = true;
    }
    return containsTag;
  }
  return true;
};

// calculate avg_fpo for given courses
// scale can be 'fpo_scale' or 'percentage_grade'
export const calculateAverage = (courses, scale, selectedTag) => {
  let [sum, count] = [0, 0];
  if (selectedTag !== undefined) {
    courses.forEach(course => {
      if (course.tag[selectedTag]) {
        sum += course[scale] * course.earned_credit;
        count += course.earned_credit;
      }
    });
  }
  const average = (sum / count).toFixed(2);
  return average;
};
