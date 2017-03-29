(function()
{
	'use strict';
	function resizeVideo(ev)
	{
		console.log('resizeVideo', ev);
		
		var videoWidth = 1920;
		var videoHeight = 1080;
		var videoAspectRatio = videoWidth/videoHeight;

		var container = document.querySelector('.jumbotron-video-container');
		var video = document.querySelector('#jumbotron-video');
		if(!video || !container)
		{
			console.warn('resizeVideo: no video or container');
			return;
		}

		if(window.innerWidth / window.innerHeight > videoAspectRatio)
		{
			video.width = window.innerWidth;
			video.height = window.innerWidth / videoAspectRatio;
		}
		else
		{
			video.height = window.innerHeight;
			video.width = window.innerHeight * videoAspectRatio;
		}

		var horizontalMargin = (window.innerWidth - video.width) / 2;
		var verticalMargin = (window.innerHeight - video.height) / 2;

		video.style.marginLeft = horizontalMargin + 'px';
		video.style.marginTop = verticalMargin + 'px';
	}

	function fixEmail()
	{
		var anchor = document.querySelector('#theemail');
		if(!anchor)
		{
			console.warn('fixEmail no anchor');
			return;
		}
		var encodedEmail = [68,80,79,85,66,68,85,33,74,72,79,66,68,74,80,66,87,66,84,15,68,80,78];
		anchor.innerHTML = encodedEmail
			.map(function(i)
			{
				return String.fromCharCode(i+31);
			})
			.join('');
		anchor.href = 'mailto:' + anchor.innerHTML;
	}

	document.onreadystatechange = function(ev)
	{
	    if (document.readyState === "complete")
	    {
	    	resizeVideo.apply(this, arguments);
	    }
	};

	window.onload = function()
	{
		try
		{
			fixEmail.apply(this, arguments);
		}
		finally
		{
			resizeVideo.apply(this, arguments);
		}
	};

	window.onresize = resizeVideo; 
})();