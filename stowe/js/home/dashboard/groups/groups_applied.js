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

        appliedGroups.pending.push({
            'group_name' : 'Group 3',
            'group_img' : '',
            'about' : 'blahblahblha',
            'desired_skills' : ''
        });

        appliedGroups.pending.push({
            'group_name' : 'Group 4',
            'group_img' : '',
            'about' : 'oinfosinfoiefneso',
            'desired_skills' : ''
        });

        var groups_list = $('.groups_list');
        appliedGroups.pending.forEach(function (group) {
            group.about = "About this group!"; // TODO delete
            group.group_img = "default-placeholder.png"; // TODO delete
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html">'+ group.group_name +'</a><br>' +
                        '<label class="label_subtext">'+ group.about +'</label>' +
                    '</div>' +
                    '<div class="list_icon pending">' +
                        '<label>pending</label>' +
                    '</div>'+
                '</li>';
            groups_list.append(list_item);
        });
        appliedGroups.accepted.forEach(function (group) {
            group.about = "About this group!"; // TODO delete
            group.group_img = "default-placeholder.png"; // TODO delete
            var list_item =
                '<li class="groups_list_item">' +
                    '<img class="groups_list_img" src="../../../../image/'+ group.group_img +'" alt="img" />' +
                    '<div class="div_groups_list_text">' +
                        '<a class="group_name" href="../../../../html/home/dashboard/groups/view_group_external.html">'+ group.group_name +'</a><br>' +
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

generateHtml();