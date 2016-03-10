
'use strict';


const CREATE_GROUP = "create_group";

function getFields() {
    var groupprofile = {};

		groupprofile.group_name = $("#title_field").val();
        groupprofile.about_info = $("#about").val();
        groupprofile.skill_list = $("#desired_skills").val();
        // remove the file pathing before saving image name:
        var img_str = $('#img_group').attr('src');
        img_str = img_str.substring(img_str.lastIndexOf('image/') + 6);
		groupprofile.group_img = img_str;

    sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("groupprofile obj: " + JSON.stringify(groupprofile));
	
	 // send profile to php
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET","../../../../php/Group.php?" + CREATE_GROUP + "=" + JSON.stringify(groupprofile), true);
        xmlhttp.send();
}
//
//function validate () {
//    var valid = true;
//    var error_msg = {
//        'requiredFields' : "",
//        'password' : ""
//    };
//    var groupprofile = getFields();
//
//
//
//    if (valid) {
//        sessionStorage.removeItem('saved_state');
//
//        // send profile to php
//        var xmlhttp = new XMLHttpRequest();
//        xmlhttp.onreadystatechange = function() {
//            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                console.log(xmlhttp.responseText);
//            }
//        };
//        xmlhttp.open("GET","../../php/Group.php?" + CREATE_group + "=" + JSON.stringify(groupprofile), true);
//        xmlhttp.send();
//    }
//    else {
//        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
//    }
//}
