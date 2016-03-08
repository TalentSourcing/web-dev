
'use strict';


const UPDATE_GROUP = "update_group";

function geteditgroupFields () {
    var editgroupprofile = {};
    $(document).ready(function () {
        editgroupprofile.group_title = $('input[name="group_name"]').val();
        editgroupprofile.about_info = $('input[name="about"]').val();
        editgroupprofile.skill_list = $('input[name="desired_skills]').val();
        editgroupprofile.experience_list = $('input[name="experience"]').val();

    });


    sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("editgroupprofile obj: " + JSON.stringify(profile));
    return editgroupprofile;
}

//function validate () {
//    var valid = true;
//    var error_msg = {
//        'requiredFields' : "",
//        'password' : ""
//    };
    var profile = getFields();



    if (valid) {
        sessionStorage.removeItem('saved_state');

        // send profile to php
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET","../../php/Group.php?" + UPDATE_GROUP + "=" + JSON.stringify(editgroupprofile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
//}
