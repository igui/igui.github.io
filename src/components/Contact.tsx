import React from "react";
import Section from "./Section";
import { secondaryBgColor } from "./styleConstants";

const Contact = () => (
  <Section
    dark={true}
    backgroundColor={secondaryBgColor}
    id="contact"
    title="Contact"
  >
    Some stuff here
  </Section>
);

export default Contact;
