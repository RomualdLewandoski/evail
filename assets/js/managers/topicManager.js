import {Topic} from "../objects/Topic.js";
import {timestampToReadable} from "../scripts/utils.js";

function createTopic(title, content, array) {
    let author = JSON.parse(sessionStorage.getItem('user')).user;
    let time = new Date().getTime()
    let id = getNextId();
    let topic = new Topic(id, title, content, author, time, array);
    $('#newTopic').modal('toggle');
    swal({
        title: "Topic ajouté",
        text: "Votre topic a bien été ajouté",
        type: "success"
    })
    $('#createTopic')[0].reset();
    CKEDITOR.instances['topicNew'].setData("")
    saveTopics(id+1, array);
    $('#topicList').append(displayNewTopic(id, title, author, time))
    $('#nbtopics').html(array.length)
    $('#lastTitle').html(title)
    $('#lastTime').html("Par: "+author+" le "+timestampToReadable(time))
    $('#js').empty();
    $('#js').append(`<script type="module">
        import {displayRead} from "./assets/js/forum.js";
        $('.read').click(function (event) {
        event.preventDefault();
        let id = $(this).attr("data-id")
        console.log("Lecture du topic " + id)
        $('#app').empty()
        displayRead(id)
            })
    </script>`);
}
function displayNewTopic(id, title, author, time ) {
    let template = ` <div class="row forum-item">
                  <div class="col-md-5">
                     <a href="#" class="read" data-id="%id%">
                        <h4>%title%</h4>
                     </a>
                  </div>
                  <div class="col-md-3" style="text-align: right"><i>NbbComments</i></div>
                  <div class="col-md-4" style="text-align: right">
                     
                     Par: %author%
                     le %date%
                  </div>
               </div>`;
    template = template.replace(/%id%/g, id)
    template = template.replace(/%title%/g, title)
    template = template.replace(/%author%/g, author)
    template = template.replace(/%date%/g, timestampToReadable(time))
    return template;
}

function getNextId() {
    let id;
    if (localStorage.getItem('topics')) {
        id = JSON.parse(localStorage.getItem('topics')).nextId;
    } else {
        id = 1;
    }
    return id;
}

function saveTopics(nextId, array) {
    let finalArray = {
        nextId: nextId,
        topics: array
    };
    localStorage.setItem("topics", JSON.stringify(finalArray));
}

function loadTopics(array) {
    let str = localStorage.getItem('topics');
    let obj = JSON.parse(str).topics;
    let x;
    for (x in obj){
        let topic = obj[x];
        let topic_obj = new Topic(
            topic.id,
            topic.title,
            topic.content,
            topic.author,
            topic.createdDate,
            array
        );
    }

}

function getTopicById(id, array) {
    let x;
    for (x in array) {
        let topic = array[x];
        if (topic.getId() === id) {
            return topic;
        }
    }
    return null;
}

function getPositionInJson(id) {
    let x;
    let i = 0;
    let j;
    let obj = JSON.parse(localStorage.getItem('topics'))
    for (x in obj.topics){
        let topic = obj.topics[x]
        if (topic.id == id){
            j = i;
        } else{
            i++
        }
    }
    return j
}

export {createTopic, getNextId, saveTopics, loadTopics, getTopicById, getPositionInJson}