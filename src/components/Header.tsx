import React from "react";
import styled from "styled-components";
import { screenLarge } from "./styleConstants";

const HeaderContainer = styled.section`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const FullVideo = styled.video`
  min-height: 100%;
  min-width: 100%;
  position: absolute;
`;

const Hero = styled.div`
  color: white;
  z-index: 1;
`;

const HeroHeader = styled.h1`
  font-size: 3em;
  text-transform: uppercase;

  @media only screen and (min-width: ${screenLarge}) {
    font-size: 5vw;
  }
`;

const ButtonRow = styled.div``;

const Button = styled.a``;

const dropboxResume =
  "https://www.dropbox.com/s/l2a7xfibomb4a59/CV%20Ignacio%20Avas.pdf?dl=1";

const Header = () => (
  <HeaderContainer>
    <FullVideo controls={false} autoPlay={true} muted={true} loop={true}>
      <source src="/video/head.webm" type="video/webm" />
      <source src="/video/head.mp4" type="video/mp4" />
    </FullVideo>
    <Hero>
      <HeroHeader>Developer.</HeroHeader>
      <ButtonRow>
        <Button href="#contact">Contact</Button>
        <Button href={dropboxResume}>Resume</Button>
      </ButtonRow>
    </Hero>
  </HeaderContainer>
);

export default Header;
