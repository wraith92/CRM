import React, { useEffect, useState } from 'react'
import SvgIcon from '@mui/material/SvgIcon';
import PropTypes from 'prop-types';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import AuthService from "../services/auth.service";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../components/topnav/topnav.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//material ui table
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TablePagination,
} from '@material-ui/core';
import RoleUser from "../controllers/Role";
import Societe from '../controllers/Societe';
//css
const useStyles = makeStyles((theme) => ({
  table: {
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 1350
  },
  tableHeaderCell: {
    sx: '4',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.secondary.dark)
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    display: 'inline-block'
  }
}));
const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === 'string' ? (
        <path d={svgPathData} />
      ) : (
        /**
         * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
         * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
         * of a duotone icon. 40% is the default opacity.
         *
         * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
         */
        svgPathData.map((d, i) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

FontAwesomeSvgIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};




function Customers() {





  //liste des users
  const classes = useStyles();
  const user = AuthService.getCurrentUser()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ListTest, SetTest] = useState([]);
  //GET role sofitech
  const mysofitech = RoleUser.SofitechRole();
  //GET role cemece
  const mycemeca = RoleUser.CemecaRole();
  //GET societer
  const [searchAll, setSearchAll] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset the page to the first one when changing rows per page
  };
  //SELECT WHERE SEARCH INPUT
  const onChangeSearchAll = (e) => {
    const searchAll = e.target.value;
    setSearchAll(searchAll);
    const nom = ListTest.filter((val) => {
      if (val.nom_soc.toLowerCase().includes(searchAll.toLowerCase())) {
        return val
      }
    })
    const code_postal = ListTest.filter((val) => {
      if (String(val.code_postal).includes(searchAll)) {
        return val
      }
    })
    const siret = ListTest.filter((val) => {
      if (String(val.siret).includes(searchAll)) {
        return val
      }
    })
    const siren = ListTest.filter((val) => {
      if (String(val.siren).includes(searchAll)) {
        return val
      }
    })

    if (nom.length !== 0) {
      console.log(nom)
      SetFilter(nom);
    }
    if (code_postal.length !== 0) {
      console.log(true)
      SetFilter(code_postal);
    }
    if (siret.length !== 0) {
      console.log(true)
      SetFilter(siret);
    }
    if (siren.length !== 0) {
      console.log(true)
      SetFilter(siren);
    }

  };
  //SELECT ALL SOCIETES (CEMECA/SOFITECH)
  const retrieveTutorials = () => {
    if (user) {
      //afficher cemca
      if (mycemeca) Societe.CemecaListe().then(data => SetTest(data))
        ;
      //afficher sofitech
      if (mysofitech) Societe.AllSociete().then(data => SetTest(data))
        ;
    }

  };


  const [Filter, SetFilter] = useState(ListTest);
  //USE_EFFECT
  useEffect(() => {
    retrieveTutorials()
  }, [mysofitech, mycemeca, searchAll]);
  useEffect(() => {
    ListTest.sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }, [Filter]);

  const tableCellStyle = { fontSize: '11px' };


  return (
    <div>
      {/* liste des connections */}

      <div className="list row">
        <h2 className=" col-md-6 page-`header">Liste des Sociétés</h2>
        {/* SEARCH INPUT */}
        <div className="col-md-4 list">
          <div className="input-group mb-3">
            <div className="topnav">
              <div className="topnav__search">
                <input type="text"
                  className="form-control"
                  placeholder="Recherche "
                  value={searchAll}
                  onChange={onChangeSearchAll}
                />
                <i className='bx bx-search'></i>
              </div>
            </div>
          </div>
        </div>
        {/* TABLEAU DES SOCIETES */}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
              <TableHead>
              <TableRow>
        <TableCell style={tableCellStyle}>
          🏢 Société
        </TableCell>
        <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
          📮 Adresse postale
        </TableCell>
        <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
          👤 Interlocuteur
        </TableCell>
        <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
          ℹ️ Info
        </TableCell>
        <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
          ⚙️ Action
        </TableCell>
      </TableRow>
              </TableHead>
              <TableBody>
                {Filter.length ? (
                  Filter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <Grid container >
                          <Grid item lg={10}>
                            <Typography className={classes.name} color="textSecondary" variant="body2"><i class='bx bxs-bank'></i><a href={`/Societe/${row.siret}`}>{row.nom_soc}</a></Typography>
                            <Typography variant="body3" >{row.siret}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <Grid >
                          <Typography style={{ minWidth: 50 }}>{row.code_postal} {row.ville_soc} </Typography>
                          <Typography color="textSecondary" variant="body2">{row.adresse_local}</Typography>
                        </Grid>

                      </TableCell>





                      <TableCell align='left' style={{ minWidth: 50 }}>
                        <Button startIcon={<FontAwesomeIcon icon={faUser} />} href={`/Interlocuteur/${row.siret}`} variant="outlined" size="small"> +
                        </Button>
                      </TableCell>

                      <TableCell align='left' style={{ minWidth: 50 }}>
                        <IconButton aria-label="Example" href={`/Societe/${row.siret}`} >
                          <FontAwesomeSvgIcon icon={faFile} />
                        </IconButton>
                      </TableCell>

                      <TableCell align='left' style={{ minWidth: 50 }}>
                        <IconButton aria-label="Example" href={`/Action/${row.siret}`} >
                          <FontAwesomeSvgIcon icon={faEllipsisV} />
                        </IconButton>
                      </TableCell>


                    </TableRow>
                  ))
                ) : (
                  ListTest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <Grid container >
                          <Grid item lg={10}>
                            <Typography className={classes.name} color="textSecondary" variant="body2"><i class='bx bxs-bank'></i><a href={`/Societe/${row.siret}`}>{row.nom_soc}</a></Typography>
                            <Typography variant="body3" >{row.siret}</Typography>
                            <Typography color="textSecondary" variant="body2">{row.siren}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>

                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <Grid >
                          <Typography style={{ ...tableCellStyle}}>{row.code_postal} {row.ville_soc} </Typography>
                          <Typography style={{ ...tableCellStyle}} color="textSecondary" variant="body2">{row.adresse_local}</Typography>
                        </Grid>

                      </TableCell>





                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <Button startIcon={<FontAwesomeIcon icon={faUser} />} href={`/Interlocuteur/${row.siret}`} variant="outlined" size="small"> +
                        </Button>
                      </TableCell>

                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <IconButton aria-label="Example" href={`/Societe/${row.siret}`} >
                          <FontAwesomeSvgIcon icon={faFile} />
                        </IconButton>
                      </TableCell>

                      <TableCell align='left' style={{ ...tableCellStyle, minWidth: 50 }}>
                        <IconButton aria-label="Example" href={`/Action/${row.siret}`} >
                          <FontAwesomeSvgIcon icon={faEllipsisV} />
                        </IconButton>
                      </TableCell>


                    </TableRow>
                  ))

                )}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={ListTest.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Paper>

      </div>
    </div>


  )
}

export default Customers
