process.env.NODE_ENV = 'production';
import React from 'react';
import express from 'express';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server'
import compression from 'compression';
import ServerContainer from 'containers/server';
import configureStore from 'store';
import { Provider } from 'react-redux';
import { PORT } from 'constants/common';
import * as actions from 'actions/action';

/* eslint-disable no-console */

//const port = PORT.PROD;
const port = PORT.LOCAL;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/data', function(req, res) {
    res.json([
        "element1",
        "element2",
        "element3",
        "element4",
        "element5",
    ])
});

app.get('/newData', function(req, res) {
    res.json([
        "NEW-element1",
        "NEW-element2",
        "NEW-element3",
        "NEW-element4",
        "NEW-element5",
    ])
});

app.use(handleRender);

function handleRender(req, res) {
    if(req.url === '/server') {
        console.log('server render');

        const store = configureStore({});

        store.dispatch(actions.getData()).then(() => {

            // Render the component to a string
            const html = renderToStaticMarkup(
                <Provider store={store}>
                    <ServerContainer/>
                </Provider>
            );

            const preloadedState = store.getState();

            return res.send(renderFullPage(html, preloadedState))
        });

    } else {
        console.log("client render");
        return res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
}

// it can be refactored later
function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <meta name="google-site-verification" content="lTKYDExjnUHmTAtbMLdagUpZxPDM_ounAVytHL_EBz8">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="bundle.js"></script>
        <link rel="stylesheet" type="text/css" href="main.styles.min.css">
      </body>
    </html>
    `
}

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`server up and running at port ${port}`);
    }
});
