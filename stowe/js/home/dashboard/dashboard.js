'use strict';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

if (sessionStorage.getItem('dashboard') === null) {
    var dashboardStorage = {
        'user_email' : 'd.lindskog1@gmail.com', // TODO this should be received from previous page
        'userProfile' : {},
        'appliedGroups' : [],
        'joinedGroups' : []
    };
    sessionStorage.setItem('dashboard', JSON.stringify(dashboardStorage));
}


function getProfile () {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var user_email = dashboardStorage.user_email;
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
                populateProfile(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_USER_PROFILE + "=" + user_email, true);
    xmlhttp.send();
}

/**
 * user_email
 * first_name
 * last_name
 * password
 * linkedin_url
 * skills
 * occupation
 * gender
 * profile_img
 * objective
 */
function populateProfile (user) {
    $(document).ready(function () {
        var p1 = $('#p1');
        var p2 = $('#p2');
        p1.text(user.first_name + " " + user.last_name);
        p1.append('<br>');
        p2.text(user.occupation);
        p2.append('<br>');

        var profile = $('#profile');
        profile.append('Skills: ' + user.skills);
        profile.append('');

        if (user.profile_img === "") {
            user.profile_img = "../../../image/default-placeholder.png";
        }
        $('#profilePic').attr('src', user.profile_img);
    });
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
            if (group.group_img === "") {
                group.group_img = "../../../image/default-placeholder.png";
            }
            var joinedGroup =
                '<div class="individualGrp">' +
                    '<div>' +
                        '<div class="icon">' +
                            '<img src="../../../image/home/groupIn1.jpg" class="groupInIcon" alt="img">' +
                        '</div>' +
                        '<div class="content">' +
                            '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink"' +
                            ' onclick="openGroup('+ group.group_id +')">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</a>' +
                        '</div>' +
                        '<div class="groupButtons">' +
                            '<a href="../../../php/chat1.php"><button onclick="openGroupChat('+ group.group_id +')">Chat</button></a>' +
                            '<a><button onclick="leaveGroup('+ group.group_id +')">Leave</button></a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#groupsIn').append(joinedGroup);
        });
    });
}

function getAppliedGroups () {
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
                dashboardStorage.appliedGroups = response;
                sessionStorage.setItem('dashboard', JSON.stringify(dashboardStorage));
                populateAppliedGroups(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_APPLIED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function populateAppliedGroups (groups_list) {
    $(document).ready(function () {
        groups_list.forEach(function (group) {
            if (group.group_img === "") {
                group.group_img = "../../../image/default-placeholder.png";
            }
            var joinedGroup =
                '<div class="individualGrp">' +
                    '<div>' +
                        '<div class="icon">' +
                            '<img src="../../../image/home/groupIn1.jpg" class="groupInIcon" alt="img">' +
                        '</div>' +
                        '<div class="content">' +
                            '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink"' +
                            ' onclick="openGroup('+ group.group_id +')">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</a>' +
                        '</div>' +
                        '<div class="groupButtons">' +
                            '<a><button onclick="cancelApp('+ group.group_id +')">Cancel Application</button></a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#groupsApplied').append(joinedGroup);
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
    window.location.href = "../../../php/home/dashboard/chat/chat1.php?" + "sender_data=" + JSON.stringify(chatStorage);
}

function openGroupChat (group_id) {
    var chatStorage;
    if ((chatStorage = JSON.parse(sessionStorage.getItem('chat'))) === null) {
        chatStorage = {
            'user_email' : '',
            'group_id' : ''
        };
    }
    chatStorage.user_email = (JSON.parse(sessionStorage.getItem('dashboard'))).user_email;
    chatStorage.group_id = group_id;
    sessionStorage.setItem('chat', JSON.stringify(chatStorage));
    window.location.href = "../../../php/home/dashboard/chat/chat1.php?" + "sender_data=" + JSON.stringify(chatStorage);
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
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var request = {
        'user_email' : dashboardStorage.user_email,
        'group_id' : group_id
    };
    console.log('leaveGroup group_id: ' + group_id);
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
                alert('Leave group success!');
                // reload the page
                window.location.href = "../../../html/home/dashboard/dashboard.html";
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + LEAVE_GROUP + "=" + JSON.stringify(request), true);
    xmlhttp.send();
}

// TODO delete this when chuan has successfully integrated it
function applyForGroup (group_id) {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var request = {
        'user_email' : dashboardStorage.user_email,
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
            }
            else {
                alert('Group application success!');
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + APPLY_FOR_GROUP + "=" + JSON.stringify(request), true);
    xmlhttp.send();
}

// TODO this is not working right
function cancelApp (group_id) {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var request = {
        'user_email' : dashboardStorage.user_email,
        'group_id' : group_id
    };
    console.log('cancel application group_id: ' + group_id);
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
                alert('Cancelled group application!');
                // reload the page
                window.location.href = "../../../html/home/dashboard/dashboard.html";
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + CANCEL_GROUP_APPLICATION + "=" + JSON.stringify(request), true);
    xmlhttp.send();
}

function openGroupsApplied () {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    var data = {
        'pending' : dashboardStorage.appliedGroups,
        'accepted' : dashboardStorage.joinedGroups
    };
    sessionStorage.setItem('groups_applied', JSON.stringify(data));
}

function openGroupsJoined () {
    var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
    sessionStorage.setItem('groups_current', JSON.stringify(dashboardStorage.joinedGroups));
}

/**
 * Returns json embedded in a string
 * @param string {string}
 * @returns {string}
 */
function extractJSONObject (string) { // TODO make return the message too
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

getProfile();
getJoinedGroups();
getAppliedGroups();
