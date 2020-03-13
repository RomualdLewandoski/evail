import {getTopicById, getPositionInJson} from "../assets/js/managers/topicManager.js";
import {isExist} from "../assets/js/managers/userManager.js";
import {timestampToReadable} from "../assets/js/scripts/utils.js";
import {getReplyByTopicId, getPositionInJson2} from '../assets/js/managers/replyManager.js';


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
               <img src="%avatarReply%" style="width: 50%">
               <div class="mt-4"></div>
               <div class="forum-autor">%replyAuthor%</div>
               <div class="mt-3"></div>
               <div class="forum-rank">%replyAuthorNom% %replyAuthorPrenom%</div>
               <div class="mt-3"></div>
               <div class="forum-rank">%replyAutorAge% - %replyAuthorSexe% De %replyAuthorVille%
               </div>
               <div class="mt-5"></div>
            </div>
            <div class="col-md-9 forum-left">
               %replyContent%
            </div>
         </div>
         <div class="forum-foot">
            <div class="row">
               <div class="col-md-5">
                  <span class="btn" style="cursor: default!important;">
                  %replyDate%
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
        temp = temp.replace(/%replyList%/g, generateReply(id, replyArray, userArray))
    }


    return temp
}

function generateReply(id, replyArray, userArray){
    let final = ""
    let replies = getReplyByTopicId(id)
   let x;
   for (x in replies){
         let reply = replies[x]
         let temp = replyItem
         let position = getPositionInJson2(reply.getId())
         let str = localStorage.getItem('reply')
         let obj = JSON.parse(str).reply[position]
         let User = isExist(reply.getAuthor(), reply.getAuthor(), userArray)
         temp = temp.replace(/%avatarReply%/g,  User.getSexe() === "h" ? "./assets/img/user-h.png" : "./assets/img/user-f.png")
        .replace(/%replyAuthor%/g, reply.getAuthor())
        .replace(/%replyAuthorNom%/g, User.getNom())
        .replace(/%replyAuthorPrenom%/g, User.getPrenom())
        .replace(/%replyAutorAge%/g, User.getAge())
        .replace(/%replyAuthorVille%/g, User.getVille())
        .replace(/%replyAuthorSexe%/g, User.getSexe() === "h" ? "Homme" : "Femme")
        .replace(/%replyContent%/g, reply.getContent())
        .replace(/%replyDate%/g, timestampToReadable(obj.createdDate))
        final += temp
   }

    return final
}