import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
// import Main from './containers/Layout/Main';
import Index from './containers/home/';

import ArticleList from './containers/content/article/list';
import ArticleEdit from './containers/content/article/edit';
import CategoryList from './containers/content/category/list';
import CategoryEdit from './containers/content/category/edit';
import TagList from './containers/content/tag/list';
import TagEdit from './containers/content/tag/edit';

const routes =
    <Route path="/" component={App}>
        {/*<Route component={Main}>*/}
        <IndexRoute component={Index} />
        <Route path="articles" component={ArticleList} />
        <Route path="articles/(add)(:id)" component={ArticleEdit} />
        <Route path="categories" component={CategoryList} />
        <Route path="categories/(add)(:id)" component={CategoryEdit} />
        <Route path="tags" component={TagList} />
        <Route path="tags/(add)(:id)" component={TagEdit} />
        {/*</Route>*/}
    </Route>;

export default routes;