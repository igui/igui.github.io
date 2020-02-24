import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  screenMedium,
  tertiaryBgColor,
  copyColor,
  smallSpacing,
  copySecondaryColor,
  linkColor,
  animationDelaySlow
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
`;

const SectionText = styled.div`
  text-align: justify;
`;

const About = () => {
  const pageQuery = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { title: { eq: "about-section-content" } }) {
        html
      }
    }
  `);

  return (
    <AboutSection>
      <Content>
        <Title>About me</Title>
        <Divider />
        <SectionText
          dangerouslySetInnerHTML={{ __html: pageQuery.markdownRemark.html }}
        />
      </Content>
    </AboutSection>
  );
};

export default About;
