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
            Hi, nice to meet you here. I&rsquo;ve spent my career building
            companies from their earliest, messiest moments. Most of it in
            crypto, watching an industry grow from a sandbox of experiments to
            real products. Eight years in, the thing I find most compelling is
            that finance is undeniably moving onchain, and is in this
            difficult, long journey of sector-wide adoption. Believing in
            something when the naysayers get loud is important.
          </p>
          <p>
            I&rsquo;m drawn to people, technology, and the strange way the two
            find each other. We are in the age of the ideas guy. Personal
            agency has never been higher, and it&rsquo;s a good time to be
            non-technical.
          </p>
          <p>This website is a collection of highlights.</p>
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
