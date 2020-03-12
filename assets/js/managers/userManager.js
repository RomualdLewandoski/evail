import {Users} from "../objects/Users.js";

function saveUsers(array){
    localStorage.setItem("users", JSON.stringify(array))
}
function loadUsers(array){
    let str = localStorage.getItem("users");
    let obj = JSON.parse(str)
    let x
    for (x in obj){
        let user = obj[x]
        let user_obj = new Users(
            user.pseudo,
            user.password,
            user.email,
            user.nom,
            user.prenom,
            user.sexe,
            user.age,
            user.ville,
            array
        )
    }
}

function isExist(pseudo, email, array) {
    let x;
    for (x in array){
        let user = array[x]
        if(user.getPseudo() === pseudo){
            return user;
        }else if (user.getEmail() === email){
            return user;
        }
    }
    return null;
}

function login(pseudo, password, array){
    var user = isExist(pseudo, pseudo, array)
    if(user != null){
        if(user.getPassword() === password){
            let session = {
                user: user.getPseudo(),
                date: new Date().getTime()
            }
            sessionStorage.setItem('user', JSON.stringify(session))
            localStorage.setItem('successForum', "Vous etes bien connecté")
            window.location.replace("forum.html")
        }else{
            localStorage.setItem('error', "Le mot de passe ne correspond pas avec l'utilisateur")
            window.location.replace('index.html')
        }
    }else{
        localStorage.setItem('error', "Aucun utilisateur n'existe avec ce pseudo ou cette adresse email")
        window.location.replace('index.html')
    }
}
function logout() {
    sessionStorage.removeItem('user')
    window.location.replace('index.html')
}

function register(pseudo, password, passwordConf, email, nom, prenom, sexe, age, ville, array) {
    if (isExist(pseudo, email, array)){
        localStorage.setItem("error", "Le pseudo ou l'adresse email est déja utilisé");
        window.location.replace("index.html")
    }else{
        if (password === passwordConf){
            if (age >= 1 && age <= 135){
                var user = new Users(
                    pseudo,
                    password,
                    email,
                    nom,
                    prenom,
                    sexe,
                    age,
                    ville,
                    array
                )
                saveUsers(array)
                localStorage.setItem("success", "Votre compte a bien été créer vous pouvez maintenant vous connecter")
                window.location.replace("index.html")
            }else{
                localStorage.setItem("error", "L'age spécifié est incorrect");
                window.location.replace("index.html")
            }
        }else{
            localStorage.setItem("error", "Le mot de passe fournit et sa confirmation sont différents");
            window.location.replace("index.html")
        }
    }
}
export {saveUsers, loadUsers, isExist, register, login, logout}