var template = `
<hr>
<form id="registerForm" method="get" action="forum.html">
    <div class="row" style="align-items: center">
        <div class="col-md-3 ">
            <button type="button" id="wizard1Btn" class="btn btn-lg btn-warning mb-2 mb-md-0">Identifiants</button>
        </div>
        <div class="col-md-1">
            <i class="fas fa-arrow-right mb-2 mb-md-0"></i>
        </div>
        <div class="col-md-3">
            <button type="button" id="wizard2Btn" class="btn btn-lg btn-dark mb-2 mb-md-0" disabled>A propos</button>
        </div>
        <div class="col-md-1">
            <i class="fas fa-arrow-right mb-2 mb-md-0"></i>
        </div>
        <div class="col-md-3">
            <button type="button" id="wizard3Btn" class="btn btn-lg btn-dark " disabled>Récapitulatif</button>
        </div>
    </div>

    <div id="wizard1" class="mt-5">
        <div class="row form-group " style="align-items: center">
            <div class="col-md-2">
                <label for="registerPseudo">Pseudo <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i> </span>
                </div>
                <input type="text" class="form-control" id="registerPseudo" name="registerPseudo" placeholder="Votre pseudo" >
            </div>
        </div>
        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerPassword">Mot de passe <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-lock"></i> </span>
                </div>
                <input type="password" id="registerPassword" class="form-control" name="registerPassword" placeholder="Votre mot de passe" >
            </div>
        </div>
        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerPasswordConf">Confirmation mot de passe <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-lock"></i> </span>
                </div>
                <input type="password" id="registerPasswordConf" class="form-control" name="registerPasswordConf" placeholder="Votre mot de passe" >
            </div>
        </div>

        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerEmail">Adresse email <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-envelope"></i> </span>
                </div>
                <input type="email" id="registerEmail" class="form-control" name="registerEmail" placeholder="Votre adresse email" >
            </div>
        </div>
        <div class="text-right mt-4">
            <button type="button" class="btn btn-lg btn-info" id="wizardNext1">Suivant <i class="fas fa-arrow-right"></i> </button>
        </div>
    </div>

    <div id="wizard2" class="mt-5" style="display: none">
        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerNom">Nom <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-signature"></i> </span>
                </div>
                <input type="text" id="registerNom" class="form-control" name="registerNom" placeholder="Votre nom" >
            </div>
        </div>

        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerPrenom">Prénom <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-signature"></i> </span>
                </div>
                <input type="text" id="registerPrenom" class="form-control" name="registerPrenom" placeholder="Votre prénom" >
            </div>
        </div>

        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerSexe">Sexe <font color="red">*</font></label>
            </div>
            <div class="input-group col-md-10">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="registerSexe" id="registerSexe" value="h">
                    <label class="form-check-label" for="registerSexe">Homme</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="registerSexe" id="registerSexe2" value="f">
                    <label class="form-check-label" for="registerSexe2">Femme</label>
                </div>
            </div>
        </div>

        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerAge">Age</label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-birthday-cake"></i> </span>
                </div>
                <input type="number" id="registerAge" class="form-control" name="registerAge" placeholder="Votre age" >
            </div>
        </div>
        
        <div class="row form-group" style="align-items: center">
            <div class="col-md-2">
                <label for="registerVille">Ville</label>
            </div>
            <div class="input-group col-md-10">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-city"></i> </span>
                </div>
                <input type="text" id="registerVille" class="form-control" name="registerVille" placeholder="Votre ville">
            </div>
        </div>
        <div class="text-right mt-4">
            <button type="button" class="btn btn-lg btn-info mr-2" id="wizardPrev2"><i class="fas fa-arrow-left"></i> Précédent</button>
            <button type="button" class="btn btn-lg btn-info" id="wizardNext2">Suivant <i class="fas fa-arrow-right"></i> </button>
        </div>
    </div>

    <div id="wizard3" class="mt-5" style="display: none">
        <h5>Récapitulatif de vos informations
        <ul class="text-left">
            <li id="recapPseudo"></li>
            <li id="recapEmail"></li>
            <li id="recapNom"></li>
            <li id="recapPrenom"></li>
            <li id="recapAge"></li>
            <li id="recapVille"></li>
        </ul>
        </h5>
         <button type="button" class="btn btn-lg btn-info mr-2" id="wizardPrev3"><i class="fas fa-arrow-left"></i> Précédent</button>
         <button type="submit" class="btn btn-lg btn-success"><i class="fas fa-check"></i> Mes informations sont exactes <i class="fas fa-check"></i> </button>
    </div>
    <input type="hidden" name="action" value="register">
</form>
<script type="module" src="./assets/js/scripts/register.js"></script>
`;


export default function () {
    return {
        view: template
    }
}