
//sidebar data json
import sidebar_items from '../assets/JsonData/sidebar_routes.json'
import Grid from '@mui/material/Grid';
//require React
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
//React validation
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
//require page Action
import AuthAction from "../services/Action";
//require page Interlocuteur
import AuthInter from "../services/Interlocuteur";
import { useHistory } from 'react-router-dom';
//controlleur service
import AuthService from "../services/auth.service";
//import mui
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import checkbox from multiselect-react-dropdown'
import Multiselect from 'multiselect-react-dropdown';
// centre d'affaire json data
import liste from "../assets/JsonData/centre-affaire.json";
import besoinliste from "../assets/JsonData/besoin.json";
import RoleUser from "../controllers/Role";
import Societe from '../controllers/Societe';


const Action = (props) => {
  let history = useHistory();
  const [myJSON, setactive] = useState([]);
  const [myJSON2, setactive2] = useState([]);
  const [myJSON3, setactive3] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const [ID_societe, setID_societe] = useState([]);
  const [new_sidbar, setSidbar] = useState(sidebar_items)
  const [interlocuteur, setInterlocuteur] = useState([])
  const [Credit, setCredit] = useState(false);
  const [Factor, setFactor] = useState(false);
  const sofitech = RoleUser.SofitechRole();
  //GET role cemece
  const cemeca = RoleUser.CemecaRole();
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user) {
      //INTERLOCUTEUR
      AuthInter.findAll().then((response) => {
        setInterlocuteur(response.data)
      })

        .catch((e) => {
          console.log(e);
        });
    }

  }, [])
  useEffect(() => {

    if (user) {

      //afficher cemca
      if (cemeca) Societe.CemecaListe().then(data => setID_societe(data))
        ;
      //afficher sofitech
      if (sofitech) Societe.AllSociete().then(data => setID_societe(data))
        ;



    }
  }, [sofitech, cemeca])
  console.log(ID_societe)

  // Get ID from URL
  const params = useParams();

  var nb = parseInt(params.id);

  //aficher sidbar action
  const action = '/Action/' + params
  console.log(action);

  if (props.location.pathname === action) {
    const nouveaustate = [...new_sidbar]
    nouveaustate[5].status = "active"
  }



  const land = (e) => {
    setactive(Array.isArray(e) ? e.map(x => x.NOM) : [])
  }

  const land2 = (e) => {
    setactive2(Array.isArray(e) ? e.map(x => x.NOM) : [])
  }
  const land3 = (e) => {
    setactive3(Array.isArray(e) ? e.map(x => x.nom) : [])
  }

  //filter action where siret
  const actItem = ID_societe.filter(task => task.siret === nb)
  //filter interlocuteur where siret
  const filterInter = interlocuteur.filter(task => task.id_soc === nb)
  console.log(filterInter)


  //intitial Action
  const initial1ctionState = {
    id_utili: "",
    nom_interlocuteur: "",
    type_action: "",
    nom_societe: "",
    description: "",
    date_action: "",
    date_rdv: "",
    date_factor: "",
    date_assur: "",
    nom_assur: "",
    nom_factor: "",
    besoin: "",
    montant: "",
    credit_cop: "",
    validation: "non realiser"

  };

  //ajouter l'action
  const [Action, setAction] = useState({ initial1ctionState });
  const saveAction = (e) => {
    const credit_cop = myJSON.join();
    const besoin = myJSON2.join();
    const interl = myJSON3.join();
    var data = {
      nom_interlocuteur: interl,
      nom_societe: actItem[0].nom_soc,
      date_rdv: Action.date_rdv,
      date_action: new Date(),
      date_factor: Action.date_factor,
      date_assur: Action.date_assur,
      montant: Action.montant,
      nom_assur: Action.nom_assur,
      nom_factor: Action.nom_factor,
      id_utili: user.id,
      type_action: Action.type_action,
      description: Action.description,
      besoin: besoin,
      credit_cop: credit_cop,
      validation: "non realiser"
    };
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthAction.create(data)
        .then(response => {
          setAction({
            nom_interlocuteur: response.data.nom_interlocuteur,
            nom_societe: response.data.nom_societe,
            date_rdv: response.data.date_rdv,
            date_action: response.data.date_action,
            besoin: response.data.besoin,
            montant: response.data.montant,
            id_utili: response.data.id_utili,
            type_action: response.data.type_action,
            description: response.data.description,
            validation: response.data.validation
          }
          );
          setSuccessful(true);
          setMessage("activité commerciale ajoutée avec succès :)")
          setTimeout(() => {
            history.push("/AllAction");
          }, 1000)

        },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        )

    }
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setAction({ ...Action, [name]: value });

  };

  return (
    <div className="col-md-12">
      {/* ajouter des actions */}
      <h3><i class='bx bxs-bank danger'></i> Ajouter une action</h3>
      <div className="card card-container">
        {actItem.map((e) => (
          <h3><i class='bx bxs-bank danger'></i> {e.nom_soc}</h3>
        ))}
        <Form onSubmit={saveAction} ref={form}>
          {!successful && (
            <div>

              <div className="form-group">
                <label htmlFor="username">utlisateur</label>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField
                    id="outlined-multiline-static"
                    label="utlisateur"
                    multiline
                    name="id_utili"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </div>

              <div className="form-group">
                <label htmlFor="title">interlocuteur</label>
      
                  <Multiselect
                    displayValue="nom"
                    value="4"
                    isObject={true}
                    onChange={console.log}
                    id={console.log}
                    onNOMPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={land3}
                    options={filterInter}
                    showCheckbox
                  />
               
              </div>

              <div className="form-group">
                <label htmlFor="username">Date de l'action</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date_rdv"
                  value={Action.date_rdv}
                  onChange={handleInputChange}

                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Observation / Compte-rendu</label>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <TextField
                    id="outlined-multiline-static"
                    label="description"
                    multiline
                    rows={7}
                    name="description"
                    value={Action.description}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </div>

           
              <div className="form-group">
                <label htmlFor="password">type d'action</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">type_action</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Action.type_action}
                    label="type_action"
                    name="type_action"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"RDV"}>RDV</MenuItem>
                    <MenuItem value={"contact téléphonique"}>contact téléphonique</MenuItem>
                    <MenuItem value={"contact teams"}>contact teams</MenuItem>
                    <MenuItem value={"contact par courrier"}>contact par courrier</MenuItem>
                  </Select>
                </FormControl>

              </div>
              {sofitech && (
                <div className="form-group">
                  <label htmlFor="password">besoin</label>
                  <Multiselect
                    displayValue="NOM"
                    groupBy="TYPE"
                    value="4"
                    isObject={true}
                    selectedValues={console.log}
                    onChange={console.log}
                    id={console.log}
                    onNOMPressFn={function noRefCheck() { }}
                    onRemove={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={land2}
                    options={besoinliste}
                    showCheckbox
                  />
                </div>
              )}
                 <div className="form-group">
                <label htmlFor="password">Montant</label>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Montant</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Action.montant}
                    label="motant de l'action"
                    name="montant"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"De 1 à 500 K€"}>De 1 à 500 K€ </MenuItem>
                    <MenuItem value={"De 501 à 1 M€"}>De 501 à 1 M€</MenuItem>
                    <MenuItem value={"Plus de 1M€ "}>Plus de 1M€ </MenuItem>
                  </Select>
                </FormControl>

              </div>
              {cemeca && (
                <div className="form-group">
                  <Grid container spacing={3}>
                    <Grid item xs="auto">
                      <label htmlFor="password">Assurance-crédit en place ?</label>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button variant="contained" onClick={() => { setCredit(true) }} color="success">OUI</Button>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button variant="contained" onClick={() => { setCredit(false) }} color="error">NON</Button>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button variant="contained" onClick={() => { setCredit(false) }} color="warning">NSP</Button>
                    </Grid>
                  </Grid>

                </div>

              )}
              {cemeca && Credit && (
                <div className="form-group">
                  <TextField
                    id="outlined-multiline-static"
                    label="Nom l'assureur crédit"
                    multiline
                    name="nom_assur"
                    value={Action.nom_assur}
                    onChange={handleInputChange}
                  />
                  <br />
                  <label htmlFor="password">préciser la date d’échéance du crédit </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="date_assur"
                    value={Action.date_assur}
                    onChange={handleInputChange}

                  />
                </div>
              )}
              {cemeca && (
                <div className="form-group">
                  <Grid container spacing={3}>
                    <Grid item xs="auto">
                      <label htmlFor="password">Factor en place ?</label>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button variant="contained" onClick={() => { setFactor(true) }} color="success">OUI</Button>
                    </Grid>
                    <Grid item xs='auto'>

                      <Button variant="contained" onClick={() => { setFactor(false) }} color="error">NON</Button>
                    </Grid>
                    <Grid item xs='auto'>
                      <Button variant="contained" onClick={() => { setFactor(false) }} color='warning'>NSP</Button>

                    </Grid>
                  </Grid>
                </div>
              )}
              {cemeca && Factor && (
                <div>
                  <div className="form-group">
                    <TextField
                      id="outlined-multiline-static"
                      label="Nom Factor"
                      multiline
                      value={Action.nom_factor}
                      name="nom_factor"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Préciser la date d’échéance du Factor </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="date_factor"
                      value={Action.date_factor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="title">Centre d'affaires CREDIT COOPERATIF</label>
                <Multiselect
                  displayValue="NOM"
                  groupBy="TYPE"
                  value="4"
                  isObject={true}
                  selectedValues={console.log}
                  onChange={console.log}
                  id={console.log}
                  onNOMPressFn={function noRefCheck() { }}
                  onRemove={function noRefCheck() { }}
                  onSearch={function noRefCheck() { }}
                  onSelect={land}
                  options={liste}
                  showCheckbox
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Valider l'action</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}

export default Action;

