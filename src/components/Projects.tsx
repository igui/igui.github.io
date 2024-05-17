import React from "react";
import Section from "./Section";
import { animationDelaySlow, bgColor, screenSmall } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import {
  animationDelayFast,
  screenMedium,
  smallSpacing,
  tertiaryBgColor,
} from "./styleConstants";
import { graphql, useStaticQuery } from "gatsby";
import { MarkdownRemarkNode } from "./types";

const GridSize = "220px";

const ProjectListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  width: ${GridSize};

  h3 {
    order: -1;
  }

  // Make the project description be on top
  imgwrapper {
    order: unset;
    width: ${GridSize};
    height: ${GridSize};
    margin-left: auto;
    margin-right: auto;

    img {
      max-width: ${GridSize};
      max-height: ${GridSize};
    }
  }

  // Hack to make the project description to be as wide as the grid
  h3,
  p {
    box-sizing: border-box;
    display: none;
    margin: 0;
    order: unset;
    padding: 10px;
    position: relative;
  }

  &:hover {
    opacity: 1 !important;
    z-index: 1;

    h3,
    p {
      display: initial;
      background-color: ${bgColor};
    }
  }

  @media only screen and (min-width: ${screenSmall}) and (max-width: calc(${screenMedium} - 1px)) {
    h3,
    p {
      width: calc(2 * ${GridSize});
    }

    // Make the project description align to the left side of the grid
    &:nth-child(even) {
      * {
        left: -${GridSize};
      }
    }
  }

  @media only screen and (min-width: ${screenMedium}) {
    h3,
    p {
      width: calc(3 * ${GridSize});
    }

    // Make the project description align to the left side of the grid
    &:nth-child(3n + 2) {
      * {
        left: -${GridSize};
      }
    }
    &:nth-child(3n + 3) {
      * {
        left: calc(-2 * ${GridSize});
      }
    }
  }
`;

const ProjectList = styled.div`
  display: grid;
  grid-auto-rows: ${GridSize};
  grid-template-columns: 1fr;

  &:hover ${Project} {
    opacity: 0.5;
  }

  @media only screen and (min-width: ${screenSmall}) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: ${screenMedium}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Projects = () => {
  const pageQuery = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { path: { glob: "/projects/*" } } }
        sort: { fileAbsolutePath: ASC }
      ) {
        nodes {
          html
          id
          frontmatter {
            title
          }
        }
      }
    }
  `);

  return (
    <Section backgroundColor={bgColor} id="projects" title="Projects">
      <Quote
        author="Alan Turing"
        href="https://en.wikipedia.org/wiki/Alan_Turing"
        content="Sometimes it is the people no one imagines anything of who do the things that no-one can imagine."
      />
      <ProjectListWrapper>
        <ProjectList>
          {pageQuery.allMarkdownRemark.nodes.map((node: MarkdownRemarkNode) => (
            <Project
              key={node.id}
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          ))}
        </ProjectList>
      </ProjectListWrapper>
    </Section>
  );
};

export default Projects;
