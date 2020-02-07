import React, { ReactNode } from 'react';
import SEO from '../seo/SEO';

interface LayoutProps {
  children: ReactNode;
}

export default ({ children }: LayoutProps) => (
  <>
    <SEO></SEO>
    {children}
  </>
)
