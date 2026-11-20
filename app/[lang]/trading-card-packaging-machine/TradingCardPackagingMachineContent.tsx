import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";

type QA = { q: string; a: string };

type Copy = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  lead: string;
  whatIs: string;
  whatIsBody: string;
  methodsTitle: string;
  methodsBody: string;
  methodNames: string[];
  methodDesc: string[];
  methodSpeed: string[];
  lineTitle: string;
  lineBody: string;
  lineSteps: string[];
  qualityTitle: string;
  qualityBody: string;
  faqTitle: string;
  faqs: QA[];
  whyTitle: string;
  whyBody: string;
  chooseTitle: string;
  chooseBody: string;
  chooseRows: { need: string; recommended: string }[];
  mistakesTitle: string;
  mistakes: string[];
  trialTitle: string;
  trialSteps: string[];
  supportTitle: string;
  supportBody: string;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

const en: Copy = {
  seoTitle: "Trading Card Packaging Machine | Automated TCG Lines | CHANFER",
  seoDescription:
    "Trading card packaging machine for TCG, game cards and collectibles: 6 packaging methods, AI vision inspection, 0-error US project. Manufacturer direct — ISO9001, CE, 100+ patents.",
  h1: "Trading Card Packaging Machine",
  eyebrow: "Automated packaging lines for TCG & game cards",
  lead: "A trading card packaging machine automates feeding, counting, wrapping, cartoning and palletizing of trading cards. CHANFER builds the full line — from a single card feeder to a turnkey trading card packaging system — for booster packs, decks and collectible cards.",
  whatIs: "What is a trading card packaging machine?",
  whatIsBody:
    "A trading card packaging machine is a production line that takes loose cards and delivers retail-ready packs. It combines a friction feeder for counting, a wrapping or sealing unit, cartoning, case packing and palletizing. CHANFER supplies six packaging methods so you can match the machine to the card format: candy / flow wrap, self-adhesive strip, four-side seal, banding, heat shrink and three-dimensional wrap.",
  methodsTitle: "Six packaging methods in one trading card packaging line",
  methodsBody:
    "Choose the format that fits your product. Every method can run as a standalone machine or as part of an integrated line with card feeding and AI inspection.",
  methodNames: [
    "Candy / flow wrap",
    "Self-adhesive strip",
    "Four-side seal",
    "Banding",
    "Heat shrink",
    "Three-dimensional wrap",
  ],
  methodDesc: [
    "Pillow-style flow wrapping for TCG booster packs and collectible sleeves.",
    "Resealable strip bags for premium cards that need repeated opening.",
    "All-four-edges sealing for a full-pattern, high-value card presentation.",
    "Eco-friendly paper band bundling for board game decks and card sets.",
    "Tight shrink film with 360 degree product visibility and protection.",
    "Rigid box-style film wrap for high-end collector and gift products.",
  ],
  methodSpeed: ["20-220 packs/min", "20-80 packs/min", "50-150 packs/min", "5-20 packs/min", "20-100 packs/min", "40-80 packs/min"],
  lineTitle: "From card feeding to palletizing",
  lineBody:
    "One supplier covers the whole trading card packaging line. Machines share recipes and controls, so changeovers are fast and every pack is inspected before it leaves the line.",
  lineSteps: [
    "Friction feeder counts the cards",
    "Packaging machine wraps or seals the pack",
    "AI vision inspection checks every card",
    "Cartoning and case packing",
    "Unpacking and H-type carton sealing",
    "Collaborative robot palletizes the cases",
  ],
  qualityTitle: "Zero-error trading card packaging",
  qualityBody:
    "High-value cards allow no mistakes. CHANFER combines card dispensing, packaging and vision inspection in one controlled line.",
  faqTitle: "Trading card packaging machine — frequently asked questions",
  faqs: [
    {
      q: "How much does a trading card packaging machine cost?",
      a: "Price depends on the packaging method, line speed and level of automation. Send us your card size, pack format and target output and we will recommend a configuration and quote. Published lead times are 4-6 weeks for a standard machine, 6-8 weeks for a complete line and 8-12 weeks for custom engineering.",
    },
    {
      q: "Which packaging method is right for trading cards?",
      a: "Candy / flow wrap is the most common for TCG booster packs; four-side seal is preferred for high-value collectible cards; banding suits board game decks; heat shrink gives full visibility; three-dimensional wrap is used for premium gift sets. We can run your samples on all six methods before you decide.",
    },
    {
      q: "Can one machine handle different card sizes?",
      a: "Yes. Recipes are stored in the control system and changed in minutes, so a single trading card packaging machine can run multiple card sizes and pack configurations.",
    },
    {
      q: "How does the machine prevent wrong or missing cards?",
      a: "AI vision inspection runs at 400+ sheets/min and catches wrong, missing and out-of-order cards. For a US high-value TCG card project, CHANFER's card dispensing, packaging and vision inspection system reduced packaging errors to zero.",
    },
    {
      q: "Are you the manufacturer or a trading company?",
      a: "CHANFER designs and builds its own machines. Guangzhou Chanfer Intelligent Equipment Co., Ltd. handles sales and export; it is a subsidiary of Dongguan Chanfer Intelligent Packing Technology Co., Ltd., which handles R&D and production. Both are independent legal entities within the same group.",
    },
    {
      q: "What warranty and technical support are included?",
      a: "Every machine carries a 12-month warranty; enquiries and after-sales requests are answered within 24 hours; lifetime free remote technical support is provided, with paid on-site service available.",
    },
    {
      q: "Can you package our cards for us before we buy a machine?",
      a: "Yes. CHANFER operates a contract-packaging cleanroom with its own equipment and staff. You provide the cards and we produce finished packs — a good way to validate the format before investing in a line.",
    },
    {
      q: "What certifications and patents does CHANFER hold?",
      a: "CHANFER is an ISO9001 / CE certified manufacturer with 100+ patents and 8,000+ customers served, and is recognised as a National High-Tech Enterprise.",
    },
    {
      q: "Can the machine handle thick or oversized collectible cards?",
      a: "Yes. Card feeding and sealing parameters are set in the recipe, and we validate the format by running your actual thick or oversized cards on the equipment before you order. Send the card dimensions and we will confirm a suitable packaging method.",
    },
    {
      q: "Do you support one-of-one and memorabilia card packaging?",
      a: "High-value one-of-one and memorabilia cards are usually packed with four-side seal or three-dimensional wrap, with vision inspection to verify the correct card. CHANFER has supplied dispensing, packaging and inspection systems for high-value collectible card projects; contact us to discuss your format.",
    },
    {
      q: "Can the line pack cards together with an insert or relic?",
      a: "Yes. The line can be configured to place an insert or authenticated item alongside the card and seal it in the same pack. Provide samples of the card and the insert, and we will confirm feeding and sealing on the equipment.",
    },
  ],
  whyTitle: "Why automate trading card packaging?",
  whyBody: "Manual card counting and bagging is slow and error-prone, and a single wrong or missing card in a premium pack can cost far more than the packaging itself. Automating the line removes repetitive manual steps, keeps every pack consistent and gives you a repeatable, auditable process. CHANFER lines combine friction feeding, the packaging method of your choice and AI vision inspection (400+ sheets/min) so high-value cards are checked before they are sealed. Automation also makes output predictable: you can plan a launch or a reprint against a known packs-per-minute rate instead of relying on manual throughput.",
  chooseTitle: "How to choose the right packaging method",
  chooseBody: "Start from the card, not the machine. Four questions narrow the choice: what is the final pack format (booster, deck, sleeve or gift set)? What output do you need per shift? Does the card need repeated reopening or a tamper-evident seal? And will the line run one format or switch between several? The table below maps common needs to a packaging method using the speeds each method can run. Every method works standalone or inside an integrated line with feeding and inspection, and stored recipes let one machine handle multiple card sizes.",
  chooseRows: [
    { need: "High-volume TCG booster packs", recommended: "Candy / flow wrap — 20-220 packs/min" },
    { need: "High-value collectible cards, full-pattern print", recommended: "Four-side seal — 50-150 packs/min" },
    { need: "Board game decks, eco-friendly paper band", recommended: "Banding — 5-20 packs/min" },
    { need: "Maximum product visibility on shelf", recommended: "Heat shrink — 20-100 packs/min" },
    { need: "Premium gift or collector box", recommended: "Three-dimensional wrap — 40-80 packs/min" },
    { need: "Cards opened and resealed repeatedly", recommended: "Self-adhesive strip — 20-80 packs/min" },
  ],
  mistakesTitle: "Common mistakes when specifying a card packaging line",
  mistakes: [
    "Sizing the machine only to today's best-selling SKU, with no recipe capacity for a reprint or a new card size.",
    "Choosing speed before confirming the pack format — a faster machine in the wrong format still produces the wrong pack.",
    "Treating vision inspection as optional on high-value cards; once a mispack ships, the recall can cost more than the inspector.",
    "Ignoring changeover time. A line that takes an hour to switch formats can lose more output than a slower line that switches in minutes.",
    "Buying feeding, wrapping and cartoning from different suppliers with no shared controls, then finding the line cannot be synchronised.",
    "Skipping the sample test. Running your real cards on the actual equipment exposes sleeve fit, static and card-stiffness issues that a specification cannot predict.",
  ],
  trialTitle: "From sample test to acceptance",
  trialSteps: [
    "Send card samples and target output; engineers confirm the format and shortlist the packaging method.",
    "Run your cards on the selected method in CHANFER's in-house contract-packaging cleanroom.",
    "Review finished packs and inspection results together, and adjust the recipe or format if needed.",
    "Run a trial batch at target speed to confirm stable output and changeover time.",
    "Agree acceptance criteria, then move to production with a documented configuration.",
  ],
  supportTitle: "Delivery, warranty and support",
  supportBody: "Delivery is planned against published lead times — 4-6 weeks for a standard machine, 6-8 weeks for a complete line and 8-12 weeks for custom engineering, plus 2-4 weeks for on-site installation and training. Every machine carries a 12-month warranty, enquiries and after-sales requests are answered within 24 hours, and lifetime remote technical support is included. CHANFER designs and builds its own machines in an in-house machining centre with 20 CNC machines, and every newly developed machine is proven in the contract-packaging cleanroom before market release.",
  ctaTitle: "Get a trading card packaging machine quote",
  ctaBody:
    "Send your card samples and target output. Our engineers will recommend the right packaging method and line configuration, and run your cards on the equipment before you order.",
  ctaLabel: "Contact CHANFER",
};

const zh: Copy = {
  ...en,
  seoTitle: "卡牌包装机 | 集换式卡牌自动包装生产线 | CHANFER",
  seoDescription:
    "CHANFER 卡牌包装机：适用于 TCG、游戏卡牌与收藏卡的自动包装生产线，6 种包装方式、AI 视觉检测、美国项目零误差案例，厂家直供。",
  h1: "卡牌包装机（Trading Card Packaging Machine）",
  eyebrow: "TCG 与游戏卡牌自动包装生产线",
  lead: "卡牌包装机用于卡牌的自动发卡、计数、包装、装盒与码垛。CHANFER 提供从单台发卡机到整线交钥匙的完整方案，覆盖补充包、卡组与收藏卡。",
  whatIs: "什么是卡牌包装机？",
  whatIsBody:
    "卡牌包装机是把散卡变成可零售包装成品的生产线，由摩擦式发卡计数、包装封口、装盒、装箱与码垛组成。CHANFER 提供 6 种包装方式，可按卡牌规格选配：糖果枕式、自粘条、四边封、束带、热收缩与三维包装。",
  methodsTitle: "一条卡牌包装线，6 种包装方式",
  methodsBody: "按产品选择包装形式，每种方式既可单机运行，也可接入带发卡与 AI 检测的整线。",
  lineTitle: "从发卡到码垛",
  lineBody: "一家供应商覆盖整条卡牌包装线，设备共用配方与控制系统，换型快，每一包在出厂前都经过检测。",
  qualityTitle: "高价值卡牌的零误差包装",
  qualityBody: "高价值卡牌不容许出错。CHANFER 把发卡、包装与视觉检测整合在一条可控产线上。",
  faqTitle: "卡牌包装机常见问题",
  ctaTitle: "获取卡牌包装机报价",
  ctaBody: "寄来卡牌样品与目标产能，工程师会推荐合适的包装方式与产线配置，并在设备上试包您的卡牌。",
  ctaLabel: "联系 CHANFER",
  faqs: [
    {
      q: "卡牌包装机多少钱一台？",
      a: "价格取决于包装方式、速度与自动化程度。提供卡牌尺寸、包装形式和目标产能后，我们会给出配置与报价。标准机 4-6 周，整线 6-8 周，定制 8-12 周。",
    },
    {
      q: "卡牌适合哪种包装方式？",
      a: "补充包常用糖果枕式包装，高价值收藏卡常用四边封，桌游卡组适合束带，热收缩展示效果好，三维包装适合高端礼盒。我们可以在 6 种方式上试包您的样品。",
    },
    {
      q: "一台机器能否兼容不同尺寸的卡牌？",
      a: "可以。配方保存在控制系统中，几分钟即可切换，一台卡牌包装机可运行多种尺寸与包装规格。",
    },
    {
      q: "机器如何避免错卡、漏卡？",
      a: "AI 视觉检测速度 400+ 张/分钟，可识别错卡、漏卡与顺序错误。在某美国高价值 TCG 卡牌项目中，CHANFER 的发卡、包装与视觉检测系统把包装错误降为零。",
    },
    {
      q: "你们是厂家还是贸易商？",
      a: "CHANFER 自主研发制造设备。广州长发智能装备负责销售与出口，是东莞长发智能包装的控股子公司（东莞持股 55%），同属 CHANFER 集团；两者是独立法人，不是同一家公司。",
    },
    {
      q: "质保和售后包含什么？",
      a: "整机质保 12 个月，询盘与售后 24 小时内回复，终生免费远程技术支持，并提供付费上门服务。",
    },
    {
      q: "买机前能否先代我们包装卡牌？",
      a: "可以。CHANFER 自有代客包装洁净车间与设备人员，您提供卡牌，我们交付成品包，可先验证包装形式再决定购机。",
    },
    {
      q: "CHANFER 有哪些认证和专利？",
      a: "CHANFER 通过 ISO9001 与 CE 认证，拥有 100+ 项专利，服务 8,000+ 客户，并获国家高新技术企业认定。",
    },
    {
      q: "机器能处理较厚或超大尺寸的收藏卡吗？",
      a: "可以。发卡与封口参数都在配方里设定；下单前我们会用您的真实厚卡或超大卡在设备上试包验证。提供卡牌尺寸，我们即可确认合适的包装方式。",
    },
    {
      q: "支持 one-of-one 唯一卡与纪念卡包装吗？",
      a: "高价值的唯一卡与纪念卡通常采用四边封或三维包装，并配视觉检测核对正确卡牌。CHANFER 已为高价值收藏卡项目提供发卡、包装与检测系统，欢迎就您的包装形式联系我们。",
    },
    {
      q: "产线能把卡牌与卡片/纪念品一起封装吗？",
      a: "可以。产线可配置为在卡牌旁放入一张插卡或认证藏品，并在同一包内封口。提供卡牌与插卡的样品，我们即可在设备上确认发卡与封口效果。",
    },
  ],
  whyTitle: "为什么卡牌包装要自动化？",
  whyBody: "人工点数装袋速度慢、易出错，而高端补充包里只要有一张错卡或漏卡，代价就远超包装本身。自动化产线去除重复人工环节，让每一包保持一致，并形成可复现、可追溯的流程。CHANFER 产线把摩擦式发卡、您选定的包装方式与 AI 视觉检测（400+ 张/分钟）整合在一起，高价值卡牌在封口前即完成核对。自动化也让产能可预期：您可以按已知的每分钟包数安排新品上市或再版，而不必依赖人工产出。",
  chooseTitle: "如何选择合适的包装方式",
  chooseBody: "从卡牌出发，而不是从机器出发。四个问题即可缩小范围：最终包装形式是什么（补充包、卡组、卡套还是礼盒）？每班需要多少产能？卡牌需要反复开合还是防拆封？产线是只跑一种规格，还是要在多种规格间切换？下表按各方式可达速度，把常见需求对应到包装方式。每种方式既可单机运行，也可接入带发卡与检测的整线；配方存储让一台机器兼容多种卡牌尺寸。",
  chooseRows: [
    { need: "大批量 TCG 补充包", recommended: "糖果枕式包装 — 20-220 包/分钟" },
    { need: "高价值收藏卡、全版面印刷", recommended: "四边封 — 50-150 包/分钟" },
    { need: "桌游卡组、环保纸束带", recommended: "束带 — 5-20 包/分钟" },
    { need: "货架展示效果最大化", recommended: "热收缩 — 20-100 包/分钟" },
    { need: "高端礼盒或收藏盒", recommended: "三维包装 — 40-80 包/分钟" },
    { need: "需要反复开合的卡牌", recommended: "自粘条 — 20-80 包/分钟" },
  ],
  mistakesTitle: "规划卡牌包装线时的常见误区",
  mistakes: [
    "只按当下最畅销的 SKU 选机型，没有为再版或新尺寸预留配方能力。",
    "先定速度再确认包装形式——形式不对，机器再快也包出错的产品。",
    "把视觉检测当作高价值卡的可选项；一旦错卡出货，召回成本可能高于检测本身。",
    "忽略换型时间。切换规格要一小时的产线，损失可能大于稍慢但几分钟即可切换的产线。",
    "发卡、包装、装盒分三家采购且控制系统不互通，结果整线无法同步。",
    "跳过样品试包。用真实卡牌在设备上试运行，才能发现规格书预测不到的卡套贴合、静电与卡牌挺度问题。",
  ],
  trialTitle: "从样品试包到验收",
  trialSteps: [
    "寄来卡牌样品与目标产能；工程师确认包装形式并推荐合适的包装方式。",
    "在 CHANFER 自有代客包装洁净车间，用选定的方式试包您的卡牌。",
    "共同检查成品包与检测结果，按需调整配方或包装形式。",
    "按目标速度试运行一批，确认产出稳定与换型时间。",
    "确认验收标准，再以固化的配置进入生产。",
  ],
  supportTitle: "交期、质保与支持",
  supportBody: "交期按公开周期安排：标准机 4-6 周、整线 6-8 周、定制 8-12 周，另加 2-4 周现场安装与培训。整机质保 12 个月，询盘与售后 24 小时内回复，并提供终生免费远程技术支持。CHANFER 在自有加工中心自主研发制造设备，配备 20 台 CNC，每台新研发设备在投放市场前都要在代客包装洁净车间验证。",
};

const de: Copy = {
  ...en,
  seoTitle: "Kartenverpackungsmaschine | TCG-Verpackungslinien | CHANFER",
  seoDescription:
    "Kartenverpackungsmaschine für TCG, Spielkarten und Sammelkarten: 6 Verpackungsverfahren, KI-Bildprüfung, US-Projekt mit null Fehlern. Direkt vom Hersteller.",
  h1: "Kartenverpackungsmaschine (Trading Card Packaging Machine)",
  eyebrow: "Automatische Verpackungslinien für TCG- und Spielkarten",
  lead: "Eine Kartenverpackungsmaschine automatisiert Zuführung, Zählung, Verpackung, Kartonierung und Palettierung von Sammelkarten. CHANFER liefert alles vom einzelnen Kartenausgeber bis zur schlüsselfertigen Linie.",
  whatIs: "Was ist eine Kartenverpackungsmaschine?",
  methodsTitle: "Sechs Verpackungsverfahren in einer Linie",
  lineTitle: "Von der Kartenzuführung bis zur Palettierung",
  qualityTitle: "Fehlerfreie Verpackung für wertvolle Karten",
  faqTitle: "Kartenverpackungsmaschine — häufige Fragen",
  whyTitle: "Warum Kartenverpackung automatisieren?",
  chooseTitle: "Die richtige Verpackungsmethode wählen",
  mistakesTitle: "Häufige Fehler bei der Planung einer Kartenverpackungslinie",
  trialTitle: "Vom Mustertest bis zur Abnahme",
  supportTitle: "Lieferung, Garantie und Support",
  ctaTitle: "Angebot für eine Kartenverpackungsmaschine anfragen",
  ctaLabel: "CHANFER kontaktieren",
};

const fr: Copy = {
  ...en,
  seoTitle: "Machine d'emballage de cartes | Lignes TCG | CHANFER",
  seoDescription:
    "Machine d'emballage de cartes pour TCG, cartes de jeu et cartes collection : 6 procédés, contrôle vision IA, projet américain zéro erreur. Direct fabricant.",
  h1: "Machine d'emballage de cartes (Trading Card Packaging Machine)",
  eyebrow: "Lignes d'emballage automatiques pour cartes TCG et de jeu",
  lead: "Une machine d'emballage de cartes automatise l'alimentation, le comptage, l'emballage, la mise en boîte et la palettisation des cartes. CHANFER fournit tout, du distributeur de cartes à la ligne clé en main.",
  whatIs: "Qu'est-ce qu'une machine d'emballage de cartes ?",
  methodsTitle: "Six procédés d'emballage sur une seule ligne",
  lineTitle: "De l'alimentation des cartes à la palettisation",
  qualityTitle: "Emballage sans erreur pour cartes de grande valeur",
  faqTitle: "Machine d'emballage de cartes — questions fréquentes",
  whyTitle: "Pourquoi automatiser l'emballage de cartes ?",
  chooseTitle: "Choisir la bonne méthode d'emballage",
  mistakesTitle: "Erreurs courantes lors de la définition d'une ligne d'emballage",
  trialTitle: "Du test échantillon à la réception",
  supportTitle: "Livraison, garantie et support",
  ctaTitle: "Demander un devis pour une machine d'emballage de cartes",
  ctaLabel: "Contacter CHANFER",
};

const it: Copy = {
  ...en,
  seoTitle: "Macchina imballaggio carte | Linee TCG | CHANFER",
  seoDescription:
    "Macchina imballaggio carte per TCG, carte da gioco e collezionabili: 6 metodi di confezionamento, controllo visivo IA, progetto USA a errore zero. Direttamente dal produttore.",
  h1: "Macchina imballaggio carte (Trading Card Packaging Machine)",
  eyebrow: "Linee di confezionamento automatiche per carte TCG e da gioco",
  lead: "Una macchina imballaggio carte automatizza alimentazione, conteggio, confezionamento, inscatolamento e palettizzazione delle carte. CHANFER fornisce tutto, dal distribuito di carte alla linea completa.",
  whatIs: "Che cos'è una macchina imballaggio carte?",
  methodsTitle: "Sei metodi di confezionamento in una sola linea",
  lineTitle: "Dall'alimentazione delle carte alla palettizzazione",
  qualityTitle: "Confezionamento senza errori per carte di alto valore",
  faqTitle: "Macchina imballaggio carte — domande frequenti",
  whyTitle: "Perché automatizzare il confezionamento delle carte?",
  chooseTitle: "Scegliere il metodo di confezionamento giusto",
  mistakesTitle: "Errori comuni nella definizione di una linea di confezionamento carte",
  trialTitle: "Dal test campione all'accettazione",
  supportTitle: "Consegna, garanzia e supporto",
  ctaTitle: "Richiedi un preventivo per una macchina imballaggio carte",
  ctaLabel: "Contatta CHANFER",
};

const es: Copy = {
  ...en,
  seoTitle: "Máquina embalaje cartas | Líneas TCG | CHANFER",
  seoDescription:
    "Máquina embalaje cartas para TCG, cartas de juego y coleccionables: 6 métodos, inspección visual IA, proyecto estadounidense con cero errores. Directo del fabricante.",
  h1: "Máquina embalaje cartas (Trading Card Packaging Machine)",
  eyebrow: "Líneas automáticas de embalaje para cartas TCG y de juego",
  lead: "Una máquina embalaje cartas automatiza alimentación, conteo, embalaje, encajonado y paletizado de cartas. CHANFER suministra todo, desde el alimentador hasta la línea completa.",
  whatIs: "¿Qué es una máquina embalaje cartas?",
  methodsTitle: "Seis métodos de embalaje en una sola línea",
  lineTitle: "Desde la alimentación de cartas hasta el paletizado",
  qualityTitle: "Embalaje sin errores para cartas de alto valor",
  faqTitle: "Máquina embalaje cartas — preguntas frecuentes",
  whyTitle: "¿Por qué automatizar el embalaje de cartas?",
  chooseTitle: "Cómo elegir el método de embalaje adecuado",
  mistakesTitle: "Errores comunes al especificar una línea de embalaje de cartas",
  trialTitle: "De la prueba de muestra a la aceptación",
  supportTitle: "Entrega, garantía y soporte",
  ctaTitle: "Solicitar presupuesto de una máquina embalaje cartas",
  ctaLabel: "Contactar con CHANFER",
};

const ru: Copy = {
  ...en,
  seoTitle: "Машина для упаковки карт | Линии TCG | CHANFER",
  seoDescription:
    "Машина для упаковки карт для TCG, игровых и коллекционных карт: 6 способов упаковки, ИИ-контроль, проект в США с нулевым числом ошибок. Напрямую от производителя.",
  h1: "Машина для упаковки карт (Trading Card Packaging Machine)",
  eyebrow: "Автоматические линии упаковки карт TCG и игровых карт",
  lead: "Машина для упаковки карт автоматизирует подачу, подсчёт, упаковку, укладку в коробки и паллетирование. CHANFER поставляет всё: от устройства подачи карт до готовой линии.",
  whatIs: "Что такое машина для упаковки карт?",
  methodsTitle: "Шесть способов упаковки в одной линии",
  lineTitle: "От подачи карт до паллетирования",
  qualityTitle: "Упаковка без ошибок для ценных карт",
  faqTitle: "Машина для упаковки карт — частые вопросы",
  whyTitle: "Зачем автоматизировать упаковку карт?",
  chooseTitle: "Как выбрать подходящий способ упаковки",
  mistakesTitle: "Частые ошибки при проектировании линии упаковки карт",
  trialTitle: "От тестирования образца до приёмки",
  supportTitle: "Поставка, гарантия и поддержка",
  ctaTitle: "Запросить предложение на машину для упаковки карт",
  ctaLabel: "Связаться с CHANFER",
};

const ko: Copy = {
  ...en,
  seoTitle: "카드 포장 기계 | TCG 자동 포장 라인 | CHANFER",
  seoDescription:
    "TCG, 게임 카드, 수집용 카드를 위한 카드 포장 기계: 6가지 포장 방식, AI 비전 검사, 미국 프로젝트 오류 제로. 제조사 직공급.",
  h1: "카드 포장 기계 (Trading Card Packaging Machine)",
  eyebrow: "TCG 및 게임 카드 자동 포장 라인",
  lead: "카드 포장 기계는 카드 공급, 계수, 포장, 박스 포장, 팔레타이징을 자동화합니다. CHANFER는 단일 카드 피더부터 턴키 라인까지 전체를 제공합니다.",
  whatIs: "카드 포장 기계란?",
  methodsTitle: "한 라인에서 6가지 포장 방식",
  lineTitle: "카드 공급부터 팔레타이징까지",
  qualityTitle: "고가 카드를 위한 오류 없는 포장",
  faqTitle: "카드 포장 기계 — 자주 묻는 질문",
  whyTitle: "카드 포장을 자동화해야 하는 이유",
  chooseTitle: "올바른 포장 방식 선택하기",
  mistakesTitle: "카드 포장 라인 설계 시 흔한 실수",
  trialTitle: "샘플 테스트부터 검수까지",
  supportTitle: "배송, 보증 및 지원",
  ctaTitle: "카드 포장 기계 견적 요청",
  ctaLabel: "CHANFER 문의",
};

const ja: Copy = {
  ...en,
  seoTitle: "カード包装機 | TCG自動包装ライン | CHANFER",
  seoDescription:
    "TCG、ゲームカード、コレクションカード向けのカード包装機：6種類の包装方式、AI視覚検査、米国プロジェクトでエラーゼロ。メーカー直販。",
  h1: "カード包装機 (Trading Card Packaging Machine)",
  eyebrow: "TCG・ゲームカード向け自動包装ライン",
  lead: "カード包装機はカードの供給、計数、包装、箱詰め、パレタイジングを自動化します。CHANFERはカードフィーダーからターンキーラインまで一式を提供します。",
  whatIs: "カード包装機とは？",
  methodsTitle: "1ラインで6種類の包装方式",
  lineTitle: "カード供給からパレタイジングまで",
  qualityTitle: "高価値カードのためのエラーゼロ包装",
  faqTitle: "カード包装機 — よくある質問",
  whyTitle: "カード包装を自動化する理由",
  chooseTitle: "適切な包装方法の選び方",
  mistakesTitle: "カード包装ライン設計時のよくある誤り",
  trialTitle: "サンプル試験から検収まで",
  supportTitle: "納品・保証・サポート",
  ctaTitle: "カード包装機の見積もりを依頼",
  ctaLabel: "CHANFERに問い合わせ",
};

export const landingCopy: Record<string, Copy> = {
  en, zh, de, fr, it, es, ru, ko, ja,
};

export function getLandingCopy(locale: string): Copy {
  return landingCopy[locale] ?? en;
}

export const VERIFIED_FACTS: string[] = [
  "CHANFER is an ISO9001 / CE certified manufacturer with 100+ patents and 8,000+ customers served.",
  "AI vision inspection runs at 400+ sheets/min and catches wrong, missing and out-of-order cards.",
  "For a US high-value TCG card project, CHANFER's card dispensing, packaging and vision inspection system reduced packaging errors to zero.",
  "CHANFER operates an in-house machining centre with 20 CNC machines and a contract-packaging cleanroom; every newly developed machine is proven in that cleanroom before market release.",
  "Every machine carries a 12-month warranty; enquiries and after-sales requests are answered within 24 hours; lifetime free remote technical support is provided, with paid on-site service available.",
  "Six packaging methods are available. Candy / flow wrap runs 20-220 packs/min; four-side seal runs 50-150 packs/min.",
  "Published lead times: 4-6 weeks for a standard machine, 6-8 weeks for a complete line, 8-12 weeks for custom engineering, plus 2-4 weeks for on-site installation and training.",
  "Guangzhou Chanfer Intelligent Equipment Co., Ltd. handles sales and export; it is a subsidiary of Dongguan Chanfer Intelligent Packing Technology Co., Ltd., which handles R&D and production. Both are independent legal entities within the same group.",
  "Contact: +86 130 6098 5132 · sarah@gzchanfer.com · WhatsApp +86 187 1891 6678 · WeChat 734310807",
];

export default function TradingCardPackagingMachineContent({ locale }: { locale: Locale }) {
  const c = getLandingCopy(locale);

  return (
    <main className="bg-white text-gray-900">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-sm font-medium text-green-700 mb-3">{c.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{c.h1}</h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl">{c.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              {c.ctaLabel}
            </Link>
            <Link href={`/${locale}/solutions`} className="inline-block border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              {c.methodsTitle}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold">{c.whatIs}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.whatIsBody}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.methodsTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.methodsBody}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {c.methodNames.map((name, i) => (
            <div key={name} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.methodDesc[i]}</p>
              <p className="mt-3 text-sm font-medium text-green-700">{c.methodSpeed[i]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.lineTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.lineBody}</p>
        <ol className="mt-6 grid md:grid-cols-2 gap-3 list-decimal list-inside text-gray-700">
          {c.lineSteps.map((s) => <li key={s} className="bg-gray-50 rounded-lg px-4 py-3">{s}</li>)}
        </ol>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.qualityTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.qualityBody}</p>
        <ul className="mt-6 space-y-3 text-gray-700">
          {VERIFIED_FACTS.slice(0, 5).map((f) => (
            <li key={f} className="border-l-4 border-green-600 pl-4 leading-relaxed">{f}</li>
          ))}
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.whyTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.whyBody}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.chooseTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.chooseBody}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="bg-gray-100 text-left">
              <th className="border border-gray-200 px-4 py-2">Need</th>
              <th className="border border-gray-200 px-4 py-2">Recommended method</th>
            </tr></thead>
            <tbody>
              {c.chooseRows.map((r) => (
                <tr key={r.need}>
                  <td className="border border-gray-200 px-4 py-2">{r.need}</td>
                  <td className="border border-gray-200 px-4 py-2">{r.recommended}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.mistakesTitle}</h2>
        <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700">
          {c.mistakes.map((m) => <li key={m} className="leading-relaxed">{m}</li>)}
        </ul>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.trialTitle}</h2>
        <ol className="mt-6 space-y-3 list-decimal list-inside text-gray-700">
          {c.trialSteps.map((s) => <li key={s} className="leading-relaxed">{s}</li>)}
        </ol>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.supportTitle}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{c.supportBody}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-gray-200">
        <h2 className="text-2xl font-bold">{c.faqTitle}</h2>
        <div className="mt-6 space-y-4">
          {c.faqs.map((item) => (
            <details key={item.q} className="border border-gray-200 rounded-lg p-5">
              <summary className="font-semibold cursor-pointer">{item.q}</summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold">{c.ctaTitle}</h2>
          <p className="mt-4 text-gray-300 leading-relaxed max-w-3xl">{c.ctaBody}</p>
          <p className="mt-6 text-sm text-gray-400 leading-relaxed">{VERIFIED_FACTS[8]}</p>
          <Link href={`/${locale}/contact`} className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400">
            {c.ctaLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
