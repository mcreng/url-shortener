const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile'));
const shortener = require('./shortener');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.route('/api/url')
    .get((req, res) => {
        console.log('Connected');
        res.status(200).send({ connected: true});
    })
    .post((req, res) => {
        // shortener.promiseid().then( surl => {
        //     knex('url').insert({
        //         user_id: '1',
        //         url: req.body.url,
        //         surl
        //     }).then(res.status(200).send({ surl: surl }))
        // })
        res.status(200).send({ surl: 'connected' });
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
    });
      

app.listen(port, () => console.log(`Listening on port ${port}`));