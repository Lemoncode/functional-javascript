const { 
    curry, 
    compose, 
    trace, 
    map, 
    match, 
    replace, 
    filter, 
    split,
    toUpperCase,
    toLowerCase,
    intercalate
} = require('../../utils/operators');

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


// const toUpperCase = (s) => s.toUpperCase();
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

// Debugging
const append = curry((what, s) => `${s}${what}`);
const angry = compose(append('!'), toUpperCase);
// const latin = compose(map, angry, reverse);
// latin(['frog', 'eyes']);
const latin = compose(map(angry), reverse);
console.log(latin(['frog', 'eyes']));

// const instercalate = curry((what, xs) => xs.join(what));
// const dasherize = compose(
//     intercalate('-'),
//     toLowerCase,
//     split(' '),
//     replace(/\s{2,}/ig, ' '),
// );

// dasherize('The    world is a    vampire');
const dasherize = compose(
    intercalate('-'),
    map(toLowerCase),
    trace('after split'),
    split(' '),
    replace(/\s{2,}/ig, ' '),
);

dasherize('The    world is a    vampire');
// Debugging



// --------------Ejemplos Composing---------------------------