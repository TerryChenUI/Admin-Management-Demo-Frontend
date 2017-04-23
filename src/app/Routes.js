import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import Main from './pages/layout/main/Main';
import Home from './pages/home/Home';

import ArticleList from './pages/article/list/ArticleList';
import ArticleEdit from './pages/article/edit/ArticleEdit';
import CategoryList from './pages/article/category/CategoryList';
import CategoryEdit from './pages/article/category/CategoryEdit';
import TagList from './pages/article/tag/TagList';
import TagEdit from './pages/article/tag/TagEdit';

const routes = 
    <Route path="/" component={App}>
        <Route component={Main}>
            <IndexRoute component={Home}/>
            <Route path="article/list" component={ArticleList} />
            <Route path="article/(add)(edit)(/:id)" component={ArticleEdit} />
            <Route path="category/list" component={CategoryList} />
            <Route path="category/(add)(edit)(/:id)" component={CategoryEdit} />
            <Route path="tag/list" component={TagList} />
            <Route path="tag/(add)(edit)(/:id)" component={TagEdit} />
        </Route>
    </Route>;

export default routes;