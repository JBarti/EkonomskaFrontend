import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "../../common/content/content";
import lenta from "./eulenta.png";
import UcenikAppBar from "./components/appbar";
import Dashboard from "./components/dashboard";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadSession } from "../../actions/studentActions";

const styles = theme => {
  return {
    sidebarNav: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap"
    },
    sidebarHeading: {
      paddingLeft: 16
    },
    content: {
      height: "100%"
    },
    bottomLine: {
      marginTop: "1em",
      position: "absolute",
      width: "100%",
      height: "3vw",
      bottom: 0,
      backgroundColor: "#303F9F"
    },
    tekstEU: {
      position: "absolute",
      right: 15,
      bottom: 15,
      color: "white"
    },
    EUslika: {
      display: "inline-block",
      position: "absolute",
      left: 0
    }
  };
};

class Ucenik extends Component {
  state = {
    redirect: null
  };
  componentWillMount() {
    this.props.dispatch(loadSession());
  }

  componentDidUpdate() {
    console.log(this.props.fail);
    if (this.props.fail || !this.props.studentId) {
      this.setState({ redirect: <Redirect to="/" /> });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <UcenikAppBar expanded={true} onMenu={this.showMenu} />
        <Content expanded={true}>
          <Dashboard />
        </Content>
        {this.state.redirect}

        <div className={classes.bottomLine}>
          <span className={classes.tekstEU}>
            Projekt je sufinancirala europska unija iz Europskog socijalnog
            fonda Sadržaj ove aplikacije isključiva je odgovornost
            Ekonomsko-birotehničke škole, Split
          </span>
          <img
            src={lenta}
            alt="EU strukturni fondovi"
            height="50"
            width="180"
            className={classes.EUslika}
          />
        </div>
      </div>
    );
  }
}
export default connect(store => {
  return {
    fail: store.student.fail,
    studentId: store.student.id
  };
})(withStyles(styles)(Ucenik));
