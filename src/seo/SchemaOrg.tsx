import React from 'react';
import Helmet from 'react-helmet';

interface SchemaOrgProps {
    defaultTitle: string;
    title: string;
    url: string;
};

const SchemaOrg = ({ defaultTitle, title, url }: SchemaOrgProps) => (
    <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify([
            {
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                url,
                name: title,
                alternateName: defaultTitle,
            }
        ])}</script>
    </Helmet>
)

export default React.memo(SchemaOrg);