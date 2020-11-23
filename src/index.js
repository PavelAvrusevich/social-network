import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
  { id: '1', message: 'привет, как дела??', likesCount: '12' },
  { id: '2', message: 'Я ждун))', likesCount: '10' },
];

let dialogs = [
  { id: '1', name: 'Серега' },
  { id: '2', name: 'Вован' },
  { id: '3', name: 'Силос' },
];

let messages = [
  { id: '1', message: 'message 1' },
  { id: '2', message: 'message 2' },
  { id: '3', message: 'message 121' },
];

ReactDOM.render(
      <App posts={posts} dialogs={dialogs} messages={messages} />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();