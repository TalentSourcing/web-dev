/************************************
	Author: Chuan Xu
*************************************/

//$(document).ready(function() {
//	var i = 0;
//	var images = ['../../image/home/image1.jpg', '../../image/home/image2.jpg', '../../image/home/image3.jpg'];
//	var imageField = $('#background_images');
//
//	// Initial image
//	imageField.css('background-image', 'url(../../image/home/image1.jpg)');
//
//	setInterval(function() {
//		imageField.fadeOut(1000, function() {
//			imageField.css('background-image', 'url('+images[i]+')');
//			imageField.fadeIn(1000);
//		});
//
//		i = (i + 1) % images.length;
//	}, 5000);
//});


function login () {
	$(document).ready(function () {
		var user_email = $('#user_email').val();
		var password = $('#password').val();

		// user_email = "naina@gmail.com", password = "pwd1"

		if (!/\S/.test(user_email) || !/\S/.test(password)) {
			alert('Could not find username or invalid password');
			return null;
		}
		else {
			if (user_email === "naina@gmail.com" && password === "pwd1") {
				$('#sign_in').attr('href', 'dashboard/dashboard.html');
			}
			else {
				alert('Could not find username or invalid password');
				return null;
			}
		}

		// TODO create getUser php function to pull all user data from various tables

		sessionStorage.setItem('hostEmail', JSON.stringify(user_email));
		var dashboardStorage = {
			'user_email' : user_email,
			'userProfile' : {},
			'appliedGroups' : [],
			'joinedGroups' : [],
			'createdGroups' : []
		};
		sessionStorage.setItem('dashboard', JSON.stringify(dashboardStorage));
		//window.location.href = 'dashboard/dashboard.html';
	});
}
