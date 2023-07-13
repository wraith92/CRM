import React, { useState, useRef, useEffect, useContext } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthInter from "../services/Interlocuteur"
import AuthAction from "../services/Action";
import "react-datepicker/dist/react-datepicker.css";
import checkForm from '../common/Ajouter/checkedForm'
import './../assets/css/picklist.css'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
import besoinliste from "../assets/JsonData/besoin.json";
import RoleUser from "../controllers/Role";
import Societe from '../controllers/Societe';
import DataArrayContext from "../Liste/DataContext";
import ListInterlocuteurSociete from "../Liste/ListeInterlocuteur";
const ActionMod = () => {
    //variable checked from 
    const dataArray = useContext(DataArrayContext);

    const required = checkForm.required;
    const vsiret = checkForm.vsiret;
    const vsiren = checkForm.vsiren;
    const vnom_soc = checkForm.vnom_soc;
    const vnom_responsable = checkForm.vnom_responsable;
    const vdate_creation_soc = checkForm.vdate_creation_soc;
    const vid_role = checkForm.vid_role;
    const vcode_postal = checkForm.vcode_postal;
    const vobservation = checkForm.vopportunité;
    const cville = checkForm.cville;
    const vsyndicat = checkForm.vobservation;
    const vactivité = checkForm.vactivité;
    const vtel = checkForm.vtel;
    const vpays = checkForm.vpays;
    const vadresse = checkForm.vadresse;

    const initialSocieteState = {
        id: "",
        date_action: "",
        description: "",
        nom_interlocuteur: "",
        type_action: "",
        nom_societe: "",
        date_rdv: "",
        createdAt: "",
        besoin: "",


    };
    //liste type action  
    const options = [
        { type_action: 'RDV', label: 'RDV' },
        { type_action: 'contact téléphonique', label: 'contact téléphonique' },
        { type_action: 'contact teams', label: 'contact teams' },
        { type_action: 'contact par courrier', label: 'contact par courrier' }
    ]


    const [Action, setAction] = useState({ initialSocieteState });
    const [ListeAction, setListeAction] = useState([]);
    const [ListeSociete, setListeSociete] = useState([]);
    const [ListeInter, setListeInter] = useState([]);
    //GET role sofitech
    const mysofitech = RoleUser.SofitechRole();
    //GET role cemece
    const mycemeca = RoleUser.CemecaRole();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [myJSON, setactive] = useState([]);
    const [myJSON_Interlocuteur, setInterlocuteur] = useState([]);
    const [myJSON_besoin, setactivebesoin] = useState([]);
    const form = useRef();
    const checkBtn = useRef();
    //liste type Action   
    const option = [
        { value: 'RDV', label: 'RDV' },
        { value: 'contact téléphonique', label: 'contact téléphonique' },
        { value: 'contact teams', label: 'contact teams' },
        { value: 'contact par courrier', label: 'contact par courrier' }
    ]

    //set pickliste type action
    const land = (e) => {
        setactive(Array.isArray(e) ? e.map(x => x.label) : [])
    }
    //set pickliste nom societe
    const land2 = (e) => {
        setInterlocuteur(Array.isArray(e) ? e.map(x => x.nom) : [])
    }
    //set pickliste besoin
    const land3 = (e) => {
        setactivebesoin(Array.isArray(e) ? e.map(x => x.NOM) : [])
    }


    // API modifier
    const params = useParams();
    var nb = parseInt(params.id);
    const user = AuthService.getCurrentUser()



    const saveSociete = (e) => {
        const type_action = myJSON.join();
        const besoin = myJSON_besoin.join();
        const interlocuteur = myJSON_Interlocuteur.join();
        const IDACTOIN = parseInt(params.id)

        var data = {
            id: IDACTOIN,
            date_action: Action.date_action,
            description: Action.description,
            nom_interlocuteur: interlocuteur,
            type_action: type_action,
            besoin: besoin,
            date_rdv: Action.date_rdv,
            message: message.message,
            successful: successful.successful,
        };

        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            console.log('bouton clicker')
            AuthAction.update(nb, data)
                .then(response => {
                    setAction({

                        id: response.data.id,
                        date_action: response.data.date_action,
                        description: response.data.description,
                        nom_interlocuteur: response.data.nom_interlocuteur,
                        type_action: response.data.type_action,
                        date_rdv: response.data.date_rdv,
                        nom_societe: response.data.nom_societe,
                        besoin: response.data.besoin,
                    }
                    );
                    setSuccessful(true);
                    setMessage('Action modifiée avec succès')
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
                .catch(e => {
                    console.log(e);

                });
        }
    };



    //SELECT ALL SOCIETES WHERE AUTH
    const retrieveTutorials = () => {
        if (user) {
            // liste interlocuteur 
            AuthInter.findAll()
                .then((response) => {
                    setListeInter(response.data);

                })
                .catch((e) => {
                    console.log(e);
                });
            //liste action
            AuthAction.findAll()
                .then((response) => {
                    setListeAction(response.data);

                })
                .catch((e) => {
                    console.log(e);
                });
            //liste societe
            //afficher cemca           
            if (mycemeca) Societe.CemecaListe().then(data => setListeSociete(data))
                ;
            //afficher sofitech           
            if (mysofitech) Societe.AllSociete().then(data => setListeSociete(data))
                ;


        }
    };
    //FILTER SOCIETES SELON L'ID 
    const [societefiltred, setsocietefiltred] = useState("");
    const [societefiltredid, setsocietefiltredid] = useState([]);
    const actItem = ListeAction.filter(task => task.id === nb)

    const retriveSocietefiltred = () => {

        actItem.map((e) => {
            setsocietefiltred(e.nom_societe)
        })
        
     

    }
    const idSociete = ListeSociete.filter(task => task.nom_soc === societefiltred)
    const retriveSocietefiltredid = () => {
        
        idSociete.map((e) => {
            setsocietefiltredid(e.siret)
        })
    }
    const idSocieteInterl = ListeInter.filter(task => task.id_soc === societefiltredid)


    useEffect(() => {
        retrieveTutorials()
    }, [mycemeca, mysofitech]);
    useEffect(() => {
        retriveSocietefiltred()
    }, [actItem]);
    useEffect(() => {
        retriveSocietefiltredid()
    }, [idSociete]);

 
    console.log(societefiltred, "nom")
    console.log(idSociete, "id liste ")
    console.log(societefiltredid, "id")
    console.log(idSocieteInterl ,"filtres")



    const handleInputChange = event => {
        const { name, value } = event.target;
        setAction({ ...Action, [name]: value });

    };



    return (
        <div className="submit-form">



            <Form onSubmit={saveSociete} ref={form}>
                {!successful && (
                    <div>

                        <div className="form-group">

                            <label htmlFor="title">Société</label>


                            {actItem.map((e) =>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.nom_societe}
                                    value={Action.nom_societe = e.nom_societe}
                                    onChange={handleInputChange}
                                    validations={[required, vsiret]}
                                    name="nom_societe"
                                />
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">date RDV</label>
                            {actItem.map((e) =>

                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="title"
                                    defaultValue={(e.date_rdv).toString().substring(0, 16)}
                                    value={Action.date_rdv}
                                    onChange={handleInputChange}
                                    validations={[required, vsiren]}
                                    name="date_rdv"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">description</label>

                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.description}
                                    value={Action.description}
                                    onChange={handleInputChange}
                                    validations={[required, vnom_soc]}
                                    name="description"
                                />
                            )}
                        </div>
                        
                        <div className="form-group">

                            <label htmlFor="title">interlocuteur</label>
                            {actItem.map((e) =>
                                <Multiselect
                                    displayValue="nom"
                                    value="4"
                                    isObject={true}
                                    selectedValues={[{ nom: e.nom_interlocuteur }]}
                                    onChange={console.log}
                                    id={console.log}
                                    onNOMPressFn={function noRefCheck() { }}
                                    onRemove={function noRefCheck() { }}
                                    onSearch={function noRefCheck() { }}
                                    onSelect={land2}
                                    options={idSocieteInterl}
                                    showCheckbox
                                />
                            )}

                        </div>
                        <div className="form-group">

                            <label htmlFor="title">Type d activite commerciale</label>
                            {actItem.map((e) =>
                                <Multiselect
                                    displayValue="label"
                                    value="4"
                                    isObject={true}
                                    selectedValues={[{ label: e.type_action }]}
                                    onChange={console.log}
                                    id={console.log}
                                    onNOMPressFn={function noRefCheck() { }}
                                    onRemove={function noRefCheck() { }}
                                    onSearch={function noRefCheck() { }}
                                    onSelect={land}
                                    options={option}
                                    showCheckbox
                                />
                            )}

                        </div>
                        <div className="form-group">
                            <label htmlFor="title">besoin</label>
                            {actItem.map((e) =>
                                <Multiselect
                                    displayValue="NOM"
                                    value="4"
                                    isObject={true}
                                    selectedValues={[{ NOM: e.besoin }]}
                                    onChange={console.log}
                                    id={console.log}
                                    onNOMPressFn={function noRefCheck() { }}
                                    onRemove={function noRefCheck() { }}
                                    onSearch={function noRefCheck() { }}
                                    onSelect={land3}
                                    options={besoinliste}
                                    showCheckbox
                                />
                            )}
                        </div>







                        <button className="btn btn-success">
                            Valider
                        </button>


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

    );
};

export default ActionMod;
