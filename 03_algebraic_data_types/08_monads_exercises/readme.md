# Exercises

## 1. Considering a User object as follow:

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

Use `safeProp` and `map/join` or `chain` to safely get the stree name when given a user

```js
// getStreetName :: User -> Maybe String
const getStreetName = undefined;
```

## 2. We now consider the following items:

```js
// getFile :: IO String
const getFile = IO.of('/home/mostly-adequate/ch09.md');

// pureLog :: String -> IO ()
const pureLog = str => new IO(() => console.log(str));
```

Use `getFile` to get the filepath, remove the directory and keep only the basename, then purely log it. Hint: you may want to use `split` and `last` to obtain the basename from a filepath.

## 3. For this exercise, we consider helpers with the following signatures:

```js
// validateEmail :: Email -> Either String Email
// addToMailingList :: Email -> IO([Email])
// emailBlast :: [Email] -> IO ()
```

Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function which adds a new email to the mailing list if valid, and then notify the hole list

```js
// joinMailingList :: Email -> Either Strng (IO ())
const joinMailingList = undefined;
```

