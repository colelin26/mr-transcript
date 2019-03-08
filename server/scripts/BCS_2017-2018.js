const { createCourseArray, createGroup } = require('./checklistGenerator/createGroup');

const fs = require('fs');
const allCourses = require('../asset/courses.json');
const cs135 = createGroup(1, 'CS 1[134]5', createCourseArray(alt => `CS 1${alt}5`, [1, 3, 4]));
const cs136 = createGroup(1, 'CS 1[34]6', createCourseArray(alt => `CS 1${alt}6`, [3, 4]));
const cs240 = createGroup(1, 'CS 240', createCourseArray(alt => `CS 240${alt}`, ['E', '']));
const cs251 = createGroup(1, 'CS 251', createCourseArray(alt => `CS 251${alt}`, ['E', '']));
const cs241 = createGroup(1, 'CS 241', createCourseArray(alt => `CS 241${alt}`, ['E', '']));
const cs245 = createGroup(1, 'CS 245', createCourseArray(alt => `CS 245${alt}`, ['E', '']));
const cs246 = createGroup(1, 'CS 246', createCourseArray(alt => `CS 246${alt}`, ['E', '']));
const cs341 = createGroup(1, 'CS 341', createCourseArray(alt => `CS 341${alt}`, ['E', '']));
const cs350 = createGroup(1, 'CS 350', createCourseArray(alt => `CS 350${alt}`, ['E', '']));

const math135 = createGroup(1, 'MATH 1[34]5', createCourseArray(alt => `MATH 1${alt}5`, [3, 4]));
const math136 = createGroup(1, 'MATH 1[34]6', createCourseArray(alt => `MATH 1${alt}6`, [3, 4]));
const math137 = createGroup(1, 'MATH 1[34]7', createCourseArray(alt => `MATH 1${alt}7`, [2, 3, 4]));
const math138 = createGroup(1, 'MATH 1[34]8', createCourseArray(alt => `MATH 1${alt}8`, [2, 3, 4]));
const math239 = createGroup(1, 'MATH 2[34]9', createCourseArray(alt => `MATH 2${alt}9`, [3, 4]));
const stat230 = createGroup(1, 'STAT 2[34]0', createCourseArray(alt => `STAT 2${alt}0`, [3, 4]));
const stat231 = createGroup(1, 'STAT 2[34]1', createCourseArray(alt => `STAT 2${alt}1`, [3, 4]));

const cs340to398Arr = [];
const cs440tocs489Arr = [];
const cs600sArr = [];
const cs700sArr = [];
console.log(allCourses[0]);
for (let course of allCourses) {
  const catalog_number = course.catalog_number;
  if (course.subject === 'CS' && catalog_number >= '340' && catalog_number <= '398')
    cs340to398Arr.push(`${course.subject} ${catalog_number}`);
  if (course.subject === 'CS' && catalog_number >= '440' && catalog_number <= '489')
    cs440tocs489Arr.push(`${course.subject} ${catalog_number}`);
  if (course.subject === 'CS' && catalog_number >= '600' && catalog_number <= '699')
    cs600sArr.push(`${course.subject} ${catalog_number}`);
  if (course.subject === 'CS' && catalog_number >= '700' && catalog_number <= '799')
    cs700sArr.push(`${course.subject} ${catalog_number}`);
}

console.log(cs340to398Arr);
const cs340to398ORcs440tocs489 = createGroup(3, 'CS 340-398; CS440-489', [
  ...cs340to398Arr,
  ...cs440tocs489Arr
]);
const cs440tocs489 = createGroup(2, 'CS440-489', cs440tocs489Arr);
const combocs = createGroup(1, 'CS 440-498 or CS 499T or CS 6xx or CS 7xx or CO 487 or STAT 440', [
  ...cs440tocs489Arr,
  ...cs600sArr,
  ...cs700sArr,
  'CO 487',
  'STAT 440'
]);

const csCourses = [
  cs135,
  cs136,
  cs240,
  cs251,
  cs241,
  cs245,
  cs246,
  cs341,
  cs350,
  cs340to398ORcs440tocs489,
  cs440tocs489,
  combocs
];
const csRequriedCourses = {
  courses: csCourses,
  title: '7.5 CS Units:'
};

const mathCourses = [math135, math136, math137, math138, math239, stat230, stat231];
const mathCoursesObj = {
  courses: mathCourses,
  title: '3.5 Math Units:'
};

let communicationIArr = 'EMLS 101R, EMLS 102R, EMLS 129R, ENGL 109, SPCOM 100, SPCOM 223'.split(
  ','
);
communicationIArr = communicationIArr.map(x => (x = x.trim()));
console.log(communicationIArr);

let communicationIIArr = 'EMLS 103R, EMLS 104R, EMLS 110R, ENGL 101B, ENGL 108D, ENGL 119, ENGL 209, ENGL 210E, ENGL 210F, ENGL 251A, ENGL 378/MTHEL 300, SPCOM 225, SPCOM 227, SPCOM 228'.split(
  ','
);
communicationIIArr = communicationIIArr.map(x => x.trim());
console.log(communicationIIArr);

const communicationI = createGroup(1, 'Communication Course List I', communicationIArr);
const communicationII = createGroup(1, 'Communication Course List II (Including I)', [
  ...communicationIArr,
  ...communicationIIArr
]);
const empty8 = createGroup(8, 'Other Non-math courses', []);
const nonMathElective = {
  courses: [communicationI, communicationII, empty8],
  title: '5.0 Non-math units'
};

const elective = {
  courses: [empty8],
  title: '4.0 Elective units'
};

const bcsGroups = [csRequriedCourses, mathCoursesObj, nonMathElective, elective];
fs.writeFileSync('../asset/degreeCheckList/BCS_2017-2018.json', JSON.stringify(bcsGroups));
