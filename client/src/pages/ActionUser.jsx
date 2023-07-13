import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Form from "react-validation/build/form";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CheckButton from "react-validation/build/button";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthAction from '../services/Action';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import RoleUser from "../controllers/Role";
import moment from "moment";
import UserService from "../services/user.service";
import 'moment/locale/fr';
//table class
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@mui/material/Chip';

const initialSocieteState = {
  id: "",
  validation: "",
};

function ActionDetails() {
  //GET role admin
  const myadmin = RoleUser.AdminRole();


  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);

  //GET USER INFO
  const user = AuthService.getCurrentUser()
  //GET Action 
  const [Vali, setVali] = useState({ initialSocieteState });
  const [Action, SetAction] = useState([]);
  const [ACtionFilter, SetActionFilter] = useState([]);
  const [Etat, setEtat] = useState([]);
  const [Test, setTest] = useState([]);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const [search, setSearch] = useState('');
  const [listuser, setListeUser] = useState([]);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(10);
  const [page2, setPage2] = React.useState(0);
  const handleChangePage2 = (event, newPage) => {
      setPage2(newPage);
  };
  const handleChangeRowsPerPage2 = (event) => {
      setRowsPerPage2(+event.target.value);
      setPage2(0);
  };

  //SELECT ALL SOCIETES WHERE AUTH
  const retrieveActions = (e) => {
    if (user) {
      AuthAction.findAll()
        .then((response) => {
          SetAction(response.data);

        })
        .catch((e) => {
          console.log(e);
        });

    }
  };
  //afficher la liste des users
  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        setListeUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const valideAction = (e) => {
    var data = {
      id: Test,
      validation: Etat,
    };

    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthAction.update(Test, data)
        .then(response => {
          setVali({
            id: response.data.id,
            validation: response.data.validation

          }
          );
          setSuccessful(true);
          window.location.reload()
        },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        )
        .catch(e => {
          console.log(e);

        });
    }

  }

  useEffect(() => {
    retrieveActions()
    retrieveUsers()

  }, []);
  useEffect(() => {
    if (myadmin) {
      SetActionFilter(Action)
      Action.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
    }
    else {
      const data = Action.filter(task => task.id_utili === user.id)
      SetActionFilter(data)
      ACtionFilter.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
    }


  }, [myadmin, Action]);
  console.log(Action, 'Action')
  console.log(ACtionFilter, 'filter Action')
  console.log(myadmin, 'admin')
  //CARD TABLE 
  const card = (
    <React.Fragment>
      {Etat == "realiser" ? (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-success"
                : ""
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      ) : (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-danger"
                : ""
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12 list">
          <div className="input-group mb-3">
            <div className="topnav">
              <div className="topnav__search">
                <input type="text"
                  className="form-control"
                  placeholder="Recherche "

                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className='bx bx-search'></i>
              </div>
            </div>
          </div>
        </div>

        {
          ACtionFilter
            .filter((e) => {
              return search.toLowerCase() === ''
                ? e
                : e.nom_societe.toLowerCase().includes(search.toLowerCase());


            }).map((e) =>
              <div className="col-4">
                <Card variant="outlined" >
                  <CardContent>

                    {e.validation == 'realiser' &&
                      <Typography variant="h5" component="div">
                        <Stack spacing={1} alignItems="center">
                          <Stack direction="row" spacing={1}>
                            <Alert severity="success">
                              <AlertTitle>Etat : réalisé </AlertTitle>
                            </Alert>
                          </Stack>

                        </Stack>
                      </Typography>
                    }
                    {e.validation == 'non realiser' &&
                      <Typography variant="h5" component="div">
                        <Stack spacing={1} alignItems="center">
                          <Stack direction="row" spacing={1}>
                            <Alert severity="warning">
                              <AlertTitle>Etat : Non réalisé </AlertTitle>
                            </Alert>
                          </Stack>

                        </Stack>
                      </Typography>
                    }

                    <Typography variant="body2">
                      Société : {e.nom_societe}
                    </Typography>

                    {myadmin &&
                      (listuser.filter(task => task.id === e.id_utili)).map((index) => (
                        <Typography variant="body2">
                          commerciale :{index.username}
                        </Typography>
                      ))}

                    <Typography sx={{ fontSize: 10 }}>
                      Date d'ajout dans le CRM : {moment(e.createdAt).format("DD  MMMM YYYY  HH:mm")}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                      Besoin : {e.besoin}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                      decription : {e.description}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Date activité commerciale : {moment(e.date_rdv).format("DD  MMMM YYYY  HH:mm")}
                    </Typography>
                    {e.nom_assur == 'non realiser' &&
                      <Typography variant="body2">
                        Déscription : {e.nom_assur} {e.date_assur}
                      </Typography>
                    }

                    {e.nom_factor == 'non realiser' &&
                      <Typography variant="body2">
                        Déscription : {e.nom_factor} {e.date_factor}
                      </Typography>
                    }
                  </CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs="auto">
                      <Form onSubmit={valideAction} ref={form}>

                        <button className="btn btn-success"
                          onClick={() => (setTest(e.id), setMessage('Activité commerciale Réalisé'), setEtat('realiser'))}
                          value={Vali.id = e.id}
                          name="id"
                        >
                          Réalisé
                        </button>

                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                      </Form>
                    </Grid>
                    <Grid item xs='auto'>

                      <Form onSubmit={valideAction} ref={form}>

                        <button className="btn btn-danger"
                          onClick={() => (setTest(e.id), setMessage('Activité  commerciale Réalisé Annulé'), setEtat('non realiser'))}
                          value={Vali.id = e.id}
                          name="id"
                        >
                          Non Réalisé
                        </button>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                      </Form>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button href={`/Actions/modifier/${e.id}`} color="warning"> Modifier</Button>
                    </Grid>
                  </Grid>
                </Card>
                <br />
              </div>
            )
        }

      </div>
      <CardActions>
        <Button href={`/`} size="small">Retour</Button>
      </CardActions>

    </React.Fragment>

  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <div className="row">
        <div variant="outlined">{card}</div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Nom société</TableCell>
                  <TableCell align="center">Date du RDV</TableCell>
                  <TableCell align="center">Nom interlocuteur</TableCell>
                  <TableCell align="center">Crédit_cop</TableCell>
                  <TableCell align="center">compte rendu </TableCell>
                  <TableCell align="center">besoin</TableCell>
                  <TableCell align="center">Etat</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>

              </TableBody>
              <TableBody>
                {

                  ACtionFilter.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <a href={`/modifier/${row.id}`}>{row.nom_societe}</a>
                      </TableCell>
                      <TableCell align="center">{moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}</TableCell>
                      <TableCell align="center">{row.nom_interlocuteur}</TableCell>
                      <TableCell align="center"> {row.credit_cop}</TableCell>
                      <TableCell align="center"> {row.description}</TableCell>
                      <TableCell align="center"> {row.besoin}</TableCell>
                      {row.validation === 'realiser' && (
                        <TableCell align="center">

                          <Chip label="réalisé" color="success" />


                        </TableCell>

                      )}
                      {row.validation === 'non realiser' && (
                        <TableCell align="center">
                          <Chip label="Non réalisé" color="error" />
                        </TableCell>
                      )}
                    </TableRow>

                  ))



                }

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            labelRowsPerPage='lignes par page'
            component="div"
            count={ACtionFilter.length}
            rowsPerPage={rowsPerPage2}
            page={page2}
            onPageChange={handleChangePage2}
            onRowsPerPageChange={handleChangeRowsPerPage2}
            labelDisplayedRows={({ from, to, count }) => `Affichage des pages ${from}-${to}`}
          />

        </div>
      </div>
    </Box>
  );

}

export default ActionDetails





