'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import Template from '../src/js/containers/template';
import Hello from '../src/js/components/common/hello';
import FirstPage from '../src/js/components/common/firstPage';

render(
    <Router history={browserHistory}>
        <Route path="/" component={Template}>
            <IndexRoute component={Hello}/>
            <Route path="/hi" component={FirstPage}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
