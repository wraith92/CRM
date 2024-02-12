import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthInterlocuteur from "../../services/Interlocuteur";
import "react-datepicker/dist/react-datepicker.css";
import checkForm from '../../common/Ajouter/checkedForm'
import '../../assets/css/picklist.css'
import AuthService from "../../services/auth.service";
import { useParams } from "react-router-dom";
const AddTutorial = () => {



    //variable checked from
    const required = checkForm.required;
    const vsiret = checkForm.vsiret;
    const vsiren = checkForm.vsiren;
    const vnom_soc = checkForm.vnom_soc;
    const vnom_responsable = checkForm.vnom_responsable;
    const vsyndicat = checkForm.vobservation;
    const vadresse = checkForm.vadresse;

    const initialSocieteState = {
        id: "",
        nom: "",
        prenom: "",
        email: "",
        adresse: "",
        code_postal: "",
        tel: "",
        fonction_inter: "",


    };
    const [Interlocuteur, setInterlocuteur] = useState({ initialSocieteState });
    const [ListeInterlocuteur, setListeInterlocuteur] = useState([]);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [myJSON, setactive] = useState([]);
    const form = useRef();
    const checkBtn = useRef();
    const saveSociete = (e) => {
        var data = {
            id_interlocuteur : Interlocuteur.id_interlocuteur ,
            id_soc : Interlocuteur.id_soc ,
            nom: Interlocuteur.nom,
            prenom: Interlocuteur.prenom,
            email: Interlocuteur.email,
            adresse: Interlocuteur.adresse,
            code_postal: Interlocuteur.code_postal,
            tel: Interlocuteur.tel,
            fonction_inter: Interlocuteur.fonction_inter,
            message: message.message,
            successful: successful.successful,
        };

        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthInterlocuteur.update(Interlocuteur.id_interlocuteur, data)
                .then(response => {
                    setInterlocuteur({
                        id_interlocuteur : response.data.id_interlocuteur ,
                        id_soc : response.data.id_soc ,
                        nom: response.data.nom,
                        prenom: response.data.prenom,
                        email: response.data.email,
                        adresse: response.data.adresse,
                        code_postal: response.data.code_postal,
                        tel: response.data.tel,
                        fonction_inter: response.data.fonction_inter,
                    }
                    );
                    setSuccessful(true);
                    setMessage(response.data.message)
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

    console.log("test", myJSON)

    // API modifier
    const params = useParams();
    var nb = parseInt(params.id);
    const user = AuthService.getCurrentUser()
    //SELECT ALL Interlocuteur WHERE AUTH
    const retrieveInterlocuteur = () => {
        if (user) {
            AuthInterlocuteur.findAll()
            .then((response) => {
                setListeInterlocuteur(response.data);

            })
            .catch((e) => {
              console.log(e);
            });
        }
    };
    //FILTER SOCIETES SELON L'ID
    const actItem = ListeInterlocuteur.filter(task => task.id_interlocuteur === nb)
    useEffect(() => {
        retrieveInterlocuteur()
    }, []);





    const handleInputChange = event => {
        const { name, value } = event.target;
        setInterlocuteur({ ...Interlocuteur, [name]: value });

    };



    return (
        <div className="submit-form">



            <Form onSubmit={saveSociete} ref={form}>
                {!successful && (
                    <div>

                        <div className="form-group">

                            <label htmlFor="title">id</label>
                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.id_interlocuteur}
                                    value={Interlocuteur.id_interlocuteur = e.id_interlocuteur}
                                    onChange={handleInputChange}
                                    validations={[required, vsiret]}
                                    name="id_interlocuteur"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Société</label>
                            {actItem.map((e) =>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.id_soc}
                                    value={Interlocuteur.id_soc}
                                    onChange={handleInputChange}
                                    validations={[required, vsiren]}
                                    name="id_soc"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">nom</label>
                            {actItem.map((e) =>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.nom}
                                    value={Interlocuteur.nom}
                                    onChange={handleInputChange}
                                    validations={[required, vsiren]}
                                    name="nom"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">prenom</label>

                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.prenom}
                                    value={Interlocuteur.prenom}
                                    onChange={handleInputChange}
                                    validations={[required, vnom_soc]}
                                    name="prenom"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">email</label>
                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.email}
                                    value={Interlocuteur.email}
                                    onChange={handleInputChange}
                                    validations={[required, vnom_responsable]}
                                    name="email"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">code naf</label>

                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.adresse}
                                    value={Interlocuteur.adresse}
                                    onChange={handleInputChange}
                                    validations={[required, vsyndicat]}
                                    name="adresse"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">tel</label>
                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.tel}
                                    value={Interlocuteur.tel}
                                    onChange={handleInputChange}
                                    validations={[required, vadresse]}
                                    name="tel"
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

export default AddTutorial;
