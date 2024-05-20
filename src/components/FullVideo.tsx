import React, { forwardRef, Ref } from "react";
import styled from "styled-components";
import posterImg from "./assets/fullVideo/first.jpg";
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
  ref: Ref<HTMLVideoElement>,
) => (
  <Container
    className={className}
    controls={false}
    autoPlay={true}
    muted={true}
    loop={true}
    ref={ref}
    poster={posterImg}
  >
    <source src="/videos/head.webm" type="video/webm" />
    <source src="/videos/head.mp4" type="video/mp4" />
  </Container>
);

export default forwardRef(FullVideoWithRef);
