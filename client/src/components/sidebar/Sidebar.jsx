import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import logo from '../../assets/images/sofitech.png'
import logoCemeca from '../../assets/images/logo-cemeca.png';
import * as sidebareRoute from '../../assets/JsonData/sidebareRoute';
import { SidebarItedes, SidebarIteact } from '../sidebar/SidebarItem'
import Role from '../../controllers/Role';

const Sidebar = props => {
    const user = AuthService.getCurrentUser()
    const active = props.active ? 'active' : '';
    const [new_sidbar, setSidbar] = useState([]);
    const [Admin, setIsAdmin] = useState(false);
    const myadmin = Role.AdminRole();
    const mysofitech = Role.SofitechRole
    const sof = Role.SofitechRole()
    useEffect(() => {
        if (user) {
            if (myadmin) setIsAdmin(true)
        }
    }, [myadmin,mysofitech])
    const [currentUser, setCurrentUser] = useState(undefined);
    const [reload, setreload] = useState(true);
    const [cemeca, setcemeca] = useState(false);

    const [sofitech, setSofitech] = useState(false);
    // Get  URL from window location
    const nameUrl = window.location.href.slice(21, 28)

console.log(myadmin,"sidbar")
console.log(sof,"softech")
    // DECONNECTION
    const logOut = () => { AuthService.logout() };
    // CONNECTION 

    // GET ROLE 
    useEffect(() => {
        retrieveRole()
    }, [myadmin])
    console.log(myadmin)
    const retrieveRole = () => {

        if (user && mysofitech) {

            setCurrentUser(user)


            //sofitech Role
            UserService.getSofitechBoard().then(
                response => {
                    setSofitech(true)
                 
                },

                error => {
                    setSofitech(false)
                   
                }

            );

            //user
    
            if (myadmin) {
                const nouveaustate = [...new_sidbar]
                nouveaustate.push( sidebareRoute.AdminDashboard, sidebareRoute.gestion);
                setSidbar(nouveaustate)
            }
            else {
                const nouveaustate = [...new_sidbar]
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

console.log(new_sidbar)

    //ACTIVE LINK 
    const activeItem = new_sidbar.findIndex(item => item.route.includes(props.location.pathname))
    const activeItem2 = new_sidbar.findIndex(item => item.route === nameUrl)
    //FILTER SIDEBAR CONNECTION && DECONNECTION
    const desaItem = new_sidbar.filter(task => task.status === "desactive")
    const actItem = new_sidbar.filter(task => task.status === "active")

    const renderImage = () => {
        if (cemeca === true) {
            return <img src={logoCemeca} alt="company logo" />
        }
        else if (sofitech === true) {
            return <img src={logo} alt="company logo" />
        }
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                {renderImage()}

            </div>
            {actItem.map((item, index) => (
                <Link to={item.route} key={index}  >

                    <SidebarIteact key={index}
                        title={item.display_name}
                        icon={item.icon}
                        active={(index === activeItem2) || (index === activeItem)}

                    />
                </Link>
            ))}
            {currentUser ? (
                <div>
                    {
                        desaItem.map((item, index) => (
                            <SidebarItedes key={index}
                                title={item.display_name}
                                icon={item.icon}
                                active={(index === activeItem2) || (index === activeItem)}

                            />
                        ))
                    }
                    <div className="sidebar__item">
                        <div className={`sidebar__item-inner${active}`}>
                            <i className='bx bxs-log-out'></i>
                            <a href="/login" className="nav-link" onClick={logOut}>Déconnexion</a>
                        </div>

                    </div>

                </div>


            ) : (
                <div className="sidebar__item">


                </div>
            )}
        </div>
    )
}

export default Sidebar

