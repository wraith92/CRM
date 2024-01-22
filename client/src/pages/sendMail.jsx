import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ReactLoading from 'react-loading';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from "../components/LoadingPage";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://crm.sofitech.pro/">
        sofitech & cemeca
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const PasswordForget = () => {
  let history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setmail] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [message, setMessage] = useState("");

  const onChangeMail = (e) => {
    const email = e.target.value;
    setmail(email);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.forgotPassword(email).then(
        () => {
          const message = 'mail envoyé !';
          setLoading(true)
         
          setTimeout(() => {
                setLoading(false)
              }, 1000)
              setMessage(message);
        },
      );
    } else {

    }
  };
  return (

    <div className="col-md-12">
      {loading ?
        (
        <div className="card card-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />

              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
                <br></br>
                <Loader />
              </Typography>

            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>

        <Form onSubmit={handleLogin} ref={form}>

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>)
        : (
          <div className="card card-container">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  recupration de mot de passe
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChangeMail}
                    id="email"
                    label="votre mail"
                    name="email"
                    value={email}
                    autoComplete="username"
                    autoFocus
                  />
              
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    envoyer mail
                  </Button >
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-success" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <Grid container>
                    <Grid item xs>

                    </Grid>
                    <Grid item>

                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>

          <Form onSubmit={handleLogin} ref={form}>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
        )}

    </div>
  );
};
export default PasswordForget;
