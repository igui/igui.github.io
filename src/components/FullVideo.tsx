import React, { forwardRef, Ref } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { animationDelaySlow } from "./styleConstants";

const Container = styled.video`
  min-height: 100%;
  min-width: 100%;
  opacity: 1;
  position: absolute;
  transition: opacity ${animationDelaySlow} 1s;

  &.invisible {
    opacity: 0;
  }
`;

interface ClassNameProps {
  className?: string;
}

const FullVideoWithRef = (
  { className }: ClassNameProps,
  ref: Ref<HTMLVideoElement>
) => {
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
    <Container
      className={className}
      controls={false}
      autoPlay={true}
      muted={true}
      loop={true}
      ref={ref}
    >
      <source src={videoSources.webM.publicURL} type="video/webm" />
      <source src={videoSources.mp4.publicURL} type="video/mp4" />
    </Container>
  );
};

export default forwardRef(FullVideoWithRef);
