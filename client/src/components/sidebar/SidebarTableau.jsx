import { SidebarIteact } from "./SidebarItem";
import { Link } from 'react-router-dom'
import logo from '../../assets/images/sofitech.png'
import AuthService from "../../services/auth.service";
export const SidbarTableActive = (props) => {
    return (
        <>
        {props.actItem.map((item, index) => (
                <Link to={item.route} key={index}  >
                    <SidebarIteact key={index}
                        title={item.display_name}
                        icon={item.icon}
                        active={(index === props.activeItem2) || (index === props.activeItem)}

                    />
                </Link>
            ))}
        </>
     );
}
export const SidbarImage = () => {
    return <img src={logo} alt="Logo Sofitech" className="sidebar__logo-img" />;
};
export const SidbarTableDeconnexion = (props) =>{
    // DECONNECTION
    const logOut = () => { AuthService.logout() };
    const active = props.active ? 'active' : '';
    return (
        <>
          {props.user ? (
                <div>
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
        </>
    )
}
