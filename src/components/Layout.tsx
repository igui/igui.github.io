import React, { ReactNode } from "react";
import SEO from "../seo/SEO";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <SEO></SEO>
    {children}
  </>
);

export default Layout;
