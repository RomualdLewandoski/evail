const template = `<div class="container h-100">

    <div class="row h-100">
        <div class="col-md-8 my-auto mx-auto">
            <h1 class="text-white text-center">Bienvenue sur J-Forum</h1><br>
            <h3 id="subDesc" class="text-white text-center">Le forum tout en JS </h3>
            <div class="card mt-5">
                <div class="card-body">
                    <h3>Avant d'avoir accès au forum vous devez être connecté</h3>
                    <div id="forms">

                    </div>
                </div>
                <div class="card-footer text-right">
                    %btn%
                   
                </div>
            </div>
        </div>
    </div>
</div>`;

var btnLogin = ` <button class="btn btn-lg btn-outline-success mr-4" id="registerBtn">Inscription</button>
                    <button class="btn btn-lg btn-outline-primary" id="loginBtn">Connexion</button>`;
var btnLogout = ` <button class="btn btn-lg btn-outline-success mr-4" id="goForumBtn">Allez au forum</button>
                    <button class="btn btn-lg btn-outline-primary" id="logoutBtn">Déconnexion</button>`
export default function () {
    return{
        view: replace()
    }
}

function replace() {
    let temp = template
    return temp.replace(/%btn%/, sessionStorage.getItem('user') ? btnLogout : btnLogin)
}