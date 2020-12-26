import React from 'react';
import { sendMessageCreator } from '../../redux/message-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (newMessageBody) => {
        dispatch(sendMessageCreator(newMessageBody));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
