const { map, join, chain, compose, safeProp, split, last, trace } = require('./utils');
const IO = require('./io');
const { Either, Left } = require('./either');

const left = (x) => new Left(x);

// const user = {
//     id: 1,
//     name: 'Albert',
//     address: {
//         street: {
//             number: 22,
//             name: 'Walnut St',
//         }
//     }
// };

// // safeProp :: Key -> {Key: a} -> Maybe a

// // map/join
// // const getStreetName = compose(
// //     map(map(safeProp('name'))), // Maybe (Maybe (Maybe a))
// //     map(safeProp('street')), // Maybe (Maybe a)
// //     safeProp('address') // Maybe a
// // );

// const getStreetName = compose(
//     join, // Maybe a
//     map(safeProp('name')), // (Maybe (Maybe a))
//     join, // Maybe a
//     map(safeProp('street')), // Maybe (Maybe a)
//     safeProp('address') // Maybe a
// );

// const t = getStreetName(user);
// console.log(t.inspect());


// // chain
// const getStreetNameChain = compose(
//     chain(safeProp('name')), // (Maybe (Maybe a))
//     chain(safeProp('street')), // Maybe (Maybe a)
//     safeProp('address') // Maybe a
// );

// const s = getStreetNameChain(user);
// console.log(s.inspect());

// // getFile :: IO String
// const getFile = IO.of('/home/mostly-adequate/ch09.md');

// // pureLog :: String -> IO ()
// const pureLog = str => new IO(() => console.log(str));

// const getFileName = (getFile) => compose(
//     join, // IO (void)
//     map(pureLog), // IO (IO (void))
//     trace('last'),
//     map(last), // IO (String)
//     trace('split'),
//     map(split('/')), // IO (String[])
//     trace('input')
//     // () => getFile// IO ( String )
// )(getFile);

// getFileName(getFile).unsafePerformIO();
// // const q = getFileName(getFile);
// // console.log('unsafeperformio2', q.unsafePerformIO().unsafePerformIO());

// /** SOLUTION **/ 
// const basename = compose(last, split('/'));

// const logFilename = compose(chain(pureLog), map(basename))(getFile);

// logFilename.unsafePerformIO();


const emailInput = { email: 'foo@mail.com' };

// validateEmail :: Email -> Either String Email
const validateEmail = (input) => {
    return (input && input.email) ? Either.of(input) : left('Not valid email');
};

// addToMailingList :: Email -> IO([Email])
const addToMailingList = (email) => new IO(() => [email]); 

// emailBlast :: [Email] -> IO ()
const emailBlast = (emails) => new IO(() => console.log(`emails send ${emails}`));

// joinMailingList :: Email -> Either String (IO ())
// const joinMailingList = compose(
//     map(emailBlast),
//     trace('add to mail list'),
//     map(addToMailingList),
//     trace('validate email'),
//     validateEmail,
// );

// const t = joinMailingList(emailInput);
// console.log(t.join().unsafePerformIO());

const joinMailingList = compose(
    map(compose(chain(emailBlast), addToMailingList)),
    validateEmail,
  );

const x = joinMailingList(emailInput);

console.log(x.join().unsafePerformIO());

