import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../common/content-card/contentCard";
import { API_ENDPOINT } from "../data/apiRoutes";
import wallpaper from "../images/Ekonomska.png";
import TextField from "@material-ui/core/TextField";
import { Typography, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { registerStudent } from "../actions/studentActions";
import { loadStudent } from "../actions/globalActions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Redirect } from "react-router";
import axios from "axios";

const styles = theme => {
  return {
    page: {
      display: "flex",
      positin: "relative",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: "cover"
    },
    formCard: {
      width: 400,
      height: "fit-content",
      display: "flex",
      flexDirection: "column"
    },
    cardChildren: {
      flexDirection: "column"
    },
    loginTitleContainer: {
      width: "100%",
      borderLeft: `4px ${theme.palette.primary.main} solid`,
      marginTop: "4%"
    },
    loginTitle: {
      width: "100%",
      textAlign: "left",
      paddingLeft: 32
    },
    textField: {
      marginTop: 2,
      marginLeft: "15%",
      marginRight: "15%"
    },
    inputLabel: {
      marginTop: "5%",
      marginLeft: "15%",
      marginRight: "15%"
    },
    errorCaption: {
      marginLeft: "15%",
      textAlign: "left",
      marginTop: 24,
      marginBottom: 5,
      color: theme.palette.error.main
    },
    buttonSubmit: {
      marginRight: "15%",
      marginLeft: "60%",
      marginTop: 24,
      marginBottom: "10%"
    },
    regProf: {
      position: "absolute",
      bottom: 10,
      right: 15,
      color: "white"
    },
    EUtekst: {
      position: "absolute",
      bottom: 15,
      left: 15,
      color: "white"
    },
    bottomLine: {
      position: "absolute",
      width: "100%",
      height: "3.33vw",
      bottom: 0,
      backgroundColor: "#303F9F"
    }
  };
};

class Login extends Component {
  state = { redirect: undefined };

  constructor(props) {
    super(props);
    this.state = { isRegister: false, grades: [] };
    this.regHandleClick = this.regHandleClick.bind(this);
  }

  componentDidMount() {
    axios.get(API_ENDPOINT + "/grades").then(res => {
      console.table(res.data);
      this.setState({ grades: res.data });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { userType } = this.props;

    if (userType === "STUDENT") {
      this.setState({ redirect: <Redirect to="/ucenik" /> });
    } else if (userType === "PROFFESOR") {
      this.setState({ redirect: <Redirect to="/profesor" /> });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  login = () => {
    const { dispatch, userType } = this.props;
    const { email, password } = this.state;
    if (email && password) {
      dispatch(loadStudent(email, password));
    }
  };

  register = () => {
    const { dispatch } = this.props;
    dispatch(
      registerStudent(
        this.state.name,
        this.state.surname,
        this.state.email,
        this.state.password,
        this.state.razred
      )
    );

  };

  regHandleClick() {
    this.setState(state => ({
      isRegister: !state.isRegister
    }));
  }

  render() {
    const { classes, loadUserRejected, registerFailed, registerFulfilled } = this.props;

    if (registerFulfilled && this.state.isRegister) {
      this.setState({isRegister: false});
    }

    if (this.state.isRegister) {
      return (
        <form className={classes.page}>
          <ContentCard
            classes={{ root: classes.formCard, children: classes.cardChildren }}
          >
            <div className={classes.loginTitleContainer}>
              <Typography
                color="primary"
                className={classes.loginTitle}
                variant="display1"
              >
                Registracija:
              </Typography>
            </div>
            <Typography variant="caption" className={classes.errorCaption}>
              {registerFailed ? "Zauzeto korisničko ime" : ""}
            </Typography>
            <TextField
              label="Ime"
              name="name"
              className={classes.textField}
              value={this.state["name"]}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              label="Prezime"
              name="surname"
              className={classes.textField}
              value={this.state["surname"]}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              label="Korisničko ime"
              name="email"
              className={classes.textField}
              value={this.state["email"]}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              label="Lozinka"
              name="password"
              className={classes.textField}
              value={this.state["password"]}
              onChange={this.handleChange}
              margin="normal"
              type="password"
            />
            <InputLabel htmlFor="razred" className={classes.inputLabel}>
              Razred
            </InputLabel>
            <Select
              value={this.state.razred}
              onChange={this.handleChange}
              label="Razred"
              className={classes.textField}
              inputProps={{
                name: "razred",
                id: "razred"
              }}
            >
              {this.state.grades.map(grade => {
                return <MenuItem value={grade.id}>{grade.name}</MenuItem>;
              })}
            </Select>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonSubmit}
              onClick={this.register}
            >
              PRIJAVI
            </Button>
          </ContentCard>
          {this.state.redirect}
          <div className={classes.bottomLine}>
            <Button className={classes.regProf} onClick={this.regHandleClick}>
              {this.state.isRegister ? "Prijava" : "Registriraj se"}
            </Button>
          </div>
        </form>
      );
    }
    return (
      <form className={classes.page}>
        <ContentCard
          classes={{ root: classes.formCard, children: classes.cardChildren }}
        >
          <div className={classes.loginTitleContainer}>
            <Typography
              color="primary"
              className={classes.loginTitle}
              variant="display1"
            >
              Prijava:
            </Typography>
          </div>
          <Typography variant="caption" className={classes.errorCaption}>
            {loadUserRejected ? "Pogrešni podatci" : ""}
          </Typography>
          <TextField
            label="Korisničko ime"
            name="email"
            className={classes.textField}
            value={this.state["email"]}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            label="Lozinka"
            name="password"
            className={classes.textField}
            value={this.state["password"]}
            onChange={this.handleChange}
            margin="normal"
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSubmit}
            onClick={this.login}
          >
            PRIJAVI
          </Button>
        </ContentCard>
        {this.state.redirect}
        <div className={classes.bottomLine}>
          <span className={classes.EUtekst}>
            Sadržaj ove aplikacije isključiva je odgovornost
            Ekonomsko-birotehničke škole, Split
          </span>
          <Button className={classes.regProf} onClick={this.regHandleClick}>
            {this.state.isRegister ? "Prijava" : "Registriraj se"}
          </Button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(store => ({
  userType: store.global.userType,
  loadUserRejected: store.global.loadUserRejected,
  registerFulfilled: store.global.registerFulfilled,
  registerFailed: store.global.registerFailed,
}))(withStyles(styles)(Login));
