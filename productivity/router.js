import LoginController  from './login/login.js';
import ProdController  from './prod/prod.js';
import { getUser } from '../user.js';
export async function route(elem, state) {
    let user = getUser();
    let controller = null;
    if(state) {
        controller = [LoginController, ProdController].map(item => new item() ).find(item => item.getEventKey() == state);
    }
    if(!controller) {
        if(user.isLoggedIn()) {
            controller = new ProdController();
        } else {
            controller = new LoginController();
        }
    }
    controller.setContainer(elem);
    controller.render();
    controller.bind();
    controller.onChangeDetect((state) => route(elem, state))
}