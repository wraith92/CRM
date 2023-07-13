import React, { useEffect, useState } from 'react'
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


function InterlocuteurDetails() {


  //GET interlocuteur
  const [Inter, SetInter] = useState([]);
  const [search, setSearch] = useState('');
  const [listuser, setListeUser] = useState([]);
  const [listSoc ,setSoc] = useState([]);
  //Select all interlocuteur
  const retrieveInterlocuteur = () => {
    AuthInterlocuteur.findAll()
      .then((response) => {
        SetInter(response.data);

      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retriveSociete =() =>{
    Societe.AllSociete().then(data => setSoc(data))
  }

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


  useEffect(() => {
    retrieveInterlocuteur()
    retrieveUsers()
    retriveSociete()
  }, []);

console.log(listuser,"liste user")
console.log(listSoc,"les societes")
  //CARD TABLE
  const card = (
    <React.Fragment>
      {Inter.filter((e) => {
        return search.toLowerCase() === ''
          ? e
          : e.nom.toLowerCase().includes(search.toLowerCase());


      }).map((e) =>
        <Card variant="outlined" >
          <CardContent>
            <Typography variant="h5" component="div">
              <i class='bx bxs-id-card'></i>: {e.nom}
            </Typography>
            <Typography variant="body2">
              Fonction : {e.fonction_inter}
            </Typography>

            {(listuser.filter(task => task.id === e.id_utili)).map((c)=>
             <Typography variant="body2">
             nom commercial : {c.username}
              </Typography>

            )}
             {(listSoc.filter(task => task.siret === e.id_soc)).map((c)=>
             <Typography variant="body2">
             nom commercial : {c.nom_soc}
              </Typography>

            )}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Telephone :  {e.tel}
            </Typography>




          </CardContent>
          <CardActions>
            <Button href={`/Inter/modifier/${e.id_interlocuteur}`} size="small">Modifier</Button>
          </CardActions>
        </Card>
      )}
      <CardActions>

        <Button href={`/`} size="small">Retour</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <div className="row">
      <div className="col-12 list">
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
      <div >
        <Box sx={{ minWidth: 260 }}>
          <div>{card}</div>
        </Box>
      </div>
    </div>
  );

}

export default InterlocuteurDetails
