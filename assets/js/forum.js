import {
    isGetMethod,
    parseGet,
    getAction,
    getRegisterInfo,
    getLoginInfo
} from "./managers/methodManager.js";
import {Users} from "./objects/Users.js";
import {
    loadUsers,
    saveUsers,
    isExist,
    register
} from "./managers/userManager.js";

const url = window.location.href;
const astr = url.split("?");
const userList = [];
if (localStorage.getItem("users")) {
    loadUsers(userList)
}

if (isGetMethod(url)) {
    var parsed = parseGet(url);
    var action = getAction(parsed)

    if (action === "register") {
        var registerData = getRegisterInfo(parsed)
        register(registerData.pseudo,
            registerData.password,
            registerData.passwordConf,
            registerData.email,
            registerData.nom,
            registerData.prenom,
            registerData.sexe,
            registerData.age,
            registerData.ville,
            userList)
    }else if (action === "login"){
        var loginData = getLoginInfo(parsed)
        //on va check si le champs pseudo existe Si il n'existe pas on va check avec l'email
        //si rien n'existe ont dit que l'utilisateur n'existe pas
        //si il existe on va check le mot de passe si il est bon en va stocker en sessionStorage
    }else{
        //todo pour demain
    }
}else{
    //todo ici on fait la verif du login etc
}



if (localStorage.getItem("error")){
    swal("Erreur", localStorage.getItem("error"), "error");
    localStorage.removeItem("error");
}
if (localStorage.getItem("success")){
    swal("Bravo", localStorage.getItem("success"), "success");
    localStorage.removeItem("success");
}

