import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import FriendsList from "./pages/FriendsList/FriendsList";

import 'font-awesome/css/font-awesome.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <FriendsList/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
