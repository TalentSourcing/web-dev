'use strict';

function generateHtml () {
    $(document).ready(function () {
        var invite_user = JSON.parse(sessionStorage.getItem('user_role'));
        console.log(JSON.stringify(appliedGroups));

        if (user_role === invited) {
            console.log('User has already been invited to this group.');
            // TODO print message to list
            return null;
        }

        var user_list = $('.user_list');
        appliedGroups.pending.forEach(function (user) {
            if (user.user_role === "invited") {
                user.user_role = "member";
            }

            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../profile/userProfile.html"' +
                            'onclick="openGroup('+ user.group_id +')">'+ user.user_email +'</a><br>' +
                        '<label class="label_subtext">'+ user.user_role +'</label>' +
                    '</div>' +
                    '<div class="list_icon accepted">' +
                        '<label>accepted</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
        appliedGroups.accepted.forEach(function (user) {
            if (user.user_role === "invited") {
                group.about = "member";
            }

            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../profile/userProfile.html"' +
                            'onclick="openGroup('+ user.group_id +')">'+ user.user_email +'</a><br>' +
                        '<label class="label_subtext">'+ user.user_role +'</label>' +
                    '</div>' +
                    '<div class="list_icon accepted">' +
                        '<label>accepted</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
    });
}

/*
function openGroup (group_id) {
    var groupStorage;
    if ((groupStorage = JSON.parse(sessionStorage.getItem('group'))) === null) {
        groupStorage = {
            'group_id' : ''
        };
    }
    groupStorage.group_id = group_id;
    sessionStorage.setItem('group', JSON.stringify(groupStorage));
}
*/

generateHtml();


sessionStorage.setItem('saved_state', JSON.stringify(groupprofile));
    console.log("editgroupprofile obj: " + JSON.stringify(profile));
    return editgroupprofile;



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
        xmlhttp.open("GET","../../php/Group.php?" + EDIT_GROUP + "=" + JSON.stringify(editgroupprofile), true);
        xmlhttp.send();
    }
    else {
        alert("Error!\n\n" + error_msg.requiredFields + "\n" + error_msg.password);
    }
}
