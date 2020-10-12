const https = require('https');

exports.get = (url) => (callback) => {
    https.get(url, (response) => {
        let body = '';

        response.on('data', (chunk) => {
            body += chunk;
        });

        response.on('end', () => {
            callback(body);   
        });
    });
};