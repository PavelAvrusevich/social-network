import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import AddMessageForm from './AddMessageForm';
import Message from './Message/Message';
import React from 'react';
import { InitialStateType } from '../../redux/messages-reducer';

type OwnPropsType = InitialStateType & {
    sendMessage: (newMessageBody: string) => void;
};

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let dialogsElements = props.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElements = props.messages.map((m) => <Message message={m.message} key={m.id} />);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageForm sendMessage={props.sendMessage} />
            </div>
        </div>
    );
};

export default Dialogs;
