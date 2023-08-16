import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthInterlocuteur from "../services/Interlocuteur"
import AuthAction from "../services/Action"
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import RoleUser from "../controllers/Role";
import Societe from '../controllers/Societe';
import UserService from "../services/user.service";

function Customersinfo() {
  //GET role admin
  const myadmin = RoleUser.AdminRole();
  //timer 
  const Completionist = () => <span>Modification expirée !</span>;
  const Modification = () =>
    <CardActions>
      <Button href={`/modifier/${nb}`} size="small">modification</Button>
    </CardActions>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      return (
        <div>
          <span>
            {hours}:{minutes}:{seconds}

          </span>
          <Modification />
        </div>

      );
    }
  };


  //lister la societe selon l'id 
  const [ListSociete, SetSociete] = useState([]);
  //les interlocuteur de la societes selon l'id 
  const [listInter, SetInter] = useState([]);
   //GET USER INFO
 const user = AuthService.getCurrentUser()
  const [Liste_User, SetListe_User] = useState([]);
  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        SetListe_User(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);

  //FILTER  INTERLOCUTEUR WHERE ID SOCIETES 
  const id_soc = listInter.filter(task => task.id_soc === nb)
 
  //GET role sofitech
  const mysofitech = RoleUser.SofitechRole();
  //GET role cemece
  const mycemeca = RoleUser.CemecaRole();
  const [Action, SetAction] = useState([]);
  //SELECT ALL SOCIETES WHERE AUTH
  const retrieveTutorials = () => {
    if (user) {
      //ACTION 
      AuthAction.findAll().then((response) => {
        SetAction(response.data)
        console.log(response.data)
      })
        .catch((e) => {
          console.log(e);
        });
      //INTERLOCUTEUR   
      AuthInterlocuteur.findAll()
        .then((response) => {
          SetInter(response.data);

        })
        .catch((e) => {
          console.log(e);
        });





    }
  };
  useEffect(() => {
    Societe.AllSociete().then(data => SetSociete(data))
      ;
  }, [])
  //FILTER SOCIETES SELON L'ID 
  const actItem = ListSociete.filter(task => task.siret === nb)

  const test = actItem.map((e) => e.nom_soc)
  const x = test.toString()

  const activSoc = Action.filter(task => task.nom_societe === test.toString())
  activSoc.sort((a, b) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());

  useEffect(() => {
    retrieveTutorials()
    retrieveUsers()
    //ACTION 
  }, []);
  console.log(Liste_User)
// Function to get the responsible user name
const getResponsibleName = (responsibleId) => {
  const responsibleUser = Liste_User.find((user) => user.id === responsibleId);
  return responsibleUser ? responsibleUser.username : 'Unknown';
};
console.log(getResponsibleName(1))

  //CARD TABLE 
  const card = (
    <React.Fragment>
      {actItem.map((e) =>

        <CardContent>

          <Typography variant="h5" component="div">
            <i class='bx bxs-bank danger'></i>: {e.nom_soc}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            siret : {e.siret}
          </Typography>

          <Typography variant="body2">
            siren : {e.siren}
          </Typography>
          <Typography variant="body2">
            Résponsable : {getResponsibleName(e.id_utili)}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            date de creation : {moment(e.createdAt).format("DD  MMMM YYYY  HH:mm")}
          </Typography>
          {typeof e.description !== 'undefined' && e.observation !== '' && (
  <Typography variant="body2">
    observation : {e.description}
  </Typography>
)}

          <Typography variant="body2">
            Code naf : {e.activite_soc}
          </Typography>
          <Typography variant="body2">
            Libelle naf : {e.libelle_naf}
          </Typography>

          <Typography variant="body2">
            adresse postal  : {e.adresse_local} {e.ville_soc} {e.code_postal}
          </Typography>

          <Typography variant="body2">
            Origine du prospect : {e.origineprospect}
          </Typography>

          <Typography variant="body2">
            syndicat : {e.syndicat}
          </Typography>
     
          <Typography variant="body2">
            telephone : {e.tel}
          </Typography>

          <Typography variant="body1">
            les interlocuteurs ratacher a cette societe
            {
              id_soc.map((item, index) => (
                <Typography variant="body2" key={index}>
                  <i class='bx bxs-user'></i> {item.nom}
                </Typography>
              ))
            }
          </Typography>
          <Typography variant="body1" >
            les Activités Commerciales
            {
              activSoc.map((item, index) => (
                <div key={index}>
                  <Typography variant="body2">
                    <i class='bx bx-message-alt-dots'></i>{moment(item.date_rdv).format("DD  MMMM YYYY  HH:mm")}
                  </Typography>
                  {typeof item.besoin !== 'undefined' && item.besoin !== '' && (
                    <Typography variant="body2">
                      besoin : {item.besoin}
                    </Typography>
                  )}
                  {typeof item.description !== 'undefined' && item.description !== '' && (
                    <Typography variant="body2">
                      description : {item.description}
                    </Typography>
                  )}
                </div>

              ))
            }
          </Typography>

          <Typography variant="h5" component="div">
            <Stack spacing={1} alignItems="center">
              <CardActions>
                <Button href={`/modifier/${nb}`} size="small">modification</Button>
              </CardActions>
            </Stack>
          </Typography>
          <Typography variant="h5" component="div">
            <Stack spacing={1} alignItems="center">
              <CardActions>
                <Button href={`/Societes`} size="small">retour</Button>
              </CardActions>
            </Stack>
          </Typography>

        </CardContent>
      )}

    </React.Fragment>
  )
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default Customersinfo
