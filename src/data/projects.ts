export type Project = {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  description: string;
  overview: string;
  features: string[];
  tags: string[];
  status: string[];
  githubUrl?: string;
  images: string[];
  /** @deprecated use githubUrl + slug instead */
  href: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    slug: "hello-net-educational-game",
    title: "Hello Net - Educational Game",
    year: "2026",
    role: "Full-stack Development",
    description:
      "An Android educational game focused on teaching computer networking concepts for junior high school students, developed using the Godot Engine.",
    overview:
      "An Android educational game focused on teaching computer networking concepts for junior high school students, developed using the Godot Engine. Placeholder overview — replace with gameplay loop, learning goals, and your specific contributions.",
    features: [
      "Interactive networking lessons wrapped in game levels and quizzes.",
      "Progress tracking designed for junior high school students.",
      "Built with Godot Engine and GDScript for Android deployment.",
      "Playtested and iterated for clarity and engagement.",
    ],
    tags: ["Godot Engine", "GDScript"],
    status: ["Completed"],
    githubUrl: "https://github.com/zulfikarajie/HelloNet---Game",
    href: "https://github.com/zulfikarajie/HelloNet---Game",
    images: ["/images/hellonet.png"],
  },
  {
    id: "p2",
    slug: "moninven-inventory-maintenance",
    title: "Moninven - Inventory & Maintenance Management System",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A professional and efficient web-based asset inventory and maintenance monitoring system, built with Laravel and PostgreSQL.",
    overview:
      "A professional and efficient web-based asset inventory and maintenance monitoring system, built with Laravel and PostgreSQL. Placeholder overview — replace with modules, roles, and monitoring workflow.",
    features: [
      "Asset inventory CRUD with categorization and status tracking.",
      "Maintenance scheduling and monitoring dashboard.",
      "RESTful API backend with Laravel and PostgreSQL.",
      "Role-based access for admins and technicians.",
    ],
    tags: ["Laravel", "RESTFUL API", "PostgreSQL"],
    status: ["Completed"],
    githubUrl:
      "https://github.com/zulfikarajie/Moninven---Inventory-Maintenance-monitoring-System",
    href: "https://github.com/zulfikarajie/Moninven---Inventory-Maintenance-monitoring-System",
    images: ["/images/moninven.png"],
  },
  {
    id: "p3",
    slug: "semodia-motorcycle-buddy",
    title: "Semodia App - Motorcycle Buddy",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A mobile application for motorcycle enthusiasts, featuring service records and a motorcycle encyclopedia powered by a free API covering various motorcycle brands and models.",
    overview:
      "A mobile application for motorcycle enthusiasts, featuring service records and a motorcycle encyclopedia powered by a free API covering various motorcycle brands and models. Placeholder overview — replace with key screens and data flow.",
    features: [
      "Service record tracking with reminders.",
      "Motorcycle encyclopedia powered by a public API.",
      "Brand and model browsing with search.",
      "Built with Flutter and Dart for Android.",
    ],
    tags: ["Flutter", ".Dart", "RESTFUL API"],
    status: ["Completed"],
    githubUrl:
      "https://github.com/zulfikarajie/Semodia-Project-Akhir-Mobile",
    href: "https://github.com/zulfikarajie/Semodia-Project-Akhir-Mobile",
    images: ["/images/semodia.png"],
  },
  {
    id: "p4",
    slug: "selfuel-fuel-apps",
    title: "SELFUEL - Self Service Fueling Apps",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A simple mobile self-service fueling application designed based on object-oriented design analysis.",
    overview:
      "A simple mobile self-service fueling application designed based on object-oriented design analysis. Placeholder overview — replace with user flow and OOD highlights.",
    features: [
      "Self-service fuel ordering flow.",
      "Clean object-oriented design and analysis.",
      "Simple, focused mobile UI built with Flutter.",
      "Transaction history and receipts.",
    ],
    tags: ["Flutter", ".Dart"],
    status: ["Completed"],
    githubUrl: "https://github.com/zulfikarajie/SELFUEL-FlutterMobileApps",
    href: "https://github.com/zulfikarajie/SELFUEL-FlutterMobileApps",
    images: ["/images/selffuel.png"],
  },
  {
    id: "p5",
    slug: "simple-mobile-painter",
    title: "Simple Mobile Painter App",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A simple mobile Painter application for drawing and painting.",
    overview:
      "A simple mobile Painter application for drawing and painting. Placeholder overview — replace with canvas tools and brush engine details.",
    features: [
      "Freehand drawing canvas with color picker.",
      "Brush size control and undo support.",
      "Save and share artwork from device.",
      "Lightweight Flutter implementation.",
    ],
    tags: ["Flutter", ".Dart"],
    status: ["Completed"],
    githubUrl: "https://github.com/zulfikarajie/SImple-Mobile-Painter-App",
    href: "https://github.com/zulfikarajie/SImple-Mobile-Painter-App",
    images: ["/images/painterapp.png"],
  },
  {
    id: "p6",
    slug: "property-management-system",
    title: "Property Management System - Web-based",
    year: "2026",
    role: "Front-end Development",
    description:
      "A professional and efficient web-based property management system, built with React and PostgreSQL.",
    overview:
      "A professional and efficient web-based property management system, built with React and PostgreSQL. Placeholder overview — work in progress, replace as the system takes shape.",
    features: [
      "Property and tenant management modules.",
      "Payment and billing tracking.",
      "React frontend with PostgreSQL.",
      "Admin dashboard and reporting.",
    ],
    tags: ["React", "PostgreSQL"],
    status: ["On Going"],
    githubUrl: undefined,
    href: "#",
    images: ["/images/pmsinternal.png"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx < projects.length - 1 ? projects[idx + 1] : undefined,
  };
}
