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
  },  {
    slug: "printing-united-expo-2026",
    date: "2026-08-27",
    category: { zh: "展会预告", en: "Exhibition Preview" },
    title: {
      zh: "CHANFER 强势登陆 PRINTING United Expo 2026 —— 北美最大印刷包装展，美国拉斯维加斯 N7411 展位",
      en: "CHANFER Heads to PRINTING United Expo 2026 — North America's Biggest Print & Packaging Show, Booth N7411, Las Vegas USA",
    },
    excerpt: {
      zh: "今年九月，CHANFER 远渡重洋亮相美国拉斯维加斯 PRINTING United Expo 2026 —— 北美规模最大的印刷与包装盛会。欢迎莅临 N7411 展位，现场体验一站式卡牌包装自动化实机演示。",
      en: "This September, CHANFER crosses the Pacific to exhibit at PRINTING United Expo 2026 in Las Vegas, USA — North America's largest printing and packaging event. Visit Booth N7411 for live demos of our one-stop card packaging automation.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "倒计时开始！今年 9 月 23–25 日，CHANFER 将携全套卡牌包装自动化设备，远赴美国内华达州拉斯维加斯，亮相 PRINTING United Expo 2026 —— 这是北美规模最大的印刷与包装行业盛会，汇聚来自全美及全球数万名专业观众、600+ 家展商。我们在 N7411 展位，备好样机、等你来！",
          en: "The countdown is on! This September 23–25, CHANFER is bringing our full card-packaging automation lineup to PRINTING United Expo 2026 in Las Vegas, Nevada, USA — North America's largest event for the printing and packaging industry, drawing tens of thousands of professionals and 600+ exhibitors from across the Americas and beyond. We can't wait to meet you at Booth N7411.",
        },
      },
      {
        type: "h2",
        text: { zh: "N7411 展位，精彩抢先看", en: "What's Waiting for You at Booth N7411" },
      },
      {
        type: "li",
        text: {
          zh: "FKJ-100KP 自动发卡机 — 500 张/分钟，卡片厚度 0.1–3 mm，卡片尺寸 45–120 mm × 51–100 mm。",
          en: "FKJ-100KP Automatic Card Feeder — 500 sheets/min, card thickness 0.1–3 mm, card size 45–120 mm × 51–100 mm.",
        },
      },
      {
        type: "li",
        text: {
          zh: "智能发卡系统 — 配方化设定，单批 25,000 包，100% AI 视觉检测。",
          en: "Smart Card Dispatching System — recipe-based setup, 25,000 packs per batch, 100% AI visual inspection.",
        },
      },
      {
        type: "li",
        text: {
          zh: "六种包装方式 — 糖果枕式、自粘条、四边封、束带、热缩、三维包膜任意组合。",
          en: "Six Packaging Methods — candy pillow, self-adhesive strip, four-side seal, banding, heat shrink and 3D box packaging.",
        },
      },
      {
        type: "li",
        text: {
          zh: "整线集成 — 从摩擦式给料到协作机器人码垛，配合智能控制无缝衔接。",
          en: "Full Line Integration — from friction feeder to palletizing with collaborative robots and smart controls.",
        },
      },
      {
        type: "cta",
        text: { zh: "查看卡牌包装方案", en: "See Our Card Packaging Solutions" },
        href: "/solutions",
      },
      {
        type: "h2",
        text: { zh: "为什么一定要来美国展找 CHANFER", en: "Why Visit CHANFER in the USA" },
      },
      {
        type: "li",
        text: {
          zh: "全球 8,000+ 客户信赖，设备远销海外、久经实战。",
          en: "8,000+ clients served worldwide — field-proven equipment shipped across the globe.",
        },
      },
      {
        type: "li",
        text: {
          zh: "100+ 项专利，设备通过 CE 认证。",
          en: "100+ patents and CE-certified equipment.",
        },
      },
      {
        type: "li",
        text: {
          zh: "25+ 年行业经验，深耕卡牌自动化包装。",
          en: "25+ years of industry experience in card packaging automation.",
        },
      },
      {
        type: "li",
        text: {
          zh: "100+ 名研发、制造与服务团队人员，全程护航。",
          en: "100+ team members focused on R&D, manufacturing and service.",
        },
      },
      {
        type: "li",
        text: {
          zh: "ISO9001 认证 · 国家高新技术企业 · 广东省专精特新企业。",
          en: "ISO9001 certified · National High-Tech Enterprise · Guangdong SRDI recognized.",
        },
      },
      {
        type: "h2",
        text: { zh: "来拉斯维加斯，赴一场之约", en: "Plan Your Visit to Las Vegas" },
      },
      {
        type: "li",
        text: {
          zh: "场馆：美国内华达州 · 拉斯维加斯会展中心（Las Vegas Convention Center）。",
          en: "Venue: Las Vegas Convention Center, Nevada, USA.",
        },
      },
      {
        type: "li",
        text: {
          zh: "展位：北馆 N7411（North Halls, Booth N7411）。",
          en: "Booth: North Halls, Booth N7411.",
        },
      },
      {
        type: "li",
        text: {
          zh: "日期：2026 年 9 月 23–25 日。",
          en: "Dates: September 23–25, 2026.",
        },
      },
      {
        type: "p",
        text: {
          zh: "别错过！这是你亲眼见证设备实机运转、带上卡片样品、敲定最适合产线自动化方案的最佳时机。现在就预约演示档期，我们为你留好前排座位。",
          en: "Don't miss it — this is your chance to watch our machines run live, bring your card samples, and lock in the right automation for your line. Reserve a demo slot now and we'll save you a front-row seat.",
        },
      },
      {
        type: "cta",
        text: { zh: "预约展位演示", en: "Book a Demo at the Show" },
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
