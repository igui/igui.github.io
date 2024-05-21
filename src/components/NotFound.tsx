import React from "react";
import { bgColor } from "./styleConstants";
import Quote from "./Quote";
import Section from "./Section";

const NotFound = () => (
  <Section bgcolor={bgColor} id="notfound" title="Not Found">
    <Quote
      author="Thomas A. Edison"
      href="https://www.nps.gov/edis/learn/kidsyouth/a-brief-biography-of-thomas-edison.html"
      content="I have not failed. I've just found 10,000 ways that won't work."
    />
    <p>
      You just hit a page that doesn&#39;t exist... the sadness. Here's there's
      a puppy image:
    </p>
    <img src="https://placedog.net/640/480?r" alt="A random puppy" />
  </Section>
);

export default NotFound;
