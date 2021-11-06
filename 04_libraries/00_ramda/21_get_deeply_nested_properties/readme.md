# Get Deeply Nested Properties

```js
const R = require('ramda');

const acctDept = {
    name: 'Accounts Payable',
    location: '14th Floor',
    personnel: {
        manager: {
            fName: 'Bill',
            lName: 'Joel',
            title: 'director of something',
            salary: 50000
        }
    }
};

const itDept = {
    name: 'IT',
    location: 'remote',
};

const result = acctDept.personnel.manager.lName;

console.log(result);
```

If we run this we will get the name of the manager, but if we change it to `itDept` we will get an exception. 

We can add `&&` trying to avoid falsy evaluations

```diff
const R = require('ramda');


const acctDept = {
    name: 'Accounts Payable',
    location: '14th Floor',
    personnel: {
        manager: {
            fName: 'Bill',
            lName: 'Joel',
            title: 'director of something',
            salry: 50000
        }
    }
};

const itDept = {
    name: 'IT',
    location: 'remote',
+   personnel: {}
};

-const result = acctDept.personnel.manager.lName;
+const result = itDept.personnel && itDept.personnel.manager.lName;

console.log(result);
```

The code above will throw again another exception due that personnel, is empty, we can check that this as well.

```diff
const R = require("ramda");

const acctDept = {
  name: "Accounts Payable",
  location: "14th Floor",
  personnel: {
    manager: {
      fName: "Bill",
      lName: "Joel",
      title: "director of something",
      salry: 50000,
    },
  },
};

const itDept = {
  name: "IT",
  location: "remote",
  personnel: {},
};

-const result = itDept.personnel && itDept.personnel.manager.lName;
+const result =
+ itDept.personnel &&
+ itDept.personnel.manager &&
+ itDept.personnel.manager.lName;

console.log(result);

```

Now the code pass, the problem now is that if I want to do the same with `acctDept` I have to write the same validation, for this particular object. Obviously we can wrap this into a function, and check the current path, but there's a better way.

```diff
const R = require("ramda");
+const { path } = R;

const acctDept = {
  name: "Accounts Payable",
  location: "14th Floor",
  personnel: {
    manager: {
      fName: "Bill",
      lName: "Joel",
      title: "director of something",
      salry: 50000,
    },
  },
};

const itDept = {
  name: "IT",
  location: "remote",
  personnel: {},
};

+const getManagerLast = path(['personal', 'manager', 'lName']);
+
- const result =
-   itDept.personnel &&
-   itDept.personnel.manager &&
-   itDept.personnel.manager.lName;
+const result = getManagerLast(itDept);

console.log(result);

```

If don't want to ge the `undefined` value, the first option that we have is:

```diff
-const result = getManagerLast(itDept);
+const result = getManagerLast(itDept) || 'default';
```

But there's a better way using Ramda

```diff
const R = require("ramda");
-const { path } = R;
+const { path, pathOr } = R;

const acctDept = {
  name: "Accounts Payable",
  location: "14th Floor",
  personnel: {
    manager: {
      fName: "Bill",
      lName: "Joel",
      title: "director of something",
      salry: 50000,
    },
  },
};

const itDept = {
  name: "IT",
  location: "remote",
  personnel: {},
};

-const getManagerLast = path(['personal', 'manager', 'lName']);
+const getManagerLast = pathOr('default', ['personal', 'manager', 'lName']);
-const result = getManagerLast(itDept) || 'default';
+const result = getManagerLast(itDept);


console.log(result);

```
