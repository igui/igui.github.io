import React from "react";
import styled from "styled-components";
import {
  screenLarge,
  bgColor,
  xsmallSpacing,
  smallSpacing,
  animationDelayFast,
  copyColor
} from "./styleConstants";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const HeroHeader = styled.h1`
  font-size: 3em;
  margin: ${smallSpacing} 0;
  text-transform: uppercase;

  @media only screen and (min-width: ${screenLarge}) {
    font-size: 5vw;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.a`
  border: 2px solid ${bgColor};
  color: ${bgColor};
  margin-left: ${xsmallSpacing};
  margin-right: ${xsmallSpacing};
  min-width: 100px;
  opacity: inherit;
  padding: ${smallSpacing};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  transition: all ${animationDelayFast} 0s;

  &:hover,
  &:active {
    color: ${copyColor};
    background-color: ${bgColor};
  }
`;
const dropboxResume =
  "https://www.dropbox.com/s/l2a7xfibomb4a59/CV%20Ignacio%20Avas.pdf?dl=1";

const Hero = () => (
  <Container>
    <HeroHeader>Developer.</HeroHeader>
    <ButtonRow>
      <Button href="#contact">Contact</Button>
      <Button href={dropboxResume}>Resume</Button>
    </ButtonRow>
  </Container>
);

export default Hero;
