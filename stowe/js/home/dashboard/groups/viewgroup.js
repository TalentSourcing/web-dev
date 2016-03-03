
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
        $('#img_group').text(group_data.group_img);
        $('#group_title').text(group_data.group_name); // first + last
        $('#about_info').text( group_data.linkedin_url);

        group_data.skills.split(/\s/).forEach(function (skill) {
            $('#skill_list').append("<li>" + skill + "</li>");
        });
        group_data.experience.split(/\s/).forEach(function (skill) {
            $('#experience_skill_list').append("<li>" + skill + "</li>");
        });

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

getGroupView(4);