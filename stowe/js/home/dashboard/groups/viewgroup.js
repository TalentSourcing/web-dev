
// php requests:
const GET_GROUP_VIEW = "get_group_view";
const APPLY_FOR_GROUP = "apply_for_group";

function getGroupView (group_id) {
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
                populateGroupView(response);
            }
        }
    };
    xmlhttp.open("GET","../../../../php/Group.php?" + GET_GROUP_VIEW + "=" + group_id, true);
    xmlhttp.send();
}

function populateGroupView (group_data) {
    $(document).ready(function () {
        $('#group_data').text(JSON.stringify(group_data)); // store user data right on the page
        $('#img_group').attr('src', '../../../../image/' + group_data.group_img);//image id must be changed in html
        $('#group_name').text(group_data.group_name); // first + last
        $('#about').text( group_data.about);

        if (group_data.desired_skills !== "") {
            group_data.desired_skills.split(/\s/).forEach(function (skill) {
                $('#desired_skills').append("<li>" + skill + "</li>");
            });
        }

        $('#button_apply').click(function () {
            apply(group_data.group_id);
        });
    });
}

function apply(group_id) {
    var request = {
        'user_email' : JSON.parse(sessionStorage.getItem('hostEmail')),
        'group_id' : group_id
    };

    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log(json_str); // print json to console
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log(response.error);
                alert('You are either already in this group or have already applied for it!');
            }
            else {
                console.log('Group apply success!');
                alert('Group application success!');
                window.location.href = "../../../../html/home/dashboard/dashboard.html";
            }
        }
    };
    xmlhttp.open("GET","../../../../php/user.php?" + APPLY_FOR_GROUP + "=" + JSON.stringify(request), true);
    xmlhttp.send();
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

/*
get group id and user_email from previous page.  Group storage item should contain whatever data is needed for this page
to work.  Right now, dashboard is passing user_email and group_id in th
 */
$(document).ready(function () {
    var groupStorage;
    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
        console.log('Error!!  No group data passed from previous page');
    }
    else {
        console.log('group_id passed from dashboard: ' + groupStorage.group_id);
        getGroupView(groupStorage.group_id);
    }
});