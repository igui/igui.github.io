import React from "react";
import Section from "./Section";
import { bgColor, screenSmall } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { screenMedium } from "./styleConstants";
import { graphql, useStaticQuery } from "gatsby";
import { MarkdownRemarkNode } from "./types";

const PublicationList = styled.ul``;

const PublicationItem = styled.li``;

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
