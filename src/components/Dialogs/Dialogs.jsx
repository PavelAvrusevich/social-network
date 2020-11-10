import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

function DialogItem(props) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
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
    ];

    let messagesData = [
        { id: '1', message: 'message 1' },
        { id: '2', message: 'message 2' },
    ];

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
            </div>
            <div className={s.messages}>
                <Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />
            </div>
        </div>
    );
}

export default Dialogs;
