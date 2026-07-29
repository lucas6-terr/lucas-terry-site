import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import ToolsGrid from "@/components/ToolsGrid";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Lucas Terry`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const mediaAfter = project.mediaAfter ?? project.paragraphs.length;

  const linksAt = (idx: number) =>
    project.links
      ?.filter((link) => (link.after ?? project.paragraphs.length) === idx)
      .map((link) => (
        <div key={link.url} className="link-block">
          <p>{link.caption}</p>
          <p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url.replace(/^https?:\/\//, "")}
            </a>
          </p>
        </div>
      ));

  const mediaBlocks = project.media?.map((item) => (
    <div
      key={item.src}
      className={`media-item${item.narrow ? " narrow" : ""}`}
    >
      <p className="media-caption">{item.caption}</p>
      <video
        className="media-video"
        src={item.src}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  ));


  return (
    <main>
      <section className="intro">
        <Link href="/" className="back">
          ← back to index
        </Link>
        <h1>{project.name}</h1>
        <p className="proj-tag-line">
          <span className="tag">{project.tag}</span>
        </p>
        {project.headerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="proj-header-image"
            src={project.headerImage}
            alt=""
          />
        )}
        <div className="intro-copy">
          {mediaAfter === 0 && mediaBlocks}
          {linksAt(0)}
          {project.paragraphs.map((text, i) => (
            <Fragment key={i}>
              <p>{text}</p>
              {mediaAfter === i + 1 && mediaBlocks}
              {linksAt(i + 1)}
            </Fragment>
          ))}
          {project.outro?.map((text, i) => (
            <p key={`outro-${i}`}>{text}</p>
          ))}
          {project.articles && (
            <ul>
              {project.articles.map((article) => (
                <li key={article.url}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {project.tools && (
          <ToolsGrid tools={project.tools} footer={project.toolsFooter} />
        )}
      </section>
    </main>
  );
}
