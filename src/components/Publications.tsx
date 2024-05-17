import React from "react";
import Section from "./Section";
import { bgColor, screenSmall } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { screenMedium } from "./styleConstants";
import { graphql, useStaticQuery } from "gatsby";


const Publications = () => {
  const pageQuery = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: {frontmatter: {path: {glob: "/publications/*"}}}, sort: { fileAbsolutePath: ASC }) {
        nodes {
          html
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
      >
        Somewhere, something incredible is waiting to be known.
      </Quote>

    </Section>
  );
};

export default Publications;
