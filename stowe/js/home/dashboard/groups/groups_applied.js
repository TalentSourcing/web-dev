'use strict';

const GET_APPLIED_GROUPS = "get_applied_groups";

function getAppliedGroups () {
    var user_email = (JSON.parse(sessionStorage.getItem('hostEmail')));
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
                generateHtml(response);
            }
        }
    };
    xmlhttp.open("GET","../../../../php/user.php?" + GET_APPLIED_GROUPS + "=" + user_email, true);
    xmlhttp.send();
}

function generateHtml (appliedGroups) {
    $(document).ready(function () {
        if (appliedGroups === null) {
            console.log('No applied groups to display');
            // TODO print message to list
            return null;
        }

        var dashboardStorage = JSON.parse(sessionStorage.getItem('dashboard'));
        var groups = {
            'pending' : appliedGroups,
            'accepted' : dashboardStorage.joinedGroups
        };
        console.log(groups.accepted);

        var groups_list = $('.groups_list');
        groups.pending.forEach(function (group) {
            if (group.about === "") {
                group.about = "No info...";
            }
            if (group.group_img === "") {
                group.group_img = "default-placeholder.png";
            }
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html"' +
                            'onclick="openGroup('+ group.group_id +')">'+ group.group_name +'</a><br>' +
                        '<label class="label_subtext">'+ group.about +'</label>' +
                    '</div>' +
                    '<div class="list_icon pending">' +
                        '<label>pending</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
        groups.accepted.forEach(function (group) {
            if (group.about === "") {
                group.about = "No info...";
            }
            if (group.group_img === "") {
                group.group_img = "default-placeholder.png";
            }
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html"' +
                            'onclick="openGroup('+ group.group_id +')">'+ group.group_name +'</a><br>' +
                        '<label class="label_subtext">'+ group.about +'</label>' +
                    '</div>' +
                    '<div class="list_icon accepted">' +
                        '<label>accepted</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
    });
}

function openGroup (group_id) {
    var groupStorage;
    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
        groupStorage = {
            'group_id' : ''
        };
    }
    groupStorage.group_id = group_id;
    sessionStorage.setItem('group', JSON.stringify(groupStorage));
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


//generateHtml();
getAppliedGroups();