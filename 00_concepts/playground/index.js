const { Map } = require('immutable');

const lau = Map({ name: 'Lau', health: 20, team: 'miyagi' });
const jai = Map({ name: 'jai', health: 10, team: 'cobra' });

const decrementHealth = (fighter) => fighter.set('health', fighter.get('health') - 1);
const isSameTeam = (f1, f2) => f1.get('team') === f2.get('team');
// const attack = (attacker, defender) => (isSameTeam(attacker, defender) ? defender : decrementHealth(defender));
// const attack = (attacker, defender) => (attacker.get('team') === defender.get('team') ? defender : decrementHealth(defender));
// const attack = (attacker, defender) => ('miyagi' === 'cobra' ? defender : decrementHealth(defender));
const attack = (attacker, defender) => decrementHealth(defender);

const defender = attack(lau, jai);

console.log(lau.get('health'), jai.get('health'));
console.log(defender.get('health'));