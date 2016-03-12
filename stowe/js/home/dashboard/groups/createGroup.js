
'use strict';


const CREATE_GROUP = "create_group";
const DASHBOARD_KEY = 'dashboard';

function getProfilePic(imgPath)
{
	if (imgPath.files && imgPath.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img_group')
                    .attr('src', e.target.result)
                    .width('100%')
                    .height('100%');
            };

            reader.readAsDataURL(imgPath.files[0]);
        }
}

function getFields() {
    var dashboard = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
    var groupprofile = {};

		groupprofile.user_email = dashboard.user_email;


		groupprofile.group_name = $("#title_field").val();
        groupprofile.about_info = $("#about").val();
        groupprofile.skill_list = $("#desired_skills").val();
		var img_str = $('#img_group').attr('src');
        img_str = img_str.substring(img_str.lastIndexOf('image/') + 6);
        // do not save group_img if one is not given
        if (img_str.indexOf("default-placeholder.png") > -1) {
            groupprofile.group_img = "";
        }
        else {
            groupprofile.group_img = img_str;
        }

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


