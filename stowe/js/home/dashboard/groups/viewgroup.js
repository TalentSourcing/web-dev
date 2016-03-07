
// php requests:
const GET_GROUP_VIEW = "get_group_view";

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
        $('#group_img').text(group_data.group_img);//image id must be changed in html
        $('#group_name').text(group_data.group_name); // first + last
        $('#about').text( group_data.linkedin_url);

        group_data.desired_skills.split(/\s/).forEach(function (desired_skills) {
            $('#desired_skills').append("<li>" + skill + "</li>");
        });

        // TODO no such table column called 'experience'.  Need to populate list based on available data, or no items if there isn't any data

        //group_data.experience.split(/\s/).forEach(function (skill) {
        //    $('#experience_skill_list').append("<li>" + skill + "</li>");
        //});

    });
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

//getGroupView(4);

/*
get group id and user_email from previous page.  Group storage item should contain whatever data is needed for this page
to work.  Right now, dashboard is passing user_email and group_id in th
 */
//$(document).ready(function () { // this is giving the previous page time to set the variables
//    var groupStorage;
//    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
//        console.log('Error!!  No group data passed from previous page');
//    }
//    else {
//        console.log('group_id passed from dashboard: ' + groupStorage.group_id);
//        getGroupView(groupStorage.group_id);
//    }
//});

getGroupView ('4');