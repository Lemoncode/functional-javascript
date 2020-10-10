# Exercises

## 1. Use `add` and `map` to a make a function that increments a value iside a functor

```js
// incrF :: Functor f => f Int -> f Int
const incrF = undefined;
```

## 2. Given the following user object

```js
const user = { id; 2, name; 'Albert', active: true };
```

Use `safeProp` and `head` to find the first initial of the user.

```js
// intial :: User -> Maybe String
const initial = undefined;
```

## 3. Given the following helper functions

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

```js
// eitherWelcome :: User -> Either String String
const eitherWelcome = undefined;
```

## 4.  We now consider the following functions:

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