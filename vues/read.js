import {getTopicById, getPositionInJson} from "../assets/js/managers/topicManager.js";
import {isExist} from "../assets/js/managers/userManager.js";
import {timestampToReadable} from "../assets/js/scripts/utils.js";


var template = `
<div class="wrap4 text-left mt-3">
   <div class="container">
      <div class="pageTitle">
         <i class="fas fa-comments"></i> Lecture de : %title%<br><br>
         <a href="forum.html" class="text-white"><i class="fas fa-arrow-left"></i>Retour</a>
      </div>
      
      <div class="mt-5"></div>
      <!-- START MAIN THREAD -->
      <div class="forum-topic">
         <div class="row">
            <div class="col-md-3 forum-right text-center">
               <img src="%avatarAuthor%" style="width: 50%">
               <div class="mt-4"></div>
               <div class="forum-autor">%author%</div>
               <div class="mt-3"></div>
               <div class="forum-rank">%authorNom% %authorPrenom%</div>
               <div class="mt-3"></div>
               <div class="forum-rank">%authorAge% - %authorSexe% De %authorVille%</div>
               <div class="mt-5"></div>
            </div>
            <div class="col-md-9 forum-left">
               %topicContent%
            </div>
         </div>
         <div class="forum-foot">
            <div class="row">
               <div class="col-md-5">
                  <span class="btn" style="cursor: default!important;">
                  %topicDate%
                  </span>
               </div>
               <div class="col-md-7 text-right">
                  <span class="btn btn-outline-forum">
                    <a href="#reply"> <i class="fas fa-reply"></i> Répondre</a>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="mt-4"></div>
      <!-- END MAIN THREAD -->
      <!-- START REPLY -->
      <div id="replyTopicList">
        %replyList%
      </div>
      <!-- END REPLY -->
      <!-- START FORM -->
      <div class="text-center text-white">
         <a name="reply"></a>
         <form id="replyTo" data-id="%id%">
         <div class="row">
            <div class="col-md-3">
               <h3>Répondre au sujet : </h3>
            </div>
            <div class="col-md-9">
               <textarea id="replyTxt" name="replyTxt" class="note-codable"
                  style="height: 270px;"></textarea>
               <script>
                  CKEDITOR.replace('replyTxt', {
                      removePlugins: 'sourcearea, about, forms, iframe, save, preview, print, templates'
                  });
               </script>
            </div>
         </div>
         <br>
         <input type="submit" value="Répondre" class="btn btn-lg btn-primary">
         </form>
      </div>
      <!-- END FORM -->
      <div class="mt-5"></div>
      <script type="module" src="./assets/js/scripts/read.js"></script>
   </div>
</div>
`;

var replyItem = `
<div class="forum-topic">
         <div class="row">
            <div class="col-md-3 forum-right text-center">
               <img src="skinModel.php?vr=-25&amp;hr=-25&amp;hrh=10&amp;vrla=5&amp;vrra=-2&amp;vrll=-20&amp;vrrl=2&amp;ratio=8&amp;format=png&amp;displayHair=true&amp;headOnly=false&amp;user=HazielKaos">
               <div class="mt-4"></div>
               <div class="forum-autor">HazielKaos</div>
               <div class="mt-3"></div>
               <div class="forum-rank">Administrateur</div>
               <div class="mt-3"></div>
               <div class="forum-rank">Membre depuis
                  le 25/04/18
               </div>
               <div class="mt-5"></div>
            </div>
            <div class="col-md-9 forum-left">
               <p>Je t'invite a ouvrir un ticket plutot que de passer par forum pour sa ;)</p>
            </div>
         </div>
         <div class="forum-foot">
            <div class="row">
               <div class="col-md-5">
                  <span class="btn" style="cursor: default!important;">
                  07/11/18                                    à
                  12:47                                </span>
               </div>
               <div class="col-md-7 text-right">
                  <span class="btn btn-outline-forum">
                  <a href="/action/forum/reply/delete/225"> <i class="fas fa-trash"></i> Supprimer</a>
                  </span>
                  <span class="btn btn-outline-forum">
                  <a href="/forum/reply/edit/225"> <i class="fas fa-edit"></i> Editer</a>
                  </span>
                  <span class="btn btn-outline-forum">
                  <a href="forum/read/99255cbd57073d236037156a5d52c#reply"> <i class="fas fa-reply"></i> Répondre</a>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="mt-4"></div>
`;

export default function (id, topicArray, userArray, replyArray) {
    return{
        view: generate(id, topicArray, userArray, replyArray)
    }
}

function generate(id, topicArray, userArray, replyArray) {
    let topic = getTopicById(id, topicArray)
    let author = isExist(topic.getAuthor(), topic.getAuthor(), userArray)
    let temp = template
    let jsonIndex = getPositionInJson(id)
    let jsonObj = JSON.parse(localStorage.getItem('topics')).topics[jsonIndex]
    temp = temp.replace(/%title%/g, topic.getTitle())
        .replace(/%author%/g, author.getPseudo())
        .replace(/%authorNom%/g, author.getNom())
        .replace(/%authorPrenom%/g, author.getPrenom())
        .replace(/%authorAge%/g, author.getAge())
        .replace(/%authorSexe%/g, author.getSexe() === "h" ? "Homme" : "Femme")
        .replace(/%authorVille%/g, author.getVille())
        .replace(/%topicContent%/g, topic.getContent())
        .replace(/%id%/g, id)
        .replace(/%avatarAuthor%/g, author.getSexe() === "h" ? "./assets/img/user-h.png" : "./assets/img/user-f.png")
        .replace(/%topicDate%/g, timestampToReadable(jsonObj.createdDate))
    if (replyArray.length === 0){
        temp = temp.replace(/%replyList%/g, "")
    } else{
        temp = temp.replace(/%replyList%/g, generateReply(id, replyArray))
    }


    return temp
}

function generateReply(id, replyArray){
    return "Bientot"
}