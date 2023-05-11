import React, { useEffect, useState, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UserService from "../services/user.service";
import interService from "../services/Interlocuteur"
import AuthService from "../services/auth.service";
import AuthAction from "../services/Action"
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import Societe from '../controllers/Societe';
import { DownloadTableExcel } from 'react-export-table-to-excel';
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function Usersinfo() {
  // tableau
  const [rowsPerPage2, setRowsPerPage2] = React.useState(10);
  const [page2, setPage2] = React.useState(0);
  const handleChangePage2 = (newPage) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };

  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);
  const tableRef = useRef(null);
  //GET USER INFO
  const user = AuthService.getCurrentUser()
  //lister user selon l'id
  const [Listuser, Setuser] = useState([]);
  //lister societe selon le siret
  const [Listsociete, Setsociete] = useState([]);
  //les interlocuteur de la societes selon l'id
  //lister action selon l'id
  const [Action, SetAction] = useState([]);
  const id_action = Action.filter(task => task.id_utili === nb)
  id_action.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
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

  const retrieveTutorials = () => {
    if (user) {
      Societe.AllSociete().then(data => Setsociete(data))
      AuthAction.findAll().then((response) => {
        SetAction(response.data)
      })
    }
  };

  useEffect(() => {
    retrieveUsers()
    retrieveTutorials()
    //ACTION
  }, []);
  console.log(Listsociete)
  // date time input field Action
  const event = new Date();

  event.setMonth(event.getMonth() + 1);


  const [valueDate1, setValueDate1] = useState("");
  const [valueDate2, setValueDate2] = useState("");
  const [valueDate, setDate] = useState(false);

  const handleChangeDate1 = (newValue) => {
    setValueDate1(newValue);

  };
  const handleChangeDate2 = (newValue) => {
    setValueDate2(newValue);
    setDate(true)
  };

  const mysn = 1000 * 3600 * 24
  const fltr_date = Action.filter(task => (((new Date(task.date_rdv) - valueDate2) / mysn) < 0) && ((new Date(task.date_rdv) - valueDate1) / mysn) > 0)
  const filtre_date_Action_util1 = fltr_date.filter(task => task.id_utili === user.id)
  console.log(filtre_date_Action_util1)
  //FILTER SOCIETES SELON L'ID
  const actItem = Listuser.filter(task => task.id === nb)
  actItem.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());



  console.log(Date.now())




  return (


    <div className='row'>

      <div className="col-6">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="row">



            <div className="col-6">
              <p>Date début d'action</p>
              <LocalizationProvider dateAdapter={AdapterMoment} >

                <Stack spacing={5}>
                  <DesktopDatePicker
                    value={valueDate1}
                    onChange={handleChangeDate1}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="col-6">
              <p>Date fin d'action</p>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={5}>
                  <DesktopDatePicker
                    value={valueDate2}
                    onChange={handleChangeDate2}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
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
            {valueDate ? (


              filtre_date_Action_util1.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {row.nom_societe}
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
            ) : (

              id_action.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {
                      (Listsociete.filter(task => task.nom_soc === row.nom_societe)).map((e, index2) => (
                        <a key={index2} href={`/Societe/${e.siret}`}>{row.nom_societe}</a>
                      ))}
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

              )))

            }

          </TableBody>
        </Table>
      </TableContainer>



    </div>

  );
}

export default Usersinfo
