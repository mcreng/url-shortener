const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile'));

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.route('/api/hello')
    .get((req, res) => {
        console.log(req);
        res.send({ express: 'Hello From Express' });
      })
    .post((req, res) => {
        console.log(req.body.url);
        knex('url').insert({
            user_id: '1',
            url: req.body.url,
            surl: req.body.url
        }).then(res.sendStatus(200))
    })

app.listen(port, () => console.log(`Listening on port ${port}`));