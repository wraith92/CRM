import React from 'react'

//sidabr desactivation parametres
export const SidebarItedes = props => {

    const active = props.desactive ? '' : 'desactive';

    return (
        <div className="sidebar__item">
            <div disabled className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>
            </div>
        </div>
    )
}
//sidabr activation parametres
export  const SidebarIteact = props => {

    const active = props.active ? 'active' : '';

    return (
        <div disabled className="sidebar__item">
            <div disabled className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>
            </div>
        </div>

    )
}

