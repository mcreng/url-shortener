const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile')[process.env.MODE || "dev"]);
const shortener = require('./shortener');
const {verifyID} = require('./verify');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({url: process.env.SESSION_DB_URL})
    // cookie  : { maxAge  : new Date(Date.now() + (1000 * 60)) }
}))

app.route('/api/url')
    .get((req, res) => {
        knex('url').select('id as key', 'url', 'surl').where('user_id', req.session.user_id)
        .then( r => {
            if (r.length == 0) res.sendStatus(404)
            else res.status(302).send(r) 
            console.log(`Requested all url/surl data from ${req.session.user_id}.`)
        })
    })
    .post((req, res) => {
        shortener.promiseid().then((surl) => {
            knex('url').insert({
                user_id: req.session.user_id,
                url: req.body.url,
                surl,
            }).then(res.status(200).send({
                surl: surl
            }))
            .then(console.log(`${req.body.url} shortened to ${surl}.`));
        });
    });

app.route('/api/redirect')
    .post((req, res) => {
        knex('url').select('url').where('surl', req.body.surl)
        .then( r => {
            if (r.length == 0) res.sendStatus(404)
            else res.status(302).send({ url: r[0].url }) 
            console.log(`${req.body.surl} redirected to ${r[0].url}`)
        })
    });

app.route('/api/auth')
    .post((req, res) => {
        var token = req.body.token;
        verifyID(token)
        .catch(console.error)
        .then( (ticket => {
            const payload = ticket.getPayload();
            req.session.token = token;
            req.session.user_id = payload['sub'];
            req.session.name = payload['name'];
            req.session.image = payload['picture'];
            res.status(200).send({
                auth: req.session.auth = true
            })
            console.log(`${req.session.user_id} authenticated with ${req.sessionID}`)
        }))
    })
    .get((req, res) => {
        res.send({
            auth: req.session.auth || false,
            token: req.session.token
        })
        console.log(`${req.session.user_id} ${req.session.auth || false ? '' : 'not'} authenticated with ${req.sessionID}`)
    })

app.route('/api/auth/logout')
    .post((req, res) => {
        req.session.destroy();
        console.log(`${req.session.user_id} with session ID ${req.sessionID} logged out`)
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


app.listen(port, () => console.log(`Listening on port ${port} ${process.env.MODE}`));