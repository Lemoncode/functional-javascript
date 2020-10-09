## Conceptos


### Código que muta

El estado y los valores mutables son difíciles de seguir. El problema reside en que nos lleva en ocasiones a código impredecible, este código impredecible al ser difícil de razonar, es difícil de desarrollar.

```js
const state = {
    users: [
        { id: 1, name: 'jaime' }
    ],
};

const addUser = (user) => state.users.push(user);
const removeUserById = (id) => {
    const index = state.users.indexOf((u) => u.id === id);
    state.users.splice(index, 1);
}; 
const findUserById = (id) => state.users.find((u) => u.id === id); 
const getUsers = () => state.users;

(function main() {
    let index = 0;
    const users = getUsers();
    while (users.length < 5) {
        addUser({ id: index, name: `name_${index}`});
        index += 1;
    }
    console.log(users.length); 
    removeUserById(1);
    console.log(users.length);

    if (!findUserById(1)) {
        console.log(`I work I remove a user`);
    } else {
        console.log('Are you around?');
    }
})();
```

### Una breve nota acerca de JavaScript

JavaScript no es un lenguaje puramente funcional, pero, las funciones pueden ser tratadas como cualquier otro tipo de dato, no hay nada especial en ellas. Las podemos almacenar en arrays, pasarlas como argumentos de otras funciones, asignarlas a variables...

