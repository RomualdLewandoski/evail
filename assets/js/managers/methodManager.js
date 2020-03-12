function isGetMethod(url) {
    let astr = url.split("?")
    return astr.length > 1
}

function parseGet(url) {
    let astr = url.split("?");
    return astr[1]
}

function getAction(parsed) {
    var action = "undefined";
    let obj = parsed.split("&");
    let x;
    for (x in obj) {
        let astr = obj[x].split("=");
        if (astr[0] === "action") {
            action = astr[1]
        }
    }
    return action
}

function getLoginInfo(parsed){
    var lPseudo, lPassword
    let obj = parsed.split("&")
    let x;
    for(x in obj){
        let astr = obj[x].split("=")
        if(astr[0] === "loginPseudo"){
            lPseudo = astr[1]
        }else if(astr[0] === "loginPassword"){
            lPassword = astr[1]
        }
    }
    let final = {
        pseudo: lPseudo,
        password: calcMD5(lPassword)
    }
    return final;
}

function getRegisterInfo(parsed) {
    var rPseudo, rPassword, rPasswordConf, rEmail, rNom, rPrenom, rSexe, rAge, rVille;
    let obj = parsed.split("&");
    let x;
    for (x in obj) {
        let astr = obj[x].split("=");
        switch (astr[0]) {
            case "registerPseudo":
                rPseudo = astr[1];
                break;
            case "registerPassword":
                rPassword = astr[1];
                break;
            case "registerPasswordConf":
                rPasswordConf = astr[1];
                break;
            case "registerEmail":
                rEmail = astr[1];
                break;
            case "registerNom":
                rNom = astr[1];
                break;
            case "registerPrenom":
                rPrenom = astr[1];
                break;
            case "registerSexe":
                rSexe = astr[1];
                break;
            case "registerAge":
                rAge = astr[1];
                break;
            case "registerVille":
                rVille = astr[1];
                break;
        }
    }
    let final = {
        pseudo: rPseudo,
        password: calcMD5(rPassword),
        passwordConf: calcMD5(rPasswordConf),
        email: rEmail,
        nom: rNom,
        prenom: rPrenom,
        sexe: rSexe,
        age: rAge,
        ville: rVille
    }
    return final
}
export {isGetMethod, parseGet, getAction, getRegisterInfo, getLoginInfo}