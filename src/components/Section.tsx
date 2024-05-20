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
  backgroundColor: string;
}

interface SectionContentProps {
  dark?: boolean;
}

interface SectionProps extends SectionWrapperProps, SectionContentProps {
  children: ReactNode | ReactNode[];
  id: string;
  title: string;
}

const SectionWrapper = styled.section<SectionWrapperProps>`
  margin-top: 0;
  background-color: ${(props) => props.backgroundColor};
`;

const SectionContent = styled.div<SectionContentProps>`
  color: ${(props) => (props.dark ? tertiaryBgColor : copyColor)};
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

const Section = ({
  backgroundColor,
  children,
  id,
  dark,
  title,
}: SectionProps) => (
  <SectionWrapper backgroundColor={backgroundColor}>
    <SectionContent dark={dark}>
      <SectionTitle id={id}>{title}</SectionTitle>
      {children}
    </SectionContent>
  </SectionWrapper>
);

export default Section;
