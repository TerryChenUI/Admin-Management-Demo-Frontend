import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/ConfigureStore';
import DevTools from './store/DevTools';

import routes from './routes';

const store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);