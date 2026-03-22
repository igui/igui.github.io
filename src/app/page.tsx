import {
  getMarkdownByTitle,
  getMarkdownByPath,
  getMarkdownsByPathGlob,
} from "@/lib/markdown";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const aboutContent = await getMarkdownByTitle("about-section-content");
  const skillsHeading = await getMarkdownByPath("/skills-heading");
  const projects = await getMarkdownsByPathGlob("/projects/*", "asc");
  const experiences = await getMarkdownsByPathGlob("/experiences/*", "desc");
  const publicationsHeading = await getMarkdownByPath("/publications-heading");
  const publications = await getMarkdownsByPathGlob("/publications/*", "asc");

  return (
    <HomeContent
      aboutHtml={aboutContent.html}
      skillsHeadingHtml={skillsHeading.html}
      projects={projects.map((p) => ({ id: p.id, html: p.html }))}
      experiences={experiences.map((e) => ({ id: e.id, html: e.html }))}
      publicationsHeadingHtml={publicationsHeading.html}
      publications={publications.map((p) => ({ id: p.id, html: p.html }))}
    />
  );
}
