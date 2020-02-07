/* eslint-disable */
(function() {
  "use strict";

  function resizeJumbotronElements() {
    resizeJumbotronElement(document.getElementById("jumbotron-video-fallback"));
    resizeJumbotronElement(document.getElementById("jumbotron-video"));
  }

  function resizeJumbotronElement(element) {
    const videoWidth = 1920;
    const videoHeight = 1080;
    const videoAspectRatio = videoWidth / videoHeight;

    if (!element) {
      return;
    }

    if (window.innerWidth / window.innerHeight > videoAspectRatio) {
      element.width = window.innerWidth;
      element.height = window.innerWidth / videoAspectRatio;
    } else {
      element.height = window.innerHeight;
      element.width = window.innerHeight * videoAspectRatio;
    }

    const horizontalMargin = (window.innerWidth - element.width) / 2;
    const verticalMargin = (window.innerHeight - element.height) / 2;

    element.style.marginLeft = horizontalMargin + "px";
    element.style.marginTop = verticalMargin + "px";
  }

  function fixEmail() {
    const anchor = document.getElementById("theemail");
    if (!anchor) {
      console.warn("fixEmail no anchor");
      return;
    }
    const encodedEmail = [
      53,
      65,
      64,
      70,
      51,
      53,
      70,
      18,
      59,
      57,
      64,
      51,
      53,
      59,
      65,
      51,
      72,
      51,
      69,
      0,
      53,
      65,
      63
    ];
    anchor.innerHTML = encodedEmail
      .map(function(i) {
        return String.fromCharCode(i + 46);
      })
      .join("");
    anchor.href = "mailto:" + anchor.innerHTML;
  }

  function showJumbotronHeader() {
    const jumbotronHeader = document.getElementById("jumbotron-header");
    if (!jumbotronHeader) {
      console.warn("showJumbotronHeader no element");
      return;
    }
    jumbotronHeader.className += jumbotronHeader.className ? " shown" : "shown";
  }

  function waitForImageLoad() {
    const videoFallback = document.getElementById("jumbotron-video-fallback");
    if (videoFallback) {
      videoFallback.addEventListener("load", resizeJumbotronElements);
    }
  }

  function addVideo() {
    const container = document.getElementById("jumbotron-video-container");
    if (!container) {
      console.warn("addVideo: no container");
      return;
    }

    const video = document.createElement("video");
    video.id = "jumbotron-video";
    video.autoPlay = true;
    video.loop = true;
    video.play();

    const sourceMP4 = document.createElement("source");
    sourceMP4.type = "video/mp4";
    sourceMP4.src = "app/static/video/head.mp4";
    video.appendChild(sourceMP4);

    const sourceOGG = document.createElement("source");
    sourceOGG.type = "video/webm";
    sourceOGG.src = "app/static/video/head.webm";
    video.appendChild(sourceOGG);

    container.appendChild(video);

    resizeJumbotronElement(video);
  }

  function writeSelfAge() {
    const msPerYear = 31557600000;
    const birthDate = new Date(1987, 5, 30);
    const age = Math.floor((Date.now() - birthDate.getTime()) / msPerYear);

    const ageElement = document.getElementById("profile-details-age");
    if (ageElement) {
      ageElement.innerHTML = age;
    }
  }

  function openDetailsSkills() {
    document.querySelectorAll(".skill-count").forEach(function(element) {
      element.addEventListener("click", function() {
        document.querySelector(".skills-legend").open = true;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", fixEmail);
  document.addEventListener("DOMContentLoaded", resizeJumbotronElements);
  document.addEventListener("DOMContentLoaded", writeSelfAge);
  window.addEventListener("load", showJumbotronHeader);
  window.addEventListener("load", addVideo);
  window.addEventListener("load", resizeJumbotronElements);
  window.addEventListener("load", openDetailsSkills);
  window.addEventListener("resize", resizeJumbotronElements);
})();
