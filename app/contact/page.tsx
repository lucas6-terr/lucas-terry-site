import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Lucas Terry",
  description: "Contact Lucas Terry on X or by email.",
};

export default function Contact() {
  return (
    <main>
      <section className="intro">
        <div className="intro-graphic-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" />
        </div>
        <h1>Contact</h1>
        <div className="intro-copy">
          <p>
            You can reach me on X at{" "}
            <a
              href="https://x.com/lucas_eth"
              target="_blank"
              rel="noopener noreferrer"
            >
              @lucas_eth
            </a>{" "}
            or email me at{" "}
            <a href="mailto:lucasterry6@gmail.com">lucasterry6@gmail.com</a>.
            I&rsquo;m also on{" "}
            <a
              href="https://www.linkedin.com/in/lucasterry/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
