class Topic {
    constructor(id, title, content, author, createdDate, array) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdDate = createdDate;
        array.push(this)
    }

    getId() {
        return `${this.id}`
    }

    getTitle() {
        return `${this.title}`
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

export {Topic}