import React, { ReactNode } from "react";
import SEO from "../seo/SEO";
import appCSS from "../css/app.css";
import Helmet from "react-helmet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <SEO></SEO>
    <Helmet>
      <link href={appCSS} rel="stylesheet/css" />
    </Helmet>
    {children}
  </>
);

export default Layout;
