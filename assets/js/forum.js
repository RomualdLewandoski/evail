import {
    isGetMethod,
    parseGet,
    getAction,
    getRegisterInfo,
    getLoginInfo
} from "./managers/methodManager.js";
import {
    loadUsers,
    saveUsers,
    isExist,
    register,
    login,
    logout
} from "./managers/userManager.js";
import forum from "../../vues/forum.js";
import navbar from "../../vues/navbar.js";

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
    } else if (action === "login") {
        var loginData = getLoginInfo(parsed)
        login(loginData.pseudo, loginData.password, userList)
    } else {
        window.location.replace('index.html')
    }
} else {
    displayForum()
}
function displayDate() {
    let html = $('#date')
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth();
    let months = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
    let d = date.getDate();
    let day = date.getDay();
    let days = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    let h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    let m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    let s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    let result = '' + days[day] + ' ' + d  + ' ' + months[month] + ' ' + year + ' ' + h + ':' + m + ':' + s;
    html.html(result)

}

function displayForum() {

    if (localStorage.getItem("errorForum")) {
        swal("Erreur", localStorage.getItem("errorForum"), "error");
        localStorage.removeItem("errorForum");
    }
    if (localStorage.getItem("successForum")) {
        swal("Bravo", localStorage.getItem("successForum"), "success");
        localStorage.removeItem("successForum");
    }
    if (sessionStorage.getItem('user')){
        let render = navbar().view+forum().view
        $('#app').append(render)

        $('#logoutBtn').click(function () {
            logout()
        })

        displayDate()
        setInterval(displayDate, 1000)

    } else{
        localStorage.setItem('error', "Vous devez etre connecté pour accéder au forum")
        window.location.replace('index.html')
    }
}

