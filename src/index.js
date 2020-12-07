import store from './redux/redux-store';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

let rerender = (store) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App store={store} dispatch={store.dispatch.bind(store)} />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerender(store);

store.subscribe(() => rerender(store));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
