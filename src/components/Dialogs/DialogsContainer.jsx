import React from 'react';
import {
    sendMessageCreator,
    updateNewMessageTextCreator,
} from '../../redux/message-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    newText: state.dialogsPage.newText,
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: () => {
        dispatch(sendMessageCreator());
    },
    updateNewMessageText: (newText) => {
        dispatch(updateNewMessageTextCreator(newText));
    },
});

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
