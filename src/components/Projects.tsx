import React from "react";
import Section from "./Section";
import { bgColor } from "./styleConstants";
import Quote from "./Quote";

const Projects = () => (
  <Section backgroundColor={bgColor} id="projects" title="Projects">
    <Quote
      author="Dejan Stojanović"
      href="https://en.wikipedia.org/wiki/Dejan_Stojanovi%C4%87"
    >
      The most complicated skill is to be simple.
    </Quote>
    Some stuff here
  </Section>
);

export default Projects;
