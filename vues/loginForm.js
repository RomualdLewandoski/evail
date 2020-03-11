var template = `
<hr>
<form id="loginForm">
    <div class="row form-group " style="align-items: center">
        <div class="col-md-2">
            <label for="loginPseudo">Pseudo/Email</label>
        </div>
        <div class="input-group col-md-10">
            <div class="input-group-prepend">
                <span class="input-group-text" ><i class="fas fa-user"></i> </span>
            </div>
            <input type="text" class="form-control" id="loginPseudo" name="loginPseudo" placeholder="Votre pseudo ou adresse email" >
      </div>
    </div>
    <div class="row form-group" style="align-items: center">
        <div class="col-md-2">
            <label for="loginPassword">Mot de passe</label>
        </div>
        <div class="input-group col-md-10">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-lock"></i> </span>
            </div>
            <input type="password" id="loginPassword" class="form-control" name="loginPassword" placeholder="Votre mot de passe">
        </div>
    </div>
    <div class="text-right mt-3">
    <input type="hidden" name="action" value="login">
    <button type="submit" class="btn btn-lg btn-primary">Connexion</button>
    </div>
</form>
<script type="module" src="./assets/js/scripts/login.js"></script>
`;


export default function () {
    return {
        view: template
    }
}