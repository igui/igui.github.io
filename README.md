# Ignacio Avas website

[![Netlify Status](https://api.netlify.com/api/v1/badges/18c4e988-b58a-4aa9-bfba-7dcff2f60d18/deploy-status)](https://app.netlify.com/sites/ignacioavas/deploys)

My Internet Website. It's a Gatsby based website hosted on Netlify.
This website is a personal project to showcase my professional experience and projects.

## Features

- **Gatsby v5**: The latest version of Gatsby.
- **TypeScript**: Add types to your JavaScript code.
- **React v18**: The latest version of React.
- **Styled Components**: Use the best CSS-in-JS solution.
- **SEO**: SEO friendly.
- **PWA**: Progressive Web App ready.

## Getting Started

- Clone the repository.
- Install [Gatsby CLI globally](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/).
- Install [Husky hooks](https://typicode.github.io/husky/get-started.html) (Optional).
- Run `yarn` to install the dependencies.
- Run `yarn develop` to start the development server.

## Adding Content

Add your content in the `src/markdown-sections` folder. Each markdown file should have the following structure:

```markdown
---
title: "Project Title"
path: "/projects/12_project-title"
date: "2024-05-21"
---

Some content about the project.
```

The first part is the frontmatter, where you define the title, path, and date of the project. The rest is the content of the project. The path is used to place the markdown file in the correct place in the website and for sorting.
Projects, Experiences and Publications are sorted by path.

Each Markdown file have a specific format and structure. The content of the markdown file is a mix of text and images. The images are placed in the `public` folder and referenced in the markdown file. Please follow the structure of the markdown files in the `src/markdown-sections` folder depending on the type of content you are adding.
