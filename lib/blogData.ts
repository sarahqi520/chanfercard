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
        href: "/book-a-demo.html",
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
        text: { zh: "预约现场演示", en: "Book a Demo at the Show" },
        href: "/contact",
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
        text: { zh: "预约现场演示", en: "Book a Demo at the Show" },
        href: "/book-a-demo.html",
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
        text: { zh: "预约现场演示", en: "Book a Demo at the Show" },
        href: "/book-a-demo.html",
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
          zh: "在卡牌包装线上，盒子里数量对，才算"对"。少一张、多一张，整盒就过不了质检——更糟的是直接发到会数的收藏者手上。卡牌线上的计数和计量误差，大多能归结到几个反复出现的成因。下面是 CHANFER 工程师排查和调修的方法。",
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
          zh: "收藏卡盒是按"精确张数"卖的。一盒 60 张变 59 或 61，就是退货、差评、信任受损。准确且可重复的计数，是高端包装和报废批次的分界线——也是买家最先注意到的细节之一。",
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
        text: { zh: "预约现场演示", en: "Book a Demo at the Show" },
        href: "/book-a-demo.html",
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
