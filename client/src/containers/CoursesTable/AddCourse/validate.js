const REGEXES = {
  allAlphabet: /[a-zA-Z]/
};

export default function(values) {
  const errors = {};
  const requiredFields = [
    'course_letter',
    'course_number',
    'course_name',
    'percentage_grade',
    'level',
    'earned_credit'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (!Number(values.percentage_grade)) errors.percentage_grade = 'The grade needs to be a number';
  if (!Number(values.earned_credit))
    errors.earned_credit = 'The earned credit needs to be a number';
  return errors;
}
