import { example1 } from './examples/example_1';
import { example2 } from './examples/example_2';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('example-1').addEventListener('click', (evt) => {
        evt.stopPropagation();
        example1();
    });

    document.getElementById('example-2').addEventListener('click', (evt) => {
        evt.stopPropagation();
        example2();
    });
});
