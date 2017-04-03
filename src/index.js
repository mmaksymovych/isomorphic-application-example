'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import configureStore from './js/store';
import { Provider } from 'react-redux';
import Template from 'containers/template';
import Container from 'containers/container';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={Container}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
