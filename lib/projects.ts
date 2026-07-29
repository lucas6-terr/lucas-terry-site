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

export type MediaItem = {
  /** Line of text shown above the video. */
  caption: string;
  /** Video file in /public. */
  src: string;
  /** Render at 75% of the text column instead of full width. */
  narrow?: boolean;
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  /** External link used in the write-up (company site / X). Optional. */
  url?: string;
  /** One line used for the page's <meta name="description">. */
  summary: string;
  /** Banner image shown under the title/tag, before the write-up. */
  headerImage?: string;
  paragraphs: string[];
  /** Extra paragraphs after the main write-up (e.g. lead-in to links). */
  outro?: string[];
  /** Bulleted external links (e.g. articles) rendered after the outro. */
  articles?: { title: string; url: string }[];
  /** Optional videos with captions (perp.fun, cascade). */
  media?: MediaItem[];
  /** Paragraph index the videos render after (default: after all). */
  mediaAfter?: number;
  /** Caption + link pairs; `after` is the paragraph index each renders
   *  after (default: after the last paragraph). */
  links?: { caption: string; url: string; after?: number }[];
  /** Optional expandable tools grid (used on the ai-tools page). */
  tools?: Tool[];
  /** Small muted line under the tools grid. */
  toolsFooter?: string;
};

export const projects: Project[] = [
  {
    slug: "cascade",
    name: "Cascade",
    tag: "crypto neo-brokerage · growth lead",
    url: "https://x.com/cascade_xyz",
    summary:
      "Rebrand and relaunch GTM for a crypto neo-brokerage — zero to private beta.",
    paragraphs: [
      "Following a rebrand and relaunch of Perennial under the new name 'Cascade', I led the go-to-market. The positioning and brand were developed from scratch, aimed at a US audience. I contracted a brand partner to shape a very sharp visual identity, and paired it with a compelling story the audience resonated with.",
      "The GTM took form as a three-month lead-up campaign to private beta. Access ran on invite codes, and inviting others increased your chance of getting in. A growth tactic built on Berghain principles: it was hard to get in, so everyone wanted in. We then leveraged that desire and enabled pre-deposits — users staked funds to lock in a spot as an early trader and earn rewards, with layers of exclusivity added along the way. Pre-deposits ended 280% oversubscribed.",
      "I led a growth team of three across content, community, and trader relationships. Alongside the retail funnel we ran a direct track for market makers, trading firms, and high-value traders through alternative avenues.",
      "Beyond the campaign itself, I was across everything commercial. I managed relationships with our market makers and integration partners, ran the agencies across brand and content, and handled comms through a security incident.",
      "I also built our internal tooling with Claude Code — trader dashboards, referral tracking, and lifecycle systems — so we could see and act on what was happening across the platform.",
      "The result: 9,000+ users onboarded to private beta from a 50,000-strong waitlist built through the pre-launch campaign, and $1B+ in trading volume in the first 4 weeks of launch. 100x the old brand's daily volume.",
    ],
    links: [
      {
        caption: "The launch video:",
        url: "https://x.com/cascade_xyz/status/2000621776016179578",
        after: 1,
      },
      {
        caption: "The launch article I wrote:",
        url: "https://x.com/cascade_xyz/status/1998452642771780025",
        after: 1,
      },
      {
        caption: "A more technical piece I wrote for Cascade:",
        url: "https://cascade.xyz/articles/points",
      },
    ],
  },
  {
    slug: "perp-fun",
    name: "perp.fun",
    tag: "perps · side project",
    summary:
      "A spin-off experiment from the Cascade team — perps as an extremely simple product.",
    paragraphs: [
      "perp.fun was a spin-off project from the team behind Cascade, an experiment in the perps space.",
      "The problem at the time: there were a lot of perp exchanges, and they all looked, felt, and traded exactly the same. perp.fun's purpose was to rip out the 90% of features and functionality we didn't see as completely necessary and turn perps into an extremely simple product. Which they inherently are, but for the most part aren't packaged in a retail-friendly, gamified way.",
      "That was my marketing challenge: retelling the story of perps, and who they're actually for.",
    ],
    media: [
      {
        caption: "I made this to tell the story and shape our narrative.",
        src: "/perpfun-story.mp4",
      },
      {
        caption:
          "I also made this when Severance was rolling out season 2.",
        src: "/perpfun-severance.mp4",
      },
    ],
  },
  {
    slug: "cega",
    name: "Cega",
    tag: "defi · head of marketing",
    url: "https://x.com/cega_fi",
    summary:
      "Developing and running the marketing engine at a DeFi structured-products platform.",
    headerImage: "/cega-banner.webp",
    outro: [
      "We took a creative approach to branding, making complex financial products more legible and user-friendly.",
      "A couple of articles I wrote for Cega:",
    ],
    articles: [
      {
        title: "Cega V2 Introduces Dual Currency",
        url: "https://medium.com/cega-fi/cega-v2-introduces-dual-currency-487711934ff5",
      },
      {
        title: "Introducing: Eth Stakers Vault",
        url: "https://medium.com/cega-fi/introducing-eth-stakers-vault-9107bebc360a",
      },
    ],
    paragraphs: [
      "I joined Cega following their Series A raise to develop and run their marketing engine. Cega gave users a simple fixed monthly yield on their funds, generated through a basket of premiums collected by exotic options trading strategies.",
      "My role was product-marketing heavy. Structured financial products, launching on a two-month cadence. I established the GTM playbook for these launches — a specific checklist of processes, deadlines, and tasks to execute each product launch consistently.",
      "In execution I was across all of it: creating the content, briefing designers for the visuals, contacting reporters for press coverage, and working with influencer agencies for targeted exposure.",
      "We tracked each launch on the numbers — engagement on X, conversions, and actual financial commitments into the product — then identified which part of the funnel was underperforming and made changes from there.",
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
