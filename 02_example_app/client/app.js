import { DomManipulation, Impure } from './utils';
import { compose, prop, map } from './operators';

// -- Pure --------------------------------------
const host = 'localhost:3000';
const query = (t) => `?topic=${t}`;
const url = (t) => `http://${host}${query(t)}`;

// -- Impure ------------------------------------
const extractSrcValues = DomManipulation.mapProperties('src');
const image = DomManipulation.createElement('img');

// -- Pure --------------------------------------
const mediaUrl = compose(prop('m'), prop('media'));
const mediaUrls = compose(map(mediaUrl), prop('items'));

document.addEventListener('DOMContentLoaded', () => {
// -- Impure ------------------------------------
    const images = compose(map(image), extractSrcValues, mediaUrls);
    const render = compose(Impure.setHtml('#js-main'), images);
    const app = compose(
        Impure.getJSON(render),
        url,
    );
    app('cats');
});