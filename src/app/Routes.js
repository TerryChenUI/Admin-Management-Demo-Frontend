import React from 'react';
import { Route } from 'react-router';

import App from './pages/App';
import Main from './pages/layout/main/Main';
import Home from './pages/home/Home';
import CategoryList from './pages/category/CategoryList';
import CategoryEdit from './pages/category/CategoryEdit';

export default (
    <Route path="/" component={App}>
        <Route component={Main}>
            <Route path="home" component={Home} />
            <Route path="category/list" component={CategoryList} />
            <Route path="category/(add)(edit)(/:id)" component={CategoryEdit} />
        </Route>
    </Route>
);