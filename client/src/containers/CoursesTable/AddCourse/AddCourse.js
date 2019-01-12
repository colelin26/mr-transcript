import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import validate from './validate';
import { percentageToFPO } from '../../../utils/GPACalculator';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto'
  },
  spacer: {
    flex: '1 1'
  },
  button: {
    margin: theme.spacing.unit,
    justifyContent: 'end',
    height: '100%'
  }
});

let renderTextField = ({ label, input, classes, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    className={classes.textField}
    {...input}
    {...custom}
  />
);

renderTextField = withStyles(styles)(renderTextField);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={<Checkbox checked={input.value} onChange={input.onChange} />}
      label={label}
    />
  </div>
);

let AddCourse = ({
  handleSubmit,
  submitting,
  pristine,
  classes,
  confirmedAutoConversion,
  percentageGrade
}) => (
  <Toolbar className={classes.root}>
    <form
      onSubmit={() => {
        handleSubmit();
      }}
      className={classes.container}
    >
      <Field name="course_letter" component={renderTextField} label="Course Letter" />
      <Field
        name="course_number"
        component={renderTextField}
        label="Course Number"
        type={'number'}
      />
      <Field name="course_name" component={renderTextField} label="Course Name" />
      <Field
        name="percentage_grade"
        component={renderTextField}
        label="Percentage Grade"
        type={'number'}
      />
      <Field name="level" component={renderTextField} label="Term" />
      <Field name="earned_credit" component={renderTextField} label="Earned Credit" />
      {!confirmedAutoConversion && (
        <Field
          name="fpo_scale"
          component={renderTextField}
          label="Points out of 4.0"
          type="number"
        />
      )}
      {confirmedAutoConversion && (
        <TextField
          disabled
          id="standard-disabled"
          label="Points out of 4.0"
          defaultValue="Calculated 4.0 points"
          value={percentageToFPO(percentageGrade)}
          className={classes.textField}
          type={'number'}
        />
      )}
      <Field name="auto_fpo" component={renderCheckbox} label="Auto 4.0 Conversion" />
      <div className={classes.spacer} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={pristine || submitting}
        className={classes.button}
      >
        Add Course
      </Button>
    </form>
  </Toolbar>
);

AddCourse = withStyles(styles)(AddCourse);

AddCourse = reduxForm({
  form: 'AddCourse', // a unique identifier for this form
  validate,
  enableReinitialize: true
})(AddCourse);

const selector = formValueSelector('AddCourse');

AddCourse = connect(
  state => {
    const confirmedAutoConversion = selector(state, 'auto_fpo');
    const percentageGrade = selector(state, 'percentage_grade');
    const initialValues = {
      auto_fpo: true,
      earned_credit: 0.5
    };
    return {
      confirmedAutoConversion,
      percentageGrade,
      initialValues
    };
  },
  null
)(AddCourse);

export default AddCourse;
