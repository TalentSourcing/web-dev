
$(document).ready(function() {

	$("#searchButton").on({
		click: function() {
			var searchFieldText = $("#searchField").val();
			generateList(searchFieldText);
		}
	});

});

function generateList(searchFieldText) {
	if (searchFieldText.length == 0) { 
		alert("Please input search");
        	return;
    	} else {
		var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	        	if (xmlhttp.readyState == 3 && xmlhttp.status == 200) {
				console.log(xmlhttp.responseText);
				var response = JSON.parse(xmlhttp.responseText);
				//alert(response[0]['user'].user_email);

				createGroupEntries(getList(response, "group"));
				createUserEntries(getList(response, "user"));
        		}
		};
        	//xmlhttp.open("GET", "http://localhost/search.php?q=" + searchFieldText, true);
			xmlhttp.open("GET", "../../../../php/search.php?q=" + searchFieldText, true);
        	xmlhttp.send();
    	}
}

function getList(response, type) {
	var list = new Array();

/*	// for separated return
	for (var i in response) {
		if (type in response[i]) {
			list.push(response[i][type]);
		}

	}
*/
	if (response[type].length > 0) {
		return response[type];
	}

	return list;
}

function createGroupEntries(groupList) {
	var parentNode = $("#groups");
	parentNode.empty();

	for (var i = 0; i < groupList.length; i++) {
		var groupId = groupList[i].group_id;
		var groupImg = groupList[i].group_img;
		var groupName = groupList[i].group_name;
		var founderName = groupList[i].founder_name;
		var groupIntro = groupList[i].about;
		var desiredSkills = groupList[i].desired_skills;
		var groupEntry = createEntryForGroup(groupId, groupImg, groupName, founderName, groupIntro, desiredSkills);
		parentNode.append(groupEntry);
	}
}

function createUserEntries(userList) {
	var parentNode = $("#users");
	parentNode.empty();

	for (var i = 0; i < userList.length; i++) {
		var email = userList[i].user_email;
		var userProfileImg = userList[i].profile_img;
		var userName = userList[i].first_name + " " + userList[i].last_name;
		var skills = userList[i].skills;
		var objective = userList[i].objective;
		var userEntry = createEntryForUser(email, userProfileImg, userName, skills, objective);
		parentNode.append(userEntry);
	}
}

/*
<div class="entry" id="group_1">
	<div class="image_container">
        	<img class="image" src="../../../../image/default-placeholder.png" alt="Group image">
	</div>
	<div class="content">
	    	<h2><a class="name_entry" href="../groups/view_group_external.html" target="_blank">Group Name</a></h2>
	    	<h3>Founder: <a class="name_founder" href="../profile/userProfile.html" target="_blank">Founder name</a></h3>   
		<p class="description">Desired skills: <p>
		<p class="description">Group Intro</p> 
	</div>
	<div>
		<button class="button_entry" type="button">Apply to join</button>
	</div>
</div>
*/
function createEntryForGroup(groupId, groupImg, groupName, founderName, groupIntro, desiredSkills) {
	var entry = $('<div/>', {
				class: "entry",
				id: "group_" + groupId
				});

	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: (groupImg != null) ? groupImg : "../../../../image/default-placeholder.png",
				alt: "Group image"
				});

	image_container.append(image);
	entry.append(image_container);

	var content = $('<div/>', {
				class: "content"
				});
	var name_entry = $('<h2/>').append(
					$('<a/>', {
						class: "name_entry",
						href: "../groups/view_group_external.html",
						target: "_blank",
						text: groupName
						})
					);
	content.append(name_entry);

	var name_founder = $('<h3/>', {
				text: "Founder: "
				}).append(
					$('<a/>', {
						class: "name_founder",
						href: "../profile/userProfile.html",
						target: "_blank",
						text: founderName
					})
				);
	content.append(name_founder);

	var group_intro = $('<p/>', {
				class: "description",
				text: groupIntro
				});
	content.append(group_intro);
	entry.append(content);

	var desired_skills = $('<p/>', {
				class: "description",
				text: "Desired skills: " + desiredSkills
				});
	content.append(desired_skills);
	entry.append(content);

	var button = $('<div/>').append(
				$('<button/>', {
					class: "button_entry",
					type: "button",
					text: "Apply to join"
				})
	).click(function() {
		var hostEmail = sessionStorage.getItem('hostEmail');
		applyForGroup(hostEmail, groupId);
	});

	entry.append(button);
	return entry;
}


/*
<div class="entry">
	//<p hidden>id</p>
	<div class="image_container">
		<img class="image" src="../../../../image/default-placeholder.png" alt="User image">
	</div>
	<div class="content">
		<h2><a class="name_entry" href="../profile/userProfile.html" target="_blank">User name</a></h2>
		<p class="user_skill">Skills: </p>
		<p class="description">User's objective</p>
	</div>
	<div>
		<button class="button_entry" type="button" onclick="window.open('../chat/chat.html')">Chat</button>
	</div>
</div>
*/
function createEntryForUser(userEmail, userProfileImg, userName, skills, objective) {
	var entry = $('<div/>', {
				class: "entry"
				});
/*
	var id = $('<p/>', {
				hidden: true,
				text: userEmail
			});
	entry.append(id);
*/
	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: (userProfileImg == null) ? userProfileImg : "../../../../image/default-placeholder.png",
				alt: "User image"
				});
	image_container.append(image);
	entry.append(image_container);

	var content = $('<div/>', {
				class: "content"
				});
	var name_entry = $('<h2/>').append(
					$('<a/>', {
						class: "name_entry",
						href: "../profile/userProfile.html",
						target: "_blank",
						text: userName
						})
					);
	content.append(name_entry);

	var skill_header = $('<p/>', {
				class: "user_skills",
				text: "Skills: " + skills
				});
	content.append(skill_header);

	var user_skills = $('<p/>', {
				class: "description",
				text: objective
				});
	content.append(user_skills);
	entry.append(content);

	var button = $('<div/>').append(
				$('<button/>', {
					class: "button_entry",
					type: "button",
					text: "Chat"
				})
	).click(function() {
		var hostEmail = sessionStorage.getItem('hostEmail');
		initChat(hostEmail, userEmail);
		//window.open('../chat/chat.html');
		window.open('../../../../php/chat1.php');
	});
	entry.append(button);
	return entry;
}
