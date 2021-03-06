'use strict';

const APPROVE_USER = "approve_user";

function approveUser (user_email, group_id, user_role) {
    var request = {
        'user_email' : user_email,
        'group_id' : group_id,
        'user_role' : user_role
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
                alert('User approval success!');
            }
        }
    };
    xmlhttp.open("GET","http://localhost/Group.php?" + user_role + "=" + str_rot13(JSON.stringify(request)), true);
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
