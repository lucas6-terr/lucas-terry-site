import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import ToolsGrid from "@/components/ToolsGrid";
import TweetEmbed from "@/components/TweetEmbed";

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

  const tweetsAfter = project.tweetsAfter ?? project.paragraphs.length;
  const beforeTweets = project.paragraphs.slice(0, tweetsAfter);
  const afterTweets = project.paragraphs.slice(tweetsAfter);

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
          {beforeTweets.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          {project.tweets?.map((tweet) => (
            <div key={tweet.url} className="tweet-block">
              <p>{tweet.caption}</p>
              <TweetEmbed url={tweet.url} />
            </div>
          ))}
          {afterTweets.map((text, i) => (
            <p key={`after-${i}`}>{text}</p>
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
        {project.media?.map((item) => (
          <div key={item.src} className="media-item">
            <p className="media-caption">{item.caption}</p>
            <video
              className="media-video"
              src={item.src}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        ))}
        {project.tools && (
          <ToolsGrid tools={project.tools} footer={project.toolsFooter} />
        )}
      </section>
    </main>
  );
}
