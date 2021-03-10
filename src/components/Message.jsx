import { Avatar,Grid } from '@material-ui/core';
import React from 'react';

function Message({photoURL, displayName, text,current}) {
    return (
        <div className={`message ${current ? 'message_current' : ''}`}>
            <div className='message__avatar'>
                <Avatar src={photoURL} />
                <div className='message__name'>{displayName}</div>
            </div>
            <div className='message__text'>{text}</div>
        </div> 
    )
}

export default Message;
