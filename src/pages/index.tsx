import mixpanel from "mixpanel-browser";
import React, { useEffect, useState } from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Experiences from "../components/Experiences";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Projects from "../components/Projects";
import Publications from "../components/Publications";
import Skills from "../components/Skills";

// TODO: Think of a safer way to store the Mixpanel token
mixpanel.init("428c165f58ca09a568884e7dbaf0f01d", { ignore_dnt: true });

const IndexPage = () => {
  // Tracks the active project or experience so that we remove focus
  // when passing from one section to the other one
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeExpPublication, setActiveExpPublication] = useState<
    string | null
  >(null);

  const toggleActiveElement = (id: string, type: string) => {
    mixpanel.track("Element clicked", { id, type });

    if (type === "projects") {
      setActiveProject(activeProject === id ? null : id);
      setActiveExpPublication(null);
    } else {
      setActiveExpPublication(activeExpPublication === id ? null : id);
      setActiveProject(null);
    }
  };

  useEffect(() => {
    mixpanel.track("Page visited");
  }, []);

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
        activeElement={activeExpPublication}
        onElementClick={(id) => toggleActiveElement(id, "experiences")}
      />
      <Publications
        activeElement={activeExpPublication}
        onElementClick={(id) => toggleActiveElement(id, "publications")}
      />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
