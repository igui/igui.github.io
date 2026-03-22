"use client";

import styled from "styled-components";
import Section from "./Section";
import { bgColor, screenMedium } from "./styleConstants";

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const SectionText = styled.div`
  text-align: justify;
`;

const ImgContainerSizeSmall = "120px";
const ImgContainerSizeLarge = "160px";

const ImgContainer = styled.div`
  position: relative;
  grid-column: 2;

  width: ${ImgContainerSizeSmall};
  height: ${ImgContainerSizeSmall};

  img {
    backface-visibility: hidden;
    clip-path: circle(calc(50% - 2px));
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: transform 0.5s;
    width: 100%;
  }

  img:first-child {
    transform: rotateY(0deg);
  }

  img:last-child {
    transform: rotateY(180deg);
  }

  &:hover img:first-child {
    transform: rotateY(180deg);
  }

  &:hover img:last-child {
    transform: rotateY(0deg);
  }

  @media only screen and (min-width: ${screenMedium}) {
    width: ${ImgContainerSizeLarge};
    height: ${ImgContainerSizeLarge};
  }
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 3;
`;

interface AboutProps {
  html: string;
}

const About = ({ html }: AboutProps) => (
  <Section bgcolor={bgColor} id="about" title="About me">
    <Header>
      <ImgContainer>
        <img src="/assets/about/him.jpg" alt="Ignacio Avas" />
        <img src="/assets/about/him-back.jpg" alt="Ignacio Avas back" />
      </ImgContainer>
    </Header>
    <BioContainer>
      <div>Name: Ignacio Avas</div>
      <div>Countries: 🇺🇾 🇪🇸 🇧🇪</div>
      <div>Languages: Spanish, English, Italian, Dutch</div>
    </BioContainer>

    <SectionText dangerouslySetInnerHTML={{ __html: html }} />
  </Section>
);

export default About;
