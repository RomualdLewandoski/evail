import {empty} from "./utils.js";
import {createTopic} from "../managers/topicManager.js";
import {topicList} from "../forum.js";

$('#createTopic').submit(function (event) {
    event.preventDefault();
    let title = $('#topicTitle').val();
    let content =  CKEDITOR.instances['topicNew'].getData()
    if (!empty(title) || !empty(content)){
        createTopic(title, content, topicList);
    } else{
        swal("Erreur", "Vous devez remplir tous les champs pour poster un topic", "error")
    }

})
$('#resetBtn').click(function () {
    CKEDITOR.instances['topicNew'].setData("")
})