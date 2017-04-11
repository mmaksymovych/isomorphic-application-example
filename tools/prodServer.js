import express from 'express';
import cookieParser from 'cookie-parser';
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
app.use(cookieParser());

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
        console.log('server');
        const data = {
            emailaddress: "new.user1@mailinator.com",
            password: "1234qwer"
        };

        const store = configureStore({});
        store.dispatch(actions.login(data)).then(() => {

            console.log(data);
            // Render the component to a string
            const html = renderToStaticMarkup(
                <Provider store={store}>
                    <ServerContainer/>
                </Provider>
            );

            console.log("html");
            const preloadedState = store.getState();

            return res.send(renderFullPage(html, preloadedState))
        }).catch((response) => console.log(`error - ${response}`));

    }
    if(req.url === '/server2') {
        console.log('server2');

        const store = configureStore({});
        store.dispatch(actions.getUser()).then(({data}) => {

            console.log(data);
            // Render the component to a string
            const html = renderToStaticMarkup(
                <Provider store={store}>
                    <ServerContainer/>
                </Provider>
            );

            console.log("html");
            const preloadedState = store.getState();

            return res.send(renderFullPage(html, preloadedState))
        }).catch((response) => console.log(`error - ${response}`));
    }
    else {
        console.log('client');
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
