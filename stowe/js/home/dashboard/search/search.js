
$(document).ready(function() {
	$("#searchButton").on({
		click: function() {
			var searchFieldText = $("#searchField").val();

			$.ajax({
				url: "http://localhost/search_test.php",
				type: "POST",
				data: {searchString:searchFieldText},
				dataType: "json",
				complete: display,
				error: function(xhr, status, error) {	alert(status);	}
			});
		}
	});
});

function display(response) {
	alert("data received: " + response);
/*
					var groupList = [
							{
								groupId: 1, 
								groupImg: "../../../../image/default-placeholder.png",
								groupName: "Group Name",
								founderName: "Founder Name",
								groupIntro: "Group intro"
							},
							{
								groupId: 2, 
								groupImg: "../../../../image/default-placeholder.png",
								groupName: "Group Name",
								founderName: "Founder Name",
								groupIntro: "Group intro"
							}
							];

					var userList = [
							{
								email: "abc@gmail.com",
								userProfileImg: "../../../../image/default-placeholder.png",
								firstName: "User",
								lastName: "name",
								skills: "User skills"
							}, 
							{
								email: "xyz@gmail.com",
								userProfileImg: "../../../../image/default-placeholder.png",
								firstName: "User",
								lastName: "name",
								skills: "User skills"
							}
							];
					
	// var obj = JSON.parse(response);
	// var groupList = obj.groups;
	// var userList = obj.users;

					
	var groupList = 
		'{"user_email":"bhargavi.k6@gmail.com","first_name":"Bhargavi","last_name":"K","skills":"C, Java, MySQL","profile_img":""}';
	groupList = JSON.parse(response);

	createGroupEntries(groupList);
	createUserEntries(userList);
*/
}

function createGroupEntries(groupList) {
	var parentNode = $("#groups");
	parentNode.empty();

	for (var i = 0; i < groupList.length; i++) {
		var groupId = groupList[i].groupId;
		var groupImg = groupList[i].groupImg;
		var groupName = groupList[i].groupName;
		var founderName = groupList[i].founderName;
		var groupIntro = groupList[i].groupIntro;
		var groupEntry = createEntryForGroup(groupId, groupImg, groupName, founderName, groupIntro);
		parentNode.append(groupEntry);
	}
}

function createUserEntries(userList) {
	var parentNode = $("#users");
	parentNode.empty();

	for (var i = 0; i < userList.length; i++) {
		var email = userList[i].email;
		var userProfileImg = userList[i].userProfileImg;
		var userName = userList[i].firstName + " " + userList[i].lastName;
		var skills = userList[i].skills;
		var userEntry = createEntryForUser(email, userProfileImg, userName, skills);
		parentNode.append(userEntry);
	}
}

/*
<div class="entry" id="group_1">
	<div class="image_container">
        	<img class="image" src="../../../../image/default-placeholder.png" alt="Group image">
	</div>
	<div class="content">
	    	<h2><a class="name_entry" href="../groups/view_group_external.html">Group Name</a></h2>
	    	<h3>Fouder: <a class="name_founder" href="../profile/userProfile.html">Founder name</a></h3>    
	        <p>Group Intro</p> 
	</div>
	<div>
		<button class="button_entry" type="button">Apply to join</button>
	</div>
</div>
*/
function createEntryForGroup(groupId, groupImg, groupName, founderName, groupIntro) {
	var entry = $('<div/>', {
				class: "entry",
				id: "group_" + groupId
				});

	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: groupImg,
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

	var button = $('<div/>').append(
				$('<button/>', {
					id: "button_apply_group",
					class: "button_entry",
					type: "button",
					text: "Apply to join"
					})
				);
	entry.append(button);
	return entry;
}


/*
<div class="entry" id="abc@gmail.com">
	<div class="image_container">
		<img class="image" src="../../../../image/default-placeholder.png" alt="User image">
	</div>
	<div class="content">
		<h2><a class="name_entry" href="../profile/userProfile.html">User name</a></h2>
		<h3>Skills</h3>
		<p>User skills</p>
	</div>
	<div>
		<button class="button_entry" type="button" onclick="window.open('../chat/chat.html')">Chat</button>
	</div>
</div>
*/
function createEntryForUser(email, userProfileImg, userName, skills) {
	var entry = $('<div/>', {
				class: "entry",
				id: email
				});

	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: userProfileImg,
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
						href: "../profile/userProfile.html",
						text: userName
						})
					);
	content.append(name_entry);

	var skill_header = $('<h3/>', {
				text: "Skills: "
				});
	content.append(skill_header);

	var user_skills = $('<p/>', {
				class: "description",
				text: skills
				});
	content.append(user_skills);
	entry.append(content);

	var button = $('<div/>').append(
				$('<button/>', {
					id: "button_chat",
					class: "button_entry",
					type: "button",
					text: "Chat",
					onClick: "window.open('../chat/chat.html')"
					})
				);
	entry.append(button);
	return entry;
}
