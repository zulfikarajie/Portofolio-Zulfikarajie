import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import Reveal from "@/components/Reveal";
import { projects, getProject, getAdjacentProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProject(slug);

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
                <Link
                  href="/#projects"
                  className="transition-colors hover:text-paper"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-paper">
                {project.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/#projects"
            className="label-mono mt-6 inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2 transition-colors hover:bg-paper hover:text-dark"
          >
            ← Back to Projects
          </Link>

          <Reveal>
          <header className="mt-8 max-w-3xl">
            <p className="label-mono text-paper-muted">
              {project.role} · {project.year}
            </p>
            <h1
              data-testid="project-title"
              className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {project.title}
            </h1>
            <p className="mt-4 leading-relaxed text-paper-muted">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.status.map((t) => (
                <span
                  key={t}
                  className={`label-mono rounded-full px-3 py-1.5 ${
                    t === "Completed" ? "bg-green-700 text-white" : "bg-yellow-500 text-dark"
                  }`}
                >
                  {t}
                </span>
              ))}
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="label-mono rounded-full bg-card border border-card-line px-3 py-1.5 text-paper-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            {project.githubUrl && (
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="project-github"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-medium text-sm text-dark transition-colors hover:bg-blue-glow"
                >
                  View on GitHub <span aria-hidden>↗</span>
                </a>
              </div>
            )}
          </header>
          </Reveal>

          <Reveal className="mt-10">
            <ImageCarousel images={project.images} alt={project.title} />
          </Reveal>

          <Reveal className="mt-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Overview
              </h2>
              <p className="mt-4 leading-relaxed text-paper-muted">
                {project.overview}
              </p>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">
                Key features
              </h3>
              <ul className="mt-4 space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue to-orange"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="h-fit rounded-3xl border border-card-line bg-card p-6">
              <h3 className="label-mono text-paper-muted">Details</h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="label-mono text-paper-muted">Role</dt>
                  <dd className="mt-1 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="label-mono text-paper-muted">Year</dt>
                  <dd className="mt-1 font-medium">{project.year}</dd>
                </div>
                <div>
                  <dt className="label-mono text-paper-muted">Stack</dt>
                  <dd className="mt-1 font-medium">{project.tags.join(", ")}</dd>
                </div>
                {project.githubUrl && (
                  <div>
                    <dt className="label-mono text-paper-muted">Repository</dt>
                    <dd className="mt-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-glow underline-offset-4 hover:underline"
                      >
                        Open on GitHub ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
          </Reveal>

          <Reveal>
          <nav
            aria-label="More projects"
            className="mt-16 grid gap-4 border-t border-card-line pt-8 sm:grid-cols-2"
          >
            <div>
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  data-testid="project-prev"
                  className="block rounded-2xl border border-card-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="label-mono text-paper-muted">← Previous</span>
                  <span className="mt-2 block font-display font-medium">
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  data-testid="project-next"
                  className="block rounded-2xl border border-card-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="label-mono text-paper-muted">Next →</span>
                  <span className="mt-2 block font-display font-medium">
                    {next.title}
                  </span>
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
