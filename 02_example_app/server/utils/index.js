module.exports.corsHreaders = () => ({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Content-Type': 'application/json',
});

const query = (t) => `?tags=${t}&format=json&jsoncallback=?`;
module.exports.urlBuilder = (t) => `https://${process.env.PHOTOS_RESOURCE_HOST}${process.env.PHOTOS_RESOURCE_PATH}${query(t)};`

module.exports.removeParanthesis = (entry) => {
    const t = entry.replace(/\(/g, '');
    return t.replace(/\)/g, '');
};