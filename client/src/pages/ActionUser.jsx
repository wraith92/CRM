import React, { useEffect, useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import CheckButton from "react-validation/build/button";
import Button from '@mui/material/Button';
import AuthAction from '../services/Action';
import AuthService from "../services/auth.service";
import RoleUser from "../controllers/Role";
import moment from "moment";
import Societe from '../controllers/Societe';
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
} from '@material-ui/core';
import UserService from '../services/user.service';
import { accordionActionsClasses } from '@mui/material';

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
  const [societeListe,SetsocieteListe]=useState([]);
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  const [ setSuccessful] = useState(false);
  const [ message,setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [listuser, setListeUser] = useState([]);
  const mysofitech = RoleUser.SofitechRole();
//GET role cemece
const mycemeca = RoleUser.CemecaRole
  const tableRef = useRef(null);


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
  const valideAction = () => {
    // Préparer les données pour la mise à jour
    var data = {
      id: Test,
      validation: Etat,
    };
  
    // Valider le formulaire
    form.current.validateAll();
  
    // Vérifier s'il n'y a pas d'erreurs de validation
    if (
      checkBtn.current &&
      checkBtn.current.context &&
      checkBtn.current.context._errors.length === 0
    ) {
      // Effectuer la mise à jour via l'API
      AuthAction.update(Test, data)
        .then((response) => {
          // Mettre à jour l'état après la mise à jour réussie
          setVali({
            id: response.data.id,
            validation: response.data.validation,
          });
  
          // Mettre à jour l'état successful pour afficher un message
          setSuccessful(true);
  
          // Recharger la page pour afficher les mises à jour
          window.location.reload();
        })
        .catch((e) => {
          // Gérer les erreurs de mise à jour
          console.log("Error during update:", e);
        });
    }
  };
  
  

  useEffect(() => {
    retrieveActions();
    retrieveUsers();
  }, []);

  useEffect(() => {
    if (myadmin) {
      SetActionFilter(Action);
      Action.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
    } else {
      const data = Action.filter((task) => task.id_utili === user.id);
      data.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
      SetActionFilter(data);

    }

    // Apply the filter based on "Etat" (Status)
   
       if (mysofitech) Societe.AllSociete().then(data => SetsocieteListe(data))
    
    

    // Apply the filter based on the search term
    if (searchTerm !== '') {
      SetActionFilter((prevFilter) =>
        prevFilter.filter((task) => task.nom_societe.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Update the page when filters change
  }, [myadmin, Action, searchTerm,,mysofitech]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value || '';
    setSearchTerm(searchTerm);
  };

  const renderCardRow = (e) => {
    const isRealiser = e.validation === 'realiser';
    console.log("Action data:", e);
    console.log("societeListe:", societeListe);
    console.log("Filtered:", societeListe.filter((task) => task.nom_soc.toLowerCase() === e.nom_societe.toLowerCase()));
 
    return (
      <TableRow key={e.id} style={{ fontSize: '10px' }}>

<TableCell style={{ fontSize: '8px' }}>
{societeListe
  .filter((task) => task.nom_soc.toLowerCase() === e.nom_societe.toLowerCase())
  .map((index) => (
    <a href={`/Societe/${index.siret}`} key={index.id}>
      {index.nom_soc}
    </a>
  ))
}
</TableCell>
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
        <TableCell style={{ fontSize: '8px' }}>{e.credit_cop}</TableCell>
        <TableCell style={{ fontSize: '8px' }}>{e.nom_interlocuteur}</TableCell>
        <TableCell style={{ fontSize: '8px' }}>{e.besoin}</TableCell>
        <TableCell style={{ fontSize: '8px' }}><ReadMore>{e.description}</ReadMore></TableCell>
        <TableCell style={{ fontSize: '8px' }}>
          {moment(e.createdAt).format('DD MMMM YYYY HH:mm')}
        </TableCell>
        <TableCell style={{ fontSize: '8px' }}>
     <Form onSubmit={valideAction} ref={form}>
     <button
  className="btn"
  onClick={() => {
    setTest(e.id);
    setMessage(e.validation === 'realiser' ? 'Activité commerciale Réalisée Annulée' : 'Activité commerciale Réalisée');
    setEtat(e.validation === 'realiser' ? 'non realiser' : 'realiser');
    valideAction(e); // Appeler la fonction de validation
  }}
  style={{
    fontSize: '8px',
    padding: '4px',
    color: e.validation === 'realiser' ? 'white' : 'black',
    backgroundColor: e.validation === 'realiser' ? 'green' : 'red',
    border: 'none',
    cursor: 'pointer',
  }}
>
  {e.validation === 'realiser' ? 'Réalisé' : 'Non Réalisé'}
</button>

  <CheckButton style={{ display: 'none' }} ref={checkBtn} />
</Form>
      </TableCell>
      <TableCell>
      <Button
        href={`/Actions/modifier/${e.id}`}
        color="warning"
        size="small"
        style={{ fontSize: '8px' }}
        startIcon={<EditIcon />} // Add the icon to the startIcon prop
      >
      </Button>
    </TableCell>
      </TableRow>
    );
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
         
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            {/* Add the Download Button */}
            <DownloadTableExcel
              filename={"Compte-rendu"}
              sheet={"Compte-rendu"}
              currentTableRef={tableRef.current}
            >
              <Button variant="contained" color="success" >
                Excel
              </Button>
            </DownloadTableExcel>

          </Grid>
        </Grid>

        <div variant="outlined">
          <TableContainer component={Paper}>
            <Table ref={tableRef}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '60px', fontSize: '10px' }}>Société</TableCell>
                  <TableCell style={{ width: '80px', fontSize: '10px' }}>Commercial</TableCell>
                  <TableCell style={{ width: '120px', fontSize: '10px' }}>Date action commercial</TableCell>
                  <TableCell style={{ width: '120px', fontSize: '10px' }}>Credit_cop</TableCell>
                  <TableCell style={{ width: '120px', fontSize: '10px' }}>Interlocuteur</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Besoin</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Description</TableCell>
                  <TableCell style={{ width: '100px', fontSize: '10px' }}>Date d'ajout</TableCell>
                  <TableCell style={{ width: '70px', fontSize: '10px' }}>Etat</TableCell>
                  <TableCell style={{ width: '70px', fontSize: '10px' }}>Modifier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ACtionFilter.map(renderCardRow)}
              </TableBody>
            </Table>
          </TableContainer>
         
        </div>
      </div>
    </Box>
  );
};

export default ActionDetails;
