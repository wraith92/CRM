import React, { useEffect, useState, useRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Form from "react-validation/build/form";
import Box from '@mui/material/Box';
import ExportToExcel from 'react-export-table-to-excel';
import CheckButton from "react-validation/build/button";
import Button from '@mui/material/Button';
import AuthAction from '../services/Action';
import AuthService from "../services/auth.service";
import RoleUser from "../controllers/Role";
import moment from "moment";
import 'moment/locale/fr';
import Switch from '@mui/material/Switch';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TablePagination,
} from '@material-ui/core';
import UserService from '../services/user.service';

const ActionDetails = () => {
  const [showFullDescription, setFullDescription] = useState(false);
  const myadmin = RoleUser.AdminRole();
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    if (!text) {
      return null;
    }

    return (
      <p className="text">
        {isReadMore ? text.slice(0, 30) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

  const user = AuthService.getCurrentUser();
  const [Vali, setVali] = useState({});
  const [Action, SetAction] = useState([]);
  const [ACtionFilter, SetActionFilter] = useState([]);
  const [Etat, setEtat] = useState([]);
  const [Test, setTest] = useState([]);
  const [checked, setChecked] = useState(false);
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  const [realiserFilter, setRealiserFilter] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [listuser, setListeUser] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const retrieveActions = () => {
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

  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        setListeUser(response.data);
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
    if (checkBtn.current && checkBtn.current.context && checkBtn.current.context._errors.length === 0) {
      AuthAction.update(Test, data)
        .then(response => {
          setVali({
            id: response.data.id,
            validation: response.data.validation,
          });
          setSuccessful(true);
          window.location.reload();
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    retrieveActions();
    retrieveUsers();
  }, []);

  useEffect(() => {
    console.log("ACtionFilter:", ACtionFilter);
    console.log("page:", page);
    console.log("rowsPerPage:", rowsPerPage);

    if (myadmin) {
      SetActionFilter(Action);
      Action.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
    } else {
      const data = Action.filter((task) => task.id_utili === user.id);
      data.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
      SetActionFilter(data);
    }

    // Apply the filter based on "Etat" (Status)
    if (realiserFilter) {
      SetActionFilter((prevFilter) => prevFilter.filter((task) => task.validation === 'realiser'));
    } else {
      SetActionFilter((prevFilter) => prevFilter.filter((task) => task.validation === 'non realiser'));
    }

    // Apply the filter based on the search term
    if (searchTerm !== '') {
      SetActionFilter((prevFilter) =>
        prevFilter.filter((task) => task.nom_societe.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Update the page when filters change
    setPage(0);
  }, [myadmin, Action, searchTerm, realiserFilter, page, rowsPerPage]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value || '';
    setSearchTerm(searchTerm);
  };

  const renderCardRow = (e) => {
    return (
      <TableRow key={e.id} style={{ fontSize: '10px' }}>
        <TableCell style={{ fontSize: '6px' }}>
          {e.validation === 'realiser' ? (
            <Alert severity="success">
              <AlertTitle></AlertTitle>
            </Alert>
          ) : (
            <Alert severity="warning">
              <AlertTitle></AlertTitle>
            </Alert>
          )}
        </TableCell>
        <TableCell style={{ fontSize: '8px' }}>{e.nom_societe}</TableCell>
        {myadmin &&
          (listuser.filter((task) => task.id === e.id_utili)).map((index) => (
            <TableCell style={{ fontSize: '8px' }}>
              <Typography variant="body2" key={index.id} style={{ fontSize: '8px' }}>
                {index.username}
              </Typography>
            </TableCell>
          ))}
        <TableCell style={{ fontSize: '10px' }}>
          {moment(e.date_rdv).format('DD MMMM YYYY HH:mm')}
        </TableCell>
        <TableCell style={{ fontSize: '8px' }}>{e.nom_interlocuteur}</TableCell>
        <TableCell style={{ fontSize: '8px' }}>{e.besoin}</TableCell>
        <TableCell style={{ fontSize: '8px' }}><ReadMore>{e.description}</ReadMore></TableCell>
        <TableCell style={{ fontSize: '8px' }}>
          {moment(e.createdAt).format('DD MMMM YYYY HH:mm')}
        </TableCell>
        <TableCell style={{ fontSize: '8px' }}>
          <Form onSubmit={valideAction} ref={form}>
            <button
              className="btn btn-success"
              onClick={() =>
                (setTest(e.id),
                  setMessage('Activité commerciale Réalisée'),
                  setEtat('realiser'))
              }
              value={Vali.id = e.id}
              name="id"
              style={{ fontSize: '8px', padding: '4px' }}
            >
              Réalisé
            </button>
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </TableCell>
        <TableCell style={{ fontSize: '8px' }}>
          <Form onSubmit={valideAction} ref={form}>
            <button
              className="btn btn-danger"
              onClick={() =>
                (setTest(e.id),
                  setMessage('Activité commerciale Réalisée Annulée'),
                  setEtat('non realiser'))
              }
              value={Vali.id = e.id}
              name="id"
              style={{ fontSize: '8px', padding: '4px' }}
            >
              Non Réalisé
            </button>
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </TableCell>
        <TableCell>
          <Button href={`/Actions/modifier/${e.id}`} color="warning" size="small" style={{ fontSize: '8px' }}>
            Modifier
          </Button>
        </TableCell>
      </TableRow>
    );
  };
  const getTableDataForExcel = () => {
    // Extracting data for Excel export
    const data = ACtionFilter.map((item) => ({
      Etat: item.validation === 'realiser' ? 'Réalisé' : 'Non Réalisé',
      Société: item.nom_societe,
      Commerciale: item.id_utili, // Replace with the appropriate user data
      DateActivitéCommerciale: moment(item.date_rdv).format('DD MMMM YYYY HH:mm'),
      INTERLOCUTEUR: item.nom_interlocuteur,
      Besoin: item.besoin,
      Description: item.description,
      DateAjout: moment(item.createdAt).format('DD MMMM YYYY HH:mm'),
    }));
  
    console.log(data); // Add this line to check if the data is correct
  
    // Pass data and filename to ExportToExcel component
    return <ExportToExcel data={data} fileName="action_data" />;
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <div className="row">
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              placeholder="recherche par Société"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Switch
              {...label}
              onChange={() => setRealiserFilter(!realiserFilter)}
              checked={realiserFilter}
            />
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            {/* Add the Download Button */}
            <Button variant="contained" color="primary" onClick={() => getTableDataForExcel}>
  Download Excel
</Button>
          </Grid>
        </Grid>

        <div variant="outlined">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '40px', fontSize: '10px' }}>Etat</TableCell>
                  <TableCell style={{ width: '60px', fontSize: '10px' }}>Société</TableCell>
                  <TableCell style={{ width: '80px', fontSize: '10px' }}>Commerciale</TableCell>
                  <TableCell style={{ width: '120px', fontSize: '10px' }}>Date activité commerciale</TableCell>
                  <TableCell style={{ width: '120px', fontSize: '10px' }}>INTERLOCUTEUR</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Besoin</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Description</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Date d'ajout</TableCell>
                  <TableCell style={{ width: '70px', fontSize: '10px' }}>Réalisé</TableCell>
                  <TableCell style={{ width: '80px', fontSize: '10px' }}>Non Réalisé</TableCell>
                  <TableCell style={{ width: '70px', fontSize: '10px' }}>Modifier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ACtionFilter
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(renderCardRow)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={Action.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </Box>
  );
};

export default ActionDetails;
