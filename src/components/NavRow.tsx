import React from "react";
import styled from "styled-components";
import {
  bgColor,
  animationDelayFast,
  copyColor,
  smallSpacing,
  mediumSpacing,
  screenMedium,
  xsmallSpacing
} from "./styleConstants";
import { graphql, useStaticQuery } from "gatsby";

const Container = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${mediumSpacing};
  z-index: 2;

  @media only screen and (min-width: ${screenMedium}) {
    justify-content: space-between;
  }
`;

const ImageLogo = styled.img`
  display: inline-block;
  max-height: 30px;
  max-width: 30px;
  margin-right: ${smallSpacing};
`;

const NavLink = styled.a`
  color: ${bgColor};
  font-size: 1.2em;
  padding: ${xsmallSpacing};
  text-decoration: none;
  transition: all ${animationDelayFast} 0s;

  &:last-child {
    margin-right: 0;
  }

  &:hover,
  &:active {
    background-color: ${bgColor};
    color: ${copyColor};
  }
`;

const NavLogoAnchor = styled.a`
  align-items: center;
  color: ${bgColor};
  display: flex;
  font-size: 1.5em;
  text-decoration: none;
`;

const NavLinksContainer = styled.div`
  display: none;

  @media only screen and (min-width: ${screenMedium}) {
    display: block;
  }
`;

const NavRow = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/ia.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <Container>
      <NavLogoAnchor href="#">
        <ImageLogo src={data.file.publicURL} alt="Website logo" />
        <span>Ignacio Avas</span>
      </NavLogoAnchor>

      <NavLinksContainer>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#experience">Experience</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavLinksContainer>
    </Container>
  );
};

export default NavRow;
