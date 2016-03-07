
'use strict';

// request types: create_user, update_user, delete_user
const CREATE_GROUP = "create_group";

function getFields () {
    var groupprofile = {};
    $(document).ready(function () {
        groupprofile.group_title = $('input[name="group_title"]').val();
        groupprofile.about_info = $('input[name="about"]').val();
        groupprofile.skill_list = $('input[name="desired_skills"]').val();
        groupprofile.experience_list = $('input[name="experience"]').val();

    });


    sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("groupprofile obj: " + JSON.stringify(groupprofile));
    return groupprofile;
}

function validate () {
    var valid = true;
    var error_msg = {
        'requiredFields' : "",
        'password' : ""
    };
    var groupprofile = getFields();


    // if checks pass, go to dashboard, else stay on same page to fix problems
    if (valid) {
        sessionStorage.removeItem('saved_state');

        // send profile to php
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET","../../php/Group.php?" + CREATE_USER + "=" + JSON.stringify(groupprofile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
}
