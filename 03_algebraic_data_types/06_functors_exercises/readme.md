# Ejercicios

## 1. Usar `add` y `map` para hacer una función que incremente un valor dentro de un `Functor`

```js
// incrF :: Functor f => f Int -> f Int
const incrF = undefined;
```

## 2. Dado el siguiente objeto `user`:

```js
const user = { id: 2, name: 'Albert', active: true };
```

Usar `safeProp` y `head`, para encontrar la primera inicial del usuario.

```js
// intial :: User -> Maybe String
const initial = undefined;
```

## 3. Given the following helper functions
## 3. Dadas las siguientes  helper functions:


```js
// showWelcome :: User -> String
const showWelcome = compose(append('Welcome '), prop('name'));

// checkActive :: User -> Either String User
const checkActive = function checkActive(user) {
  return user.active
    ? Either.of(user)
    : left('Your account is not active');
};
```

Write a function that uses `checkActive` and `showWelcome` to grant access or return an error.
Escribir una función que use `checkActive` y `showWelcome` para otorgar acceso o devolver un error.

```js
// eitherWelcome :: User -> Either String String
const eitherWelcome = undefined;
```

## 4. We now consider the following functions:
## 4. Consideremos las siguientes funciones:

```js
// validateUser :: (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map(_ => user));

// save :: User -> IO User
const save = user => new IO(() => ({ ...user, saved: true }));
```

Write a function `validateName` which checks whether a user has a name longer than 3 characters or return an error message. Then use `either`, `showWelcome` and `save` to write a `register` function to signup and welcome a user when the validation is ok. Remember either's two arguments must return the same type.

```js
// validateName :: User -> Either String ()
const validateName = undefined;

// register :: User -> IO String
const register = compose(undefined, validateUser(validateName));
```
