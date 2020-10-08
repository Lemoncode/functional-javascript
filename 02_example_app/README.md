## Aplicación de Ejemplo

Vamos a crear una aplicación def `frontend` que muestre imágenes de `flickr`, para ello vamos a crear una aplicación de servidor que hara de `proxy` contra la API de flickr.

#### 1. Creamos un helper para las peticiones https

Crear _./server/http.helpers.js_

```js
const https = require('https');

exports.get = (url) => (callback) => {
    https.get(url, (response) => {
        let body = '';

        response.on('data', (chunk) => {
            body += chunk;
        });

        response.on('end', () => {
            callback(body);   
        });
    });
};
```

#### 2. Para manipular valores de configuración de la aplicación, vamos a utilizar un fichero de variables de entorno

Creamos el fichero _.env_ con los siguientes valores:

```ini
PHOTOS_RESOURCE_HOST=www.flickr.com
PHOTOS_RESOURCE_PATH=/services/feeds/photos_public.gne 
PORT=3000

```

Para manipular las variables de entorno, vamos a usar _dotenv_, `npm i dotenv -S`.


#### 3. Creamos una serie de funciones que nos ayuden con la manipulación de las cabeceras y de las queries a servidor.

Crear _./server/utils/index.js_

```js
module.exports.corsHreaders = () => ({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Content-Type': 'application/json',
});

const query = (t) => `?tags=${t}&format=json&jsoncallback=?`;
module.exports.urlBuilder = (t) => `https://${process.env.PHOTOS_RESOURCE_HOST}${process.env.PHOTOS_RESOURCE_PATH}${query(t)};`

module.exports.removeParanthesis = (entry) => {
    const t = entry.replace(/\(/g, '');
    return t.replace(/\)/g, '');
};
```

#### 4. Creamos un index.js que haga de proxy con la API de Flickr

Crear _./server/index.js_

```js
const http = require('http');
const url = require('url');

require('dotenv').config();
const { corsHreaders, urlBuilder, removeParanthesis } = require('./utils');
const { get } = require('./http.helpers');
const { inspect } = require('util');

const app = http.createServer((request, response) => {
    console.log('new request')
    const headers = corsHreaders();
    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    }

    const parts = url.parse(request.url, true);
    const { query } = parts;
    console.log(inspect(query));

    response.writeHead(200, headers);

    get(urlBuilder(query.topic))((res) => {
        const s = removeParanthesis(res);
        response.write(s);
        response.end();
    });
});

app.listen(+process.env.PORT);
```

#### 5. Una vez que tenemos preparado el servidor podemos comenzar con el cliente.

Instalamos _parcel_ para poder arrancar el `frontend`, `npm i parcel -D`.

Generamos el fichero _./client/index.html_

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main id="js-main"></main>
    <script src="./app.js"></script>
</body>
</html>
```

#### 6. Para nuestra aproximación funcional, vamos a utilizar una serie de helpers.

Creamos _./client/operators.js_

```js
export const curry = function curry(fn) {
    const arity = fn.length;

    return function $curry(...args) {
        if (args.length < arity) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    };
}

// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduceRight
export const compose = (...fns) => (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

export const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
});

export const map = curry((fn, f) =>f.map(fn));

export const prop = curry((p, obj) => obj[p]);
```

#### 7. Nuestro código no va a ser puramente funcional, nos vamos a tomar la licencia de crear una serie de funciones que van a tener side effects, ya veremos más adelante que técnicas usar para evitar los side effects

```js
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
```

#### 8. Ya estamos listos para crear una aplicación que sea capaz de mostrar una serie de imágenes descargadas por tópico de Flickr

Creamos el fichero _./client/app.js_


```js
import { DomManipulation, Impure } from './utils';
import { compose, prop, map } from './operators';

// -- Pure --------------------------------------
const host = 'localhost:3000';
const query = (t) => `?topic=${t}`;
const url = (t) => `http://${host}${query(t)}`;

// -- Impure ------------------------------------
const extractSrcValues = DomManipulation.mapProperties('src');
const image = DomManipulation.createElement('img');

// -- Pure --------------------------------------
const mediaUrl = compose(prop('m'), prop('media'));
const mediaUrls = compose(map(mediaUrl), prop('items'));

document.addEventListener('DOMContentLoaded', () => {
// -- Impure ------------------------------------
    const images = compose(map(image), extractSrcValues, mediaUrls);
    const render = compose(Impure.setHtml('#js-main'), images);
    const app = compose(
        Impure.getJSON(render),
        url,
    );
    app('cats');
});
```