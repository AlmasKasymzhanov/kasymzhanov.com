import { IconlyArrowRight } from "@/components/iconly-icons";

export function ReadMore({ label = "Читать подробнее" }: { label?: string }) {
  return <span className="inline-flex items-center gap-2 text-[14px] font-normal text-[var(--personal-muted)] transition-colors duration-150 group-hover:text-[var(--personal-text)]">
    <span>{label}</span><IconlyArrowRight size={17} className="shrink-0" />
  </span>;
}
