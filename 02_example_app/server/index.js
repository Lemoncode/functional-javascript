const http = require('http');
const url = require('url');
const { get } = require('./http.helpers');

const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = (t) => `?tags=${t}&format=json&jsoncallback=?`;
const urlBuilder = (t) => `https://${host}${path}${query(t)}`;

const removeParenthesis = (entry) => {
    const t = entry.replace(/\(/g, '');
    return t.replace(/\)/g, '');
};

const app = http.createServer((request, response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    const parts = url.parse(request.url, true);
    const { query } = parts;

    response.writeHead(200, headers);
    
    get(urlBuilder(query.topic))((res) => {
        const s = removeParenthesis(res);
        response.write(s);
        response.end();
    });

});

app.listen(3000);