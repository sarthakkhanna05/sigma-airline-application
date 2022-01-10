import React, { useState } from "react";
import logo from "../assets/user.png";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [passenger, setPassenger] = useState(null);
  const history = useHistory();
  const paperStyle = {
    padding: "40px 10px 10px",
    height: "400px",
    width: 300,
    margin: "0 auto ",
    position: "relative",
  };
  const formStyles = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };
  const logoStyles = {
    position: "absolute",
    top: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
  };
  const btnstyle = { margin: "auto 0 10px" };

  const onChangeHandler = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/passenger/login", passenger)
      .then((response) => {
        if (response.data.message === "Login Successful") {
          if (response.data.passenger.isAdmin) {
            history.push("/admin");
          } else {
            history.push("/search");
          }
        }
        // console.log(response);
      });
  };
  return (
    <Grid style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Paper elevation={5} style={paperStyle}>
        <div style={logoStyles}>
          <img
            style={{ width: "100px", height: "auto" }}
            src={logo}
            alt="Logo"
          />
        </div>
        <form style={formStyles} onSubmit={loginHandler}>
          <Grid align="center">
            <h2>Sign In</h2>
          </Grid>
          <TextField
            label="Email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            required
            autoComplete="off"
            onChange={onChangeHandler}
          />
          <TextField
            label="Password"
            name="password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            autoComplete="off"
            onChange={onChangeHandler}
          />
          {/* <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        /> */}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <NavLink style={{ marginLeft: "auto", cursor: "pointer" }} to="/">
            Register here
          </NavLink>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
         
