import React from "react";
import Section from "./Section";
import { secondaryBgColor, screenMedium, largeSpacing } from "./styleConstants";
import Quote from "./Quote";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import ContactLink, { Container } from "./ContactLink";

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

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      email: file(relativePath: { eq: "images/email.svg" }) {
        publicURL
      }
      github: file(relativePath: { eq: "images/github.svg" }) {
        publicURL
      }
      linkedin: file(relativePath: { eq: "images/linkedin.svg" }) {
        publicURL
      }
      twitter: file(relativePath: { eq: "images/twitter.svg" }) {
        publicURL
      }
    }
  `);

  return (
    <Section
      dark={true}
      backgroundColor={secondaryBgColor}
      id="contact"
      title="Contact"
    >
      <Quote
        author="Larry Constantine"
        href="https://en.wikipedia.org/wiki/Larry_Constantine"
      >
        Hiring people to write code to sell is not the same as hiring people to
        design and build durable, usable, dependable software.
      </Quote>

      <LinkContainer>
        <ContactLink
          icon={data.github.publicURL}
          href="https://github.com/igui"
          linkProtected={false}
        />
        <ContactLink
          icon={data.linkedin.publicURL}
          href="https://linkedin.com/in/iavas"
          linkProtected={false}
        />
        <ContactLink
          icon={data.twitter.publicURL}
          href="https://twitter.com/ignacioavas"
          linkProtected={false}
        />
        <ContactLink
          icon={data.email.publicURL}
          href="mailto:contact@ignacioavas.com"
          linkProtected={true}
        />
      </LinkContainer>
    </Section>
  );
};

export default Contact;
