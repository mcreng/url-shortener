module.exports = {
  // client: 'mysql',
  // connection: {
  //     user: 'root',
  //     password: '',
  //     database: 'url_shortener'
  // }
  dev: {
    client: "pg",
    connection: process.env.DATABASE_URL
  },
  build: {
    client: "pg",
    connection: process.env.DATABASE_URL + "?ssl=true"
  }
};
