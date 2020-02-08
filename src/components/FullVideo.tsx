import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

const Container = styled.video`
  min-height: 100%;
  min-width: 100%;
  position: absolute;
`;

const FullVideo = () => {
  const videoSources = useStaticQuery(graphql`
    query {
      webM: file(relativePath: { eq: "videos/head.webm" }) {
        publicURL
      }
      mp4: file(relativePath: { eq: "videos/head.mp4" }) {
        publicURL
      }
    }
  `);

  return (
    <Container controls={false} autoPlay={true} muted={true} loop={true}>
      <source src={videoSources.webM.publicURL} type="video/webm" />
      <source src={videoSources.mp4.publicURL} type="video/mp4" />
    </Container>
  );
};

export default FullVideo;
