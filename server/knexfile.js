module.exports = {
    // client: 'mysql',
    // connection: {
    //     user: 'root',
    //     password: '',
    //     database: 'url_shortener'
    // }
    dev: {
        client: 'pg',
        connection: 'postgres://url_grp:'+process.env.SQL_PW+'@localhost/url_shortener'
    },
    build: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
}