
'use strict';


const CREATE_GROUP = "create_group";

function getFields() {
    var dashboard = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
    var groupprofile = {};
		groupprofile.user_email = dashboard.user_email;
		groupprofile.group_name = $("#title_field").val();
        groupprofile.about_info = $("#about").val();
        groupprofile.skill_list = $("#desired_skills").val();
		groupprofile.group_img = $('#img_group').attr('src');

    sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("groupprofile obj: " + JSON.stringify(groupprofile));
	
	 // send profile to php
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
				
				// reload the page
				window.location.href = "../../../home/dashboard/dashboard.html";
            }
        };
        xmlhttp.open("GET","../../../../php/Group.php?" + CREATE_GROUP + "=" + JSON.stringify(groupprofile), true);
        xmlhttp.send();
}
