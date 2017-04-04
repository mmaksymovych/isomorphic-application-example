import express from 'express';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server'
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
        return res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
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
