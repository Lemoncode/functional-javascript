const { map, concat, add, prop, compose, head, curry } = require('../../../utils/operators');
const IO = require('../../../utils/algebraic_support/io');
const Maybe = require('../../../utils/algebraic_support/maybe');
const Task = require('../../../utils/algebraic_support/task');
const { Either } = require('../../../utils/algebraic_support/either');
const { getJSON } = require('./helpers');

// const t = IO.of('tetris').map(concat(' master'));
// console.log(t);

// const s = Maybe.of(1236).map(add(1));
// console.log(s);

// Task.of([{ id: 2 }, { id: 3 }]).map(map(prop('id'))).fork(console.log, console.log);

// const r = Either.of('The past, present and future walk into a bar...').map(concat('it was tense.'));
// console.log(r);

// const fs = require('fs');

// // readFile :: String -> IO String
// const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'));

// // print :: String -> IO String
// const print = x => new IO(() => {
//     console.log(x);
//     return x;
// });

// // cat :: String -> IO (IO String)
// const cat = compose(map(print), readFile);
// // IO(IO(file content))

// const catFirstChar = compose(map(map(head)), cat);

// const t = catFirstChar('some_text').unsafePerformIO().unsafePerformIO();
// console.log('t', t);
// // cat('some_text').unsafePerformIO().unsafePerformIO();

// safeProp :: Key -> { Key: a } -> Maybe a
// const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// // safeHead :: [a] -> Maybe a
// const safeHead = safeProp(0);

// // firstAddressStreet :: User -> Maybe (Maybe (Maybe Street))
// const firstAddressStreet = compose(
//     map(map(safeProp('street'))),
//     map(safeHead),
//     safeProp('addresses'),
// );

// const t = firstAddressStreet({
//     addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
// });
// // Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))

// console.log(t);
// const mmo = Maybe.of(Maybe.of('nunchucks'));
// // Maybe(Maybe('nunchucks'))

// const m = mmo.join();
// // Maybe('nunchucks')

// const ioio = IO.of(IO.of('pizza'));
// // IO(IO('pizza'))

// const i = ioio.join();
// // IO('pizza')

// const ttt = Task.of(Task.of(Task.of('sewers')));
// // Task(Task(Task('sewers')));

// const t = ttt.join();
// // Task(Task('sewers'))

// console.log(m, i, t);

// safeProp :: Key -> { Key: a } -> Maybe a
const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

// join :: Monad m => m (m a) -> m a
const join = mma => mma.join();

// firstAddressStreet :: User -> Maybe Street
const firstAddressStreet = compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead),
  safeProp('addresses'),
);

const t = firstAddressStreet({
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
});
// Maybe({name: 'Mulburry', number: 8402})

// console.log(t);

// getJSON :: Url -> Params -> Task JSON
getJSON('/authenticate', { username: 'stale', password: 'crackers' })
  .chain((user) => getJSON('/friends', { user_id: user.id }))
  .fork(console.log, console.log);
// Task([ { id: 39, name: 'Ric' } ])

Maybe.of(3)
  .chain(three => Maybe.of(2).map(add(three)));
// Maybe(5);

Maybe.of(null)
  .chain(safeProp('address'))
  .chain(safeProp('street'));
  // Maybe(null);