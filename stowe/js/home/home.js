/************************************
	Author: Chuan Xu
*************************************/

$(document).ready(function() {
	var i = 0;
	var images = ['../../image/home/image1.jpg', '../../image/home/image2.jpg', '../../image/home/image3.jpg'];
	var imageField = $('#background_images');
	
	// Initial image
	imageField.css('background-image', 'url(../../image/home/image1.jpg)');
		
	setInterval(function() {
		imageField.fadeOut(1000, function() {
			imageField.css('background-image', 'url('+images[i]+')');
			imageField.fadeIn(1000);
		});
			
		i = (i + 1) % images.length;
	}, 5000);
});


