export default function(values) {
  const errors = {};
  const requiredFields = ['course_letter', 'course_number', 'earned_credit'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.percentage_grade && !Number(values.percentage_grade))
    errors.percentage_grade = 'The grade needs to be a number';
  if (values.earned_credit && !Number(values.earned_credit))
    errors.earned_credit = 'The earned credit needs to be a number';
  return errors;
}
