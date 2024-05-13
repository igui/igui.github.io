import React from "react";
import Section from "./Section";
import { tertiaryBgColor } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";

const Experience = styled.div`
  display: grid;

  grid-template-columns: 1fr 64px;
  grid-template-rows: auto auto auto;
  gap: 0px 5px;
  grid-template-areas:
    "company image"
    "period image"
    "position image";

  > img {
    grid-area: image;
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
  > p {
    margin: 0;
    text-align: justify;
    grid-column: 1 / 3;
  }

  & + & {
    margin-top: 20px;
  }
`;

const Timeline = styled.div`
`;

interface MarkdownRemarkNode {
  id: string;
  html: string;
  frontmatter: {
    path: string;
  };
}

const Experiences = () => {
  const pageQuery = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {path: {glob: "/experiences/*"}}}) {
        nodes {
          id
          frontmatter {
            path
          }
          html
        }
      }
    }
  `);

  const sortedExperiences = pageQuery.allMarkdownRemark.nodes.sort(
      ({ frontmatter: { path: pathA } }: MarkdownRemarkNode,
       { frontmatter: { path: pathB }}: MarkdownRemarkNode) => (
        // Sort by path in descending order
      pathB.localeCompare(pathA)
    )
  );

  return (
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

      <Timeline>
        {sortedExperiences.map((node: MarkdownRemarkNode) => (
          <Experience key={node.id} dangerouslySetInnerHTML={{ __html: node.html }} />
        ))}
      </Timeline>
    </Section>
  );
};

export default Experiences;
