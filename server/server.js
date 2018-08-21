const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile'));
const shortener = require('./shortener');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.route('/api/url')
    .post((req, res) => {
        shortener.promiseid().then( surl => {
            knex('url').insert({
                user_id: '1',
                url: req.body.url,
                surl
            }).then(res.status(200).send({ surl: surl }))
        })

    })

app.listen(port, () => console.log(`Listening on port ${port}`));