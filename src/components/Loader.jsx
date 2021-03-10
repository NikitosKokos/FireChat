import React from 'react';
import { Grid } from '@material-ui/core';

function Loader() {
    return (
        <Grid container
              alignItems='center'
              justify='center'
        >
            <div className="loader"></div>  
        </Grid>
    )
}

export default Loader;
