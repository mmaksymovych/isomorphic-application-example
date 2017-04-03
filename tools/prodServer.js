import express from 'express';
import path from 'path';
import compression from 'compression';
import { PORT } from '../src/js/constants/common';

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

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`server up and running at port ${port}`);
    }
});
