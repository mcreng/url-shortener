const knex = require('knex')(require('./knexfile'));

function makeid() {
    var text;
    do {
        text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 7; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    } while (exists(text));
    return text;
}

function exists(text) {
    knex('url').count('* as c').where('surl', text).then( data => { return data[0].c > 0} );
}

module.exports = { makeid };