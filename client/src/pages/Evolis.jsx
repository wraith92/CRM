import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Button from '@mui/material/Button';
import RoleUser from "../controllers/Role";
import moment from "moment";
import Societe from '../controllers/Societe';
import 'moment/locale/fr';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,

} from '@material-ui/core';

const Evolis = ({ location, props }) => {
    const { fltr_date } = location.state || {};

    const [ACtionFilter, SetActionFilter] = useState(fltr_date || []);
    console.log(fltr_date);
    const myadmin = RoleUser.AdminRole();
<<<<<<< HEAD
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
=======
 
>>>>>>> origin/main
    const [societeListe, SetsocieteListe] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const mysofitech = RoleUser.SofitechRole();
    //GET role cemece
    const tableRef = useRef(null);


    useEffect(() => {

        ACtionFilter.sort((b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());
        if (mysofitech) Societe.AllSociete().then(data => SetsocieteListe(data))
            ;
        if (searchTerm !== '') {
            SetActionFilter((prevFilter) =>
                prevFilter.filter((task) => task.nom_societe.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Update the page when filters change
    }, [myadmin, searchTerm, mysofitech]);

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value || '';
        setSearchTerm(searchTerm);
    };

    const renderCardRow = (e) => {
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
                                {index.activite_soc}
                            </a>
                        ))
                    }
                </TableCell>
                <TableCell style={{ fontSize: '8px' }}>
                    {societeListe
                        .filter((task) => task.nom_soc.toLowerCase() === e.nom_societe.toLowerCase())
                        .map((index) => (
                            <a href={`/Societe/${index.siret}`} key={index.id}>
                                {index.libelle_naf}
                            </a>
                        ))
                    }
                </TableCell>

                <TableCell style={{ fontSize: '10px' }}>
                    {moment(e.date_rdv).format('DD MMMM YYYY HH:mm')}
                </TableCell>
                <TableCell style={{ fontSize: '8px' }}>{e.besoin}</TableCell>
                <TableCell style={{ fontSize: '8px' }}>{e.investissement}</TableCell>
                <TableCell style={{ fontSize: '8px' }}>{e.montant}</TableCell>
            </TableRow>
        );
    };

    return (

        <Box sx={{ minWidth: 275 }}>
            <div className="row">
                <h2 className="page-header">Evolis
                </h2>
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
                <br />
                <div variant="outlined">
                    <TableContainer component={Paper}>
                        <Table ref={tableRef}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '60px', fontSize: '10px' }}>
                                        🏢 Code NAF
                                    </TableCell>
                                    <TableCell style={{ width: '60px', fontSize: '10px' }}>
                                        🏢 Libellé NAF
                                    </TableCell>
                                    <TableCell style={{ width: '120px', fontSize: '10px' }}>
                                        ⏱️ Date action commercial
                                    </TableCell>
                                    <TableCell style={{ width: '100px', fontSize: '10px' }}>
                                        💼 Nature d'investissement
                                    </TableCell>
                                    <TableCell style={{ width: '100px', fontSize: '10px' }}>
                                        📋  Equipement
                                    </TableCell>
                                    <TableCell style={{ width: '100px', fontSize: '10px' }}>
                                        💰 Montant
                                    </TableCell>
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

export default Evolis;
