"use client";

import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import {
  animationDelaySlow,
  bgColor,
  smallSpacing,
  tertiaryBgColor,
} from "./styleConstants";

interface ExperienceProps {
  $active: "true" | "false";
}

const Experience = styled.div<ExperienceProps>`
  background-color: ${(props) => (props.$active === "true" ? bgColor : "unset")};
  display: grid;
  max-height: ${(props) => (props.$active === "true" ? "unset" : "72px")};
  padding: ${smallSpacing};
  grid-template-columns: 1fr 64px;
  grid-template-rows: auto auto auto;
  gap: 0px 5px;
  grid-template-areas:
    "company image"
    "period image"
    "position image";
  transition: all ${animationDelaySlow};

  > a,
  > img {
    grid-area: image;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  > h3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: initial;
    grid-area: company;
    margin: 0;
  }
  > h4 {
    font-size: initial;
    grid-area: position;
    margin: 0;
  }
  > h5 {
    font-size: initial;
    grid-area: period;
    margin: 0;
  }

  > ul {
    background-color: ${bgColor};
    grid-column: 1 / 3;
    list-style: none;
    margin: 0;
    opacity: ${(props) => (props.$active === "true" ? 1 : 0)};
    padding: ${smallSpacing};
    text-align: justify;
    transition: opacity ${animationDelaySlow};
    pointer-events: ${(props) => (props.$active === "true" ? "unset" : "none")};
    width: 100%;
    right: ${smallSpacing};
    position: relative;
    z-index: 1;
  }
`;

interface MarkdownItem {
  id: string;
  html: string;
}

interface ExperiencesProps {
  items: MarkdownItem[];
  activeElement: null | string;
  onElementClick: (id: string) => void;
}

const Experiences = ({
  items,
  activeElement,
  onElementClick,
}: ExperiencesProps) => (
  <Section bgcolor={tertiaryBgColor} id="experience" title="Experiences">
    <Quote
      author="Bjarne Stroustrup"
      href="https://en.wikipedia.org/wiki/Bjarne_Stroustrup"
      content="Design and programming are human activities; forget that and all is lost"
    />

    <div>
      {items.map((node) => (
        <Experience
          $active={activeElement === node.id ? "true" : "false"}
          onClick={() => onElementClick(node.id)}
          key={node.id}
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      ))}
    </div>
  </Section>
);

export default Experiences;
