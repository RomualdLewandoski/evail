
function empty(data) {
    if (typeof (data) == 'number' || typeof (data) == 'boolean') {
        return false;
    }
    if (typeof (data) == 'undefined' || data === null) {
        return true;
    }
    if (typeof (data.length) != 'undefined') {
        return data.length == 0;
    }
    var count = 0;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            count++;
        }
    }
    return count == 0;
}

function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function timestampToReadable(timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear();
    let month = date.getMonth();
    let months = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
    let d = date.getDate();
    let day = date.getDay();
    let days = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
    let h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    let m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    let s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    let dateStr = '' + days[day] + ' ' + d  + ' ' + months[month] + ' ' + year + ' ' + h + ':' + m + ':' + s;
    return dateStr
}

export {empty, validateEmail, timestampToReadable}