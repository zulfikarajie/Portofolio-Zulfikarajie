export type Experience = {
  slug: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  images: string[];
};

export const experiences: Experience[] = [
  {
    slug: "it-intern-pdam-surya-sembada",
    role: "IT Internship at Internal Division",
    company: "PDAM Surya Sembada Kota Surabaya",
    period: "September 2025 - November 2025",
    location: "Surabaya, Indonesia",
    summary:
      "IT internship within the internal division, supporting day-to-day operations and internal systems. Placeholder summary — replace with what you actually did, the systems you touched, and the outcomes.",
    responsibilities: [
      "Provided first-line IT support for internal staff and administrative workflows.",
      "Assisted with monitoring and documentation of internal applications and assets.",
      "Helped troubleshoot hardware, network, and software issues alongside the IT team.",
      "Prepared reports and documentation for internal division activities.",
    ],
    skills: ["IT Support", "Networking", "Documentation", "Troubleshooting"],
    images: [],
  },
  {
    slug: "head-hr-hmif-upnvy",
    role: "Head of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
    period: "2025 — 2026",
    location: "Yogyakarta, Indonesia",
    summary:
      "Led the Human Resources division, overseeing recruitment, onboarding, and member development. Placeholder summary — replace with team size, programs you ran, and measurable impact.",
    responsibilities: [
      "Led HR planning, recruitment, and onboarding for new members.",
      "Designed performance tracking and member development programs.",
      "Coordinated with other divisions on staffing for events and projects.",
      "Built a positive organizational culture through regular evaluations.",
    ],
    skills: ["Leadership", "Recruitment", "Team Development", "Organization"],
    images: [],
  },
  {
    slug: "senior-staff-hr-hmif-upnvy",
    role: "Senior Staff of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
    period: "2024 — 2025",
    location: "Yogyakarta, Indonesia",
    summary:
      "Senior staff role focused on mentoring junior members and improving HR processes. Placeholder summary — replace with concrete contributions.",
    responsibilities: [
      "Mentored junior staff on HR workflows and responsibilities.",
      "Managed attendance, evaluations, and member databases.",
      "Supported event staffing and internal coordination.",
      "Proposed process improvements for recruitment and onboarding.",
    ],
    skills: ["Mentoring", "Administration", "Coordination"],
    images: [],
  },
  {
    slug: "junior-staff-hr-hmif-upnvy",
    role: "Junior Staff of Human Resources Division",
    company: "Himpunan Mahasiswa Informatika UPN Veteran Yogyakarta",
    period: "2023 — 2024",
    location: "Yogyakarta, Indonesia",
    summary:
      "Entry-level organizational role supporting HR administration and events. Placeholder summary — replace with what you learned and delivered.",
    responsibilities: [
      "Supported recruitment administration and member data collection.",
      "Assisted in organizing internal meetings and events.",
      "Helped prepare HR reports and documentation.",
      "Learned organizational workflows and teamwork fundamentals.",
    ],
    skills: ["Teamwork", "Administration", "Communication"],
    images: [],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getAdjacentExperience(slug: string): {
  prev: Experience | undefined;
  next: Experience | undefined;
} {
  const idx = experiences.findIndex((e) => e.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? experiences[idx - 1] : undefined,
    next: idx < experiences.length - 1 ? experiences[idx + 1] : undefined,
  };
}
