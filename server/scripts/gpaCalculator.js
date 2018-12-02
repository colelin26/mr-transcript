// return the fpo correspondence of a course
exports.course_fpo = function course_fpo(course) {
    let percentage_grade = course.percentage_grade;
    if (percentage_grade >= 90) return 4.00;
    else if (percentage_grade >= 85) return 3.90;
    else if (percentage_grade >= 80) return 3.70;
    else if (percentage_grade >= 77) return 3.30;
    else if (percentage_grade >= 73) return 3.00;
    else if (percentage_grade >= 70) return 2.70;
    else if (percentage_grade >= 67) return 2.30;
    else if (percentage_grade >= 63) return 2.00;
    else if (percentage_grade >= 60) return 1.70;
    else if (percentage_grade >= 57) return 1.30;
    else if (percentage_grade >= 53) return 1.00;
    else if (percentage_grade >= 50) return 0.70;
    else return 0.00;
}

function course_filter(lowerbound, upperbound, force, course) {
    if (course.percentage_grade === undefined) return false;
    if (force) return true;
    if (isNaN(course.percentage_grade)) return false;
    if (course.percentage_grade < lowerbound) return false;
    if (course.percentage_grade > upperbound) return false;
    return true;
}

// add fpo for courses without fpo 
exports.courses_add_fpo = function courses_add_fpo(courses) {
    for (let i = 0; i < courses.length; i++) {
        if (course_filter(0 , 100, false, courses[i])) courses[i].fpo_scale = exports.course_fpo(courses[i]);
    }
}

// calculate avg_fpo for given courses
exports.courses_avg_fpo = function courses_avg_fpo(courses) {
    courses = courses.filter((course) => course_filter(0, 100, false, course));
    let sum = 0;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].percentage_grade != undefined) {
            sum += courses[i].fpo_scale;
        }
    }
    const average = (sum / courses.length).toFixed(2);
    return average;
}

