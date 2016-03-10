
'use strict';

// request types: create_user, update_user, delete_user
const UPDATE_USER = "update_user";
const GET_USER_PROFILE = "get_user_profile";
const EDIT_PROFILE_KEY = 'edit_profile';

function getProfileData(user_email) {
    // send profile to php
    var response = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_str = extractJSONObject(xmlhttp.responseText);
            console.log("edit_profile: " + json_str);
            response = JSON.parse(json_str);
            if ('error' in response) {
                console.log("getAppliedGroups: " + response.error);
            }
            else {
                populateForms(response);
            }
        }
    };
    xmlhttp.open("GET","../../php/user.php?" + GET_USER_PROFILE + "=" + user_email, true);
    xmlhttp.send();
}

function populateForms(profile) {
    $(document).ready(function () {
        $('input[name="email"]').val(profile.user_email);
        $('input[name="firstname"]').val(profile.first_name);
        $('input[name="lastname"]').val(profile.last_name);
        $('input[name="password"]').val(profile.password);
        $('input[name="linkedin"]').val(profile.linkedin_url);
        $('textarea[name="skills"]').val(profile.skills);
        $('input[name="occupation"]').val(profile.occupation);
        $('input[name="gender"]:checked').val(profile.gender);
        if (profile.profile_img === "") {
            profile.profile_img = "Chat_Images/default-placeholder.png";
        }
        $('#profile_img').attr('src', '../../image/' + profile.profile_img);
        $('textarea[name="objective"]:checked').val(profile.objective);
    });
}

function getFields () {
    var profile = {};
    $(document).ready(function () {
        profile.user_email = $('input[name="email"]').val();
        profile.first_name = $('input[name="firstname"]').val();
        profile.last_name = $('input[name="lastname"]').val();
        profile.password = $('input[name="password"]').val();
        profile.linkedin_url = $('input[name="linkedin"]').val();
        profile.skills = $('textarea[name="skills"]').val();
        profile.occupation = $('input[name="occupation"]').val();
        profile.gender = $('input[name="gender"]:checked').val();
        var img_str = $('#profile_img').attr('src');
        img_str = img_str.substring(img_str.lastIndexOf('image/') + 6);
        profile.profile_img = img_str;
        profile.objective = $('textarea[name="objective"]:checked').val();
    });
    // convert whitespace to ""
    for (var key in profile) {
        if (profile.hasOwnProperty(key) && !/\S/.test(profile[key])) {
            profile[key] = "";
        }
    }
    sessionStorage.setItem('saved_state', JSON.stringify(profile));
    console.log("profile obj: " + JSON.stringify(profile));
    return profile;
}

function validate () {
    var valid = true;
    var error_msg = {
        'requiredFields' : "",
        'password' : ""
    };
    var profile = getFields();

    // check required fields for strings that have at least one non-whitespace character
    if (!/\S/.test(profile.user_email) || !/\S/.test(profile.first_name) ||
        !/\S/.test(profile.last_name) || !/\S/.test(profile.password)) {
        valid = false;
        error_msg.requiredFields = "Required fields are not all filled out";
    }
    if (profile.password !== $('input[name="password_confirm"]').val()) {
        valid = false;
        error_msg.password = "Passwords do not match.  ";
    }

    // if checks pass, go to dashboard, else stay on same page to fix problems
    if (valid) {
        sessionStorage.removeItem('saved_state');

        // send profile to php
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
                window.location.href = "dashboard/dashboard.html";
            }
        };
        xmlhttp.open("GET","../../php/user_profile.php?" + UPDATE_USER + "=" + JSON.stringify(profile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
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
    var editProfile = JSON.parse(sessionStorage.getItem(EDIT_PROFILE_KEY));
    getProfileData(editProfile.user_email);
});
