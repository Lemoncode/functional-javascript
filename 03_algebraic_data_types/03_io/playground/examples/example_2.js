import { IO } from '../io';
import { Maybe } from '../maybe';
import { compose, map, split, eq, find, last, head } from '../utils';

export function example2() {
    // url :: IO String
    const url = new IO(() => 'https://localhost:3000/?searchTerm=wafflehouse&content=red');

    // toPairs :: String -> [[String]]
    const toPairs = compose(map(split('=')), split('&'));

    // params :: String -> [[String]]
    const params = compose(toPairs, last, split('?'));

    // findParam :: String -> IO Maybe [String]
    const findParam = key => map(
        compose(
            Maybe.of, 
            find(compose(eq(key), head)), 
            params
        ), 
        url
    );

    console.log(findParam('searchTerm').$value());
}
