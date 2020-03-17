import React, { ReactNode } from "react";
import styled from "styled-components";
import { copySecondaryColor, xlargeSpacing } from "./styleConstants";

interface QuoteProps {
  children: ReactNode;
  author: string;
  href: string;
}

const Content = styled.div`
  color: ${copySecondaryColor};
  font-style: italic;
`;

const AuthorLink = styled.a`
  &:before {
    content: "— ";
  }
`;

const Container = styled.blockquote`
  text-align: center;
`;

const Divider = styled.hr`
  color: ${copySecondaryColor};
  margin-bottom: ${xlargeSpacing};
  margin-top: ${xlargeSpacing};
`;

const Quote = ({ author, children, href }: QuoteProps) => (
  <Container>
    <Content>{children}</Content>
    <AuthorLink href={href}>{author}</AuthorLink>
    <Divider />
  </Container>
);

export default Quote;
