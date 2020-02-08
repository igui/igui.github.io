import React from "react";
import styled from "styled-components";
import { bgColor, copyColor } from "./styleConstants";
import NavRow from "./NavRow";
import Hero from "./Hero";
import FullVideo from "./FullVideo";
import { useStaticQuery, graphql } from "gatsby";

interface HeaderContainerProps {
  // background image (comes from graphQL)
  bg: string;
}

const HeaderContainer = styled.section<HeaderContainerProps>`
  background-color: ${copyColor};
  background-image: url(${props => props.bg});
  color: ${bgColor};
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Header = () => {
  const videoCover = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/video-cover.jpg" }) {
        publicURL
      }
    }
  `);

  return (
    <HeaderContainer bg={videoCover.file.publicURL}>
      <FullVideo />
      <NavRow />
      <Hero />
    </HeaderContainer>
  );
};

export default Header;
