const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

app.route('/api/hello')
    .get((req, res) => {
        console.log(req);
        res.send({ express: 'Hello From Express' });
      })
    .post((req, res) => {
        console.log('Success');
        console.log(req.body.name);
        res.sendStatus(200);
    })

app.listen(port, () => console.log(`Listening on port ${port}`));