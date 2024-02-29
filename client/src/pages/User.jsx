import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import RoleUser from "../controllers/Role"; // Assurez-vous d'importer RoleUser
import { useParams, useHistory } from "react-router-dom"; // Ajout de useHistory
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "moment/locale/fr";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import Societe from "../controllers/Societe";
import { DownloadTableExcel } from "react-export-table-to-excel";
//table class
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";


function Usersinfo({ location }) {
  const [searchTerm, setSearchTerm] = useState('');
  const myadmin = RoleUser.AdminRole();
  const history = useHistory(); // Ajout de useHistory
  const mysofitech = RoleUser.SofitechRole();
  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);
  const tableRef = useRef(null);
  //GET USER INFO
  const user = AuthService.getCurrentUser();
  //lister user selon l'id
  const [Listuser, Setuser] = useState([]);
  //lister societe selon le siret
  const [Listsociete, Setsociete] = useState([]);
  //les interlocuteur de la societes selon l'id
  //lister action selon l'id
  const { fltr_date } = location.state || {};
  const [ACtionFilter, SetActionFilter] = useState(fltr_date || []);
  console.log(fltr_date,  "fltr_date");
  const id_action = ACtionFilter.filter((task) => task.id_utili === nb);
  console.log(id_action, "id_action");
  id_action.sort(
    (b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime()
  );
  //afficher la liste des users
  const retrieveUsers = () => {
    UserService.getListe_User()
      .then((response) => {
        Setuser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //SELECT ALL SOCIETES (CEMECA/SOFITECH)

  useEffect(() => {
    retrieveUsers();
    //ACTION
  }, []);
  useEffect(() => {
    ACtionFilter.sort(
      (b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime()
    );
    if (mysofitech) Societe.AllSociete().then((data) => Setsociete(data));
    if (searchTerm !== "") {
      SetActionFilter((prevFilter) =>
        prevFilter.filter((task) =>
          task.nom_societe.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Update the page when filters change
  }, [myadmin, searchTerm, mysofitech]);
  console.log(Listsociete);
  // date
  const filtre_date_Action_util1 = fltr_date.filter(
    (task) => task.id_utili === nb
  );
  console.log(filtre_date_Action_util1, "filtre_date_Action_util1");
  //FILTER SOCIETES SELON L'ID
  const actItem = Listuser.filter((task) => task.id === nb);
  actItem.sort(
    (b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime()
  );
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value || '';
    setSearchTerm(searchTerm);
  };

  // Fonction pour rediriger vers la page d'utilisateur
  const handleClickGoToUser = (userId) => {
    history.push(`/user/${userId}`);
  };

  return (
    <div className="row">
      <div className="col-6">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="row">
          
          
          </div>
        </Box>
      </div>
      <div className="col-6">
        <DownloadTableExcel
          filename={"Compte-rendu"}
          sheet={"Compte-rendu"}
          currentTableRef={tableRef.current}
        >
          <Button variant="contained" color="success" endIcon={<SendIcon />}>
            Excel
          </Button>
        </DownloadTableExcel>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Nom société</TableCell>
              <TableCell align="center">Date du RDV</TableCell>
              <TableCell align="center">Origine du prospect</TableCell>
              <TableCell align="center">Crédit_cop</TableCell>
              <TableCell align="center">Syndicat</TableCell>
              <TableCell align="center">compte rendu </TableCell>
              <TableCell align="center">besoin</TableCell>
              <TableCell align="center">Etat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
          <TableBody>
            {filtre_date_Action_util1.length > 0
              ? filtre_date_Action_util1.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.nom_societe}</TableCell>
                    <TableCell align="center">
                      {moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
                    {Listsociete.filter(
                        (task) => task.nom_soc === row.nom_societe
                      ).map((e, index2) => (
                        <a key={index2} href={`/Societe/${e.siret}`}>
                          {e.origineprospect}
                        </a>
                      ))}
                    </TableCell>
                    <TableCell align="center"> {row.credit_cop}</TableCell>
                    <TableCell align="center">
                       {Listsociete.filter(
                        (task) => task.nom_soc === row.nom_societe
                      ).map((e, index2) => (
                        <a key={index2} href={`/Societe/${e.siret}`}>
                          {e.syndicat}
                        </a>
                      ))}</TableCell>
                    
                    <TableCell align="center"> {row.description}</TableCell>
                    <TableCell align="center"> {row.besoin}</TableCell>
                    {row.validation === "realiser" && (
                      <TableCell align="center">
                        <Chip label="réalisé" color="success" />
                      </TableCell>
                    )}
                    {row.validation === "non realiser" && (
                      <TableCell align="center">
                        <Chip label="Non réalisé" color="error" />
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : id_action.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {Listsociete.filter(
                        (task) => task.nom_soc === row.nom_societe
                      ).map((e, index2) => (
                        <a key={index2} href={`/Societe/${e.siret}`}>
                          {e.nom_societe}
                        </a>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
                      {row.nom_interlocuteur}
                    </TableCell>
                    <TableCell align="center"> {row.credit_cop}</TableCell>
                    <TableCell align="center"> {row.description}</TableCell>
                    <TableCell align="center"> {row.besoin}</TableCell>
                    {row.validation === "realiser" && (
                      <TableCell align="center">
                        <Chip label="réalisé" color="success" />
                      </TableCell>
                    )}
                    {row.validation === "non realiser" && (
                      <TableCell align="center">
                        <Chip label="Non réalisé" color="error" />
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <IconButton aria-label="Example" onClick={() => handleClickGoToUser(row.id)}>
                        <FontAwesomeIcon icon={faFile} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Usersinfo;
