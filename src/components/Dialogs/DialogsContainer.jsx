import React from 'react';
import {
    sendMessageCreator,
    updateNewMessageTextCreator,
} from '../../redux/message-reducer';
import Dialogs from './Dialogs';

function DialogsContainer(props) {
    let state = props.store.getState();

    let newText = state.dialogsPage.newText;

    let updateNewMessageText = (newText) => {
        props.store.dispatch(updateNewMessageTextCreator(newText));
    };

    let sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    return (
        <Dialogs
            sendMessage={sendMessage}
            updateNewMessageText={updateNewMessageText}
            newText={newText}
            dialogs={state.dialogsPage.dialogs}
            messages={state.dialogsPage.messages}
        />
    );
}

export default DialogsContainer;
