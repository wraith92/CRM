import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@mui/material/Chip';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
const ListeDashboard = (props) => {
    const societeListe = props.societeListe
    const myadmin = props.myadmin
    const societe_util =props.societe_util

    return (
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
                                societeListe.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row, index) => (
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

                                societe_util.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row, index) => (
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
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    onPageChange={props.handleChangePage}
                    onRowsPerPageChange={props.handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `Affichage des pages ${from}-${to} sur un total de  ${count} pages`}
                />

            </div>
            <div className="card__footer">
                <Link to='Societes'>Voir plus</Link>
            </div>
        </div>
    
      );
}
 
export default ListeDashboard;