exports.createGroup = (requireNum, groupName, coursesName) => {
  const group = {};
  group.requireNum = requireNum;
  group.groupName = groupName;
  group.courses = [];
  for (const name of coursesName) {
    group.courses.push({
      title: name,
      passed: false
    });
  }
  return group;
};

exports.createCourseArray = (courseName, inputs) => {
  const courses = [];
  for (const input of inputs) {
    courses.push(courseName(input));
  }
  return courses;
};
