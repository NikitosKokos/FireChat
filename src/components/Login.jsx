import { Grid,Box,Button } from '@material-ui/core';
import React from 'react';
import {Context} from '../index';
import firebase from 'firebase';

function Login() {
    const {auth} = React.useContext(Context);

    const login = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
    }

    return (
            <Grid container 
                  style={{height: window.innerHeight - 64}}
                  alignItems='center'
                  justify='center'
            >
                <Grid container
                      style={{width: 400, background: '#fff'}}
                      alignItems='center'
                      direction='column'
                >
                    <Box p={5}>
                        <Button onClick={login} variant="outlined" color="secondary">Login with Google</Button>
                    </Box>    
                </Grid>
                
            </Grid>
    )
}

export default Login;
