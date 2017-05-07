(function()
{
	'use strict';

	function resizeJumbotronElements()
	{
		resizeJumbotronElement(document.getElementById('jumbotron-video-fallback'));
		resizeJumbotronElement(document.getElementById('jumbotron-video'));
	}

	function resizeJumbotronElement(element)
	{
		var videoWidth = 1920;
		var videoHeight = 1080;
		var videoAspectRatio = videoWidth/videoHeight;

		if(!element)
		{
			return;
		}

		if(window.innerWidth / window.innerHeight > videoAspectRatio)
		{
			element.width = window.innerWidth;
			element.height = window.innerWidth / videoAspectRatio;
		}
		else
		{
			element.height = window.innerHeight;
			element.width = window.innerHeight * videoAspectRatio;
		}

		var horizontalMargin = (window.innerWidth - element.width) / 2;
		var verticalMargin = (window.innerHeight - element.height) / 2;

		element.style.marginLeft = horizontalMargin + 'px';
		element.style.marginTop = verticalMargin + 'px';
	}

	function fixEmail()
	{
		var anchor = document.getElementById('theemail');
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
		var jumbotronHeader = document.getElementById('jumbotron-header');
		if(!jumbotronHeader)
		{
			console.warn('showJumbotronHeader no element');
			return;
		}
		jumbotronHeader.className += jumbotronHeader.className ? ' shown' : 'shown';
	}

	function waitForImageLoad()
	{
		var videoFallback = document.getElementById('jumbotron-video-fallback');
		if(videoFallback)
		{
			videoFallback.addEventListener("load", resizeJumbotronElements);
		}
	}

	function addVideo()
	{
		var container = document.getElementById('jumbotron-video-container');
		if(!container)
		{
			console.warn('addVideo: no container');
			return;
		}

		var video = document.createElement('video');	
		video.id = 'jumbotron-video';
		video.autoPlay = true;
		video.loop = true;
		video.play();

		var sourceMP4 = document.createElement("source"); 
		sourceMP4.type = "video/mp4";
		sourceMP4.src = "app/static/video/head.mp4";
		video.appendChild(sourceMP4);

		var sourceOGG = document.createElement("source"); 
		sourceOGG.type = "video/webm";
		sourceOGG.src = "app/static/video/head.webm";
		video.appendChild(sourceOGG);

		container.appendChild(video);

		resizeJumbotronElement(video);
	}

	document.addEventListener("DOMContentLoaded", fixEmail);
	document.addEventListener("DOMContentLoaded", resizeJumbotronElements);
	window.addEventListener("load", resizeJumbotronElements);
	window.addEventListener("load", showJumbotronHeader);
	window.addEventListener("load", addVideo);
	window.addEventListener("resize", resizeJumbotronElements);
})();