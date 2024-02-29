import React, { useEffect, useState } from 'react'
import './sidebar.css'
import AuthService from "../../services/auth.service";
import * as sidebareRoute from '../../assets/JsonData/sidebareRoute';
import Role from '../../controllers/Role';
import {SidbarTableActive,SidbarTableDeconnexion,SidbarImage} from './SidebarTableau';
import { useLocation } from 'react-router-dom';


const Sidebar = props => {
    const location = useLocation();
    const isConfirmationRoute = location.pathname.startsWith('/confirmation/');
    const user = AuthService.getCurrentUser()
    const [new_sidbar, setSidbar] = useState([]);
    const myadmin = Role.AdminRole();
    const mysofitech = Role.SofitechRole()
    // Get  URL from window location
    const nameUrl = window.location.href.slice(21, 28)
    //ACTIVE LINK
    const activeItem = new_sidbar.findIndex(item => item.route.includes(props.location.pathname))
    const activeItem2 = new_sidbar.findIndex(item => item.route === nameUrl)
    //FILTER SIDEBAR CONNECTION && DECONNECTION
    const actItem = new_sidbar.filter(task => task.status === "active")
    // GET ROLE
    useEffect(() => {
        retrieveRole()
    }, [myadmin, mysofitech])
    const retrieveRole = () => {
        if (user) {
            if (myadmin && mysofitech) {
                const nouveaustate = []
                nouveaustate.push(sidebareRoute.Tableaudebord, sidebareRoute.ajouter, sidebareRoute.Societes, sidebareRoute.Actions, sidebareRoute.interlocuteurs, sidebareRoute.AdminDashboard, sidebareRoute.gestion);
                setSidbar(nouveaustate)
            }
            else if (mysofitech && !myadmin) {
                const nouveaustate = []
                nouveaustate.push(sidebareRoute.Tableaudebord, sidebareRoute.ajouter, sidebareRoute.Societes, sidebareRoute.Actions, sidebareRoute.interlocuteurs);
                setSidbar(nouveaustate)
            }
        }
        //DECONNECTION
        else {
            const nouveaustate = []
            nouveaustate.push(sidebareRoute.connexion);
            setSidbar(nouveaustate)
        }
    };
    

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <SidbarImage mysofitech={mysofitech} />
            </div>
            {!isConfirmationRoute && (
                <>
                  <SidbarTableActive
                 actItem={actItem}
                 activeItem2={activeItem2}
                 activeItem={activeItem}
             />
             <SidbarTableDeconnexion
             user={user}
             />
                </>
               
            )}
           

        </div>
    )
}

export default Sidebar

