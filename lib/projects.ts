// ALL project page text lives here. Edit this file to change any write-up —
// no layout code involved.
//
// NOTE: the paragraphs below are FILLER drafts seeded from CONTENT.md.
// Lucas will rewrite them in his own conversational voice.

export type Project = {
  slug: string;
  name: string;
  tag: string;
  /** External link used in the write-up (company site / X). Optional. */
  url?: string;
  /** One line used for the page's <meta name="description">. */
  summary: string;
  paragraphs: string[];
};

export const projects: Project[] = [
  {
    slug: "cascade",
    name: "Cascade",
    tag: "crypto · growth lead",
    url: "https://x.com/cascade_xyz",
    summary: "Zero-to-one GTM for a crypto derivatives neobrokerage.",
    paragraphs: [
      "Cascade (previously Perennial) is a crypto derivatives neobrokerage. I joined in June 2024 to lead GTM, growth, content, and user ops — taking a brand-new product from nothing to a private beta launch.",
      "The launch numbers: $28M+ in pre-launch deposits, a 50K+ waitlist, 60K+ X followers, and $850M+ in trading volume within the first 3 weeks.",
      "This is where I became an AI-native operator — most of the brand, comms, and ops infrastructure I built here runs on systems I made with Claude, so the team can operate without me in the room.",
    ],
  },
  {
    slug: "cega",
    name: "Cega",
    tag: "defi · head of marketing",
    url: "https://x.com/cega_fi",
    summary: "One-person marketing team for a DeFi structured-products platform.",
    paragraphs: [
      "Cega is a DeFi structured-products platform (since acquired). From July 2023 to June 2024 I was the one-person marketing team, owning every function end-to-end.",
      "I led GTM for the recurring vault product launches, which contributed to $280M–$404M in platform trading volume during my time there.",
    ],
  },
  {
    slug: "mycelium",
    name: "Mycelium",
    tag: "defi · head of marketing",
    summary: "GTM for two perpetual trading product launches on Arbitrum.",
    paragraphs: [
      "Mycelium (originally Tracer DAO) built perpetual trading products on Arbitrum. I led marketing from October 2020 to August 2022, through two major product launches.",
      "Perpetual Pools did $800M+ in trading volume. The GMX-fork perps venue that followed did $1.7B+ in trading volume with $50M+ TVL.",
    ],
  },
  {
    slug: "inspiretek",
    name: "iNSPIRETEK",
    tag: "sportstech · founding member",
    summary: "Founding team member of an athlete mental health app.",
    paragraphs: [
      "iNSPIRETEK was an athlete mental health app, and my first startup — I joined as a founding team member in January 2019, straight out of university in Brisbane.",
      "With zero budget, I built a community of 50+ Australian Olympic and professional athletes as brand ambassadors, driving 2K+ active users to the beta.",
    ],
  },
  {
    slug: "ai-tools",
    name: "AI tools",
    tag: "systems · built with claude",
    summary: "Brand, comms, ops and community infrastructure, all systematised.",
    paragraphs: [
      "Infrastructure built at Cascade — brand, comms, ops and community, all systematised. Systems that let the team operate without me in the room.",
      "The set so far: a Claude project that writes on-brand Cascade comms without briefing, written brand guidelines and tone of voice, a VIP relationship database, a daily marketing ops command that pulls Granola, Slack and Calendar into one Notion page, a KOL tracking dashboard, and a Discord gated access system tied to platform activity.",
      "6 systems · more in progress.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
