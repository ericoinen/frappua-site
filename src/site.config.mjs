// ============================================================
//  Frappua! — site content model
//  Edit content here; run `npm run build` (or `node build.mjs`)
//  to regenerate all pages into /dist.
// ============================================================

export const site = {
  name: "Frappua!",
  domain: "frappua.win",
  email: "info@frappua.win",
  location: "Helsinki, Finland",
  businessId: "2775290-7",
  tagline: "XR, AI & Digital Innovation from Finland",
  description:
    "Frappua! develops digital products across virtual reality training, computer vision, business automation and technology workshops.",
};

// Order matters — used for nav, project galleries and "other projects".
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
        "SafeSkillVR combines immersive VR simulation with an AI assistant so workers learn practical warehouse and logistics tasks in a safe, repeatable and measurable environment — before they ever step onto the floor.",
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
        "The trainee performs tasks step by step in VR while the AI assistant provides guidance, explanations and feedback. The system tracks performance indicators — task completion, time, mistakes, safety violations and the number of AI interventions — turning every session into structured, comparable data.",
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
      title: "Current status — Prototype",
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
        "We build practical computer vision solutions that let cameras understand scenes, monitor environments and surface meaningful information — instead of endless video you have to watch yourself.",
      hasVideo: false,
    },
    summary:
      "Practical computer vision solutions that transform cameras into intelligent assistants — understanding visual scenes, monitoring environments and reporting only what matters.",
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
      { icon: "ai", title: "Natural language", text: "Describe what to monitor in plain words — no rules engines, no specialist configuration." },
      { icon: "bell", title: "Meaningful alerts", text: "Receive notifications only when something important happens, instead of watching live feeds." },
      { icon: "flow", title: "Flexible scenarios", text: "Automate visual inspection and adapt monitoring to each customer's operational needs." },
      { icon: "camera", title: "Reuse your cameras", text: "Integrate with existing IP cameras — often no new hardware required." },
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
      title: "Current status — Active",
      text:
        "AI Cameras is in active development, delivering practical computer vision for both consumers and organisations, with cloud and on-premise deployment options.",
    },
    cta: { label: "Visit aicameras.win", href: "https://aicameras.win/", external: true },
  },

  {
    slug: "workshops",
    name: "Workshops",
    index: "03",
    color: "#ffc24b",
    colorRGB: "255, 194, 75",
    status: { label: "Coming soon", kind: "soon" },
    tagline: "Hands-on sessions exploring what new technologies can do for you",
    hero: {
      kicker: "Learning by doing",
      title: ["Discover what", "new tech can", "do for", "your work"],
      lead:
        "Hands-on workshop sessions that introduce participants to the possibilities of emerging technologies — VR, AI, computer vision, automation — and explore how they apply to your specific business challenges.",
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
    index: "04",
    color: "#ff7a59",
    colorRGB: "255, 122, 89",
    status: { label: "Coming soon", kind: "soon" },
    tagline: "Business process automation for operational efficiency",
    hero: {
      kicker: "Process automation",
      title: ["Automate the", "repetitive,", "focus on", "what matters"],
      lead:
        "AutomateNow helps organisations streamline operations by automating repetitive tasks and workflows — increasing efficiency and reducing manual effort across business processes.",
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
  "Technology Workshops",
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
