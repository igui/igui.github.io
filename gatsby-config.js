/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require("path");

const defaultSiteUrl = "http://ignacioavas.com/";

const getSiteUrl = () =>
  // The URL environment variable comes from Netlify build vars:
  // https://docs.netlify.com/configure-builds/environment-variables
  process.env.URL || defaultSiteUrl;

module.exports = {
  siteMetadata: {
    title: "Ignacio Avas",
    author: "Ignacio Avas",
    description: "Ignacio Avas website",
    siteUrl: getSiteUrl(),
    image: getSiteUrl() + "/social.png",
    social: {
      twitter: "ignacioavas"
    }
  },
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: path.join(__dirname, "src", "assets")
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp"
  ]
};
