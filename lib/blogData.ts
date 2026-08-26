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
      type: "video";
      src: string;
      caption?: Record<string, string>;
    }
  | {
      type: "table";
      head: Record<string, string>[];
      rows: Record<string, string>[][];
    };

export const blogPosts: BlogPost[] = [
  {
    slug: "germany-card-packaging-expo",
    date: "2026-08-26",
    category: { zh: "展会现场", en: "Trade Show" },
    title: {
      zh: "INTERPACK 杜塞尔多夫展回来：我们带去的卡牌自动化方案",
      en: "Back from INTERPACK Düsseldorf: The Card Automation We Brought",
    },
    excerpt: {
      zh: "我们在 2026 年 5 月德国杜塞尔多夫 INTERPACK 国际包装展上，展示了发卡、理料、装袋、封口与 AI 视觉检测一体化的卡牌自动化包装线。这段现场视频带你看看实际跑起来的样子，以及海外客户最关心什么。",
      en: "At INTERPACK 2026 in Düsseldorf we demonstrated a card automation line: card feeding, collating, bagging, sealing and AI visual inspection in one flow. Watch the floor footage and see what overseas buyers asked about most.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "今年 5 月，我们参加了在德国杜塞尔多夫举办的 INTERPACK 国际包装机械展，并把一条完整的卡牌自动化包装线搬到了现场——从发卡、理料、装袋、封口到 AI 视觉检测，全程实机演示。一起来看看展会现场吧！",
          en: "This May we exhibited at INTERPACK in Düsseldorf, Germany, and brought a complete card automation line to the booth — card feeding, collating, bagging, sealing and AI visual inspection, all running live. Let's check out the show floor together!",
        },
      },
      {
        type: "video",
        src: "/videos/germany-card-packaging-expo.mp4",
        caption: {
          zh: "INTERPACK 杜塞尔多夫现场实拍：卡牌自动化包装线实机演示",
          en: "INTERPACK Düsseldorf footage: live demo of the card automation packaging line",
        },
      },
      {
        type: "h2",
        text: { zh: "现场这条线能做什么", en: "What the Line on the Floor Does" },
      },
      {
        type: "li",
        text: {
          zh: "高速发卡：摩擦式给料机单张分离 CR80 标准卡，最高 500 张/分钟；薄说明书、小纸片最高可达 800 张/分钟。",
          en: "High-speed card feeding: friction feeder singulates CR80 cards at up to 500/min and thin leaflets & sheets at up to 800/min.",
        },
      },
      {
        type: "li",
        text: {
          zh: "智能理料：按配方自动配卡、计数，支持 1,000+ 配方文件，单批可处理 25,000 包，配合 AI 视觉防错。",
          en: "Smart collation: recipe-based sorting and counting with 1,000+ recipes, up to 25,000 packs per batch, with AI visual error-proofing.",
        },
      },
      {
        type: "li",
        text: {
          zh: "包装与封口：糖果枕式、自粘袋、四边封、束带、热缩、三维包膜多种方式可选，对接后道装盒与码垛。",
          en: "Packaging & sealing: candy pillow, self-adhesive, four-side seal, banding, shrink and 3D wrap options, integrated with downstream cartoning and palletizing.",
        },
      },
      {
        type: "li",
        text: {
          zh: "AI 视觉检测：缺卡、多卡、污损、装反全部在线剔除，保障每包张数 100% 准确。",
          en: "AI visual inspection: missing, double, dirty or flipped cards are rejected online, keeping every pack 100% accurate.",
        },
      },
      {
        type: "h2",
        text: { zh: "海外客户问得最多的 3 件事", en: "The 3 Questions Overseas Buyers Asked Most" },
      },
      {
        type: "li",
        text: {
          zh: "换型要多久？标准卡尺寸切换通常 3–5 分钟，配方一键切换。",
          en: "How long to change over? Standard card-size changeovers take 3–5 minutes with one-click recipe switching.",
        },
      },
      {
        type: "li",
        text: {
          zh: "能不能对接我们现有的印刷和后道设备？可以，整线按你的前道印刷和后道装箱做集成。",
          en: "Can it integrate with our existing printing and downstream equipment? Yes — the line is integrated around your upstream printing and downstream cartoning.",
        },
      },
      {
        type: "li",
        text: {
          zh: "海外服务与备件怎么保障？我们设备出口全球，提供远程调试、英文文档与关键备件快速响应。",
          en: "How is overseas service and spare parts handled? Our machines are shipped worldwide, with remote commissioning, English docs and fast spare-parts response.",
        },
      },
      {
        type: "h2",
        text: { zh: "没到现场？可以把方案发你", en: "Missed the Show? We Can Send the Solution" },
      },
      {
        type: "p",
        text: {
          zh: "如果没能来现场，我们可以根据你的卡片规格、产能和包装方式，出一份针对性的卡牌自动化方案。下方留下需求，或直接联系我们。",
          en: "If you couldn't attend, we can put together a tailored card automation proposal based on your card specs, throughput and packaging method. Leave your requirements below or contact us directly.",
        },
      },
      {
        type: "cta",
        text: { zh: "获取免费选型方案", en: "Get a Free Recommendation" },
        href: "/contact",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
