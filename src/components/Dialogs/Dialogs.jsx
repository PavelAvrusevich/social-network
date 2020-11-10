import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

function DialogItem(props) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id} >{props.name}</NavLink>
        </div>
    );
}

function Message(props) {
    return <div className={s.message}>{props.message}</div>;
}

function Dialogs() {
    let dialogsData = [
        { id: '1', name: 'Серега' },
        { id: '2', name: 'Вован' },
        { id: '3', name: 'Силос' },
    ];

    let messagesData = [
        { id: '1', message: 'message 1' },
        { id: '2', message: 'message 2' },
        { id: '3', message: 'message 121' },
    ];

    let dialogs = dialogsData.map( (d) => <DialogItem name={d.name} id={d.id} /> )

    let messages = messagesData.map( (m) => <Message message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogs}
            </div>
            <div className={s.messages}>
                 {messages}
            </div>
        </div>
    );
}

export default Dialogs;
