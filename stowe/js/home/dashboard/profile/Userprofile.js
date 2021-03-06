'use strict';


// php requests:
const GET_USER_PROFILE = "get_user_profile";

const PROFILE_KEY = 'profile';
const HOST_EMAIL_KEY = 'hostEmail';
const EDIT_PROFILE_KEY = 'edit_profile';

function getUserProfile (user_email) {
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
                populateProfile(response);
            }
        }
    };
    xmlhttp.open("GET","../../../../php/user.php?" + GET_USER_PROFILE + "=" + user_email, true);
    xmlhttp.send();
}

function populateProfile (user_data) {
    $(document).ready(function () {
        var host_email = JSON.parse(sessionStorage.getItem(HOST_EMAIL_KEY));
        if (user_data.user_email === host_email) {
            var editProfileButton = $('#edit_profile_button');
            editProfileButton.show();
            editProfileButton.click(function () {
                openEditProfile(user_data.user_email);
            });
        }
        else {
            $('#edit_profile_button').hide();
        }

        $('#user_data').text(JSON.stringify(user_data)); // store user data right on the page
        $('#user_email').text(user_data.user_email);
        $('#name').text(user_data.first_name + " " + user_data.last_name); // first + last
        $('#linkedin_url').attr('href', "http://" + user_data.linkedin_url);

        user_data.skills.split(/\s/).forEach(function (skill) {
            $('#skills').append("<li>" + skill + "</li>");
        });

        $('#occupation').text(user_data.occupation);
        $('#profile_img').attr("src", "../../../../image/" + user_data.profile_img);
        $('#objective').text(user_data.objective);
    });
}

function openEditProfile (user_email) {
    sessionStorage.setItem(EDIT_PROFILE_KEY, JSON.stringify({'user_email' : user_email}));
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


$(document).ready(function () {
    // TODO email address needs to be passed to this from search.js.
    var profile = JSON.parse(sessionStorage.getItem(PROFILE_KEY));
    getUserProfile(profile.user_email);
});