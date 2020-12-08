import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';

function Dialogs(props) {
    let dialogsElements = props.dialogs.map((d) => (
        <DialogItem name={d.name} key={d.id} id={d.id} />
    ));

    let messagesElements = props.messages.map((m) => (
        <Message message={m.message} key={m.id} />
    ));

    let newText = props.newText;

    let onUpdateNewMessageText = (e) => {
        let newText = e.target.value;
        props.updateNewMessageText(newText);
    };

    let onSendMessage = () => {
        props.sendMessage();
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
                {messagesElements}
                <textarea
                    onChange={onUpdateNewMessageText}
                    placeholder="введите сообщение"
                    value={newText}
                ></textarea>
                <button onClick={onSendMessage}>Отправить</button>
            </div>
        </div>
    );
}

export default Dialogs;
