import {empty, validateEmail} from "./utils.js";

var step = 1
var rPseudo, rPassword, rPasswordConf, rEmail, rNom, rPrenom, rSexe, rAge, rVille

const registerForm = $('#registerForm')

const wizard1Btn = $('#wizard1Btn')
const wizard2Btn = $('#wizard2Btn')
const wizard3Btn = $('#wizard3Btn')

const wizard1 = $('#wizard1')
const wizard2 = $('#wizard2')
const wizard3 = $('#wizard3')

const wizardNext1 = $('#wizardNext1')
const wizardNext2 = $('#wizardNext2')

const wizardPrev2 = $('#wizardPrev2')
const wizardPrev3 = $('#wizardPrev3')

const liPseudo = $('#recapPseudo')
const liEmail = $('#recapEmail')
const liNom = $('#recapNom')
const liPrenom = $('#recapPrenom')
const liAge = $('#recapAge')
const liVille = $('#recapVille')

function next1(){
    rPseudo = $('#registerPseudo').val();
    rPassword = $('#registerPassword').val();
    rPasswordConf = $('#registerPasswordConf').val();
    rEmail = $('#registerEmail').val();
    if (empty(rPseudo) || empty(rPassword) || empty(rPasswordConf) || empty(rEmail)) {
        swal("Erreur", "Vous devez remplir tous les champs présent pour passer à la prochaine étape", "error")
    } else {
        if (validateEmail(rEmail)) {
            wizard1Btn.removeClass("btn-warning").addClass("btn-success")
            wizard2Btn.prop("disabled", false);
            wizard2Btn.addClass("btn-warning").removeClass("btn-dark")
            wizard1.fadeOut(500)
            setTimeout(() => wizard2.fadeIn(500), 500)
            step = 2
        } else {
            swal("Erreur", "L'adresse mail ne semble pas valide", "error")
        }

    }
}

function next2(){
    rNom = $('#registerNom').val()
    rPrenom = $('#registerPrenom').val()
    rSexe = $("input[name='registerSexe']:checked").val()
    rAge = $('#registerAge').val()
    rVille = $('#registerVille').val()
    if (empty(rNom) || empty(rPrenom) || empty(rSexe)) {
        swal('Erreur', "Vous devez remplir tous les champs présentant une astérisque rouge", "error")
    } else {
        if (empty(rAge)) {
            rAge = 0
        }
        if (empty(rVille)) {
            rVille = ""
        }
        wizard2Btn.removeClass("btn-warning").addClass("btn-success")
        wizard3Btn.prop("disabled", false);
        wizard3Btn.addClass("btn-warning").removeClass("btn-dark")
        wizard2.fadeOut(500)
        setTimeout(() => wizard3.fadeIn(500), 500)
        //ON N4OUBLIE PAS DE D2FINIR LES INFOS R2CUP2RER DEPUIS LE FORMULAIRE ET DE LES AFFICHER DANS LE COMPTE RENDU
        liPseudo.empty()
        liEmail.empty()
        liNom.empty()
        liPrenom.empty()
        liAge.empty()
        liVille.empty()
        liPseudo.html("Pseudo : " + rPseudo)
        liEmail.html("Email : " + rEmail)
        liNom.html("Nom : " + rNom)
        liPrenom.html("Prenom : " + rPrenom)
        liAge.html("Age : " + rAge)
        liVille.html("Ville : " + rVille)

        step = 3
    }
}

wizardNext1.click(function () {
    next1()
})

wizardPrev2.click(function () {
    wizard2Btn.removeClass("btn-warning").addClass("btn-dark")
    wizard2Btn.prop("disabled", true);
    wizard1Btn.addClass("btn-warning").removeClass("btn-success")
    wizard2.fadeOut(500)
    setTimeout(() => wizard1.fadeIn(500), 500)
    step = 1
})

wizardNext2.click(function () {
   next2()
})

wizardPrev3.click(function () {
    wizard3Btn.removeClass("btn-warning").addClass("btn-dark")
    wizard3Btn.prop("disabled", true);
    wizard2Btn.addClass("btn-warning").removeClass("btn-success")
    wizard3.fadeOut(500)
    setTimeout(() => wizard2.fadeIn(500), 500)
    step = 2
})

registerForm.submit(function (event) {
    if (step === 1){
        event.preventDefault()
        console.log("YUP")
        next1()
    }else if (step == 2){
        event.preventDefault()
        console.log("yup2")
        next2()
    }else if (step == 3){
        return;
    }else {
        event.preventDefault()
        console.log("NOP")
    }
})

$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if (step == 3){
            registerForm.submit()
        }
    }
});


