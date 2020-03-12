function createReply(content, array) {
    let author = JSON.parse(sessionStorage.getItem('user')).user;
    let time = new Date().getTime()
    let id = getNextId();
    //todo get TopicId and create reply here
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

function saveReply() {

}

function loadReply() {

}

function getReplyByTopicId(id) {
    //WARNING: it ll return an array of OBJECT AND NOT AN OBJECT ALONE
}
