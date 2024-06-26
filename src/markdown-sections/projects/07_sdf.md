---
title: "Scraping Development Framework"
path: "/projects/07_sdf"
date: "2024-05-21"
---

<figure style="{ background-color: #9d9999; }">
  <img src="/projects/sdf.jpg" alt="SDF Browser snapshot">
</figure>

### Scraping Development Framework

SDF is a Python framework that allows to easy scrape a site. It enables to make XPath and CSS queries to quickly parse a website. The focus of the framework is to make the job of making a scraper easier, allow to parse sites with millions of items, and be able to export the items in several formats ranging from CSVs to MySQL database dump. SDF uses browsers (as in a Web Browser) to do the job. Browsers come in two flavors: the WebKitBrowser, a standard browser (similar to Safari or Chrome) that can be controlled through python code. WebkitBrowser manages javascript, flash and other types of content. The other type of browser is the BasicBrowser, a minimalistic and faster version of WebKitBrowser that doesn't handle javascript directly. SDF features recovery and parallel processing, so multiple browsers can be used concurrently to scrape a large site in hours.
