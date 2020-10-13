## Ejercio 1

Suponed que tenemos un objeto que representa las notas finales de un estudiante de secundaria y queremos orientarle para elegir una modalidad de bachillerato en función de qué se le da mejor:

```js
var student = {
  literature: 0,
  maths: 0,
  biology: 0,
  chemistry: 0,
  history: 0,
  classicalCulture: 0,
  plasticEducation: 0,
  music: 0
};
```

* Crear una función que nos diga si un alumno es 'bueno', que tenga una nota media superior a una cantidad dada (por ejemplo 6).

* Crear una función para definir si el alumno es bueno por bloques (pista utilzar `allPass`), los bloques serían:
    - Science: maths, biology, chemistry
    - Humanity: literature, history, classicalCulture
    - Art: music, plasticEducation
    - Is Good at All: Si el alumno es bueno en todas las anteriores

* Crear un función que en función de las notas nos diga a que especialidad pertenece (pista utilizar `cond`), la función devolverá el nombre del bloque al que pertenece, en notación H-M `getSpecialization :: Student -> String`

```js
console.log(
  getSpecialization({
    literature: 0,
    maths: 7,
    biology: 9,
    chemistry: 7,
    history: 0,
    classicalCulture: 0,
    plasticEducation: 0,
    music: 0
  })
);
// science
```

> NOTA: Para conseguir free point style, utilizar `flow`

Solution:

```js
const fp = require('lodash/fp');

const student = {
    literature: 0,
    maths: 7,
    biology: 9,
    chemistry: 7,
    history: 0,
    classicalCulture: 0,
    plasticEducation: 0,
    music: 0
};

// 1. Crear funcion "Es bueno en"
const isGreaterThanSix = fp.gt(fp.__, 6);
const isGoodAt = subject => fp.flow(fp.get(subject), isGreaterThanSix);

// 2. Crear funciones de candidatos
const isScienceCandidate = fp.allPass([
    isGoodAt("maths"),
    isGoodAt("biology"),
    isGoodAt("chemistry")
]);

const isHumanityCandidate = fp.allPass([
    isGoodAt("literature"),
    isGoodAt("history"),
    isGoodAt("classicalCulture")
]);

const isArtCandidate = fp.allPass([
    isGoodAt("plasticEducation"),
    isGoodAt("music")
]);

const isGoodAtAll = fp.allPass([
    isScienceCandidate,
    isHumanityCandidate,
    isArtCandidate
]);

const getSpecialization = fp.cond([
    [isGoodAtAll, fp.constant("any")],
    [isScienceCandidate, fp.constant("science")],
    [isHumanityCandidate, fp.constant("humanity")],
    [isArtCandidate, fp.constant("art")],
    [fp.T, fp.constant("none")]
]);

console.log(
    getSpecialization(student),
);
```

## Ejercicio 2

Suponed que queremos hacer lo siguiente: Tenemos un array de estudiantes y queremos transformar los datos de la siguiente manera, necesitamos un objeto que contenga el nombre de todos los estudiantes aprobados agrupados por clase, por ejemplo para esta entrada:

```js
const students = [
  { name: "John", grades: [7.0, 6.9, 8.0], group: "A" },
  { name: "Paul", grades: [5.0, 8.7, 3.7], group: "A" },
  { name: "Alex", grades: [5.0, 4.7, 3.7], group: "A" },
  { name: "Luke", grades: [9.0, 8.2, 6.2], group: "B" },
  { name: "Mark", grades: [6.0, 9.0, 8.4], group: "B" },
  { name: "Alice", grades: [3, 4.7, 4.5], group: "B" },
  { name: "Harvey", grades: [1.5, 6.6, 3], group: "C" },
  { name: "Nina", grades: [6.9, 4.4, 7], group: "C" },
  { name: "Evan", grades: [1.2, 6.8, 1.7], group: "C" },
];
```

Queremos la siguiente salida:

```json
{
  "A": ["John", "Paul"],
  "B": ["Luke", "Mark"],
  "C": ["Nina"]
}
```

* Crear una función para saber quién aprueba (utilizar `mean`)

* Utilzar la función anterior sobre los `students` sobre el array `grades`, utilizar `conformsTo`

* Agrupar por el campo `group` y proyectar el nombre de los alumnos

```js


// Versión con lodash/fp

// 1. Crear funcion para saber quién aprueba
var isApproved = _.flow(
  _.mean,
  _.gte(_.__, 5),
);

// Crear función principal
var getApprovedStudentsNameByClass = _.flow(
  _.filter(_.conformsTo({ grades: isApproved })),
  _.groupBy('group'),
  _.mapValues(_.map('name')),
);

// Comprobar resultados
var result = getApprovedStudentsNameByClass(students);
console.log(result);
// { A: ['John', 'Paul'], B: ['Luke', 'Mark'], C: ['Nina'] }
```