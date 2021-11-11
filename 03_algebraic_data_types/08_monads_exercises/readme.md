# Ejercicios

## 1. Consideremos el objecto User:

```js
const user = {
    id: 1,
    name: 'Albert',
    address: {
        street: {
            number: 22,
            name: 'Walnut St',
        }
    }
};
```

Usar `safeProp` y `map/join` o `chain` para tomar `street name` de forma segura, dado un `user`

```js
// getStreetName :: User -> Maybe String
const getStreetName = undefined;
```

## 2. Consideremos los siguientes elementos:

```js
// getFile :: IO String
const getFile = IO.of('/home/mostly-adequate/ch09.md');

// pureLog :: String -> IO ()
const pureLog = str => new IO(() => console.log(str));
```

Usar `getFile` para tomar el `filepath`, quitar el directorio y mantener sólo el nombre del fichero, y hacer `log` de manera pura. 

> Pista: usaremos `split` y  `last` paar obtener el nombre del fichero del `filepath`.

## 3. For this exercise, we consider helpers with the following signatures:
## 3. Para este ejercicio, consiremos los `helpers` con las siguientes firmas:

```js
// validateEmail :: Email -> Either String Email
// addToMailingList :: Email -> IO([Email])
// emailBlast :: [Email] -> IO ()
```

Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function which adds a new email to the mailing list if valid, and then notify the hole list
Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function which adds a new email to the mailing list if valid, and then notify the hole list

```js
// joinMailingList :: Email -> Either String (IO ())
const joinMailingList = undefined;
```

