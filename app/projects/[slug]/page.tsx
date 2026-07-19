import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

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
        <div className="intro-copy">
          {project.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
