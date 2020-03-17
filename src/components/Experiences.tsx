import React from "react";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const Experiences = () => (
  <Section
    backgroundColor={tertiaryBgColor}
    id="experience"
    title="Experiences"
  >
    <Quote
      author="Bjarne Stroustrup"
      href="https://en.wikipedia.org/wiki/Bjarne_Stroustrup"
    >
      Design and programming are human activities; forget that and all is lost
    </Quote>

    <Timeline></Timeline>
  </Section>
);

export default Experiences;
