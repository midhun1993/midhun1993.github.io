import { route } from './productivity/router.js';
(async () => {
    let elem  = document.querySelector('#prod-container');
    route(elem);
})(window)

