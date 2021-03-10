import React from 'react';
import { Context } from '../index';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Grid,Box,Button,TextField } from '@material-ui/core';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase';
import Message from './Message';

function Chat() {
    const {auth, firestore} = React.useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = React.useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );
    
    
    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setValue('');
    }

    return (
        <Grid container 
                  style={{minHeight: 'calc(100vh-64px)'}}
                  alignItems='center'
                  justify='center'
            >
                <Grid container
                      alignItems='flex-end'
                      direction='column'
                      style={{width: '100%', padding: '20px', background: '#fff', marginTop: '15px'}}
                >
                    
                    <div
                        style={{width: '100%',height: '70vh', flex: '1 1 auto', border: '1px solid #fff', overflowY: 'auto', paddingRight: '10px'}}
                    >
                        {
                        loading ?
                        <Grid container 
                            style={{height: '100%'}}
                            alignItems='center'
                            justify='center'
                        >
                            <Loader/>
                        </Grid>
                        : 
                        messages.map(message => <Message photoURL={message.photoURL} displayName={message.displayName} text={message.text} current={user.uid === message.uid}
                         />)
                        }
                    </div>
                    <Grid container
                          alignItems='center'
                          style={{borderTop: '1px solid #f50057', paddingTop: '20px'}}
                    >
                        <TextField 
                            variant='outlined'
                            placeholder='Enter new message...'
                            style={{flex: '1 1 auto', marginRight: '15px'}}
                            rowsMax={2}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <Button onClick={sendMessage} style={{padding: '15.5px 25.5px'}} variant="outlined" color="secondary">Send</Button>
                    </Grid>  
                </Grid>
            </Grid>
    )
}

export default Chat;
