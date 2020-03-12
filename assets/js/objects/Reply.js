class Reply {
    constructor(id, idTopic, content, author, createdDate, array){
        this.id = id;
        this.idtopic = idTopic;
        this.content = content;
        this.author = author;
        this.createdDate = createdDate;
        array.push(this)
    }
    getId() {
        return `${this.id}`
    }

    getIdTopic() {
        return `${this.idtopic}`
    }

    getContent() {
        return `${this.content}`
    }

    getAuthor() {
        return `${this.author}`
    }

    getCreatedDate() {
        return `${this.createdDate}`
    }
}

export {Reply}