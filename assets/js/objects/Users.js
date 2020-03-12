class Users {
    constructor(pseudo, password, email, nom, prenom, sexe, age, ville, array) {
        this.pseudo = pseudo;
        this.password = password;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.age = age;
        this.ville = ville;
        array.push(this)
    }

    getPseudo(){
        return `${this.pseudo}`;
    }
    getPassword(){
        return `${this.password}`;
    }
    getEmail() {
        return `${this.email}`;
    }
    getNom(){
        return `${this.nom}`;
    }
    getPrenom(){
        return `${this.prenom}`;
    }
    getSexe(){
        return `${this.sexe}`;
    }
    getAge(){
        return `${this.age}`;
    }
    getVille(){
        return `${this.ville}`;
    }

}

export {Users}