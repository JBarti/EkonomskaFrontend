import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

const styles = theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "content-box",
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    marginLeft: "2vw",
    marginRight: "2vw",
    overflowY: "hidden",
    zIndex: "1000"
  },
  subheader: {
    textAlign: "left",
    fontSize: 16,
    borderBottomColor: "rgba(0, 0, 0, 0.12)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "#fff"
  },
  children: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflowY: "auto",
    overflowX: "hidden"
  },
  subheaderList: {
    marginBottom: -8
  }
});

class ContentCard extends Component {
  render() {
    const { classes } = this.props;
    let subheader = undefined;
    if (this.props.cardName) {
      subheader = (
        <ListSubheader component="div" className={classes.subheader}>
          {this.props.cardName}
        </ListSubheader>
      );
    }
    return (
      <Paper elevation={5} className={classes.root}>
        {subheader ? (
          <List subheader={subheader} className={classes.subheaderList} />
        ) : null}
        <div className={classes.children}>{this.props.children}</div>
      </Paper>
    );
  }
}

ContentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(ContentCard);
