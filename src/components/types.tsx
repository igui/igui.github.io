// Type definitions for the components in the project inferred from the
// GraphQL definitions
export interface MarkdownRemarkNode {
  id: string;
  html: string;
  frontmatter: {
    title: string;
  };
}
