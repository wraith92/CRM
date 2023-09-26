import React, { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";  // Import de useParams
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AuthService from "../services/auth.service";
import Avatar from "@mui/material/Avatar";
import Link from '@mui/material/Link';
import EyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "../components/LoadingPage";
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://crm.sofitech.pro/">
          sofitech 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const theme = createTheme();
function Resetpassword() {
  const history = useHistory();
  const  params  = useParams(); 
  var resetToken =params.id;
  console.log(resetToken) // Récupérer le token depuis les paramètres d'URL
  const form = useRef();
  const checkBtn = useRef();
  const [newPassword, setNewPassword] = useState("");  // Nouvelle variable d'état pour le nouveau mot de passe
  const [confirmPassword, setConfirmPassword] = useState("");  // Nouvelle variable d'état pour la confirmation du mot de passe
  const [loading, setLoading] = useState(undefined);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangePassword = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
  };

  const onChangeConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setMessage("");

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      // Vérification des mots de passe
      if (newPassword !== confirmPassword) {
        setMessage("Les mots de passe ne correspondent pas.");
        return;
      }
      const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/;
      if (!passwordPattern.test(newPassword)) {
        setMessage(
          "Le mot de passe doit avoir au moins 10 caractères, une majuscule et un caractère spécial (!@#$%^&*)."
        );
        return;
      }
      console.log(resetToken, newPassword)
      // Appel de la méthode resetPassword du service AuthService avec le token et le nouveau mot de passe
      AuthService.resetPassword(resetToken, newPassword).then(() => {
        const successMessage = "Mot de passe réinitialisé avec succès !";
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          history.push("/login");
        }, 1000);
        setMessage(successMessage);
      });
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

        <Form onSubmit={handleResetPassword} ref={form}>

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
                récupération de mot de passe
                </Typography>
                <Box component="form" onSubmit={handleResetPassword} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChangePassword}
                    id="newPassword"
                    label="votre password"
                    name="newPassword"
                    value={newPassword}
                    autoComplete="newPassword"
                    autoFocus
                    type={showPassword ? 'text' : 'password'} // Utilisez le type 'text' pour afficher en clair
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <EyeOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                   <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={onChangeConfirmPassword}
                    id="confirmPassword"
                    label="confiramtion de votre password"
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="confirmPassword"
                    autoFocus
                    type={showPassword ? 'text' : 'password'} // Utilisez le type 'text' pour afficher en clair
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <EyeOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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

          <Form onSubmit={handleResetPassword} ref={form}>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
        )}

    </div>
  );
};
export default Resetpassword;
