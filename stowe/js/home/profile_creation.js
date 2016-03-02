
'use strict';

// this might have to become a get/post from html instead

repopulate();

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
    sessionStorage.setItem('saved_state', JSON.stringify(profile));
    console.log("profile obj: " + JSON.stringify(profile));
    return profile;
}

function validate () {
    var valid = true;
    var error_msg = {};
    var profile = getFields();

    // check required fields for strings that have at least one non-whitespace character
    if (!/S/.test(profile.user_email) || !/S/.test(profile.first_name) ||
        !/S/.test(profile.last_name) || !/S/.test(profile.password)) {
        valid = false;
        error_msg.requiredFields = "Required fields are not all filled out";
    }
    if (profile.password !== $('input[name="password_confirm"]').val()) {
        valid = false;
        error_msg.password = "Passwords do not match.  ";
    }

    // if checks pass, go to dashboard, else stay on same page to fix problems
    valid = true; // TODO delete this
    if (valid) {
        alert("Valid!");
        sessionStorage.removeItem('saved_state');

        // TODO create user in php

    }
    else {
        alert("Some fields not valid!\n" + JSON.stringify(error_msg));
        window.location.href = "profileCreation.html";
    }
}

function repopulate () {
    var state = null;
    if ((state = JSON.parse(sessionStorage.getItem('saved_state'))) === null) {
        console.log("no saved state found");
        return;
    }
    console.log("saved state found!\n" + JSON.stringify(state));
    $(document).ready(function () {
        $('input[name="email"]').val(state.user_email);
        $('input[name="firstname"]').val(state.first_name);
        $('input[name="lastname"]').val(state.last_name);
        $('input[name="password"]').val(state.password);
        $('input[name="linkedin"]').val(state.linkedin_url);
        $('textarea[name="skills"]').val(state.skills);
        $('input[name="occupation"]').val(state.occupation);
        $('input[name="gender"]:checked').val(state.gender);
        // TODO profile_img
        $('textarea[name="objective"]:checked').val(state.objective);
    });
}
