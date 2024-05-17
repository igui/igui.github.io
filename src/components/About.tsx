import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  bgColor,
  screenMedium
} from "./styleConstants";
import styled from "styled-components";
import Section from "./Section";
import himImg from "../assets/images/him.jpg";
import himBackImg from "../assets/images/him-back.jpg";

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
`;

const SectionText = styled.div`
  text-align: justify;
`;

const ImgContainerSizeSmall = "120px";
const ImgContainerSizeLarge = "160px";

const ImgContainer = styled.div`
  position: relative;
  grid-column: 2;

  width: ${ImgContainerSizeSmall};
  height: ${ImgContainerSizeSmall};

  img {
    backface-visibility: hidden;
    clip-path: circle(calc(50% - 2px));
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: transform 0.5s;
    width: 100%;
  }

  img:first-child {
    transform: rotateY(0deg);
  }

  img:last-child {
    transform: rotateY(180deg);
  }

  &:hover img:first-child {
    transform: rotateY(180deg);
  }

  &:hover img:last-child {
    transform: rotateY(0deg);
  }

  @media only screen and (min-width : ${screenMedium}) {
    width: ${ImgContainerSizeLarge};
    height: ${ImgContainerSizeLarge};
  }
`

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 3;
`

const BioInfo = styled.div`
`;

const About = () => {
  const pageQuery = useStaticQuery(graphql`
    query {
      section: markdownRemark(
        frontmatter: { title: { eq: "about-section-content" } }
      ) {
        html
      }
    }
  `);

  return (
    <Section backgroundColor={bgColor} id="about" title="About me">
      <Header>
        <ImgContainer>
          <img src={himImg} />
          <img src={himBackImg} />
        </ImgContainer>
      </Header>
      <BioContainer>
          <BioInfo>
            Name: Ignacio Avas
          </BioInfo>
          <BioInfo>
            Countries: 🇺🇾 🇪🇸 🇧🇪
          </BioInfo>
          <BioInfo>
            Languages: Spanish, English, Italian, Dutch
          </BioInfo>
        </BioContainer>

      <SectionText
        dangerouslySetInnerHTML={{ __html: pageQuery.section.html }}
      />
    </Section>
  );
};

export default About;
