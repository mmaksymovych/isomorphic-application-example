import React from 'react';
import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import compression from 'compression';
import fs from 'fs';
import cheerio from 'cheerio';
import ServerContainer from 'containers/server';
import configureStore from 'store';
import { Provider } from 'react-redux';
import { PORT } from 'constants/common';
import * as actions from 'actions/action';

/* eslint-disable no-console */

const prod = process.env.NODE_ENV === 'production';
const port = prod ? PORT.PROD : PORT.LOCAL;
const app = express();

app.use(compression());
app.use('/services', express.static('dist'));

app.get('/services/data', function(req, res) {
    res.json([
        "element1",
        "element2",
        "element3",
        "element4",
        "element5",
    ]);
});

app.get("/services/test", (req, res) => {
    return handleRender(req, res);
});

function handleRender(req, res) {
        console.log('server side');

        const cookie = req.headers.cookie;
        console.log(`COOKIE - ${cookie}`);

        const store = configureStore({});

        const userPromise = store.dispatch(actions.getUser('1dbadf6e-b477-4d5f-8c46-addf6cfbd6e5', cookie));
        const dataPromise = store.dispatch(actions.getData());

        Promise.all([userPromise, dataPromise])
            .then(() => {
                // Render the component to a string
                const html = renderToStaticMarkup(
                    <Provider store={store}>
                        <ServerContainer/>
                    </Provider>
                );

                const preloadedState = store.getState();

                return res.send(renderFullPage(html, preloadedState));
            })
            .catch(({response}) => {
                console.log('ERROR');
                return res.status(response.status).send(response.data.errorMsg);
            });
        }

function renderFullPage(html, preloadedState) {

    const content = fs.readFileSync('src/index.html', 'utf8');

    const $ = cheerio.load(content);
    const script = `
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>`;

    $('#app').prepend(html).prepend(script);
    return $.html();
}

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`server up and running at port ${port}`);
    }
});
