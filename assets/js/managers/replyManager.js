import {Reply} from "../objects/Reply.js";
import {isExist} from "./userManager.js";
import {userList} from "../forum.js";
import {timestampToReadable} from "../scripts/utils.js";

function createReply(idTopic, content, array) {
    let author = JSON.parse(sessionStorage.getItem('user')).user;
    let time = new Date().getTime()
    let id = getNextId();
    let reply = new Reply(id, idTopic, content, author, time, array)
    saveReply(id+1, array)
    swal("Bravo", "Votre réponse a bien été ajouté", "success")
    CKEDITOR.instances['replyTxt'].setData("")
    var temp = `
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
    let User = isExist(author, author, userList)
    temp = temp.replace(/%avatarReply%/g,  User.getSexe() === "h" ? "./assets/img/user-h.png" : "./assets/img/user-f.png")
        .replace(/%replyAuthor%/g, author)
        .replace(/%replyAuthorNom%/g, User.getNom())
        .replace(/%replyAuthorPrenom%/g, User.getPrenom())
        .replace(/%replyAutorAge%/g, User.getAge())
        .replace(/%replyAuthorVille%/g, User.getVille())
        .replace(/%replyAuthorSexe%/g, User.getSexe() === "h" ? "Homme" : "Femme")
        .replace(/%replyContent%/g, content)
        .replace(/%replyDate%/g, timestampToReadable(time))
    $('#replyTopicList').append(temp)

}

function getNextId() {
    let id;
    if (localStorage.getItem('reply')) {
        id = JSON.parse(localStorage.getItem('reply')).nextId;
    } else {
        id = 1;
    }
    return id;
}

function saveReply(nextId, array) {
    let finalArray = {
        nextId: nextId,
        reply: array
    }
    localStorage.setItem('reply', JSON.stringify(finalArray))
}

function getPositionInJson(id) {
    let x;
    let i = 0;
    let j;
    let obj = JSON.parse(localStorage.getItem('reply'))
    for (x in obj.reply){
        let reply = obj.reply[x]
        if (reply.id == id){
            j = i;
        } else{
            i++
        }
    }
    return j
}
function loadReply(array) {
    let str = localStorage.getItem('reply')
    let obj = JSON.parse(str).reply
    let x
    for (x in obj){
        let reply = obj[x]
        let reply_obj = new Reply(
            reply.id,
            reply.idTopic,
            reply.content,
            reply.author,
            reply.createdDate,
            array
        )
    }
}

function getReplyByTopicId(id) {
    //WARNING: it ll return an array of OBJECT AND NOT AN OBJECT ALONE
}

export {loadReply, saveReply, getNextId, createReply, getReplyByTopicId, getPositionInJson}
