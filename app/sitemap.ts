import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lucasterry.com";
  return [
    { url: `${base}/` },
    { url: `${base}/contact` },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
