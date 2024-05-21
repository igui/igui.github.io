import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  animationDelaySlow,
  copyColor,
  copySecondaryColor,
  linkColor,
  screenMedium,
  smallSpacing,
  tertiaryBgColor,
  xlargeSpacing,
} from "./styleConstants";

interface SectionWrapperProps {
  bgcolor: string;
}

interface SectionContentProps {
  dark?: "true" | "false";
}

interface SectionProps extends SectionWrapperProps, SectionContentProps {
  children: ReactNode | ReactNode[];
  id: string;
  title: string;
}

const SectionWrapper = styled.section<SectionWrapperProps>`
  margin-top: 0;
  background-color: ${(props) => props.bgcolor};
`;

const SectionContent = styled.div<SectionContentProps>`
  color: ${(props) => (props.dark === "true" ? tertiaryBgColor : copyColor)};
  line-height: 26px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${screenMedium};
  padding-left: ${smallSpacing};
  padding-right: ${smallSpacing};
  padding-top: ${smallSpacing};
  padding-bottom: ${xlargeSpacing};

  a {
    color: ${(props) => (props.dark ? copySecondaryColor : linkColor)};
    text-decoration: none;
    transition-duration: ${animationDelaySlow};
    transition-property: color;

    &:hover {
      color: ${copySecondaryColor};
    }
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
`;

const Section = ({ bgcolor, children, id, dark, title }: SectionProps) => (
  <SectionWrapper bgcolor={bgcolor}>
    <SectionContent dark={dark ? "true" : "false"}>
      <SectionTitle id={id}>{title}</SectionTitle>
      {children}
    </SectionContent>
  </SectionWrapper>
);

export default Section;
