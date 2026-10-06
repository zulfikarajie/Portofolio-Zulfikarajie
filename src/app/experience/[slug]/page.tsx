import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import Reveal from "@/components/Reveal";
import {
  experiences,
  getExperience,
  getAdjacentExperience,
} from "@/data/experience";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return { title: "Experience not found" };
  return {
    title: `${exp.role} — ${exp.company}`,
    description: exp.summary,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();
  const { prev, next } = getAdjacentExperience(slug);

  return (
    <>
      <Navbar />
      <main className="bg-section text-paper">
        <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:px-10 md:pt-32">
          <nav aria-label="Breadcrumb" className="label-mono text-paper-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-paper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#about" className="transition-colors hover:text-paper">
                  Experience
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-paper">
                {exp.role}
              </li>
            </ol>
          </nav>

          <Link
            href="/#about"
            className="label-mono mt-6 inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2 transition-colors hover:bg-paper hover:text-dark"
          >
            ← Back to About
          </Link>

          <Reveal>
          <header className="mt-8 max-w-3xl">
            <p data-testid="experience-period" className="label-mono text-paper-muted">
              {exp.period}
              {exp.location ? ` · ${exp.location}` : ""}
            </p>
            <h1
              data-testid="experience-title"
              className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {exp.role}
            </h1>
            <p data-testid="experience-company" className="mt-3 text-lg text-paper-muted">
              {exp.company}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="label-mono rounded-full border border-card-line bg-card px-3.5 py-2 text-orange-glow"
                >
                  {s}
                </span>
              ))}
            </div>
          </header>
          </Reveal>

          <Reveal className="mt-10">
            <ImageCarousel images={exp.images} alt={`${exp.role} at ${exp.company}`} />
          </Reveal>

          <Reveal className="mt-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What I did
              </h2>
              <p className="mt-4 leading-relaxed text-paper-muted">{exp.summary}</p>
              <ul className="mt-6 space-y-3">
                {exp.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue to-orange"
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="h-fit rounded-3xl border border-card-line bg-card p-6">
              <h3 className="label-mono text-paper-muted">At a glance</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="label-mono text-paper-muted">Role</dt>
                  <dd className="mt-1 font-medium">{exp.role}</dd>
                </div>
                <div>
                  <dt className="label-mono text-paper-muted">Company</dt>
                  <dd className="mt-1 font-medium">{exp.company}</dd>
                </div>
                <div>
                  <dt className="label-mono text-paper-muted">Period</dt>
                  <dd className="mt-1 font-medium">{exp.period}</dd>
                </div>
              </dl>
            </aside>
          </div>
          </Reveal>

          <Reveal>
          <nav
            aria-label="More experiences"
            className="mt-16 grid gap-4 border-t border-card-line pt-8 sm:grid-cols-2"
          >
            <div>
              {prev && (
                <Link
                  href={`/experience/${prev.slug}`}
                  data-testid="experience-prev"
                  className="group block rounded-2xl border border-card-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="label-mono text-paper-muted">← Previous</span>
                  <span className="mt-2 block font-display font-medium">{prev.role}</span>
                </Link>
              )}
            </div>
            <div className="sm:text-right">
              {next && (
                <Link
                  href={`/experience/${next.slug}`}
                  data-testid="experience-next"
                  className="group block rounded-2xl border border-card-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:text-left"
                >
                  <span className="label-mono text-paper-muted">Next →</span>
                  <span className="mt-2 block font-display font-medium">{next.role}</span>
                </Link>
              )}
            </div>
          </nav>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
