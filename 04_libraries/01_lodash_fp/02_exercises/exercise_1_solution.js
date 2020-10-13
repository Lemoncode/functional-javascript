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