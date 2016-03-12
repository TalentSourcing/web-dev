'use strict';

const DASHBOARD_KEY = 'dashboard';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const GET_CREATED_GROUPS = "get_created_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

const PROFILE_KEY = 'profile';

var dashboardStorage;

function getProfile () {
    //var dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
    var user_email = dashboardStorage.user_email;
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("getProfile: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("getProfile: " + response.error);
            }
            else {
                dashboardStorage.userProfile = response;
                populateProfile(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_USER_PROFILE + "=" + user_email, true);
    xmlhttp.send();
}

function populateProfile (user) {
    $(document).ready(function () {
        var pic = $('#pic');
        pic.click(function () {
            openProfile(user.user_email);
        });

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
        $('#profilePic').attr('src', "../../../image/" + user.profile_img);
    });
}

function getJoinedGroups() {
    //var dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
    var user_email = dashboardStorage.user_email;
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("getJoinedGroups: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("getJoinedGroups: " + response.error);
            }
            else {
                dashboardStorage.joinedGroups = response;
                //sessionStorage.setItem(DASHBOARD_KEY, JSON.stringify(dashboardStorage));
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
            //if (group.group_img === "") {
            //    group.group_img = "default-placeholder.png";
            //}
            var joinedGroup =
                '<div class="individualGrp">' +
                    '<div>' +
                        '<div class="icon">' +
                            '<img src="../../../image/'+ group.group_img +'" class="groupInIcon" alt="img">' +
                        '</div>' +
                        '<div class="content">' +
                            '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupInLink"' +
                            ' onclick="openGroup('+ group.group_id +')">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</a>' +
                        '</div>' +
                        '<div class="groupButtons">' +
                            '<a href="../../../html/home/dashboard/chat/Chat_test_html.html"><button onclick="openGroupChat('+ group.group_id +')">Chat</button></a>' +
                            '<a><button onclick="leaveGroup('+ group.group_id +')">Leave</button></a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#groupsIn').append(joinedGroup);
        });
    });
}

function getAppliedGroups () {
    //var dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
    var user_email = dashboardStorage.user_email;
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("getAppliedGroups: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("getAppliedGroups: " + response.error);
            }
            else {
                dashboardStorage.appliedGroups = response;
                //sessionStorage.setItem(DASHBOARD_KEY, JSON.stringify(dashboardStorage));
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
            //if (group.group_img === "") {
            //    group.group_img = "default-placeholder.png";
            //}
            var appliedGroup =
                '<div class="individualGrp">' +
                    '<div>' +
                        '<div class="icon">' +
                            '<img src="../../../image/'+ group.group_img +'" class="groupAppliedIcon" alt="img">' +
                        '</div>' +
                        '<div class="content">' +
                            '<a href="../../../html/home/dashboard/groups/view_group_external.html" class="groupAppliedLink"' +
                            ' onclick="openGroup('+ group.group_id +')">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</a>' +
                        '</div>' +
                        '<div class="groupButtons">' +
                            '<a><button onclick="cancelApp('+ group.group_id +')">Cancel Application</button></a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#groupsApplied').append(appliedGroup);
        });
    });
}

function getCreatedGroups () {
    var user_email = dashboardStorage.user_email;
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("getCreatedGroups: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("getCreatedGroups: " + response.error);
            }
            else {
                dashboardStorage.createdGroups = response;
                populateCreatedGroups(response);
            }
        }
    };
    xmlhttp.open("GET","../../../php/user.php?" + GET_CREATED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function populateCreatedGroups (groups_list) {
    $(document).ready(function () {
        groups_list.forEach(function (group) {
            //if (group.group_img === "") {
            //    group.group_img = "default-placeholder.png";
            //}
            var createdGroup =
                '<div class="individualGrp">' +
                    '<div>' +
                        '<div class="icon">' +
                            '<img src="../../../image/'+ group.group_img +'" class="createGroupIcon" alt="img">' +
                        '</div>' +
                        '<div class="content">' +
                            '<a href="../../../html/home/dashboard/groups/edit_group.html" class="createGroupLink"' +
                            ' onclick="editGroup('+ group.group_id +')">' +
                                '<p class="groupInContent">' + group.group_name + '</p>' +
                            '</a>' +
                        '</div>' +
                        '<div class="groupButtons">' +
                            '<a href="../../../html/home/dashboard/chat/Chat_test_html.html"><button onclick="openGroupChat('+ group.group_id +')">Chat</button></a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            $('#groupsCreated').append(createdGroup);
        });
    });
}

function openProfile(user_email) {
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify({'user_email' : user_email}));
}

/**
 * Call this when navigating to chat page from dashboard.  This will search for an existing chat sessionStorage item, or
 * create a new one and save the current user's email address in it.  The email address can then be accessed by the chat
 * page and used to populate the necessary fields.
 */
function openChat () {
    var chatStorage = {'user_email' : (JSON.parse(sessionStorage.getItem(DASHBOARD_KEY))).user_email};
    sessionStorage.setItem('chat', JSON.stringify(chatStorage));
}

function openGroupChat (group_id) {
    var chatStorage = {
        'user_email' : '',
        'group_id' : ''
    };
    chatStorage.user_email = (JSON.parse(sessionStorage.getItem(DASHBOARD_KEY))).user_email;
    chatStorage.group_id = group_id;
    sessionStorage.setItem('chat', JSON.stringify(chatStorage));
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("openGroupChat: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("openGroupChat: " + response.error);
            }
            else {
                console.log("open group chat success");
            }
        }
    };
    xmlhttp.open("GET","../../../html/home/dashboard/chat/Chat_test_html.html?" + "sender_data=" + JSON.stringify(chatStorage), true);
    xmlhttp.send();
}

function openGroup (group_id) {
    var groupStorage;
    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
        groupStorage = {
            'user_email' : '',
            'group_id' : ''
        };
    }
    groupStorage.user_email = (JSON.parse(sessionStorage.getItem(DASHBOARD_KEY))).user_email;
    groupStorage.group_id = group_id;
    sessionStorage.setItem('group', JSON.stringify(groupStorage));
}

function editGroup (group_id) {
    var editGroupStorage = {
        'group_id' : group_id
    };
    sessionStorage.setItem('edit_group', JSON.stringify(editGroupStorage));
    window.location.href = "../../../html/home/dashboard/groups/edit_group.html";
}

function leaveGroup (group_id) {
    var dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
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
            console.log("leavGroup: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("leaveGroup: " + response.error);
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

function cancelApp (group_id) {
    //var dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
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
            console.log("cancelApp: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("cancelApp: " + response.error);
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
    sessionStorage.setItem(DASHBOARD_KEY, JSON.stringify(dashboardStorage));
    var data = {
        'pending' : dashboardStorage.appliedGroups,
        'accepted' : dashboardStorage.joinedGroups
    };
    sessionStorage.setItem('groups_applied', JSON.stringify(data));
}

function openGroupsJoined () {
    console.log(dashboardStorage.joinedGroups);
    sessionStorage.setItem(DASHBOARD_KEY, JSON.stringify(dashboardStorage));
    sessionStorage.setItem('groups_current', dashboardStorage.user_email);
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


$(document).ready(function () {
    dashboardStorage = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));

    getProfile();
    getCreatedGroups();
    getJoinedGroups();
    getAppliedGroups();

    console.log(dashboardStorage);
});

