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
    status: { label: "Taking pilots", kind: "active" },
    tagline: "AI automation of one real process, as a fixed-price pilot in 4 to 6 weeks",
    hero: {
      kicker: "Process automation",
      title: ["Automate the", "repetitive,", "focus on", "what matters"],
      lead:
        "AutomateNow automates one real process with AI, built on the tools you already use. It runs as a fixed-price pilot: 4 to 6 weeks, one process, one figure agreed before the work starts.",
      hasVideo: false,
    },
    summary:
      "AI process automation assembled from tools that already exist and layered on top of your current systems, delivered as a fixed-price pilot for one process in 4 to 6 weeks.",
    problem: {
      title: "The problem",
      lead:
        "Routine work quietly consumes the hours of the people you can least afford to lose.",
      items: [
        "Calls, bookings and routine questions fill a person's whole day",
        "Requests arriving at night or at the weekend wait until Monday",
        "A reply two days late, and the customer is already with a competitor",
        "A new hire needs weeks and a mentor to reach working speed",
        "How the process actually works lives in a few people's heads",
        "Forgotten requests and typos when data is moved by hand",
      ],
    },
    solution: {
      title: "How it works",
      lead:
        "We connect tools that already exist instead of writing software from scratch.",
      body:
        "The automation is assembled on workflow platforms such as n8n and integrated into the systems you run today: email, calendar, telephony, CRM. Nothing is replaced, an AI layer is added on top. It handles the typical cases and passes anything unusual to a person with a ready summary. We start with a pilot: one process, a fixed price and a fixed timeframe, so you see the result before there is any talk of a larger contract.",
    },
    features: [
      { icon: "shield", title: "Fixed price, fixed scope", text: "One process, 4 to 6 weeks, one figure agreed before the start. No hourly billing and no additional invoices." },
      { icon: "flow", title: "Process audit first", text: "Before anything is built we map with your process owner what happens today, who is involved and where the time goes." },
      { icon: "cloud", title: "Built on your tools", text: "Email, calendar, telephony and CRM stay where they are. The automation layers on top of them instead of replacing them." },
      { icon: "eye", title: "Full action log", text: "Every action is recorded: what came in, what was handled, what was passed to a person. Transparency instead of a black box." },
      { icon: "chart", title: "Manager dashboard", text: "Requests handled, hours saved, and every point where the automation handed a question over to a human." },
      { icon: "globe", title: "Works in your language", text: "Interfaces and AI assistants in Finnish, English, or whatever you need: Swedish, Estonian, Russian, Ukrainian." },
    ],
    cases: {
      title: "What we automate",
      lead: "Three processes we have already built. Your own process fits too, if the shape is similar.",
      items: [
        {
          icon: "share",
          title: "HR routine",
          text:
            "The flow of candidates and staff, automated end to end. Applications get a first-pass screening against criteria you agree in advance, candidates get an answer, interviews are scheduled, hiring documents are collected and expiring certifications are chased. HR spends its time on people instead of correspondence.",
        },
        {
          icon: "map",
          title: "Employee onboarding",
          text:
            "An AI assistant built on your company's own knowledge. A new hire, a marketer for example, is introduced to what the company does, which tools and channels are in use, who is responsible for what and where the roadmap is going, and gets materials handed over and access requested. The new hire asks the assistant instead of interrupting colleagues, the manager sees from the logs what has been covered and where the person is stuck, and company knowledge gets documented and reused automatically.",
        },
        {
          icon: "ai",
          badge: "Already in production",
          title: "AI secretary",
          text:
            "Running with a client today and in daily use. It receives incoming calls and messages around the clock, answers routine questions, books clients into free time slots, records requests and hands complex cases to a person with a ready summary. Nothing gets lost, including at night and at the weekend.",
        },
      ],
    },
    process: {
      title: "How we work",
      lead: "Four steps, and at every point you know what happens next.",
      steps: [
        {
          title: "Kick-off meeting",
          text:
            "We walk through the process with your process owner, agree the acceptance criteria, write down the numbers as they stand today and arrange access to the tools where the process lives: email, calendar, telephony, CRM, limited to the minimum necessary. A data processing agreement is signed before the start and we provide the template.",
        },
        {
          title: "Pilot on your existing tools",
          text:
            "Fixed scope, fixed timeframe. We build the automation and integrate it into the systems you already run, with a working demo halfway through the pilot. Your effort stays small: one responsible contact and two meetings of 1 to 2 hours, the process audit and the acceptance.",
        },
        {
          title: "Final report",
          text:
            "A closing meeting of one hour on the results: the measured outcome, before and after numbers against the criteria set at the start, and recommendations on what is worth extending next.",
        },
        {
          title: "After the pilot",
          text:
            "An optional next step: custom development tailored to your case, or a support subscription. Both are separate agreements, decided once the pilot has produced its numbers.",
        },
      ],
    },
    pricing: {
      title: "Pilot options",
      lead: "Three shapes of pilot. Which one fits is decided at the kick-off meeting, once we have seen the process.",
      note:
        "Fixed price, not hourly. Hourly billing turns the conversation into our rate and leaves you with an open-ended bill; a fixed price turns the conversation into the result. Third-party service licences and telephony are paid by you directly, and we help you pick the minimum set.",
      tiers: [
        {
          name: "Basic",
          price: "6 000 EUR",
          text: "For one clearly defined process with a small number of connections.",
          items: ["One process", "Up to 2 integrations", "For example an AI secretary: telephony plus calendar"],
        },
        {
          name: "Extended",
          price: "12 000 EUR",
          text: "For a process with more moving parts, or two simpler ones at the same time.",
          items: ["One complex or two simple processes", "Up to 4 integrations", "Manager dashboard"],
        },
        {
          name: "Complete",
          price: "20 000 EUR",
          text: "For covering several processes in one pilot and keeping support afterwards.",
          items: ["Three processes: secretary, onboarding, HR", "Manager dashboard", "3 months of support after the pilot"],
        },
      ],
    },
    scope: {
      title: "What the pilot covers",
      lead: "The boundary is written into the agreement, so nothing surprising turns up on the invoice.",
      included: {
        title: "What the pilot includes",
        items: [
          "Process audit in week 0 to 1 with your process owner: what happens, who is involved, where time is lost. Output: a map of the process as it is and as it will be.",
          "Turnkey automation built on AI and integrated into the tools you already use: email, calendar, telephony, CRM.",
          "Work in your language: interfaces and AI assistants in Finnish, English, or whatever you need, including Swedish, Estonian, Russian and Ukrainian.",
          "A full log of everything the automation does: what came in, what was handled, what was passed to a human.",
          "A manager dashboard: requests handled, hours saved, and where the automation handed a question to a person.",
          "A handover session of 2 hours for the responsible employee, plus support for the whole pilot period.",
          "A final report: results, before and after measurements, and recommendations for extending.",
        ],
      },
      excluded: {
        title: "What it does not include",
        items: [
          "Automating a second or further process. That is the next contract.",
          "Custom software built from scratch. Custom development is possible as a continuation after a successful pilot, not inside it.",
          "Replacement of your existing systems. They stay, we build on top of them.",
          "Third-party service licences and telephony. You pay those directly and we help pick the minimum set.",
          "Support after the pilot ends, except in the Complete option. It is offered separately as a subscription.",
        ],
      },
    },
    measure: {
      title: "What we measure",
      lead: "The metrics are agreed before the start, and the same numbers are read back at the closing meeting.",
      items: [
        "Hours of human time spent on the process per week, before and after",
        "Share of requests handled without a person",
        "Response time to a client request, from hours or days to seconds",
        "Number of lost or forgotten requests",
        "For onboarding: time until a new hire works independently, and the number of questions to colleagues",
        "Cost of handling one request or one hire, per year",
      ],
    },
    pains: {
      title: "Where the time and money go",
      lead: "Five costs that stay invisible on the invoice, and what the automation does about each.",
      rows: [
        {
          pain:
            "The cost of human time. A secretary, an office manager or the owner spends hours on tasks that do not need a person: taking calls, booking times, answering routine questions, moving data between systems.",
          answer:
            "The automation handles the routine and people keep the work that needs judgement. Nobody loses their job, people stop being answering machines.",
        },
        {
          pain:
            "Missed requests are lost money. A call outside office hours, an email answered two days late, and the customer is already with a competitor.",
          answer: "The automation works around the clock, and every request is recorded and answered.",
        },
        {
          pain:
            "Onboarding costs the productivity of two people. The new hire takes weeks to reach working speed while an experienced colleague acts as a mentor instead of doing their own job.",
          answer: "The assistant answers the new hire's questions, and the manager sees progress from the logs.",
        },
        {
          pain:
            "Knowledge lives in people's heads. When someone leaves, the knowledge of how the process works goes with them.",
          answer: "The process is mapped and the assistant is built on that knowledge, so it stays available and gets reused.",
        },
        {
          pain:
            "Errors in manual routine. A forgotten request, a typo when moving data, a lost email. Cheap individually, expensive over time.",
          answer: "Every step is logged, and anything non-standard goes to a person with a ready summary.",
        },
      ],
    },
    audience: {
      title: "Who it's for",
      tags: [
        "Owners answering their own phone",
        "Teams hiring continuously",
        "Recurring service requests",
        "Manual data transfer between systems",
        "Office and service operations",
        "Processes nobody has time to fix",
      ],
    },
    statusBanner: {
      title: "Current status: Taking pilots",
      text:
        "The AI secretary is already running in production with a client, handling real calls and bookings. New engagements start with a kick-off meeting: we pick one process, agree the acceptance criteria and set the pilot date.",
    },
    cta: { label: "Book a kick-off meeting", href: "/#contact", external: false },
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
