import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
const rootElement = React.createElement(App);
ReactDOM.createRoot(root).render(rootElement);

