(function(){
	navigator.getUserMedia = ( 	navigator.getUserMedia ||
                       			navigator.webkitGetUserMedia ||
                       			navigator.mozGetUserMedia ||
                       			navigator.msGetUserMedia);

	if (navigator.getUserMedia) {
	   	navigator.getUserMedia({ video: true, audio: true}, 
	   		function(stream){
	   			var video = document.getElementById("videoCam");
				video.src = window.URL.createObjectURL(stream);
			}, 
			function(error){
				alert("You should accept the camera access permission");
			}
		);
	} else {
	   console.warn("getUserMedia not supported");
	}
})();

function getLoginStatus(){
	DM.getLoginStatus(function(response) {
	    if (response.session) {
	        $('#loginStatus')
	        	.html('<button>Logout</button>')
	        	.on('click', 'button', DM.logout);
	    } else {
	        $('#loginStatus')
	        	.html('<button>Login</button>')
	        	.on('click', 'button', function(){
	        		DM.login(function(response) {
					    if (response.session) {
					        if (response.session.scope) {
					        	DM.api('/me/videos?broadcasting=1&mode=live&publish=true&channel=webcam',
					        		'POST',
					        		function(res){
					        			console.log(res);
					        		});
					        }
					    }
					    getLoginStatus();
					}, {scope: 'manage_videos'});
				});
	    }
	});
}