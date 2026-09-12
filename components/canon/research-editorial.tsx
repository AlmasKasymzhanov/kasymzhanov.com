import type { ReactNode } from "react";

/** Reading primitives: information is carried by words and alignment, never status colour. */
export function ResearchSection({ id, title, description, children }: {
  id?: string; title: string; description?: ReactNode; children: ReactNode;
}) {
  return <section id={id} className="research-section">
    <h2>{title.replace(/^\d+[.)]\s*/, "")}</h2>
    {description && <p className="research-section-description">{description}</p>}
    {children}
  </section>;
}

export function ResearchFact({ label, value, note }: {
  label: ReactNode; value: ReactNode; note?: ReactNode;
}) {
  return <dl className="research-fact">
    <dt>{label}</dt>
    <dd><span className="research-fact-value">{value}</span>{note && <span className="research-fact-note">{note}</span>}</dd>
  </dl>;
}

/** A compact, explicitly titled group of related facts, not a dashboard card grid. */
export function ResearchSummary({ title, children }: { title: string; children: ReactNode }) {
  return <div className="research-summary" role="group" aria-label={title}>
    <h3 className="research-summary-title">{title}</h3>
    <div className="research-facts">{children}</div>
  </div>;
}

export function ResearchNote({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return <div className="research-note">
    {title && <h3>{title}</h3>}
    <div className="research-note-body">{children}</div>
  </div>;
}

export function ResearchFigure({ title, caption, children }: {
  title?: ReactNode; caption?: ReactNode; children: ReactNode;
}) {
  return <figure className="research-figure">
    {title && <div className="research-figure-title">{title}</div>}
    {children}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
