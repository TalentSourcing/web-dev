
'use strict';

// request types: create_user, update_user, delete_user
const EDIT_GROUP = "edit_group";

function geteditgroupFields () {
    var editgroupprofile = {};
    $(document).ready(function () {
        editgroupprofile.group_title = $('input[name="email"]').val();
        editgroupprofile.about_info = $('input[name="firstname"]').val();
        editgroupprofile.skill_list = $('input[name="lastname"]').val();
        editgroupprofile.experience_list = $('input[name="password"]').val();

    });


    sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("editgroupprofile obj: " + JSON.stringify(profile));
    return editgroupprofile;
}

function validate () {
    var valid = true;
    var error_msg = {
        'requiredFields' : "",
        'password' : ""
    };
    var profile = getFields();


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
        xmlhttp.open("GET","../../php/Group.php?" + EDIT_GROUP + "=" + JSON.stringify(editgroupprofile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
}
