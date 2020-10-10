const { Client } = require('pg');
const { match, head, replace, compose } = require('./utils');
// https://regex101.com/
// const client = `db:pg://${uname}:${pass}@${host}5432/${db}`
// const client = `db:pg://postgres:postgres@localhost5432/test`;

const clientFromUrl = (url) => {
  const rmUsernameNonAlphnum = compose(replace(/:/, ''), replace(/\/\//, ''));
  const user = compose(rmUsernameNonAlphnum, head, match(/\/\/(.*):/g));

  const rmPassNonAlphnum = compose(replace(/:/, ''), replace(/@/, ''));
  const password = compose(rmPassNonAlphnum, head, match(/:(\w+)@/g));

  const rmHostNonAlphnum = replace(/@/, '');
  const host = compose(rmHostNonAlphnum, head, match(/@([a-z]+|[^0-9])/g))

  const rmPortAlphnum = replace(/\//, '');
  const port = compose(rmPortAlphnum, head, match(/([0-9]+)\//g));

  const rmDbAlphnum = replace(/\//, '');
  const database = compose(rmDbAlphnum, head, match(/\/([a-z]+)$/g));

  return new Client({
    user: user(url),
    host: host(url),
    database: database(url),
    password: password(url),
    port:+port(url)
  });
};

const Postgres = function () { }

// TODO: Refactor to IO
Postgres.prototype.connect = function (url) {
  const client = clientFromUrl(url);
  client.connect();
  return client;
}

module.exports = new Postgres();
