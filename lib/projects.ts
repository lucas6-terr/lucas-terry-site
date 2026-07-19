// ALL project page text lives here. Edit this file to change any write-up —
// no layout code involved.
//
// NOTE: the paragraphs below are FILLER drafts seeded from CONTENT.md.
// Lucas will rewrite them in his own conversational voice.

export type Tool = {
  category: string;
  name: string;
  blurb: string;
  how: string;
  tags: string[];
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  /** External link used in the write-up (company site / X). Optional. */
  url?: string;
  /** One line used for the page's <meta name="description">. */
  summary: string;
  paragraphs: string[];
  /** Optional expandable tools grid (used on the ai-tools page). */
  tools?: Tool[];
  /** Small muted line under the tools grid. */
  toolsFooter?: string;
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
    ],
    toolsFooter: "6 systems · more in progress.",
    tools: [
      {
        category: "AI Content",
        name: "Claude content project",
        blurb:
          "Brand voice, Cascade comms, and marketing copy — all runnable by the team without Lucas's input.",
        how: "A Claude Project (Anthropic's persistent context workspace) pre-loaded with Cascade's brand voice, tone guidelines, and example marketing copy. Anyone on the team opens the project, describes what they need in plain language, and gets on-brand output — no briefing required.",
        tags: ["Claude"],
      },
      {
        category: "Brand Infrastructure",
        name: "Brand guidelines + tone of voice",
        blurb:
          "Written standards for visual identity, copy tone, and brand application — so the standard held without Lucas in the room.",
        how: "A three-part Notion doc covering (1) visual identity standards, (2) copy tone and voice guidelines, and (3) a content examples bank. Built as a resource for scanning all outgoing content to ensure branding accuracy — so any team member could QA their own work without a review cycle.",
        tags: ["Notion", "Figma"],
      },
      {
        category: "Ops",
        name: "VIP relationship database",
        blurb:
          "Depositor history treated as relationship capital — context, preferences, and conversation history in one place.",
        how: "A Notion database with one row per major depositor. Fields: deposit history, preferred comms channel, conversation log, last-touch date, next action. Treated less like a CRM and more like a relationship journal — the goal was to make every interaction feel personal even at scale.",
        tags: ["Notion"],
      },
      {
        category: "Ops",
        name: "Daily marketing ops",
        blurb:
          "Pulls Granola, Slack, and Calendar into a structured Notion daily page. One command, full day context.",
        how: "A Claude skill (a structured prompt chain) that pulls from three sources: Granola meeting transcripts, Slack thread summaries, and the day's calendar. One command generates a structured Notion daily page with meeting prep, outstanding threads, and a task list. Turns context-gathering from a 20-minute morning ritual into a 30-second command.",
        tags: ["Claude", "Notion", "Granola", "Slack"],
      },
      {
        category: "Analytics",
        name: "KOL tracking dashboard",
        blurb:
          "Visualising the referral networks of each KOL in the userbase — referred trading volume and invite code usage in one view.",
        how: "Built using direct user stats pulled from the platform. A dashboard that maps each KOL's referral network — showing referred trading volume, invite code usage, and campaign performance over time. Used to monitor influencer campaigns and allocate budget more effectively. Vibe-coded with Claude against our internal data exports.",
        tags: ["Claude", "Data"],
      },
      {
        category: "Community",
        name: "Discord gated access system",
        blurb:
          "Community-access system tying Discord permissions and progression to specific platform activity — trading volume, deposits, and PnL.",
        how: "A permission system connecting Discord roles to on-chain and platform data. Users were automatically sorted into tiers based on trading enablement status, volume stats for VIP channel access, and PnL-based rankings. Built to make the community feel earned and exclusive without manual management overhead. Designed the logic, drafted the PRD, and worked directly with engineering to ship it.",
        tags: ["Discord", "Claude"],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
