import { framerImages } from "@/lib/framer-images";

export const portfolioItems = [
  {
    title: "MoneyBuddy AI",
    category: "Personal finance",
    href: "/contact",
    image: "/MoneyBuddyAI.jpeg",
  },
  {
    title: "Diet plan",
    category: "Nutrition & wellness",
    href: "/contact",
    image: "/diet_plan_project.png",
  },
  {
    title: "SchemeFinder AI",
    category: "Benefits & schemes",
    href: "/contact",
    image: "/SchemeFinderAI.jpeg",
  },
  {
    title: "JobTrainer AI",
    category: "Career coaching",
    href: "/contact",
    image: "/JobTrainerAI.jpeg",
  },
  {
    title: "FitnessTrainer AI",
    category: "Fitness coaching",
    href: "/contact",
    image: "/FitnessTrainerAI.jpeg",
  },
  {
    title: "HabitCracker AI",
    category: "Habits & behavior",
    href: "/contact",
    image: "/HabitCrackerAI.jpeg",
  },
] as const;

export const services = [
  {
    title: "AI Integration",
    tagline: "Models, retrieval, agents, guardrails, live monitoring",
    description:
      "LLM features, retrieval and agents, evaluation, guardrails, and production monitoring wired into your product.",
  },
  {
    title: "Full-stack Development",
    tagline: "APIs, cloud, CI/CD, observability, scale-ready",
    description:
      "APIs, web apps, cloud infrastructure, CI/CD, and observability from prototype to scale.",
  },
  {
    title: "Mobile Applications",
    tagline: "Native & cross-platform, offline sync, secure auth",
    description:
      "Native and cross-platform iOS and Android apps with offline sync, push, and secure auth.",
  },
  {
    title: "Embedded Services",
    tagline: "Firmware, gateways, OTA, device-to-cloud pipelines",
    description:
      "Firmware, device drivers, edge gateways, OTA updates, and integration with cloud backends.",
  },
  {
    title: "VR / AR Experiences",
    tagline: "Spatial UX, training simulators, headset-ready builds",
    description:
      "Spatial interfaces, training simulators, and immersive product demos built for headsets and mobile AR.",
  },
  {
    title: "Blockchain Technology",
    tagline: "Web3, smart contracts, wallets, indexing, secure APIs",
    description:
      "On-chain and hybrid products: wallet flows, contract patterns, indexing and events, key management guidance, and backend APIs that stay clear, auditable, and maintainable.",
  },
] as const;

export const experience = [
  {
    company: "Jaxpat",
    role: "Principal engineer — AI & platforms",
    period: "2022 - Present",
    detail:
      "Leading delivery of AI-assisted workflows, full-stack services, and secure integrations for clients across hardware and software stacks.",
  },
  {
    company: "Jaxpat",
    role: "Tech lead — mobile & edge",
    period: "2016 – 2022",
    detail:
      "Shipped mobile apps, embedded gateways, and device telemetry pipelines with strong reliability and field support.",
  },
  {
    company: "Product partners",
    role: "Senior full-stack developer",
    period: "2010 – 2016",
    detail:
      "Built customer-facing portals, billing integrations, and internal tooling for SaaS and connected-device teams.",
  },
  {
    company: "Independent",
    role: "Software & XR consultant",
    period: "2008 - 2010",
    detail:
      "Early VR prototypes, interactive installations, and performance-critical graphics work for agencies and startups.",
  },
] as const;

export const awards = [
  {
    title: "AI / ML delivery",
    subtitle: "Production-grade assistants",
    year: "Jan 2026",
    text: "Deployed retrieval-augmented features, safety reviews, and latency budgets so models behave predictably for end users.",
  },
  {
    title: "Full-stack scale",
    subtitle: "High-traffic platforms",
    year: "Mar 2026",
    text: "Architected services, caching, and autoscaling paths that held up under campaign traffic and global rollouts.",
  },
  {
    title: "Immersive & edge",
    subtitle: "XR & embedded",
    year: "May 2026",
    text: "Combined VR/AR clients with real-time backends and embedded firmware for demos, training, and field hardware.",
  },
] as const;

export const stackTools = [
  {
    name: "Full-stack Web + AI",
    role: "React.js, Next.js, Node.js",
    value: 94,
    blurb:
      "We build full-stack products with React.js, Next.js, and Node.js, with AI integrated into real workflows: model serving, orchestration, RAG pipelines, and secure connections to your business systems.",
  },
  {
    name: "Next.js & Three.js",
    role: "Web framework + 3D websites",
    value: 92,
    blurb:
      "Modern web experiences built with Next.js framework and Three.js websites, including performant UI, API routes, and interactive 3D product experiences.",
  },
  {
    name: "Mobile Development",
    role: "Android Studio + Flutter",
    value: 91,
    blurb:
      "Mobile apps developed with Android Studio and Flutter, with production-ready architecture, API integrations, secure auth, and release support.",
  },
  {
    name: "Cloud Databases",
    role: "MongoDB Atlas + Supabase",
    value: 90,
    blurb:
      "Cloud-backed data layers using MongoDB Atlas and Supabase, including schema design, auth, storage, realtime features, and scalable backend integration.",
  },
  {
    name: "VR / AR",
    role: "Immersive development",
    value: 88,
    blurb:
      "We build immersive VR and AR experiences with performant rendering, interaction design, and production-ready integration with your backend systems.",
  },
  {
    name: "Blockchain Technology",
    role: "Web3 · Smart contracts · DApps",
    value: 85,
    blurb:
      "Blockchain-backed products and integrations: wallet flows, smart-contract patterns, indexing, and secure APIs—designed for clarity, auditability, and maintainable delivery.",
  },
  {
    name: "Retrieval-Augmented Generation (RAG)",
    role: "AI retrieval technique",
    value: 93,
    blurb:
      "RAG is an AI technique where the system retrieves relevant data (from documents, databases, PDFs, etc.), then the LLM generates an answer using that retrieved context.",
  },
] as const;

export const testimonials = [
  {
    name: "Rick O'connell",
    role: "Principal PM, cloud platform",
    quote:
      "They embedded an AI copilot into our admin console without destabilizing legacy APIs—clear docs, strong tests, and a calm rollout.",
    image: framerImages.testimonialAvatars[0],
  },
  {
    name: "Ellie Sattler",
    role: "Head of product, health tech",
    quote:
      "Jaxpat shipped our full-stack patient portal and mobile app together—auth, HIPAA-minded patterns, and a roadmap we still follow.",
    image: framerImages.testimonialAvatars[1],
  },
  {
    name: "Kate McCallister",
    role: "Director of engineering, IoT",
    quote:
      "Our edge gateways finally talk reliably to the cloud. Firmware updates, MQTT, and dashboards were delivered as one integrated package.",
    image: framerImages.testimonialAvatars[2],
  },
  {
    name: "Anne Weying",
    role: "Innovation lead, industrial",
    quote:
      "The VR training module they built cut onboarding time in half. Performance was smooth on our deployed headsets from day one.",
    image: framerImages.testimonialAvatars[3],
  },
  {
    name: "Eddie Brock",
    role: "CTO, logistics SaaS",
    quote:
      "From React front ends to Node services and background workers, the team owned the stack end-to-end and left us with runnable playbooks.",
    image: framerImages.testimonialAvatars[4],
  },
  {
    name: "John Fitzgerald",
    role: "Program manager, aerospace",
    quote:
      "They bridged embedded telemetry with our analytics warehouse—clear interfaces, sensible defaults, and engineers who understood safety culture.",
    image: framerImages.testimonialAvatars[5],
  },
] as const;

export const faqItems = [
  {
    q: "Do you integrate AI into existing products?",
    a: "Yes. We map your data sources, define guardrails, and ship incremental features—assistants, search, summarization, or workflow automation—with evaluation hooks and production monitoring.",
  },
  {
    q: "What does full-stack delivery include?",
    a: "Backend services, databases, APIs, web dashboards, auth, CI/CD, and cloud configuration. We stay close to your security and compliance requirements from design through launch.",
  },
  {
    q: "Can you build and publish mobile apps?",
    a: "We deliver App Store and Play Store releases, push notifications, offline modes where needed, and integrations with your identity provider and analytics stack.",
  },
  {
    q: "How do embedded and cloud pieces fit together?",
    a: "We design firmware interfaces, OTA strategy, and device-to-cloud protocols (MQTT, WebSockets, REST) so field hardware and your backend stay observable and maintainable.",
  },
  {
    q: "Do you work on VR, AR, or mixed reality?",
    a: "We prototype and ship immersive training, sales tools, and spatial UX in Unity or Unreal, including performance work for standalone headsets and tethered setups.",
  },
  {
    q: "How do we start an engagement?",
    a: "Reach out through the contact page with goals, timelines, and any constraints. We respond with a short discovery plan—scope, risks, and a sensible first milestone before larger commitments.",
  },
] as const;

export const pricingFeatures = [
  "Discovery & architecture workshop",
  "Dedicated engineers on your stack",
  "AI, web, mobile, or embedded scope",
  "Code reviews & documentation",
  "CI/CD and release support",
  "Security-minded defaults",
  "Slack or email collaboration",
] as const;

export const voiceGallery = ["/ai.png", "/brain.jpg", "/home.png", "/code.jpg"] as const;
