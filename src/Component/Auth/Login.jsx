import React, { useState } from "react";
import axios from "axios";
import { base_url, reg_url } from "../../Api/api_url";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";


const Login = () => {
  let api_url = base_url + reg_url;

  let navigation = useNavigate();


  //Input validation
  const [formvalid, setFormvalid] = useState();
  const [success, setSuccess] = useState();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    error: { username: "", email: "", password: "" },
  });

  //change handler
  const handleChange = (event) => {
    let { name, value } = event.target;

    let err = data.error;
    setData({ ...data, [name]: value, error: err });
    // console.log("Validation error: ", data.error);
    // console.log("HandleChange: ", data);
  };

  //submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("Submitted value: ", data);

    let users = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    // console.log(users);

    axios
      .get(api_url)
      .then((res) => {
        console.log("Get: ", res);
        const Exist = res.data.find((u) => u.username === data.username);
        const existEmail = res.data.find((abc) => abc.email === data.email);

        if (!Exist && existEmail) {
          alert(" Login successful!");
          navigation("profile")
        } 
         else {
          alert("Email or password is wrong. Please try again!");
        }
      })
      .catch((err) => {
        console.log("Get Error: ", err);
      });
  };

  return (
    <Box
      onSubmit={submitHandler}
      className="registration"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography level="h1">Login</Typography>
      <hr />
      <TextField
        id="standard-basic2"
        type="text"
        label="Email"
        name="email"
        variant="standard"
        onChange={handleChange}
      />
      <br />
      <TextField
        id="standard-basic3"
        type="text"
        label="Password"
        name="password"
        variant="standard"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button variant="contained" type="submit" startIcon={<LoginIcon />}>
        Login
      </Button>
      <p>{formvalid && <Alert severity="error">{formvalid}</Alert>}</p>
      <p>{success && <Alert severity="success">{success}</Alert>}</p>
    </Box>
  );
};

export default Login;
