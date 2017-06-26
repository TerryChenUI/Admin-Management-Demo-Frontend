import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
// import Main from './containers/Layout/Main';
import Index from './containers/dashboard/';

// import ArticleList from './containers/article/list/ArticleList';
// import ArticleEdit from './containers/article/edit/ArticleEdit';
// import CategoryList from './containers/article/category/CategoryList';
// import CategoryEdit from './containers/article/category/CategoryEdit';
import TagList from './containers/article/tag/list';
import TagEdit from './containers/article/tag/edit';

const routes = 
    <Route path="/" component={App}>
        {/*<Route component={Main}>*/}
            <IndexRoute component={Index}/>
            {/*<Route path="article/list" component={ArticleList} />
            <Route path="article/(add)(edit)(/:id)" component={ArticleEdit} />
            <Route path="category/list" component={CategoryList} />
            <Route path="category/(add)(edit)(/:id)" component={CategoryEdit} />*/}
            <Route path="tags" component={TagList} />
            <Route path="tags/(add)(:id)" component={TagEdit} />
        {/*</Route>*/}
    </Route>;

export default routes;