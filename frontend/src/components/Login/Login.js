import React from "react";
import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Toolbar,
} from "@material-ui/core";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { useFormik } from "formik";
import GameOn from './GameOn.png';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, MemoryRouter as Router, Route, Switch } from "react-router-dom";
import './Login.css';
import background from "../../asset/pc-game.jpg";


function Copyright(props) {
  return (
    <Typography
      variant="body3"
      color="text.secondary"
      align="center"
      {...props}
    >
    </Typography>
  );
}
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 10,
  },
}));

const Logins = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handlePasswordChange = (prop) => (event) => { setValues(event.target.value) };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      alert("gggg")
      alert(values)
      var loginData = {
        email: values.email,
        password: values.password,
      };
      alert(loginData)
      const myJSON = JSON.stringify(loginData);
      window.backend.mylogin(myJSON).then((result) => {
        setResult(result)
        const userObj = JSON.parse(result)
        console.log(userObj)
        var data = [];
        data.push(userObj)
        if (data.length > 0) {
          alert("kkk")
          return (
            <Link to="/home"></Link>
          )
        }
        else {
          alert("login failed");
        }
      }
      );
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Enter a  email "),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be atleast 6 characters"),
    }),
  });
  const paperStyle1 = {
    padding: 20,
    height: "60",
    width: 450,
    margin: "70px auto",
  };
  const paperStyle2 = {
    padding: 20,
    height: "4.8",
    width: 450,
    margin: "5px auto",
  };

  const PasswordStyle = {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    position: "relative",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    padding: "9px 12px 10px",
  }

  const btnstyle = { margin: "20px 0" }
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("please enter valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const buttonTheme = createMuiTheme({
    palette: {
      primary: deepOrange,
    },
  });
  const handleClickShowPassword = () => { setValues({ ...values, showPassword: !values.showPassword }); };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh', backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="container">
        <Box sx={{ flexGrow: 1 }}>
          <StyledToolbar>
            <Card elevation={20} style={paperStyle1}>
              <Grid align="center">
                <Box
                  component="img"
                  sx={{
                    height: "auto",
                    width: 250,
                    maxHeight: { xs: 450, md: 450 },
                    maxWidth: { xs: 450, md: 450 },
                  }}
                  alt="GameOn"
                  src={GameOn}
                />
                <Typography variant="h5">
                  Smart way to test Digital Apps
                </Typography>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-textarea"
                        label="email"
                        placeholder="email"
                        multiline
                        variant="filled"
                        fullWidth
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={
                          formik.touched.email ? formik.errors.email : ""
                        }
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                <br></br>
                <Box sx={{ display: "flex", alignItems: "flex-end", ml: 4 }}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item xs={12}>
                      <Input type={values.showPassword ? "text" : "password"}
                        onChange={handlePasswordChange("password")}
                        value={formik.values.password} style={PasswordStyle}
                        placeholder="password"
                        endAdornment={<InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>} />
                    </Grid>
                  </Grid>
                </Box>
                {error && <div>{error}</div>}
                <br></br>
                <ThemeProvider theme={buttonTheme}>
                  <Grid container justify="center">
                    <Button color="primary" type="submit" variant="contained">
                      <Link to="/select-page" className="select-link">Login</Link>
                    </Button>
                  </Grid>
                </ThemeProvider>
              </form>
              <br></br>
            </Card>
          </StyledToolbar>
          <br></br>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </div>
    </div>
  );
};

export default Logins;