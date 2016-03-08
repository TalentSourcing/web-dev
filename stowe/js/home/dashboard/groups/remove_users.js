'use strict';

delete1(){
var parent = document.getElementById("list_invited");
var child = document.getElementById("deleteme1");
parent.removeChild(child);
}


delete2(){
var parent = document.getElementById("list_invited");
var child = document.getElementById("deleteme2");
parent.removeChild(child);
}

delete3(){
var parent = document.getElementById("list_invited");
var child = document.getElementById("deleteme3");
parent.removeChild(child);
}

delete4(){
var parent = document.getElementById("list_invited");
var child = document.getElementById("deleteme4");
parent.removeChild(child);
}


var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log(json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log(response.error);
                alert('Error: ' + response.error);
            }
            else {
                alert('User successfully removed!');

            }
        }
    };
    xmlhttp.open("GET","http://localhost/apply_for_group.php?" + APPLY_FOR_GROUP + "=" + str_rot13(JSON.stringify(request)), true);
    xmlhttp.send();
}
