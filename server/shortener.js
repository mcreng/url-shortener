const knex = require('knex')(require('./knexfile')[process.env.MODE]);

function promiseid() {
    return new Promise( (resolve, reject) => {
        var text;
        do {
            text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 7; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        } while (exists(text));
        resolve(text);
    })
}

function exists(text) {
    knex('url').count('* as c').where('surl', text).then( data => { return data[0].c > 0} );
}

module.exports = { promiseid };