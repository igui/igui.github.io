import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import SchemaOrg from './SchemaOrg';


const SEO = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            social {
              twitter
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => (
      <>
        <Helmet>
          {/* General tags */}
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          <link rel="canonical" href={seo.siteUrl} />

          {/* OpenGraph tags */}
          <meta property="og:url" content={seo.siteUrl} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.image} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={seo.social.twitter} />
          <meta name="twitter:title" content={seo.image} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
        </Helmet>
        <SchemaOrg
          url={seo.url}
          title={seo.title}
          defaultTitle={seo.title}
        />
      </>
    )
    }
  />
);

export default SEO;