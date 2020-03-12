import {timestampToReadable} from "../assets/js/scripts/utils.js";

var template = `
<div class="wrap4 mt-3">
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-7 offset-md-1 forum-container" style="min-height: 50px; padding-top: 10px;">
            <div class="pageTitle">
               <i class="fas fa-comments"></i> Liste des Topics
            </div>
            <div class="mt-4"></div>
            <div class="forum-list">
                %topicList%
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
                     <h4>%nbTopic%</h4>
                  </div>
               </div>
            </div>
            <div class="m-4"></div>
            <div class="forum-stats">
               <h3>Dernier sujet</h3>
               <br>
               <div class="col-sm-12" style="text-align: left">
                  <h6>Titre</h6>
                  <small>
                  Par: pseudo
                  le date
                  à heure
               </div>
               <br>
            </div>
         </div>
      </div>
   </div>
</div>
`;

var topicList = `
               <div class="row forum-item">
                  <div class="col-md-6">
                     <a href="forum/list/<?php echo $forum->id; ?>">
                        <h4>NOM DU FORUM</h4>
                     </a>
                  </div>
                  <div class="col-md-3" style="text-align: right"><i>NbbComments</i></div>
                  <div class="col-md-3" style="text-align: right">
                     derniereRéponse</h6>
                     <small>
                     Par: Nom
                     le date
                     à Heure</small>
                  </div>
               </div>
`;

export default function () {
    return {
        view: replace()
    }
}

function replace() {
    let temp = template
    let user = JSON.parse(sessionStorage.getItem('user'))
    temp = temp.replace(/%myPseudo%/, user.user)

    temp = temp.replace(/%myLastLoginDate%/, timestampToReadable(user.date))
    return temp
}