import { template  } from "./login.template.js";
import { Controller } from "../../controller.js"
import Mustache from 'https://cdn.jsdelivr.net/npm/mustache@4.2.0/+esm';
import { getAuth, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'
import { app } from '../../config.js';
import { setUser } from '../../user.js';
export default class LoginController extends Controller {

    getEventKey(){
        return 'login';
    }

    async bind() {
         this.container.querySelector("#login-form").addEventListener("submit", (ev)=>{
            ev.preventDefault();
            let formData = new FormData(ev.target);
            let obj = {};
            for(let [key, value] of formData.entries()) {
                obj[key] = value;
            }
            let { email , password } = obj;
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                 const user = userCredential.user;
                 setUser(user);
                 this.changeTo("prod")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });
        })
    }
    render() {
        let templ = template();
        let rendered = Mustache.render(templ);
        this.container.innerHTML = rendered;
    }
}
