# url-shortener
This is a web application that provides url shortening services. I intend to learn more about front-end and back-end development through this project.

This project uses:
- ReactJS and AntDesign as front-end
- NodeJS, PostgreSQL, express, knex as back-end
- Heroku as host

To run `url-shortener` locally,
- `git clone https://github.com/mcreng/url-shortener.git`
- Head to root and run `npm i` to install required dependencies.
- Set up PostgreSQL.
- `knex migrate:latest`
- Start by `SQL_PW=* npm run dev`.

To run `url-shortener` on your Heroku host,
- `git clone https://github.com/mcreng/url-shortener.git`
- `heroku create`
- Set up Heroku PostgreSQL
- Put database URL to `.env`
- `knex migrate:latest --env build`
- `git push heroku master`
<!-- - Install npm using [nvm](https://github.com/creationix/nvm).
- Fix an issue (that happens to me) by referencing [here](https://github.com/npm/npm/issues/8360). -->