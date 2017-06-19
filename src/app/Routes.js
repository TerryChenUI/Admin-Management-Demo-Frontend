import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
// import Main from './containers/Layout/Main';
import Index from './containers/Index/';

// import ArticleList from './containers/article/list/ArticleList';
// import ArticleEdit from './containers/article/edit/ArticleEdit';
// import CategoryList from './containers/article/category/CategoryList';
// import CategoryEdit from './containers/article/category/CategoryEdit';
import TagList from './containers/Article/Tag/List';
import TagEdit from './containers/Article/Tag/Edit';

const routes = 
    <Route path="/" component={App}>
        {/*<Route component={Main}>*/}
            <IndexRoute component={Index}/>
            {/*<Route path="article/list" component={ArticleList} />
            <Route path="article/(add)(edit)(/:id)" component={ArticleEdit} />
            <Route path="category/list" component={CategoryList} />
            <Route path="category/(add)(edit)(/:id)" component={CategoryEdit} />*/}
            <Route path="tag/list" component={TagList} />
            <Route path="tag/(add)(edit)(/:id)" component={TagEdit} />
        {/*</Route>*/}
    </Route>;

export default routes;