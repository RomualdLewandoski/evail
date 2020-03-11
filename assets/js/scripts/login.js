/**
 * TODO ICI CE TROUVE LE LOGIN ET TOUTES LE METHODES RELATIVES A CELUI CI
 */
import {empty} from "./utils.js";

const loginForm = $("#loginForm")


loginForm.submit(function (event) {
    var pseudo = $('#loginPseudo').val()
    var password = $('#loginPassword').val()
    console.log(pseudo, password)
    if(empty(pseudo) || empty(password)){
        event.preventDefault();
        swal("Erreur", "Vous devez remplir tous les champs du formulaitre de connexion", "error")
    }else{
        return;
    }
})