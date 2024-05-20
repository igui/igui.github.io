import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  mediumSpacing,
  smallSpacing,
  tertiaryBgColor,
  xsmallSpacing,
} from "./styleConstants";

interface ContactLinkProps {
  linkProtected: boolean;
  icon: string;
  href: string;
}

const Image = styled.img`
  width: ${mediumSpacing};
  height: ${mediumSpacing};
  background-color: ${tertiaryBgColor};
  padding: ${xsmallSpacing};
  border-radius: ${xsmallSpacing};
  margin-right: ${smallSpacing};
  margin-left: ${smallSpacing};
`;

export const Container = styled.div`
  display: flex;
  margin-bottom: ${mediumSpacing};
`;

const hrefToText = (href: string) => {
  const match = /^\w+:(\/\/)?(.*)$/.exec(href);
  return match ? match[2] : href;
};

const ContactLink = ({ icon, href, linkProtected }: ContactLinkProps) => {
  // to partially protect agains botss
  const [realLink, setRealLink] = useState(linkProtected ? "" : href);
  useEffect(() => {
    if (linkProtected) {
      // To display the real link only if JS is enabled, after the page loads
      setRealLink(href);
    }
  });

  return (
    <Container>
      <Image src={icon} alt="Logo" />
      <a href={realLink}>{hrefToText(realLink)}</a>
    </Container>
  );
};

export default ContactLink;
