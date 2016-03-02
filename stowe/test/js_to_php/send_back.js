/**
 * Created by davidlindskog on 3/2/16.
 */

var obj = {
    'name' : 'David',
    'age' : '26'
};

function sendBack() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET","receive.php?obj=" + JSON.stringify(obj), true);
    xmlhttp.send();
}