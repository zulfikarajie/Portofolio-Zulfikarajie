export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  status: string[];
  href: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Hello Net - Educational Game",
    year: "2026",
    role: "Full-stack Development",
    description:
      "An Android educational game focused on teaching computer networking concepts for junior high school students, developed using the Godot Engine.",
    tags: ["Godot Engine","GDScript"],
    status: ["Completed"],
    href: "https://github.com/zulfikarajie/HelloNet---Game",
  },
  {
    id: "p2",
    title: "Moninven - Inventory & Maintenance Management System",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A professional and efficient web-based asset inventory and maintenance monitoring system, built with Laravel and PostgreSQL.",
    tags: ["Laravel", "Vue.js", "RESTFUL API", "PostgreSQL"],
    status: ["Completed"],
    href: "https://github.com/zulfikarajie/Moninven---Inventory-Maintenance-monitoring-System",
  },
  {
    id: "p3",
    title: "Semodia App - Motorcycle Buddy",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A mobile application for motorcycle enthusiasts, featuring service records and a motorcycle encyclopedia powered by a free API covering various motorcycle brands and models.",
    tags: ["Flutter", ".Dart", "RESTFUL API"],
    status: ["Completed"],
    href: "https://github.com/zulfikarajie/Semodia-Project-Akhir-Mobile",
  },
  {
    id: "p4",
    title: "SELFUEL - Self Service Fueling Apps",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A simple mobile self-service fueling application designed based on object-oriented design analysis.",
    tags: ["Flutter", ".Dart"],
    status: ["Completed"],
    href: "https://github.com/zulfikarajie/SELFUEL-FlutterMobileApps",
  },
  {
    id: "p5",
    title: "Simple Mobile Painter App",
    year: "2025",
    role: "Full-stack Development",
    description:
      "A simple mobile Painter application for drawing and painting.",
    tags: ["Flutter", ".Dart"],
    status: ["Completed"],
    href: "https://github.com/zulfikarajie/SImple-Mobile-Painter-App",
  },
  {
    id: "p6",
    title: "Property Management System - Web-based",
    year: "2026",
    role: "Back-end Development",
    description:
      "A professional and efficient web-based property management system, built with Laravel and PostgreSQL.",
    tags: ["Laravel", "PostgreSQL"],
    status: ["On Going"],
    href: "#",
  },
];
