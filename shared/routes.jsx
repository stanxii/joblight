import React               from 'react';
import { Route } from 'react-router';

import App from './containers/App.jsx';

import MainLayout from './containers/layouts/MainLayout.jsx';

import JobSearchContainer       from './containers/pages/JobSearchPage.jsx';
import SearchResultContainer from './containers/pages/SearchResultPage.jsx';

export default (
    <Route component={App}>
        <Route component={MainLayout} path='/'>
            <Route path='/jobsearch' component={JobSearchContainer}/>
            <Route path='/result' component={SearchResultContainer} />
        </Route>
    </Route>
);
