import { ManegerDOM, setOnLocalStorage } from './helpers';
import { IO } from './utils/io';
import { curry, compose, map, join } from './utils/operators';

const setPreferences = () => {
    setOnLocalStorage(
        'preferences',
        {
            width: '100px',
            height: '200px',
            backgroundColor: 'blue',
        }
    );
};

const main = () => {
    // log :: a -> IO a
    const log = x => new IO(() => {
        console.log(x);
        return x;
    });

    // setStyle :: Selector -> CSSProps -> IO DOM
    const setStyle = curry((sel, props) => new IO(() => {
        ManegerDOM(sel).css(props);
    }));

    // getItem :: String -> IO String
    const getItem = key => new IO(() => localStorage.getItem(key));

    const applyPreferences = compose(
        join,
        map(setStyle('main')),
        join,
        map(log),
        map(JSON.parse),
        getItem,
    );

    applyPreferences('preferences').unsafePerformIO();
}

document.addEventListener('DOMContentLoaded', () => {
    setPreferences();
    

    setTimeout(() => {
        main();
    }, 1_000);
});