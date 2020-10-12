const { curry } = require('../../../utils/operators');
const Task = require('../../../utils/algebraic_support/task');

const resolveResource = (url, params) => {
    const resources = {
        users: [
            { username: 'stale', name: 'Morty', password: 'crackers', id: 1 },
            { username: 'hammer', name: 'Ric', password: 'lays', id: 39 },
        ],
        relations: [
            { user_id: 1, collection: [{ user_id: 39 }] },
            { user_id: 39, collection: [{ user_id: 1 }] },
        ],
    };

    let result;

    switch (url) {
        case '/authenticate':
            const user = resources.users
                .find((u) => u.username === params['username'] && u.password === params['password']);
            result = { id: user.id, name: user.name };
            break;

        case '/friends':
            const partial = resources.relations.filter((r) => r.user_id === params['user_id']);
            const friends = partial[0].collection;
            result = resources.users.filter(u => friends.some((f) => f.user_id === u.id)).map(u => ({ id: u.id, name: u.name }));
            break;
    }

    return result;
}

const httpClientFake = (url, params, callback) => {
    setTimeout(() => {
        const result = resolveResource(url, params);
        if (result) {
            callback(null, result);
        } else {
            callback(Error('Failed to resolve'));
        }
    }, 500);
};

// getJSON :: Url -> Params -> Task JSON
module.exports.getJSON = curry((url, params) => new Task((reject, resolve) => {
    httpClientFake(url, params, (err, result) => {
        if (err) {
            reject(err);
            return;
        }

        resolve(result);
    });
}));