import React from "react";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";
import Quote from "./Quote";

const Skills = () => (
  <Section backgroundColor={tertiaryBgColor} id="skills" title="Skills">
    <Quote
      author="Alan Turing"
      href="https://en.wikipedia.org/wiki/Alan_Turing"
    >
      Sometimes it is the people no one imagines anything of who do the things
      that no-one can imagine
    </Quote>
    Some stuff here
  </Section>
);

export default Skills;
