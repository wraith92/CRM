
import Customersinfo from "../../pages/CustomerInfo";
import Customers from "../../pages/Customers";
import CustomerMod from "../../pages/societeMod"
import ActionDetails from "../../pages/ActionUser"
import Dashboard from "../../pages/Dashboard";
import Ajouter from "../../pages/Ajouter";
import Login from "../../pages/Login";
import Action from "../../pages/Action";
import { Route } from 'react-router-dom'
import Register from "../../pages/Register";
import PageError from "../../pages/Error-page";
import Interlocuteur from "../../pages/Interlocuteur";
import InterlocuteurMod from "../../pages/InterlocuteurMod"
const routes401 = [
    {
        path: '/',
        Component: PageError,
    },
    {
        path: '/Societes',
        Component: PageError,
    },
    {
        path: '/modifier/:id',
        Component: PageError,
    },
    {
        path: '/Action',
        Component: PageError,
    },
    {
        path: '/Action/:id',
        Component: PageError,
    },
    {
        path: '/Ajouter',
        Component: PageError,
    },
    {
        path: '/Societes/:id',
        Component: PageError,
    },
    {
        path: '/Register',
        Component: PageError,
    },
    {
        path: '/Login',
        Component: Login
    },
]
const routes = [
    {
        path: '/',
        Component: Dashboard,
    },
    {
        path: '/Societes',
        Component: Customers,
    },
    {
        path: '/modifier/:id',
        Component: CustomerMod,
    },
    {
        path: '/Action',
        Component: ActionDetails,
    },
    {
        path: '/Action/:id',
        Component: Action,
    },
    {
        path: '/Ajouter',
        Component: Ajouter,
    },
    {
        path: '/Societes/:id',
        Component: Customersinfo,
    },
    {
        path: '/Register',
        Component: Register,
    },
    {
        path: '/Interlocuteur/:id',
        element: Interlocuteur,
    }, {
        path: '/Interlocuteur/info/:id',
        Component: InterlocuteurMod
    }

];

const RouteComponents = () => {
    return routes.map(({path,Component}) =>
    <Route path={path} element={<Component/>} />
  );
}
const RouteComponentsNot = () => {
    return routes401.map(({path,element}) =>
    <Route path={path} element={<Component />} />
  );
}

export { RouteComponents, RouteComponentsNot }