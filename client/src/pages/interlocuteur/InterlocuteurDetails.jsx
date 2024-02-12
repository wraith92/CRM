import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserService from "../../services/user.service";
import AuthInterlocuteur from "../../services/Interlocuteur";
import "moment/locale/fr";
import Societe from "../../controllers/Societe";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import "./InterlocuteurDetails.css";
import * as XLSX from 'xlsx';

function InterlocuteurDetails() {
  // Fonction pour calculer le temps restant avant l'expiration


  // GET interlocuteur
  const [Inter, SetInter] = useState([]);
  const [search, setSearch] = useState("");
  const [listuser, setListeUser] = useState([]);
  const [listSoc, setSoc] = useState([]);
  const calculateTimeRemaining = (createdAt) => {
    const creationDate = moment(createdAt); // Date de création
    const expirationDate = creationDate.add(30, 'days'); // 30 jours après la date de création
    const now = moment(); // Date actuelle
    const duration = moment.duration(expirationDate.diff(now)); // Différence entre 30 jours après la date de création et la date actuelle
  
    // Obtenez le nombre de jours, heures et minutes restants
    const daysRemaining = duration.days();
    const hoursRemaining = duration.hours();
    const minutesRemaining = duration.minutes();
  
    // Construisez la chaîne de temps restant
    let timeRemaining = "";
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

  const handleEmailConfirmation = async (interlocuteurId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/send_mail_confirmation_interlocuteur/${interlocuteurId}`
      );
      console.log(response.data);
      // Vous pouvez ajouter ici une logique pour gérer la réponse si nécessaire
    } catch (error) {
      console.error("Erreur lors de la confirmation par e-mail:", error);
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
    Societe.AllSociete().then((data) => setSoc(data));
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

  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Interlocuteurs");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  const handleExport = () => {
    const dataExport = Inter.map((interlocuteur) => {
      // Trouver le nom commercial associé
      const user = listuser.find((user) => user.id === interlocuteur.id_utili);
      const userName = user ? user.username : 'Non trouvé';
  
      // Trouver la société associée
      const soc = listSoc.find((societe) => societe.siret === interlocuteur.id_soc);
      const socName = soc ? soc.nom_soc : 'Non trouvée';
  
      // Calculer la date d'expiration (30 jours après la date de création)
       // Calculer la date d'expiration seulement si l'interlocuteur est en attente
    let expirationDate = '';
    if (!interlocuteur.isConfirmed) {
      expirationDate = moment(interlocuteur.createdAt).add(30, 'days').format('YYYY-MM-DD');
    }
  
      // Retourner un objet avec toutes les informations pour l'exportation
      return {
        'Nom': interlocuteur.nom,
        'Fonction': interlocuteur.fonction_inter,
        'Commercial': userName,
        'Société': socName,
        'Email': interlocuteur.email,
        'Téléphone': interlocuteur.tel,
        'Statut de Confirmation': interlocuteur.isConfirmed ? 'Confirmé' : 'En Attente',
        "Date d'Expiration": expirationDate,  // Ajoutez cette ligne pour l'expiration
        // ... Ajoutez d'autres propriétés si nécessaire
      };
    });
    exportToExcel(dataExport, "Liste_Interlocuteurs");
  };
  
  
  useEffect(() => {
    retrieveInterlocuteur();
    retrieveUsers();
    retriveSociete();

    // Déclenchez un appel API pour archiver les interlocuteurs expirés
    // Cette API exécutera la logique côté serveur
    AuthInterlocuteur.archiveExpired()
      .then((response) => {
        console.log("Interlocuteurs archivés :", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'archivage des interlocuteurs :", error);
      });
  }, []);

  return (
    <div className="row">
        <div className="d-flex justify-content-between mb-3">
          {/* Titre */}
          
            <h2 className="col-md-6page-`header">Liste des interlocuteurs</h2>
          

          {/* Bouton d'exportation Excel */}
          <div className="col-md-3">
            <Button variant="contained" color="primary" onClick={handleExport}>
              Exporter en Excel
            </Button>
          </div>

          {/* Barre de recherche */}
          <div className="col-md-3">
     
          <div className="topnav__search">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche "
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bx bx-search"></i>
          </div>
          </div>
        </div>
      <div>
        <Box sx={{ minWidth: 260 }}>
          {Inter.filter((e) => {
            return search.toLowerCase() === ""
              ? e
              : e.nom.toLowerCase().includes(search.toLowerCase());
          }).map((e) => (
            <Card
              variant="outlined"
              key={e.id_interlocuteur}
              className="card-container"
            >
              <CardContent>
                {/* Title */}
                
                <Typography variant="h5" component="div" className="name-tag">
                  {e.nom}
                </Typography>
                <div className="time">
                {!e.isConfirmed && (
               <Typography color="text.secondary" style={{ fontWeight: "bold", color: 'orange' }}>
               <i className='bx bxs-timer'></i> : {calculateTimeRemaining(e.createdAt)}
             </Typography>
                )}
                </div>

                <div className="card-body">
                        {/* Flex container for "nom commercial" and "Societe" */}
                  <div className="flex-container">
                    {/* Mapping for "nom commercial" */}
                    
                    {listuser
                      .filter((task) => task.id === e.id_utili)
                      .map((c) => (
                        <Typography variant="body" key={c.id} color="text.secondary" style={{ fontWeight: "bold" }}>
                          <i class='bx bx-user'></i> : {c.username}
                        </Typography>
                      ))}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ fontWeight: "bold" }}>
                    <i class='bx bx-phone' ></i>: {e.tel}
                    </Typography>
                    
                  </div>
                  {/* Flex container for other details */}
                  <div className="flex-container">
                    
                    
                    {listSoc
                      .filter((task) => task.siret === e.id_soc)
                      .map((c) => (
                        <Typography color="text.secondary" variant="body" key={c.siret} style={{ fontWeight: "bold" }}>
                         <i class='bx bxs-bank'></i> : {c.nom_soc}
                        </Typography>
                      ))}
                      <Typography variant="body" color="text.secondary" style={{ fontWeight: "bold" }}>
                      <i class='bx bx-mail-send' ></i>: {e.email}
                        </Typography>
                  </div>
                  {/* Flex container for confirmation status */}
                  <div className="flex-container">
                    <Typography
                      variant="body2"
                      className={
                        e.isConfirmed ? "status-confirmed" : "status-awaiting"
                      }
                    >
                      Statut de confirmation :{" "}
                      {e.isConfirmed ? "Confirmé" : "En attente"}
                    </Typography>
                      {/* Afficher le chronomètre pour les interlocuteurs en attente de confirmation */}
     
                  </div>  
                </div>
           
              </CardContent>
              <CardActions>
                {/* Modifier Button */}
                <button className="modify-btn" onClick={() => { window.location.href = `/Inter/modifier/${e.id_interlocuteur}`; }}>
                  <i className='bx bx-edit-alt bx-flashing'></i>
                </button>
              </CardActions>
            </Card>
          ))}
        </Box>
        
      </div>
    </div>
  );

  
}

export default InterlocuteurDetails;
