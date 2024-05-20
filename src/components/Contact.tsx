import React from "react";
import styled from "styled-components";
import ContactLink, { Container } from "./ContactLink";
import Quote from "./Quote";
import Section from "./Section";
import emailSvg from "./assets/contact/email.svg";
import githubSvg from "./assets/contact/github.svg";
import linkedinSvg from "./assets/contact/linkedin.svg";
import twitterSvg from "./assets/contact/twitter-x.svg";
import { largeSpacing, screenMedium, secondaryBgColor } from "./styleConstants";

const LinkContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  padding-left: ${largeSpacing};
  padding-right: ${largeSpacing};

  ${Container} {
    flex-basis: 100%;
  }

  @media only screen and (min-width: ${screenMedium}) {
    ${Container} {
      flex-basis: 50%;

      :nth-child(even) {
        flex-flow: row-reverse;
      }
    }
  }
`;

const Contact = () => (
  <Section
    dark={true}
    backgroundColor={secondaryBgColor}
    id="contact"
    title="Contact"
  >
    <Quote
      author="Larry Constantine"
      href="https://en.wikipedia.org/wiki/Larry_Constantine"
      content="Hiring people to write code to sell is not the same as hiring people to design and build durable, usable, dependable software."
    />

    <LinkContainer>
      <ContactLink
        icon={githubSvg}
        href="https://github.com/igui"
        linkProtected={false}
      />
      <ContactLink
        icon={linkedinSvg}
        href="https://linkedin.com/in/iavas"
        linkProtected={false}
      />
      <ContactLink
        icon={twitterSvg}
        href="https://x.com/ignacioavas"
        linkProtected={false}
      />
      <ContactLink
        icon={emailSvg}
        href="mailto:contact@ignacioavas.com"
        linkProtected={true}
      />
    </LinkContainer>
  </Section>
);

export default Contact;
