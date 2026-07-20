import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main>
      <section className="intro">
        <div className="intro-media-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/headshot.jpg" alt="Lucas Terry" />
        </div>
        <h1>Lucas</h1>
        <div className="intro-copy">
          <p>
            I&rsquo;ve spent my professional career at the forefront of
            evolving tech — and, more importantly, at companies in their very
            early, foundational moments. Most of it I&rsquo;ve spent navigating
            crypto, watching it grow and shape itself from an experimental
            phase into the polished fintech era taking shape today. Eight years
            in, what I find most interesting is that finance is in the thick of
            a long journey of change and adoption. It will very obviously run
            onchain in the future — it&rsquo;s just about the journey, and the
            dogfight it takes to get there.
          </p>
          <p>
            I&rsquo;m interested in people, technology, and the way people
            adopt technology. We are in the age of the ideas guy — personal
            agency has never been higher, and it&rsquo;s an exciting time to be
            non-technical.
          </p>
          <p>This site highlights some interesting chapters of my life.</p>
        </div>
      </section>

      <section className="work">
        <div className="work-head">
          <span className="label">selected work</span>
        </div>
        <ul className="projects">
          {projects.map((project) => (
            <li className="project" key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className="name">{project.name}</span>
                <span className="tag">{project.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
