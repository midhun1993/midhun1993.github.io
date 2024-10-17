import { app } from "./config.js"
import { getAuth  } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'

class User  {
    constructor() {
        this.user = null;
        let auth = getAuth(app);
         if(auth.currentUser) {
            this.user;
        }
    }
    isLoggedIn() {
       if(this.user) {
        return true;
       }
       return false;
    }

    logout() {
        localStorage.removeItem('session'); 
    }
}
var ui = null;

export const  getUser = () => {
    if(!ui) {
        ui = new User();
    }
    return ui;
}

export const setUser = () => {
    ui = new User();
    return ui;
}

export const logout = () => {
    user.logout();
}

