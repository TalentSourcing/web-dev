'use strict';

// request types: create_user, update_user, delete_user
const EDIT_USER = "edit_user";

function getedituserFields () {
    var edituserprofile = {};
    $(document).ready(function () {
        edituserprofile.user_group_id = $('input[name="user_group_id"]').val();
        editgroupprofile.user_email = $('input[name="email"]').val();
        editgroupprofile.group_id = $('input[name="group_id"]').val();
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
        xmlhttp.open("GET","../../php/user.php?" + EDIT_GROUP + "=" + JSON.stringify(edituserprofile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
}

function deleteUser(){

    delete1(){
        var parent = document.getElementById("list_applicants");
        var child = document.getElementById("deleteme1");
        parent.removeChild(child);
    }


    delete2(){
        var elem = document.getElementById("deleteme2");
        elem.parentNode.removeChild(elem);}

    delete3(){
        var elem = document.getElementById("deleteme3");
        elem.parentNode.removeChild(elem);}

    delete4(){
        var elem = document.getElementById("deleteme4");
        elem.parentNode.removeChild(elem);}

}


