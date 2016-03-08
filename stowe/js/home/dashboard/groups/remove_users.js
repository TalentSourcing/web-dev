'use strict';

$document.ready(function()){

    function remove1(removeme1){
    /*
    var parent = document.getElementById("list_applicants");
    var child = document.getElementById("deleteme1");
    parent.removeChild(child);
    */

    document.getElementById("removeme1").innerHTML = "User has been removed";
    }


    function remove2(removeme2){
        /*
        var parent = document.getElementById("list_applicants");
        var child = document.getElementById("deleteme2");
        parent.removeChild(child);
        */
        document.getElementById("removeme1").innerHTML = "User has been removed";
    }

    function remove3(removeme3){
        var parent =    document.getElementById("list_applicants");
        var child = document.getElementById("removeme3");
        parent.removeChild(child);
    }

    function remove4(removeme4){
        var parent = document.getElementById("list_applicants");
        var child = document.getElementById("removeme4");
        parent.removeChild(child);
    }
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
                alert('Group application success!');

            }
        }
    };
    xmlhttp.open("GET","http://localhost/apply_for_group.php?" + APPLY_FOR_GROUP + "=" + str_rot13(JSON.stringify(request)), true);
    xmlhttp.send();
}
