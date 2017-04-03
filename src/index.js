'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import configureStore from './js/store';
import { Provider } from 'react-redux';
import Template from 'containers/template';
import Container from 'containers/container';

const store = configureStore();

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
