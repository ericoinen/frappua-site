// ============================================================
//  Frappua! - site content model
//  Edit content here; run `npm run build` (or `node build.mjs`)
//  to regenerate all pages into /dist.
// ============================================================

export const site = {
  name: "Frappua!",
  domain: "frappua.win",
  email: "info@frappua.win",
  location: "Helsinki, Finland",
  businessId: "2775290-7",
  vat: "FI27752907",
  tagline: "XR, AI & Digital Innovation from Finland",
  description:
    "Frappua! develops digital products across virtual reality training, computer vision, business automation, AI-powered games and technology workshops.",
};

// Order matters - used for nav, project galleries and "other projects".
export const projects = [
  {
    slug: "safeskillvr",
    name: "SafeSkillVR",
    index: "01",
    color: "#00d6c2",
    colorRGB: "0, 214, 194",
    status: { label: "Prototype", kind: "prototype" },
    tagline: "AI-assisted VR training for warehouse & logistics operations",
    hero: {
      kicker: "Immersive training",
      title: ["Train in", "virtual reality,", "perform in", "the real world"],
      lead:
        "SafeSkillVR combines immersive VR simulation with an AI assistant so workers learn practical warehouse and logistics tasks in a safe, repeatable and measurable environment, before they ever step onto the floor.",
      hasVideo: true,
    },
    summary:
      "A virtual reality training solution that combines immersive VR simulation with an AI assistant to help workers learn practical tasks in a safe, repeatable and measurable environment.",
    problem: {
      title: "The problem",
      lead:
        "Warehouse and logistics training relies on manual instruction, informal observation and the availability of experienced trainers.",
      items: [
        "Training quality varies between trainers and locations",
        "New workers enter real environments before they are fully prepared",
        "Mistakes and unsafe actions are noticed only after they happen",
        "Limited data about training progress and readiness",
        "Experienced staff spend time repeating basic onboarding",
        "Training results are difficult to document and compare",
      ],
    },
    solution: {
      title: "Our solution",
      lead:
        "A digital training environment where warehouse work can be practised, repeated and measured.",
      body:
        "The trainee performs tasks step by step in VR while the AI assistant provides guidance, explanations and feedback. The system tracks performance indicators such as task completion, time, mistakes, safety violations and the number of AI interventions, turning every session into structured, comparable data.",
    },
    features: [
      { icon: "vr", title: "Immersive VR training", text: "Practise warehouse work in a realistic virtual environment and build confidence before entering operational settings." },
      { icon: "ai", title: "AI-assisted guidance", text: "An integrated AI assistant explains tasks, supports uncertain trainees and helps users understand mistakes in context." },
      { icon: "flow", title: "Standardised workflow", text: "The same scenario repeated by different users for consistent onboarding and safety training across teams." },
      { icon: "chart", title: "Measurable data", text: "Structured records including completion time, errors, unsafe actions, task progress and AI support." },
      { icon: "shield", title: "Error & safety tracking", text: "Identify repeated mistakes and unsafe actions during training, before they happen in real environments." },
      { icon: "eye", title: "Supervisor insight", text: "Training data helps supervisors see where learners struggle and how onboarding can be improved." },
    ],
    audience: {
      title: "Who it's for",
      tags: [
        "Logistics companies",
        "Warehouses & distribution centres",
        "Transport-related warehousing",
        "Vocational education & training",
        "Company onboarding programs",
        "Mobility & automotive value chain",
      ],
    },
    statusBanner: {
      title: "Current status: Prototype",
      text:
        "The existing prototype demonstrates VR-based warehouse training with an AI assistant. The next phase focuses on transport-related scenarios, training analytics, user validation and pilot preparation.",
    },
    cta: null,
  },

  {
    slug: "aicameras",
    name: "AI Cameras",
    index: "02",
    color: "#8b7bff",
    colorRGB: "139, 123, 255",
    status: { label: "Active", kind: "active" },
    tagline: "Practical computer vision that turns cameras into intelligent assistants",
    hero: {
      kicker: "Computer vision",
      title: ["Cameras that", "understand", "what they", "see"],
      lead:
        "We build practical computer vision solutions that let cameras understand scenes, monitor environments and surface meaningful information, instead of endless video you have to watch yourself.",
      hasVideo: false,
    },
    summary:
      "Practical computer vision solutions that transform cameras into intelligent assistants that understand visual scenes, monitor environments and report only what matters.",
    problem: {
      title: "The shift",
      lead: "Cameras should do more than record video.",
      items: [
        "Hours of footage nobody has time to watch",
        "Important events noticed too late, or not at all",
        "Manual visual inspection that doesn't scale",
        "Monitoring systems that need specialists to configure",
        "Expensive infrastructure for simple questions",
        "No natural way to ask a camera what to look for",
      ],
    },
    solution: {
      title: "Our approach",
      lead:
        "Computer vision, modern AI models and natural-language interaction in one platform.",
      body:
        "Describe what should be monitored in plain language; the system watches the scene and reports when the expected event occurs. We build for both consumers and businesses, reuse existing cameras where possible, and deploy in the cloud or fully on-premise.",
    },
    features: [
      { icon: "eye", title: "Scene understanding", text: "Cameras interpret what they see and turn raw video into meaningful, structured information." },
      { icon: "ai", title: "Natural language", text: "Describe what to monitor in plain words. No rules engines, no specialist configuration." },
      { icon: "bell", title: "Meaningful alerts", text: "Receive notifications only when something important happens, instead of watching live feeds." },
      { icon: "flow", title: "Flexible scenarios", text: "Automate visual inspection and adapt monitoring to each customer's operational needs." },
      { icon: "camera", title: "Reuse your cameras", text: "Integrate with existing IP cameras, often with no new hardware required." },
      { icon: "cloud", title: "Cloud or on-prem", text: "Deploy in the cloud or fully on-premise, depending on privacy and infrastructure needs." },
    ],
    productCards: [
      {
        badge: "Consumer",
        title: "AI Vision Monitor",
        text: "A mobile app that turns a smartphone into an AI-powered monitoring assistant. Describe what should be monitored and the app watches the scene and reports when the event occurs.",
        items: ["Natural language scene description", "Real-time event detection", "Smart notifications", "No extra hardware needed"],
      },
      {
        badge: "Business",
        title: "Business Solutions",
        text: "Custom computer vision solutions designed around your operational needs rather than a predefined product.",
        items: ["Workplace & safety monitoring", "Industrial process monitoring", "Warehouse & logistics applications", "Quality inspection", "Integration with existing IP cameras", "On-premise & cloud deployment"],
      },
    ],
    audience: {
      title: "Built for",
      tags: ["Consumers & hobbyists", "Small businesses", "Industrial operations", "Warehouses & logistics", "Safety & quality teams", "Existing IP-camera fleets"],
    },
    statusBanner: {
      title: "Current status: Active",
      text:
        "AI Cameras is in active development, delivering practical computer vision for both consumers and organisations, with cloud and on-premise deployment options.",
    },
    cta: { label: "Visit aicameras.win", href: "https://aicameras.win/", external: true },
    links: [{ label: "YouTube", href: "https://www.youtube.com/@AIVisionMonitor", icon: "youtube" }],
  },

  {
    slug: "grimscribe",
    name: "Grimscribe",
    index: "03",
    color: "#4ecb8d",
    colorRGB: "78, 203, 141",
    status: { label: "Live", kind: "active" },
    tagline: "A solo D&D-style RPG where an AI narrates and a real rules engine rolls the dice",
    hero: {
      kicker: "AI Game Master",
      title: ["The AI", "narrates.", "It never", "rolls the dice."],
      lead:
        "Grimscribe is a solo, browser-based D&D-style campaign: an AI Dungeon Master tells the story, plays the NPCs and hides the plot twists. A deterministic rules engine owns everything else, dice, hit points, inventory, encumbrance and game time, and writes every roll into a chronicle you can read.",
      hasVideo: false,
    },
    summary:
      "A solo, browser-based D&D-style RPG in which an AI Dungeon Master tells the story while a deterministic rules engine owns the dice, hit points, inventory and time.",
    problem: {
      title: "The problem",
      lead:
        "You want a tabletop campaign tonight, but groups fall apart and AI storytellers cheat.",
      items: [
        "Scheduling five adults kills more campaigns than any dragon",
        "Playing solo means tracking hit points, inventory and time yourself, which kills immersion",
        "Chat-based Dungeon Masters forget your state a few thousand tokens in",
        "AI narrators invent outcomes and can be talked into anything",
        "Nothing is at stake when the storyteller always yields",
        "Oracle tools hand you answers, not a living scene",
      ],
    },
    solution: {
      title: "Our solution",
      lead:
        "Split the roles: the language model narrates, a deterministic engine adjudicates.",
      body:
        "The Dungeon Master gets 35 engine tools and no other way to touch the world. Every roll, hit point and coin passes through that engine and lands in a chronicle you can read line by line. World state lives in a database rather than in the model's context, and the system prompt says it plainly: the player cannot talk you into breaking these rules.",
    },
    features: [
      { icon: "dice", title: "Honest dice", text: "The engine rolls every d20 and every number lands in the chronicle. The narrator cannot fudge a result it never touched." },
      { icon: "clock", title: "Playing in two minutes", text: "One-click Google sign-in, a two-step wizard, no group to assemble. Start a campaign at 23:40 on a Tuesday." },
      { icon: "shield", title: "The world remembers", text: "Hit points, gold, inventory, hunger, time of day and positions live in a database, not in the model's memory." },
      { icon: "map", title: "A real 3D table", text: "A candlelit 3D tabletop with miniatures, plus AI-drawn battle maps that a vision model turns into walls which genuinely block movement." },
      { icon: "skull", title: "Death is real", text: "At 0 HP your hero falls and the world moves on without them. If they die, a short epilogue closes the story for good." },
      { icon: "spark", title: "Any genre", text: "The campaign premise re-themes the whole world. Custom races and classes work, and the AI invents their bonuses." },
    ],
    productCards: [
      {
        badge: "Free",
        title: "Adventurer",
        text: "Create a character, pick a premise and play. No card required: sign in with Google and you are in the opening scene.",
        items: ["25 Dungeon Master turns per day", "2 generated images per day", "3 campaigns per account", "No credit card required"],
      },
      {
        badge: "$15 / month",
        title: "Hero",
        text: "For longer campaigns: a stronger narration model, illustrated scenes and a monthly pool of credits.",
        items: ["Premium narration model", "Automatic scene illustrations", "150 credits per month", "Priority image generation"],
      },
    ],
    audience: {
      title: "Who it's for",
      tags: [
        "Solo tabletop roleplayers",
        "D&D players between campaigns",
        "AI Dungeon & NovelAI refugees",
        "Interactive fiction fans",
        "Worldbuilders & homebrewers",
        "LLM-agent tinkerers",
      ],
    },
    statusBanner: {
      title: "Current status: Live",
      text:
        "Grimscribe is live at grimscribe.win with a working free tier, so you can sign in and roll your first check tonight. Grimscribe is an independent product, not affiliated with Wizards of the Coast.",
    },
    cta: { label: "Play at grimscribe.win", href: "https://grimscribe.win/", external: true },
    links: [{ label: "YouTube", href: "https://www.youtube.com/@playgrimscribe", icon: "youtube" }],
  },

  {
    slug: "loomtale",
    name: "Loomtale",
    index: "04",
    color: "#d67aff",
    colorRGB: "214, 122, 255",
    status: { label: "Live", kind: "active" },
    tagline: "Turn a premise into a playable visual novel",
    hero: {
      kicker: "Generative visual novels",
      title: ["Type a", "premise.", "Play the", "visual novel."],
      lead:
        "Loomtale turns a short prompt into a branching, illustrated visual novel: story, characters and art generated together. You watch it assemble in real time and play it right in the browser.",
      hasVideo: false,
    },
    summary:
      "A generative visual novel studio that turns a short premise into a branching, illustrated story you can play in the browser and share with a link.",
    problem: {
      title: "The problem",
      lead:
        "A visual novel needs a writer, an artist, an engine and branching logic, all at the same time.",
      items: [
        "Writing a branching script is months of work",
        "Art costs money, or years of practice",
        "Engines like Ren'Py still expect you to write code",
        "Keeping one character's face consistent across scenes is hard",
        "Branching plots collapse into a single corridor with fake choices",
        "Most visual novel ideas die as notes in a drawer",
      ],
    },
    solution: {
      title: "Our solution",
      lead:
        "Describe the premise, set a few knobs, get a playable draft.",
      body:
        "You choose genre, tone, length, art style, cast size and branching depth, and the service generates story, characters and art as one consistent draft. Generation is multi-stage and visible, so you can start playing before it finishes, and everything stays editable: any scene, line, sprite or background can be regenerated. The cost of every generation is shown up front and capped by your plan limits.",
    },
    features: [
      { icon: "spark", title: "From premise to playable", text: "One short prompt becomes a branching, illustrated visual novel you can play in minutes." },
      { icon: "branch", title: "Choices that matter", text: "Genre, tone, length and branching depth are yours to set, and different choices reach different endings." },
      { icon: "eye", title: "Watch it weave", text: "Generation is asynchronous and staged: scenes, sprites and backgrounds appear as they finish, and you can start playing early." },
      { icon: "flow", title: "Everything is a draft", text: "Regenerate any scene, line, sprite or background until it fits the story you had in mind." },
      { icon: "mask", title: "Characters that stay themselves", text: "Sprites stay visually consistent from scene to scene, and Pro adds a character identity lock." },
      { icon: "share", title: "Play and share in the browser", text: "No installs: every novel is a link you can send, and finished ones can go to a public gallery." },
    ],
    productCards: [
      {
        badge: "Free",
        title: "Storyteller",
        text: "Try the whole loop for nothing: sign in with Google, describe a premise and play the result the same evening.",
        items: ["3 stories per month", "Up to 60 images per month", "Short length, 1 save slot", "No credit card required"],
      },
      {
        badge: "$19 / month",
        title: "Pro",
        text: "For longer novels and a bigger cast: more stories, every length, and tighter control over how characters look.",
        items: ["12 stories per month, all lengths", "Up to 500 images per month", "Character identity lock & custom choices", "6 save slots, no watermark"],
      },
    ],
    audience: {
      title: "Who it's for",
      tags: [
        "Visual novel fans who don't draw",
        "Writers who need art & branching",
        "Educators & trainers",
        "Marketers making interactive scenarios",
        "TTRPG masters & worldbuilders",
        "Indie devs & game jammers",
      ],
    },
    statusBanner: {
      title: "Current status: Live",
      text:
        "Loomtale is live at loomtale.win with a working free tier: three stories a month, no card required. Per-character voice-over and scene music are next on the roadmap. Loomtale is published by Frappua!",
    },
    cta: { label: "Create at loomtale.win", href: "https://loomtale.win/", external: true },
    links: [{ label: "YouTube", href: "https://www.youtube.com/@playloomtale", icon: "youtube" }],
  },

  {
    slug: "workshops",
    name: "Workshops",
    index: "05",
    color: "#ffc24b",
    colorRGB: "255, 194, 75",
    status: { label: "Coming soon", kind: "soon" },
    tagline: "Hands-on sessions exploring what new technologies can do for you",
    hero: {
      kicker: "Learning by doing",
      title: ["Discover what", "new tech can", "do for", "your work"],
      lead:
        "Hands-on workshop sessions that introduce participants to the possibilities of emerging technologies such as VR, AI, computer vision and automation, and explore how they apply to your specific business challenges.",
      hasVideo: false,
    },
    summary:
      "Hands-on workshops that introduce teams to emerging technologies and explore how they apply to real, specific business challenges.",
    problem: null,
    solution: null,
    features: [
      { icon: "ai", title: "Emerging tech, demystified", text: "VR, AI, computer vision and automation explained through hands-on experience, not slides." },
      { icon: "flow", title: "Anchored to your challenges", text: "Sessions built around your team's real tasks and operational questions." },
      { icon: "chart", title: "Concrete next steps", text: "Leave with a clear view of where new technology can create value for you." },
    ],
    audience: null,
    comingSoon:
      "We are preparing interactive workshops that help your team explore the potential of new technologies for your specific operational challenges. Details will be announced soon.",
    statusBanner: null,
    cta: { label: "Get notified", href: "/#contact", external: false },
  },

  {
    slug: "automatenow",
    name: "AutomateNow",
    index: "06",
    color: "#ff7a59",
    colorRGB: "255, 122, 89",
    status: { label: "Coming soon", kind: "soon" },
    tagline: "Business process automation for operational efficiency",
    hero: {
      kicker: "Process automation",
      title: ["Automate the", "repetitive,", "focus on", "what matters"],
      lead:
        "AutomateNow helps organisations streamline operations by automating repetitive tasks and workflows, increasing efficiency and reducing manual effort across business processes.",
      hasVideo: false,
    },
    summary:
      "AI-powered business process automation that streamlines operations, removes repetitive manual work and adapts to your workflows.",
    problem: null,
    solution: null,
    features: [
      { icon: "flow", title: "Workflow automation", text: "Replace repetitive, manual steps with reliable automated workflows." },
      { icon: "ai", title: "AI-powered", text: "Automation that adapts to your processes instead of forcing you to adapt to it." },
      { icon: "chart", title: "Measurable efficiency", text: "Reduce manual effort and free your team for higher-value work." },
    ],
    audience: null,
    comingSoon:
      "We are developing practical automation solutions to help businesses work smarter. AutomateNow will bring AI-powered process automation that adapts to your workflows. Details will be announced soon.",
    statusBanner: null,
    cta: { label: "Get notified", href: "/#contact", external: false },
  },
];

export const capabilities = [
  "XR & Virtual Reality",
  "Computer Vision",
  "AI Assistants",
  "Digital Training",
  "Process Automation",
  "AI Game Masters",
  "Generative Storytelling",
  "Technology Workshops",
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
