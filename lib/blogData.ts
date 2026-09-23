/* trigger redeploy post4 */
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
  faqs?: { question: Record<string, string>; answer: Record<string, string> }[];
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
        text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" },
        href: "https://chanfercard.com/book-a-demo.html",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },
  {
    slug: "why-card-packaging-seals-fail",
    date: "2026-09-08",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "为什么你的卡牌包装封口会失败 —— 以及如何修复",
      en: "Why Your Card Packaging Seals Fail — and How to Fix It",
    },
    excerpt: {
      zh: "在卡牌包装产线上，封口不牢或漏气是最常见的故障之一。本文总结四边封、热缩等工艺下封口失败的典型原因与对应的调机方法，帮你在产线上快速排障。",
      en: "A weak or leaky seal is one of the most common failures on a card packaging line. This post breaks down the typical causes of seal failure in four-side seal and shrink wrapping — and the tuning fixes CHANFER engineers use to solve them fast.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌包装产线上，封口不牢或漏气是我们从客户那里听到最多的问题之一 —— 而一旦找到原因，通常也是最容易修的。无论你用的是四边封还是热缩包装来封装卡牌和收藏卡组，失效模式都惊人地相似。",
          en: "On the card packaging floor, a weak or leaky seal is one of the most common headaches we hear from buyers — and usually one of the easiest to fix once you know what's causing it. Whether you run four-side sealing or heat-shrink wrapping for trading cards and collector decks, the failure modes look surprisingly similar.",
        },
      },
      {
        type: "h2",
        text: { zh: "封口不牢固时", en: "When the Seal Won't Hold" },
      },
      {
        type: "li",
        text: {
          zh: "封口温度过低 → 调高封口条温度，直到薄膜干净地粘合。",
          en: "Seal temperature too low → raise the sealing bar temperature until the film bonds cleanly.",
        },
      },
      {
        type: "li",
        text: {
          zh: "压力不足 → 增大封口气缸压力，使焊缝更紧。",
          en: "Pressure insufficient → increase the sealing cylinder pressure for a tighter weld.",
        },
      },
      {
        type: "li",
        text: {
          zh: "线速度过快 → 降低包装速度，让薄膜有充分时间粘合。",
          en: "Line speed too fast → slow the packaging speed so the film has time to fully bond.",
        },
      },
      {
        type: "li",
        text: {
          zh: "封口条脏污 → 清洁封口条，清除破坏封口的残膜。",
          en: "Dirty sealing jaw → clean the jaw to remove stuck film residue that breaks the seal.",
        },
      },
      {
        type: "h2",
        text: { zh: "封口烧焦、撕裂或起皱时", en: "When the Seal Burns, Tears or Wrinkles" },
      },
      {
        type: "li",
        text: {
          zh: "温度过高 → 调低；过热薄膜会熔化并削弱封口。",
          en: "Temperature too high → lower it; overheated film melts and weakens the seal.",
        },
      },
      {
        type: "li",
        text: {
          zh: "压力过高 → 减小封口压力，避免压坏薄膜。",
          en: "Pressure too high → reduce sealing pressure to avoid crushing the film.",
        },
      },
      {
        type: "li",
        text: {
          zh: "线速度过慢 → 加快速度，减少每个包装受热的时间。",
          en: "Line speed too slow → speed up to limit heat exposure on each pack.",
        },
      },
      {
        type: "li",
        text: {
          zh: "封口条不平 → 重新调平封口条，确保整包受力均匀。",
          en: "Uneven sealing bar → re-level the jaw for consistent contact across the pack.",
        },
      },
      {
        type: "h2",
        text: { zh: "封边呈锯齿状或波浪状时", en: "When the Edge Looks Serrated or Wavy" },
      },
      {
        type: "li",
        text: {
          zh: "封齿磨损 → 更换封带或封口条，避免损坏更多薄膜。",
          en: "Worn seal teeth → replace the seal band or jaw before it damages more film.",
        },
      },
      {
        type: "li",
        text: {
          zh: "加热不均 → 检查加热元件并重新调平封口条。",
          en: "Uneven heating → check the heating element and re-level the jaw.",
        },
      },
      {
        type: "h2",
        text: { zh: "为什么这对卡牌产品很重要", en: "Why It Matters for Card Products" },
      },
      {
        type: "p",
        text: {
          zh: "卡牌和收藏品需要干净、防拆的封口。四边封或热缩包装做得差，不仅货架上看上去不专业 —— 还会进潮气，丢掉买家期待的高级感。",
          en: "Trading cards and collectibles demand a clean, tamper-evident seal. A poor four-side seal or shrink wrap not only looks unprofessional on the shelf — it lets in moisture and takes away the premium feel buyers expect.",
        },
      },
      {
        type: "h2",
        text: { zh: "现场看我们解决", en: "See It Solved Live" },
      },
      {
        type: "p",
        text: {
          zh: "这些正是我们工程师在每条 CHANFER 产线出厂前都会调校的问题。来 PRINTING United Expo 2026（拉斯维加斯，9月23–25日，N7411展位）看机器现场运行 —— 带上你的样品，我们帮你把封口调到刚好。",
          en: "These are exactly the issues our engineers tune on every CHANFER line before it ships. Watch the machines run live at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring your samples and we'll dial in the right seal for your product.",
        },
      },
      {
        type: "cta",
        text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" },
        href: "https://chanfercard.com/book-a-demo.html",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },



  {
    slug: "film-wont-feed-flow-wrapper-jams",
    date: "2026-09-09",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "走膜不畅？枕式包装机卡膜的 5 个原因",
      en: "Film Won't Feed? 5 Reasons Your Flow Wrapper Jams — and How to Clear Them",
    },
    excerpt: {
      zh: "卡牌枕式包装线上走膜拉不动、卡膜是最常报修的故障。本文拆解膜跑偏、打滑、褶皱、拉断、丢标五个常见成因，并给出 CHANFER 工程师的排查与解决方法。",
      en: "Film that won't feed or a wrapper that jams is the most common service call on a card line. We break down five repeatable causes — film tracking off, slipping, wrinkling, tearing, lost print marks — with the fixes CHANFER engineers use.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌枕式包装线上，走膜拉不动、包装中途卡膜，是我们售后团队接到最多的报修之一。好消息是：绝大多数走膜问题都来自五个反复出现的成因，只要知道往哪看，排查很快。",
          en: "On a card flow-wrapping line, film that won't feed — or a wrapper that jams mid-run — is one of the most common calls our service team gets. The good news: most film problems trace back to five repeatable causes, and they're all quick to check once you know where to look.",
        },
      },

      {
        type: "h2",
        text: { zh: "1. 膜跑偏", en: "1. Film Tracks Off-Center" },
      },
      {
        type: "li",
        text: {
          zh: "膜卷没对正 → 重新把膜卷在放卷轴上摆正，让膜路正对成型器。",
          en: "Un-centered film roll → re-align the roll on the unwind shaft so the web sits square to the former.",
        },
      },
      {
        type: "li",
        text: {
          zh: "导向辊不平行 → 检查每根过辊是否平行，几度的歪斜就会把膜带偏。",
          en: "Misaligned guide rollers → check that each idler roller is parallel; a few degrees of skew pushes the film sideways.",
        },
      },
      {
        type: "li",
        text: {
          zh: "光电眼脏或移位 → 清洁传感器窗口，确认它读的是印刷标记而不是膜边。",
          en: "Dirty or shifted photoeye → clean the sensor window and confirm it reads the print mark, not the film edge.",
        },
      },

      {
        type: "h2",
        text: { zh: "2. 膜打滑、拉不动", en: "2. Film Slips and Won't Feed" },
      },
      {
        type: "li",
        text: {
          zh: "送膜辊压力不足 → 加大牵引辊压力，让它咬住膜。",
          en: "Low feed-roller pressure → increase pressure on the pull rollers so they grip the film.",
        },
      },
      {
        type: "li",
        text: {
          zh: "橡胶辊磨损 → 对磨光的辊面重新包胶或更换，恢复摩擦力。",
          en: "Worn rubber rollers → resurface or replace rollers that have gone smooth and lost traction.",
        },
      },
      {
        type: "li",
        text: {
          zh: "张力太松 → 调高放卷制动张力，让膜路经过成型器时保持绷紧。",
          en: "Tension too loose → raise the unwind brake tension so the web stays taut through the former.",
        },
      },

      {
        type: "h2",
        text: { zh: "3. 封口处褶皱打折", en: "3. Wrinkles or Folds at the Seal" },
      },
      {
        type: "li",
        text: {
          zh: "膜面张力不均 → 平衡左右张力，让膜平整进入封口。",
          en: "Uneven tension across the web → balance left and right side tension so the film enters the jaws flat.",
        },
      },
      {
        type: "li",
        text: {
          zh: "压膜辊受力不匀 → 重新调平夹辊，一处偏高会把膜压出折痕。",
          en: "Uneven pressure rollers → re-level the nip rollers; one high spot creases the film.",
        },
      },
      {
        type: "li",
        text: {
          zh: "膜路有杂物 → 清除夹在辊间的粉尘或废边。",
          en: "Debris in the film path → clear dust or trimmed scrap caught between the rollers.",
        },
      },

      {
        type: "h2",
        text: { zh: "4. 封口处膜被拉断", en: "4. Film Tears at the Seal Jaw" },
      },
      {
        type: "li",
        text: {
          zh: "线速度太快 → 降速，让封刀在膜被拉紧前完成释放。",
          en: "Line speed too fast → slow down so the seal bar releases before the film is pulled taut.",
        },
      },
      {
        type: "li",
        text: {
          zh: "张力过大 → 放松放卷张力，被拉过度的膜会在封口处崩断。",
          en: "Tension too high → ease the unwind tension; over-stretched film snaps at the seal.",
        },
      },
      {
        type: "li",
        text: {
          zh: "封口温度不匹配 → 按膜厚调封刀温度，过热或过冷都会削弱膜强。",
          en: "Seal temperature mismatched → tune the bar temperature to the film gauge; too hot or too cold both weaken it.",
        },
      },

      {
        type: "h2",
        text: { zh: "5. 光电跟踪丢失印刷标记", en: "5. Photoeye Loses the Print Mark" },
      },
      {
        type: "li",
        text: {
          zh: "镜头脏 → 擦拭光电眼，积灰的窗口会漏读对位标记。",
          en: "Dirty lens → wipe the photoeye; a dusty window misses the registration mark.",
        },
      },
      {
        type: "li",
        text: {
          zh: "灵敏度不对 → 调整增益，让它锁定标记而非背景。",
          en: "Wrong sensitivity → adjust the gain so it locks onto the mark, not the background.",
        },
      },
      {
        type: "li",
        text: {
          zh: "印刷对比度低 → 用更深的套色标记，或换一批对比度更高的膜。",
          en: "Low-contrast print → use a darker registration mark or a higher-contrast batch of film.",
        },
      },

      {
        type: "h2",
        text: { zh: "为什么卡牌线特别在意这个", en: "Why It Matters on a Card Line" },
      },
      {
        type: "p",
        text: {
          zh: "收藏卡和集换式卡牌靠“卖相”说话。一张起皱、跑偏或拉破的包装，买家一上手就觉得是“次品”；而在高速线上，一处走偏的膜路就能毁掉整批。保持膜路清洁对齐，既保良率也保品牌。",
          en: "Collector decks and trading cards are sold on presentation. A wrinkled, off-center or torn wrapper reads as \"second quality\" the moment a buyer picks it up — and on a fast line, one drifting web can scrap an entire run. Keeping the film path clean and aligned protects both yield and brand.",
        },
      },

      {
        type: "h2",
        text: { zh: "来现场看实机跑", en: "See It Run Live" },
      },
      {
        type: "p",
        text: {
          zh: "这些正是我们为 CHANFER 卡牌包装线做调试时必做的调整。来 PRINTING United Expo 2026（拉斯维加斯，9月23–25日，N7411展位）看机器现场运行 —— 带上你的膜样，我们现场帮你调。",
          en: "These are the exact adjustments our engineers make when we commission a CHANFER card wrapping line. Watch the film run steady at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring your film sample and we'll tune the web path on the spot.",
        },
      },
      {
        type: "cta",
        text: { zh: "观看 TikTok 演示视频", en: "Watch the TikTok Demo Video" },
        href: "https://www.tiktok.com/@wilson.chanfer/video/7680477896112114962",
      },
      {
        type: "cta",
        text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" },
        href: "https://chanfercard.com/book-a-demo.html",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },



  {
    slug: "fixing-card-box-labeling",
    date: "2026-09-10",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "标签起翘还是贴歪？卡牌盒贴标故障排查",
      en: "Label Peeling or Crooked? Fixing Card Box Labeling",
    },
    excerpt: {
      zh: "卡牌盒贴标起翘、贴歪、起皱或漏贴，是最常见的包装瑕疵。本文列出5类贴标故障的典型成因与调机方法，帮你在产线上快速排障。",
      en: "Peeling, crooked, wrinkled or missed labels are the most common card-box defects. This post lists five labeling fault categories with their causes and the tuning fixes to clear them fast.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌包装线上，一张起翘、起皱或贴歪的标签，最容易让一个高端盒子瞬间显得廉价。好消息是：卡牌盒贴标的故障大多来自几个反复出现的成因，而且都很好调——只要知道往哪看。",
          en: "On a card packaging line, a label that peels, wrinkles or sits crooked is one of the fastest ways to make a premium box look cheap. The good news: most card-box labeling faults trace back to a handful of repeatable causes — and they're quick to tune once you know where to look.",
        },
      },
      {
        type: "h2",
        text: { zh: "1. 标签贴不上 / 贴标失败", en: "1. Label Won't Stick / Labeling Fails" },
      },
      {
        type: "li",
        text: {
          zh: "底纸没剥离 → 清理剥离板、调整剥标板角度，让标签干净脱开。",
          en: "Backing paper not peeled off → clean the peeling plate and adjust its angle so the label releases cleanly.",
        },
      },
      {
        type: "li",
        text: {
          zh: "标签太黏 / 不黏 → 更换合格标签。",
          en: "Label too sticky / not sticky enough → switch to a qualified label stock.",
        },
      },
      {
        type: "li",
        text: {
          zh: "出标早或晚 → 调整延时参数、对齐线速度。",
          en: "Dispensing early or late → adjust the delay timing and match the line speed.",
        },
      },
      {
        type: "li",
        text: {
          zh: "标签走偏、卷膜跑偏 → 调整放卷张力、导向辊；校正标签居中。",
          en: "Web drifts off-center → balance unwind tension and the guide rollers; re-center the label.",
        },
      },
      {
        type: "h2",
        text: { zh: "2. 标签贴歪、位置不准", en: "2. Label Crooked or Misplaced" },
      },
      {
        type: "li",
        text: {
          zh: "剥标板不正 → 微调剥标板左右、高低。",
          en: "Peeling plate not square → fine-tune the plate left/right and up/down.",
        },
      },
      {
        type: "li",
        text: {
          zh: "贴标胶辊压力不均 → 调平贴标胶辊、保证压力一致。",
          en: "Uneven applicator-roll pressure → level the applicator roller so pressure is even.",
        },
      },
      {
        type: "li",
        text: {
          zh: "标签跑偏 → 校正标签居中，检查导向辊。",
          en: "Label tracking off → correct label centering and check the guide rollers.",
        },
      },
      {
        type: "h2",
        text: { zh: "3. 起皱、气泡、翘边", en: "3. Wrinkles, Bubbles or Lifting Edges" },
      },
      {
        type: "li",
        text: {
          zh: "贴标速度太快 → 降低贴标速度。",
          en: "Labeling too fast → slow the labeling speed.",
        },
      },
      {
        type: "li",
        text: {
          zh: "张力过大 / 过小 → 减小放卷张力到合适范围。",
          en: "Tension too high / too low → reduce unwind tension to the right range.",
        },
      },
      {
        type: "li",
        text: {
          zh: "贴标胶辊不平、太硬 → 更换软胶辊、调平行。",
          en: "Hard or uneven applicator roller → fit a softer roller and level it.",
        },
      },
      {
        type: "li",
        text: {
          zh: "盒型不规则 → 改用抚标毛刷、海绵轮。",
          en: "Irregular box shape → add a brush or foam wheel to smooth the label down.",
        },
      },
      {
        type: "h2",
        text: { zh: "4. 漏贴 / 不出标", en: "4. Missed Labels / No Dispense" },
      },
      {
        type: "li",
        text: {
          zh: "光电眼被遮挡、失灵 → 清洁、重新对准标签标记。",
          en: "Photoeye blocked or faulty → clean it and re-aim at the label mark.",
        },
      },
      {
        type: "li",
        text: {
          zh: "标签断标、卷死 → 重新穿膜、清理粘胶。",
          en: "Label web broken or jammed → re-thread the web and clear adhesive buildup.",
        },
      },
      {
        type: "h2",
        text: { zh: "5. 连标、一次出多张", en: "5. Double Labels / Labels Stick Together" },
      },
      {
        type: "li",
        text: {
          zh: "标签间胶水过多、粘连 → 降低出标速度。",
          en: "Excess glue between labels → lower the dispensing speed.",
        },
      },
      {
        type: "li",
        text: {
          zh: "剥标板残胶 → 清理剥标板残胶。",
          en: "Residue on the peeling plate → clean the plate.",
        },
      },
      {
        type: "h2",
        text: { zh: "为什么卡牌线特别在意这个", en: "Why It Matters on a Card Line" },
      },
      {
        type: "p",
        text: {
          zh: "收藏盒和集换卡包装是“看脸”的。一张贴歪、起泡或翘边的标签，买家一上手就觉得是“次品”；而在高速线上，一个贴错标的盒子就可能引发整批召回。干净、居中、无气泡的贴标，既保卖相也保品牌。",
          en: "Collector boxes and trading-card packaging are bought on sight. A crooked, bubbled or lifting label reads as \"factory reject\" the moment a buyer handles it — and on a fast line a single mislabeled box can trigger a whole-batch recall. Clean, centered, bubble-free labeling protects both shelf appeal and your brand.",
        },
      },
      {
        type: "h2",
        text: { zh: "来现场看实机跑", en: "See It Run Live" },
      },
      {
        type: "p",
        text: {
          zh: "这些正是我们为 CHANFER 贴标单元做调试时必查的故障。来 PRINTING United Expo 2026（拉斯维加斯，9月23–25日，N7411展位）看标签干净方正地贴上 —— 带上你的盒样，我们现场帮你调好贴标。",
          en: "These are the exact faults our engineers check when we commission a CHANFER labeling unit. See labels apply clean and square at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring your box sample and we'll dial in the labeling for your product.",
        },
      },
      {
        type: "cta",
        text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" },
        href: "https://chanfercard.com/book-a-demo.html",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },



  {
    slug: "card-count-off-metering",
    date: "2026-09-11",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "卡牌数量不准？卡牌产线计数与计量误差排查",
      en: "Card Count Off? Fixing Metering Errors on Your Card Line",
    },
    excerpt: {
      zh: "卡牌盒每盒多一张或少一张，是最常见的计数事故。本文列出5类计数/计量故障的成因与调机方法，帮你在卡牌产线上快速排障。",
      en: "One card too many or too few per box is the most common counting fault on a card line. This post lists five counting and metering fault categories with their causes and the tuning fixes to clear them fast.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌包装线上，盒子里数量对，才算「对」。少一张、多一张，整盒就过不了质检——更糟的是直接发到会数的收藏者手上。卡牌线上的计数和计量误差，大多能归结到几个反复出现的成因。下面是 CHANFER 工程师排查和调修的方法。",
          en: "On a card packaging line, the box is only \"right\" if the count is right. One card short, one card extra, and the whole pack fails QA \u2014 or worse, ships to a collector who counts. Most count and metering errors on a card line come down to a few repeatable causes. Here's how our engineers trace and fix them.",
        },
      },
      {
        type: "h2",
        text: { zh: "1. 数量偏高或偏低（每盒多卡 / 少卡）", en: "1. Count Drifts High or Low (over/under per box)" },
      },
      {
        type: "li",
        text: {
          zh: "计量盘或送料机构未对零 → 重新归零，并按卡牌尺寸核对节距。",
          en: "Metering disc or feeder not indexed → re-zero the indexing and verify the pitch against the card size.",
        },
      },
      {
        type: "li",
        text: {
          zh: "送卡皮带打滑 → 张紧皮带，检查磨损情况。",
          en: "Card feeder belt slips → tension the belt and check for wear.",
        },
      },
      {
        type: "li",
        text: {
          zh: "光电眼被静电或粉尘误触发 → 清洁传感器，加装除静电棒。",
          en: "Photoeye mis-triggered by static or dust → clean the sensor, add a static-elimination bar.",
        },
      },
      {
        type: "li",
        text: {
          zh: "线速度与计数器不同步 → 让送料速率与计数单元匹配。",
          en: "Line speed out of sync with the counter → match the feed rate to the counting unit.",
        },
      },
      {
        type: "h2",
        text: { zh: "2. 重量或填充不一致（含拼装盒与内衬）", en: "2. Inconsistent Weight or Fill (boxed sets & inserts)" },
      },
      {
        type: "li",
        text: {
          zh: "检重秤阈值漂移 → 重新校准检重秤零点。",
          en: "Checkweigher threshold drifting → recalibrate the checkweigher zero.",
        },
      },
      {
        type: "li",
        text: {
          zh: "秤台上有物料残留 → 清理残料并重新去皮。",
          en: "Residue on the scale → clear buildup and re-tare.",
        },
      },
      {
        type: "li",
        text: {
          zh: "振动串入秤体 → 把秤体与机架做隔振处理。",
          en: "Vibration coupling into the scale → isolate the scale from the machine frame.",
        },
      },
      {
        type: "h2",
        text: { zh: "3. 漏卡 / 连卡（多吐一张）", en: "3. Missed Cards / Double Cards" },
      },
      {
        type: "li",
        text: {
          zh: "发卡处卡料 → 清理料仓，检查卡牌是否卷曲或折角。",
          en: "Card jams at the dispenser → clear the hopper, check cards for curl or dog-ears.",
        },
      },
      {
        type: "li",
        text: {
          zh: "吸嘴 / 气动取卡时序不对 → 调整取卡时序与气压。",
          en: "Vacuum/air pick mistimed → adjust pick timing and air pressure.",
        },
      },
      {
        type: "li",
        text: {
          zh: "卡牌未分离 → 改为单卡送料，加装分卡轮。",
          en: "Cards not separated → switch to single-card feed, add a separator wheel.",
        },
      },
      {
        type: "h2",
        text: { zh: "4. 长班生产过程中间歇性送卡异常", en: "4. Intermittent Misfeeds on Long Runs" },
      },
      {
        type: "li",
        text: {
          zh: "料仓快空了 → 保持料仓有料，加装缺料报警。",
          en: "Hopper running low → keep it loaded, add a low-level alarm.",
        },
      },
      {
        type: "li",
        text: {
          zh: "湿度导致卡牌卷曲 → 控制湿度并对卡料做预处理。",
          en: "Humidity curling the cards → control humidity, condition the stock.",
        },
      },
      {
        type: "li",
        text: {
          zh: "送卡轮磨损 → 更换送卡轮。",
          en: "Worn feed wheel → replace the wheel.",
        },
      },
      {
        type: "h2",
        text: { zh: "5. 一整个班次后逐渐漂移", en: "5. Drift Over a Full Shift" },
      },
      {
        type: "li",
        text: {
          zh: "计数器热漂移 → 让设备充分预热，并定期重新回零。",
          en: "Thermal drift in the counter → let the machine warm up, re-home periodically.",
        },
      },
      {
        type: "li",
        text: {
          zh: "机械零点松动 → 重新拧紧并校正送料机构。",
          en: "Loose mechanical zero → re-tighten and re-index the feeder.",
        },
      },
      {
        type: "li",
        text: {
          zh: "批次数偏移 → 每批生产之间重置计数器。",
          en: "Batch count offset → reset the counter between production runs.",
        },
      },
      {
        type: "h2",
        text: { zh: "为什么卡牌线尤其重要", en: "Why It Matters on a Card Line" },
      },
      {
        type: "p",
        text: {
          zh: "收藏卡盒是按「精确张数」卖的。一盒 60 张变 59 或 61，就是退货、差评、信任受损。准确且可重复的计数，是高端包装和报废批次的分界线——也是买家最先注意到的细节之一。",
          en: "Collector boxes are sold by the exact count. A box of 60 that ships 59 or 61 means a return, a bad review and lost trust. Accurate, repeatable counting is the line between a premium pack and a scrapped lot \u2014 and it's one of the first things a buyer checks.",
        },
      },
      {
        type: "h2",
        text: { zh: "现场看实机", en: "See It Run Live" },
      },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23–25日）看卡牌精准计数与计量实机运行——带上你的卡样，我们现场帮你把精度调到位。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See cards count and meter accurately at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23\u201325 \u2014 bring your card sample and we'll dial in the accuracy for your product.",
        },
      },
      {
        type: "cta",
        text: { zh: "观看 TikTok 演示视频", en: "Watch the TikTok Demo Video" },
        href: "https://www.tiktok.com/@wilson.chanfer/video/7678978038775680263",
      },
      {
        type: "cta",
        text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" },
        href: "https://chanfercard.com/book-a-demo.html",
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-surface-scuffing",
    date: "2026-09-12",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "卡牌表面擦伤？收藏者为什么拒收划痕卡",
      en: "Card Surface Scuffing: Why Collectors Reject Scratched Cards",
    },
    excerpt: {
      zh: "卡面一道划痕就是退货。本文拆解卡牌包装线5类卡面损伤成因与调机方法，帮你把擦伤、压痕、吸盘印挡在出厂前。",
      en: "One scuff on the card face means a return. This post breaks down five causes of card-surface damage on a packaging line and how to tune them out before shipping.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌包装线上，印刷面就是产品本身。卡面只要有一道擦痕、磨痕或吸盘印，收藏者拿到灯下一照就是「次品」。大多数卡面损伤都是机械性的，也都能避免。下面是 CHANFER 工程师最常遇到的五类成因，以及对应的调机方法。",
          en: "On a trading-card line, the print is the product. A single scuff, rub mark or pick-line on the card face turns a premium collectible into a reject the moment a buyer inspects it under light. Most card-surface damage is mechanical \u2014 and avoidable. Here are the five most common causes our engineers see, and how to tune them out.",
        },
      },
      { type: "h2", text: { zh: "1. 送卡通道摩擦划痕", en: "1. Conveyor Friction Scratches" } },
      {
        type: "li",
        text: {
          zh: "卡牌传送时蹭到裸露皮带边或金属导轨，留下细线状划痕。处理：导轨贴低摩擦材料，传送段降速，用软头导轨，让印刷面绝不接触金属。",
          en: "Cards rubbing against bare belt edges or guide rails during transfer leave fine linear scratches. Fix: line the guides with low-friction material, slow the belt at transfer points, and use soft-tip rails so the print side never contacts metal.",
        },
      },
      { type: "h2", text: { zh: "2. 堆叠压伤", en: "2. Stack Pressure Marks" } },
      {
        type: "li",
        text: {
          zh: "整理堆叠时夹具压力过大，最上面几张卡留下压痕。处理：把夹具压力调到刚好稳住堆垛的最小值，加缓冲垫，并校准堆高传感器让它提前停夹。",
          en: "Too much clamp pressure in the collation stack leaves impression lines across the top cards. Fix: reduce clamp pressure to the minimum that holds the stack, add buffer pads, and calibrate the stack-height sensor so it stops clamping early.",
        },
      },
      { type: "h2", text: { zh: "3. 吸盘 / 机械手碰伤", en: "3. Picker / Suction Marks" } },
      {
        type: "li",
        text: {
          zh: "真空吸盘或夹爪碰到印刷面，留下环状或线状印痕。处理：一律从背面（非印刷面）取卡，吸力只作用在边缘，用吹气脱卡代替拖拽。",
          en: "Vacuum cups or grippers touching the print face leave ring or line marks. Fix: always pick from the back (non-print) side, apply suction only at the edges, and use an air-blow release instead of dragging the card off.",
        },
      },
      { type: "h2", text: { zh: "4. 清洁方式不当", en: "4. Improper Cleaning" } },
      {
        type: "li",
        text: {
          zh: "用干布擦卡，既磨花表面又带起静电灰尘。处理：用非接触式离子风除尘，控制线体湿度，清洁时绝不碰印刷面。",
          en: "Wiping cards with a dry cloth spreads abrasion and static dust. Fix: use non-contact ionized air blow-off, control line humidity, and never touch the print face during cleaning.",
        },
      },
      { type: "h2", text: { zh: "5. 包装膜内夹杂物压痕", en: "5. Debris Trapped in the Film" } },
      {
        type: "li",
        text: {
          zh: "卡牌和包膜之间一粒灰尘，收缩后就是一个压坑。处理：加在线离子风加洁净气罩，包膜前做膜边检测。",
          en: "A speck of dust between the card and the overwrap becomes a pressure dent after shrinking. Fix: add an in-line ionizer plus a clean-air enclosure, and run film-edge inspection before wrapping.",
        },
      },
      { type: "h2", text: { zh: "为什么卡牌线要盯这个", en: "Why It Matters on a Card Line" } },
      {
        type: "p",
        text: {
          zh: "卡面就是转售价。一道划痕等于一次退货、一条差评、一个不再复购的买家。干净无痕的输送，是高端盒和报废批次的分界线，也是收藏者上手第一眼就看的。",
          en: "The card face is the resale value. One scuff means a return, a one-star review, and a buyer who won't reorder. Clean, scratch-free handling is the line between a premium box and a rejected batch \u2014 and it's the first thing a collector checks.",
        },
      },
      { type: "h2", text: { zh: "现场看无痕卡牌输送", en: "See Clean Card Handling Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23\u201325日）看卡牌无痕输送实机运行\u2014带上你的卡样，我们现场给你看无划痕的效果。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See scratch-free card handling at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23\u201325 \u2014 bring your card sample and we'll show you a scuff-free result on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },
  {
    slug: "card-double-feed",
    date: "2026-09-14",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "双张/连张输卡？卡牌线一次走两张怎么调",
      en: "Double Feed on a Card Line: How to Stop Two Cards at Once",
    },
    excerpt: {
      zh: "一次送出两张卡，装盒就错卡、计数就出错。本文拆解卡牌线双张与连张输卡的5类成因与调机方法，帮你把双张挡在出厂前。",
      en: "When two cards leave the feeder together, collation and counts both break. This post breaks down five causes of double feed on a card line and how to tune them out before shipping.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "在卡牌包装线上，双张（一次走两张）和连张（多张粘连一起走）是最隐蔽也最坑人的故障之一。它不会立刻报警，却会让装盒错卡、计数偏差、封切压到两张，最后整批被客户拒收。下面是 CHANFER 工程师最常遇到的五类成因和对应的调机方法。",
          en: "On a trading-card line, a double feed (two cards out at once) or cards stuck together (several moving as one) is one of the sneakiest faults. It rarely trips an alarm, yet it causes mis-collation, count errors, and two cards jammed in one seal — and a rejected batch. Here are the five most common causes our engineers see, and how to tune them out.",
        },
      },
      { type: "h2", text: { zh: "1. 吸盘吸力过大，一次吸起两张", en: "1. Suction Too Strong — Picking Two Cards" } },
      {
        type: "li",
        text: {
          zh: "真空吸盘吸力调得过大，取卡时会把下面一张也带起来。处理：把吸力降到刚好稳定取一张的最小值，并在取卡后加单卡厚度检测（光纤或电容）自动剔除双张。",
          en: "Vacuum suction set too high lifts the card underneath along with the top one. Fix: drop suction to the minimum that reliably picks one card, and add single-card thickness detection (fiber or capacitive) right after pickup to reject doubles.",
        },
      },
      { type: "h2", text: { zh: "2. 静电让卡牌粘连", en: "2. Static Clings Cards Together" } },
      {
        type: "li",
        text: {
          zh: "干燥环境下卡牌带静电，分卡时两张贴在一起走。处理：在取卡和分卡段加离子风除静电，把线体相对湿度保持在 45%–55%，并用防静电料仓。",
          en: "In dry air the cards build static and travel as a pair through the separator. Fix: add ionized-air bars at pickup and separation, hold line humidity around 45%–55%, and use an anti-static hopper.",
        },
      },
      { type: "h2", text: { zh: "3. 分卡轮或毛刷间隙不对", en: "3. Separator Wheel or Brush Gap Off" } },
      {
        type: "li",
        text: {
          zh: "分卡轮间隙远大于一张卡厚，或毛刷磨平，分不清单张。处理：把分卡轮间隙调到略大于一张卡厚（约 +0.05 mm），检查毛刷是否磨平，必要时更换。",
          en: "If the separator-wheel gap is far more than one card thick, or the brush is worn flat, cards don't split into singles. Fix: set the wheel gap just above one card thickness (about +0.05 mm) and replace a flattened brush.",
        },
      },
      { type: "h2", text: { zh: "4. 卡堆太高、湿度大导致粘连", en: "4. Stack Too Tall or Humid — Cards Stick" } },
      {
        type: "li",
        text: {
          zh: "一次上料太厚，底部卡牌被压住粘连；环境湿度高也会让卡面微粘。处理：限高上料、分小批补给，控制环境湿度，并加松卡抖卡机构让卡张分离。",
          en: "Loading too many cards at once presses the bottom ones together; high humidity also makes surfaces tacky. Fix: limit feed height and batch the supply, control humidity, and add a card-loosening jogger so sheets separate.",
        },
      },
      { type: "h2", text: { zh: "5. 取卡段和送卡皮带速度不匹配", en: "5. Pickup and Belt Speed Out of Sync" } },
      {
        type: "li",
        text: {
          zh: "取卡快、皮带慢，卡牌在出口叠在一起。处理：降低取卡节拍，让每张卡之间留出间隔；皮带速度略快于取卡段，避免追尾叠卡。",
          en: "Pickup faster than the belt stacks cards at the exit. Fix: slow the pickup cadence to leave a gap between cards, and run the belt slightly faster than pickup so cards never catch up and overlap.",
        },
      },
      { type: "h2", text: { zh: "为什么卡牌线要盯双张", en: "Why It Matters on a Card Line" } },
      {
        type: "p",
        text: {
          zh: "双张不会立刻报警，但每一张多走的卡都会变成装盒错卡、计数错、客户投诉。双张检测加单卡分卡，是稳定出箱和零错卡的前提，也是收藏者收到整盒对版卡的基础。",
          en: "A double feed won't sound an alarm, but every extra card becomes a mis-collated box, a wrong count, and a complaint. Double-feed detection plus reliable single-card separation is what lets you ship consistent boxes with zero mis-collation — and gives collectors a correctly collated set.",
        },
      },
      { type: "h2", text: { zh: "现场看稳定单卡分卡", en: "See Stable Single-Card Feeding Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23–25日）看卡牌单卡分卡实机运行——带上你的卡样，我们现场给你看零双张的效果。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See stable single-card feeding at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring your card sample and we'll show you a zero-double-feed result on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-feed-skew",
    date: "2026-09-15",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "卡牌走卡跑偏？卡牌线卡牌歪斜怎么调",
      en: "Card Skew on the Line: How to Keep Cards Straight",
    },
    excerpt: {
      zh: "盒子里的卡全是歪的，像被风吹过——走卡跑偏是卡牌线最容易被忽略的故障。本文拆5类成因与调机法，帮你把歪卡挡在装盒前。",
      en: "Cards coming out crooked in the box — feed skew is the most overlooked fault on a card line. This post breaks down five causes and fixes so crooked cards never reach collation.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "上个月有个客户发来一段产线视频：盒子里的卡全歪着，像被人随手塞进去的。他第一反应是「机器坏了」，但跑偏几乎从来不是机器坏了，而是卡牌在输送途中一点点偏出去，最后装盒时已经救不回来。走卡歪斜是卡牌线最容易被忽略的故障——它不报警、不卡机，只在客户开箱那一刻露馅。下面是 CHANFER 工程师最常遇到的五类成因和对应的调机方法。",
          en: "Last month a customer sent us a line video: every card in the box was tilted, like someone had just stuffed them in. His first thought was \"the machine is broken,\" but skew is almost never a broken machine — it's the card drifting a little during transfer until collation can't save it. Feed skew is the most overlooked fault on a card line: no alarm, no jam, just a reject the moment the buyer opens the box. Here are the five most common causes our engineers see, and how to tune them out.",
        },
      },
      { type: "h2", text: { zh: "1. 导轨不对中，卡牌贴边跑", en: "1. Guides Off-Center — Card Hugs One Side" } },
      {
        type: "li",
        text: {
          zh: "左右导轨间隙不均或整体偏了，卡牌一路贴着一侧走，越走越歪。处理：用卡规把两条导轨调成与皮带中线对称，间隙留一张卡厚加 0.5–1 mm，调完拿直卡从头走到尾看是否还贴边。",
          en: "If the left and right guides are uneven or shifted, the card rides one wall and drifts further. Fix: set both guides symmetric to the belt centerline with a gap of one card thickness plus 0.5–1 mm, then run a straight card end to end and watch whether it still hugs a side.",
        },
      },
      { type: "h2", text: { zh: "2. 上下 / 左右皮带速度不一致", en: "2. Belt Speeds Don't Match" } },
      {
        type: "li",
        text: {
          zh: "上下夹送皮带或左右同步带速度差一点，卡牌就被「拧」歪。处理：用转速表核两侧皮带线速度，差超过 1% 就重调；皮带打滑老化的直接换，别硬撑。",
          en: "When top and bottom pinch belts or left/right timing belts differ even slightly, the card gets twisted. Fix: check both belt surface speeds with a tachometer and re-tune any difference over 1%; replace slipping or worn belts instead of pushing them.",
        },
      },
      { type: "h2", text: { zh: "3. 取卡吸盘偏位 / 角度歪", en: "3. Picker Misaligned or Tilted" } },
      {
        type: "li",
        text: {
          zh: "吸盘安装偏了或吸取角度斜，卡牌一放上去就是斜的，后面再怎么导都正不回来。处理：重新对中标定吸盘中心，吸盘面与卡面平行，取放点设在卡牌几何中心，放完用对射光纤复核角度。",
          en: "A misplaced or tilted suction cup drops the card in skewed, and no guide downstream can fully straighten it. Fix: re-center and level the cup to the card face, pick and place at the card's geometric center, then verify the angle with a through-beam sensor after placement.",
        },
      },
      { type: "h2", text: { zh: "4. 卡张本身弯曲 / 翘曲", en: "4. The Cards Themselves Are Warped" } },
      {
        type: "li",
        text: {
          zh: "受潮或堆放受压的卡会翘，进料就是歪的，机器背不了这个锅。处理：到料先抽测平整度，翘曲超标的挑出来回烘/压平；料仓加整平轮，让卡进线前先被压平。",
          en: "Cards that warped from moisture or stacking pressure enter skewed — the machine didn't cause it. Fix: sample flatness on incoming stock and pull warped sheets for re-conditioning; add a flattening roller at the hopper so cards are flat before they enter the line.",
        },
      },
      { type: "h2", text: { zh: "5. 缺对中机构 / 张力不均", en: "5. No Centering — Drift Over Distance" } },
      {
        type: "li",
        text: {
          zh: "长距离输送没有对中轮或气动对中，卡牌慢慢偏出去。处理：在关键转弯和装盒前加对中导轮/气动推正，皮带张力按厂商值调匀，别一头紧一头松。",
          en: "Over a long run with no centering wheel or air aligner, the card slowly drifts. Fix: add centering guides or pneumatic aligners before turns and before collation, and set belt tension evenly per spec — not tight at one end and loose at the other.",
        },
      },
      { type: "h2", text: { zh: "为什么卡牌线要盯走卡跑偏", en: "Why It Matters on a Card Line" } },
      {
        type: "p",
        text: {
          zh: "歪卡不会立刻让你停机，但它会悄悄吃掉你的良率：装盒不齐、封切压到边、客户开箱就是一眼歪。把走卡对正做扎实，是「整盒对版、开箱即正」的地基，也是收藏者愿意复购的前提。说白了，机器能跑快，但跑歪了就等于白跑。",
          en: "Skew won't stop your line, but it quietly eats yield: uneven boxes, seals clipping the edge, a tilted card the moment the buyer opens the box. Solid feed alignment is the foundation of a correctly collated, straight-out-of-the-box set — and the reason a collector reorders. Simply put, the line can run fast, but if it runs crooked it runs for nothing.",
        },
      },
      { type: "h2", text: { zh: "现场看稳定对位输送", en: "See Straight Card Feeding Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23–25日）看卡牌稳定对位输送实机运行——带上你最容易跑偏的那批卡，我们现场给你跑直。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See straight card feeding at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring the batch that skews most for you and we'll run it straight on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-stacking-misaligned",
    date: "2026-09-16",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "卡牌收料堆不齐？卡牌线堆叠歪斜错层怎么调",
      en: "Cards Stack Up Crooked? Fixing Misaligned Card Stacking",
    },
    excerpt: {
      zh: "装盒前最后一关——卡牌堆出来像歪墙，高低不平、前后错层。本文拆5类成因与调机法，让每叠卡都齐得像刀切。",
      en: "The last checkpoint before boxing: the card stack comes out like a crooked wall — uneven, layered front to back. This post breaks down five causes and fixes so every stack comes out knife-cut clean.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "有个客户微信甩来一张照片：装盒前的卡堆像被风吹歪的墙，前探后缩、高高低低。他说「前面走卡都好好的，怎么到收料就乱了」。其实收料堆叠是最容易被轻视的一关——卡牌一路都对得整整齐齐，最后在这摔一跤，整盒出来还是歪的。下面是 CHANFER 工程师处理堆叠错层最常遇到的五类成因和调机方法。",
          en: "A customer once sent a photo over WeChat: the card stack before boxing looked like a wall blown sideways — leaning front and back, high and low. He said, \"feeding was fine all the way, why does it fall apart at collection?\" Collection stacking is the most underestimated step — cards stay perfectly aligned the whole line, then trip at the last gate and the whole box comes out crooked. Here are the five causes our engineers hit most, and how to tune them out.",
        },
      },
      { type: "h2", text: { zh: "1. 收料节拍不对，卡叠没落稳就来了下一张", en: "1. Timing Off — Next Card Lands Before the Stack Settles" } },
      {
        type: "li",
        text: {
          zh: "收料皮带或堆叠爪的节拍和来卡速度没对上，前一张还没落稳，后一张已经拍上来，自然错层。处理：把收料节拍调到「一张落稳再接下一张」，用单卡点动先对节拍，再提速；堆叠爪行程按卡厚留余量，别卡太紧。",
          en: "When the collection belt or stacking lug is out of sync with the incoming cards, the next card lands before the previous one settles — instant layering. Fix: tune collection so one card fully settles before the next arrives; step through single cards to match timing, then speed up. Leave slack in the lug stroke for card thickness — don't clamp it tight.",
        },
      },
      { type: "h2", text: { zh: "2. 收料台高度 / 挡板位置偏了", en: "2. Collection Tray Height or Stop Misplaced" } },
      {
        type: "li",
        text: {
          zh: "收料台太高卡堆前倾、太低卡撞挡板弹起；侧挡板不正，叠出来一头宽一头窄。处理：收料台面调到「卡堆顶刚好齐爪口」，侧挡用卡规对称调，留一张卡厚加 0.5 mm，调完点数看叠面是否方正。",
          en: "Tray too high and the stack leans forward; too low and cards bounce off the stop. An off-center side stop makes the stack lopsided. Fix: set the tray so the stack top meets the lug level, center the side stops with a card gauge at one card thickness plus 0.5 mm, then count and check the stack face is square.",
        },
      },
      { type: "h2", text: { zh: "3. 静电让卡粘连，叠不平整", en: "3. Static Clings Cards Together" } },
      {
        type: "li",
        text: {
          zh: "干燥环境卡牌带静电，两张黏一起落下就鼓包错层。处理：在收料前加离子风棒除静电，车间湿度提到 50–60% RH；塑料膜卡比纸卡更易带电，重点盯。",
          en: "In dry air the cards pick up static and two stick together, landing as a bump and a layer shift. Fix: add an ion bar before collection and lift shop humidity to 50–60% RH; plastic-film cards charge far more than paper, so watch those closely.",
        },
      },
      { type: "h2", text: { zh: "4. 分堆 / 计数信号延迟", en: "4. Batch Count or Index Signal Delayed" } },
      {
        type: "li",
        text: {
          zh: "分堆的光纤或计数信号慢半拍，该换垛时没换，叠数变了、层也错。处理：用对射光纤复核计数点，信号延迟的超调伺服或换高响应传感器；每批换垛后抽测叠数是否准。",
          en: "When the batching fiber or count signal lags a beat, the stack doesn't change over when it should — wrong count, wrong layer. Fix: verify the count point with a through-beam sensor, retune any servo lag or swap to a faster sensor, and sample stack counts after each changeover.",
        },
      },
      { type: "h2", text: { zh: "5. 卡张翘曲 / 厚度不均", en: "5. Warped or Mixed-Thickness Cards" } },
      {
        type: "li",
        text: {
          zh: "同一批卡厚薄不一或局部翘曲，叠起来天然歪。处理：到料抽测厚度公差，超差的挑出来；料仓加整平轮，收料前先压平再叠，翘曲卡别混进同垛。",
          en: "Cards of uneven thickness or local warping in one batch stack crooked by nature. Fix: sample thickness tolerance on incoming stock and pull the outliers; add a flattening roller at the hopper so cards are flat before they stack, and never mix warped cards into one stack.",
        },
      },
      { type: "h2", text: { zh: "为什么卡牌线要盯收料堆叠", en: "Why Collection Stacking Matters on a Card Line" } },
      {
        type: "p",
        text: {
          zh: "堆叠是装盒前的最后一关，前面全对、这里歪，整盒还是废的。齐整的卡叠是「整盒对版、开箱即正」的最后一公里，也是收藏者摸到手那一下是否「值这个价」的关键。一句话：能跑快不算本事，落进盒子还是齐的才叫稳。",
          en: "Stacking is the last gate before boxing — get it right everywhere else and still lose it here, and the whole box is scrap. A clean stack is the final mile of a correctly collated, straight-out-of-the-box set, and the moment a collector feels whether it was worth the price. One line: running fast isn't the skill, landing square in the box is.",
        },
      },
      { type: "h2", text: { zh: "现场看齐整收料堆叠", en: "See Clean Card Stacking Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23–25日）看卡牌齐整收料堆叠实机运行——带上你最容易堆歪的那批卡，我们现场给你堆齐。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See clean card stacking at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring the batch that stacks crooked for you and we'll square it on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-seal-shrink-defects",
    date: "2026-09-21",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "卡牌封口开口、热收缩发皱起雾？封口与收缩不良的 5 个坑",
      en: "Seals Opening, Shrink Wrinkled or Hazy? 5 Pitfalls of Card Sealing & Shrinking",
    },
    excerpt: {
      zh: "封口不严、热收缩后起皱泛白、缩不紧——卡牌到消费者手里那一下全露馅。拆 5 类成因和调机法，让每包都平整贴身。",
      en: "Loose seals, wrinkled or hazy shrink, sloppy fit — it all shows the moment the customer holds the pack. Five causes and fixes so every pack comes out flat and snug.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "有个做 TCG 的客户发来一段视频：开封那一下，封口「啪」地弹开，卡牌直接从膜里滑出来。他说「机器跑得好好的，怎么到消费者手里就开了」。其实封口和收缩是卡牌包装里最『看运气』的一关——线跑得再顺，封不严、缩不紧，到玩家手里全露馅。下面是 CHANFER 工程师处理封口/收缩不良最常遇到的五类坑。",
          en: "A TCG customer sent a video: on opening, the seal popped with a snap and the card slid right out of the film. He said, \"the machine runs fine, why does it open in the customer's hands?\" Sealing and shrinking are the most \"luck-based\" step in card packaging — the line can run perfectly, but a loose seal or sloppy shrink gives it all away in the player's hands. Here are the five pitfalls our engineers hit most.",
        },
      },
      { type: "h2", text: { zh: "1. 封口温度没调对 / 温度不均", en: "1. Seal Temperature Wrong or Uneven" } },
      {
        type: "li",
        text: {
          zh: "封口刀温度低了粘不牢、高了把膜烫穿或起焦；连续跑一阵刀温掉下来，后封的先开口。处理：按膜的熔点设基准温（POF 约 140–170℃），首件封完做「撕拉测试」——能撕出膜丝才叫封牢；连续生产每 2 小时抽测一次封口强度，刀温漂移就补。",
          en: "Too low and the seal won't stick; too high and you burn through the film or scorch it. Run a while and the blade cools, so later seals open first. Fix: set the base temp by film melt point (POF ~140–170°C), then do a \"tear test\" on the first seal — if film fibers tear, it's sealed; re-check seal strength every two hours in production and top up any blade-temp drift.",
        },
      },
      { type: "h2", text: { zh: "2. 封刀压力 / 封口时间不对", en: "2. Blade Pressure or Dwell Off" } },
      {
        type: "li",
        text: {
          zh: "压力不够封线虚、有气泡；压力太大把卡压出印、膜被挤薄。封口时间（dwell）太短粘不牢、太长烫穿。处理：压力调到「封线连续、卡面无压痕」；用点动单封调 dwell，封线宽度按膜厚留 1.5–2 mm，调完数 30 张看有没有虚封。",
          en: "Too little pressure gives a dotted, bubbly seal; too much presses a mark into the card and thins the film. Dwell too short won't stick, too long burns through. Fix: set pressure so the seal line is continuous with no card mark; step single seals to tune dwell, keep seal width 1.5–2 mm over film thickness, then run 30 cards and check for weak seals.",
        },
      },
      { type: "h2", text: { zh: "3. 膜张力不对，热收缩起皱", en: "3. Film Tension Wrong — Wrinkles on Shrink" } },
      {
        type: "li",
        text: {
          zh: "包膜太松，进炉一缩就起褶；太紧，卡角被勒出白印、甚至压伤卡。处理：包膜张力调到「轻贴卡面、手推略有回弹」；对折边/中封处的余量留 2–3 mm，跑废膜先试缩，不起皱再上卡。",
          en: "Film too loose wrinkles the moment it shrinks; too tight leaves white crease marks on card corners or even dents them. Fix: set wrap tension so the film just kisses the card with a little spring-back; leave 2–3 mm slack at the fin/seal, run scrap film to test the shrink, and only load cards once it's wrinkle-free.",
        },
      },
      { type: "h2", text: { zh: "4. 收缩炉温 / 风速不匹配", en: "4. Shrink Tunnel Temp or Airflow Off" } },
      {
        type: "li",
        text: {
          zh: "炉温低了缩不紧、膜松垮；太高膜发雾、烫缩变形。风速乱吹，膜面被吹出波纹。处理：炉温按膜设定（POF 约 130–160℃），风速从低往高调，对着卡面吹、不直吹膜面；首件出炉看平整度和雾度，再微调。",
          en: "Too low and the film stays loose; too high and it hazes or warps. Random airflow blows ripples into the surface. Fix: set tunnel temp by film (POF ~130–160°C), raise airflow from low, aim at the card not straight at the film; check the first piece for flatness and haze, then fine-tune.",
        },
      },
      { type: "h2", text: { zh: "5. 膜选错了（材质 / 厚度）", en: "5. Wrong Film (Material / Thickness)" } },
      {
        type: "li",
        text: {
          zh: "薄卡用厚膜缩不紧、厚卡用薄膜撑破；POF 和 PE 收缩率不同，混用就皱。处理：按卡厚选膜——薄卡用 15–19 μm POF，厚卡用 19–25 μm；同一批卡固定一种膜，换膜先进废卡试三张再量产。",
          en: "Thin cards with thick film won't shrink tight; thick cards with thin film burst it. POF and PE shrink differently, so mixing wrinkles. Fix: pick film by card thickness — 15–19 μm POF for thin cards, 19–25 μm for thick; stick to one film per batch, and run three scrap cards after any film change before mass production.",
        },
      },
      { type: "h2", text: { zh: "为什么封口和收缩值得盯", en: "Why Sealing & Shrinking Are Worth Watching" } },
      {
        type: "p",
        text: {
          zh: "封口和收缩是卡牌到玩家手里的「第一印象」——封不严、缩不紧、起白雾，收藏者一眼就觉得「廉价」。一句话：能封上不算本事，封得牢、缩得平、摸上去像量身定做，才算这条线稳。",
          en: "Sealing and shrinking are the card's first impression in the player's hands — a loose seal, sloppy shrink or haze reads as \"cheap\" instantly. One line: sealing it shut isn't the skill; sealing tight, shrinking flat and feeling tailor-made is what makes the line stable.",
        },
      },
      { type: "h2", text: { zh: "现场看齐平封口与收缩", en: "See Tight Seals & Flat Shrink Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。来 PRINTING United Expo 2026（N7411 展位，拉斯维加斯，9月23–25日）看封口牢、收缩平的实机运行——带上你最容易开口/起皱的那批卡，我们现场给你封齐缩平。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. See tight seals and flat shrink at PRINTING United Expo 2026, Booth N7411, Las Vegas, Sept 23–25 — bring the batch that opens or wrinkles for you and we'll seal and shrink it right on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    faqs: [
      {
        question: {
          zh: "封口为什么一开包就弹开？",
          en: "Why does the seal pop open as soon as the pack is opened?",
        },
        answer: {
          zh: "多半是封口温度、压力或封口时间（dwell）没调对：温度低了粘不牢、压力不够封线虚、dwell 太短粘不紧；连续生产刀温漂移，后封的先开口。按膜的熔点设基准温（POF 约 140–170℃），首件做撕拉测试，能撕出膜丝才算封牢，并每 2 小时抽测一次封口强度。",
          en: "Usually the seal temperature, pressure or dwell is off: too low a temp will not stick, too little pressure gives a dotted seal, too short a dwell will not hold; in long runs the blade cools and later seals open first. Set the base temp by film melt point (POF about 140–170°C), do a tear test on the first seal — if film fibers tear it is sealed — and re-check seal strength every two hours.",
        },
      },
      {
        question: {
          zh: "热收缩后膜起皱、发雾怎么办？",
          en: "Why does the shrink film wrinkle or turn hazy?",
        },
        answer: {
          zh: "起皱多因包膜张力太松或收缩炉温、风速不匹配；发雾是炉温过高把膜烫雾了。包膜张力调到轻贴卡面、手推略有回弹；炉温按膜设定（POF 约 130–160℃），风速从低往高调、对着卡面吹而不直吹膜面，首件看平整度和雾度再微调。",
          en: "Wrinkles come from loose wrap tension or a tunnel temp or airflow mismatch; haze is the tunnel running too hot. Set wrap tension so the film just kisses the card with slight spring-back; set tunnel temp by film (POF about 130–160°C), raise airflow from low and aim at the card not straight at the film, then fine-tune on the first piece.",
        },
      },
      {
        question: {
          zh: "卡牌封口该选多厚的膜？",
          en: "What film thickness should I use for card sealing?",
        },
        answer: {
          zh: "按卡厚选：薄卡用 15–19 μm POF，厚卡用 19–25 μm；同一批卡固定一种膜，POF 与 PE 收缩率不同，混用易皱。换膜先进废卡试三张再量产。",
          en: "Pick by card thickness: 15–19 μm POF for thin cards, 19–25 μm for thick. Stick to one film per batch — POF and PE shrink differently, so mixing wrinkles. After any film change, run three scrap cards before mass production.",
        },
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-count-wrong",
    date: "2026-09-22",
    category: { zh: "技术干货", en: "Troubleshooting" },
    title: {
      zh: "一包多张、少一张？卡牌计数不准的 5 个坑",
      en: "Too Many or One Short? 5 Pitfalls of Wrong Card Counting",
    },
    excerpt: {
      zh: "客户拆包发现多一张少一张，成本白亏、口碑还掉。拆 5 类计数翻车的原因和调机法，让每包张数都准。",
      en: "Customers open a pack and find one too many or one short — lost margin and lost trust. Five causes of counting failures and how to fix them so every pack is exact.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "有个客户返了一批货：整箱里总有那么几包，多一张或少一张。他说「机器不是显示 10 张吗」。显示 10 张和实际 10 张，中间差的就是计数这道关。卡牌包装里计数看着简单，真到量产，光电糊了、双张没识别、节拍没跟上，错张就来了——少一张客户投诉，多一张你亏膜又亏卡。下面是 CHANFER 工程师处理计数不准最常遇的五类坑。",
          en: "A customer returned a batch: in almost every box a few packs had one too many or one short. He said, \"the machine shows 10, doesn't it?\" Showing 10 and actually having 10 are two different things, and counting is the gap between them. In card packaging counting looks trivial, but at volume — a smudged sensor, a missed double, a beat that drifts — miscounts creep in. One short and the customer complains; one extra and you lose film and card. Here are the five pitfalls our engineers hit most.",
        },
      },
      { type: "h2", text: { zh: "1. 集料光电/对射传感器脏了或偏了", en: "1. Counting Sensor Dirty or Misaligned" } },
      {
        type: "li",
        text: {
          zh: "计数靠光电，窗口被膜屑、粉尘糊住，或者位置偏了，数出来的就不是真张数。处理：每班用酒精棉擦一次传感器窗口；对射式调到「卡边触发」而不是「整卡遮挡」，避免卡薄一点就漏计；跑一叠废卡，数显示值对不对得上实际。",
          en: "Counting rides on the photo-eye, and when film dust or debris coats the window — or the sensor drifts out of position — the number stops matching reality. Fix: wipe the sensor window with alcohol pad every shift; set through-beam to trigger on the card edge, not the whole card, so a thinner card doesn't get missed; run a stack of scrap cards and check the displayed count against the real one.",
        },
      },
      { type: "h2", text: { zh: "2. 双张/叠卡没识别出来", en: "2. Double or Overlapped Cards Not Detected" } },
      {
        type: "li",
        text: {
          zh: "两张卡叠着喂进来，机器当一张数，一包就多一张。处理：喂料区加双张检测（超声波或厚度式），叠卡直接剔出；分卡轮间隙按卡厚调，保证一次只过一张；前面喂料堆保持疏松，不压卡。",
          en: "Two cards fed overlapped count as one, and the pack ends up with an extra. Fix: add double-sheet detection at the feeder (ultrasonic or thickness-based) to reject overlapped cards; set the separator-wheel gap to card thickness so only one passes at a time; keep the feed stack loose so cards aren't pressed together.",
        },
      },
      { type: "h2", text: { zh: "3. 收料节拍和主机没同步", en: "3. Collection Beat Out of Sync with the Line" } },
      {
        type: "li",
        text: {
          zh: "主机快、收料慢，卡过去了没收进、或重复计一次，张数就飘。处理：收料节拍跟主机编码器走，用脉冲数而不是时间点计时；调完数 50 包，看误差是不是稳定在零附近，别只看一两包。",
          en: "Line fast, collector slow — a card slips past uncounted or gets counted twice, and the count drifts. Fix: drive the collector off the line encoder, counting pulses not clock time; after tuning, count 50 packs and check the error sits near zero, not just one or two.",
        },
      },
      { type: "h2", text: { zh: "4. 膜张力抖，光电误判", en: "4. Film Flutter Trips the Sensor" } },
      {
        type: "li",
        text: {
          zh: "走膜一抖，反光一变，传感器误触发，多记一张。处理：稳包膜张力，抖动大的段落加导膜辊；传感器避开高反光区，或换成带背景抑制的漫反射型，只认卡不认膜光。",
          en: "When the film flutters, the reflection shifts and the sensor trips, adding a phantom card. Fix: steady the wrap tension and add film guides where flutter is worst; keep the sensor off high-glare zones, or switch to a diffuse type with background suppression that sees the card, not the film shine.",
        },
      },
      { type: "h2", text: { zh: "5. 计数逻辑没过滤废卡/连包", en: "5. Logic Doesn't Filter Bad or Stuck Packs" } },
      {
        type: "li",
        text: {
          zh: "偶尔卡歪、两张贴太近，计数逻辑没排除，就当两张或一张。处理：定义「有效卡」判定（尺寸 + 间隔），相邻两张间隔小于阈值判为一张；跑一批统计误判率，目标压到千分之一以下再量产。",
          en: "A card tilts or two sit too close and the logic counts them as two — or one. Fix: define a \"valid card\" by size plus spacing, and treat two pieces closer than the threshold as one; run a batch and measure the misjudge rate, only scaling up once it's below one in a thousand.",
        },
      },
      { type: "h2", text: { zh: "为什么计数值得盯", en: "Why Counting Is Worth Watching" } },
      {
        type: "p",
        text: {
          zh: "计数准不准，直接关系成本和口碑——少一张是客诉，多一张是实打实的亏。一句话：显示数对不算数，实际每包张数都对上，这条线才算稳。",
          en: "Counting accuracy hits both cost and reputation — one short is a complaint, one extra is real loss. One line: a correct display isn't enough; every pack actually matching its count is what makes the line stable.",
        },
      },
      { type: "h2", text: { zh: "展会现场看齐准计数", en: "See Accurate Counting Live" } },
      {
        type: "p",
        text: {
          zh: "以上正是 CHANFER 每条卡牌线出厂前工程师必查的项目。明天 PRINTING United Expo 2026 就开了（N7411 展位，拉斯维加斯，9月23–25日），带上一包你最容易数错的卡，我们现场给你数准、封齐、缩平。",
          en: "These are the exact checks our engineers run on every CHANFER card line before it ships. PRINTING United Expo 2026 opens tomorrow — Booth N7411, Las Vegas, Sept 23–25 — bring a pack that gives you counting trouble and we'll get the count right, seal tight and shrink flat on the spot.",
        },
      },
      { type: "cta", text: { zh: "预约9.23-25美国展会", en: "Book Sept 23-25 US Show" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    faqs: [
      {
        question: {
          zh: "机器显示 10 张，为什么实际不对？",
          en: "The machine shows 10 cards — why is the actual count wrong?",
        },
        answer: {
          zh: "显示值和实际张数是两回事，计数那道关才是关键。常见原因：集料光电传感器被膜屑糊住或偏位、双张或叠卡没识别、收料节拍和主机不同步、膜抖动误触发、计数逻辑没过滤废卡连包。逐项排查即可。",
          en: "The displayed count and the actual count are different things — the counting step is the gap. Common causes: the counting photo-eye coated with film dust or misaligned, overlapped or double cards not detected, collector beat out of sync with the line, film flutter tripping the sensor, or logic not filtering bad or stuck packs. Check them one by one.",
        },
      },
      {
        question: {
          zh: "一包多一张或少一张怎么查？",
          en: "A pack has one too many or one short — how do I troubleshoot?",
        },
        answer: {
          zh: "先擦传感器窗口、把对射式调到卡边触发；喂料区加双张检测剔出叠卡；收料节拍改跟主机编码器走；稳包膜张力减少抖动；定义有效卡判定（尺寸加间隔）过滤连包。调完数 50 包看误差是否稳定在零附近。",
          en: "First wipe the sensor window and set through-beam to trigger on the card edge; add double-sheet detection at the feeder to reject overlapped cards; drive the collector off the line encoder; steady the wrap tension to cut flutter; define a valid card by size plus spacing to filter stuck packs. After tuning, count 50 packs and check the error sits near zero.",
        },
      },
      {
        question: {
          zh: "怎么把计数误差降到最低？",
          en: "How do I push counting error to the minimum?",
        },
        answer: {
          zh: "用脉冲（编码器）计数而非时间点计时，保证收料与主机同步；跑一批统计误判率，目标压到千分之一以下再量产；每班清洁传感器、双张检测常开。",
          en: "Count pulses off the encoder rather than clock time, so collection stays in sync with the line; measure the misjudge rate over a batch and only scale up once it is below one in a thousand; clean the sensor every shift and keep double-sheet detection on.",
        },
      },
    ],
    relatedLinks: [
      { href: "/machines", label: { zh: "全部设备型号", en: "All Machines" } },
      { href: "/solutions", label: { zh: "卡牌包装方案", en: "Card Packaging Solutions" } },
      { href: "/faq", label: { zh: "常见问题", en: "FAQ" } },
    ],
  },

  {
    slug: "card-packaging-expo-faq",
    date: "2026-09-23",
    category: { zh: "展会现场", en: "At the Show" },
    title: {
      zh: "开展第一天，客户问得最多的 5 个卡牌包装问题",
      en: "Day One at PRINTING United: 5 Card-Packaging Questions We Hear Most",
    },
    excerpt: {
      zh: "展会现场站了一天，发现大家卡牌包装的痛点出奇地像。把这 5 个被问得最多的问题和工程师的回法记下来，没到现场的也能照着自查。",
      en: "A full day on the booth and the card-packaging pain points sound surprisingly alike. Here are the five questions asked most, with how our engineers answer them — useful even if you couldn't make it.",
    },
    body: [
      {
        type: "p",
        text: {
          zh: "今天 PRINTING United 开展第一天，N7411 展位前面从早站到晚。聊下来发现，不管是做 TCG、做 Pok mon 还是做闪卡礼盒的，问的卡牌包装问题居然高度重合。趁记忆还热，把这 5 个被问得最多的问题和工程师的回法记下来，没到现场的你也能照着自查。",
          en: "PRINTING United opened today and Booth N7411 stayed busy from open to close. Talking with everyone — TCG, Pokémon, foil-collection boxes — the card-packaging questions overlapped almost perfectly. While it's fresh, here are the five asked most and how our engineers answer them. If you couldn't make it, use this as a self-check.",
        },
      },
      { type: "h2", text: { zh: "1. 「我的卡厚薄不一，一条线能通吃吗？」", en: "1. \"My cards vary in thickness — can one line handle them?\"" } },
      {
        type: "li",
        text: {
          zh: "能，但前提是分卡和飞达要可调。卡厚薄差一两丝，普通分卡轮就会叠卡或漏卡。处理：分卡轮间隙按最厚那张卡调，飞达用厚度自适应型；同一批料先跑 20 张看是否连张。别指望「同一台机器」就自动兼容所有卡，调机这一步省不掉。",
          en: "Usually yes, if the separator and feeder are adjustable. A one- or two-thou difference makes a fixed separator wheel double- or miss-feed. Fix: set the separator gap to the thickest card, use a thickness-adaptive feeder, and run 20 cards first to check for sticking. Don't expect \"the same machine\" to auto-fit every card — the tuning step is non-negotiable.",
        },
      },
      { type: "h2", text: { zh: "2. 「换一包 5 张、10 张、12 张要折腾多久？」", en: "2. \"How long to switch between 5-, 10- and 12-card packs?\"" } },
      {
        type: "li",
        text: {
          zh: "换规格最怕的是「从头调一遍」。处理：把每套常用规格存成参数配方，换型只调计数设定和收料斗分隔；飞达、封切位置基本不动。熟练工换一次约 10 分钟，新手照配方也别超 20 分钟。建议先把你最常用的 3 套规格存好，别每次现想。",
          en: "The dread is \"tune it all over again.\" Fix: save each common spec as a recipe — switching only changes the count setting and the collection divider, while feeder and seal positions stay put. A skilled operator switches in ~10 min; a new hand on a recipe stays under 20. Save your three most-used specs first; don't reinvent them each time.",
        },
      },
      { type: "h2", text: { zh: "3. 「膜缩完发皱、封口还弹开，怎么办？」", en: "3. \"Shrink comes out wrinkled and the seal still pops — why?\"" } },
      {
        type: "li",
        text: {
          zh: "这俩其实是连着的：封口没压实，收缩一拉就崩。处理：封口温度和时间先按膜厂给的窗口试，别凭感觉拧；收缩炉温别一下拉太高，让膜慢慢贴上去而不是「啪」地缩。我们在展会现场就用你带的样卡当场调给你看，比嘴上说清楚。",
          en: "These two are linked: a weak seal bursts the moment shrink tension pulls. Fix: set seal temperature and dwell to the film maker's window, not by feel; don't crank the shrink tunnel hot — let the film settle onto the card instead of snapping. At the booth we tune it live on your sample card, which beats any explanation.",
        },
      },
      { type: "h2", text: { zh: "4. 「计数老错，多一张少一张」", en: "4. \"The count keeps drifting — one too many or one short\"" } },
      {
        type: "li",
        text: {
          zh: "这是返货的头号原因。处理：喂料加双张检测（超声波或厚度式），叠卡直接剔；收料节拍跟主机编码器走，用脉冲数计时而不是拍脑袋估。跑 50 包看误差是不是稳定在零附近，只盯一两包会骗自己。",
          en: "This is the #1 cause of returns. Fix: add double-sheet detection at the feeder (ultrasonic or thickness) to reject overlapped cards; drive the collector off the line encoder, counting pulses not guesses; run 50 packs and check the error sits near zero — watching one or two packs lies to you.",
        },
      },
      { type: "h2", text: { zh: "5. 「我要快，但又不能磨花卡面」", en: "5. \"I want speed, but I can't scratch the card face\"" } },
      {
        type: "li",
        text: {
          zh: "速度和伤卡常常打架。处理：走卡段用软接触皮带（比如进口 PU 带），转弯处加导向不硬挤；高速段先把张力调稳再往上加。闪卡、烫金这类娇贵面，宁可降 10% 速度保品相，也别赌赌看。",
          en: "Speed and surface damage usually fight. Fix: use soft-contact belts on the transport (e.g. imported PU), add guides at turns instead of forcing cards, and stabilize tension before pushing speed up. For foil or hot-stamp faces, take 10% off the speed to protect the look rather than gambling on it.",
        },
      },
      { type: "h2", text: { zh: "没到现场？照这 5 条先自查", en: "Couldn't Make It? Self-Check These 5" } },
      {
        type: "p",
        text: {
          zh: "上面 5 个，其实覆盖了卡牌包装 80% 的返工。你的线要是也中了一两条，不用等展会，先照着调一轮。当然，隔着屏幕调不如当面看——今天开展（9月23–25日，拉斯维加斯，N7411），带上你最容易出问题的那叠卡，我们现场给你跑通、封齐、缩平。",
          en: "Those five cover roughly 80% of card-packaging rework. If your line hits one or two, don't wait for a show — tune a round now. That said, tuning over a screen beats seeing it live: the show is on now (Sept 23–25, Las Vegas, N7411). Bring the stack that gives you the most trouble and we'll run it, seal it and shrink it flat on the spot.",
        },
      },
      { type: "cta", text: { zh: "现场 N7411 展位见", en: "Meet Us at Booth N7411" }, href: "https://chanfercard.com/book-a-demo.html" },
    ],
    faqs: [
      {
        question: {
          zh: "我的卡厚薄不一，一条线能通吃吗？",
          en: "My cards vary in thickness — can one line handle them?",
        },
        answer: {
          zh: "能，但前提是分卡和飞达要可调。卡厚薄差一两丝，普通分卡轮就会叠卡或漏卡。把分卡轮间隙按最厚那张卡调，飞达用厚度自适应型；同一批料先跑 20 张看是否连张。调机这一步省不掉。",
          en: "Usually yes, if the separator and feeder are adjustable. A one or two thou difference makes a fixed separator wheel double- or miss-feed. Set the separator gap to the thickest card, use a thickness-adaptive feeder, and run 20 cards first to check for sticking. The tuning step is non-negotiable.",
        },
      },
      {
        question: {
          zh: "换一包 5 张、10 张、12 张要折腾多久？",
          en: "How long to switch between 5-, 10- and 12-card packs?",
        },
        answer: {
          zh: "换规格最怕从头调一遍。把每套常用规格存成参数配方，换型只调计数设定和收料斗分隔；飞达、封切位置基本不动。熟练工换一次约 10 分钟，新手照配方也别超 20 分钟。建议先把最常用的 3 套规格存好。",
          en: "The dread is tuning it all over again. Save each common spec as a recipe — switching only changes the count setting and the collection divider, while feeder and seal positions stay put. A skilled operator switches in about 10 minutes; a new hand on a recipe stays under 20. Save your three most-used specs first.",
        },
      },
      {
        question: {
          zh: "膜缩完发皱、封口还弹开，怎么办？",
          en: "Shrink comes out wrinkled and the seal still pops — why?",
        },
        answer: {
          zh: "这俩其实是连着的：封口没压实，收缩一拉就崩。封口温度和时间先按膜厂给的窗口试，别凭感觉拧；收缩炉温别一下拉太高，让膜慢慢贴上去而不是啪地缩。展会现场用你带的样卡当场调给你看更清楚。",
          en: "These two are linked: a weak seal bursts the moment shrink tension pulls. Set seal temperature and dwell to the film maker's window, not by feel; do not crank the shrink tunnel hot — let the film settle onto the card instead of snapping. At the booth we tune it live on your sample card.",
        },
      },
      {
        question: {
          zh: "计数老错，多一张少一张？",
          en: "The count keeps drifting — one too many or one short?",
        },
        answer: {
          zh: "这是返货的头号原因。喂料加双张检测（超声波或厚度式），叠卡直接剔；收料节拍跟主机编码器走，用脉冲数计时而不是拍脑袋估。跑 50 包看误差是不是稳定在零附近，只盯一两包会骗自己。",
          en: "This is the number one cause of returns. Add double-sheet detection at the feeder (ultrasonic or thickness) to reject overlapped cards; drive the collector off the line encoder, counting pulses not guesses; run 50 packs and check the error sits near zero — watching one or two packs lies to you.",
        },
      },
      {
        question: {
          zh: "我要快，但又不能磨花卡面？",
          en: "I want speed, but I can't scratch the card face?",
        },
        answer: {
          zh: "速度和伤卡常常打架。走卡段用软接触皮带（比如进口 PU 带），转弯处加导向不硬挤；高速段先把张力调稳再往上加。闪卡、烫金这类娇贵面，宁可降 10% 速度保品相，也别赌赌看。",
          en: "Speed and surface damage usually fight. Use soft-contact belts on the transport (e.g. imported PU), add guides at turns instead of forcing cards, and stabilize tension before pushing speed up. For foil or hot-stamp faces, take 10% off the speed to protect the look rather than gambling on it.",
        },
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

// redeploy trigger for post4 (card-count-off-metering) — forces Cloudflare rebuild
// force-redeploy: CTA text update
