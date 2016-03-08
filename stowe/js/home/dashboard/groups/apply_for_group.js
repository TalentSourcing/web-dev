'use strict';

const APPLY_FOR_GROUP = "apply_for_group";

function applyForGroup (user_email, group_id) {
    var request = {
        'user_email' : user_email,
        'group_id' : group_id
    };
    // send request to php
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
    xmlhttp.open("GET","../../../../php/apply_for_group.php?" + APPLY_FOR_GROUP + "=" + str_rot13(JSON.stringify(request)), true);
    xmlhttp.send();
}

/**
 * Returns json embedded in a string
 * @param string {string}
 * @returns {string}
 */
function extractJSONObject (string) {
    var curly = string.indexOf('{');
    var bracket = string.indexOf('[');

    if (curly < 0 && bracket < 0) {
        return "no json in string";
    }
    if (curly < bracket || bracket < 0) {
        return string.substring(curly);
    }
    else if (bracket < curly || curly < 0) {
        return string.substring(bracket);
    }
}