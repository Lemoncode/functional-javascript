const { compose, map, Either, left, curry, either } = require('./utils');
const Postgres = require('./postgres-client');
const { readFile } = require('./reader');

// dbUrl :: Config -> Either Error Url
const dbUrl = ({ uname, pass, host, db }) => {
  if (uname && pass && host && db) {
    return Either.of(`db:pg://${uname}:${pass}@${host}5432/${db}`);
  }

  return left(Error('Invalid config!'));
}

// connectDb :: Config -> Either Error (IO DbConnection)
const connectDb = compose(map(Postgres.connect), dbUrl);

// getConfig :: Filename -> Task Error (Either Error (IO DbConnection))
const getConfig = compose(map(compose(connectDb, JSON.parse)), readFile);

const query = curry((queryString, fn, client) => client.query(queryString, fn));
const runQuery = query('SELECT * FROM users;', (err, res) => console.log(err, res));

getConfig('db.json').fork(
  (err) => console.log(err),
  either(console.log, runQuery),
);