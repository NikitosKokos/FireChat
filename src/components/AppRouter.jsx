import React from 'react';
import {
    Route,
    Switch,
    Redirect
  } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {publicRoutes,privateRoutes} from '../routs';
import { Context } from '../index';
import {useAuthState} from 'react-firebase-hooks/auth';

function AppRouter() {
    const {auth} = React.useContext(Context);
    const [user] = useAuthState(auth);

    return (user ? 
        (
            <Switch>
                {privateRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact={true} />)}
                <Redirect to={CHAT_ROUTE}/>
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact={true} />)}
                <Redirect to={LOGIN_ROUTE}/>
            </Switch>
        )
    )
}

export default AppRouter;
