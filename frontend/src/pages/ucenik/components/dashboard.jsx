import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Row from "../../../common/content/row/row";
import NotificationCard from "./notificationCard";
import GradesCard from "./gradesCard";
import LekcijaCard from "./lekcijaCard";
import FinPlaner from "./finPlanerComp";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IncomeCard from "../../../common/incomeCard";
import OutcomeCard from "../../../common/outcomeCard";
import TotalCard from "./totalCard";

const styles = theme => ({
  fix: {
    maxHeight: "240px"
  },
  gridList: {
    paddingTop: 30,
    overflowY: "hidden",
    height: 240,
    paddingBottom: 35,
    marginLeft: 20,
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let payment = { name: "Web dev", amount: 2000 };
    let fees = [
      { name: "f1", amount: 500 },
      { name: "fee3", amount: 300 },
      { name: "foo1", amount: 200 }
    ];
    let outcomes = [
      { type: "Režije", amount: 200, change: -10 },
      { type: "Zabava", amount: 400, change: 20 },
      { type: "Kredit", amount: 650, change: undefined },
      { type: "Neočekivano", amount: 500, change: undefined }
    ];
    this.state = { outcomes, payment, fees };
  }

  outcomeSliderChange = event => {
    let outcomes = [...this.state.outcomes];
    outcomes[event.target.name].change = Number(event.target.value);
    this.setState({ outcomes });
    console.log("STEJTOVI", this.state);
  };

  render() {
    const {
      classes,
      folders,
      notifications,
      studentId,
      solutions
    } = this.props;
    let tests = folders.map(folder => folder.tests).flat();
    let solvedTests = solutions
      .filter(solution => !!solution)
      .map(solution => solution.testId);
    return (
      <div style={{ height: "calc(100% - 65px)" }}>
        <GridList className={classes.gridList} rows={2.5}>
          {folders.map(folder => (
            <LekcijaCard
              folder={folder}
              studentId={studentId}
              solvedTests={solvedTests}
            />
          ))}
        </GridList>
        <Row>
          {notifications.length ? (
            <NotificationCard notifications={notifications} />
          ) : (
            <div />
          )}
          {solutions.length ? (
            <GradesCard solutions={solutions} tests={tests} />
          ) : (
            <div />
          )}
        </Row>
        <Row>
          <IncomeCard payment={this.state.payment} fees={this.state.fees} />
          <OutcomeCard
            outcomes={this.state.outcomes}
            sliderChange={this.outcomeSliderChange}
            credit={{}}
            unexpected={{}}
          />
          <TotalCard />
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect(store => {
  return {
    notifications: store.grade.notifications || [],
    folders: store.grade.folders || [],
    studentId: store.student.id,
    solutions: store.student.solutions || []
  };
})(withStyles(styles)(Dashboard));
