const https = require('https');
const { append, intercalate, compose, curry } = require('./operators');

// objectToKeyValueStrings :: obj -> String[]
const objectToKeyValueStrings = (obj) => Object.keys(obj).map((k) => `${k}=${obj[k]}`); // {id: 7} -> id=7
const objectToQueryParams = compose(intercalate('&'), objectToKeyValueStrings);
const urlWithParams = (url) => compose(append(url), append('?'), objectToQueryParams); // null || undefined

// https://jsonplaceholder.typicode.com/posts?userId=1
// const doGet = $getJSON('https://jsonplaceholder.typicode.com/posts', { userId: 1 });
// doGet((data) => console.log(data), (err) => console.log(err));
module.exports.getJSON = curry((url, params, result, reject) => {
    const _url = urlWithParams(url)(params);
    let data = '';
    https.get(_url, (res) => {
        res.on('data', (d) => data += d);
        res.on('end', () => {
            try {
                const obj = JSON.parse(data);
                result(obj);
            } catch (error) {
                reject(error);
            }
        });

    }).on('error', (e) => {
        reject(e);
    })
});

