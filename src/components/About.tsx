import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  screenMedium,
  copySecondaryColor,
  xlargeSpacing,
  bgColor
} from "./styleConstants";
import styled from "styled-components";
import Section from "./Section";

const Divider = styled.hr`
  color: ${copySecondaryColor};
  margin-bottom: ${xlargeSpacing};
  margin-top: ${xlargeSpacing};
`;

const SectionText = styled.div`
  text-align: justify;

  @media (min-width: ${screenMedium}) {
    columns: 2;
    column-gap: ${xlargeSpacing};
  }

  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const Headline = styled.h4`
  text-align: justify;
`;

const About = () => {
  const pageQuery = useStaticQuery(graphql`
    query {
      headline: markdownRemark(
        frontmatter: { title: { eq: "about-headline" } }
      ) {
        html
      }

      section: markdownRemark(
        frontmatter: { title: { eq: "about-section-content" } }
      ) {
        html
      }
    }
  `);

  return (
    <Section backgroundColor={bgColor} id="about" title="About me">
      <Headline dangerouslySetInnerHTML={{ __html: pageQuery.headline.html }} />
      <Divider />
      <SectionText
        dangerouslySetInnerHTML={{ __html: pageQuery.section.html }}
      />
    </Section>
  );
};

export default About;
