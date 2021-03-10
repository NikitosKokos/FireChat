import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { Container } from '@material-ui/core';
import { Context } from './index';
import {useAuthState} from 'react-firebase-hooks/auth';
import Loader from './components/Loader';
import { Grid } from '@material-ui/core';

function App() {
  const {auth} = React.useContext(Context)
  const [user,loading,error] = useAuthState(auth);

  return (
    <div className='wrapper'>
      <Router>
          <Container>
            <Navbar/>
            {loading ?
            <Grid container 
                  style={{height: 'calc(100vh - 64px)'}}
                  alignItems='center'
                  justify='center'
            >
              <Loader/>
            </Grid>
            :
            <AppRouter/> 
            }
          </Container>
      </Router>
    </div>
  );
}

export default App;
