"use client";

import { useState } from "react";
import type { Tool } from "@/lib/projects";

export default function ToolsGrid({
  tools,
  footer,
}: {
  tools: Tool[];
  footer?: string;
}) {
  const categories = ["All", ...new Set(tools.map((t) => t.category))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const visible =
    filter === "All" ? tools : tools.filter((t) => t.category === filter);

  const toggle = (name: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="tools">
      <div className="tool-filters" role="group" aria-label="Filter tools">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tool-pill${filter === cat ? " active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat.toLowerCase()}
          </button>
        ))}
      </div>

      <ul className="tool-grid">
        {visible.map((tool) => {
          const isOpen = open.has(tool.name);
          return (
            <li key={tool.name} className="tool-card">
              <button
                type="button"
                className="tool-toggle"
                onClick={() => toggle(tool.name)}
                aria-expanded={isOpen}
              >
                <span className="tool-head">
                  <span className="tool-category">{tool.category}</span>
                  <span className="tool-plus" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
                <span className="tool-name">{tool.name}</span>
                <span className="tool-blurb">{tool.blurb}</span>
              </button>
              <div className={`tool-body${isOpen ? " open" : ""}`}>
                <div className="tool-body-inner">
                  <p className="tool-how-label">how it works</p>
                  <p className="tool-how">{tool.how}</p>
                </div>
              </div>
              <div className="tool-tags">
                {tool.tags.map((tag) => (
                  <span key={tag} className="tool-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {footer && <p className="tools-footer">{footer}</p>}
    </div>
  );
}
