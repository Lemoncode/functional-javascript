const { curry } = require('../../utils/operators');

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));


match(/j/g, 'hola jamon'); // ['j']
const hasLetterJ = match(/j/g); // x => x.match(/j/g);
hasLetterJ('hola jamon'); // ['j']

filter(hasLetterJ, ['me gusta el jamon', 'prefiero un limon']); // ['']
