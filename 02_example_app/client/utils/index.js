import { curry, map } from '../operators';

export const _getJSON = (callback, url) => fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((result) => {
        callback(result)
    })
    .catch(console.error);

export const DomManipulation = {
    createElement: curry((tag, properties) => {
        const element = document.createElement(tag);
        [properties].map((p) => {
            Object.keys(p).forEach((k) => element[k] = p[k]);
        });
        return element;
    }),
    appendElement: curry((sel, element) => {
        document.querySelector(sel).appendChild(element)
    }),
    mapProperties: curry((attribute, values) => values.map((v) => ({
        [attribute]: v
    }))),
};

export const Impure = {
    getJSON: curry((callback, url) => _getJSON(callback, url)),
    setHtml: curry((sel, html) => {
        map(
            DomManipulation.appendElement(sel),
            html
        );
    })
};