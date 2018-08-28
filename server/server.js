const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile')[process.env.MODE]);
const shortener = require('./shortener');
const {verifyID} = require('./verify');
const session = require('express-session');
const uuid = require('uuid/v4');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session({
    genid: (req) => {
      console.log(`Request object sessionID from client: ${req.sessionID}`)
      return uuid() // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie  : { maxAge  : new Date(Date.now() + (1000 * 60)) }
}))

app.route('/api/url')
    .post((req, res) => {
        shortener.promiseid().then((surl) => {
            knex('url').insert({
                user_id: '1',
                url: req.body.url,
                surl,
            }).then(res.status(200).send({
                surl: surl
            }));
        });
    });

app.route('/api/auth')
    .post((req, res) => {
        var token = req.body.token;
        verifyID(token).catch(console.error).then(
            req.session.name = req.body.name).then(
            req.session.image = req.body.image).then(
            res.status(200).send({
                auth: req.session.auth = true,
            })
        )
    })
    .get((req, res) => {
        res.send({
            auth: req.session.auth || false,
            name: req.session.name,
            image: req.session.image
        })
    })

app.route('/api/auth/logout')
    .post((req, res) => {
        req.session.destroy();
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port}`));