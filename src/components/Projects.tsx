import React from "react";
import Section from "./Section";
import { bgColor } from "./styleConstants";
import Quote from "./Quote";
import flappybirdImg from "../assets/images/projects/flappybird/1.jpg";
import oneVs100Img from "../assets/images/projects/1vs100/1.jpg"
import rpsolverImg from "../assets/images/projects/rpsolver/1.jpg"
import scisImg from "../assets/images/projects/scis/1.jpg"
import sayCheeseImg from "../assets/images/projects/saycheese/1.jpg"
import pasteboardImg from "../assets/images/projects/pasteboard/1.jpg"
import sdfImg from "../assets/images/projects/sdf/1.jpg"
import notranzoImg from "../assets/images/projects/notranzo/1.jpg"
import questionMarkImg from "../assets/images/projects/question.jpg"
import styled from "styled-components";
import { animationDelayFast, screenMedium } from "./styleConstants";

const PROJECTS = [
  {
    name: "Flappy Bird",
    imagePath: flappybirdImg,
    alt: "Flappy Bird Perspective shot showing a red bird flying over green tubes, over a bridge",
    fallbackColor: "#668a81",
  },
  {
    name: "1 vs 100",
    imagePath: oneVs100Img,
    alt: "1vs100 Phone shot on a black background",
    fallbackColor: "#3e3b3d"
  },
  {
    name: "RPSolver",
    imagePath: rpsolverImg,
    alt: "RPSolver",
    fallbackColor: "#655858"
  },
  {
    name: "SCIS",
    imagePath: scisImg,
    alt: "SCIS iPad screenshot showing the login screen",
    fallbackColor: "#9d8978"
  },
  {
    name: "Say Cheese",
    imagePath: sayCheeseImg,
    alt: "Say Cheese login screen showing email and password",
    fallbackColor: "#6e8a8f"
  },
  {
    name: "Pasteboard",
    imagePath: pasteboardImg,
    alt: "Pasteboard login screen displaying website features",
    fallbackColor: "#9c9c9f"
  },
  {
    name: "Scraping Development Framework",
    imagePath: sdfImg,
    alt: "SDF Browser snapshot",
    fallbackColor: "#9d9999"
  },
  {
    name: "Notranzo site",
    imagePath: notranzoImg,
    alt: "Notranzo website showing product list",
    fallbackColor: "#c7a794"
  },
  {
    name: "Your Project?",
    imagePath: questionMarkImg,
    alt:"Mario Style question mark",
    fallbackColor: "#d7d7d7"
  },
]

const GridSize = "220px";

interface ItemPosition {
  row: number;
  column: number;
}

interface ProjectImgProps extends ItemPosition {
  fallbackColor: string;
}

const ProjectDescription = styled.figcaption<ItemPosition>`
  background-color: rgba(128, 127, 0, 0.8);
  grid-column-start: ${(props) => props.column};
  grid-column-end: ${(props) => props.column+2};
  grid-row: ${(props) => props.row};
  z-index: 3;
  pointer-events: none;
  transition-duration: ${animationDelayFast};
  opacity: 0;
`

const ProjectImg = styled.img<ProjectImgProps>`
  display: block;
  background-color: ${(props) => props.fallbackColor};
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  width: 100%;
  height: 100%;
  z-index: 0;
  transition-duration: ${animationDelayFast};

  &:hover {
    transform: scale(1.1);
  }

  &:hover + ${ProjectDescription} {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ProjectList = styled.div`
  @media only screen and (min-width: ${screenMedium}) {
    display: grid;
    grid-template-columns: repeat(3, ${GridSize});
    grid-auto-rows: ${GridSize};
  }
`;

interface ProjectItemProps {
  alt: string;
  fallbackColor: string;
  imagePath: string;
  index: number;
  name: string;
}

const ProjectItem = ({ alt, fallbackColor, imagePath, index, name }: ProjectItemProps) => {
  const rowImg = Math.floor(index / 3) + 1;
  const columnImg = index % 3 + 1;
  const columnDescription = columnImg === 3 ? 2 : columnImg + 1;

  return (
      <>
        <ProjectImg src={imagePath} alt={alt} fallbackColor={fallbackColor} row={rowImg} column={columnImg} />
        <ProjectDescription row={rowImg} column={columnDescription}>
          {name}
        </ProjectDescription>
    </>
  );
};

const Projects = () => (
  <Section backgroundColor={bgColor} id="projects" title="Projects">
    <Quote
      author="Dejan Stojanović"
      href="https://en.wikipedia.org/wiki/Dejan_Stojanovi%C4%87"
    >
      The most complicated skill is to be simple.
    </Quote>
    <ProjectList>
      {PROJECTS.map((project, index) => (
        <ProjectItem key={index} {...project} index={index} />
      ))}
    </ProjectList>
  </Section>
);

export default Projects;
