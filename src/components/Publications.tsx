"use client";

import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import {
  bgColor,
  tertiaryBgColor,
  mediumSpacing,
  animationDelaySlow,
} from "./styleConstants";

const PublicationList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

interface PublicationItemProps {
  $active: "true" | "false";
}

const PublicationItem = styled.li<PublicationItemProps>`
  background-color: ${(props) =>
    props.$active === "true" ? tertiaryBgColor : "unset"};
  display: grid;
  gap: 0;
  grid-template-columns: 1fr 72px;
  grid-template-rows: repeat(4, auto);
  grid-template-areas:
    "title image"
    "publication image"
    "figure figure"
    "content content";
  margin-top: ${mediumSpacing};
  padding: ${mediumSpacing};
  max-height: ${(props) => (props.$active === "true" ? "unset" : "60px")};
  position: relative;
  z-index: ${(props) => (props.$active === "true" ? 1 : 0)};

  > img {
    grid-area: image;
    margin-left: auto;
    max-height: 48px;
    max-width: 100%;
  }

  h2 {
    grid-area: title;
    margin: 0;
    font-size: 1rem;
  }

  h3 {
    grid-area: publication;
    margin: 0;
    font-size: 1rem;
  }

  figure {
    background-color: ${tertiaryBgColor};
    opacity: ${(props) => (props.$active === "true" ? 1 : 0)};
    grid-area: figure;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: ${(props) => (props.$active === "true" ? "unset" : "none")};
    margin: ${mediumSpacing} 0 0 0;

    > img {
      max-width: 100%;
    }
  }

  p {
    background-color: ${tertiaryBgColor};
    pointer-events: ${(props) => (props.$active === "true" ? "unset" : "none")};
    opacity: ${(props) => (props.$active === "true" ? 1 : 0)};
    grid-area: content;
    transition: opacity ${animationDelaySlow};
  }
`;

const Heading = styled.p`
  text-align: justify;
`;

interface MarkdownItem {
  id: string;
  html: string;
}

interface PublicationsProps {
  items: MarkdownItem[];
  headingHtml: string;
  activeElement: string | null;
  onElementClick: (id: string) => void;
}

const Publications = ({
  items,
  headingHtml,
  activeElement,
  onElementClick,
}: PublicationsProps) => (
  <Section bgcolor={bgColor} id="publications" title="Publications">
    <Quote
      author="Carl Sagan"
      href="https://www.britannica.com/biography/Carl-Sagan"
      content="Somewhere, something incredible is waiting to be known."
    />

    <Heading dangerouslySetInnerHTML={{ __html: headingHtml }} />

    <PublicationList>
      {items.map((node) => (
        <PublicationItem
          $active={activeElement === node.id ? "true" : "false"}
          onClick={() => onElementClick(node.id)}
          key={node.id}
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      ))}
    </PublicationList>
  </Section>
);

export default Publications;
