"use client";

import styled from "styled-components";
import ContactLink, { Container } from "./ContactLink";
import Quote from "./Quote";
import Section from "./Section";
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
  <Section dark={true} bgcolor={secondaryBgColor} id="contact" title="Contact">
    <Quote
      author="Larry Constantine"
      href="https://en.wikipedia.org/wiki/Larry_Constantine"
      content="Hiring people to write code to sell is not the same as hiring people to design and build durable, usable, dependable software."
    />

    <LinkContainer>
      <ContactLink
        icon="/assets/contact/github.svg"
        href="https://github.com/igui"
        linkProtected={false}
      />
      <ContactLink
        icon="/assets/contact/linkedin.svg"
        href="https://linkedin.com/in/iavas"
        linkProtected={false}
      />
      <ContactLink
        icon="/assets/contact/twitter-x.svg"
        href="https://x.com/ignacioavas"
        linkProtected={false}
      />
      <ContactLink
        icon="/assets/contact/email.svg"
        href="mailto:contact@ignacioavas.com"
        linkProtected={true}
      />
    </LinkContainer>
  </Section>
);

export default Contact;
