
'use strict';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

const JOINED_GROUP_TEMPLATE =
    '<div class="individualGrp">' +
        '<label class="groupIn_id" style="display: none;"></label>' +
        '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink">' +
            '<div id="groupIn1">' +
                '<div class="icon">' +
                    '<img src="../../../image/home/groupIn1.jpg" class="groupInIcon" alt="Group in 1">' +
                '</div>' +
                '<div class="content">' +
                    '<p class="groupInContent"></p>' +
                '</div>' +
                '<div class="groupButtons">' +
                    '<button onclick="">Chat</button>' +
                    '<button onclick="">Leave</button>' +
                '</div>' +
            '</div>' +
        '</a>' +
    '</div>';

function getJoinedGroups() {
    var user_email = $('#user_email').text();
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log("raw response: " + xmlhttp.responseText);
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log(json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log(response.error);
                // TODO do not generate any groups
            }
            else {
                // TODO populate joined groups list
                populateJoinedGroupsList(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_JOINED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function populateJoinedGroupsList(groups_list) {
    console.log("success!");
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

getJoinedGroups();
