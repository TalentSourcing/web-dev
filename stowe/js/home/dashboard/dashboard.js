'use strict';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

if (sessionStorage.getItem('dashboard') !== null) {
    sessionStorage.removeItem('dashboard');
}
sessionStorage.setItem('dashboard', JSON.stringify({
    'user_email' : 'd.lindskog1@gmail.com',
    'userProfile' : '',
    'appliedGroups' : [],
    'joinedGroups' : []
}));

function getJoinedGroups() {
    var dashboard = JSON.parse(sessionStorage.getItem('dashboard'));
    var user_email = dashboard.user_email;
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
                (JSON.parse(sessionStorage.getItem('dashboard'))).joinedGroups = response;
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
            console.log(group.group_name);
            var joinedGroup =
                '<div class="individualGrp">' +
                    '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink">' +
                        '<div id="groupIn1">' +
                            '<div class="icon">' +
                                '<img src="../../../image/home/groupIn1.jpg" class="groupInIcon" alt="Group in 1">' +
                            '</div>' +
                            '<div class="content">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</div>' +
                            '<div class="groupButtons">' +
                                '<button onclick="">Chat</button>' +
                                '<button onclick="">Leave</button>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</div>';
            $('#groupsIn').append(joinedGroup);
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

