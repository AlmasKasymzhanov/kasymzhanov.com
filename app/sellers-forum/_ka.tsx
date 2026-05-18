// Shared visual system for /sellers-forum/* — mirrors the install-guide style.
// Clean, minimal, no emoji. Light + auto-dark via prefers-color-scheme.

export const KA_CSS = `
  .ka-root{
    --bg:#ffffff;--ink:#101012;--dim:#6b6b70;--line:#e5e5e7;--soft:#f6f6f7;
    --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    background:var(--bg);color:var(--ink);font-family:var(--sans);
    -webkit-font-smoothing:antialiased;line-height:1.55;min-height:100vh;
  }
  @media (prefers-color-scheme:dark){
    .ka-root{--bg:#0c0c0d;--ink:#f3f3f4;--dim:#9a9aa0;--line:#262629;--soft:#161618}
  }
  .ka-wrap{max-width:760px;margin:0 auto;padding:64px 24px 120px}
  .ka-head{border-bottom:2px solid var(--ink);padding-bottom:28px;margin-bottom:8px}
  .ka-eyebrow{font-size:12px;letter-spacing:.22em;text-transform:uppercase;
    color:var(--dim);font-weight:600;margin-bottom:16px}
  .ka-back{display:inline-block;font-family:var(--mono);font-size:13px;
    color:var(--dim);text-decoration:none;margin-bottom:24px}
  .ka-back:hover{color:var(--ink)}
  .ka-wrap h1{font-size:clamp(28px,5vw,44px);line-height:1.08;
    letter-spacing:-.02em;font-weight:680;margin:0}
  .ka-intro{font-size:17px;color:var(--dim);margin-top:18px;max-width:60ch}
  .ka-row{display:flex;gap:22px;padding:34px 0;border-bottom:1px solid var(--line);
    text-decoration:none;color:inherit}
  .ka-row:hover .ka-go{opacity:1}
  .ka-step{display:flex;gap:22px;padding:34px 0;border-bottom:1px solid var(--line)}
  .ka-num{flex:0 0 auto;width:38px;height:38px;border:2px solid var(--ink);
    border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-weight:700;font-size:15px;font-family:var(--mono)}
  .ka-body{flex:1;min-width:0}
  .ka-body h2{font-size:21px;font-weight:660;letter-spacing:-.01em;margin:0 0 10px}
  .ka-body p{font-size:16px;color:var(--dim);margin:8px 0}
  .ka-body b{color:var(--ink);font-weight:600}
  .ka-body a{color:var(--ink);text-underline-offset:3px}
  .ka-go{display:inline-block;margin-top:14px;font-family:var(--mono);
    font-size:14px;color:var(--ink);opacity:.55;transition:opacity .15s}
  .ka-cmd{font-family:var(--mono);font-size:15px;background:var(--soft);
    border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin:14px 0;
    color:var(--ink);overflow-x:auto;white-space:pre-wrap;line-height:1.7}
  .ka-cmd .c{color:var(--dim)}
  .ka-pin{font-size:14px;background:var(--soft);border-left:3px solid var(--ink);
    padding:12px 16px;margin:14px 0;color:var(--ink)}
  .ka-pin b{font-weight:700}
  .ka-qa{font-family:var(--mono);font-size:15px;border-left:2px solid var(--ink);
    padding:6px 0 6px 18px;margin:10px 0;color:var(--ink)}
  .ka-os{display:inline-block;font-family:var(--mono);font-size:12px;
    border:1px solid var(--line);border-radius:6px;padding:2px 8px;
    color:var(--dim);margin-right:6px}
  .ka-sec{padding:34px 0;border-bottom:1px solid var(--line)}
  .ka-sec h2{font-size:21px;font-weight:660;letter-spacing:-.01em;margin:0 0 12px}
  .ka-sec p{font-size:16px;color:var(--dim);margin:10px 0}
  .ka-sec b{color:var(--ink);font-weight:600}
  .ka-sec ol{margin:12px 0 0 20px;color:var(--dim);font-size:16px}
  .ka-sec ol li{margin:8px 0;padding-left:6px}
  .ka-trouble{margin-top:48px;border:1px solid var(--line);border-radius:14px;
    padding:28px 30px}
  .ka-trouble h3{font-size:18px;font-weight:660;margin-bottom:16px}
  .ka-trouble dt{font-weight:600;font-size:15px;margin-top:16px}
  .ka-trouble dd{font-size:15px;color:var(--dim);margin-top:4px}
  .ka-foot{margin-top:48px;font-size:14px;color:var(--dim)}
  .ka-foot a{color:var(--ink);text-underline-offset:3px}
`;

export function KaStyle() {
  return <style dangerouslySetInnerHTML={{ __html: KA_CSS }} />;
}

export function KaFoot() {
  return (
    <div className="ka-foot">
      <a
        href="https://www.instagram.com/almas_kasymzhanov/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @almas_kasymzhanov
      </a>
    </div>
  );
}
