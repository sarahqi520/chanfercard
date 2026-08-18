// Blog content data — Chinese-first, English fallback.
// Other languages fall back to English at render time (same pattern as the rest of the site).

export interface BlogPost {
  slug: string;
  date: string;
  category: Record<string, string>;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  body: BlogBlock[];
  relatedLinks: { href: string; label: Record<string, string> }[];
}

export type BlogBlock =
  | { type: "h2"; text: Record<string, string> }
  | { type: "h3"; text: Record<string, string> }
  | { type: "p"; text: Record<string, string> }
  | { type: "li"; text: Record<string, string> }
  | { type: "cta"; text: Record<string, string>; href: string }
  | {
      type: "table";
      head: Record<string, string>[];
      rows: Record<string, string>[][];
    };

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-a-card-packaging-machine",
    date: "2026-08-15",
    category: { zh: "采购指南", en: "Buyer's Guide" },
    title: {
      zh: "如何选择卡牌包装机（2026 采购指南）",
      en: "How to Choose a Card Packaging Machine (2026 Buyer's Guide)",
    },
    excerpt: {
      zh: "从卡片材质、产能到包装方式，5 个维度帮你选出最合适的卡牌自动化包装方案，附 6 种主流方式对比表。",
      en: "Five dimensions — from card material to throughput — to pick the right card packaging automation, with a comparison table of 6主流 methods.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "卡牌包装看似简单，一旦进入批量生产，人工叠卡、装袋、封口的速度和良率就成了瓶颈。选对一台自动化设备，往往能把单人日产能提升 5–10 倍。本文用 5 个维度，帮你理清选型思路。",
          en: "Card packaging looks simple — until volume production turns manual collating, bagging and sealing into a bottleneck. The right machine can boost per-operator daily output 5–10×. This guide walks through five dimensions to clarify your choice.",
        },
      },
      {
        type: "h2",
        text: { zh: "一、先明确你的 5 个核心需求", en: "1. Clarify Your 5 Core Requirements" },
      },
      {
        type: "li",
        text: {
          zh: "卡片材质与尺寸：游戏卡、集换卡通常厚 0.3–0.5mm，PVC/纸质不同，进料摩擦轮和分卡机构要匹配。",
          en: "Card material & size: game/trading cards are usually 0.3–0.5mm thick; paper vs PVC changes the feeder wheel and separating mechanism.",
        },
      },
      {
        type: "li",
        text: {
          zh: "目标产能：每小时处理 1,000 张还是 50,000 张，直接决定用半自动还是全自动连线。",
          en: "Target throughput: 1,000 vs 50,000 cards/hour decides semi-auto vs full inline automation.",
        },
      },
      {
        type: "li",
        text: {
          zh: "包装方式：OPP 自粘袋、四边封、束带、热缩、三维包膜——不同方式设备完全不同。",
          en: "Packaging method: OPP self-adhesive bag, four-side seal, banding, shrink, 3D wrap — each needs very different equipment.",
        },
      },
      {
        type: "li",
        text: {
          zh: "自动化等级：单机半自动、全自动单机、还是对接前道印刷/后道装箱的整线。",
          en: "Automation level: standalone semi-auto, standalone full-auto, or a line integrated with upstream printing and downstream cartoning.",
        },
      },
      {
        type: "li",
        text: {
          zh: "预算与回报周期：算清人工成本，通常自动化设备在 6–18 个月内回本。",
          en: "Budget & payback: quantify labor cost — most automate pay back within 6–18 months.",
        },
      },
      {
        type: "h2",
        text: { zh: "二、6 种主流卡牌包装方式对比", en: "2. Comparison of 6 Main Packaging Methods" },
      },
      {
        type: "table",
        head: [
          { zh: "包装方式", en: "Method" },
          { zh: "适用场景", en: "Best for" },
          { zh: "速度", en: "Speed" },
          { zh: "特点", en: "Notes" },
        ],
        rows: [
          [
            { zh: "OPP 自粘袋", en: "OPP Self-adhesive" },
            { zh: "小批量、精品卡", en: "Small batch, premium cards" },
            { zh: "中", en: "Medium" },
            { zh: "成本低、外观透明", en: "Low cost, clear look" },
          ],
          [
            { zh: "四边封", en: "Four-side Seal" },
            { zh: "防潮要求高", en: "Moisture-sensitive" },
            { zh: "中高", en: "Med-High" },
            { zh: "密封好、挺度佳", en: "Great seal, rigid" },
          ],
          [
            { zh: "束带 (Banding)", en: "Banding" },
            { zh: "整叠卡牌", en: "Stacked decks" },
            { zh: "高", en: "High" },
            { zh: "无胶、可降解", en: "Glue-free, eco" },
          ],
          [
            { zh: "热缩", en: "Heat Shrink" },
            { zh: "整盒/整包", en: "Boxed/bundled" },
            { zh: "中", en: "Medium" },
            { zh: "紧致、防护强", en: "Tight, protective" },
          ],
          [
            { zh: "三维包膜", en: "3D Wrap" },
            { zh: "礼盒级外观", en: "Gift-box look" },
            { zh: "中", en: "Medium" },
            { zh: "高档、全包", en: "Premium, full wrap" },
          ],
          [
            { zh: "摩擦喂料 (Feeder)", en: "Friction Feeder" },
            { zh: "高速分卡前置", en: "High-speed pre-feed" },
            { zh: "很高", en: "Very High" },
            { zh: "高速分卡核心", en: "Core high-speed feeding" },
          ],
        ],
      },
      {
        type: "h2",
        text: { zh: "三、不同规模怎么选", en: "3. How to Choose by Scale" },
      },
      {
        type: "li",
        text: {
          zh: "小批量/打样：半自动摩擦喂料 + 人工装袋，投入低、灵活。",
          en: "Small batch/prototype: semi-auto friction feeder + manual bagging — low cost, flexible.",
        },
      },
      {
        type: "li",
        text: {
          zh: "中批量：单机全自动（喂料+计数+装袋+封口一体）。",
          en: "Mid volume: standalone full-auto (feed + count + bag + seal in one).",
        },
      },
      {
        type: "li",
        text: {
          zh: "大批量：整线对接印刷与装箱，摩擦喂料机做高速分卡中枢。",
          en: "High volume: full line with printing & cartoning; friction feeder as the high-speed sorting hub.",
        },
      },
      {
        type: "h2",
        text: { zh: "四、为什么选 CHANFER", en: "4. Why CHANFER" },
      },
      {
        type: "p",
        text: {
          zh: "CHANFER（广州长发）专注卡牌包装自动化 13 年，摩擦喂料机出口全球，可针对你的卡片规格和产能做整线定制。下方可查看各包装方案与设备型号，或直接联系我们获取选型建议。",
          en: "CHANFER (Guangzhou Changfa) has focused on card packaging automation for 13 years; our friction feeders are shipped worldwide and we customize full lines to your card specs and throughput. Explore the solutions and machine models below, or contact us for a tailored recommendation.",
        },
      },
      {
        type: "cta",
        text: { zh: "获取免费选型方案", en: "Get a Free Recommendation" },
        href: "/contact",
      },
    ],
    relatedLinks: [
      { href: "/solutions#candy", label: { zh: "糖果卡包装方案", en: "Candy Card Packaging" } },
      { href: "/solutions#self-adhesive", label: { zh: "自粘袋包装方案", en: "Self-adhesive Bagging" } },
      { href: "/solutions#four-sides", label: { zh: "四边封方案", en: "Four-side Seal" } },
      { href: "/solutions#banding", label: { zh: "束带包装方案", en: "Banding" } },
      { href: "/solutions#heat-shrink", label: { zh: "热缩包装方案", en: "Heat Shrink" } },
      { href: "/solutions#three-dimensional", label: { zh: "三维包膜方案", en: "3D Wrap" } },
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
