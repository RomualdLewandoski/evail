import home from '../../vues/home.js'
import loginForm from '../../vues/loginForm.js'
import registerForm from '../../vues/registerForm.js'

var displayForm = ''

$(document).ready(function () {
    $('#app').append(home().view)

    $('#subDesc').hover(
        function() {
            $( this ).text("Le forum tout en carton" );
        }, function() {
            $( this ).text("Le forum tout en JS" );
        }
    );


    $('#loginBtn').click(function () {
        if (displayForm === "login") {
            //todo ici il faut trouver un moyen de submit le formulaire
        } else {
            displayForm = "login"
            $('#forms').empty()
            $('#forms').append(loginForm().view)
        }

    })
    $('#registerBtn').click(function () {
        if (displayForm === "register"){
            //todo ici il faut trouver un moyen de submit le formulaire
        }else{
            displayForm = "register"
            $('#forms').empty()
            $('#forms').append(registerForm().view)
        }
    })

    if (localStorage.getItem("error")){
        swal("Erreur", localStorage.getItem("error"), "error");
        localStorage.removeItem("error");
    }
    if (localStorage.getItem("success")){
        swal("Bravo", localStorage.getItem("success"), "success");
        localStorage.removeItem("success");
    }
})


