import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import Quote from "./Quote";
import Section from "./Section";
import { bgColor, mediumSpacing } from "./styleConstants";
import { MarkdownRemarkNode } from "./types";

const PublicationList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PublicationItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-template-rows: auto auto auto auto;
  gap: 0px 5px;
  grid-template-areas:
    "title image"
    "publication image"
    "figure figure"
    "content content";
  margin-top: ${mediumSpacing};

  > img {
    grid-area: image;
    max-width: 100%;
    max-height: 60px;
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
    grid-area: figure;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${mediumSpacing} 0 0 0;

    > img {
      max-width: 100%;
    }
  }

  p {
    grid-area: content;
  }
`;

const Heading = styled.p`
  text-align: justify;
`;

const Publications = () => {
  const pageQuery = useStaticQuery(graphql`
    {
      heading: markdownRemark(
        frontmatter: { path: { eq: "/publications-heading" } }
      ) {
        html
      }

      publications: allMarkdownRemark(
        filter: { frontmatter: { path: { glob: "/publications/*" } } }
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
    <Section backgroundColor={bgColor} id="publications" title="Publications">
      <Quote
        author="Carl Sagan"
        href="https://www.britannica.com/biography/Carl-Sagan"
        content="Somewhere, something incredible is waiting to be known."
      />

      <Heading dangerouslySetInnerHTML={{ __html: pageQuery.heading.html }} />

      <PublicationList>
        {pageQuery.publications.nodes.map((node: MarkdownRemarkNode) => (
          <PublicationItem
            key={node.id}
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
        ))}
      </PublicationList>
    </Section>
  );
};

export default Publications;
