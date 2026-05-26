export type Role =
  | 'AI Engineer'
  | 'ML Researcher'
  | 'Recommendation Systems'
  | 'NLP Specialist'
  | 'Deep Learning';

export interface SocialLink {
  label: string;
  handle?: string;
  href: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface MarqueeSkill {
  name: string;
  icon: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  logo: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  abstract: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  type: string;
  image: string;
  cta?: boolean;
}

export interface Profile {
  name: string;
  surname: string;
  tagline: string;
  bio: string;
  yearsExperience: number;
  yearsInAI: number;
  languages: string[];
  flags: string[];
  roles: Role[];
  socials: SocialLink[];
  about: { headline: string; paragraphs: string[] };
  skills: SkillGroup[];
  marqueeSkills: MarqueeSkill[];
  experience: ExperienceItem[];
  publications: Publication[];
  projects: Project[];
  contact: {
    headline: string;
    intro: string;
    email: string;
  };
}

import profileData from './profile.json' with { type: 'json' };

export const profile: Profile = profileData as Profile;

/**
 * Render a compact, plain-text profile summary suitable for stuffing into an
 * LLM system prompt. Stable structure so prompt cache hits remain effective.
 */
export function renderProfileForPrompt(p: Profile = profile): string {
  const skills = p.skills
    .map((g) => `- ${g.label}: ${g.skills.join(', ')}`)
    .join('\n');

  const experience = p.experience
    .map(
      (e) =>
        `- ${e.company} — ${e.role} (${e.period})\n  ${e.description}\n  Stack: ${e.tags.join(', ')}`,
    )
    .join('\n');

  const publications = p.publications
    .map((pub) => `- "${pub.title}" — ${pub.venue} (${pub.year}). ${pub.abstract}`)
    .join('\n');

  const projects = p.projects
    .filter((proj) => !proj.cta)
    .map((proj) => `- ${proj.name} (${proj.type}): ${proj.description}`)
    .join('\n');

  const socials = p.socials.map((s) => `- ${s.label}: ${s.href}`).join('\n');

  return [
    `Name: ${p.name} ${p.surname}`,
    `Tagline: ${p.tagline}`,
    `Years of experience: ${p.yearsExperience} (about ${p.yearsInAI} years focused on AI/ML)`,
    `Spoken languages: ${p.languages.join(', ')}`,
    '',
    'About:',
    p.about.paragraphs.join(' '),
    '',
    'Skills:',
    skills,
    '',
    'Experience (most recent first):',
    experience,
    '',
    'Publications:',
    publications,
    '',
    'Projects:',
    projects,
    '',
    'Contact and socials:',
    socials,
  ].join('\n');
}
