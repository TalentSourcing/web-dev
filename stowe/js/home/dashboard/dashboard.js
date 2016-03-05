'use strict';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

var dashboardStorage;
if ((dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'))) === null) {
    dashboardStorage = {
        'user_email' : 'd.lindskog1@gmail.com', // TODO this should be received from previous page
        'userProfile' : '',
        'appliedGroups' : [],
        'joinedGroups' : []
    };
    sessionStorage.setItem('dashboard', JSON.stringify(dashboardStorage));
}


function getJoinedGroups() {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var user_email = dashboardStorage.user_email;
    console.log(user_email);
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
            }
            else {
                dashboardStorage.joinedGroups = response;
                sessionStorage.setItem('dashboard', JSON.stringify(dashboardStorage));
                populateJoinedGroupsList(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_JOINED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function populateJoinedGroupsList(groups_list) {
    $(document).ready(function () {
        groups_list.forEach(function (group) {
            console.log(group.group_name);
            var joinedGroup =
                '<div class="individualGrp">' +
                    '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink"' +
                            ' onclick="openGroup(' + group.group_id + ')">' +
                        '<div>' +
                            '<label class="group_id" style="display: none;">' + group.group_id + '</label>' +
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
 * Call this when navigating to chat page from dashboard.  This will search for an existing chat sessionStorage item, or
 * create a new one and save the current user's email address in it.  The email address can then be accessed by the chat
 * page and used to populate the necessary fields.
 */
function openChat () {
    var chatStorage;
    if ((chatStorage = JSON.parse(sessionStorage.getItem('chat'))) === null) {
        chatStorage = {'user_email' : ''};
    }
    chatStorage.user_email = (JSON.parse(sessionStorage.getItem('dashboard'))).user_email;
    sessionStorage.setItem('chat', JSON.stringify(chatStorage));
}

function openGroupChat (group_id) {

}

function openGroup (group_id) {
    var groupStorage;
    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
        groupStorage = {
            'user_email' : '',
            'group_id' : ''
        };
    }
    groupStorage.user_email = (JSON.parse(sessionStorage.getItem('dashboard'))).user_email;
    groupStorage.group_id = group_id;
    sessionStorage.setItem('group', JSON.stringify(groupStorage));
}

function leaveGroup (group_id) {

}

function cancelGroupApplication (group_id) {

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

getJoinedGroups();

