const { curry, compose } = require('../../utils/operators');

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

// --------------Ejemplos Curry-------------------------------
match(/j/g, 'hola jamon'); // ['j']
const hasLetterJ = match(/j/g); // x => x.match(/j/g);
hasLetterJ('hola jamon'); // ['j']

filter(hasLetterJ, ['me gusta el jamon', 'prefiero un limon']); // [''me gusta el jamon']
const removeNoJs = filter(hasLetterJ); // xs => xs.filter(x => x.match(/j/g);)
removeNoJs(['me gusta el jamon', 'prefiero un limon', 'judías con tomate']); // 'me gusta el jamon', 'judías con tomate'

const noVowels = replace(/[aeiou]/ig);
const censored = noVowels('*');
censored('el gato hace miau'); // *l g*t* h*c* m***


const toUpperCase = (s) => s.toUpperCase();
const allWordsToUpper = map(toUpperCase);
// --------------Ejemplos Curry-------------------------------


// --------------Ejemplos Composing---------------------------
const compose2 = (f, g) => x => (f(g(x)));
const exclaim = x => `${x}!`;
const shout = compose2(exclaim, toUpperCase);
console.log(shout('go functional'));

const head = x => x[0];
const reverse = (xs) => xs.reduce((acc, x) => [x].concat(acc), []);
const last = compose(head, reverse);
console.log(last(['melon', 'banana', 'manzana']));

const t = compose(toUpperCase, compose(head, reverse))(['melon', 'banana', 'manzana']);
const s = compose(compose(toUpperCase, head), reverse)(['melon', 'banana', 'manzana']);
console.log(t);
console.log(s);
// --------------Ejemplos Composing---------------------------