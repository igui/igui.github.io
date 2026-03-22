import type { Metadata } from "next";
import { siteMetadata } from "@/lib/siteMetadata";
import StyledComponentsRegistry from "./registry";
import "@/css/app.css";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  openGraph: {
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteMetadata.social.twitter,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                url: siteMetadata.siteUrl,
                name: siteMetadata.title,
                alternateName: siteMetadata.title,
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
