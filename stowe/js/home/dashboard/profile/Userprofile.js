/**
 * Created by davidlindskog on 3/2/16.
 */

// php requests:
const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "apply_for_group";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

function getUserProfile (user_email) {
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log(json_str); // print json to console
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log(response.error);
            }
            else {
                populateProfile(response);
            }
        }
    };
    xmlhttp.open("GET","../../../../php/user.php?" + GET_USER_PROFILE + "=" + user_email, true);
    xmlhttp.send();
}

function populateProfile (user_data) {

}

/**
 * Returns json embedded in a string
 * @param string {string}
 * @returns {string}
 */
function extractJSONObject (string) {
    var json_start = string.indexOf('{');
    var json_end = string.indexOf('}');
    return string.substring(json_start, json_end + 1);
}

getUserProfile('s');