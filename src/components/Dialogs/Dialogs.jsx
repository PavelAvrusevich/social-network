import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react'

function Dialogs(props) {
    let dialogsElements = props.state.dialogs.map((d) => (
        <DialogItem name={d.name} id={d.id} />
    ));

    let messagesElements = props.state.messages.map((m) => (
        <Message message={m.message} />
    ));
    
    let newMessage = React.createRef();
    
    let showNewMessage = () => {
      alert(newMessage.current.value);
    }

    return (
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          {messagesElements}
          <textarea onClick={showNewMessage} ref={newMessage} placeholder='введите сообщение'></textarea>
        </div>
      </div>
    );
}

export default Dialogs;
