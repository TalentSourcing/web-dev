'use strict';

function generateHtml () {
    $(document).ready(function () {
        var appliedGroups = JSON.parse(sessionStorage.getItem('groups_applied'));
        console.log(JSON.stringify(appliedGroups));

        if (appliedGroups === null) {
            console.log('No applied groups to display');
            // TODO print message to list
            return null;
        }

        var groups_list = $('.groups_list');
        appliedGroups.pending.forEach(function (group) {
            if (group.about === "") {
                group.about = "No info...";
            }
            if (group.group_img === "") {
                group.group_img = "default-placeholder.png";
            }
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html"' +
                            'onclick="openGroup('+ group.group_id +')">'+ group.group_name +'</a><br>' +
                        '<label class="label_subtext">'+ group.about +'</label>' +
                    '</div>' +
                    '<div class="list_icon pending">' +
                        '<label>pending</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
        appliedGroups.accepted.forEach(function (group) {
            if (group.about === "") {
                group.about = "No info...";
            }
            if (group.group_img === "") {
                group.group_img = "default-placeholder.png";
            }
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html"' +
                            'onclick="openGroup('+ group.group_id +')">'+ group.group_name +'</a><br>' +
                        '<label class="label_subtext">'+ group.about +'</label>' +
                    '</div>' +
                    '<div class="list_icon accepted">' +
                        '<label>accepted</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
    });
}

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

generateHtml();