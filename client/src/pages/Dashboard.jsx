import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import StatusCard from '../components/status-card/StatusCard'
import Moment from 'react-moment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'moment/locale/fr';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
//controlleurs 
import UserService from "../services/user.service";
import AuthAction from "../controllers/Action";
import AuthService from "../services/auth.service";
import RoleUser from "../controllers/Role";
import Societe from '../controllers/Societe';






const Dashboard = () => {
    //GET user 
    const user = AuthService.getCurrentUser();
    console.log(user, 'auth')
    //GET role admin
    const myadmin = RoleUser.AdminRole();
    //GET role sofitech
    const mysofitech = RoleUser.SofitechRole();
    //GET role cemece
    const mycemeca = RoleUser.CemecaRole();
    //GET societer
    const [societeListe, Setsociete] = useState([])
    //GET actions 
    const [Action, SetAction] = useState([]);
    const Action_util = Action.filter(task => task.id_utili === user.id)
    Action.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());

    useEffect(() => {

        if (user) {

            //ACTION 
            AuthAction.ActionListe().then(data => SetAction(data))
            //afficher cemca           
            if (mycemeca) Societe.CemecaListe().then(data => Setsociete(data))
                ;
            //afficher sofitech           
            if (mysofitech) Societe.AllSociete().then(data => Setsociete(data))
                ;



        }
    }, [mycemeca, mysofitech])
    console.log(myadmin)

    const societe_util = societeListe.filter(task => task.id_utili === user.id)
    societeListe.sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    console.log(societe_util)
    // date time input field Action
    const event = new Date();

    event.setMonth(event.getMonth() + 1);


    const [valueDate1, setValueDate1] = React.useState("");
    const [valueDate2, setValueDate2] = React.useState("");

    const handleChangeDate1 = (newValue) => {
        setValueDate1(newValue);
    };
    const handleChangeDate2 = (newValue) => {
        setValueDate2(newValue);
    };
    //tableau charte 
    const [tableau_date, tableau] = useState([]);

    const mysn = 1000 * 3600 * 24
    const fltr_date = Action.filter(task => (((new Date(task.date_rdv) - valueDate2) / mysn) < 0) && ((new Date(task.date_rdv) - valueDate1) / mysn) > 0)
    const filtre_date_Action_util1 = fltr_date.filter(task => task.id_utili === user.id)
    //filter Month action
    //month jan 
    const fltrjan = Action.filter(task => (((new Date(task.date_action)).getMonth() === 0)))
    //month fev 
    const fltrfev = Action.filter(task => (((new Date(task.date_action)).getMonth() === 1)))
    //month mar 
    const fltrmar = Action.filter(task => (((new Date(task.date_action)).getMonth() === 2)))
    //month jan 
    const fltravr = Action.filter(task => (((new Date(task.date_action)).getMonth() === 3)))
    //month jan 
    const fltrmai = Action.filter(task => (((new Date(task.date_action)).getMonth() === 4)))
    //month jan 
    const fltrjun = Action.filter(task => (((new Date(task.date_action)).getMonth() === 5)))
    //month jan 
    const fltrjul = Action.filter(task => (((new Date(task.date_action)).getMonth() === 6)))
    //month jan 
    const fltrout = Action.filter(task => (((new Date(task.date_action)).getMonth() === 7)))
    //month jan 
    const fltrsep = Action.filter(task => (((new Date(task.date_action)).getMonth() === 8)))
    //month oct 
    const fltroct = Action.filter(task => (((new Date(task.date_action)).getMonth() === 9)))
    //month nov 
    const fltrnov = Action.filter(task => (((new Date(task.date_action)).getMonth() === 10)))
    //month dec 
    const fltrdec = Action.filter(task => (((new Date(task.date_action)).getMonth() === 11)))

    //filter Month action
    //month jan 
    const fltrSjan = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 0)))
    //month fev 
    const fltrSfev = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 1)))
    //month mar 
    const fltrSmar = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 2)))
    //month jan 
    const fltrSavr = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 3)))
    //month jan 
    const fltrSmai = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 4)))
    //month jan 
    const fltrSjun = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 5)))
    //month jan 
    const fltrSjul = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 6)))
    //month jan 
    const fltrSout = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 7)))
    //month jan 
    const fltrSsep = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 8)))
    //month oct 
    const fltrSoct = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 9)))
    //month nov 
    const fltrSnov = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 10)))
    //month dec 
    const fltrSdec = societeListe.filter(task => (((new Date(task.createdAt)).getMonth() === 11)))







    const chartOptions = {
        series: [{
            name: 'Action ',
            data: [fltrjan.length, fltrfev.length, fltrmar.length, fltravr.length, fltrmai.length, fltrjun.length, fltrjul.length, fltrout.length, fltrsep.length, fltroct.length, fltrnov.length, fltrdec.length]
        },
        {
            name: 'Société',
            data: [fltrSjan.length, fltrSfev.length, fltrSmar.length, fltrSavr.length, fltrSmai.length, fltrSjun.length, fltrSjul.length, fltrSout.length, fltrSsep.length, fltrSoct.length, fltrSnov.length, fltrSdec.length]
        }],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }

    const chartOptions2 = {
        series2: [{
            name: 'Sociétaires',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],

        options2: {
            color: ['#FFA500'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }





    //carde action user
    const statusCard = [
        {
            "icon": "bx bx-bar-chart-alt",
            "count": filtre_date_Action_util1.length,
            "title": "Vos Activités "
        }
    ]
    //card acrion admin
    const statusCardAdmin = [

        {
            "icon": "bx bxs-user-detail",
            "count": fltr_date.length,
            "title": "Activités commerciales"
        }
    ]

    //contrats
    const StatusContrat = [
        {
            "icon": "bx bxs-contact",
            "count": 0,
            "title": "Sociétaire SOFITECH "
        }
    ]

    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [rowsPerPage2, setRowsPerPage2] = React.useState(10);
    const [page2, setPage2] = React.useState(0);
    const handleChangePage2 = (event, newPage) => {
        setPage2(newPage);
    };
    const handleChangeRowsPerPage2 = (event) => {
        setRowsPerPage2(+event.target.value);
        setPage2(0);
    };

    return (

        <div>
            {/* si le client est connecter*/}
            {user ? (
                <div>
                    <h2 className="page-header">Tableau de bord
                    </h2>
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
                            </div>
                        </div>
                    </Box>
                    <div className="row">
                        {/* carte des actions  */}
                        <div className="col-6">
                            <div className="row">
                                <div>
                                    {myadmin ? (
                                        <div className='row'>
                                            {
                                                statusCard.map((item, index) => (
                                                    <div className="col-6" key={index}>
                                                        <a href="AllAction">
                                                            <StatusCard
                                                                icon={item.icon}
                                                                count={item.count}
                                                                title={item.title}
                                                            />
                                                        </a>
                                                    </div>
                                                ))
                                            }
                                            {
                                                statusCardAdmin.map((item, index) => (
                                                    <div className="col-6" key={index}>
                                                        <a href="AllAction">
                                                            <StatusCard
                                                                icon={item.icon}
                                                                count={item.count}
                                                                title={item.title}
                                                            />
                                                        </a>
                                                    </div>
                                                ))
                                            }

                                        </div>



                                    ) : (
                                        <div>
                                            {
                                                statusCard.map((item, index) => (

                                                    <div className="row justify-content-md-center">
                                                        <div className="col-6" key={index}>
                                                            <a href="#">
                                                                <StatusCard
                                                                    icon={item.icon}
                                                                    count={item.count}
                                                                    title={item.title}
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>


                                                ))
                                            }
                                        </div>

                                    )}
                                </div>



                            </div>
                        </div>
                        {/* chart graphique des clients  */}
                        <div className="col-6">
                            <div className="card full-height">

                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions.options,
                                        theme: { mode: 'dark' }
                                    } : {
                                        ...chartOptions.options,
                                        theme: { mode: 'light' }
                                    }}
                                    series={chartOptions.series}
                                    type='line'
                                    height='100%'
                                />
                            </div>
                        </div>
                        {/* cart des societe clientes  */}
                        {
                            StatusContrat.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <div className="row justify-content-md-center">
                                        <div className="col-6" key={index}>
                                            <a href="#">
                                                <StatusCard
                                                    icon={item.icon}
                                                    count={item.count}
                                                    title={item.title}
                                                />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                        <div className="col-6">
                            <div className="card full-height">
                                {/* chart */}
                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions2.options2,
                                        theme: { mode: 'dark' }
                                    } : {
                                        ...chartOptions2.options2,
                                        theme: { mode: 'light' }
                                    }}
                                    series={chartOptions2.series2}
                                    type='line'
                                    height='100%'
                                />
                            </div>
                        </div>
                        {/* dernier societe cree */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card__header">
                                    <h3>Société</h3>
                                </div>
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>

                                                    <TableCell align="center">Nom</TableCell>
                                                    <TableCell align="center">Observation</TableCell>
                                                    <TableCell align="center">Adresse postale</TableCell>
                                                    <TableCell align="center">Date d'ajout</TableCell>
                                                    <TableCell align="center">Statut</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {myadmin ? (

                                                    societeListe.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >

                                                            <TableCell align="center"><a href={`/Societe/${row.siret}`}>{row.nom_soc}</a></TableCell>
                                                            <TableCell align="center">{row.observation}</TableCell>
                                                            <TableCell align="center">{row.adresse_local}</TableCell>
                                                            <TableCell align="center"> <Moment fromNow>{row.createdAt}</Moment></TableCell>
                                                            {row.app_cemeca == 1 && (
                                                                <TableCell align="right">

                                                                    <Chip label=" Adhérent Cemeca" color="primary" />


                                                                </TableCell>

                                                            )}
                                                            {row.app_sofitech == 1 && (
                                                                <TableCell align="center">
                                                                    <Chip label=" Prospect Sofitech" color="warning" />
                                                                </TableCell>
                                                            )}
                                                        </TableRow>
                                                    ))



                                                ) : (

                                                    societe_util.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >

                                                            <TableCell align="center"><a href={`/Societe/${row.siret}`}>{row.nom_soc}</a></TableCell>
                                                            <TableCell align="center">{row.observation}</TableCell>
                                                            <TableCell align="center">{row.adresse_local}</TableCell>
                                                            <TableCell align="center"> <Moment fromNow>{row.createdAt}</Moment></TableCell>
                                                            {row.app_cemeca == 1 && (
                                                                <TableCell align="right">

                                                                    <Chip label=" Adhérent Cemeca" color="primary" />


                                                                </TableCell>

                                                            )}
                                                            {row.app_sofitech == 1 && (
                                                                <TableCell align="center">
                                                                    <Chip label=" Prospect Sofitech" color="warning" />
                                                                </TableCell>
                                                            )}
                                                        </TableRow>
                                                    ))

                                                )}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[2, 5, 10]}
                                        labelRowsPerPage='lignes par page'
                                        component="div"
                                        count={societeListe.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelDisplayedRows={({ from, to, count }) => `Affichage des pages ${from}-${to} sur un total de  ${count} pages`}
                                    />

                                </div>
                                <div className="card__footer">
                                    <Link to='Societes'>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                        {/* dernier action cree */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card__header">
                                    <h3>Activité commerciale</h3>
                                </div>
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Nom société</TableCell>
                                                    <TableCell align="center">Date du RDV</TableCell>
                                                    <TableCell align="center">Nom interlocuteur</TableCell>
                                                    <TableCell align="center">Crédit_cop</TableCell>
                                                    <TableCell align="center">Etat</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                            </TableBody>
                                            <TableBody>
                                                {myadmin ? (

                                                    Action.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                <a href={`/modifier/${row.id}`}>{row.nom_societe}</a>
                                                            </TableCell>
                                                            <TableCell align="center">{moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}</TableCell>
                                                            <TableCell align="center">{row.nom_interlocuteur}</TableCell>
                                                            <TableCell align="center"> {row.credit_cop}</TableCell>
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
                                                    Action_util.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                <a href={`/modifier/${row.id}`}>{row.nom_societe}</a>
                                                            </TableCell>
                                                            <TableCell align="center">{moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}</TableCell>
                                                            <TableCell align="center">{row.nom_interlocuteur}</TableCell>
                                                            <TableCell align="center"> {row.type_action}</TableCell>
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
                                                )}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[2, 5, 10]}
                                        labelRowsPerPage='lignes par page'
                                        component="div"
                                        count={societeListe.length}
                                        rowsPerPage={rowsPerPage2}
                                        page={page2}
                                        onPageChange={handleChangePage2}
                                        onRowsPerPageChange={handleChangeRowsPerPage2}
                                        labelDisplayedRows={({ from, to, count }) => `Affichage des pages ${from}-${to}`}
                                    />

                                </div>
                                <div className="card__footer">
                                    <Link to='AllAction'>Voir plus </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            ) :

                (
                    <div className="sidebar__item">
                        <div disabled className={`sidebar__item-inner `}>
                            <i className='bx bxs-user-x' ></i>
                            <span >
                                pas connecter
                            </span>
                        </div>

                    </div>
                )}
        </div>
    )
}

export default Dashboard
