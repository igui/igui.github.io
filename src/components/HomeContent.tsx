"use client";

import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experiences from "./Experiences";
import Publications from "./Publications";
import Contact from "./Contact";

interface MarkdownItem {
  id: string;
  html: string;
}

interface HomeContentProps {
  aboutHtml: string;
  skillsHeadingHtml: string;
  projects: MarkdownItem[];
  experiences: MarkdownItem[];
  publicationsHeadingHtml: string;
  publications: MarkdownItem[];
}

// TODO: Think of a safer way to store the Mixpanel token
mixpanel.init("428c165f58ca09a568884e7dbaf0f01d", { ignore_dnt: true });

export default function HomeContent({
  aboutHtml,
  skillsHeadingHtml,
  projects,
  experiences,
  publicationsHeadingHtml,
  publications,
}: HomeContentProps) {
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
    <>
      <Header />
      <About html={aboutHtml} />
      <Skills headingHtml={skillsHeadingHtml} />
      <Projects
        items={projects}
        activeElement={activeProject}
        onElementClick={(id) => toggleActiveElement(id, "projects")}
      />
      <Experiences
        items={experiences}
        activeElement={activeExpPublication}
        onElementClick={(id) => toggleActiveElement(id, "experiences")}
      />
      <Publications
        items={publications}
        headingHtml={publicationsHeadingHtml}
        activeElement={activeExpPublication}
        onElementClick={(id) => toggleActiveElement(id, "publications")}
      />
      <Contact />
    </>
  );
}
