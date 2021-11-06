import { IO } from '../io';
import { prop, split, head } from '../utils';

export function example1() {
    // ioWindow :: IO Window
    const ioWindow = new IO(() => window);

    const t = ioWindow.map(win => win.innerWidth);

    console.log(t.eval());

    const s = ioWindow
        .map(prop('location'))
        .map(prop('href'))
        .map(split('/'));

    console.log(s.eval());

    const $ = (selector) => new IO(() => document.querySelectorAll(selector));

    const u = $('#myDiv').map(head).map(div => div.innerHTML);

    console.log(u.eval());
}