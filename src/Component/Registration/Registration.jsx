import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import "./Registration.css";
import { base_url, reg_url } from "../../Api/api_url";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Registration = () => {
  let api_url = base_url + reg_url;
  // console.log("api url: ", api_url);

  let navigation = useNavigate();

  //Input validation
  const [formvalid, setFormvalid] = useState();
  const [success, setSuccess] = useState();

  // //validation for email
  // const isEmail = (email) =>
  //   /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);

  // //validation for password
  // const isPassword = (pass) =>
  //   /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$/i.test(pass);

  // //validation for username
  // const isUsername = (usserr) => /^[a-zA-Z0-9_-]{3,16}$/i.test(usserr);

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

    // switch (name) {
    //   case "username":
    //     if (value.length < 1) {
    //       err.username =
    //         "Username should be 5 - 15 characters and shouldn't include any special characters!";
    //     } else {
    //       err.username = "";
    //     }
    //     break;

    //   case "email":
    //     if (value.length < 5) {
    //       err.email = "Enter valid email id.";
    //     } else {
    //       err.email = "";
    //     }
    //     break;

    //   case "password":
    //     if (value.length < 5 || value.length > 20) {
    //       err.password = "Invalid Password: Minimum 8 charactes.";
    //     } else {
    //       err.password = "";
    //     }
    //     break;

    //   default:
    //     console.log("Not applicable");
    // }
  };

  //submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted value: ", data);

    let users = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    // console.log(users);

    // let { name, value } = event.target;

    // if (!users.username || users.username < 5 || users.username > 20) {
    //   setFormvalid(
    //     "Username should be 5 - 15 characters and shouldn't include any special characters!"
    //   );
    //   return;
    // }

    // case "email":
    //   if (emailError || !email) {
    //     setFormvalid("Email is invalid. Pleae re-enter.");
    //     return;
    //   }
    //   break;

    // case "password":
    //   if (passwordError || !password) {
    //     setFormvalid(
    //       "Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $)."
    //     );
    //     return;
    //   }

    axios
      .get(api_url)
      .then((res) => {
        console.log("Get: ", res);
        const Exist = res.data.find((u) => u.username === data.username);
        const existEmail = res.data.find((abc) => abc.email === data.email);

        if (Exist) {
          alert(" Username already exist!");
        } else if (existEmail) {
          alert("Email already exist!");
        } else {
          axios
            .post(api_url, users)
            .then((res) => console.log("Axios: ", res))
            .catch((err) => console.log("Error: ", err));
          alert("Sign up successful!");
          navigation("loginpage");
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
      <Typography level="h1">SIGN UP</Typography>
      <hr />
      <TextField
        id="standard-basic"
        type="text"
        label="Username"
        name="username"
        variant="standard"
        onChange={handleChange}
      />
      <br />
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
      <Button
        variant="contained"
        type="submit"
        startIcon={<AccountCircleIcon />}
      >
        signup
      </Button>
      <p>{formvalid && <Alert severity="error">{formvalid}</Alert>}</p>
      <p>{success && <Alert severity="success">{success}</Alert>}</p>
    </Box>
  );
};

export default Registration;
