
'use strict';
//Author Naina
//modified:3/10/2016

const UPDATE_GROUP = "update_group";
const DISPLAY_UPDATE_GROUP = "display_update_group";
const GET_MEMBER_DATA = "get_member_data";
const $FOUNDER = "founder";
const $MEMBER = "member";
const $INVITED = "invited";
const $APPLIED = "applied";


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
		
		displayGroupData(group_id);
	});
}

function displayGroupData(group_id){
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
					displayMemberData(group_id);
				}
			}
		};
		
		xmlhttp.open("GET","../../../../php/Group.php?" + DISPLAY_UPDATE_GROUP + "=" + JSON.stringify(group_id), true);
		xmlhttp.send();
}

function displayMemberData(group_id){
	// send request to php
		var xmlhttp = new XMLHttpRequest();
		var response = null;
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				console.log(xmlhttp.responseText);
				var json_str = extractJSONObject(xmlhttp.responseText);
				console.log("displayMemberData: " + json_str);
				response = JSON.parse(json_str);
				if ('error' in response) {
					console.log("displayMemberData: " + response.error);
				}
				else {
					generateHtml2(response);
				}
			}
		};
		
		xmlhttp.open("GET","../../../../php/Group.php?" + GET_MEMBER_DATA + "=" + JSON.stringify(group_id), true);
		xmlhttp.send();
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

function generateHtml2(member)
{
	 $(document).ready(function () {
		 
		 if (member === null) {
            console.log('No edit groups to display');
            // TODO print message to list
            return null;
        }
		
		 var list_invited = $("#list_invited");
		 var list_applicants = $("#list_applicants");
		 var member_list = $("#member_list");
		 
		 member.forEach(function(member){
			
			if(member.user_role == $INVITED)
			{
				var appMember = 
					"<li class='groups_list_item' id='removeme1'>"+
						"<img class='groups_list_img' src='../../../../image/"+member.profile_img+"' alt='image' />"+
						"<div class='div_groups_list_text'>"+
							"<label class='group_name'><a href='../profile/userProfile.html'>"+member.first_name+" "+member.last_name+"</a></label><br>"+
							"<label class='label_subtext'>"+member.occupation+"</label>"+
						"</div>"+
						"<button class='list_button'>remove</button>"+
					"</li>";
				
				list_invited.append(appMember);
			}
			
			else if(member.user_role == $APPLIED)
			{
				var inviteMember = 
					"<li class='groups_list_item' id='deleteme1'>"+
						"<img class='groups_list_img' src='../../../../image/"+member.profile_img+"' alt='image' />"+
						"<div class='div_groups_list_text'>"+
                    		"<label class='group_name'><a href='../profile/userProfile.html'>"+member.first_name+" "+member.last_name+"</a></label><br>"+
                    		"<label class='label_subtext'>"+member.occupation+"</label>"+
						"</div>"+
                		"<button class='list_button'  onclick='delete1('deleteme1')'>decline</button>"+
                		"<button class='list_button'>accept</button>"+
            		"</li>";
				
				list_applicants.append(inviteMember);
			}
			 
			else if(member.user_role == $MEMBER)
			{
				var currMember = 
					"<li class='groups_list_item' id='deleteme1'>"+
						"<img class='groups_list_img' src='../../../../image/"+member.profile_img+"' alt='image' />"+
						"<div class='div_groups_list_text'>"+
                    		"<label class='group_name'><a href='../profile/userProfile.html'>"+member.first_name+" "+member.last_name+"</a></label><br>"+
                    		"<label class='label_subtext'>"+member.occupation+"</label>"+
						"</div>"+
            		"</li>";
				
				member_list.append(currMember);
			} 
			
		});
		
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
