# Construir el ejemplo paso a paso

## 1. Creamos la infra básica

```bash
npm init -y
```

```bash
npm i parcel
```

## 2. Creamos index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## 3. Copiar el directorio `utils` en le raíz

## 4. Creamos `helpers.js`

```js
export const ManagerDOM = (selector) => {
    const element = document.getElementById(selector);
    
    return {
        css(props) {
            Object.keys(props).forEach((k) => {
                console.log(props);
                element.style[k] = props[k];
            });

            return this;
        }
    };
};

export const setOnLocalStorage = (key, obj) => {
    const objString = JSON.stringify(obj);
    localStorage.setItem(key, objString);
};

```

## 5. Creamos `app.js`

```js
import { ManagerDOM, setOnLocalStorage } from './helpers';
import { IO } from './utils/io';
import { curry, compose, map, join } from './utils/operators';
 
const setPreferences = () => {
    setOnLocalStorage(
        'preferences',
        {
            width: '100px',
            height: '200px',
            backgroundColor: 'blue'
        }
    );
};

```

Partimos de que el usuario ya tiene almecenado preferencias en el sistema. Ahora, utilizamos el `monad IO`, para cargar estas preferencias.

La función `main`, la invocaremos, cuando arranque la aplicación, y será la encargada de caragar las preferencias del usuario:

```js
import { ManagerDOM, setOnLocalStorage } from './helpers';
import { IO } from './utils/io';
import { curry, compose, map, join } from './utils/operators';
 
const setPreferences = () => {
    setOnLocalStorage(
        'preferences',
        {
            width: '100px',
            height: '200px',
            backgroundColor: 'blue'
        }
    );
};

/*diff*/
const main = () => {
    const log = x => new IO(() => {
        console.log(x);
        return x;
    });

    const setStyle = curry((sel, props) => new IO(() => {
        ManagerDOM(sel).css(props);
    }));

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
};
/*diff*/
```

Para invocar `main` aprovecahmos el evento `DOMContentLoaded`, actualizamos `app.js`

```js
// .....
document.addEventListener('DOMContentLoaded', () => {
    setPreferences();

    setTimeout(() => {
        main();
    }, 3_000);
});
```

## 6. Actualizamos `index.html`

```diff
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
+   <div id="main"></div>
+   <script type="module" src="app.js"></script>
</body>
</html>

```

## 7. Actualizamos `package.json` y ejecutamos nuestra aplicación

```diff
"scripts": {
+ "start": "parcel index.html",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
