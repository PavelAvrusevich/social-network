import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';
import {
    sendMessageCreator,
    updateNewMessageTextCreator,
} from '../../redux/message-reducer';

function Dialogs(props) {
    let dialogsElements = props.dialogsPage.dialogs.map((d) => (
        <DialogItem name={d.name} id={d.id} />
    ));

    let messagesElements = props.dialogsPage.messages.map((m) => (
        <Message message={m.message} />
    ));

    let newText = props.dialogsPage.newText;

    let updateNewMessageText = (e) => {
        let newText = e.target.value;
        props.dispatch(updateNewMessageTextCreator(newText));
    };

    let sendMessage = () => {
        props.dispatch(sendMessageCreator());
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    onChange={updateNewMessageText}
                    placeholder="введите сообщение"
                    value={newText}
                ></textarea>
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
}

export default Dialogs;
