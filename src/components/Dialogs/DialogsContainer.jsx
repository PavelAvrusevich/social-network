import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/message-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

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

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
