import React from 'react';
import { actions } from '../../redux/messages-reducer';
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
        dispatch(actions.sendMessageCreator(newMessageBody));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
