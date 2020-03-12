import home from '../../vues/home.js'
import loginForm from '../../vues/loginForm.js'
import registerForm from '../../vues/registerForm.js'
import {logout} from "./managers/userManager.js";


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
            displayForm = "login"
            $('#forms').empty()
            $('#forms').append(loginForm().view)
    })
    $('#registerBtn').click(function () {
            displayForm = "register"
            $('#forms').empty()
            $('#forms').append(registerForm().view)
    })
    $('#goForumBtn').click(function () {
        window.location.replace('forum.html')
    })
    $('#logoutBtn').click(function () {
        logout()
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


