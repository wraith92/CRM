import React, { useState, useRef ,useEffect,useMemo} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import checkForm from "../common/Register/checkedForm"
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
//react table
import { useTable } from "react-table";
//material ui table 
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import 'moment/locale/fr';

import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Divider
} from '@material-ui/core';


const Register = (props) => {
  //css style 
  //css
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 200,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 950
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));
    //variable liste des UserService
  const [searchTitle, setSearchTitle] = useState("");
  const [listuser,setListeUser] = useState([]);
   //variable liste authetification 
   const [listauth, setListeAuth] = useState([]);
   const listauthRef = useRef();
   listauthRef.current = listauth;
  //register user variable
  const form = useRef();
  const checkBtn = useRef();
  const vrole = checkForm.vrole;
  const vusername =checkForm.vusername;
  const vpassword = checkForm.vpassword;
  const vemail = checkForm.vemail;
  const required = checkForm.required;
//les status des variable 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
 //useEffect de toute la table Register
  useEffect(() => {
    retrieveTutorials();
    retrieveUsers();
  }, []);
  


 //afficher la liste des users
  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        setListeUser(response.data);
        
      })
  };
  console.log(UserService.getListe_User())

  
   //afficher la liste des hauthentification
  const retrieveTutorials = () => {
    AuthService.get_historique_auth()
      .then((response) => {
        setListeAuth(response.data);
      })
    
  };
  listauth.sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const refreshList = () => {
    retrieveTutorials();
  };
  const removeAllTutorials = () => {
    AuthService.removeAll_historique_auth()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
 
  const deleteTutorial = (rowIndex) => {
    const id = listauthRef.current[rowIndex].id;
    console.log(id)

    AuthService.remove_historiqueremove(id)
      .then((response) => {
        props.history.push("Register");

        let newTutorials = [...listauthRef.current];
        newTutorials.splice(rowIndex, 1);

        setListeAuth(newTutorials);
      })
      .catch((e) => {
        console.log('tets');
      });
  };
  const openTutorial = (rowIndex) => {
    const id = listauthRef.current[rowIndex].id;

    props.history.push("/tutorials/" + id);
  };
  
  
  
// liste des auths  



  //liste des users 
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    /*const colu = useMemo(
    () => [
      {
        Header: "Userame",
        accessor: "username",
      },
      {
        Header: "Role",
        accessor: "role",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="bx bxs-trash-alt action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: listauth,
  }); 
  */
    //crud ajouter un user
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeRoles = (e) => {
    const role = e.target.value;
    setRoles([...roles,role]);
  
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email,roles, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },

        (error) => {
            console.log(roles)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  
    return (
      <div className="col-md-12">

        <h1>
          gestion utilisateur
        </h1>
    {/* liste des users */}
        <div className="card card-container">
          <div className="list row">
            <div className="col-md-12 list">
              <h3>Listes des Utilisateurs</h3>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>nom</TableCell>
                          <TableCell className={classes.tableHeaderCell}>email</TableCell>
                          <TableCell className={classes.tableHeaderCell}>password</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listuser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.name}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.name} src='.' className={classes.avatar}/>
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.username}</Typography>
          
                                    </Grid>
                                </Grid>
                              </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.company}</Typography>
                              </TableCell>
                            <TableCell>*********</TableCell>
                            <TableCell>
                                <Typography 
                                  className={classes.status}
                                  style={{
                                      backgroundColor: 
                                      ((row.status === 'Active' && 'green') ||
                                      (row.status === 'Pending' && 'blue') ||
                                      (row.status === 'Blocked' && 'orange'))
                                  }}
                                >{row.status}</Typography>
                              </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                      <TablePagination
                          rowsPerPageOptions={[5, 10, 15]}
                          component="div"
                          count={listuser.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                      </TableFooter>
                    </Table>
                  </TableContainer>
            </div> 
          </div>
        </div>
    {/* liste des connections */}
        <div className="card card-container">
          <div className="list row">
            <div className="col-md-12 list">
              <h3>Historique des Authentifications</h3> 
          
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell}>Username</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Password</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Message</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Date De Connection</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listauth.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row.name}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.name} src='.' className={classes.avatar}/>
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.username}</Typography>
          
                                    </Grid>
                                </Grid>
                              </TableCell>
                            
                            <TableCell>{row.password}</TableCell>                 
                            <TableCell>
                                <Typography 
                                  className={classes.status}
                                  style={{
                                      backgroundColor: 
                                      ((row.message === 'Connexion établie  !' && 'green') ||
                                      (row.message === 'Connexion échouée  !' && 'red'))
                                  }}
                                >{row.message}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="primary" variant="subtitle2">{moment(row.date_connection).format("DD  MMMM YYYY HH:mm")}</Typography>
              
                              </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                      <TablePagination
                          rowsPerPageOptions={[5, 10, 15]}
                          component="div"
                          count={listauth.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                      </TableFooter>
                    </Table>
                  </TableContainer>
            </div>
          </div>
        </div>
    {/* ajouter un user */}
          <div className="card card-container">
            <h3>Ajouter un utilisateur</h3>
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          validations={[required, vusername]}
                        />
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, vemail]}
                        />
                      </div>          
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>

                      <div className="form-check container">
                        <div className="row">
                        <label className="form-check-label" htmlFor="role">cemeca</label>
                        <Input 
                          type="checkbox"
                          className="form-check"
                          name="cemeca"
                          value="1"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                        <label className="form-check-label" htmlFor="role">sofitech</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="sofitech"
                          value="2"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                        <label className="form-check-label" htmlFor="role">admin cemeca</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="admin_cemeca"
                          value="3"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                        <label className="form-check-label" htmlFor="role">admin sofitech</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="admin_sofitech"
                          value="4"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                        </div>
                          <label className="form-check-label" htmlFor="role">super_cemeca</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="super_cemeca"
                          value="5"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                          <label className="form-check-label" htmlFor="role">super_sofitech</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="super_sofitech"
                          value="6"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        />
                          <label className="form-check-label" htmlFor="role">super_admin</label>
                          <Input
                          type="checkbox"
                          className="form-check"
                          name="super_admin1"
                          value="7"
                          onChange={onChangeRoles}
                          validations={[required, vrole]}
                        /> 
                        <label className="form-check-label" htmlFor="role">super_admin2</label>
                        <Input
                        type="checkbox"
                        className="form-check"
                        name="super_admin2"
                        value="8"
                        onChange={onChangeRoles}
                        validations={[required, vrole]}
                      />
                      </div>
          
                      <div className="form-group">
                        <button className="btn btn-primary btn-block">Ajouter</button>
                      </div>
                    </div>
                  )}

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
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
          </div> 
        </div>
    );
  }
  export default Register;

