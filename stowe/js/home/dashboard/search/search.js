
$(document).ready(function() {
	queryGroupEntries();
	queryUserEntries();
});

function queryGroupEntries() {
	var parentGroup = $("#groups");
	var groupEntry = createEntryForGroup();
	parentGroup.append(groupEntry);
}

function queryUserEntries() {
	var parentUser = $("#users");
	var userEntry = createEntryForUser();
	parentUser.append(userEntry);
}

/*
<div class="entry" id="group_1">
	<div class="image_container">
        	<img class="image" src="../../../../image/default-placeholder.png" alt="Group image">
	</div>
	<div class="content">
	    	<h2><a class="name_entry" href="../groups/view_group_external.html">Group Name</a></h2>
	    	<h3>Fouder: <a id="name_founder" href="../profile/userProfile.html">Founder name</a></h3>    
	        <p>Group Intro</p> 
	</div>
	<div>
		<button id="button_apply_group" class="button_entry" type="button">Apply to join</button>
	</div>
</div>
*/
function createEntryForGroup() {
	var entry = $('<div/>', {
				class: "entry",
				id: "group_1"
				});

	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: "../../../../image/default-placeholder.png",
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
						text: "Group name"
						})
					);
	content.append(name_entry);

	var name_founder = $('<h3/>', {
				text: "Founder: "
				}).append(
					$('<a/>', {
						id: "name_founder",
						href: "../profile/userProfile.html",
						text: "Founder name"
					})
				);
	content.append(name_founder);

	var group_intro = $('<p/>', {
				class: "description",
				text: "Group intro"
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
<div class="entry" id="user_1">
	<div class="image_container">
		<img class="image" src="../../../../image/default-placeholder.png" alt="User image">
	</div>
	<div class="content">
		<h2><a class="name_entry" href="../profile/userProfile.html">User name</a></h2>
		<h3>Skills</h3>
		<p>User skills</p>
	</div>
	<div>
		<button id="button_chat" class="button_entry" type="button" onclick="window.open('../chat/chat.html')">Chat</button>
	</div>
</div>
*/
function createEntryForUser() {
	var entry = $('<div/>', {
				class: "entry",
				id: "user_1"
				});

	var image_container = $('<div/>', {
					class: "image_container"
					});
	var image = $('<img/>', {
				class: "image",
				src: "../../../../image/default-placeholder.png",
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
						text: "User name"
						})
					);
	content.append(name_entry);

	var skill_header = $('<h3/>', {
				text: "Skills: "
				});
	content.append(skill_header);

	var user_skills = $('<p/>', {
				class: "description",
				text: "User skills"
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
