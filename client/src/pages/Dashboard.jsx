import React, { useEffect, useState } from "react";
import StatusCard from "../components/status-card/StatusCard";
import "moment/locale/fr";
import Box from "@mui/material/Box";
import AuthAction from "../controllers/Action";
import AuthService from "../services/auth.service";
import RoleUser from "../controllers/Role";
import Societe from "../controllers/Societe";
//components
import ListeSociete from "../components/societe/ListeDashbord";
import ListeAction from "../components/action/ListeDashboard";
import ChartDateAction from "../components/chart/chartAction";
import ChartDateSociete from "../components/chart/chartSociete";
import InputDateDebut from "../components/Date/inputDate";
import InputDateFin from "../components/Date/inputDate2";
import { getStatusCardAdmin } from "../components/card/statuscardadmin";
import { getStatusCardEvolis } from "../components/card/statuscardEvolis";
import { fncardadmin } from "../components/card/statuscard";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  //GET user
  const user = AuthService.getCurrentUser();
  //GET role admin
  const myadmin = RoleUser.AdminRole();
  //GET role sofitech
  const mysofitech = RoleUser.SofitechRole();
  //GET role cemece
  const mycemeca = RoleUser.CemecaRole();

  //GET societer
  const [societeListe, Setsociete] = useState([]);
  //GET actions
  const [Action, SetAction] = useState([]);
  const Action_util = Action.filter((task) => task.id_utili === user.id);
  Action.sort(
    (b, a) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime()
  );
  //GET societes
  const societe_util = societeListe.filter((task) => task.id_utili === user.id);
  societeListe.sort(
    (b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  console.log(societe_util);
  //refreh data
  useEffect(() => {
    if (user) {
      //ACTION
      AuthAction.ActionListe()
        .then((data) => SetAction(data))
        .catch((error) => {
          console.log("Error fetching data:", error);
          SetAction(null); // set the data to null to indicate an error
        });
      //afficher cemeca
      if (mycemeca) Societe.CemecaListe().then((data) => Setsociete(data));

      //afficher sofitech
      if (mysofitech) Societe.AllSociete().then((data) => Setsociete(data));
    }
  }, [mycemeca, mysofitech]);
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
  //filter Month action chart
  const tableau_action = [];
  const tableau_societe = [];
  for (let index = 0; index < 12; index++) {
    tableau_action.push(
      Action.filter((task) => new Date(task.date_action).getMonth() === index)
        .length
    );
    tableau_societe.push(
      societeListe.filter(
        (task) => new Date(task.createdAt).getMonth() === index
      ).length
    );
  }

  const mysn = 1000 * 3600 * 24;
  const fltr_date = Action.filter(
    (task) =>
      (new Date(task.date_rdv) - valueDate2) / mysn < 0 &&
      (new Date(task.date_rdv) - valueDate1) / mysn > 0
  );
  const filtre_date_Action_util1 = fltr_date.filter(
    (task) => task.id_utili === user.id
  );
  //card acrion admin
  const statusCardAdmin = getStatusCardAdmin({ fltr_date });
  const statusCardEvolis = getStatusCardEvolis({ fltr_date });
  //carde action user
  const statusCard = fncardadmin({ filtre_date_Action_util1 });

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (newPage) => {
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
  const navigateToEvolis = (fltr_date) => {
    // Use the useHistory hook to get access to the history object
    history.push({
      pathname: "/Evolis",
      state: { fltr_date }, // Pass the filterObject in the state property
    });
  };
  const handleClickGoToEvolis = () => {
    navigateToEvolis(fltr_date);
  };
  console.log(fltr_date);
  return (
    <div>
      {/* si le client est connecter*/}
      {user ? (
        <div>
          <h2 className="page-header">Tableau de bord</h2>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <InputDateDebut
                      valueDate1={valueDate1}
                      handleChangeDate1={handleChangeDate1}
                    />
                  </div>
                  <div className="col-6">
                    <InputDateFin
                      valueDate2={valueDate2}
                      handleChangeDate2={handleChangeDate2}
                    />
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
                    <div className="row">
                      {statusCard.map((item, index) => (
                        <div className="col-6" key={index}>
                          <a href="AllAction">
                            <StatusCard
                              icon={item.icon}
                              count={item.count}
                              title={item.title}
                            />
                          </a>
                        </div>
                      ))}
                      {statusCardAdmin.map((item, index) => (
                        <div className="col-6" key={index}>
                          <a href="AllAction">
                            <StatusCard
                              icon={item.icon}
                              count={item.count}
                              title={item.title}
                            />
                          </a>
                        </div>
                      ))}
                      {statusCardEvolis.map((item, index) => (
                        <div className="col-6" key={index}>
                          <div className="row justify-content-md-center">
                            <div className="col-4" key={index}>
                              <button onClick={handleClickGoToEvolis}>
                                {/* Pass the props to the StatusCard component */}
                                <StatusCard
                                  icon={item.icon}
                                  title={item.title}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="row">
                      {statusCard.map((item, index) => (
                        <div className="col-6" key={index}>
                          <a href="#">
                            <StatusCard
                              icon={item.icon}
                              count={item.count}
                              title={item.title}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* chart graphique des clients  */}
            <div className="col-6">
              <ChartDateAction tableau_action={tableau_action} tableau_societe={tableau_societe} />
            </div>
           
            {/* dernier societe cree */}
            <div className="col-6">
              <ListeSociete
                handleChangeDate={handleChangePage}
                societeListe={societeListe}
                societe_util={societe_util}
                page={page}
                myadmin={myadmin}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
            {/* dernier action cree */}
            <div className="col-6">
              <ListeAction
                handleChangeDate2={handleChangePage2}
                Action={Action}
                Action_util={Action_util}
                page2={page2}
                myadmin={myadmin}
                rowsPerPage2={rowsPerPage2}
                handleChangeRowsPerPage2={handleChangeRowsPerPage2}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar__item">
          <div disabled className={`sidebar__item-inner `}>
            <i className="bx bxs-user-x"></i>
            <span>pas connecter</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
