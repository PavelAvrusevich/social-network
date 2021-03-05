import React from 'react';
import { actions } from '../../redux/messages-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => ({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
});

export default compose(connect(mapStateToProps, {...actions}), withAuthRedirect)(Dialogs);
