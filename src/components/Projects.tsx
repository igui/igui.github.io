import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import {
  animationDelayFast,
  bgColor,
  screenMedium,
  screenSmall,
} from "./styleConstants";
import { MarkdownRemarkNode } from "./types";

const GridSize = "220px";

const ProjectListWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: clip;
`;

interface ProjectProps {
  active: null | false | true;
}

const Project = styled.div<ProjectProps>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.active === false ? 0.5 : 1)};
  transition: opacity ${animationDelayFast};
  width: ${GridSize};
  z-index: ${(props) => (props.active === true ? 1 : 0)};

  h3 {
    order: -1;
  }

  // Make the project description be on top
  imgwrapper {
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
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    opacity: 0;
    margin: 0;
    order: unset;
    padding: 10px;
    position: relative;
    transition: opacity ${animationDelayFast};
  }

  h3,
  p {
    opacity: ${(props) => (props.active === true ? "1" : "0")};
    background-color: ${bgColor};
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

  @media only screen and (min-width: ${screenSmall}) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: ${screenMedium}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Projects = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleActiveProject = (id: string) => {
    if (activeProject === id) {
      setActiveProject(null);
    } else {
      setActiveProject(id);
    }
  };

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
              active={activeProject === null ? null : activeProject === node.id}
              key={node.id}
              onClick={() => toggleActiveProject(node.id)}
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          ))}
        </ProjectList>
      </ProjectListWrapper>
    </Section>
  );
};

export default Projects;
