import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ChecklistCard from '../../components/GraduationCheck/ChecklistCard';

const styles = theme => ({
  toolbar: {
    paddingRight: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap'
  },
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  courses: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  title: {
    flex: '1 1',
    display: 'flex',
    flexDirection: 'row'
  },
  titleName: {
    paddingLeft: '1em',
    margin: 'auto 0'
  }
});

const mapStateToProps = state => {
  const { groups } = state.GraduationCheck;
  const { passedGroup } = state.Table;
  let passedGroupCopy = passedGroup.slice();
  groups.forEach(group => {
    group.courses.forEach(course => {
      let requireNum = course.requireNum;
      course.courses.forEach(course => {
        if (passedGroupCopy.includes(course.title) && requireNum > 0) {
          course.passed = true;
          requireNum--;
          passedGroupCopy = passedGroupCopy.filter(item => item !== course.title);
        }
      });
    });
  });
  return { groups };
};

const CoursesTable = ({ classes, groups }) => {
  console.log(groups);
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>
        <Link
          component={Typography}
          href="https://cs.uwaterloo.ca/current/programs/require/2017-2018/bcs.html"
          variant="h4"
          id="tableTitle"
          className={classes.titleName}
        >
          BCS: Computer Science, Honours
        </Link>
      </div>
      <Divider />
      {groups.map(group => (
        <React.Fragment>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography cvariant="h5" className={classes.titleName}>
                {group.title}
              </Typography>
            </div>
          </Toolbar>
          <div className={classes.courses}>
            {group.courses.map(course => (
              <ChecklistCard
                description={course.groupName}
                requireNum={course.requireNum}
                courses={course.courses}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(CoursesTable));
