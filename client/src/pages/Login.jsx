import React, { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
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

const Login = () => {
  let history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [successful, setSuccessful] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [message, setMessage] = useState("");
  const [messagevalidation, setMessagevalidation] = useState("");
  const openVerificationModal = () => {
    setShowVerificationModal(true);
  };
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (response) => {
          const message = 'Mail envoyé. Vérifiez votre boîte de réception pour le code de vérification.';
          const password = '********'
          setLoading(true)
          setMessage(message);
          setSuccessful(true);
          setTimeout(() => {
                setLoading(false)
                openVerificationModal();
              }, 1000)


          AuthService.create_historique_auth(username, password, message).then(
            () => {
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setMessage(resMessage);

            }
          );
        },
        (error) => {
          const message = 'connection echouer !'
          AuthService.create_historique_auth(username, password, message).then(
            () => {
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              setMessage(resMessage);
            }
          );
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          console.log(message)
        }
      );
    } else {

    }
  };
  const handleVerification = (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setVerificationError("Veuillez saisir le code de vérification.");
      return;
    }

    AuthService.twoFactorAuth(username,verificationCode).then(
      (data) => {
        if (data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(data));
          history.push("/"); // Rediriger vers la page principale en cas de succès
        } else {
          setVerificationError("Code de vérification incorrect ou expiré.");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setVerificationError(resMessage);
      }
    );
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
              <a href="/forget-password">Mot de passe oublier ?</a>

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
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChangeUsername}
                    id="email"
                    label="Identifiant"
                    name="username"
                    value={username}
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Connection
                  </Button >
                  {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
                  <Grid container>
                    <Grid item xs>
                    <a href="/forget-password">Mot de passe oublier ?</a>
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
          <div className="col-md-12">
      {/* ... Le reste du code ... */}
      {/* Modal de vérification 2FA */}
      <Modal
        open={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        closeAfterTransition
     
      >
        <Fade in={showVerificationModal}>
          {/* Utiliser le composant Container pour centrer le modal */}
          <Container maxWidth="sm" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 8 }}>
            {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
              <h4 className="modal-title">Vérification 2FA</h4>
              <form onSubmit={handleVerification}>
                <div className="form-group">
              
                  <label htmlFor="verificationCode">Code de vérification</label>
                  <input
                    type="text"
                    className="form-control"
                    id="verificationCode"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                {verificationError && (
                  <div className="alert alert-danger" role="alert">
                    {verificationError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  Vérifier
                </button>
              </form>
            </Box>
          </Container>
        </Fade>
      </Modal>
    </div>
        </div>
        )}

    </div>
  );
};
export default Login;
