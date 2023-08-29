import React, { useEffect, useState } from 'react'
import AuthService from "../../services/auth.service";
import './topnav.css'
import { Link } from 'react-router-dom'
import Dropdown from '../dropdown/Dropdown'
import ThemeMenu from '../thememenu/ThemeMenu'
import user_menu from '../../assets/JsonData/user_menus.json'
import AuthAction from '../../services/Action'
import Moment from 'react-moment';
import 'moment/locale/fr';

import RoleUser from "../../controllers/Role";
const curr_user = {
    username: 'pas de user',

}
const user = AuthService.getCurrentUser();

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i class='bx bxs-notepad' ></i>
        <span>{item.nom_societe} RDV:  <Moment fromNow>{item.date_rdv}</Moment></span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = props => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [Action, SetAction] = useState([]);
    const mysofitech = RoleUser.SofitechRole();


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            //ACTION
            AuthAction.findAll().then((response) => {
                SetAction(response.data)
            })
                .catch((e) => {
                    console.log(e);
                });

            setCurrentUser(user)

        }


    }, [])
    console.log(currentUser)
     // Calculate the number of days left until password expiration
   
    // Rendre l'alerte d'expiration du mot de passe
    const renderPasswordExpirationAlert = () => {
        if (user && user.passwordLastChanged) {
            const passwordExpirationDate = new Date(currentUser.passwordLastChanged);
            
            const daysUntilExpiration = Math.ceil(
                (new Date() - passwordExpirationDate  ) / (1000 * 3600 * 24)
            );
    
            if (30 - daysUntilExpiration <= 7 && daysUntilExpiration > 0) {
                if (daysUntilExpiration === 0) {
                    return (
                        <a href="/change-password" className="alert alert-warning" role="alert">
                            Votre mot de passe expire demain.
                        </a>
                    );
                }
                return (
                    <a href="/change-password" className="alert alert-warning" role="alert">
                        Votre mot de passe expirera dans {30- daysUntilExpiration} jours. 
                    </a>
                );
            } else if (daysUntilExpiration > 7) {
                return (
                    <a href="/change-password" className="alert alert-success" role="alert">
                        Votre mot de passe expirera dans {daysUntilExpiration} jours.
                    </a>
                );
            }
        }
        return null;
    };
    
 
    let date = new Date()
    const mysn = 1000 * 3600 * 24
    const fltr_date = Action.filter(task => (((new Date(task.date_rdv) - date) / mysn) < 7) && ((new Date(task.date_rdv) - date) / mysn) > 0)

    const Action_util1 = fltr_date.filter(task => task.id_utili === currentUser.id)
    return (
        <div>
            {user && mysofitech  ? (

                <div className='topnav'>
                    <div className="input-group mb-3">
                    {renderPasswordExpirationAlert()}
                        <div className="topnav">
                            <div className=''>
                            
                            </div>
                            
                        </div>
                    </div>
                    <div className="topnav__right">
                        <div className="topnav__right-item">
                            {/* dropdown here */}
                            {currentUser  ? (


                                    <div className="sidebar__item">
                                        <div className={`sidebar__item-inner`}>
                                        
                                            <i className='bx bxs-user-check' ></i>
                                            <span >
                                                {currentUser.username}
                                            </span>
                                        </div>
                                        

                                    </div>

                            ) : (
                                <Dropdown
                                    customToggle={() => renderUserToggle(curr_user)}
                                    contentData={user_menu}
                                    renderItems={(item, index) => renderUserMenu(item, index)}
                                />
                            )}
                        </div>
                        <div className="topnav__right-item">
                            <Dropdown
                                icon='bx bx-bell'
                                badge={Action_util1.length}
                                contentData={Action_util1}
                                renderItems={(item, index) => renderNotificationItem(item, index)}

                            />
                            {/* dropdown here */}
                        </div>
                        <div className="topnav__right-item">
                            <ThemeMenu />
                        </div>
                    </div>
                    
                    
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>

    )
}

export default Topnav
