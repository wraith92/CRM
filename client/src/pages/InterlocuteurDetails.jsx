import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import AuthInterlocuteur from "../services/Interlocuteur";
import 'moment/locale/fr';
import Societe from '../controllers/Societe';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

function InterlocuteurDetails() {
  // Fonction pour calculer le temps restant avant l'expiration
  const calculateTimeRemaining = (expirationDate) => {
    const now = moment(); // Date actuelle
    const expiration = moment(expirationDate); // Date d'expiration
    const duration = moment.duration(expiration.diff(now)); // Différence entre la date d'expiration et la date actuelle

    // Obtenez le nombre de jours, heures et minutes restants
    const daysRemaining = duration.days();
    const hoursRemaining = duration.hours();
    const minutesRemaining = duration.minutes();

    // Construisez la chaîne de temps restant
    let timeRemaining = '';
    if (daysRemaining > 0) {
      timeRemaining += `${daysRemaining} jour(s) `;
    }
    if (hoursRemaining > 0) {
      timeRemaining += `${hoursRemaining} heure(s) `;
    }
    if (minutesRemaining > 0) {
      timeRemaining += `${minutesRemaining} minute(s) `;
    }

    return timeRemaining.trim(); // Supprimez les espaces inutiles
  };

  // GET interlocuteur
  const [Inter, SetInter] = useState([]);
  const [search, setSearch] = useState('');
  const [listuser, setListeUser] = useState([]);
  const [listSoc, setSoc] = useState([]);

  const handleEmailConfirmation = async (interlocuteurId) => {
    try {
      const response = await axios.get(`http://localhost:8080/send_mail_confirmation_interlocuteur/${interlocuteurId}`);
      console.log(response.data);
      // Vous pouvez ajouter ici une logique pour gérer la réponse si nécessaire
    } catch (error) {
      console.error('Erreur lors de la confirmation par e-mail:', error);
      // Vous pouvez ajouter ici une logique pour gérer les erreurs si nécessaire
    }
  };

  // Fonction pour archiver un interlocuteur expiré
  const archiveInterlocuteur = async (interlocuteurId) => {
    try {
      await AuthInterlocuteur.archiveExpired();
      console.log('Interlocuteur archivé avec succès');
      // Vous pouvez ajouter ici une logique pour gérer la réponse si nécessaire
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'interlocuteur:', error);
      // Vous pouvez ajouter ici une logique pour gérer les erreurs si nécessaire
    }
  };

  // Select all interlocuteur
  const retrieveInterlocuteur = () => {
    AuthInterlocuteur.findAll()
      .then((response) => {
        SetInter(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retriveSociete = () => {
    Societe.AllSociete().then(data => setSoc(data))
  }

  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        setListeUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveInterlocuteur();
    retrieveUsers();
    retriveSociete();

    // Vérifiez si le temps restant est null et archivez l'interlocuteur
    Inter.forEach((e) => {
      const timeRemaining = calculateTimeRemaining(moment(e.createdAt).add(3, 'days'));
      console.log(timeRemaining);
      if (timeRemaining === '') {
        // Le temps restant est nul, archivez l'interlocuteur
        archiveInterlocuteur(e.id_interlocuteur);
      }
    });
  }, []);

  return (
    <div className="row">
      <div className="col-12 list">
        <div className="topnav">
          <div className="topnav__search">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche "
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className='bx bx-search'></i>
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ minWidth: 260 }}>
          {Inter.filter((e) => {
            return search.toLowerCase() === ''
              ? e
              : e.nom.toLowerCase().includes(search.toLowerCase());
          }).map((e) => (
            <Card variant="outlined" key={e.id_interlocuteur}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <i class='bx bxs-id-card'></i>: {e.nom}
                </Typography>
                <Typography variant="body2">
                  Fonction : {e.fonction_inter}
                </Typography>

                {(listuser.filter((task) => task.id === e.id_utili)).map((c) => (
                  <Typography variant="body2" key={c.id}>
                    nom commercial : {c.username}
                  </Typography>
                ))}
                {(listSoc.filter((task) => task.siret === e.id_soc)).map((c) => (
                  <Typography variant="body2" key={c.siret}>
                    Societe : {c.nom_soc}
                  </Typography>
                ))}
                <Typography variant="body2">
                  Email : {e.email}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Telephone : {e.tel}
                </Typography>
                {!e.isConfirmed ? (
                  <React.Fragment>
                    <Typography variant="body2" color="text.secondary">
                      Statut de confirmation : En attente
                    </Typography>
                    {console.log(moment(e.createdAt).add(3, 'days'))}
                    <Typography variant="body2" color="text.secondary">
                      Temps restant : {calculateTimeRemaining(moment(e.createdAt).add(3, 'days'))}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleEmailConfirmation(e.id_interlocuteur)}
                    >
                      Confirmer par e-mail
                    </Button>
                  </React.Fragment>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Statut de confirmation : Confirmé
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button href={`/Inter/modifier/${e.id_interlocuteur}`} size="small">
                  Modifier
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default InterlocuteurDetails;
