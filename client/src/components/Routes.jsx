
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ActionDetails from '../pages/ActionUser'
import Action from '../pages/Action'
import Ajouter from '../pages/Ajouter'
import DashboardAdmin from '../pages/DashboardAdmin'
import AuthService from "../services/auth.service";
import Interlocuteur from '../pages/Interlocuteur'
import InterlocuteurDetails from '../pages/InterlocuteurDetails'
import CustomerInfo from '../pages/CustomerInfo'
import UsersInfo from '../pages/User'
import CustomerModify from '../pages/societeMod'
import ActionMod from '../pages/ActionMod'
import InterlocuteurMod from '../pages/InterlocuteurMod'
import PageError from '../pages/Error-page';
import RoleUser from "../controllers/Role";
import Evolis from '../pages/Evolis'

const CRMRoutes = () => {
    const user = AuthService.getCurrentUser();
    const mysofitech = RoleUser.SofitechRole();

    return (
        <Switch>

            {user && mysofitech ? 
                <>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/admin'  component={DashboardAdmin} />
                    <Route path='/register' component={Register} />
                    <Route path='/Action/:id' component={Action} />
                    <Route path='/Evolis' component={Evolis} />
                    <Route path='/AllAction' component={ActionDetails}  />
                    <Route path='/Societes' component={Customers} />
                    <Route path='/Societe/:id' component={CustomerInfo} />
                    <Route path='/modifier/:id' component={CustomerModify} />
                    <Route path='/Interlocuteur/:id' component={Interlocuteur} />
                    <Route path='/ajouter' component={Ajouter} />
                    <Route path='/user/:id' component={UsersInfo} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Inter/modifier/:id' component={InterlocuteurMod} />
                    <Route path='/Actions/modifier/:id' component={ActionMod} />
                    <Route path='/Interl' component={InterlocuteurDetails} />
                </>
              

                :
                <div>
                    
                    <Route path='*' exact component={PageError} />
                    <Route path='/Login' component={Login} />
                </div>

            }


        </Switch>
    )
}

export default CRMRoutes
