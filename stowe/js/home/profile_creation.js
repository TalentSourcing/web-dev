
'use strict';

// request types: create_user, update_user, delete_user
const CREATE_USER = "create_user";

function getProfilePic(imgPath)
{
	if (imgPath.files && imgPath.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#profile_img')
                    .attr('src', e.target.result)
                    .width(250)
                    .height(250);
            };

            reader.readAsDataURL(imgPath.files[0]);
        }
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
//        profile.profile_img = ""; // TODO need to use a button to select
//        var img_str = $('#profile_img').attr('src');
//        img_str = img_str.substring(img_str.lastIndexOf('image/') + 6);
        profile.profile_img = "";
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
        xmlhttp.open("GET","../../php/user_profile.php?" + CREATE_USER + "=" + JSON.stringify(profile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
}

