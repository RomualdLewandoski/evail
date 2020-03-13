import {empty} from "./utils.js";
import {createReply} from "../managers/replyManager.js";
import {replyList} from "../forum.js";

$('#replyTo').submit(function (event) {
    event.preventDefault()
    let topicId = $(this).attr("data-id")

    let content =  CKEDITOR.instances['replyTxt'].getData()

    if (!empty(content)){
        createReply(topicId, content, replyList)
    } else{
        swal("Erreur", "Vous devez remplir le formulaire de réponse avant de pouvoir l'envoyer", "error")
    }

})