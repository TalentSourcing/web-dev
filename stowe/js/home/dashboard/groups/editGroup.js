
'use strict';
//Author Naina
//modified:3/10/2016

const UPDATE_GROUP = "update_group";

const DISPLAY_UPDATE_GROUP = "display_update_group";

//save the edited content
function saveUpdatedFields()
{
	$(document).ready(function () {
		
		 var groupprofile = {};
		
		groupprofile.group_id = (JSON.parse(sessionStorage.getItem('edit_group')));
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
				}
			};
			xmlhttp.open("GET","../../../../php/Group.php?" + UPDATE_GROUP + "=" + JSON.stringify(groupprofile), true);
			xmlhttp.send();
	});
}

//get the created group content to display
function geteditgroupFields() {
	$(document).ready(function () {
		
		var group_id = (JSON.parse(sessionStorage.getItem('edit_group')));
		console.log(group_id);
		
		// send request to php
		var xmlhttp = new XMLHttpRequest();
		var response = null;
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log(xmlhttp.responseText);
				var json_str = extractJSONObject(xmlhttp.responseText);
				console.log("geteditgroupFields: " + json_str);
				response = JSON.parse(json_str);
				if ('error' in response) {
					console.log("geteditgroupFields: " + response.error);
				}
				else {
					generateHtml(response);
				}
			}
		};
		
		xmlhttp.open("GET","../../../../php/Group.php?" + DISPLAY_UPDATE_GROUP + "=" + JSON.stringify(group_id), true);
		xmlhttp.send();
	});
}


function generateHtml(editGroup)
{
	 $(document).ready(function () {
		 
		 if (editGroup === null) {
            console.log('No edit groups to display');
            // TODO print message to list
            return null;
        }
		 
		 	$("#img_group").attr("src", "../../../../image/" + editGroup.group_img);
			$('#title_field').val(editGroup.group_name); // first + last
			$('#about').val( editGroup.about);
			$("textarea#desired_skills").val(editGroup.desired_skills);
	 });
}
    

function extractJSONObject (string) { // TODO make return the message too
    var curly = string.indexOf('{');
    var bracket = string.indexOf('[');

    if (curly < 0 && bracket < 0) {
        return "no json in string";
    }
    if (curly < bracket || bracket < 0) {
        return string.substring(curly);
    }
    else if (bracket < curly || curly < 0) {
        return string.substring(bracket);
    }
}
