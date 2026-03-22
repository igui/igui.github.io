const defaultSiteUrl = "https://ignacioavas.com";

const getSiteUrl = () => process.env.URL || defaultSiteUrl;

export const siteMetadata = {
  title: "Ignacio Avas",
  author: "Ignacio Avas",
  description: "Ignacio Avas website",
  siteUrl: getSiteUrl(),
  image: getSiteUrl() + "/social.png",
  social: {
    twitter: "ignacioavas",
  },
};
