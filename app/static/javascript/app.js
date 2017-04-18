(function()
{
	'use strict';
	function resizeVideo(ev)
	{
		var videoWidth = 1920;
		var videoHeight = 1080;
		var videoAspectRatio = videoWidth/videoHeight;

		var imgFallback = document.querySelector('#jumbotron-video-fallback');
		var video = document.querySelector('#jumbotron-video');
		if(!video || !imgFallback)
		{
			console.warn('resizeVideo: no video or container');
			return;
		}

		if(window.innerWidth / window.innerHeight > videoAspectRatio)
		{
			imgFallback.width = video.width = window.innerWidth;
			imgFallback.height = video.height = window.innerWidth / videoAspectRatio;
		}
		else
		{
			imgFallback.height = video.height = window.innerHeight;
			imgFallback.width = video.width = window.innerHeight * videoAspectRatio;
		}

		var horizontalMargin = (window.innerWidth - video.width) / 2;
		var verticalMargin = (window.innerHeight - video.height) / 2;

		imgFallback.style.marginLeft = video.style.marginLeft = horizontalMargin + 'px';
		imgFallback.style.marginTop = video.style.marginTop = verticalMargin + 'px';
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

	function showJumbotronHeader()
	{
		var jumbotronHeader = document.querySelector('#jumbotron-header');
		if(!jumbotronHeader)
		{
			console.warn('showJumbotronHeader no element');
			return;
		}
		jumbotronHeader.className += jumbotronHeader.className ? ' shown' : 'shown';
	}

	document.addEventListener("DOMContentLoaded", resizeVideo);
	document.addEventListener("DOMContentLoaded", fixEmail);
	window.addEventListener("load", resizeVideo);
	window.addEventListener("load", showJumbotronHeader);
	window.addEventListener("resize", resizeVideo);
})();