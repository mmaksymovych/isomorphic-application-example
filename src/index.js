'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import configureStore from './js/store';
import { Provider } from 'react-redux';
import Template from 'containers/template';
import FirstPage from 'components/common/firstPage';
import SecondPage from 'components/common/secondPage';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Template}>
                <IndexRoute component={FirstPage}/>
                <Route path="/second" component={SecondPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
