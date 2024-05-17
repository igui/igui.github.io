import React, { forwardRef, Ref } from "react";
import styled from "styled-components";
import {
  bgColor,
  animationDelayFast,
  copyColor,
  smallSpacing,
  mediumSpacing,
  screenMedium,
  xsmallSpacing,
  animationDelaySlow,
} from "./styleConstants";
import { graphql, useStaticQuery } from "gatsby";

const Container = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;
  opacity: 1;
  padding: ${mediumSpacing};
  transition: all ${animationDelaySlow} 2s;
  z-index: 2;

  @media only screen and (min-width: ${screenMedium}) {
    justify-content: space-between;
  }

  &.invisible {
    opacity: 0;
    transform: translateY(-25%);
  }
`;

const ImageLogo = styled.img`
  display: inline-block;
  max-height: 60px;
  max-width: 60px;
  margin-right: ${smallSpacing};
`;

const NavLink = styled.a`
  color: ${bgColor};
  font-size: 1.2em;
  letter-spacing: -1px;
  margin-left: ${xsmallSpacing};
  margin-right: ${xsmallSpacing};
  padding: ${xsmallSpacing} ${smallSpacing};
  text-decoration: none;
  text-transform: uppercase;
  transition: all ${animationDelayFast} 0s;

  &:first-child {
    margin-left: 0;
  }

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
    display: flex;
  }
`;

interface ClassNameProps {
  className?: string;
}

const NavRowWithRef = (
  { className }: ClassNameProps,
  ref: Ref<HTMLElement>,
) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/ia.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <Container className={className} ref={ref}>
      <NavLogoAnchor href="#">
        <ImageLogo src={data.file.publicURL} alt="Website logo" />
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

export default forwardRef(NavRowWithRef);
