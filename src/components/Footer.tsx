export default function Footer() {
  return (
    <footer className="bg-light border-t border-light-line py-8">
      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 label-mono text-ink-muted">
        <p>© {new Date().getFullYear()} Zulfikar Ajie Pangarso</p>
        <p>Contact for more information.</p>
      </div>
    </footer>
  );
}
