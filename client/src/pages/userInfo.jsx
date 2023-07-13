import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import interService from "../services/Interlocuteur"
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import Countdown from 'react-countdown';
import RoleUser from "../controllers/Role";


function Userinfo() {
//GET role admin
const myadmin = RoleUser.AdminRole();
  //timer 


  //lister la societe selon l'id 
  const [ListSociete, SetSociete] = useState([]);
  //les interlocuteur de la societes selon l'id 
  const [listInter, SetInter] = useState([]);
  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);
  //FILTER  INTERLOCUTEUR WHERE ID SOCIETES 
  const id_soc = listInter.filter(task => task.id_soc === nb)
  //GET USER INFO
  const user = AuthService.getCurrentUser()

  const [Action, SetAction] = useState([]);
  //SELECT ALL SOCIETES WHERE AUTH
  const retrieveTutorials = () => {
    if (user) {
      interService.findAll().then(
        response => {
          axios.get("https://crm.sofitech.pro/api/auth/action").then((response) => {
            SetAction(response.data);
            console.log(response.data);
          })
        })
      interService.findAll().then(
        response => {
          axios.get("https://crm.sofitech.pro/api/auth/interlocuteur").then((response) => {
            SetInter(response.data);
            console.log(response.data);
          })
        },

      )

      console.log(ListSociete)

      //afficher cemca
      UserService.getCemecaBoard().then(
        response => {
          axios.get("https://crm.sofitech.pro/cemeca").then((response) => {
            SetSociete(response.data);
          })
        },

      );
      //afficher sofitech
      UserService.getSofitechBoard().then(
        response => {
          axios.get("https://crm.sofitech.pro/allsociete").then((response) => {
            SetSociete(response.data);
          })
        },



      );


    }
  };
  //FILTER SOCIETES SELON L'ID 
  

  //CARD TABLE 
  const card = (
    <React.Fragment>
     

        <CardContent>


          <Typography variant="h5" component="div">
            <i class='bx bxs-bank danger'></i>: user Info PAGE
          </Typography>
  


        </CardContent>
      


    </React.Fragment>
  );
  return (
    <div>
  <h2> user info PAge</h2>
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
    </div>
  
  );
}

export default Userinfo
