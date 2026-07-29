"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement | null) => void } };
  }
}

const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

/** Official X embed — shows the full post with media and engagement. */
export default function TweetEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => window.twttr?.widgets.load(ref.current);
    if (window.twttr) {
      load();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGETS_SRC}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGETS_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", load);
    return () => script?.removeEventListener("load", load);
  }, []);

  return (
    <div ref={ref} className="tweet-embed">
      <blockquote className="twitter-tweet" data-dnt="true">
        {/* widgets.js replaces this; the link is the no-JS fallback */}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </blockquote>
    </div>
  );
}
