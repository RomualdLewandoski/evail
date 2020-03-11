import {
    isGetMethod,
    parseGet,
    getAction,
    getRegisterInfo
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
        //todo aprs avoir fini le register comme il faut
    }else{
        //todo pour demain
    }

}

