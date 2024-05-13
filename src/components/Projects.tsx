import React from "react";
import Section from "./Section";
import { bgColor } from "./styleConstants";
import Quote from "./Quote";
import flappybirdImg from "./assets/projects/flappybird/1.jpg";
import oneVs100Img from "./assets/projects/1vs100/1.jpg"
import rpsolverImg from "./assets/projects/rpsolver/1.jpg"
import scisImg from "./assets/projects/scis/1.jpg"
import sayCheeseImg from "./assets/projects/saycheese/1.jpg"
import pasteboardImg from "./assets/projects/pasteboard/1.jpg"
import sdfImg from "./assets/projects/sdf/1.jpg"
import notranzoImg from "./assets/projects/notranzo/1.jpg"
import questionMarkImg from "./assets/projects/question.jpg"
import styled from "styled-components";

const PROJECTS = [
  {
    name: "Flappy Bird",
    imagePath: flappybirdImg,
    alt: "Flappy Bird Perspective shot showing a red bird flying over green tubes, over a bridge",
  },
  {
    name: "1 vs 100",
    imagePath: oneVs100Img,
    alt: "1vs100 Phone shot on a black background",
  },
  {
    name: "RPSolver",
    imagePath: rpsolverImg,
    alt: "RPSolver",
  },
  {
    name: "SCIS",
    imagePath: scisImg,
    alt: "SCIS iPad screenshot showing the login screen",
  },
  {
    name: "Say Cheese",
    imagePath: sayCheeseImg,
    alt: "Say Cheese login screen showing email and password",
  },
  {
    name: "Pasteboard",
    imagePath: pasteboardImg,
    alt: "Pasteboard login screen displaying website features",
  },
  {
    name: "Scraping Development Framework",
    imagePath: sdfImg,
    alt: "SDF Browser snapshot",
  },
  {
    name: "Notranzo site",
    imagePath: notranzoImg,
    alt: "Notranzo website showing product list",
  },
  {
    name: "Your Project?",
    imagePath: questionMarkImg,
    alt:"Mario Style question mark",
  },
]

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
`;

const ProjectItem = styled.figure`
  flex-basis: 33%;
  margin: 0;
  position: relative;
`;

const ProjectImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TransitionDuration = ".15s";

const ProjectName = styled.figcaption`
  color: #fff;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  text-align: center;
  transition-duration: ${TransitionDuration};
  transition-property: opacity;
  flex-direction: column;

  ${ProjectItem}:hover & {
    opacity: 1;
    transform: initial;
  }
`

const ProjectNameText = styled.span`
  transition-duration: ${TransitionDuration};
  transition-property: transform;
  transform: translateY(10px);

  ${ProjectItem}:hover & {
    transform: initial;
  }
`

const Projects = () => (
  <Section backgroundColor={bgColor} id="projects" title="Projects">
    <Quote
      author="Dejan Stojanović"
      href="https://en.wikipedia.org/wiki/Dejan_Stojanovi%C4%87"
    >
      The most complicated skill is to be simple.
    </Quote>
    <ProjectList>
      {PROJECTS.map(({ name, imagePath, alt }) => (
        <ProjectItem key={name}>
          <ProjectImg src={imagePath} alt={alt} />
          <ProjectName>
            <ProjectNameText>{name}</ProjectNameText>
          </ProjectName>
        </ProjectItem>))}
    </ProjectList>
  </Section>
);

export default Projects;
