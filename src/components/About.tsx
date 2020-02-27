import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  screenMedium,
  tertiaryBgColor,
  copyColor,
  smallSpacing,
  copySecondaryColor,
  linkColor,
  animationDelaySlow,
  xlargeSpacing
} from "./styleConstants";
import styled from "styled-components";

const AboutSection = styled.section`
  background-color: ${tertiaryBgColor};
`;

const Content = styled.div`
  color: ${copyColor};
  line-height: 26px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${screenMedium};
  padding-left: ${smallSpacing};
  padding-right: ${smallSpacing};
  padding-top: ${smallSpacing};
  padding-bottom: ${smallSpacing};

  a {
    color: ${linkColor};
    text-decoration: none;
    transition-duration: ${animationDelaySlow};
    transition-property: color;

    &:hover {
      color: ${copySecondaryColor};
    }
  }
`;

const Title = styled.h2`
  text-align: center;
`;

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
    <AboutSection>
      <Content>
        <Title>About me</Title>
        <Headline
          dangerouslySetInnerHTML={{ __html: pageQuery.headline.html }}
        />
        <Divider />
        <SectionText
          dangerouslySetInnerHTML={{ __html: pageQuery.section.html }}
        />
      </Content>
    </AboutSection>
  );
};

export default About;
