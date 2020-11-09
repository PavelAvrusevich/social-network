import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

function DialogItem (props) {
  return (
    <div className={s.dialog + " " + s.active}>
       <NavLink to={'/dialogs/'+props.id}>{props.name}</NavLink> 
    </div>
  )
}

function Message (props) {
  return (
    <div className={s.message}>{props.message}</div>
  )
}

function Dialogs() {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name='Серега' id='1' />
        <DialogItem name='Вован' id='2' />
        <DialogItem name='Паша' id='3' />
        <DialogItem name='Женя' id='4' />
        <DialogItem name='Саня' id='5' />
      </div>
      <div className={s.messages}>
        <Message message="message 1" />
        <Message message="message 2" />
        <Message message="message 3" />
        <Message message="message 4" />
      </div>
    </div>
  );
}

export default Dialogs;
