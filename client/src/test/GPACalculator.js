const TEST_DATA = [
  {
    course_letter: 'CS',
    course_number: '135',
    course_name: 'Designing Functional Programs',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 91,
    level: '1A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Fall',
    year: '2017',
    id: 1,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'EMLS',
    course_number: '102R',
    course_name: 'Clear Communication in English Writing',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 86,
    level: '1A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Fall',
    year: '2017',
    id: 2,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.9
  },
  {
    course_letter: 'JAPAN',
    course_number: '101R',
    course_name: 'First-Year Japanese 1',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 93,
    level: '1A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Fall',
    year: '2017',
    id: 3,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'MATH',
    course_number: '135',
    course_name: 'Algebra for Honours Mathematics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 91,
    level: '1A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Fall',
    year: '2017',
    id: 4,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'MATH',
    course_number: '137',
    course_name: 'Calculus 1 for Honours Mathematics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 90,
    level: '1A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Fall',
    year: '2017',
    id: 5,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'CS',
    course_number: '136',
    course_name: 'Elementary Algorithm Design and Data Abstraction',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 88,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 6,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.9
  },
  {
    course_letter: 'JAPAN',
    course_number: '102R',
    course_name: 'First-Year Japanese 2',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 93,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 7,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'MATH',
    course_number: '136',
    course_name: 'Linear Algebra 1 for Honours Mathematics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 84,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 8,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.7
  },
  {
    course_letter: 'MATH',
    course_number: '138',
    course_name: 'Calculus 2 For Honours Mathematics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 86,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 9,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.9
  },
  {
    course_letter: 'SPCOM',
    course_number: '100',
    course_name: 'Interpersonal Communication',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 95,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 10,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'STAT',
    course_number: '230',
    course_name: 'Probability',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 91,
    level: '1B',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Winter',
    year: '2018',
    id: 11,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'CS',
    course_number: '245',
    course_name: 'Logic and Computation',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 81,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 12,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.7
  },
  {
    course_letter: 'CS',
    course_number: '246',
    course_name: 'Object-Oriented Software Development',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 82,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 13,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3.7
  },
  {
    course_letter: 'MATH',
    course_number: '239',
    course_name: 'Introduction to Combinatorics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 73,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 14,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3
  },
  {
    course_letter: 'PD',
    course_number: '1',
    course_name: 'Career Fundamentals',
    attempted_credit: 0.5,
    earned_credit: 0,
    percentage_grade: null,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 15,
    tag: {
      fgo: false,
      InAvg: false
    }
  },
  {
    course_letter: 'REC',
    course_number: '280',
    course_name: 'Introduction to Tourism',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 90,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 16,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 4
  },
  {
    course_letter: 'STAT',
    course_number: '231',
    course_name: 'Statistics',
    attempted_credit: 0.5,
    earned_credit: 0.5,
    percentage_grade: 75,
    level: '2A',
    course_load: 'Full-Time',
    form_of_study: 'Enrolment',
    term: 'Spring',
    year: '2018',
    id: 17,
    tag: {
      fgo: true,
      InAvg: true
    },
    fpo_scale: 3
  },
  {
    course_letter: 'COOP',
    course_number: '1',
    course_name: 'Co-operative Work Term',
    level: '2B',
    course_load: 'Part-Time',
    form_of_study: 'Co-op WorkTerm',
    term: 'Fall',
    year: '2018',
    id: 18,
    tag: {
      fgo: false,
      InAvg: false
    }
  },
  {
    course_letter: 'PD',
    course_number: '11',
    course_name: 'Processes for Technical Report Writing',
    level: '2B',
    course_load: 'Part-Time',
    form_of_study: 'Co-op WorkTerm',
    term: 'Fall',
    year: '2018',
    id: 19,
    tag: {
      fgo: false,
      InAvg: false
    }
  }
];
