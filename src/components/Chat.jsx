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
                      style={{width: '100%', background: '#fff', marginTop: '15px'}}
                >
                    
                    <div className='messages'>
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
                        messages.map(message => <Message photoURL={message.photoURL} displayName={message.displayName} text={message.text} current={user ? (user.uid === message.uid): false}
                         />)
                        }
                    </div>
                    <Grid container
                          alignItems='center'
                          justify='center'
                          className='send'
                    >
                        <TextField 
                            variant='outlined'
                            placeholder='Enter new message...'
                            rowsMax={2}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            className='send__input'
                        />
                        <Button 
                            onClick={sendMessage}
                            variant="outlined" 
                            color="secondary"
                            className='send__btn'
                        >Send</Button>
                    </Grid>  
                </Grid>
            </Grid>
    )
}

export default Chat;
