import React, { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Experiences from "../components/Experiences";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Projects from "../components/Projects";
import Publications from "../components/Publications";
import Skills from "../components/Skills";
import { useMixpanel } from "gatsby-plugin-mixpanel";

const IndexPage = () => {
  // Tracks the active project or experience so that we remove focus
  // when passing from one section to the other one
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);

  const toggleActiveElement = (id: string, type: string) => {
    if (type === "projects") {
      setActiveProject(activeProject === id ? null : id);
      setActiveExperience(null);
    } else {
      setActiveExperience(activeExperience === id ? null : id);
      setActiveProject(null);
    }
  };

  // Track page load
  const mixpanel = useMixpanel();
  mixpanel.track("Page loaded");
  console.debug("Page loaded");

  return (
    <Layout>
      <Header />
      <About />
      <Skills />
      <Projects
        activeElement={activeProject}
        onElementClick={(id) => toggleActiveElement(id, "projects")}
      />
      <Experiences
        activeElement={activeExperience}
        onElementClick={(id) => toggleActiveElement(id, "experiences")}
      />
      <Publications
        activeElement={activeExperience}
        onElementClick={(id) => toggleActiveElement(id, "publications")}
      />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
