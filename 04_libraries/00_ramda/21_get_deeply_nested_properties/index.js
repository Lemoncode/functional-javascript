const R = require("ramda");
// const { path } = R;
const { path, pathOr } = R;

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

// const getManagerLast = path(['personal', 'manager', 'lName']);
const getManagerLast = pathOr('default', ['personal', 'manager', 'lName']);
// const result = getManagerLast(itDept) || 'default';
const result = getManagerLast(itDept);


console.log(result);
