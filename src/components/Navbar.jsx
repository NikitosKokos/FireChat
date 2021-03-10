import { AppBar,Toolbar,Typography,Grid,Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import {useAuthState} from 'react-firebase-hooks/auth';


function Navbar() {
    const {auth} = React.useContext(Context)
    const [user] = useAuthState(auth);
    return (
        <AppBar color='secondary' position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                FireChat
            </Typography>
            <Grid container justify='flex-end'>
                {user ? 
                <NavLink to={CHAT_ROUTE}>
                    <Button onClick={() => auth.signOut()} variant="contained" color="secondary">Logout</Button>
                </NavLink>
                :
                <NavLink to={LOGIN_ROUTE}>
                    <Button variant="contained" color="secondary">Login</Button>
                </NavLink>
                }
            </Grid>
        </Toolbar>
        </AppBar>
    )
}

export default Navbar
