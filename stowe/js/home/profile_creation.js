
'use strict';

//var profile = {
//    'user_email' : '', // NOT NULL
//    'first_name' : '', // NOT NULL
//    'last_name' : '', // NOT NULL
//    'password' : '', // NOT NULL
//    'linkedin_url' : '',
//    'skills' : '',
//    'occupation' : '',
//    'gender' : '',
//    'profile_img' : '',
//    'objective' : ''
//};

function getFields () { // these might need input in front
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
        profile.profile_img = ""; // TODO need to use a button to select
        profile.objective = $('textarea[name="objective"]:checked').val();
    });
    return profile;
}

function validate () {
    var valid = true;
    var error_msg = {};
    var profile = getFields();

    // check password
    // check for NOT NULL fields
    // check for white space only

    // if checks pass, set next page to user_profile.html
    // if checks fail, set next page to profileCreation.html and repopulate the fields

    if (profile.password !== $('input[name="password_confirm"]').val()) {
        valid = false
        error_msg.password =  "Passwords do not match.  ";
    }
    if () { // check required fields for "" or whitespace
        valid = false;
        error_msg.requiredFields = "Required fields are not all filled out";
    }


    if (valid) {
        window.location.href = "dashboard/dashboard.html";
    }
    else {
        window.location.href = "profileCreation.html";
        repopulate(profile);
    }
}

function repopulate(profile) {
    // TODO repoulate window fields here
}
