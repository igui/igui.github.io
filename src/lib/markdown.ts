import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "src", "content");

export interface MarkdownContent {
  id: string;
  html: string;
  frontmatter: {
    title: string;
    path?: string;
  };
}

async function processMarkdown(filePath: string): Promise<MarkdownContent> {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const result = await remark().use(html, { sanitize: false }).process(content);

  return {
    id: path.basename(filePath, ".md"),
    html: result.toString(),
    frontmatter: {
      title: data.title || "",
      path: data.path || "",
    },
  };
}

export async function getMarkdownByTitle(
  title: string,
): Promise<MarkdownContent> {
  const files = fs.readdirSync(contentDirectory);
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(contentDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    if (data.title === title) {
      return processMarkdown(filePath);
    }
  }
  throw new Error(`Markdown with title "${title}" not found`);
}

export async function getMarkdownByPath(
  mdPath: string,
): Promise<MarkdownContent> {
  const searchDirs = [contentDirectory];
  const subdirs = fs.readdirSync(contentDirectory, { withFileTypes: true });
  for (const d of subdirs) {
    if (d.isDirectory()) {
      searchDirs.push(path.join(contentDirectory, d.name));
    }
  }

  for (const dir of searchDirs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const filePath = path.join(dir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      if (data.path === mdPath) {
        return processMarkdown(filePath);
      }
    }
  }
  throw new Error(`Markdown with path "${mdPath}" not found`);
}

export async function getMarkdownsByPathGlob(
  globPattern: string,
  sort: "asc" | "desc" = "asc",
): Promise<MarkdownContent[]> {
  // Convert glob like "/projects/*" to directory name "projects"
  const dirName = globPattern.replace(/^\//, "").replace(/\/\*$/, "");
  const dirPath = path.join(contentDirectory, dirName);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  files.sort();
  if (sort === "desc") {
    files.reverse();
  }

  const results: MarkdownContent[] = [];
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    results.push(await processMarkdown(filePath));
  }

  return results;
}
