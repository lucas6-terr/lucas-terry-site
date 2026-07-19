import Link from "next/link";
import { projects } from "@/lib/projects";

// FILLER about paragraphs, seeded from CONTENT.md — Lucas rewrites these.
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
            Hi, nice to meet you. I&rsquo;m a growth and marketing operator —
            zero-to-one GTM for technical products. I grew up in Australia and
            spent the last three years living in the UK.
          </p>
          <p>
            I don&rsquo;t think I&rsquo;m particularly smart. I compensate by
            being clever and working incredibly hard. Tech startups keep me
            close to the 0→1 feeling, and I&rsquo;m not leaving this scene
            anytime soon.
          </p>
          <p>
            Outside of that, I&rsquo;m usually in the water or somewhere up a
            mountain. This website highlights some of the more interesting
            chapters in my life so far.
          </p>
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
