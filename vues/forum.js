import {timestampToReadable} from "../assets/js/scripts/utils.js";
import {getReplyByTopicId, getPositionInJson2} from '../assets/js/managers/replyManager.js';


var template = `
<div class="wrap4 mt-3">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-7 offset-md-1 forum-container" style="min-height: 50px; padding-top: 10px;">
            <div class="pageTitle">
               <i class="fas fa-comments"></i> Liste des Topics
            </div>
            <div class="mt-4"></div>
            <div class="forum-list text-left">
            <div class="btn btn-lg btn-outline-bleu ml-3 mb-4" data-toggle="modal" data-target="#newTopic">Ajouter un topic</div>
            <div id="topicList">
                    %topicList%
            </div>
            
            </div>
            <div class="mt-4"></div>
         </div>
         
         <div class="col-md-3 offset-md-1" style="padding-top: 10px; min-height: 50px;">
            <div class="forum-stats">
               <h3>Informations</h3>
               <br>
               <div class="row">
                  <div class="col-sm-6" style="text-align: left">
                     <h4>Vous etes :</h4>
                  </div>
                  <div class="col-sm-6" style="text-align: left">
                     <h4>%myPseudo%</h4>
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-6" style="text-align: left">
                     <h4>Connecté depuis :</h4>
                  </div>
                  <div class="col-sm-6" style="text-align: left">
                     <h4>%myLastLoginDate%</h4>
                  </div>
               </div>
               <div class="row">
                  <div class="col-sm-6" style="text-align: left">
                     <h4>Nombre de sujets</h4>
                  </div>
                  <div class="col-sm-6" style="text-align: left">
                     <h4 id="nbtopics">%nbTopic%</h4>
                  </div>
               </div>
            </div>
            %lastTopicInfo%
         </div>
      </div>
   </div>
</div>
%modal%
<script type="module" src="./assets/js/scripts/topics.js"></script>
`;
var infoTopics = `
<div class="m-4"></div>
            <div class="forum-stats">
               <h3>Dernier sujet</h3>
               <br>
               <div class="col-sm-12" style="text-align: left">
                  <h6 id="lastTitle">%lastTitle%</h6>
                  <p id="lastTime">
                  Par: %lastAuthor%
                  le %lastDate%
                  </p>
               </div>
               <br>
            </div>
`;
var topicItem = `
               <div class="row forum-item">
                  <div class="col-md-5">
                     <a href="#" class="read" data-id="%id%">
                        <h4>%title%</h4>
                     </a>
                  </div>
                  <div class="col-md-3" style="text-align: right"><i>%NbbComments% Commentaire(s)</i></div>
                  <div class="col-md-4" style="text-align: right">
                     
                     Par: %author%
                     le %date%
                  </div>
               </div>
`;

var topicModal = `
<div class="modal fade" tabindex="-1" id="newTopic" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Créer un nouveau sujet</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="createTopic">
                    <div class="row form-group " style="align-items: center">
                        <div class="col-md-2">
                            <label for="loginPseudo">Titre</label>
                        </div>
                        <div class="input-group col-md-10">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-book"></i> </span>
                            </div>
                            <input type="text" class="form-control" id="topicTitle" name="topicTitle" placeholder="Le titre de votre sujet">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-2"><label for="topicNew">Contenu</label></div>
                        <div class="col-md-10">
                             <script src="./assets/vendor/ckeditorfull/ckeditor.js" type="text/javascript"></script>
                        <textarea id="topicNew" name="topicNew" class="note-codable" style="height: 270px;"></textarea>
                        <script>
                            CKEDITOR.replace('topicNew', {
                                removePlugins: 'sourcearea, about, forms, iframe, save, preview, print, templates'
                            });
                        </script>
                        </div>
                    </div>
                    <hr>
                    <div class="text-center">
                        <button type="reset" class="btn btn-danger" id="resetBtn"><i class="fas fa-trash"></i> Reset</button>
                        <button type="submit" class="btn btn-success"><i class="fas fa-paper-plane"></i> Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="js">
    <script type="module">
        import {displayRead} from "./assets/js/forum.js";
        $('.read').click(function (event) {
        event.preventDefault();
        let id = $(this).attr("data-id")
        console.log("Lecture du topic " + id)
        $('#app').empty()
        displayRead(id)
            })
    </script>
    </div>
</div>
`;


export default function (topicList) {
    return {
        view: replace(topicList)
    }
}

function replace(topicList) {
    let temp = template
    let user = JSON.parse(sessionStorage.getItem('user'))
    temp = temp.replace(/%myPseudo%/g, user.user)

    temp = temp.replace(/%myLastLoginDate%/g, timestampToReadable(user.date))
    temp = temp.replace(/%topicList%/g, generateList(topicList))
    temp = temp.replace(/%modal%/g, topicModal)
    temp = temp.replace(/%nbTopic%/g, topicList.length)

    temp = temp.replace(/%lastTopicInfo%/g, infoTopics)
    if (topicList.length != 0){
        let lastTopic = topicList[topicList.length-1];
        temp = temp.replace(/%lastTitle%/g, lastTopic.getTitle())
        temp = temp.replace(/%lastAuthor%/g, lastTopic.getAuthor())
        let lastDate = JSON.parse(localStorage.getItem('topics')).topics[topicList.length-1].createdDate
        temp = temp.replace(/%lastDate%/g, timestampToReadable(lastDate))
    } else{
        temp = temp.replace(/%lastTitle%/g, "")
        temp = temp.replace(/%lastAuthor%/g, "")
        temp = temp.replace(/%lastDate%/g, "")
    }

    return temp
}

function generateList(topicList) {
    let final="";
    let x;
    for (x in topicList){
        let topic = topicList[x]
        let temp = topicItem
        let date = JSON.parse(localStorage.getItem('topics')).topics[x].createdDate
        let timestamp = timestampToReadable(date)
        temp = temp.replace(/%id%/g, topic.getId())
        temp = temp.replace(/%title%/g, topic.getTitle())
        temp = temp.replace(/%author%/g, topic.getAuthor())
        temp = temp.replace(/%date%/g, timestamp)
        temp = temp.replace(/%NbbComments%/g, getReplyByTopicId(topic.getId()).length)
        final += temp
    }
    return final
}