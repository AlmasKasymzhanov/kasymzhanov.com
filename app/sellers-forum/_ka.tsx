// Forum handouts share the blog shell, typography, theme, and reading controls.
export const KA_CSS = `
  .ka-root { color: var(--personal-text); line-height: 1.65; }
  .ka-wrap { min-width: 0; }
  .ka-head { margin-bottom: 36px; }
  .ka-eyebrow { font-family: var(--font-mono); font-size: 12px; color: var(--personal-muted); margin-bottom: 16px; }
  .ka-back { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; font-size: 14px; color: var(--personal-muted); margin-bottom: 24px; }
  .ka-back:hover { color: var(--personal-text); }
  .ka-intro { color: var(--personal-muted); margin-top: 20px; }
  .ka-row, .ka-step { display: flex; gap: 20px; padding: 20px 0; color: inherit; }
  .ka-num { flex: 0 0 28px; font-family: var(--font-mono); font-size: 13px; padding-top: 4px; color: var(--personal-muted); }
  .ka-body { flex: 1; min-width: 0; }
  .ka-body h2, .ka-sec h2 { margin: 0 0 12px; font-weight: 400; }
  .ka-body p, .ka-sec p { color: var(--personal-muted); margin: 12px 0; }
  .ka-root b { color: var(--personal-text); font-weight: 500; }
  .ka-root a { text-decoration: none; transition: color 120ms ease-out; }
  .ka-root a:hover { color: var(--personal-muted); }
  .ka-go { display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 14px; color: var(--personal-muted); }
  .ka-row:hover .ka-go { color: var(--personal-text); }
  .ka-cmd { font-family: var(--font-mono); font-size: 13px; background: var(--reading-offer-surface); border-radius: 12px; padding: 16px 18px; margin: 16px 0; overflow-x: auto; white-space: pre-wrap; overflow-wrap: anywhere; }
  .ka-cmd .c { color: var(--personal-muted); }
  .ka-pin, .ka-qa { background: var(--reading-offer-surface); border-radius: 12px; padding: 14px 18px; margin: 16px 0; }
  .ka-os { font-family: var(--font-mono); font-size: 12px; color: var(--personal-muted); margin-right: 6px; }
  .ka-sec { margin-top: 36px; }
  .ka-sec ol { margin: 12px 0 0 20px; color: var(--personal-muted); list-style: decimal; }
  .ka-sec ol li { margin: 8px 0; padding-left: 4px; }
  .ka-trouble { margin-top: 40px; border-radius: 16px; background: var(--reading-offer-surface); padding: 24px; }
  .ka-trouble h3 { font-weight: 400; margin-bottom: 16px; }
  .ka-trouble dt { font-weight: 500; margin-top: 20px; }
  .ka-trouble dd { color: var(--personal-muted); margin-top: 6px; }
  @media(max-width: 480px) { .ka-step, .ka-row { gap: 12px; } .ka-trouble { padding: 20px; } }
`;

export function KaStyle() {
  return <style dangerouslySetInnerHTML={{ __html: KA_CSS }} />;
}
