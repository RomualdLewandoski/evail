var template = `    <nav class="nav navbar bg-dark text-white"> <!-- menu simple -->
        <a class="nav-link" href="index.html">J-Forum</a>
        <a class="nav-link" id="date">Date ici</a>
        <a class="nav-link" id="logoutBtn" href="#">Déconnexion</a>
    </nav>
    
`;

export default function () {
    return{
        view: template
    }
}