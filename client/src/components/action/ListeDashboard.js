import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@mui/material/Chip';
import moment from 'moment';
import { Link } from 'react-router-dom'
const ListeAction = (props) => {
    const page2=props.page2
    const handleChangePage2=props.handleChangePage2
    const handleChangeRowsPerPage2=props.handleChangeRowsPerPage2
    const Action= props.Action
    const Action_util=props.Action_util
    const rowsPerPage2=props.rowsPerPage2
    const myadmin=props.myadmin
    return (
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
                    count={Action_util.length}
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
    );
}

export default ListeAction;