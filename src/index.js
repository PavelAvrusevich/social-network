import store from './redux/state';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

let rerender = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={store.addPost.bind(store)}
                fixNewText={store.fixNewText.bind(store)}
            />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerender(store.getState());

store.subscribe(rerender);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
