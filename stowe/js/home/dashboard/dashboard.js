
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
    var user_email = 'd.lindskog1@gmail.com';
    console.log(user_email);
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log("raw response: " + xmlhttp.responseText);
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log(json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log(response.error);
            }
            else {
                populateJoinedGroupsList(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_JOINED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function populateJoinedGroupsList(groups_list) {
    $(document).ready(function () {
        //$('#groupsIn').append(JOINED_GROUP_TEMPLATE);
        groups_list.forEach(function (group) {
            var joinedGroupTemplate =
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
        });
    });
}

/**
 * Returns json embedded in a string
 * @param string {string}
 * @returns {string}
 */
function extractJSONObject (string) {
    var curly = string.indexOf('{');
    var bracket = string.indexOf('[');
    if (curly < bracket) {
        return string.substring(curly);
    }
    else {
        return string.substring(bracket);
    }
}

//$('#user_email').text('d.lindskog1@gmail.com');
getJoinedGroups();

