class User  {

}
var ui = null;

export const  getUser = () => {
    if(!ui) {
        ui = new User();
    }
    return ui;
}

