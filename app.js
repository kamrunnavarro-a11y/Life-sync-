// LifeSync - compiled app
function bootApp() {
  try {
    var React = window.React;
    var useState = window.useState;
    var useEffect = window.useEffect;
    var useRef = window.useRef;
    var useCallback = window.useCallback;
    var useMemo = window.useMemo;

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
  :root {
    --bg:#050505;--surface:#0f0a0a;--surface2:#1a0e0e;--surface3:#241414;
    --border:rgba(255,77,77,0.14);--border-bright:rgba(255,77,77,0.34);
    --text:#fff5f5;--text-muted:#b08a8a;--text-dim:#6a4040;
    --rose:#ff3344;--violet:#e11d2e;--indigo:#a83333;
    --mint:#4ade80;--gold:#fbbf24;--peach:#ff6b6b;--sky:#d97757;--red:#ff1a2e;
    --glow-rose:0 0 30px rgba(255,51,68,0.45);
    --glow-violet:0 0 30px rgba(225,29,46,0.5);
    --glow-mint:0 0 30px rgba(74,222,128,0.3);
    --glow-gold:0 0 24px rgba(251,191,36,0.45);
    --grad-rose:linear-gradient(135deg,#ff1a2e,#7a0a14);
    --grad-violet:linear-gradient(135deg,#e11d2e,#1a0606);
    --grad-mint:linear-gradient(135deg,#ff3344,#d97757);
    --grad-gold:linear-gradient(135deg,#fbbf24,#ff6b6b);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:rgba(225,29,46,0.3);border-radius:2px}
  body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")}
  .orb{position:fixed;border-radius:50%;filter:blur(130px);opacity:0.07;pointer-events:none;z-index:0;animation:drift 22s ease-in-out infinite alternate}
  .orb1{width:600px;height:600px;background:#e11d2e;top:-200px;right:-80px}
  .orb2{width:500px;height:500px;background:#ff1a2e;bottom:-150px;left:-80px;animation-delay:-8s}
  .orb3{width:380px;height:380px;background:#7fffd4;top:40%;left:38%;animation-delay:-15s}
  @keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(28px,18px) scale(1.08)}}
  .app{position:relative;z-index:1;display:flex;min-height:100vh}
  .sidebar{width:66px;flex-shrink:0;background:rgba(13,10,22,0.88);backdrop-filter:blur(24px);
    border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;
    padding:18px 0;gap:4px;position:sticky;top:0;height:100vh;transition:width 0.22s ease;z-index:100}
  .sidebar.ex{width:218px;align-items:stretch;padding:18px 10px}
  .s-logo{width:38px;height:38px;border-radius:13px;background:var(--grad-rose);display:flex;
    align-items:center;justify-content:center;font-size:17px;margin-bottom:6px;
    box-shadow:var(--glow-rose);flex-shrink:0;cursor:pointer;transition:transform 0.2s}
  .s-logo:hover{transform:scale(1.06)}
  .s-logo-text{font-family:'DM Serif Display',serif;font-size:14px;color:var(--text);white-space:nowrap}
  .ni{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.18s;color:var(--text-muted);position:relative;font-size:19px;flex-shrink:0}
  .sidebar.ex .ni{width:100%;justify-content:flex-start;padding:0 11px;gap:11px}
  .ni:hover{background:rgba(225,29,46,0.1);color:var(--violet)}
  .ni.active{background:rgba(225,29,46,0.14);color:var(--violet);box-shadow:inset 0 0 0 1px rgba(225,29,46,0.18)}
  .ni .nl{font-size:12.5px;font-weight:500;white-space:nowrap;display:none}
  .sidebar.ex .ni .nl{display:block}
  .nbadge{min-width:15px;height:15px;background:var(--rose);border-radius:7px;font-size:9px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 3px;margin-left:auto}
  .sdiv{width:28px;height:1px;background:var(--border);margin:3px 0}
  .sidebar.ex .sdiv{width:100%}
  .main{flex:1;overflow-y:auto;padding:26px 30px;max-width:1180px}
  @media(max-width:768px){
    .sidebar{display:none}
    .main{padding:14px 14px 80px}
    .mob-nav{position:fixed;bottom:0;left:0;right:0;z-index:200;
      background:rgba(13,10,22,0.96);backdrop-filter:blur(24px);
      border-top:1px solid var(--border);
      display:flex;justify-content:space-around;padding:8px 0 max(8px,env(safe-area-inset-bottom))}
    .mob-ni{display:flex;flex-direction:column;align-items:center;gap:3px;
      font-size:9.5px;color:var(--text-muted);cursor:pointer;padding:4px 8px;border-radius:10px;transition:all 0.18s}
    .mob-ni.active{color:var(--violet)}
  }
  @media(min-width:769px){.mob-nav{display:none}}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:20px;
    position:relative;overflow:hidden;transition:border-color 0.2s}
  .card:hover{border-color:var(--border-bright)}
  .card.gr{box-shadow:var(--glow-rose);border-color:rgba(255,51,68,0.18)}
  .card.gv{box-shadow:var(--glow-violet);border-color:rgba(225,29,46,0.18)}
  .card.gm{box-shadow:var(--glow-mint);border-color:rgba(127,255,212,0.18)}
  .card.gg{box-shadow:var(--glow-gold);border-color:rgba(255,215,0,0.18)}
  .sc{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:16px;
    display:flex;flex-direction:column;gap:7px;transition:all 0.2s}
  .sc:hover{transform:translateY(-2px);border-color:var(--border-bright)}
  .si{width:40px;height:40px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:19px}
  .sv{font-size:24px;font-weight:700;letter-spacing:-0.5px;line-height:1}
  .sl{font-size:12px;color:var(--text-muted);font-weight:500}
  .ss{font-size:11px;color:var(--text-dim)}
  .pb{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden}
  .pf{height:100%;border-radius:3px;transition:width 0.9s cubic-bezier(.4,0,.2,1)}
  .b{display:inline-flex;align-items:center;gap:3px;padding:3px 9px;border-radius:20px;font-size:10.5px;font-weight:600}
  .br{background:rgba(255,51,68,0.14);color:var(--rose)}
  .bv{background:rgba(225,29,46,0.14);color:var(--violet)}
  .bm{background:rgba(127,255,212,0.14);color:var(--mint)}
  .bg{background:rgba(255,215,0,0.14);color:var(--gold)}
  .bi{background:rgba(139,158,255,0.14);color:var(--indigo)}
  .bp{background:rgba(255,185,151,0.14);color:var(--peach)}
  .bs{background:rgba(135,206,235,0.14);color:var(--sky)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;
    padding:9px 18px;border-radius:11px;font-family:'Sora',sans-serif;
    font-size:12.5px;font-weight:600;cursor:pointer;transition:all 0.18s;border:none;outline:none}
  .btn-p{background:var(--grad-rose);color:#fff;box-shadow:0 4px 18px rgba(255,51,68,0.3)}
  .btn-p:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(255,51,68,0.42)}
  .btn-s{background:rgba(225,29,46,0.1);color:var(--violet);border:1px solid rgba(225,29,46,0.2)}
  .btn-s:hover{background:rgba(225,29,46,0.18)}
  .btn-g{background:transparent;color:var(--text-muted)}
  .btn-g:hover{color:var(--text);background:rgba(255,255,255,0.05)}
  .btn-sm{padding:5px 12px;font-size:11.5px;border-radius:8px}
  .btn-ic{padding:7px;border-radius:10px;min-width:34px;height:34px}
  .btn-danger{background:rgba(255,77,109,0.12);color:var(--red);border:1px solid rgba(255,77,109,0.2)}
  .btn-danger:hover{background:rgba(255,77,109,0.2)}
  .inp{background:var(--surface2);border:1px solid var(--border);border-radius:11px;
    padding:9px 13px;color:var(--text);font-family:'Sora',sans-serif;font-size:13.5px;width:100%;
    transition:border-color 0.2s}
  .inp:focus{outline:none;border-color:rgba(225,29,46,0.4);box-shadow:0 0 0 3px rgba(225,29,46,0.08)}
  .inp::placeholder{color:var(--text-dim)}
  textarea.inp{resize:vertical;min-height:80px}
  select.inp{cursor:pointer}
  .sh{margin-bottom:18px}
  .st{font-size:21px;font-weight:700;letter-spacing:-0.3px}
  .ss2{font-size:12.5px;color:var(--text-muted);margin-top:3px}
  .tabs{display:flex;gap:3px;background:var(--surface);border-radius:13px;padding:4px;flex-wrap:wrap}
  .tab{padding:7px 15px;border-radius:9px;font-size:12.5px;font-weight:500;cursor:pointer;transition:all 0.18s;color:var(--text-muted)}
  .tab.active{background:rgba(225,29,46,0.14);color:var(--violet)}
  .tab:hover:not(.active){color:var(--text)}
  @keyframes flame{0%,100%{transform:scaleY(1) rotate(-2deg)}50%{transform:scaleY(1.1) rotate(2deg)}}
  .fl{display:inline-block;animation:flame 1.5s ease-in-out infinite;transform-origin:bottom}
  .hr{display:flex;align-items:center;gap:11px;padding:13px 15px;border-radius:15px;
    border:1px solid var(--border);background:var(--surface);transition:all 0.18s;cursor:pointer}
  .hr:hover{border-color:var(--border-bright);background:var(--surface2)}
  .hr.done{border-color:rgba(127,255,212,0.2);background:rgba(127,255,212,0.04)}
  .hc{width:23px;height:23px;border-radius:7px;border:2px solid var(--border-bright);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.18s;font-size:12px}
  .hr.done .hc{background:var(--mint);border-color:var(--mint);box-shadow:var(--glow-mint)}
  .xb{height:7px;background:var(--surface2);border-radius:4px;overflow:hidden}
  .xf{height:100%;background:var(--grad-gold);border-radius:4px;transition:width 0.9s ease}
  .ach{display:flex;align-items:center;gap:13px;padding:13px 15px;border-radius:15px;
    border:1px solid var(--border);background:var(--surface);transition:all 0.18s}
  .ach.ul{border-color:rgba(255,215,0,0.28);background:rgba(255,215,0,0.04)}
  .ai2{width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:23px;flex-shrink:0}
  .ai2.lk{filter:grayscale(1) opacity(0.25)}
  .cb{padding:11px 15px;border-radius:15px;font-size:13.5px;line-height:1.6;max-width:86%}
  .cb.user{background:var(--grad-violet);color:#fff;margin-left:auto;border-bottom-right-radius:4px}
  .cb.ai{background:var(--surface2);color:var(--text);border:1px solid var(--border);border-bottom-left-radius:4px}
  @keyframes pdim{0%,100%{opacity:1}50%{opacity:0.45}}
  .cb.loading{animation:pdim 1.4s ease-in-out infinite}
  .ring-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center}
  .ring-label{position:absolute;text-align:center;pointer-events:none}
  .bar-chart{display:flex;align-items:flex-end;gap:3px}
  .bar-chart .bar{border-radius:4px 4px 0 0;min-height:3px;transition:height 0.55s ease}
  .toasts{position:fixed;top:18px;right:18px;z-index:9999;display:flex;flex-direction:column;gap:7px;pointer-events:none}
  .toast{background:var(--surface2);border:1px solid var(--border-bright);border-radius:13px;
    padding:13px 17px;display:flex;align-items:center;gap:11px;font-size:12.5px;
    box-shadow:0 8px 30px rgba(0,0,0,0.45);animation:tin 0.32s cubic-bezier(.34,1.56,.64,1);max-width:300px}
  .toast.success{border-color:rgba(127,255,212,0.28)}
  .toast.error{border-color:rgba(255,51,68,0.28)}
  .toast.xp{border-color:rgba(255,215,0,0.28)}
  @keyframes tin{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
  .overlay{position:fixed;inset:0;z-index:1000;background:rgba(8,6,16,0.82);
    backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;
    padding:18px;animation:fin 0.18s ease}
  .modal{background:var(--surface);border:1px solid var(--border-bright);border-radius:22px;
    padding:26px;width:100%;max-width:470px;max-height:90vh;overflow-y:auto;
    animation:min 0.28s cubic-bezier(.34,1.56,.64,1)}
  @keyframes fin{from{opacity:0}to{opacity:1}}
  @keyframes min{from{transform:scale(0.88) translateY(22px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
  .cup{width:34px;height:40px;border:2px solid var(--border-bright);border-radius:3px 3px 8px 8px;
    cursor:pointer;overflow:hidden;position:relative;transition:all 0.2s;flex-shrink:0}
  .cup.filled{border-color:var(--sky)}
  .cup-fill{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(180deg,rgba(135,206,235,0.6),rgba(135,206,235,0.9));transition:height 0.4s cubic-bezier(.34,1.56,.64,1)}
  .cup:hover{transform:scale(1.06)}
  @keyframes splash{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
  .cup.splash{animation:splash 0.35s ease}
  .hm-cell{width:18px;height:18px;border-radius:4px;cursor:default;transition:transform 0.15s}
  .hm-cell:hover{transform:scale(1.3)}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  @media(max-width:900px){.g4{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr}}
  .pe{animation:pi 0.3s ease}
  @keyframes pi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .search-bar{position:fixed;top:0;left:0;right:0;z-index:2000;background:rgba(10,8,18,0.96);
    backdrop-filter:blur(20px);border-bottom:1px solid var(--border-bright);
    padding:16px 24px;animation:fin 0.18s ease;display:flex;gap:12px;align-items:center}
  .flex{display:flex}.fac{align-items:center}.fjb{justify-content:space-between}
  .gap2{gap:8px}.gap3{gap:12px}.gap4{gap:16px}
  .mb2{margin-bottom:8px}.mb3{margin-bottom:12px}.mb4{margin-bottom:16px}
  .mt2{margin-top:8px}.mt4{margin-top:16px}.w100{width:100%}
  .tm{color:var(--text-muted)}.tsm{font-size:12.5px}.txs{font-size:11px}
  .fb{font-weight:700}.fs{font-weight:600}
  .divider{height:1px;background:var(--border);margin:14px 0}
  .label{font-size:11.5px;color:var(--text-muted);display:block;margin-bottom:5px;font-weight:500}
  .sp{margin-bottom:20px}
  /* ── Mobile UX polish ─────────────────────────────────────────────────────
     Kills the 300ms tap delay + accidental double-tap zoom on every
     interactive element, locks background scroll when a modal is open
     (so the page underneath can't scroll-chain), and bumps form input
     font-size to 16px on phones so iOS Safari stops auto-zooming on focus. */
  .btn,.ni,.mob-ni,.tab,.hr,.hc,.cup,.sc,.card,.ach,.hm-cell,.s-logo,
  button,[role="button"],a,select,input[type="checkbox"],input[type="radio"]{
    touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  .overlay{overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
  .modal{overscroll-behavior:contain}
  body:has(.overlay){overflow:hidden}
  body:has(.search-bar){overflow:hidden}
  @supports not selector(:has(*)){
    /* Fallback: a JS-set class on <body> when an overlay opens. */
    body.modal-open{overflow:hidden}
  }
  @media(max-width:768px){
    /* iOS Safari auto-zooms any input with computed font-size < 16px on
       focus. Force every form control to 16px on phones to stop that. */
    .inp,input.inp,textarea.inp,select.inp,input,textarea,select{
      font-size:16px !important}
    /* Min 44×44 tap targets per Apple HIG. */
    .mob-ni{min-width:44px;min-height:44px;padding:6px 10px}
    .btn{min-height:44px}
    .btn-sm{min-height:36px;padding:7px 14px}
    .btn-ic{min-width:44px;min-height:44px}
    .hc{width:28px;height:28px}
    .hr{min-height:52px}
    .cup{min-width:38px;min-height:44px}
    /* Honor side safe-area on notched devices. */
    .main{
      padding-left:max(14px,env(safe-area-inset-left));
      padding-right:max(14px,env(safe-area-inset-right))}
    /* Modal sits above safe areas. */
    .modal{
      padding-bottom:max(26px,env(safe-area-inset-bottom));
      max-height:calc(100vh - env(safe-area-inset-top) - 20px)}
  }
`;
const PATHS = {
    dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    nutrition: "M12 2a10 10 0 1 0 0 20 M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01",
    fitness: "M6 4v16 M18 4v16 M6 12h12 M3 8h3 M18 8h3",
    habits: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
    skin: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    budget: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    goals: "M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
    ai: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    progress: "M23 6l-9.5 9.5-5-5L1 18",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    plus: "M12 5v14 M5 12h14", x: "M18 6L6 18 M6 6l12 12", check: "M20 6L9 17l-5-5",
    send: "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
    lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
    search: "M21 21l-4.35-4.35 M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
    download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
    sleep: "M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z",
    body: "M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 22v-4a6 6 0 0 1 12 0v4",
    journal: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
    cycle: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 6v6l4 2",
    bill: "M9 14l2 2 4-4 M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    clipboard: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M9 2h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z",
    refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
    schedule: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M18 2H6v7a6 6 0 0 0 12 0V2z",
};
function Ic(_a) {
    var { n, size = 20, color = "currentColor" } = _a, p = __rest(_a, ["n", "size", "color"]);
    const d = PATHS[n] || PATHS.star;
    return (React.createElement("svg", Object.assign({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, p), d.split(" M").map((seg, i) => React.createElement("path", { key: i, d: i === 0 ? seg : "M" + seg }))));
}
function useToast() {
    const [toasts, setToasts] = useState([]);
    const toast = useCallback((msg, type = "success") => {
        const id = Date.now() + Math.random();
        setToasts(t => [...t, { id, msg, type }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
    }, []);
    return { toasts, toast };
}
function Toasts({ toasts }) {
    const icons = { success: "✨", error: "⚠️", xp: "⭐" };
    return (React.createElement("div", { className: "toasts" }, toasts.map(t => React.createElement("div", { key: t.id, className: `toast ${t.type}` },
        React.createElement("span", null, icons[t.type] || "✨"),
        React.createElement("span", null, t.msg)))));
}
// ══ PWA REGISTRATION + NOTIFICATIONS ════════════════════════════════════════
function usePWA(data, toast) {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [installed, setInstalled] = useState(false);
    const [notifStatus, setNotifStatus] = useState(typeof Notification !== "undefined" ? Notification.permission : "unsupported");
    // Register service worker
    useEffect(() => {
        if (!("serviceWorker" in navigator))
            return;
        navigator.serviceWorker.register("/sw.js").then(reg => {
            console.log("[LifeSync] SW registered", reg.scope);
        }).catch(e => console.warn("[LifeSync] SW failed", e));
    }, []);
    // Catch install prompt (Chrome/Edge/Android)
    useEffect(() => {
        const handler = e => { e.preventDefault(); setInstallPrompt(e); };
        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", () => setInstalled(true));
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches)
            setInstalled(true);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);
    // Schedule local reminder notifications
    useEffect(() => {
        var _a;
        if (notifStatus !== "granted")
            return;
        const timers = [];
        // 8pm habit reminder — only if habits not all done
        const scheduleHabitReminder = () => {
            const now = new Date();
            const target = new Date(now);
            target.setHours(20, 0, 0, 0);
            if (target <= now)
                target.setDate(target.getDate() + 1);
            const ms = target - now;
            timers.push(setTimeout(() => {
                const done = data.habits.filter(h => h.doneToday).length;
                const total = data.habits.length;
                if (done < total) {
                    new Notification("LifeSync ✨", {
                        body: `${total - done} habit${total - done > 1 ? "s" : ""} left today — don't break your streak! 🔥`,
                        icon: "/icon-192.png", tag: "habits",
                    });
                }
                scheduleHabitReminder(); // reschedule for tomorrow
            }, ms));
        };
        // Water reminder every 2 hours during waking hours (8am–10pm)
        const scheduleWaterReminder = () => {
            var _a, _b, _c;
            const now = new Date();
            const h = now.getHours();
            if (h >= 8 && h < 22) {
                const water = ((_b = (_a = data.nutrition) === null || _a === void 0 ? void 0 : _a.water) === null || _b === void 0 ? void 0 : _b.current) || 0;
                const goal = ((_c = data.settings) === null || _c === void 0 ? void 0 : _c.waterGoal) || 8;
                if (water < goal) {
                    timers.push(setTimeout(() => {
                        new Notification("💧 Water time!", {
                            body: `${water} of ${goal} cups logged. Stay hydrated! `,
                            icon: "/icon-192.png", tag: "water",
                        });
                        scheduleWaterReminder();
                    }, 2 * 60 * 60 * 1000));
                }
            }
        };
        // Bill due-soon alert — check once on load
        const billsDueSoon = (((_a = data.budget) === null || _a === void 0 ? void 0 : _a.bills) || []).filter(b => {
            if (b.paid)
                return false;
            const today = new Date().getDate();
            return b.dueDay >= today && b.dueDay <= today + 3;
        });
        if (billsDueSoon.length > 0) {
            setTimeout(() => {
                new Notification("💰 Bills due soon", {
                    body: billsDueSoon.map(b => `${b.emoji} ${b.name} — $${b.amount} due ${b.dueDay}th`).join("\n"),
                    icon: "/icon-192.png", tag: "bills",
                });
            }, 3000);
        }
        scheduleHabitReminder();
        scheduleWaterReminder();
        return () => timers.forEach(clearTimeout);
    }, [notifStatus, data.habits, data.nutrition, data.settings, data.budget]);
    const requestNotifs = async () => {
        if (typeof Notification === "undefined")
            return;
        const result = await Notification.requestPermission();
        setNotifStatus(result);
        if (result === "granted")
            toast("Notifications enabled! 🔔", "success");
    };
    const install = async () => {
        if (!installPrompt)
            return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === "accepted") {
            setInstalled(true);
            toast("LifeSync installed! 🎉", "success");
        }
        setInstallPrompt(null);
    };
    return { installed, installPrompt, notifStatus, requestNotifs, install };
}
// ══ ZEPP SYNC HOOK ═══════════════════════════════════════════════════════════
// Polls localStorage for the zepp_last_sync key that the Zepp Side Service
// writes after each BLE sync. When new data arrives, merges it into LifeSync.
function useZeppSync(setData, toast) {
    const [syncState, setSyncState] = useState(() => {
        try {
            const s = localStorage.getItem("zepp_last_sync");
            return s ? JSON.parse(s) : null;
        }
        catch (_a) {
            return null;
        }
    });
    // Poll every 5s — only updates syncState (pure, no side effects)
    useEffect(() => {
        const interval = setInterval(() => {
            try {
                const raw = localStorage.getItem("zepp_last_sync");
                if (!raw)
                    return;
                const parsed = JSON.parse(raw);
                setSyncState(prev => {
                    if (!prev || parsed.timestamp > prev.timestamp)
                        return parsed;
                    return prev;
                });
            }
            catch (_a) { }
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    // React to new syncState — pull merged data from localStorage into app state
    const prevTsRef = useRef(0);
    useEffect(() => {
        var _a, _b, _c;
        if (!syncState)
            return;
        if (syncState.timestamp <= prevTsRef.current)
            return;
        prevTsRef.current = syncState.timestamp;
        try {
            const fullRaw = localStorage.getItem(profileStorageKey(sbUid()));
            if (!fullRaw)
                return;
            const fresh = JSON.parse(fullRaw);
            if (!fresh.zeppSync)
                return;
            setData(d => (Object.assign(Object.assign({}, d), { zeppSync: fresh.zeppSync, sleep: fresh.sleep || d.sleep, habits: fresh.habits || d.habits })));
            toast(`⌚ Amazfit synced · ${((_b = (_a = syncState.summary) === null || _a === void 0 ? void 0 : _a.steps) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "—"} steps · ${((_c = syncState.summary) === null || _c === void 0 ? void 0 : _c.sleepHours) || "—"}h sleep`, "success");
        }
        catch (_d) { }
    }, [syncState, setData, toast]);
    return syncState;
}
// ══ HEALTH AUTO EXPORT (iOS) → APPLE HEALTH BRIDGE ═══════════════════════════
// Merges a Health Auto Export JSON payload into the user's data. The iOS
// app "Health Auto Export – JSON+CSV" posts a body shaped like:
//   { data: { metrics: [ { name, units, data: [ {date, qty|Avg|Min|Max...} ] } ] } }
function mergeHaePayload(prev, payload) {
    if (!payload || !payload.data || !Array.isArray(payload.data.metrics)) return prev;
    const next = JSON.parse(JSON.stringify(prev || {}));
    next.zeppSync = next.zeppSync || {};
    next.zeppSync.device = next.zeppSync.device || {};
    next.zeppSync.heartRate = next.zeppSync.heartRate || {};
    next.zeppSync.activity = next.zeppSync.activity || {};
    next.sleep = next.sleep || { logs: [] };
    next.sleep.logs = Array.isArray(next.sleep.logs) ? next.sleep.logs : [];

    const today = new Date().toISOString().slice(0, 10);
    const stepsByDate = {};
    let lastHR = null, restingHR = null;
    let caloriesToday = 0, distanceToday = 0;

    for (const m of payload.data.metrics) {
        const name = String(m.name || "").toLowerCase();
        const samples = Array.isArray(m.data) ? m.data : [];
        if (name === "step_count" || name === "steps") {
            for (const s of samples) {
                const d = String(s.date || "").slice(0, 10);
                if (!d) continue;
                stepsByDate[d] = (stepsByDate[d] || 0) + (Number(s.qty) || 0);
            }
        } else if (name === "heart_rate") {
            for (const s of samples) {
                if (s.Avg != null) lastHR = Math.round(Number(s.Avg));
                else if (s.qty != null) lastHR = Math.round(Number(s.qty));
                if (s.Min != null) {
                    const mn = Math.round(Number(s.Min));
                    restingHR = restingHR == null ? mn : Math.min(restingHR, mn);
                }
            }
        } else if (name === "resting_heart_rate") {
            for (const s of samples) {
                if (s.qty != null) restingHR = Math.round(Number(s.qty));
            }
        } else if (name === "sleep_analysis") {
            for (const s of samples) {
                const date = String(s.sleepStart || s.date || s.startDate || "").slice(0, 10);
                const hours = Number(s.asleep != null ? s.asleep : (s.inBed != null ? s.inBed : 0));
                if (!date || !hours) continue;
                if (next.sleep.logs.find(l => l.date === date && /HealthKit/i.test(l.notes || ""))) continue;
                next.sleep.logs.unshift({
                    date,
                    hours: +Number(hours).toFixed(2),
                    quality: hours >= 7 ? 4 : hours >= 6 ? 3 : 2,
                    notes: "Synced from HealthKit",
                });
            }
            next.sleep.logs = next.sleep.logs.slice(0, 120);
        } else if (name === "active_energy") {
            for (const s of samples) {
                const d = String(s.date || "").slice(0, 10);
                if (d === today) caloriesToday += Number(s.qty) || 0;
            }
        } else if (name === "walking_running_distance" || name === "distance_walking_running") {
            for (const s of samples) {
                const d = String(s.date || "").slice(0, 10);
                if (d === today) distanceToday += Number(s.qty) || 0;
            }
        } else if (name === "blood_oxygen_saturation") {
            const latest = samples[samples.length - 1];
            if (latest && latest.qty != null) {
                const v = Number(latest.qty);
                next.zeppSync.spo2 = { current: v <= 1 ? Math.round(v * 100) : Math.round(v) };
            }
        }
    }

    if (Object.keys(stepsByDate).length) {
        const todayKey = today in stepsByDate ? today : Object.keys(stepsByDate).sort().pop();
        next.zeppSync.activity.steps = Math.round(stepsByDate[todayKey] || 0);
    }
    if (lastHR != null) next.zeppSync.heartRate.last = lastHR;
    if (restingHR != null) next.zeppSync.heartRate.resting = restingHR;
    if (caloriesToday > 0) next.zeppSync.activity.caloriesBurned = Math.round(caloriesToday);
    if (distanceToday > 0) {
        // Health Auto Export distance unit is km by default; store as meters
        next.zeppSync.activity.distanceMeters = Math.round(distanceToday * 1000);
    }
    next.zeppSync.device.lastSync = new Date().toLocaleString();
    return next;
}

// Per-profile webhook token storage key in Supabase: hae-tok-<profileId>
// Inbox of queued payloads: hae-inbox-<profileId>
function haeTokenKey(id) { return `hae-tok-${id}`; }
function haeWebhookUrl(profileId, token) {
    return `${window.location.origin}/api/health-webhook?profile=${encodeURIComponent(profileId)}&token=${token}`;
}

// Background drain hook — pulls queued payloads from server inbox every 60s
// and merges them into data.
function useHealthWebhookSync(setData, toast) {
    useEffect(() => {
        let cancelled = false;
        let intervalId = null;
        const profile = sbUid();
        const tokKey = haeTokenKey(profile);
        let tok = null;

        const loadToken = async () => {
            try {
                const r = await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${tokKey}&select=data`, { headers: SB_HDR });
                if (!r.ok) return;
                const rows = await r.json();
                tok = (rows && rows[0] && rows[0].data && rows[0].data.token) || null;
            } catch (_) { }
        };

        const drain = async () => {
            if (!tok || cancelled) return;
            try {
                const r = await fetch(haeWebhookUrl(profile, tok));
                if (!r.ok) return;
                const j = await r.json();
                const items = Array.isArray(j.items) ? j.items : [];
                if (items.length === 0) return;
                setData(prev => items.reduce((acc, it) => mergeHaePayload(acc, it.payload), prev));
                toast(`⌚ Apple Health synced · ${items.length} update${items.length === 1 ? "" : "s"}`, "success");
            } catch (_) { }
        };

        const start = () => {
            if (intervalId || cancelled || !tok) return;
            drain();
            intervalId = setInterval(drain, 60000);
        };
        const stop = () => {
            if (intervalId) { clearInterval(intervalId); intervalId = null; }
        };

        (async () => {
            await loadToken();
            if (cancelled) return;
            start();
        })();

        // Listen for token changes from HealthWebhookPanel so sync starts/stops
        // immediately without requiring a page reload.
        const onTokenChange = e => {
            const detail = (e && e.detail) || {};
            tok = detail.token || null;
            if (tok) start(); else stop();
        };
        window.addEventListener("lifesync:hae-token-changed", onTokenChange);

        return () => {
            cancelled = true;
            stop();
            window.removeEventListener("lifesync:hae-token-changed", onTokenChange);
        };
    }, [setData, toast]);
}

// ══ ZEPP SYNC PANEL (shown in Settings) ══════════════════════════════════════
function ZeppSyncPanel({ data, setData, toast }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const syncState = useZeppSync(setData, toast);
    const zs = data.zeppSync;
    const connected = !!zs;
    const stressLabel = v => { if (!v)
        return "—"; if (v < 30)
        return "Relaxed 😌"; if (v < 60)
        return "Moderate 😐"; if (v < 80)
        return "High 😰"; return "Very High 😨"; };
    const wearLabel = w => { if (w === 1 || w === 2)
        return "✓ Wearing"; if (w === 0)
        return "Off wrist"; return "—"; };
    return (React.createElement("div", { className: "card", style: { borderColor: connected ? "rgba(225,29,46,0.3)" : "var(--border)" } },
        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: connected ? 14 : 0 } },
            React.createElement("div", { className: "flex fac gap2" },
                React.createElement("span", { style: { fontSize: 20 } }, "\u231A"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Amazfit / Zepp Watch"),
                    ((_a = zs === null || zs === void 0 ? void 0 : zs.device) === null || _a === void 0 ? void 0 : _a.lastSync) && React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", marginTop: 2 } },
                        "Last sync: ",
                        zs.device.lastSync))),
            React.createElement("span", { className: `b ${connected ? "bv" : "bi"}`, style: { fontSize: 9.5 } }, connected ? "⌚ Connected" : "Not yet synced")),
        connected && zs && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "g4", style: { marginBottom: 14 } }, [
                { icon: "❤️", val: ((_b = zs.heartRate) === null || _b === void 0 ? void 0 : _b.last) ? (zs.heartRate.last + " bpm") : "—", label: "Heart Rate", sub: ((_c = zs.heartRate) === null || _c === void 0 ? void 0 : _c.resting) ? `Resting: ${zs.heartRate.resting}` : "" },
                { icon: "😴", val: zs.sleep ? `${(((_f = (_e = (_d = data.sleep) === null || _d === void 0 ? void 0 : _d.logs) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.hours) || 0)}h` : "—", label: "Last Sleep", sub: ((_k = (_j = (_h = (_g = data.sleep) === null || _g === void 0 ? void 0 : _g.logs) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.notes) === null || _k === void 0 ? void 0 : _k.includes("Synced")) ? `Score: ${((_l = data.sleep.logs[0].notes.match(/Score: (\w+)/)) === null || _l === void 0 ? void 0 : _l[1]) || "—"}` : "" },
                { icon: "🩸", val: ((_m = zs.spo2) === null || _m === void 0 ? void 0 : _m.current) ? (zs.spo2.current + "%") : "—", label: "SpO2", sub: "blood oxygen" },
                { icon: "🧠", val: ((_o = zs.stress) === null || _o === void 0 ? void 0 : _o.current) != null ? stressLabel(zs.stress.current) : "—", label: "Stress", sub: ((_p = zs.stress) === null || _p === void 0 ? void 0 : _p.current) != null ? `${zs.stress.current}/100` : "" },
            ].map((s, i) => (React.createElement("div", { key: i, className: "sc" },
                React.createElement("div", { style: { fontSize: 18 } }, s.icon),
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--violet)", lineHeight: 1.2 } }, s.val),
                React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, s.label),
                s.sub && React.createElement("div", { style: { fontSize: 10, color: "var(--text-dim)" } }, s.sub))))),
            zs.activity && (React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 } },
                zs.activity.steps != null && React.createElement("span", { className: "b bv" },
                    "\uD83D\uDEB6 ",
                    zs.activity.steps.toLocaleString(),
                    " steps"),
                zs.activity.caloriesBurned != null && React.createElement("span", { className: "b bp" },
                    "\uD83D\uDD25 ",
                    zs.activity.caloriesBurned,
                    " kcal burned"),
                zs.activity.distanceMeters != null && React.createElement("span", { className: "b bm" },
                    "\uD83D\uDCCD ",
                    (zs.activity.distanceMeters / 1000).toFixed(1),
                    " km"),
                zs.activity.fatBurnMins != null && React.createElement("span", { className: "b bg" },
                    "\u26A1 ",
                    zs.activity.fatBurnMins,
                    " fat burn mins"))),
            React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 } },
                ((_q = zs.pai) === null || _q === void 0 ? void 0 : _q.total) != null && React.createElement("span", { className: "b bg" },
                    "PAI: ",
                    zs.pai.total,
                    " total \u00B7 ",
                    zs.pai.today,
                    " today"),
                ((_r = zs.workout) === null || _r === void 0 ? void 0 : _r.vo2Max) && React.createElement("span", { className: "b bv" },
                    "VO2 Max: ",
                    zs.workout.vo2Max),
                ((_s = zs.bodyTemp) === null || _s === void 0 ? void 0 : _s.celsius) && React.createElement("span", { className: "b bs" },
                    "\uD83C\uDF21 ",
                    zs.bodyTemp.celsius,
                    "\u00B0C"),
                ((_t = zs.device) === null || _t === void 0 ? void 0 : _t.battery) != null && React.createElement("span", { className: "b bi" },
                    "\uD83D\uDD0B ",
                    zs.device.battery,
                    "%"),
                ((_u = zs.device) === null || _u === void 0 ? void 0 : _u.wearing) != null && React.createElement("span", { className: "b bm" }, wearLabel(zs.device.wearing))))),
        !connected && (React.createElement("div", { style: { marginTop: 12 } },
            React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 10 } }, "Sync your Amazfit watch directly into LifeSync \u2014 no cloud account needed."),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, [
                ["1", "Install Node.js if you don't have it — nodejs.org"],
                ["2", "Install the Zepp CLI: npm install -g @zeppos/zeus-cli"],
                ["3", "Copy the zepp-lifesync/ folder from your LifeSync download"],
                ["4", "Run: zeus preview  inside that folder"],
                ["5", "Open Zepp App on your phone → Settings → Developer Mode → Scan QR"],
                ["6", "Tap \"Sync Now\" on your watch — data appears here instantly ✨"],
            ].map(([n, s]) => (React.createElement("div", { key: n, style: { display: "flex", gap: 10, alignItems: "flex-start" } },
                React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", background: "rgba(225,29,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--violet)", flexShrink: 0, marginTop: 1 } }, n),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 } }, s))))),
            React.createElement("div", { style: { marginTop: 12, fontSize: 11, color: "var(--text-dim)", fontStyle: "italic" } }, "Syncs: heart rate, resting HR, sleep stages, SpO2, stress, PAI, steps, calories burned, distance, VO2 max, body temp")))));
}
// ══ HEALTH AUTO EXPORT PANEL (shown in Settings) ═════════════════════════════
function HealthWebhookPanel({ data, toast }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [copied, setCopied] = useState(false);
    const profile = sbUid();
    const tokKey = haeTokenKey(profile);

    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                const r = await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${tokKey}&select=data`, { headers: SB_HDR });
                const rows = await r.json();
                if (!cancel) setToken((rows && rows[0] && rows[0].data && rows[0].data.token) || null);
            } catch (_) { }
            if (!cancel) setLoading(false);
        })();
        return () => { cancel = true; };
    }, [tokKey]);

    const generate = async () => {
        setBusy(true);
        try {
            const bytes = new Uint8Array(24);
            crypto.getRandomValues(bytes);
            const tok = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
            const r = await fetch(`${SB_URL}/rest/v1/lifesync`, {
                method: "POST",
                headers: Object.assign({}, SB_HDR, { Prefer: "resolution=merge-duplicates" }),
                body: JSON.stringify({ user_id: tokKey, data: { token: tok, createdAt: new Date().toISOString() }, updated_at: new Date().toISOString() }),
            });
            if (!r.ok) throw new Error("Failed");
            setToken(tok);
            window.dispatchEvent(new CustomEvent("lifesync:hae-token-changed", { detail: { token: tok } }));
            toast("Webhook URL generated ✨", "success");
        } catch (_) {
            toast("Couldn't generate URL — try again", "error");
        }
        setBusy(false);
    };

    const url = token ? haeWebhookUrl(profile, token) : "";

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
            toast("URL copied 📋", "success");
        } catch (_) {
            toast("Couldn't copy — long-press to copy manually", "error");
        }
    };

    const revoke = async () => {
        if (!window.confirm("Revoke this webhook URL? Health Auto Export will stop syncing until you set it up again.")) return;
        try {
            await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${tokKey}`, { method: "DELETE", headers: SB_HDR });
            await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.hae-inbox-${profile}`, { method: "DELETE", headers: SB_HDR });
            setToken(null);
            window.dispatchEvent(new CustomEvent("lifesync:hae-token-changed", { detail: { token: null } }));
            toast("Webhook revoked", "success");
        } catch (_) {
            toast("Couldn't revoke — check connection", "error");
        }
    };

    const zs = data && data.zeppSync;
    const lastSync = zs && zs.device && zs.device.lastSync;

    return React.createElement("div", { className: "card", style: { borderColor: token ? "rgba(225,29,46,0.3)" : "var(--border)" } },
        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 14 } },
            React.createElement("div", { className: "flex fac gap2" },
                React.createElement("span", { style: { fontSize: 20 } }, "🍎"),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Apple Health → Helio bridge"),
                    React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", marginTop: 2 } },
                        lastSync ? `Last update: ${lastSync}` : "Steps · Sleep · Heart rate · SpO₂ — auto-synced"))),
            React.createElement("span", { className: `b ${token ? "bv" : "bi"}`, style: { fontSize: 9.5 } }, token ? "● Connected" : loading ? "Loading…" : "Not set up")
        ),
        !token && !loading && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 } },
                "Your Helio already writes everything into Apple Health via the Zepp app. The free iOS app ",
                React.createElement("b", null, "Health Auto Export – JSON+CSV"),
                " can forward that data here automatically on a schedule. One-time setup."),
            React.createElement("button", { className: "btn btn-p w100", onClick: generate, disabled: busy, style: { padding: "10px" } },
                busy ? "Generating…" : "Generate my webhook URL")
        ),
        token && React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 6 } }, "Your private webhook URL"),
            React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 14 } },
                React.createElement("input", { className: "inp", readOnly: true, value: url, style: { flex: 1, fontSize: 10.5, fontFamily: "monospace" }, onFocus: e => e.target.select() }),
                React.createElement("button", { className: "btn btn-s", onClick: copy, style: { fontSize: 11, minWidth: 60 } }, copied ? "✓" : "Copy")),
            React.createElement("div", { style: { fontSize: 11.5, fontWeight: 600, marginBottom: 8 } }, "Setup on your iPhone (one time):"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } }, [
                ["1", "In Zepp app → Profile → Add Accounts → enable Apple Health. Choose what to share (steps, heart rate, sleep, SpO₂, calories, distance)."],
                ["2", "Install Health Auto Export – JSON+CSV from the App Store (free, in-app purchase for automations)."],
                ["3", "Open it → Automations tab → New Automation → REST API → paste the URL above. Method: POST."],
                ["4", "Metrics to pick: Steps, Heart Rate, Resting Heart Rate, Sleep Analysis, Active Energy, Walking + Running Distance, Blood Oxygen."],
                ["5", "Frequency: Hourly (recommended) or whatever you like. Save. Data starts flowing automatically — no need to keep the app open."],
            ].map(([n, s]) => React.createElement("div", { key: n, style: { display: "flex", gap: 10, alignItems: "flex-start" } },
                React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", background: "rgba(225,29,46,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--violet)", flexShrink: 0, marginTop: 1 } }, n),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 } }, s)
            ))),
            React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-dim)", fontStyle: "italic", marginBottom: 10 } },
                "Tip: this URL is your secret — anyone with it can post data. Revoke and regenerate any time."),
            React.createElement("button", { className: "btn btn-s w100", onClick: revoke, style: { fontSize: 11.5, color: "var(--text-muted)" } }, "Revoke this URL")
        )
    );
}

function Ring({ value, max, size = 80, stroke = 6, color = "var(--violet)", label, sub }) {
    // Guard against max=0 (fresh user / empty state) which would produce NaN
    if (!max || max <= 0) max = 1;
    if (!value || value < 0) value = 0;
    const r = (size - stroke * 2) / 2, circ = 2 * Math.PI * r, pct = Math.min((value / max) * 100, 100), off = circ - (pct / 100) * circ;
    return (React.createElement("div", { className: "ring-wrap", style: { width: size, height: size } },
        React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } },
            React.createElement("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: "var(--surface2)", strokeWidth: stroke }),
            React.createElement("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: color, strokeWidth: stroke, strokeDasharray: circ, strokeDashoffset: off, strokeLinecap: "round", style: { transition: "stroke-dashoffset 0.9s ease" } })),
        (label || sub) && (React.createElement("div", { className: "ring-label" },
            label && React.createElement("div", { style: { fontSize: size / 4.8, fontWeight: 700, lineHeight: 1 } }, label),
            sub && React.createElement("div", { style: { fontSize: size / 7.5, color: "var(--text-muted)", lineHeight: 1.3, marginTop: 1 } }, sub)))));
}
function BarChart({ data, color = "var(--violet)", height = 65, labels }) {
    const max = Math.max(...data, 1);
    return (React.createElement("div", null,
        React.createElement("div", { className: "bar-chart", style: { height, alignItems: "flex-end" } }, data.map((v, i) => (React.createElement("div", { key: i, className: "bar", style: { flex: 1, background: i === data.length - 1 ? color : `${color}55`,
                height: `${(v / max) * height}px`, transition: `height 0.55s ease ${i * 0.04}s` } })))),
        labels && (React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, color: "var(--text-dim)" } }, labels.map((l, i) => React.createElement("span", { key: i }, l))))));
}
function Modal({ open, onClose, title, children, maxWidth = 470 }) {
    useEffect(() => {
        const h = e => { if (e.key === "Escape")
            onClose(); };
        if (open)
            document.addEventListener("keydown", h);
        return () => document.removeEventListener("keydown", h);
    }, [open, onClose]);
    if (!open)
        return null;
    return (React.createElement("div", { className: "overlay", onClick: onClose },
        React.createElement("div", { className: "modal", onClick: e => e.stopPropagation(), style: { maxWidth } },
            React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 20 } },
                React.createElement("h3", { style: { fontWeight: 700, fontSize: 19 } }, title),
                React.createElement("button", { className: "btn btn-g btn-ic", onClick: onClose },
                    React.createElement(Ic, { n: "x", size: 16 }))),
            children)));
}
function Field({ label, children, style }) {
    return React.createElement("div", { style: style },
        React.createElement("label", { className: "label" }, label),
        children);
}
const XP_PER_LEVEL = lvl => lvl * 250;
function calcLevel(xp) {
    let lvl = 1, rem = xp;
    while (rem >= XP_PER_LEVEL(lvl)) {
        rem -= XP_PER_LEVEL(lvl);
        lvl++;
    }
    return { level: lvl, xpInLevel: rem, xpNeeded: XP_PER_LEVEL(lvl) };
}
const TODAY = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
// Daily-reset key: YYYY-MM-DD pinned to America/Chicago (handles CST/CDT and
// DST transitions automatically). We do NOT use the device's local clock —
// users with a phone/computer set to a different timezone would otherwise
// never see the reset fire at "midnight CST".
const RESET_TIMEZONE = "America/Chicago";
const _CHICAGO_DATE_PARTS = (now) => {
    try {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: RESET_TIMEZONE,
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        }).formatToParts(now || new Date());
        const g = (t) => { const p = parts.find(x => x.type === t); return p ? p.value : ""; };
        return {
            year: g("year"), month: g("month"), day: g("day"),
            hour: +g("hour") % 24, minute: +g("minute"), second: +g("second"),
        };
    } catch (_a) {
        // Intl unavailable — fall back to device local time (best effort).
        const d = now || new Date();
        return {
            year: String(d.getFullYear()),
            month: String(d.getMonth() + 1).padStart(2, "0"),
            day: String(d.getDate()).padStart(2, "0"),
            hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds(),
        };
    }
};
const LOCAL_DAY_KEY = () => {
    const p = _CHICAGO_DATE_PARTS();
    return `${p.year}-${p.month}-${p.day}`;
};
// Returns the America/Chicago YYYY-MM-DD for an arbitrary Date or ISO string.
// Returns null if the input can't be parsed. Used to decide whether saved data
// is from a prior CST day even though we have no explicit `lastResetDate`.
const CHICAGO_DAY_KEY_FROM = (dateOrIso) => {
    try {
        if (!dateOrIso) return null;
        const d = dateOrIso instanceof Date ? dateOrIso : new Date(dateOrIso);
        if (isNaN(d.getTime())) return null;
        const p = _CHICAGO_DATE_PARTS(d);
        return `${p.year}-${p.month}-${p.day}`;
    } catch (_a) { return null; }
};
// Stronger stale-data detector: returns true if the data clearly belongs to a
// prior CST day, even when `lastResetDate` was (incorrectly) stamped today.
// Signals checked, in order of trust:
//   1) `user.lastSaved` falls on a different CST day than now.
//   2) Any meal-log id (logs are stamped with Date.now() when added) is older
//      than today's CST midnight in ms. This catches "yesterday's calories
//      still showing" even after a prior broken stamp wrote today as
//      `lastResetDate` without actually resetting state.
// Idempotent: after `applyDailyReset` runs, logs are cleared and `lastSaved`
// is bumped to now, so this returns false on subsequent calls (no loop).
const dataIsFromPriorDay = (d) => {
    try {
        if (!d || typeof d !== "object") return false;
        const todayKey = LOCAL_DAY_KEY();
        const savedKey = d.user && CHICAGO_DAY_KEY_FROM(d.user.lastSaved);
        if (savedKey && savedKey !== todayKey) return true;
        const p = _CHICAGO_DATE_PARTS();
        const elapsedSec = (p.hour * 3600) + (p.minute * 60) + p.second;
        // A 5-second grace avoids treating a log made right at midnight on the
        // new day as "stale" due to micro-timing differences.
        const cstMidnightMs = Date.now() - (elapsedSec * 1000) - 5000;
        const logs = (d.nutrition && d.nutrition.logs) || [];
        for (let i = 0; i < logs.length; i++) {
            const l = logs[i];
            if (l && typeof l.id === "number" && l.id < cstMidnightMs) return true;
        }
        return false;
    } catch (_a) { return false; }
};
// Milliseconds until the next 00:00 in America/Chicago (plus a 2s cushion so
// the timer fires unambiguously on the next CST calendar day).
const MS_TO_NEXT_LOCAL_MIDNIGHT = () => {
    const p = _CHICAGO_DATE_PARTS();
    const elapsedSec = (p.hour * 3600) + (p.minute * 60) + p.second;
    const remainingMs = ((86400 - elapsedSec) * 1000) + 2000;
    return Math.max(1000, remainingMs);
};
// Pure helper: returns a new data object representing a fresh day.
// - Every habit's `doneToday` flips to false.
// - Habits that were NOT done yesterday have their streak reset to 0.
// - Habits that WERE done keep their streak (already credited yesterday).
// - Numeric habits' `current` resets to 0; `target` is preserved.
// - All nutrition macros' `current` reset to 0 (goal preserved); water resets;
//   today's meal `logs` are cleared.
// - Historical data (workouts, journal, cycle, weights, AI chats, profile,
//   week charts, settings) is untouched.
function applyDailyReset(data) {
    if (!data || typeof data !== "object") return data;
    const prevHabits = Array.isArray(data.habits) ? data.habits : [];
    const nu = data.nutrition || {};
    const cur = obj => (obj && typeof obj === "object" ? (obj.current || 0) : 0);
    // Snapshot date represents the day this data belongs to. Prefer the
    // explicit `lastResetDate` stamp; otherwise derive from when the data was
    // last saved (in CST). Falling back to today would mislabel yesterday's
    // data as today's in the history view.
    const snapshotDate = (data.user && data.user.lastResetDate)
        || (data.user && CHICAGO_DAY_KEY_FROM(data.user.lastSaved))
        || LOCAL_DAY_KEY();
    const snapshot = {
        date: snapshotDate,
        habits: prevHabits.map(h => ({
            id: h.id, name: h.name, icon: h.icon, category: h.category,
            doneToday: !!h.doneToday, streak: h.streak || 0,
            isNumeric: !!h.isNumeric, target: h.target || 0, current: h.current || 0,
        })),
        nutrition: {
            calories: cur(nu.calories), protein: cur(nu.protein),
            carbs: cur(nu.carbs), fat: cur(nu.fat), water: cur(nu.water),
            fiber: cur(nu.fiber), sugar: cur(nu.sugar), sodium: cur(nu.sodium),
            vitaminC: cur(nu.vitaminC), iron: cur(nu.iron), calcium: cur(nu.calcium),
            logs: Array.isArray(nu.logs) ? nu.logs.map(l => Object.assign({}, l)) : [],
        },
    };
    const prevHistory = Array.isArray(data.history) ? data.history : [];
    const dedup = prevHistory.filter(s => s && s.date !== snapshot.date);
    const history = [snapshot, ...dedup].slice(0, 365);
    const habits = prevHabits.map(h => Object.assign({}, h, {
        doneToday: false,
        streak: h.doneToday ? (h.streak || 0) : 0,
        current: h.isNumeric ? 0 : (h.current || 0),
    }));
    const zero = obj => obj && typeof obj === "object"
        ? Object.assign({}, obj, { current: 0 })
        : { current: 0 };
    const nutrition = Object.assign({}, nu, {
        calories: zero(nu.calories),
        protein: zero(nu.protein),
        carbs: zero(nu.carbs),
        fat: zero(nu.fat),
        water: zero(nu.water),
        fiber: zero(nu.fiber),
        sugar: zero(nu.sugar),
        sodium: zero(nu.sodium),
        vitaminC: zero(nu.vitaminC),
        iron: zero(nu.iron),
        calcium: zero(nu.calcium),
        logs: [],
    });
    const user = Object.assign({}, data.user || {}, { lastResetDate: LOCAL_DAY_KEY() });
    return Object.assign({}, data, { habits, nutrition, user, history });
}
const DAYS_LEFT = d => { if (!d)
    return null; const yr = new Date().getFullYear(); const t = new Date(d + "," + yr); const t2 = new Date(d + "," + (yr + 1)); const best = t > Date.now() ? t : t2; return Math.max(0, Math.ceil((best - Date.now()) / 86400000)); };
const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Curated exercise library — adapted from the ExerciseDB project shape
// (name, bodyPart, equipment, target) but bundled locally so the picker
// works offline and never depends on a third-party API. Emojis are used
// as lightweight visual cues per body part.
const BODY_PART_EMOJI = { chest: "💪", back: "🔙", shoulders: "🤷", "upper arms": "💪", "lower arms": "🤜", waist: "🧘", "upper legs": "🦵", "lower legs": "🦶", cardio: "🏃", neck: "🧍", "full body": "🏋️" };
const EXERCISE_LIBRARY = [
    // Chest
    { name: "Barbell Bench Press", bodyPart: "chest", equipment: "barbell", target: "pectorals" },
    { name: "Incline Barbell Bench Press", bodyPart: "chest", equipment: "barbell", target: "upper pectorals" },
    { name: "Dumbbell Bench Press", bodyPart: "chest", equipment: "dumbbell", target: "pectorals" },
    { name: "Incline Dumbbell Press", bodyPart: "chest", equipment: "dumbbell", target: "upper pectorals" },
    { name: "Dumbbell Fly", bodyPart: "chest", equipment: "dumbbell", target: "pectorals" },
    { name: "Cable Crossover", bodyPart: "chest", equipment: "cable", target: "pectorals" },
    { name: "Push-up", bodyPart: "chest", equipment: "body weight", target: "pectorals" },
    { name: "Decline Push-up", bodyPart: "chest", equipment: "body weight", target: "lower pectorals" },
    { name: "Chest Dip", bodyPart: "chest", equipment: "body weight", target: "pectorals" },
    { name: "Machine Chest Press", bodyPart: "chest", equipment: "machine", target: "pectorals" },
    // Back
    { name: "Pull-up", bodyPart: "back", equipment: "body weight", target: "lats" },
    { name: "Chin-up", bodyPart: "back", equipment: "body weight", target: "lats" },
    { name: "Lat Pulldown", bodyPart: "back", equipment: "cable", target: "lats" },
    { name: "Seated Cable Row", bodyPart: "back", equipment: "cable", target: "upper back" },
    { name: "Barbell Row", bodyPart: "back", equipment: "barbell", target: "upper back" },
    { name: "Dumbbell Row", bodyPart: "back", equipment: "dumbbell", target: "lats" },
    { name: "T-Bar Row", bodyPart: "back", equipment: "barbell", target: "upper back" },
    { name: "Face Pull", bodyPart: "back", equipment: "cable", target: "rear delts" },
    { name: "Deadlift", bodyPart: "back", equipment: "barbell", target: "spine erectors" },
    { name: "Romanian Deadlift", bodyPart: "back", equipment: "barbell", target: "spine erectors" },
    { name: "Hyperextension", bodyPart: "back", equipment: "body weight", target: "spine erectors" },
    // Shoulders
    { name: "Overhead Press", bodyPart: "shoulders", equipment: "barbell", target: "delts" },
    { name: "Dumbbell Shoulder Press", bodyPart: "shoulders", equipment: "dumbbell", target: "delts" },
    { name: "Arnold Press", bodyPart: "shoulders", equipment: "dumbbell", target: "delts" },
    { name: "Lateral Raise", bodyPart: "shoulders", equipment: "dumbbell", target: "lateral delts" },
    { name: "Front Raise", bodyPart: "shoulders", equipment: "dumbbell", target: "front delts" },
    { name: "Rear Delt Fly", bodyPart: "shoulders", equipment: "dumbbell", target: "rear delts" },
    { name: "Cable Lateral Raise", bodyPart: "shoulders", equipment: "cable", target: "lateral delts" },
    { name: "Upright Row", bodyPart: "shoulders", equipment: "barbell", target: "delts" },
    // Biceps / Triceps (upper arms)
    { name: "Barbell Curl", bodyPart: "upper arms", equipment: "barbell", target: "biceps" },
    { name: "Dumbbell Curl", bodyPart: "upper arms", equipment: "dumbbell", target: "biceps" },
    { name: "Hammer Curl", bodyPart: "upper arms", equipment: "dumbbell", target: "biceps" },
    { name: "Preacher Curl", bodyPart: "upper arms", equipment: "barbell", target: "biceps" },
    { name: "Cable Curl", bodyPart: "upper arms", equipment: "cable", target: "biceps" },
    { name: "Concentration Curl", bodyPart: "upper arms", equipment: "dumbbell", target: "biceps" },
    { name: "Tricep Pushdown", bodyPart: "upper arms", equipment: "cable", target: "triceps" },
    { name: "Overhead Tricep Extension", bodyPart: "upper arms", equipment: "dumbbell", target: "triceps" },
    { name: "Skull Crusher", bodyPart: "upper arms", equipment: "barbell", target: "triceps" },
    { name: "Close-Grip Bench Press", bodyPart: "upper arms", equipment: "barbell", target: "triceps" },
    { name: "Tricep Dip", bodyPart: "upper arms", equipment: "body weight", target: "triceps" },
    // Forearms (lower arms)
    { name: "Wrist Curl", bodyPart: "lower arms", equipment: "dumbbell", target: "forearms" },
    { name: "Reverse Wrist Curl", bodyPart: "lower arms", equipment: "dumbbell", target: "forearms" },
    { name: "Farmer's Carry", bodyPart: "lower arms", equipment: "dumbbell", target: "forearms" },
    // Legs (upper)
    { name: "Back Squat", bodyPart: "upper legs", equipment: "barbell", target: "quads" },
    { name: "Front Squat", bodyPart: "upper legs", equipment: "barbell", target: "quads" },
    { name: "Goblet Squat", bodyPart: "upper legs", equipment: "dumbbell", target: "quads" },
    { name: "Bulgarian Split Squat", bodyPart: "upper legs", equipment: "dumbbell", target: "quads" },
    { name: "Walking Lunge", bodyPart: "upper legs", equipment: "dumbbell", target: "quads" },
    { name: "Leg Press", bodyPart: "upper legs", equipment: "machine", target: "quads" },
    { name: "Leg Extension", bodyPart: "upper legs", equipment: "machine", target: "quads" },
    { name: "Leg Curl", bodyPart: "upper legs", equipment: "machine", target: "hamstrings" },
    { name: "Stiff-Leg Deadlift", bodyPart: "upper legs", equipment: "barbell", target: "hamstrings" },
    { name: "Hip Thrust", bodyPart: "upper legs", equipment: "barbell", target: "glutes" },
    { name: "Glute Bridge", bodyPart: "upper legs", equipment: "body weight", target: "glutes" },
    { name: "Cable Kickback", bodyPart: "upper legs", equipment: "cable", target: "glutes" },
    { name: "Sumo Deadlift", bodyPart: "upper legs", equipment: "barbell", target: "glutes" },
    // Calves (lower legs)
    { name: "Standing Calf Raise", bodyPart: "lower legs", equipment: "machine", target: "calves" },
    { name: "Seated Calf Raise", bodyPart: "lower legs", equipment: "machine", target: "calves" },
    { name: "Donkey Calf Raise", bodyPart: "lower legs", equipment: "body weight", target: "calves" },
    // Core (waist)
    { name: "Plank", bodyPart: "waist", equipment: "body weight", target: "abs" },
    { name: "Side Plank", bodyPart: "waist", equipment: "body weight", target: "obliques" },
    { name: "Crunch", bodyPart: "waist", equipment: "body weight", target: "abs" },
    { name: "Russian Twist", bodyPart: "waist", equipment: "body weight", target: "obliques" },
    { name: "Hanging Leg Raise", bodyPart: "waist", equipment: "body weight", target: "abs" },
    { name: "Cable Crunch", bodyPart: "waist", equipment: "cable", target: "abs" },
    { name: "Ab Wheel Rollout", bodyPart: "waist", equipment: "wheel", target: "abs" },
    { name: "Bicycle Crunch", bodyPart: "waist", equipment: "body weight", target: "obliques" },
    { name: "Dead Bug", bodyPart: "waist", equipment: "body weight", target: "abs" },
    { name: "Mountain Climber", bodyPart: "waist", equipment: "body weight", target: "abs" },
    // Cardio
    { name: "Running", bodyPart: "cardio", equipment: "body weight", target: "cardio" },
    { name: "Cycling", bodyPart: "cardio", equipment: "stationary bike", target: "cardio" },
    { name: "Rowing Machine", bodyPart: "cardio", equipment: "rower", target: "cardio" },
    { name: "Jump Rope", bodyPart: "cardio", equipment: "rope", target: "cardio" },
    { name: "Stair Climber", bodyPart: "cardio", equipment: "machine", target: "cardio" },
    { name: "Burpee", bodyPart: "cardio", equipment: "body weight", target: "cardio" },
    { name: "High Knees", bodyPart: "cardio", equipment: "body weight", target: "cardio" },
    { name: "Box Jump", bodyPart: "cardio", equipment: "box", target: "cardio" },
    // Full body
    { name: "Kettlebell Swing", bodyPart: "full body", equipment: "kettlebell", target: "glutes" },
    { name: "Clean and Press", bodyPart: "full body", equipment: "barbell", target: "delts" },
    { name: "Thruster", bodyPart: "full body", equipment: "barbell", target: "quads" },
    { name: "Turkish Get-Up", bodyPart: "full body", equipment: "kettlebell", target: "full body" },
    { name: "Snatch", bodyPart: "full body", equipment: "barbell", target: "full body" },
    { name: "Wall Ball", bodyPart: "full body", equipment: "ball", target: "quads" },
].map((e, i) => {
    const emoji = BODY_PART_EMOJI[e.bodyPart] || "🏋️";
    // Per-body-part tint so thumbnails are visually distinguishable.
    const tint = ({
        chest: ["#7c3aed", "#a78bfa"], back: ["#0ea5e9", "#38bdf8"],
        shoulders: ["#f59e0b", "#fbbf24"], "upper arms": ["#ef4444", "#fb7185"],
        "lower arms": ["#dc2626", "#f87171"], waist: ["#10b981", "#34d399"],
        "upper legs": ["#3b82f6", "#60a5fa"], "lower legs": ["#6366f1", "#818cf8"],
        cardio: ["#ec4899", "#f472b6"], "full body": ["#8b5cf6", "#a78bfa"],
    })[e.bodyPart] || ["#6b7280", "#9ca3af"];
    // Inline SVG data URL — small, deterministic, offline-safe. Acts as the
    // demo image for each library entry; the picker renders it as an <img>
    // with onError fallback to the emoji tile.
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='${tint[0]}'/><stop offset='1' stop-color='${tint[1]}'/></linearGradient></defs><rect width='64' height='64' rx='14' fill='url(%23g)'/><text x='32' y='44' font-size='34' text-anchor='middle' font-family='Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif'>${emoji}</text></svg>`;
    const thumbnail = `data:image/svg+xml;utf8,${svg.replace(/#/g, "%23")}`;
    // gifUrl reserved for future licensed media; null means "no animated
    // preview available — fall back to the static thumbnail above".
    return Object.assign({ id: `lib_${i + 1}`, emoji, thumbnail, gifUrl: null }, e);
});
const EXERCISE_BODY_PARTS = Array.from(new Set(EXERCISE_LIBRARY.map(e => e.bodyPart))).sort();
// Parse a free-text exercise string like "Squats 4×8 @ 135lb" into a
// structured row. Falls back gracefully when only a name is present.
function parseExerciseString(line) {
    const s = String(line || "").trim();
    if (!s) return null;
    // sets × reps (× / x / X). Reps token supports plain numbers ("8"),
    // duration ("30s", "1m"), and ranges ("8-10") so we don't lose richer
    // free-text patterns when converting to structured rows.
    const setsReps = s.match(/(\d+)\s*[x×X]\s*(\d+(?:[-–]\d+)?(?:s|m)?)/);
    // optional weight: "@ 135lb", "@ 60kg"
    const weight = s.match(/@\s*([\d.]+\s*(?:lb|lbs|kg)?)/i);
    let name = s;
    if (setsReps) name = name.slice(0, setsReps.index).trim();
    if (weight) name = name.replace(weight[0], "").trim();
    name = name.replace(/[,\-–—:]+$/, "").trim();
    return {
        name: name || s,
        sets: setsReps ? +setsReps[1] || 0 : 0,
        reps: setsReps ? setsReps[2] || "" : "",
        weight: weight ? weight[1].trim() : "",
        rest: "",
        notes: "",
    };
}
function exerciseRowToString(r) {
    if (!r || !r.name) return "";
    let s = r.name;
    if (r.sets && r.reps) s += ` ${r.sets}×${r.reps}`;
    else if (r.sets) s += ` ${r.sets} sets`;
    else if (r.reps) s += ` ${r.reps}`;
    if (r.weight) s += ` @ ${r.weight}`;
    return s;
}
function newExerciseRow(over) {
    return Object.assign({ name: "", sets: 3, reps: "10", weight: "", rest: "", notes: "" }, over || {});
}
function newRoutineId() {
    try {
        if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
        if (typeof crypto !== "undefined" && crypto.getRandomValues) {
            const buf = new Uint8Array(8); crypto.getRandomValues(buf);
            return `${Date.now().toString(36)}-${Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("")}`;
        }
    } catch (_e) {}
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
const catSpent = (txs, name) => txs.filter(t => t.category === name && t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0);
// ----- Schedule helpers (daily routine + per-day overrides + .ics export) -----
function newSchedId() {
    try { if (typeof crypto !== "undefined" && crypto.randomUUID) return "s_" + crypto.randomUUID().slice(0, 12); } catch (e) {}
    return "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}
const SCHED_TYPES = [
    { id: "wake", label: "Wake / Morning", emoji: "🌅", color: "var(--gold)" },
    { id: "meal", label: "Meal", emoji: "🍽️", color: "var(--mint)" },
    { id: "work", label: "Work", emoji: "💼", color: "var(--violet)" },
    { id: "focus", label: "Focus / Deep work", emoji: "🎯", color: "var(--rose)" },
    { id: "break", label: "Break", emoji: "☕", color: "var(--sky)" },
    { id: "exercise", label: "Exercise", emoji: "🏋️", color: "var(--peach)" },
    { id: "errand", label: "Errand / Task", emoji: "✅", color: "var(--indigo)" },
    { id: "wind", label: "Wind down", emoji: "🌙", color: "var(--indigo)" },
    { id: "sleep", label: "Sleep", emoji: "😴", color: "var(--text-dim)" },
    { id: "custom", label: "Custom", emoji: "📌", color: "var(--violet)" },
];
const schedType = (id) => SCHED_TYPES.find(t => t.id === id) || SCHED_TYPES[SCHED_TYPES.length - 1];
const WEEKDAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function defaultScheduleBlocks() {
    const mkd = (title, emoji, type, start, end, days, reminder, asTodo) => ({
        id: newSchedId(), title, emoji, type, start, end,
        days: days || [0, 1, 2, 3, 4, 5, 6], reminder: reminder !== false, asTodo: !!asTodo, notes: "",
    });
    const week = [1, 2, 3, 4, 5];
    return [
        mkd("Wake up", "🌅", "wake", "07:00", "07:30", [0, 1, 2, 3, 4, 5, 6], true),
        mkd("Breakfast", "🍳", "meal", "07:30", "08:00", [0, 1, 2, 3, 4, 5, 6], true),
        mkd("Work", "💼", "work", "09:00", "12:00", week, true),
        mkd("Lunch", "🥗", "meal", "12:00", "12:45", [0, 1, 2, 3, 4, 5, 6], true),
        mkd("Work", "💼", "work", "13:00", "17:00", week, true),
        mkd("Dinner", "🍽️", "meal", "18:30", "19:15", [0, 1, 2, 3, 4, 5, 6], true),
        mkd("Wind down", "🌙", "wind", "21:30", "22:00", [0, 1, 2, 3, 4, 5, 6], true),
        mkd("Sleep", "😴", "sleep", "22:30", "23:00", [0, 1, 2, 3, 4, 5, 6], false),
    ];
}
const pad2 = (n) => String(n).padStart(2, "0");
function parseHHMM(s) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
    if (!m) return { h: 0, m: 0 };
    return { h: Math.min(23, +m[1]), m: Math.min(59, +m[2]) };
}
function minutesOf(hhmm) { const p = parseHHMM(hhmm); return p.h * 60 + p.m; }
function fmtTime12(hhmm) {
    const { h, m } = parseHHMM(hhmm);
    const ampm = h < 12 ? "AM" : "PM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${pad2(m)} ${ampm}`;
}
function fmtDur(startHHMM, endHHMM) {
    let diff = minutesOf(endHHMM) - minutesOf(startHHMM);
    if (diff <= 0) diff += 24 * 60;
    const h = Math.floor(diff / 60), m = diff % 60;
    return h ? (m ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
}
// Date-key helpers. Keys are YYYY-MM-DD; parsed at noon to dodge DST edges.
function todayKey() { return LOCAL_DAY_KEY(); }
function keyToDate(key) {
    const [y, mo, d] = String(key).split("-").map(Number);
    return new Date(y, (mo || 1) - 1, d || 1, 12, 0, 0);
}
function dateToKey(dt) { return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`; }
function addDaysKey(key, n) { const dt = keyToDate(key); dt.setDate(dt.getDate() + n); return dateToKey(dt); }
function weekdayOfKey(key) { return keyToDate(key).getDay(); }
function prettyDateKey(key) {
    const dt = keyToDate(key);
    return dt.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}
function relDayLabel(key) {
    const t = todayKey();
    if (key === t) return "Today";
    if (key === addDaysKey(t, 1)) return "Tomorrow";
    if (key === addDaysKey(t, -1)) return "Yesterday";
    return "";
}
// Resolve the schedule for a specific date: a per-day override wins entirely;
// otherwise the base routine filtered to that weekday. Always time-sorted.
function resolveDay(schedule, key) {
    const sc = schedule || {};
    const ov = (sc.overrides || {})[key];
    let blocks;
    if (Array.isArray(ov)) blocks = ov.slice();
    else {
        const wd = weekdayOfKey(key);
        blocks = (sc.blocks || []).filter(b => !Array.isArray(b.days) || b.days.includes(wd));
    }
    return blocks.slice().sort((a, b) => minutesOf(a.start) - minutesOf(b.start));
}
function dayIsCustom(schedule, key) { return Array.isArray(((schedule || {}).overrides || {})[key]); }
// ----- .ics export -----
function icsEscape(s) { return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
function foldICS(line) {
    // RFC5545: fold lines longer than 75 octets.
    if (line.length <= 73) return line;
    let out = "", rest = line;
    while (rest.length > 73) { out += rest.slice(0, 73) + "\r\n "; rest = rest.slice(73); }
    return out + rest;
}
function dtFloating(key, hhmm) {
    // Floating local time: no Z, no TZID — Apple shows it at this clock time on
    // whatever device imports it, which matches the user's routine intent.
    const { h, m } = parseHHMM(hhmm);
    return `${String(key).replace(/-/g, "")}T${pad2(h)}${pad2(m)}00`;
}
function endKeyTime(startKey, startHHMM, endHHMM) {
    // If end is before start, the block crosses midnight -> end next day.
    if (minutesOf(endHHMM) <= minutesOf(startHHMM)) return { key: addDaysKey(startKey, 1), time: endHHMM };
    return { key: startKey, time: endHHMM };
}
function buildCalendarICS(schedule, startKey, numDays) {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//LifeSync//Schedule//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:LifeSync Schedule"];
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const lead = Math.max(0, +(((schedule || {}).settings || {}).reminderLeadMin) || 0);
    for (let i = 0; i < numDays; i++) {
        const key = addDaysKey(startKey, i);
        for (const b of resolveDay(schedule, key)) {
            if (b.asTodo) continue; // tasks go to the Reminders file
            const e = endKeyTime(key, b.start, b.end);
            lines.push("BEGIN:VEVENT");
            lines.push(`UID:${b.id}-${key}@lifesync`);
            lines.push(`DTSTAMP:${stamp}`);
            lines.push(`DTSTART:${dtFloating(key, b.start)}`);
            lines.push(`DTEND:${dtFloating(e.key, e.time)}`);
            lines.push(`SUMMARY:${icsEscape((b.emoji ? b.emoji + " " : "") + b.title)}`);
            if (b.notes) lines.push(`DESCRIPTION:${icsEscape(b.notes)}`);
            if (b.reminder) {
                lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsEscape(b.title)}`, `TRIGGER:-PT${lead}M`, "END:VALARM");
            }
            lines.push("END:VEVENT");
        }
    }
    lines.push("END:VCALENDAR");
    return lines.map(foldICS).join("\r\n");
}
function buildRemindersICS(schedule, startKey, numDays) {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//LifeSync//Reminders//EN", "CALSCALE:GREGORIAN", "X-WR-CALNAME:LifeSync Reminders"];
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const lead = Math.max(0, +(((schedule || {}).settings || {}).reminderLeadMin) || 0);
    for (let i = 0; i < numDays; i++) {
        const key = addDaysKey(startKey, i);
        for (const b of resolveDay(schedule, key)) {
            if (!b.asTodo) continue; // only task-flagged blocks become reminders
            lines.push("BEGIN:VTODO");
            lines.push(`UID:${b.id}-${key}-todo@lifesync`);
            lines.push(`DTSTAMP:${stamp}`);
            lines.push(`DTSTART:${dtFloating(key, b.start)}`);
            lines.push(`DUE:${dtFloating(key, b.start)}`);
            lines.push(`SUMMARY:${icsEscape((b.emoji ? b.emoji + " " : "") + b.title)}`);
            if (b.notes) lines.push(`DESCRIPTION:${icsEscape(b.notes)}`);
            if (b.reminder) {
                lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsEscape(b.title)}`, `TRIGGER:-PT${lead}M`, "END:VALARM");
            }
            lines.push("END:VTODO");
        }
    }
    lines.push("END:VCALENDAR");
    return lines.map(foldICS).join("\r\n");
}
function downloadTextFile(filename, content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime || "text/plain" }));
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}
// ----- Budget v2 helpers (accounts, transfers, recurring, reports) -----
function newBudgetId() {
    try { if (typeof crypto !== "undefined" && crypto.randomUUID) return "b_" + crypto.randomUUID().slice(0, 12); } catch (e) {}
    return "b_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}
const ACCOUNT_SUBTYPES = [
    { key: "checking", label: "Checking", type: "asset", emoji: "🏦", color: "var(--mint)" },
    { key: "savings", label: "Savings", type: "asset", emoji: "💰", color: "var(--gold)" },
    { key: "cash", label: "Cash", type: "asset", emoji: "💵", color: "var(--peach)" },
    { key: "investment", label: "Investment", type: "asset", emoji: "📈", color: "var(--sky)" },
    { key: "credit", label: "Credit Card", type: "liability", emoji: "💳", color: "var(--rose)" },
    { key: "loan", label: "Loan", type: "liability", emoji: "🏠", color: "var(--violet)" },
    { key: "other_asset", label: "Other asset", type: "asset", emoji: "📦", color: "var(--indigo)" },
    { key: "other_liability", label: "Other debt", type: "liability", emoji: "📉", color: "var(--rose)" },
];
function accountSubtype(key) { return ACCOUNT_SUBTYPES.find(s => s.key === key) || ACCOUNT_SUBTYPES[0]; }
function accountCurrentBalance(account, txs) {
    let bal = +account.openingBalance || 0;
    if (!Array.isArray(txs)) return +bal.toFixed(2);
    for (const t of txs) {
        if (!t) continue;
        if (t.type === "transfer") {
            const amt = Math.abs(+t.amount || 0);
            if (t.fromAccountId === account.id) bal -= amt;
            if (t.toAccountId === account.id) bal += amt;
        } else if (t.accountId === account.id) {
            bal += +t.amount || 0;
        }
    }
    return +bal.toFixed(2);
}
// Balance for an account on (and including) a given ISO date — used by the
// reconcile flow to compare against a real-world statement.
function accountBalanceOnDate(account, txs, isoDate) {
    if (!isoDate) return accountCurrentBalance(account, txs);
    const cutoff = new Date(isoDate + "T23:59:59.999");
    if (isNaN(cutoff.getTime())) return accountCurrentBalance(account, txs);
    const filtered = (Array.isArray(txs) ? txs : []).filter(t => {
        const d = parseTxDate(t && t.date);
        return d && d <= cutoff;
    });
    return accountCurrentBalance(account, filtered);
}
function netWorthFromAccounts(accounts, txs) {
    if (!Array.isArray(accounts) || !accounts.length) return 0;
    return +accounts.reduce((s, a) => s + accountCurrentBalance(a, txs), 0).toFixed(2);
}
function totalAssetsFromAccounts(accounts, txs) {
    if (!Array.isArray(accounts)) return 0;
    return +accounts.filter(a => a.type === "asset").reduce((s, a) => s + accountCurrentBalance(a, txs), 0).toFixed(2);
}
function totalLiabilitiesFromAccounts(accounts, txs) {
    if (!Array.isArray(accounts)) return 0;
    // Liability accounts hold negative balances internally; return positive "owed" total.
    return +Math.abs(accounts.filter(a => a.type === "liability").reduce((s, a) => s + accountCurrentBalance(a, txs), 0)).toFixed(2);
}
// ── CSV import helpers ────────────────────────────────────────────────────
// RFC4180-ish: handles quoted fields, escaped quotes (""), and \r\n.
function parseCSV(text) {
    if (typeof text !== "string") return [];
    const rows = [];
    let row = [], field = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQ) {
            if (c === '"') {
                if (text[i + 1] === '"') { field += '"'; i++; }
                else inQ = false;
            } else field += c;
        } else {
            if (c === '"') inQ = true;
            else if (c === ",") { row.push(field); field = ""; }
            else if (c === "\n" || c === "\r") {
                if (c === "\r" && text[i + 1] === "\n") i++;
                row.push(field); field = "";
                if (row.length > 1 || row[0] !== "") rows.push(row);
                row = [];
            } else field += c;
        }
    }
    if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
    return rows.filter(r => r.some(c => String(c).trim() !== ""));
}
// Try to match the most common bank CSV header names.
function autoDetectCsvMap(headers) {
    const norm = headers.map(h => String(h || "").toLowerCase().trim());
    const findIdx = (...needles) => {
        for (const n of needles) {
            const i = norm.findIndex(h => h === n);
            if (i >= 0) return i;
        }
        for (const n of needles) {
            const i = norm.findIndex(h => h.includes(n));
            if (i >= 0) return i;
        }
        return -1;
    };
    return {
        date: findIdx("date", "posted", "transaction date", "posting date"),
        desc: findIdx("description", "name", "payee", "merchant", "memo", "details"),
        amount: findIdx("amount", "value", "transaction amount"),
        debit: findIdx("debit", "withdrawal", "withdrawals", "money out"),
        credit: findIdx("credit", "deposit", "deposits", "money in"),
        category: findIdx("category", "type"),
    };
}
// Parse a wide variety of date strings → ISO yyyy-mm-dd (returns null on fail).
function parseImportDate(str) {
    if (!str) return null;
    const s = String(str).trim();
    if (!s) return null;
    // ISO yyyy-mm-dd or yyyy/mm/dd
    let m = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (m) {
        const y = +m[1], mo = +m[2], d = +m[3];
        if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31)
            return y + "-" + String(mo).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    }
    // mm/dd/yyyy or mm-dd-yyyy or m/d/yy
    m = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})/);
    if (m) {
        let y = +m[3]; if (y < 100) y += 2000;
        const mo = +m[1], d = +m[2];
        if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31)
            return y + "-" + String(mo).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    }
    // Fallback: native Date parse
    const dt = new Date(s);
    if (!isNaN(dt.getTime()))
        return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
    return null;
}
// "$1,234.56" → 1234.56, "(45.00)" → -45, "" → NaN.
function parseImportAmount(str) {
    if (str === null || str === undefined) return NaN;
    let s = String(str).trim();
    if (!s) return NaN;
    let neg = false;
    if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
    s = s.replace(/[$£€¥,\s]/g, "");
    const n = parseFloat(s);
    if (isNaN(n)) return NaN;
    return neg ? -Math.abs(n) : n;
}
function parseTxDate(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return null;
    const yr = new Date().getFullYear();
    // Try "MMM D" (legacy/current TODAY() format) first, then ISO.
    let d = new Date(dateStr + ", " + yr);
    if (isNaN(d.getTime())) d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}
function isoTodayLocal() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function isoAddDays(iso, days) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + days);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function isoAddMonths(iso, months) {
    const d = new Date(iso + "T00:00:00");
    d.setMonth(d.getMonth() + months);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function advanceRecurringDate(rule) {
    const cur = rule.nextRunDate || isoTodayLocal();
    if (rule.cadence === "daily") return isoAddDays(cur, 1);
    if (rule.cadence === "weekly") return isoAddDays(cur, 7);
    if (rule.cadence === "yearly") return isoAddMonths(cur, 12);
    return isoAddMonths(cur, 1);
}
// Post any recurring rules whose nextRunDate has arrived. Pure: returns new
// data object (with new txs prepended + bumped nextRunDate) or the original
// if nothing fired. Capped per-rule to avoid runaway loops on bad cadence.
function postDueRecurringRules(d) {
    if (!d || !d.budget || !Array.isArray(d.budget.recurring) || !d.budget.recurring.length) return d;
    const today = isoTodayLocal();
    const recurring = d.budget.recurring.slice();
    const newTxs = [];
    for (let i = 0; i < recurring.length; i++) {
        let r = recurring[i];
        if (!r || !r.nextRunDate || !r.accountId) continue;
        let guard = 0;
        while (r.nextRunDate <= today && guard++ < 60) {
            let postDate;
            try {
                const dd = new Date(r.nextRunDate + "T00:00:00");
                postDate = dd.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            } catch (e) { postDate = TODAY(); }
            const amt = +r.amount || 0;
            newTxs.push({
                id: newBudgetId(),
                date: postDate,
                name: r.name + " (auto)",
                amount: amt,
                category: r.category || (amt > 0 ? "Income" : "Other"),
                emoji: r.emoji || (amt > 0 ? "💵" : "💸"),
                note: "Recurring",
                accountId: r.accountId,
                recurringId: r.id,
            });
            r = Object.assign({}, r, { lastRunDate: r.nextRunDate, nextRunDate: advanceRecurringDate(r) });
        }
        recurring[i] = r;
    }
    if (!newTxs.length) return d;
    return Object.assign({}, d, {
        budget: Object.assign({}, d.budget, {
            recurring,
            transactions: [...newTxs, ...(Array.isArray(d.budget.transactions) ? d.budget.transactions : [])],
        }),
    });
}
function getCyclePhase(lastStart, cycleLen) {
    const yr = new Date().getFullYear();
    const start = new Date(lastStart + ", " + yr);
    const day = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;
    const d = ((day - 1) % cycleLen) + 1;
    if (d <= 5)
        return { phase: "Menstrual", color: "var(--rose)", day: d, emoji: "🌸", advice: "Rest & gentle movement. Iron-rich foods." };
    if (d <= 13)
        return { phase: "Follicular", color: "var(--mint)", day: d, emoji: "🌱", advice: "Energy rising! Great for strength training." };
    if (d <= 16)
        return { phase: "Ovulation", color: "var(--gold)", day: d, emoji: "⭐", advice: "Peak energy & confidence — HIIT time!" };
    return { phase: "Luteal", color: "var(--violet)", day: d, emoji: "🌙", advice: "Ease up, prioritize sleep & magnesium." };
}
function makeData() {
    // Fresh install — no demo data. User goes through onboarding first.
    return makeEmptyData();
}
function makeDemoData() {
    return {
        user: { name: "Aria", avatar: "🌸", xp: 1340, joinDate: "Jan 1 2026", lastSaved: new Date().toISOString(), onboarded: true },
        settings: { calorieGoal: 1800, proteinGoal: 120, carbsGoal: 200, fatGoal: 60, waterGoal: 8,
            workoutGoalPerWeek: 5, savingsGoal: 1000, currency: "USD", weightUnit: "lbs",
            gender: "female" },
        streaks: { habits: 12, workouts: 5, logging: 21, skincare: 8, sleep: 4 },
        habits: [
            { id: 1, name: "Drink 2L water", icon: "💧", category: "Health", streak: 12, doneToday: false, target: 8, current: 5, isNumeric: true },
            { id: 2, name: "Morning skincare", icon: "✨", category: "Skincare", streak: 8, doneToday: false, target: 1, current: 0, isNumeric: false },
            { id: 3, name: "10k steps", icon: "🚶", category: "Fitness", streak: 5, doneToday: true, target: 10000, current: 10432, isNumeric: true },
            { id: 4, name: "Evening journal", icon: "📓", category: "Mind", streak: 21, doneToday: false, target: 1, current: 0, isNumeric: false },
            { id: 5, name: "Supplements", icon: "💊", category: "Health", streak: 3, doneToday: false, target: 1, current: 0, isNumeric: false },
            { id: 6, name: "Stretch 15 min", icon: "🧘", category: "Fitness", streak: 7, doneToday: true, target: 1, current: 1, isNumeric: false },
        ],
        nutrition: {
            calories: { current: 1420, goal: 1800 }, protein: { current: 72, goal: 120 },
            carbs: { current: 160, goal: 200 }, fat: { current: 48, goal: 60 }, water: { current: 5, goal: 8 },
            fiber: { current: 18 }, sugar: { current: 32 }, sodium: { current: 1450 },
            vitaminC: { current: 68 }, iron: { current: 9.2 }, calcium: { current: 720 },
            logs: [
                { id: 1, name: "Acai bowl", time: "8:30 AM", cal: 380, protein: 8, carbs: 65, fat: 10, emoji: "🫐" },
                { id: 2, name: "Grilled chicken salad", time: "1:00 PM", cal: 520, protein: 42, carbs: 30, fat: 22, emoji: "🥗" },
                { id: 3, name: "Greek yogurt + honey", time: "4:00 PM", cal: 180, protein: 14, carbs: 28, fat: 3, emoji: "🍯" },
                { id: 4, name: "Matcha latte", time: "9:00 AM", cal: 120, protein: 4, carbs: 18, fat: 4, emoji: "🍵" },
            ],
            recipes: [],
            weekData: [1650, 1800, 1720, 1900, 1560, 1800, 1420],
        },
        fitness: {
            workoutsThisWeek: 4,
            workouts: [
                { id: 1, name: "Full Body Strength", date: "Today", duration: 55, calories: 320, type: "Strength", emoji: "🏋️", exercises: ["Squats 4×8", "Bench 3×10", "Deadlift 3×6", "OHP 3×10"] },
                { id: 2, name: "Morning Run 5K", date: "Yesterday", duration: 28, calories: 250, type: "Cardio", emoji: "🏃", exercises: ["5K run @ 5:35/km"] },
                { id: 3, name: "Pilates Flow", date: "Mon", duration: 45, calories: 180, type: "Flexibility", emoji: "🧘", exercises: ["Core work", "Hip flexors", "Spine mobility"] },
                { id: 4, name: "HIIT Circuit", date: "Sun", duration: 30, calories: 280, type: "HIIT", emoji: "⚡", exercises: ["Burpees 4×15", "Jump squats 4×20", "Mountain climbers 4×30s"] },
            ],
            weekData: [320, 250, 0, 180, 280, 0, 320],
            templates: [
                { id: 1, name: "Push Day", emoji: "💪", exercises: ["Bench Press 4×8", "Incline DB 3×10", "Shoulder Press 3×10", "Tricep Pushdown 3×12", "Lateral Raises 3×15"] },
                { id: 2, name: "Pull Day", emoji: "🏋️", exercises: ["Pull-ups 4×8", "Barbell Row 4×8", "Face Pulls 3×15", "Bicep Curls 3×12", "Hammer Curls 3×12"] },
                { id: 3, name: "Leg Day", emoji: "🦵", exercises: ["Squats 4×8", "Romanian Deadlift 3×10", "Leg Press 3×12", "Leg Curl 3×12", "Calf Raises 4×15"] },
                { id: 4, name: "HIIT 30", emoji: "⚡", exercises: ["Burpees 4×15", "Jump Squats 4×20", "Mountain Climbers 4×30s", "Box Jumps 3×10", "Sprint Intervals 5×30s"] },
            ],
            routines: [
                { id: "seed_push", name: "Push Day", emoji: "💪", type: "Strength", exercises: [
                    { name: "Bench Press", sets: 4, reps: "8", weight: "", rest: "90s", notes: "" },
                    { name: "Incline Dumbbell Press", sets: 3, reps: "10", weight: "", rest: "60s", notes: "" },
                    { name: "Overhead Press", sets: 3, reps: "10", weight: "", rest: "60s", notes: "" },
                    { name: "Tricep Pushdown", sets: 3, reps: "12", weight: "", rest: "45s", notes: "" },
                    { name: "Lateral Raise", sets: 3, reps: "15", weight: "", rest: "45s", notes: "" },
                ], createdAt: new Date().toISOString() },
                { id: "seed_pull", name: "Pull Day", emoji: "🏋️", type: "Strength", exercises: [
                    { name: "Pull-up", sets: 4, reps: "8", weight: "BW", rest: "90s", notes: "" },
                    { name: "Barbell Row", sets: 4, reps: "8", weight: "", rest: "90s", notes: "" },
                    { name: "Face Pull", sets: 3, reps: "15", weight: "", rest: "45s", notes: "" },
                    { name: "Dumbbell Curl", sets: 3, reps: "12", weight: "", rest: "45s", notes: "" },
                    { name: "Hammer Curl", sets: 3, reps: "12", weight: "", rest: "45s", notes: "" },
                ], createdAt: new Date().toISOString() },
                { id: "seed_legs", name: "Leg Day", emoji: "🦵", type: "Strength", exercises: [
                    { name: "Back Squat", sets: 4, reps: "8", weight: "", rest: "120s", notes: "" },
                    { name: "Romanian Deadlift", sets: 3, reps: "10", weight: "", rest: "90s", notes: "" },
                    { name: "Leg Press", sets: 3, reps: "12", weight: "", rest: "75s", notes: "" },
                    { name: "Leg Curl", sets: 3, reps: "12", weight: "", rest: "60s", notes: "" },
                    { name: "Standing Calf Raise", sets: 4, reps: "15", weight: "", rest: "45s", notes: "" },
                ], createdAt: new Date().toISOString() },
                { id: "seed_hiit", name: "HIIT 30", emoji: "⚡", type: "HIIT", exercises: [
                    { name: "Burpee", sets: 4, reps: "15", weight: "BW", rest: "30s", notes: "" },
                    { name: "Jump Squat", sets: 4, reps: "20", weight: "BW", rest: "30s", notes: "" },
                    { name: "Mountain Climber", sets: 4, reps: "30s", weight: "BW", rest: "30s", notes: "" },
                    { name: "Box Jump", sets: 3, reps: "10", weight: "BW", rest: "45s", notes: "" },
                ], createdAt: new Date().toISOString() },
            ],
        },
        skincare: {
            streak: 8, skinScore: 78,
            routine: {
                morning: [
                    { name: "Vitamin C Serum", brand: "Paula's Choice", done: true },
                    { name: "SPF 50 Sunscreen", brand: "La Roche-Posay", done: true },
                    { name: "Hydrating Toner", brand: "Laneige", done: false },
                ],
                evening: [
                    { name: "Oil Cleanser", brand: "DHC", done: false },
                    { name: "Retinol Serum", brand: "The Ordinary", done: false },
                    { name: "Night Cream", brand: "CeraVe", done: false },
                ],
            },
            weekData: [1, 1, 1, 0, 1, 1, 1],
            products: [
                { id: 1, name: "Vitamin C Serum", brand: "Paula's Choice", category: "Treatment", emoji: "🍊", rating: 5, replenishDate: "Jun 15" },
                { id: 2, name: "SPF 50 Sunscreen", brand: "La Roche-Posay", category: "Protection", emoji: "☀️", rating: 5, replenishDate: "Jul 1" },
                { id: 3, name: "Retinol Serum", brand: "The Ordinary", category: "Treatment", emoji: "🧴", rating: 4, replenishDate: "Aug 10" },
                { id: 4, name: "Night Cream", brand: "CeraVe", category: "Moisturizer", emoji: "🌙", rating: 5, replenishDate: "Sep 5" },
            ],
        },
        sleep: {
            goalHours: 8, bedtimeGoal: "11:00 PM",
            logs: [
                { id: 1, date: "May 12", bedtime: "11:00 PM", wake: "7:00 AM", hours: 8.0, quality: 4, notes: "Slept well" },
                { id: 2, date: "May 11", bedtime: "12:30 AM", wake: "7:30 AM", hours: 7.0, quality: 3, notes: "Took a while" },
                { id: 3, date: "May 10", bedtime: "10:30 PM", wake: "6:30 AM", hours: 8.0, quality: 5, notes: "Perfect sleep" },
                { id: 4, date: "May 9", bedtime: "1:00 AM", wake: "8:00 AM", hours: 7.0, quality: 3, notes: "" },
                { id: 5, date: "May 8", bedtime: "11:30 PM", wake: "7:00 AM", hours: 7.5, quality: 4, notes: "" },
                { id: 6, date: "May 7", bedtime: "10:00 PM", wake: "6:00 AM", hours: 8.0, quality: 5, notes: "Early night" },
                { id: 7, date: "May 6", bedtime: "1:30 AM", wake: "7:30 AM", hours: 6.0, quality: 2, notes: "Stressed" },
            ],
        },
        body: {
            measurements: [
                { id: 1, date: "May 12", weight: 134.9, waist: 68, hips: 92, chest: 86, arms: 28, thighs: 54 },
                { id: 2, date: "May 1", weight: 135.6, waist: 69, hips: 93, chest: 86, arms: 28, thighs: 55 },
                { id: 3, date: "Apr 15", weight: 136.3, waist: 70, hips: 93, chest: 87, arms: 28, thighs: 55 },
                { id: 4, date: "Apr 1", weight: 137.2, waist: 71, hips: 94, chest: 87, arms: 29, thighs: 56 },
            ],
        },
        cycle: {
            lastPeriodStart: "Apr 28", cycleLength: 28, periodLength: 5,
            logs: [
                { date: "Apr 28", flow: "medium", cramps: 3, mood: "tired", notes: "" },
                { date: "Apr 29", flow: "heavy", cramps: 4, mood: "irritable", notes: "" },
                { date: "Apr 30", flow: "medium", cramps: 2, mood: "okay", notes: "" },
                { date: "May 1", flow: "light", cramps: 1, mood: "better", notes: "" },
                { date: "May 2", flow: "spotting", cramps: 0, mood: "good", notes: "" },
            ],
        },
        journal: {
            entries: [
                { id: 1, date: "May 12", mood: "😊", energy: 8, tags: ["#grateful", "#productive"], text: "Really good day. Hit my workout and meal prep goals. Skin is looking clearer.", moodScore: 8 },
                { id: 2, date: "May 11", mood: "😐", energy: 6, tags: ["#tired", "#stressed"], text: "Work was hectic. Didn't work out but made healthy food choices.", moodScore: 6 },
                { id: 3, date: "May 10", mood: "😄", energy: 9, tags: ["#happy", "#grateful"], text: "Best day in a while! Morning run felt amazing. Everything clicking.", moodScore: 9 },
                { id: 4, date: "May 9", mood: "😔", energy: 5, tags: ["#anxious", "#tired"], text: "Hard day. Stressed about finances.", moodScore: 5 },
                { id: 5, date: "May 8", mood: "🙂", energy: 7, tags: ["#calm", "#productive"], text: "Decent day. Got a lot done.", moodScore: 7 },
            ],
        },
        budget: {
            savingsGoal: 1000,
            incomeSources: [
                { id: 1, name: "Salary", amount: 3800, emoji: "💼", recurring: true },
                { id: 2, name: "Freelance", amount: 400, emoji: "💻", recurring: false },
            ],
            categories: [
                { id: 1, name: "Groceries", budget: 500, emoji: "🛒", color: "var(--mint)" },
                { id: 2, name: "Dining out", budget: 200, emoji: "🍽️", color: "var(--rose)" },
                { id: 3, name: "Skincare & Beauty", budget: 150, emoji: "✨", color: "var(--violet)" },
                { id: 4, name: "Gym & Wellness", budget: 100, emoji: "💪", color: "var(--indigo)" },
                { id: 5, name: "Shopping", budget: 300, emoji: "🛍️", color: "var(--peach)" },
                { id: 6, name: "Transport", budget: 150, emoji: "🚇", color: "var(--sky)" },
                { id: 7, name: "Subscriptions", budget: 100, emoji: "📱", color: "var(--gold)" },
                { id: 8, name: "Healthcare", budget: 80, emoji: "🏥", color: "var(--mint)" },
            ],
            transactions: [
                { id: 1, date: "May 12", name: "Trader Joe's", amount: -87.40, category: "Groceries", emoji: "🛒", note: "" },
                { id: 2, date: "May 12", name: "Freelance payment", amount: 400.00, category: "Income", emoji: "💻", note: "Logo design" },
                { id: 3, date: "May 11", name: "Sephora", amount: -64.50, category: "Skincare & Beauty", emoji: "✨", note: "" },
                { id: 4, date: "May 11", name: "Chipotle", amount: -13.85, category: "Dining out", emoji: "🍽️", note: "" },
                { id: 5, date: "May 10", name: "Uber", amount: -18.20, category: "Transport", emoji: "🚗", note: "" },
                { id: 6, date: "May 10", name: "Costco", amount: -124.60, category: "Groceries", emoji: "🛒", note: "Monthly bulk" },
                { id: 7, date: "May 9", name: "Netflix", amount: -15.99, category: "Subscriptions", emoji: "📺", note: "" },
                { id: 8, date: "May 9", name: "Gym membership", amount: -45.00, category: "Gym & Wellness", emoji: "🏋️", note: "" },
                { id: 9, date: "May 8", name: "ZARA", amount: -89.00, category: "Shopping", emoji: "🛍️", note: "" },
                { id: 10, date: "May 8", name: "Spotify", amount: -9.99, category: "Subscriptions", emoji: "🎵", note: "" },
                { id: 11, date: "May 7", name: "Whole Foods", amount: -56.30, category: "Groceries", emoji: "🛒", note: "" },
                { id: 12, date: "May 6", name: "Starbucks", amount: -6.75, category: "Dining out", emoji: "☕", note: "" },
                { id: 13, date: "May 5", name: "Salary deposit", amount: 3800.00, category: "Income", emoji: "💼", note: "May paycheck" },
                { id: 14, date: "May 5", name: "Amazon", amount: -42.99, category: "Shopping", emoji: "📦", note: "Supplements" },
                { id: 15, date: "May 4", name: "CVS Pharmacy", amount: -22.40, category: "Healthcare", emoji: "🏥", note: "" },
                { id: 16, date: "May 3", name: "Sweetgreen", amount: -16.50, category: "Dining out", emoji: "🥗", note: "" },
                { id: 17, date: "May 2", name: "The Ordinary", amount: -28.00, category: "Skincare & Beauty", emoji: "🧴", note: "" },
                { id: 18, date: "May 1", name: "Metro card refill", amount: -33.00, category: "Transport", emoji: "🚇", note: "" },
            ],
            bills: [
                { id: 1, name: "Rent", amount: 1400, dueDay: 1, emoji: "🏠", paid: true, autoPay: true },
                { id: 2, name: "Electric", amount: 85, dueDay: 15, emoji: "💡", paid: false, autoPay: false },
                { id: 3, name: "Internet", amount: 60, dueDay: 18, emoji: "📡", paid: false, autoPay: true },
                { id: 4, name: "Phone", amount: 45, dueDay: 22, emoji: "📱", paid: false, autoPay: true },
                { id: 5, name: "Netflix", amount: 15.99, dueDay: 9, emoji: "📺", paid: true, autoPay: true },
                { id: 6, name: "Spotify", amount: 9.99, dueDay: 8, emoji: "🎵", paid: true, autoPay: true },
                { id: 7, name: "Gym", amount: 45, dueDay: 9, emoji: "💪", paid: true, autoPay: false },
            ],
            assets: [
                { id: 1, name: "Checking Account", amount: 3200, emoji: "🏦" },
                { id: 2, name: "Savings Account", amount: 6800, emoji: "💰" },
                { id: 3, name: "401k", amount: 12400, emoji: "📈" },
                { id: 4, name: "Roth IRA", amount: 4800, emoji: "💎" },
            ],
            liabilities: [
                { id: 1, name: "Credit Card", amount: 420, emoji: "💳" },
                { id: 2, name: "Student Loan", amount: 8200, emoji: "🎓" },
            ],
            monthlyData: [
                { month: "Jan", income: 3900, spent: 2600 }, { month: "Feb", income: 3800, spent: 2900 },
                { month: "Mar", income: 4100, spent: 2750 }, { month: "Apr", income: 4000, spent: 3100 },
                { month: "May", income: 4200, spent: 2840 },
            ],
        },
        goals: [
            { id: 1, name: "Reach 127 lbs", category: "Weight", current: 134.9, target: 127, unit: "lbs", deadline: "Aug 1", emoji: "⚖️", color: "var(--rose)", reverse: true },
            { id: 2, name: "Save $10,000", category: "Budget", current: 6800, target: 10000, unit: "$", deadline: "Dec 31", emoji: "💰", color: "var(--gold)", reverse: false },
            { id: 3, name: "Run 5K in 25min", category: "Fitness", current: 28, target: 25, unit: "min", deadline: "Jul 1", emoji: "🏃", color: "var(--mint)", reverse: true },
            { id: 4, name: "30-day clear skin", category: "Skincare", current: 21, target: 30, unit: "days", deadline: "Jun 1", emoji: "✨", color: "var(--violet)", reverse: false },
        ],
        checkins: [
            { id: 1, date: "May 12", weight: 134.9, mood: 8, energy: 7, notes: "Feeling good! Skin clearing up ✨" },
            { id: 2, date: "May 5", weight: 135.6, mood: 7, energy: 6, notes: "Little tired but stayed consistent" },
            { id: 3, date: "Apr 28", weight: 136.3, mood: 9, energy: 8, notes: "Best week yet! Hit all workout goals 💪" },
        ],
        achievements: [
            { id: 1, name: "First Steps", emoji: "👟", desc: "Logged your first workout", unlocked: true, color: "var(--mint)" },
            { id: 2, name: "Hydration Queen", emoji: "💧", desc: "Hit water goal 7 days in a row", unlocked: true, color: "var(--indigo)" },
            { id: 3, name: "Glow Up", emoji: "✨", desc: "Complete skincare 7 days straight", unlocked: true, color: "var(--violet)" },
            { id: 4, name: "Money Moves", emoji: "💰", desc: "Save 30% of income for a month", unlocked: false, color: "var(--gold)" },
            { id: 5, name: "Iron Will", emoji: "🏋️", desc: "Work out 5x/week for 4 weeks", unlocked: false, color: "var(--rose)" },
            { id: 6, name: "Journaling Journey", emoji: "📓", desc: "Journal for 21 days straight", unlocked: true, color: "var(--peach)" },
            { id: 7, name: "Century Club", emoji: "💯", desc: "Hit calorie goal 100 days", unlocked: false, color: "var(--sky)" },
            { id: 8, name: "Sleep Royalty", emoji: "😴", desc: "8+ hours sleep 7 days", unlocked: false, color: "var(--indigo)" },
            { id: 9, name: "Streak Legend", emoji: "🔥", desc: "Any habit for 30 days", unlocked: false, color: "var(--gold)" },
            { id: 10, name: "Budget Boss", emoji: "📊", desc: "Stay under budget all month", unlocked: false, color: "var(--mint)" },
        ],
        messages: [
            { role: "ai", content: "Hey! ✨ I'm Luna, your personal wellness AI. Before we start, tell me your goals, routines, and what you want to improve so I can personalize your coaching." },
        ],
    };
}
// Empty/fresh data — used by "Start Fresh" button to wipe demo data
function makeEmptyData() {
    return {
        user: { name: "", displayName: "", avatar: "🔥", xp: 0, joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), lastSaved: new Date().toISOString(), onboarded: false, pronouns: "", age: null, heightCm: null, weightKg: null, activityLevel: "moderate", primaryGoals: [], goalMode: "maintain" },
        settings: { calorieGoal: 2000, proteinGoal: 120, carbsGoal: 250, fatGoal: 70, waterGoal: 8,
            workoutGoalPerWeek: 4, savingsGoal: 500, currency: "USD", weightUnit: "lbs", gender: "prefer-not-to-say" },
        streaks: { habits: 0, workouts: 0, logging: 0, skincare: 0, sleep: 0 },
        habits: [],
        nutrition: {
            calories: { current: 0, goal: 2000 }, protein: { current: 0, goal: 120 },
            carbs: { current: 0, goal: 250 }, fat: { current: 0, goal: 70 }, water: { current: 0, goal: 8 },
            fiber: { current: 0 }, sugar: { current: 0 }, sodium: { current: 0 },
            vitaminC: { current: 0 }, iron: { current: 0 }, calcium: { current: 0 },
            logs: [],
            recipes: [],
            weekData: [0, 0, 0, 0, 0, 0, 0],
        },
        fitness: {
            workoutsThisWeek: 0, workouts: [], weekData: [0, 0, 0, 0, 0, 0, 0],
            templates: [],
            routines: [],
        },
        skincare: {
            streak: 0, skinScore: 50,
            routine: { morning: [], evening: [] },
            weekData: [0, 0, 0, 0, 0, 0, 0],
            products: [],
        },
        sleep: {
            goalHours: 8, bedtimeGoal: "11:00 PM",
            logs: [],
        },
        body: { measurements: [] },
        cycle: { lastPeriodStart: "Jan 1", cycleLength: 28, periodLength: 5, logs: [] },
        journal: { entries: [] },
        budget: {
            savingsGoal: 500,
            incomeSources: [],
            categories: [],
            transactions: [],
            bills: [],
            assets: [],
            liabilities: [],
            accounts: [],
            recurring: [],
            monthlyData: [
                { month: "Jan", income: 0, spent: 0 }, { month: "Feb", income: 0, spent: 0 },
                { month: "Mar", income: 0, spent: 0 }, { month: "Apr", income: 0, spent: 0 },
                { month: "May", income: 0, spent: 0 },
            ],
        },
        schedule: {
            blocks: defaultScheduleBlocks(),
            overrides: {},
            settings: { reminderLeadMin: 10 },
        },
        goals: [],
        checkins: [],
        achievements: [
            { id: 1, name: "First Steps", emoji: "👟", desc: "Logged your first workout", unlocked: false, color: "var(--mint)" },
            { id: 2, name: "Hydration Hero", emoji: "💧", desc: "Hit water goal 7 days in a row", unlocked: false, color: "var(--indigo)" },
            { id: 3, name: "Glow Up", emoji: "✨", desc: "Complete skincare 7 days straight", unlocked: false, color: "var(--violet)" },
            { id: 4, name: "Money Moves", emoji: "💰", desc: "Save 30% of income for a month", unlocked: false, color: "var(--gold)" },
            { id: 5, name: "Iron Will", emoji: "🏋️", desc: "Work out 5x/week for 4 weeks", unlocked: false, color: "var(--rose)" },
            { id: 6, name: "Journaling Journey", emoji: "📓", desc: "Journal for 21 days straight", unlocked: false, color: "var(--peach)" },
            { id: 7, name: "Century Club", emoji: "💯", desc: "Hit calorie goal 100 days", unlocked: false, color: "var(--sky)" },
            { id: 8, name: "Sleep King", emoji: "😴", desc: "8+ hours sleep 7 days", unlocked: false, color: "var(--indigo)" },
            { id: 9, name: "Streak Legend", emoji: "🔥", desc: "Any habit for 30 days", unlocked: false, color: "var(--gold)" },
            { id: 10, name: "Budget Boss", emoji: "📊", desc: "Stay under budget all month", unlocked: false, color: "var(--mint)" },
        ],
        messages: [
            { role: "ai", content: "Hey! ✨ I'm Luna, your wellness AI. Fresh start — let's set you up. What would you like to focus on first: habits, fitness, nutrition, or budget?" },
        ],
    };
}
function WaterCups({ current, goal, onAdd }) {
    const [splash, setSplash] = useState(-1);
    const tap = i => { if (i >= current) {
        setSplash(i);
        setTimeout(() => setSplash(-1), 380);
        onAdd(i + 1);
    } };
    return (React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 } }, Array.from({ length: goal }).map((_, i) => (React.createElement("div", { key: i, className: `cup ${i < current ? "filled" : ""} ${i === splash ? "splash" : ""}`, onClick: () => tap(i), title: i < current ? "Logged" : "Click to log" },
        React.createElement("div", { className: "cup-fill", style: { height: i < current ? "100%" : "0%" } }),
        React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 13, zIndex: 1 } }, i < current ? "💧" : ""))))));
}
function DashPage({ data, setData, toast, setPage }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { level, xpInLevel, xpNeeded } = calcLevel(data.user.xp);
    const h = new Date().getHours();
    const greeting = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    const done = data.habits.filter(x => x.doneToday).length;
    const totalSpent = data.budget.transactions.filter(t => t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0);
    const totalIncome = data.budget.transactions.filter(t => t.amount > 0 && t.type !== "transfer").reduce((s, t) => s + t.amount, 0);
    const networth = netWorthFromAccounts(data.budget.accounts || [], data.budget.transactions || []);
    const avgSleep = data.sleep.logs.length === 0 ? "0.0" : (data.sleep.logs.slice(0, 7).reduce((s, l) => s + l.hours, 0) / Math.min(data.sleep.logs.length, 7)).toFixed(1);
    const cycle = getCyclePhase(data.cycle.lastPeriodStart, data.cycle.cycleLength);
    const caloriesLeft = data.settings.calorieGoal - data.nutrition.calories.current;
    const addWater = cups => {
        setData(d => (Object.assign(Object.assign({}, d), { nutrition: Object.assign(Object.assign({}, d.nutrition), { water: Object.assign(Object.assign({}, d.nutrition.water), { current: cups }) }), user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 5 }) })));
        toast("+5 XP · Hydration logged 💧", "xp");
    };
    const zs = data.zeppSync;
    const watchFresh = zs && (Date.now() - (((_a = zs.device) === null || _a === void 0 ? void 0 : _a.rawTimestamp) || 0)) < 3600000; // within 1 hour
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 24, flexWrap: "wrap", gap: 12 } },
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 } },
                    greeting,
                    " \u00B7 ",
                    new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
                    watchFresh && React.createElement("span", { className: "b bv", style: { fontSize: 9.5 } }, "\u231A Watch synced")),
                React.createElement("h1", { style: { fontSize: 28, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 } },
                    data.user.name,
                    " ",
                    React.createElement("span", { style: { background: "var(--grad-rose)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } }, "\u2728"))),
            React.createElement("div", { className: "card gg", style: { padding: "11px 18px", cursor: "pointer", textAlign: "center" }, onClick: () => setPage("progress") },
                React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 } },
                    "Level ",
                    level),
                React.createElement("div", { style: { fontSize: 17, fontWeight: 800, background: "var(--grad-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } },
                    data.user.xp.toLocaleString(),
                    " XP"),
                React.createElement("div", { className: "xb", style: { marginTop: 5, width: 100 } },
                    React.createElement("div", { className: "xf", style: { width: `${(xpInLevel / xpNeeded) * 100}%` } })))),
        React.createElement("div", { style: { display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, marginBottom: 20 } }, [{ label: "Habits", val: data.streaks.habits, c: "var(--violet)" }, { label: "Workouts", val: data.streaks.workouts, c: "var(--rose)" }, { label: "Logging", val: data.streaks.logging, c: "var(--gold)" }, { label: "Skincare", val: data.streaks.skincare, c: "var(--mint)" }, { label: "Sleep", val: data.streaks.sleep, c: "var(--sky)" }].map(s => (React.createElement("div", { key: s.label, className: "card", style: { padding: "9px 14px", flexShrink: 0, display: "flex", alignItems: "center", gap: 7 } },
            React.createElement("span", { className: "fl" }, "\uD83D\uDD25"),
            React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: s.c, lineHeight: 1 } }, s.val),
                React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)" } }, s.label)))))),
        React.createElement("div", { className: "g4 sp" }, [
            { icon: "🔥", val: data.nutrition.calories.current, label: "Calories", sub: caloriesLeft > 0 ? `${caloriesLeft} left` : "Goal hit! 🎉", pct: data.nutrition.calories.current / data.settings.calorieGoal, color: "var(--peach)", page: "nutrition" },
            { icon: "💪", val: data.fitness.workoutsThisWeek, label: "Workouts", sub: `goal: ${data.settings.workoutGoalPerWeek}/wk`, pct: data.fitness.workoutsThisWeek / data.settings.workoutGoalPerWeek, color: "var(--violet)", page: "fitness" },
            { icon: "😴", val: (((_b = zs === null || zs === void 0 ? void 0 : zs.heartRate) === null || _b === void 0 ? void 0 : _b.resting) ? `${zs.heartRate.resting} bpm` : avgSleep + "h"), label: (((_c = zs === null || zs === void 0 ? void 0 : zs.heartRate) === null || _c === void 0 ? void 0 : _c.resting) ? "Resting HR" : "Avg Sleep"), sub: ((_d = zs === null || zs === void 0 ? void 0 : zs.heartRate) === null || _d === void 0 ? void 0 : _d.resting) ? "from watch ⌚" : `goal: ${data.sleep.goalHours}h`, pct: ((_e = zs === null || zs === void 0 ? void 0 : zs.heartRate) === null || _e === void 0 ? void 0 : _e.resting) ? (zs.heartRate.resting / 100) : (+avgSleep / data.sleep.goalHours), color: "var(--sky)", page: ((_f = zs === null || zs === void 0 ? void 0 : zs.heartRate) === null || _f === void 0 ? void 0 : _f.resting) ? "sleep" : "sleep" },
            { icon: "💰", val: `$${(totalIncome - totalSpent).toFixed(0)}`, label: "Net Saved", sub: totalIncome > totalSpent ? "on track ✨" : "check budget", pct: (totalIncome - totalSpent) / data.settings.savingsGoal, color: totalIncome > totalSpent ? "var(--mint)" : "var(--rose)", page: "budget" },
        ].map((s, i) => (React.createElement("div", { key: i, className: "sc", style: { cursor: "pointer" }, onClick: () => setPage(s.page) },
            React.createElement("div", { className: "si", style: { background: `${s.color}18` } }, s.icon),
            React.createElement("div", { className: "sv", style: { color: s.color } }, s.val),
            React.createElement("div", { className: "sl" }, s.label),
            React.createElement("div", { className: "ss" }, s.sub),
            React.createElement("div", { className: "pb", style: { marginTop: 6 } },
                React.createElement("div", { className: "pf", style: { width: `${Math.min((s.pct || 0) * 100, 100)}%`, background: s.color } })))))),
        React.createElement("div", { className: "g2 sp" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "flex fac fjb mb3" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Today's Habits"),
                    React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setPage("habits") }, "View all \u2192")),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, data.habits.slice(0, 4).map(h => (React.createElement("div", { key: h.id, className: `hr ${h.doneToday ? "done" : ""}`, onClick: () => {
                        setData(d => (Object.assign(Object.assign({}, d), { habits: d.habits.map(x => x.id === h.id ? Object.assign(Object.assign({}, x), { doneToday: !x.doneToday }) : x), user: !h.doneToday ? Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 25 }) : d.user })));
                        if (!h.doneToday)
                            toast(`+25 XP · ${h.name} ✅`, "xp");
                    } },
                    React.createElement("div", { className: "hc" }, h.doneToday ? "✓" : ""),
                    React.createElement("span", { style: { fontSize: 18 } }, h.icon),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600 } }, h.name),
                        React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } },
                            "\uD83D\uDD25 ",
                            h.streak,
                            " day streak"))))))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "flex fac fjb mb3" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Nutrition"),
                    React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setPage("nutrition") }, "Log \u2192")),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 10 } },
                    React.createElement(Ring, { value: data.nutrition.calories.current, max: data.settings.calorieGoal, size: 76, color: "var(--peach)", label: `${Math.round((data.nutrition.calories.current / data.settings.calorieGoal) * 100)}%`, sub: "Cals" }),
                    React.createElement(Ring, { value: data.nutrition.protein.current, max: data.settings.proteinGoal, size: 64, color: "var(--rose)", label: `${data.nutrition.protein.current}g`, sub: "Prot" }),
                    React.createElement(Ring, { value: data.nutrition.carbs.current, max: data.settings.carbsGoal, size: 64, color: "var(--indigo)", label: `${data.nutrition.carbs.current}g`, sub: "Carbs" })))),
        React.createElement("div", { className: "g2 sp" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "flex fac fjb mb2" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "\uD83D\uDCA7 Water Today"),
                    React.createElement("span", { className: "b bs" },
                        data.nutrition.water.current,
                        "/",
                        data.settings.waterGoal)),
                React.createElement(WaterCups, { current: data.nutrition.water.current, goal: data.settings.waterGoal, onAdd: addWater })),
            ((_g = data.settings) === null || _g === void 0 ? void 0 : _g.gender) !== "male" ? (React.createElement("div", { className: "card", style: { cursor: "pointer" }, onClick: () => setPage("cycle") },
                React.createElement("div", { className: "flex fac fjb mb2" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Cycle Phase"),
                    React.createElement("span", { className: "b", style: { background: `${cycle.color}18`, color: cycle.color } },
                        cycle.emoji,
                        " ",
                        cycle.phase)),
                React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)", marginBottom: 8 } },
                    "Day ",
                    cycle.day,
                    " of ",
                    data.cycle.cycleLength),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" } },
                    "\uD83D\uDCA1 ",
                    cycle.advice))) : (React.createElement("div", { className: "card" },
                React.createElement("div", { className: "flex fac fjb mb2" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "\uD83D\uDCAA Recovery"),
                    React.createElement("span", { className: "b bm" }, "Ready")),
                React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)", marginBottom: 8 } },
                    "Resting HR: ",
                    ((_j = (_h = data.zeppSync) === null || _h === void 0 ? void 0 : _h.heartRate) === null || _j === void 0 ? void 0 : _j.resting) || "—",
                    " bpm"),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" } }, "\uD83D\uDCA1 Hit the gym today \u2014 you're recovered")))),
        React.createElement("div", { className: "g2 sp" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "flex fac fjb mb3" },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Bills This Month"),
                    React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setPage("budget") }, "Manage \u2192")),
                data.budget.bills.slice(0, 4).map(b => (React.createElement("div", { key: b.id, className: "flex fac fjb", style: { padding: "8px 0", borderBottom: "1px solid var(--border)" } },
                    React.createElement("div", { className: "flex fac gap2" },
                        React.createElement("span", { style: { fontSize: 18 } }, b.emoji),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600 } }, b.name),
                            React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } },
                                "Due ",
                                b.dueDay,
                                "th",
                                b.autoPay ? " · AutoPay" : ""))),
                    React.createElement("div", { className: "flex fac gap2" },
                        React.createElement("span", { style: { fontWeight: 700, fontSize: 13 } },
                            "$",
                            b.amount),
                        React.createElement("span", { className: `b ${b.paid ? "bm" : "br"}` }, b.paid ? "Paid" : "Due")))))),
            React.createElement("div", { className: "card", style: { cursor: "pointer" }, onClick: () => setPage("budget") },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 12 } }, "Net Worth"),
                React.createElement("div", { style: { fontSize: 26, fontWeight: 800, color: "var(--gold)", marginBottom: 4 } },
                    "$",
                    networth.toLocaleString()),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 14 } },
                    "Assets: ",
                    React.createElement("strong", { style: { color: "var(--mint)" } },
                        "$",
                        totalAssetsFromAccounts(data.budget.accounts || [], data.budget.transactions || []).toLocaleString()),
                    " \u00B7 Debt: ",
                    React.createElement("strong", { style: { color: "var(--rose)" } },
                        "$",
                        totalLiabilitiesFromAccounts(data.budget.accounts || [], data.budget.transactions || []).toLocaleString())))),
        React.createElement("div", { className: "card" },
            React.createElement("div", { className: "flex fac fjb mb3" },
                React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "\uD83C\uDFC6 Achievements"),
                React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setPage("progress") }, "All \u2192")),
            React.createElement("div", { style: { display: "flex", gap: 9, overflowX: "auto", paddingBottom: 4 } }, data.achievements.filter(a => a.unlocked).map(a => (React.createElement("div", { key: a.id, style: { flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 12px", background: "var(--surface2)", borderRadius: 14, border: `1px solid ${a.color}33`, width: 82, textAlign: "center" } },
                React.createElement("span", { style: { fontSize: 26 } }, a.emoji),
                React.createElement("span", { style: { fontSize: 9.5, fontWeight: 600, color: a.color, lineHeight: 1.2 } }, a.name))))))));
}
function formatHistoryDate(key) {
    if (!key || typeof key !== "string") return key || "";
    const parts = key.split("-");
    if (parts.length !== 3) return key;
    const dt = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    if (isNaN(dt.getTime())) return key;
    return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function HabitsHistoryModal({ open, onClose, history }) {
    const list = Array.isArray(history) ? history : [];
    return React.createElement(Modal, { open, onClose, title: "Habit History 📅" },
        list.length === 0
            ? React.createElement("div", { style: { textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 } }, "No history yet — check back tomorrow!")
            : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, maxHeight: 460, overflowY: "auto" } },
                list.map(snap => {
                    const habits = Array.isArray(snap.habits) ? snap.habits : [];
                    const done = habits.filter(h => h.doneToday).length;
                    return React.createElement("div", { key: snap.date, style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 13, padding: 12 } },
                        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 8 } },
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, formatHistoryDate(snap.date)),
                            React.createElement("span", { className: "b bv", style: { fontSize: 10.5 } }, done + "/" + habits.length + " done")),
                        habits.length === 0
                            ? React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } }, "No habits tracked.")
                            : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } },
                                habits.map(h => React.createElement("div", { key: h.id, style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12 } },
                                    React.createElement("span", { style: { width: 16, color: h.doneToday ? "var(--mint)" : "var(--text-dim)" } }, h.doneToday ? "✓" : "·"),
                                    React.createElement("span", { style: { fontSize: 15 } }, h.icon || "•"),
                                    React.createElement("span", { style: { flex: 1, color: h.doneToday ? "var(--text)" : "var(--text-muted)" } }, h.name),
                                    h.isNumeric && React.createElement("span", { style: { fontSize: 10.5, color: "var(--text-dim)" } }, h.current + "/" + h.target),
                                    React.createElement("span", { style: { fontSize: 10.5, color: "var(--text-dim)" } }, "🔥" + h.streak + "d")))));
                })));
}
function NutritionHistoryModal({ open, onClose, history }) {
    const list = Array.isArray(history) ? history : [];
    return React.createElement(Modal, { open, onClose, title: "Nutrition History 📅" },
        list.length === 0
            ? React.createElement("div", { style: { textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 } }, "No history yet — check back tomorrow!")
            : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, maxHeight: 460, overflowY: "auto" } },
                list.map(snap => {
                    const nu = snap.nutrition || {};
                    const logs = Array.isArray(nu.logs) ? nu.logs : [];
                    return React.createElement("div", { key: snap.date, style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 13, padding: 12 } },
                        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 8 } },
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, formatHistoryDate(snap.date)),
                            React.createElement("span", { className: "b bp", style: { fontSize: 10.5 } }, Math.round(nu.calories || 0) + " kcal")),
                        React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 } },
                            [["P", nu.protein, "g"], ["C", nu.carbs, "g"], ["F", nu.fat, "g"], ["💧", nu.water, ""]].map((m, i) => React.createElement("span", { key: i, className: "b bv", style: { fontSize: 10 } }, m[0] + " " + Math.round(m[1] || 0) + m[2]))),
                        logs.length === 0
                            ? React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } }, "No food logged.")
                            : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
                                logs.map(log => React.createElement("div", { key: log.id, style: { display: "flex", alignItems: "center", gap: 7, fontSize: 11.5 } },
                                    React.createElement("span", { style: { fontSize: 14 } }, log.emoji || "🍽️"),
                                    React.createElement("span", { style: { flex: 1 } }, log.name),
                                    React.createElement("span", { style: { color: "var(--text-muted)" } }, (log.cal || 0) + " kcal")))));
                })));
}
function HabitsPage({ data, setData, toast }) {
    const [showHistory, setShowHistory] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [nh, setNh] = useState({ name: "", icon: "⭐", category: "Health", isNumeric: false, target: 1 });
    const done = data.habits.filter(h => h.doneToday).length;
    const toggle = h => {
        setData(d => (Object.assign(Object.assign({}, d), { habits: d.habits.map(x => x.id === h.id ? Object.assign(Object.assign({}, x), { doneToday: !x.doneToday, streak: !x.doneToday ? x.streak + 1 : Math.max(0, x.streak - 1) }) : x), user: !h.doneToday ? Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 25 }) : d.user, streaks: !h.doneToday ? Object.assign(Object.assign({}, d.streaks), { habits: d.streaks.habits + 1 }) : d.streaks })));
        if (!h.doneToday)
            toast(`+25 XP · ${h.name} ✅`, "xp");
    };
    const add = () => {
        if (!nh.name.trim())
            return;
        setData(d => (Object.assign(Object.assign({}, d), { habits: [...d.habits, Object.assign(Object.assign({ id: Date.now() }, nh), { streak: 0, doneToday: false, current: 0 })] })));
        toast("New habit added! 🌟");
        setShowAdd(false);
        setNh({ name: "", icon: "⭐", category: "Health", isNumeric: false, target: 1 });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Habits \uD83C\uDF31"),
                React.createElement("p", { className: "ss2" },
                    done,
                    "/",
                    data.habits.length,
                    " today \u00B7 Best: ",
                    data.habits.length === 0 ? 0 : Math.max(...data.habits.map(h => h.streak)),
                    "d \uD83D\uDD25")),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement("button", { className: "btn btn-s", onClick: () => setShowHistory(true) }, "History \uD83D\uDCC5"),
                React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                    React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                    "New Habit"))),
        React.createElement(HabitsHistoryModal, { open: showHistory, onClose: () => setShowHistory(false), history: data.history }),
        React.createElement("div", { className: "card gv sp", style: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" } },
            React.createElement(Ring, { value: done, max: data.habits.length, size: 96, color: "var(--violet)", label: `${done}/${data.habits.length}`, sub: "Today" }),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 18, fontWeight: 800, marginBottom: 6 } }, done === data.habits.length ? "All done! 🎉" : done > data.habits.length / 2 ? "Over halfway! 💪" : "Let's get it! ✨"),
                React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, ["Health", "Skincare", "Fitness", "Mind"].map(cat => { const t = data.habits.filter(h => h.category === cat).length, c = data.habits.filter(h => h.category === cat && h.doneToday).length; return t ? React.createElement("span", { key: cat, className: "b bv" },
                    cat,
                    ": ",
                    c,
                    "/",
                    t) : null; })))),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, data.habits.map(h => (React.createElement("div", { key: h.id, className: `hr ${h.doneToday ? "done" : ""}` },
            React.createElement("div", { onClick: () => toggle(h), style: { display: "contents" } },
                React.createElement("div", { className: "hc" }, h.doneToday ? "✓" : ""),
                React.createElement("span", { style: { fontSize: 21 } }, h.icon),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontWeight: 600, fontSize: 13.5 } }, h.name),
                    React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", display: "flex", gap: 8, marginTop: 2 } },
                        React.createElement("span", null,
                            "\uD83D\uDD25 ",
                            h.streak,
                            "d"),
                        React.createElement("span", { className: "b bv", style: { fontSize: 10 } }, h.category)))),
            h.isNumeric && React.createElement("div", { style: { textAlign: "right", marginRight: 8 }, onClick: () => toggle(h) },
                React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: h.doneToday ? "var(--mint)" : "var(--text)" } },
                    h.current,
                    "/",
                    h.target),
                React.createElement("div", { style: { width: 56, marginTop: 3 } },
                    React.createElement("div", { className: "pb" },
                        React.createElement("div", { className: "pf", style: { width: `${Math.min((h.current / h.target) * 100, 100)}%`, background: "var(--mint)" } })))),
            React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 28, height: 28, fontSize: 16, color: "var(--text-dim)", flexShrink: 0 }, onClick: e => { e.stopPropagation(); setData(d => (Object.assign(Object.assign({}, d), { habits: d.habits.filter(x => x.id !== h.id) }))); } }, "\u00D7"))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "Add Habit \u2728" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement(Field, { label: "Name" },
                    React.createElement("input", { className: "inp", placeholder: "e.g. Drink green tea", value: nh.name, onChange: e => setNh(n => (Object.assign(Object.assign({}, n), { name: e.target.value }))) })),
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: "Icon" },
                        React.createElement("input", { className: "inp", value: nh.icon, onChange: e => setNh(n => (Object.assign(Object.assign({}, n), { icon: e.target.value }))), style: { textAlign: "center", fontSize: 22, padding: "8px" } })),
                    React.createElement(Field, { label: "Category" },
                        React.createElement("select", { className: "inp", value: nh.category, onChange: e => setNh(n => (Object.assign(Object.assign({}, n), { category: e.target.value }))) }, ["Health", "Skincare", "Fitness", "Mind", "Custom"].map(c => React.createElement("option", { key: c }, c))))),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("input", { type: "checkbox", checked: nh.isNumeric, onChange: e => setNh(n => (Object.assign(Object.assign({}, n), { isNumeric: e.target.checked }))), style: { accentColor: "var(--violet)", width: 16, height: 16 } }),
                    React.createElement("label", { style: { fontSize: 13 } }, "Numeric target")),
                nh.isNumeric && React.createElement(Field, { label: "Daily Target" },
                    React.createElement("input", { className: "inp", type: "number", value: nh.target, onChange: e => setNh(n => (Object.assign(Object.assign({}, n), { target: +e.target.value }))) }))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 20 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Add Habit \u2728")))));
}
function NutritionPage({ data, setData, toast }) {
    const [showAdd, setShowAdd] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [nf, setNf] = useState({ name: "", emoji: "🍽️", cal: "", protein: "", carbs: "", fat: "", fiber: "", sugar: "", sodium: "", vitaminC: "", iron: "", calcium: "" });
    const [scanOpen, setScanOpen] = useState(false);
    const [scanStatus, setScanStatus] = useState("idle");
    const [scanError, setScanError] = useState("");
    const [photoOpen, setPhotoOpen] = useState(false);
    const [photoStatus, setPhotoStatus] = useState("idle");
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoResult, setPhotoResult] = useState(null);
    const [photoError, setPhotoError] = useState("");
    const [recipesOpen, setRecipesOpen] = useState(false);
    const [recipeUrlOpen, setRecipeUrlOpen] = useState(false);
    const [recipeUrl, setRecipeUrl] = useState("");
    const [recipeImporting, setRecipeImporting] = useState(false);
    const [recipeError, setRecipeError] = useState("");
    const [recipeReview, setRecipeReview] = useState(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);
    const scanControlsRef = useRef(null);
    const n = data.nutrition;
    const recipes = n.recipes || [];
    const searchFood = async () => {
        if (!search.trim())
            return;
        setSearching(true);
        setResults([]);
        try {
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 10000);
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(search)}&json=1&fields=product_name,brands,nutriments&page_size=8`;
            const r = await fetch(url, { signal: ctrl.signal, headers: { "Accept": "application/json" }, cache: "no-store" });
            clearTimeout(tid);
            if (!r.ok) throw new Error("api_" + r.status);
            const ct = r.headers.get("content-type") || "";
            if (!ct.includes("json")) throw new Error("not_json");
            const d = await r.json();
            const list = (d.products || []).filter(p => p.product_name && p.nutriments).slice(0, 6);
            setResults(list);
            if (list.length === 0) toast("No matches — try a simpler name", "info");
        }
        catch (e) {
            const msg = (e && e.message) || "";
            if (!navigator.onLine) toast("You're offline — connect to search foods", "error");
            else if (msg === "not_json" || msg.startsWith("api_")) toast("Food database is busy — try again in a moment", "error");
            else if (e && e.name === "AbortError") toast("Search timed out — try a shorter term", "error");
            else toast("Couldn't reach food database — enter manually", "error");
        }
        setSearching(false);
    };
    const pickResult = p => {
        const nm = (p && p.nutriments) || {};
        setNf({
            name: (p && p.product_name) || "", emoji: "🍽️",
            cal: Math.round(nm["energy-kcal_100g"] || nm["energy-kcal"] || 0),
            protein: Math.round(nm.proteins_100g || 0),
            carbs: Math.round(nm.carbohydrates_100g || 0),
            fat: Math.round(nm.fat_100g || 0),
            fiber: Math.round(nm.fiber_100g || 0),
            sugar: Math.round(nm.sugars_100g || 0),
            sodium: Math.round((nm.sodium_100g || 0) * 1000),
            vitaminC: Math.round((nm["vitamin-c_100g"] || 0) * 1000),
            iron: Math.round((nm.iron_100g || 0) * 1000 * 10) / 10,
            calcium: Math.round((nm.calcium_100g || 0) * 1000),
        });
        setResults([]);
        setSearch("");
        if (!p || !p.nutriments) {
            toast("No nutrition data — fill in what you can", "info");
        }
    };
    const add = () => {
        if (!nf.name.trim() || nf.cal === "")
            return;
        const cal = +nf.cal, protein = +nf.protein || 0, carbs = +nf.carbs || 0, fat = +nf.fat || 0;
        const fiber = +nf.fiber || 0, sugar = +nf.sugar || 0, sodium = +nf.sodium || 0;
        const vitaminC = +nf.vitaminC || 0, iron = +nf.iron || 0, calcium = +nf.calcium || 0;
        setData(d => {
            const nu = d.nutrition;
            const bump = (obj, val) => Object.assign({}, obj, { current: (obj.current || 0) + val });
            return Object.assign({}, d, {
                nutrition: Object.assign({}, nu, {
                    calories: bump(nu.calories, cal),
                    protein: bump(nu.protein, protein),
                    carbs: bump(nu.carbs, carbs),
                    fat: bump(nu.fat, fat),
                    fiber: bump(nu.fiber || { current: 0 }, fiber),
                    sugar: bump(nu.sugar || { current: 0 }, sugar),
                    sodium: bump(nu.sodium || { current: 0 }, sodium),
                    vitaminC: bump(nu.vitaminC || { current: 0 }, vitaminC),
                    iron: bump(nu.iron || { current: 0 }, iron),
                    calcium: bump(nu.calcium || { current: 0 }, calcium),
                    logs: [{ id: Date.now(), name: nf.name, emoji: nf.emoji, cal, protein, carbs, fat, fiber, sugar, sodium, vitaminC, iron, calcium, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...nu.logs]
                }),
                user: Object.assign({}, d.user, { xp: d.user.xp + 10 })
            });
        });
        toast(`+10 XP · ${nf.name} logged 🍴`, "xp");
        setShowAdd(false);
        setNf({ name: "", emoji: "🍽️", cal: "", protein: "", carbs: "", fat: "", fiber: "", sugar: "", sodium: "", vitaminC: "", iron: "", calcium: "" });
    };
    const del = id => setData(d => {
        const log = d.nutrition.logs.find(l => l.id === id);
        if (!log) return d;
        const nu = d.nutrition;
        const dock = (obj, val) => Object.assign({}, obj, { current: Math.max(0, (obj.current || 0) - (val || 0)) });
        return Object.assign({}, d, { nutrition: Object.assign({}, nu, {
            calories: dock(nu.calories, log.cal),
            protein: dock(nu.protein, log.protein),
            carbs: dock(nu.carbs, log.carbs),
            fat: dock(nu.fat, log.fat),
            fiber: dock(nu.fiber || { current: 0 }, log.fiber),
            sugar: dock(nu.sugar || { current: 0 }, log.sugar),
            sodium: dock(nu.sodium || { current: 0 }, log.sodium),
            vitaminC: dock(nu.vitaminC || { current: 0 }, log.vitaminC),
            iron: dock(nu.iron || { current: 0 }, log.iron),
            calcium: dock(nu.calcium || { current: 0 }, log.calcium),
            logs: nu.logs.filter(l => l.id !== id)
        }) });
    });
    const lookupBarcode = async (code) => {
        toast(`Scanned ${code} — looking up…`, "info");
        try {
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 10000);
            const r = await fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`, { signal: ctrl.signal, cache: "no-store" });
            clearTimeout(tid);
            if (!r.ok) throw new Error("api");
            const d = await r.json();
            if (d.status !== 1 || !d.product || !d.product.product_name) {
                toast("Product not in food database — enter manually", "info");
                setShowAdd(true);
                return;
            }
            pickResult(d.product);
            setShowAdd(true);
            toast(`Found: ${d.product.product_name}`, "success");
        } catch (_e) {
            toast("Couldn't look up the barcode — try again or enter manually", "error");
            setShowAdd(true);
        }
    };
    const stopScanner = () => {
        try { if (scanControlsRef.current && typeof scanControlsRef.current.stop === "function") scanControlsRef.current.stop(); } catch (_e) {}
        scanControlsRef.current = null;
    };
    const openBarcodeScanner = async () => {
        // Close the parent Log Food modal so the scanner camera view isn't
        // stacked on top of it (avoids z-index/touch issues on mobile).
        setShowAdd(false);
        setScanOpen(true);
        setScanStatus("starting");
        setScanError("");
        try {
            const mod = await import("https://esm.sh/@zxing/browser@0.1.5");
            const Reader = mod.BrowserMultiFormatReader || (mod.default && mod.default.BrowserMultiFormatReader);
            if (!Reader) throw new Error("Scanner library failed to load");
            const reader = new Reader();
            // Wait for the video element to appear in the DOM. On slower
            // mobile devices the first tick after opening the modal isn't
            // always enough — retry briefly before giving up.
            let videoEl = null;
            for (let i = 0; i < 20; i++) {
                videoEl = videoRef.current;
                if (videoEl) break;
                await new Promise(r => setTimeout(r, 50));
            }
            if (!videoEl) throw new Error("Camera view not ready");
            setScanStatus("scanning");
            const onDecoded = (result, err, ctrl) => {
                if (result) {
                    const code = result.getText();
                    try { ctrl.stop(); } catch (_e) {}
                    scanControlsRef.current = null;
                    setScanOpen(false);
                    setScanStatus("idle");
                    lookupBarcode(code);
                }
            };
            // Prefer the rear camera on phones. Fall back to default device
            // selection if constraints aren't honoured (e.g. desktops without
            // a facing-aware webcam).
            let controls;
            try {
                controls = await reader.decodeFromConstraints(
                    { audio: false, video: { facingMode: { ideal: "environment" } } },
                    videoEl,
                    onDecoded,
                );
            } catch (_e) {
                controls = await reader.decodeFromVideoDevice(undefined, videoEl, onDecoded);
            }
            scanControlsRef.current = controls;
        } catch (e) {
            const msg = String((e && e.message) || e);
            setScanStatus("error");
            if (e && (e.name === "NotAllowedError" || /Permission|denied/i.test(msg))) {
                setScanError("Camera access was blocked. Allow camera permission in your browser settings, then try again.");
            } else if (e && (e.name === "NotFoundError" || /no.*camera|device/i.test(msg))) {
                setScanError("No camera found on this device.");
            } else {
                setScanError("Couldn't start the camera — " + msg);
            }
        }
    };
    const closeScanner = () => { stopScanner(); setScanOpen(false); setScanStatus("idle"); setScanError(""); };
    useEffect(() => { return () => stopScanner(); }, []);
    const onPhotoPick = (ev) => {
        const file = ev.target.files && ev.target.files[0];
        if (ev.target) ev.target.value = "";
        if (!file) return;
        // Cap aligned with server's 12MB base64 limit (base64 ≈ 1.37× raw).
        if (file.size > 8 * 1024 * 1024) {
            toast("Image too large (max 8MB). Try a smaller photo.", "error");
            return;
        }
        setPhotoOpen(true);
        setPhotoError("");
        setPhotoResult(null);
        setPhotoStatus("analyzing");
        const fr = new FileReader();
        fr.onload = async () => {
            const dataUrl = String(fr.result || "");
            const m = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
            if (!m) { setPhotoStatus("error"); setPhotoError("Couldn't read the image."); return; }
            setPhotoPreview(dataUrl);
            try {
                const r = await fetch("/api/photo-analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageBase64: m[2], mime: m[1] }),
                });
                const j = await r.json().catch(() => ({}));
                if (!r.ok || !j.ok) {
                    setPhotoStatus("error");
                    if (j && j.error === "ai_not_configured") setPhotoError("Photo AI needs an OpenAI API key set on the server. Use Scan barcode or enter manually for now.");
                    else if (r.status === 502) setPhotoError("AI couldn't analyze the photo. Try a clearer image or enter manually.");
                    else setPhotoError("Couldn't analyze the photo. Try again.");
                    return;
                }
                setPhotoResult(j.result);
                setPhotoStatus("review");
            } catch (_e) {
                setPhotoStatus("error");
                setPhotoError("Network error — check your connection.");
            }
        };
        fr.onerror = () => { setPhotoStatus("error"); setPhotoError("Couldn't read that image."); };
        fr.readAsDataURL(file);
    };
    const closePhoto = () => { setPhotoOpen(false); setPhotoStatus("idle"); setPhotoPreview(null); setPhotoResult(null); setPhotoError(""); };
    const confirmPhotoLog = () => {
        if (!photoResult) return;
        const r = photoResult;
        setNf({
            name: String(r.name || "Meal"), emoji: String(r.emoji || "🍽️"),
            cal: Math.round(+r.cal || 0),
            protein: Math.round(+r.protein || 0),
            carbs: Math.round(+r.carbs || 0),
            fat: Math.round(+r.fat || 0),
            fiber: Math.round(+r.fiber || 0),
            sugar: Math.round(+r.sugar || 0),
            sodium: Math.round(+r.sodium || 0),
            vitaminC: Math.round(+r.vitaminC || 0),
            iron: Math.round((+r.iron || 0) * 10) / 10,
            calcium: Math.round(+r.calcium || 0),
        });
        closePhoto();
        setShowAdd(true);
    };
    // Build a recipe record from an arbitrary source object that uses the
    // flat nutrient field names (works for both `nf` form state and saved
    // food-log entries).
    const buildRecipe = (src) => {
        const cal = +src.cal || 0, protein = +src.protein || 0, carbs = +src.carbs || 0, fat = +src.fat || 0;
        const fiber = +src.fiber || 0, sugar = +src.sugar || 0, sodium = +src.sodium || 0;
        const vitaminC = +src.vitaminC || 0, iron = +src.iron || 0, calcium = +src.calcium || 0;
        // Collision-resistant ID: prefer crypto.randomUUID(), fall back to a
        // time-prefixed cryptographically random hex when unavailable.
        let id;
        try {
            if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
                id = crypto.randomUUID();
            } else if (typeof crypto !== "undefined" && crypto.getRandomValues) {
                const buf = new Uint8Array(8);
                crypto.getRandomValues(buf);
                const hex = Array.from(buf).map(b => b.toString(16).padStart(2, "0")).join("");
                id = `${Date.now().toString(36)}-${hex}`;
            } else {
                id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
            }
        } catch (_e) {
            id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        }
        return {
            id,
            name: src.name, emoji: src.emoji || "🍽️",
            ingredients: Array.isArray(src.ingredients) ? src.ingredients.slice() : [],
            cal, protein, carbs, fat, fiber, sugar, sodium, vitaminC, iron, calcium,
            // Convenience nested views for callers that prefer the macros/micros shape.
            macros: { cal, protein, carbs, fat },
            micros: { fiber, sugar, sodium, vitaminC, iron, calcium },
            createdAt: new Date().toISOString(),
        };
    };
    const saveCurrentAsRecipe = () => {
        if (!nf.name.trim() || nf.cal === "") { toast("Enter a name and calories first", "error"); return; }
        const recipe = buildRecipe(nf);
        setData(d => Object.assign({}, d, { nutrition: Object.assign({}, d.nutrition, { recipes: [recipe, ...(d.nutrition.recipes || [])] }) }));
        toast(`Saved "${nf.name}" to recipes 📒`, "success");
    };
    // Save an already-logged food entry as a reusable recipe.
    const saveLogAsRecipe = (log) => {
        if (!log || !log.name) return;
        const recipe = buildRecipe(log);
        setData(d => Object.assign({}, d, { nutrition: Object.assign({}, d.nutrition, { recipes: [recipe, ...(d.nutrition.recipes || [])] }) }));
        toast(`Saved "${log.name}" to recipes 📒`, "success");
    };
    // True one-tap log: directly appends to today's nutrition without opening the modal.
    const logRecipe = (r) => {
        const cal = +r.cal || 0, protein = +r.protein || 0, carbs = +r.carbs || 0, fat = +r.fat || 0;
        const fiber = +r.fiber || 0, sugar = +r.sugar || 0, sodium = +r.sodium || 0;
        const vitaminC = +r.vitaminC || 0, iron = +r.iron || 0, calcium = +r.calcium || 0;
        setData(d => {
            const nu = d.nutrition;
            const bump = (obj, val) => Object.assign({}, obj, { current: (obj.current || 0) + val });
            return Object.assign({}, d, {
                nutrition: Object.assign({}, nu, {
                    calories: bump(nu.calories, cal),
                    protein: bump(nu.protein, protein),
                    carbs: bump(nu.carbs, carbs),
                    fat: bump(nu.fat, fat),
                    fiber: bump(nu.fiber || { current: 0 }, fiber),
                    sugar: bump(nu.sugar || { current: 0 }, sugar),
                    sodium: bump(nu.sodium || { current: 0 }, sodium),
                    vitaminC: bump(nu.vitaminC || { current: 0 }, vitaminC),
                    iron: bump(nu.iron || { current: 0 }, iron),
                    calcium: bump(nu.calcium || { current: 0 }, calcium),
                    logs: [{ id: Date.now(), name: r.name, emoji: r.emoji || "🍽️", cal, protein, carbs, fat, fiber, sugar, sodium, vitaminC, iron, calcium, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...nu.logs]
                }),
                user: Object.assign({}, d.user, { xp: d.user.xp + 10 })
            });
        });
        toast(`+10 XP · ${r.name} logged 🍴`, "xp");
    };
    // Edit-before-log: opens the Log Food modal pre-filled with the recipe.
    const editAndLogRecipe = (r) => {
        setNf({
            name: r.name, emoji: r.emoji || "🍽️",
            cal: r.cal || 0, protein: r.protein || 0, carbs: r.carbs || 0, fat: r.fat || 0,
            fiber: r.fiber || 0, sugar: r.sugar || 0, sodium: r.sodium || 0,
            vitaminC: r.vitaminC || 0, iron: r.iron || 0, calcium: r.calcium || 0,
        });
        setRecipesOpen(false);
        setShowAdd(true);
    };
    const deleteRecipe = (id) => setData(d => Object.assign({}, d, { nutrition: Object.assign({}, d.nutrition, { recipes: (d.nutrition.recipes || []).filter(r => r.id !== id) }) }));
    const importRecipeFromUrl = async () => {
        const url = recipeUrl.trim();
        if (!url) return;
        if (!/^https?:\/\//i.test(url)) { setRecipeError("Enter a full URL starting with http:// or https://"); return; }
        setRecipeImporting(true);
        setRecipeError("");
        setRecipeReview(null);
        try {
            const r = await fetch("/api/recipe-from-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            const j = await r.json().catch(() => ({}));
            if (!r.ok || !j.ok) {
                if (j && j.error === "ai_not_configured") setRecipeError("URL import needs an OpenAI API key set on the server.");
                else if (j && j.error === "fetch_failed") setRecipeError("Couldn't load that page. The site may block scrapers.");
                else setRecipeError("Couldn't extract a recipe from that link.");
            } else {
                setRecipeReview(j.result);
            }
        } catch (_e) {
            setRecipeError("Network error.");
        }
        setRecipeImporting(false);
    };
    const saveImportedRecipe = () => {
        if (!recipeReview) return;
        const r = recipeReview;
        const per = r.perServing || {};
        // Build through the shared buildRecipe so imported recipes share the
        // exact same shape (including macros/micros nested objects) as recipes
        // saved from the Log Food form or from existing log rows.
        const base = buildRecipe({
            name: String(r.name || "Imported recipe"),
            emoji: String(r.emoji || "🍽️"),
            ingredients: Array.isArray(r.ingredients) ? r.ingredients.slice(0, 30).map(s => String(s).slice(0, 200)) : [],
            cal: per.cal, protein: per.protein, carbs: per.carbs, fat: per.fat,
            fiber: per.fiber, sugar: per.sugar, sodium: per.sodium,
            vitaminC: per.vitaminC, iron: per.iron, calcium: per.calcium,
        });
        const recipe = Object.assign({}, base, {
            servings: Math.max(1, Math.round(+r.servings || 1)),
            aiNote: String(r.note || ""),
            sourceUrl: recipeUrl.trim(),
        });
        setData(d => Object.assign({}, d, { nutrition: Object.assign({}, d.nutrition, { recipes: [recipe, ...(d.nutrition.recipes || [])] }) }));
        toast(`Imported "${recipe.name}" 📥`, "success");
        setRecipeReview(null);
        setRecipeUrl("");
        setRecipeUrlOpen(false);
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Nutrition \uD83E\uDD57"),
                React.createElement("p", { className: "ss2" }, "Track macros & calories")),
            React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                React.createElement("button", { className: "btn btn-s", onClick: () => setRecipesOpen(true) }, "Recipes \uD83D\uDCD2" + (recipes.length ? ` (${recipes.length})` : "")),
                React.createElement("button", { className: "btn btn-s", onClick: () => setShowHistory(true) }, "History \uD83D\uDCC5"),
                React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                    React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                    "Log Food"))),
        React.createElement(NutritionHistoryModal, { open: showHistory, onClose: () => setShowHistory(false), history: data.history }),
        React.createElement("div", { className: "card gr sp" },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 14, padding: "6px 0" } }, [{ v: n.calories.current, max: data.settings.calorieGoal, label: "Cals", sub: `/${data.settings.calorieGoal}`, color: "var(--peach)", size: 106 }, { v: n.protein.current, max: data.settings.proteinGoal, label: "Protein", sub: `${n.protein.current}g`, color: "var(--rose)", size: 88 }, { v: n.carbs.current, max: data.settings.carbsGoal, label: "Carbs", sub: `${n.carbs.current}g`, color: "var(--indigo)", size: 88 }, { v: n.fat.current, max: data.settings.fatGoal, label: "Fat", sub: `${n.fat.current}g`, color: "var(--violet)", size: 88 }].map((m, i) => (React.createElement("div", { key: i, style: { textAlign: "center" } },
                React.createElement(Ring, { value: m.v, max: m.max, size: m.size, color: m.color, label: i === 0 ? m.v : m.sub, sub: m.label })))))),
        React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Micronutrients (today)"),
            React.createElement("div", { className: "g3", style: { gap: 10 } }, [
                { k: "fiber", label: "Fiber", unit: "g", goal: 25, color: "var(--mint)", icon: "🌾" },
                { k: "sugar", label: "Sugar", unit: "g", goal: 50, color: "var(--peach)", icon: "🍬", limit: true },
                { k: "sodium", label: "Sodium", unit: "mg", goal: 2300, color: "var(--rose)", icon: "🧂", limit: true },
                { k: "vitaminC", label: "Vit C", unit: "mg", goal: 90, color: "var(--gold)", icon: "🍊" },
                { k: "iron", label: "Iron", unit: "mg", goal: (data.settings.gender === "male" ? 8 : 18), color: "var(--indigo)", icon: "🩸" },
                { k: "calcium", label: "Calcium", unit: "mg", goal: 1000, color: "var(--sky)", icon: "🥛" },
            ].map(m => {
                const cur = (n[m.k] && n[m.k].current) || 0;
                const pct = Math.min(100, Math.round((cur / m.goal) * 100));
                const over = m.limit && cur > m.goal;
                return React.createElement("div", { key: m.k, style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, padding: 10 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--text-muted)", marginBottom: 4 } }, m.icon, " ", m.label),
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 14, color: over ? "var(--rose)" : m.color } }, cur + (m.limit && cur > m.goal ? " ⚠" : ""), React.createElement("span", { style: { fontSize: 10, color: "var(--text-muted)", marginLeft: 3, fontWeight: 500 } }, "/" + m.goal + m.unit)),
                    React.createElement("div", { style: { height: 4, background: "var(--surface)", borderRadius: 4, overflow: "hidden", marginTop: 6 } },
                        React.createElement("div", { style: { height: "100%", width: pct + "%", background: over ? "var(--rose)" : m.color, transition: "width 0.3s" } })));
            }))),
        React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Weekly Calories"),
            React.createElement(BarChart, { data: n.weekData, color: "var(--peach)", height: 75, labels: WEEK_LABELS })),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 13, gap: 8 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Recipes \uD83D\uDCD2" + (recipes.length ? ` (${recipes.length})` : "")),
                React.createElement("div", { style: { display: "flex", gap: 6 } },
                    React.createElement("button", { className: "btn btn-s btn-sm", style: { minHeight: 32, fontSize: 11.5 }, onClick: () => setRecipeUrlOpen(true) }, "\uD83D\uDD17 Import"),
                    recipes.length > 0 && React.createElement("button", { className: "btn btn-g btn-sm", style: { minHeight: 32, fontSize: 11.5 }, onClick: () => setRecipesOpen(true) }, "Manage"))),
            recipes.length === 0
                ? React.createElement("div", { style: { textAlign: "center", padding: 16, color: "var(--text-muted)", fontSize: 12 } }, "Save meals as recipes to log them in one tap.")
                : React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 } }, recipes.slice(0, 8).map(r => React.createElement("button", { key: r.id, className: "btn btn-g", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 92, padding: "10px 8px", flexShrink: 0 }, onClick: () => logRecipe(r), title: `Log ${r.name}` },
                    React.createElement("span", { style: { fontSize: 22 } }, r.emoji || "🍽️"),
                    React.createElement("div", { style: { fontSize: 11, fontWeight: 600, maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.name),
                    React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)" } }, `${r.cal} kcal`))))),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Today's Food Log"),
            n.logs.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 } }, "No food logged yet \uD83E\uDD57"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, n.logs.map(log => (React.createElement("div", { key: log.id, style: { display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", background: "var(--surface2)", borderRadius: 13, border: "1px solid var(--border)" } },
                React.createElement("span", { style: { fontSize: 22 } }, log.emoji),
                React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                    React.createElement("div", { style: { fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, log.name),
                    React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, log.time)),
                React.createElement("span", { className: "b bp" },
                    log.cal,
                    " kcal"),
                React.createElement("span", { className: "b br" },
                    log.protein,
                    "g P"),
                React.createElement("button", { className: "btn btn-g btn-ic", title: "Save as recipe", style: { width: 26, height: 26, fontSize: 13, color: "var(--text-dim)" }, onClick: () => saveLogAsRecipe(log) }, "\uD83D\uDCD2"),
                React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 26, height: 26, fontSize: 15, color: "var(--text-dim)" }, onClick: () => del(log.id) }, "\u00D7")))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "Log Food \uD83C\uDF74" },
            React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" } },
                React.createElement("button", { className: "btn btn-s w100", style: { flex: "1 1 140px", minHeight: 44 }, onClick: openBarcodeScanner }, "\uD83D\uDCF7 Scan barcode"),
                React.createElement("button", { className: "btn btn-s w100", style: { flex: "1 1 140px", minHeight: 44 }, onClick: () => fileRef.current && fileRef.current.click() }, "\uD83D\uDCF8 Snap meal (AI)"),
                React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", capture: "environment", style: { display: "none" }, onChange: onPhotoPick })),
            React.createElement("div", { style: { marginBottom: 16 } },
                React.createElement("label", { className: "label" }, "Search Food Database (3M+ items, free)"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("input", { className: "inp", placeholder: "e.g. Greek yogurt, banana...", value: search, onChange: e => setSearch(e.target.value), onKeyDown: e => e.key === "Enter" && searchFood() }),
                    React.createElement("button", { className: "btn btn-s", onClick: searchFood, style: { flexShrink: 0 } }, searching ? "..." : "Search")),
                results.length > 0 && (React.createElement("div", { style: { marginTop: 8, display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" } }, results.map((r, i) => {
                    var _a, _b;
                    return (React.createElement("div", { key: i, style: { padding: "9px 12px", background: "var(--surface2)", borderRadius: 10, cursor: "pointer", border: "1px solid var(--border)", fontSize: 12.5 }, onClick: () => pickResult(r), onMouseEnter: e => e.currentTarget.style.borderColor = "var(--violet)", onMouseLeave: e => e.currentTarget.style.borderColor = "var(--border)" },
                        React.createElement("div", { style: { fontWeight: 600 } }, r.product_name),
                        React.createElement("div", { style: { color: "var(--text-muted)", fontSize: 11 } },
                            Math.round(((_a = r.nutriments) === null || _a === void 0 ? void 0 : _a["energy-kcal_100g"]) || 0),
                            " kcal \u00B7 ",
                            Math.round(((_b = r.nutriments) === null || _b === void 0 ? void 0 : _b.proteins_100g) || 0),
                            "g P per 100g")));
                })))),
            React.createElement("div", { style: { height: 1, background: "var(--border)", margin: "12px 0" } }),
            React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 12 } }, "Or enter manually:"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                React.createElement("div", { style: { display: "flex", gap: 9 } },
                    React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                        React.createElement("input", { className: "inp", value: nf.emoji, onChange: e => setNf(f => (Object.assign(Object.assign({}, f), { emoji: e.target.value }))), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                    React.createElement(Field, { label: "Food Name", style: { flex: 1 } },
                        React.createElement("input", { className: "inp", placeholder: "Avocado toast", value: nf.name, onChange: e => setNf(f => (Object.assign(Object.assign({}, f), { name: e.target.value }))) }))),
                React.createElement("div", { className: "g2" }, [["cal", "Calories (kcal)"], ["protein", "Protein (g)"], ["carbs", "Carbs (g)"], ["fat", "Fat (g)"]].map(([k, lbl]) => (React.createElement(Field, { key: k, label: lbl },
                    React.createElement("input", { className: "inp", type: "number", placeholder: "0", value: nf[k], onChange: e => setNf(f => (Object.assign(Object.assign({}, f), { [k]: e.target.value }))) }))))),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginTop: 4, marginBottom: 2 } }, "Micros (optional)"),
                React.createElement("div", { className: "g3" }, [["fiber", "Fiber (g)"], ["sugar", "Sugar (g)"], ["sodium", "Sodium (mg)"], ["vitaminC", "Vit C (mg)"], ["iron", "Iron (mg)"], ["calcium", "Calcium (mg)"]].map(([k, lbl]) => (React.createElement(Field, { key: k, label: lbl },
                    React.createElement("input", { className: "inp", type: "number", placeholder: "0", value: nf[k], onChange: e => setNf(f => (Object.assign(Object.assign({}, f), { [k]: e.target.value }))) })))))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18, flexWrap: "wrap" } },
                React.createElement("button", { className: "btn btn-g", style: { flex: "1 1 100%", minHeight: 40 }, onClick: saveCurrentAsRecipe }, "\uD83D\uDCD2 Save as recipe"),
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Log Food \uD83C\uDF7D\uFE0F"))),
        React.createElement(Modal, { open: scanOpen, onClose: closeScanner, title: "Scan Barcode \uD83D\uDCF7" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                scanStatus === "error"
                    ? React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--rose)", color: "var(--rose)", padding: 14, borderRadius: 12, fontSize: 13 } }, scanError)
                    : React.createElement("div", { style: { position: "relative", background: "#000", borderRadius: 14, overflow: "hidden", aspectRatio: "4 / 3" } },
                        React.createElement("video", { ref: videoRef, playsInline: true, muted: true, autoPlay: true, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
                        React.createElement("div", { style: { position: "absolute", inset: "20% 12% 20% 12%", border: "2px solid rgba(255,255,255,0.7)", borderRadius: 12, pointerEvents: "none" } }),
                        scanStatus === "starting" && React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 } }, "Starting camera\u2026")),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", textAlign: "center" } }, "Point your camera at the barcode on a packaged food. We'll auto-fill nutrition from Open Food Facts."),
                React.createElement("button", { className: "btn btn-g w100", onClick: closeScanner }, "Cancel"))),
        React.createElement(Modal, { open: photoOpen, onClose: closePhoto, title: "Snap Meal \uD83D\uDCF8" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.45 } },
                    "\u2728 AI estimate \u2014 edit if needed. Even paid apps are estimates; treat this as a starting point."),
                photoPreview && React.createElement("img", { src: photoPreview, alt: "Meal", style: { width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12 } }),
                photoStatus === "analyzing" && React.createElement("div", { style: { textAlign: "center", padding: 18, color: "var(--text-muted)", fontSize: 13 } }, "Analyzing your meal\u2026 \uD83E\uDD16"),
                photoStatus === "error" && React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--rose)", color: "var(--rose)", padding: 12, borderRadius: 10, fontSize: 12.5 } }, photoError),
                photoStatus === "review" && photoResult && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                    React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, "\u2728 AI estimate \u2014 tap Review & log to edit values before saving."),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("span", { style: { fontSize: 26 } }, photoResult.emoji || "🍽️"),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, photoResult.name || "Meal"),
                            React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, "Confidence: " + (photoResult.confidence || "medium")))),
                    React.createElement("div", { className: "g3", style: { gap: 8 } }, [
                        ["cal", "kcal"], ["protein", "P (g)"], ["carbs", "C (g)"],
                        ["fat", "F (g)"], ["fiber", "Fiber"], ["sodium", "Na (mg)"],
                    ].map(([k, lbl]) => React.createElement("div", { key: k, style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: 8, textAlign: "center" } },
                        React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)" } }, lbl),
                        React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, Math.round((photoResult[k] || 0) * (k === "iron" ? 10 : 1)) / (k === "iron" ? 10 : 1))))),
                    photoResult.note && React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", fontStyle: "italic" } }, "Note: " + photoResult.note)),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { className: "btn btn-g w100", onClick: closePhoto }, "Cancel"),
                    photoStatus === "review" && React.createElement("button", { className: "btn btn-p w100", onClick: confirmPhotoLog }, "Review & log \u2192")))),
        React.createElement(Modal, { open: recipesOpen, onClose: () => setRecipesOpen(false), title: "Recipes \uD83D\uDCD2", maxWidth: 520 },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement("button", { className: "btn btn-s w100", style: { minHeight: 44 }, onClick: () => { setRecipesOpen(false); setRecipeUrlOpen(true); } }, "\uD83D\uDD17 Import from URL"),
                recipes.length === 0
                    ? React.createElement("div", { style: { textAlign: "center", padding: 24, color: "var(--text-muted)", fontSize: 13 } }, "No saved recipes yet. Use \u201CSave as recipe\u201D inside Log Food, or import one from a URL.")
                    : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, maxHeight: 360, overflowY: "auto" } }, recipes.map(r => React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12 } },
                        React.createElement("span", { style: { fontSize: 22 } }, r.emoji || "🍽️"),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.name),
                            React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, `${r.cal} kcal · ${r.protein}P · ${r.carbs}C · ${r.fat}F`)),
                        React.createElement("button", { className: "btn btn-p btn-sm", style: { minHeight: 36 }, onClick: () => logRecipe(r), title: "Log to today instantly" }, "Log"),
                        React.createElement("button", { className: "btn btn-s btn-sm", style: { minHeight: 36 }, onClick: () => editAndLogRecipe(r), title: "Open Log Food prefilled" }, "Edit"),
                        React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 30, height: 30, fontSize: 15, color: "var(--text-dim)" }, onClick: () => deleteRecipe(r.id) }, "\u00D7")))))),
        React.createElement(Modal, { open: recipeUrlOpen, onClose: () => { setRecipeUrlOpen(false); setRecipeReview(null); setRecipeError(""); }, title: "Import Recipe from URL \uD83D\uDD17" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } }, "Paste a recipe page link. We'll extract the ingredients and estimate per-serving nutrition with AI \u2014 review before saving."),
                React.createElement(Field, { label: "Recipe URL" },
                    React.createElement("input", { className: "inp", type: "url", placeholder: "https://...", value: recipeUrl, onChange: e => setRecipeUrl(e.target.value), inputMode: "url", autoCapitalize: "off", autoCorrect: "off" })),
                recipeError && React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--rose)", color: "var(--rose)", padding: 10, borderRadius: 10, fontSize: 12 } }, recipeError),
                !recipeReview && React.createElement("button", { className: "btn btn-p w100", onClick: importRecipeFromUrl, disabled: recipeImporting }, recipeImporting ? "Extracting\u2026" : "Extract recipe \u2192"),
                recipeReview && React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 8 } },
                    React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, "\u2728 AI estimate \u2014 review nutrition below before saving."),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                        React.createElement("span", { style: { fontSize: 26 } }, recipeReview.emoji || "🍽️"),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, recipeReview.name || "Recipe"),
                            React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, `Servings: ${recipeReview.servings || 1} · per serving`))),
                    recipeReview.perServing && React.createElement("div", { className: "g3", style: { gap: 6 } },
                        ["cal", "protein", "carbs", "fat", "fiber", "sodium"].map(k => React.createElement("div", { key: k, style: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 6, textAlign: "center" } },
                            React.createElement("div", { style: { fontSize: 9.5, color: "var(--text-muted)" } }, k),
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, recipeReview.perServing[k] || 0)))),
                    Array.isArray(recipeReview.ingredients) && recipeReview.ingredients.length > 0 && React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", maxHeight: 140, overflowY: "auto" } },
                        React.createElement("div", { style: { fontWeight: 600, color: "var(--text)", marginBottom: 4 } }, "Ingredients"),
                        recipeReview.ingredients.map((ing, i) => React.createElement("div", { key: i, style: { paddingLeft: 10 } }, "\u2022 " + ing))),
                    React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 4 } },
                        React.createElement("button", { className: "btn btn-g w100", onClick: () => setRecipeReview(null) }, "Discard"),
                        React.createElement("button", { className: "btn btn-p w100", onClick: saveImportedRecipe }, "Save recipe \uD83D\uDCD2")))))));
}
function FitnessPage({ data, setData, toast }) {
    const [tab, setTab] = useState("log");
    const [showAdd, setShowAdd] = useState(false);
    const [nw, setNw] = useState({ name: "", type: "Strength", emoji: "🏋️", duration: "", calories: "", exerciseRows: [newExerciseRow()], notesMode: false, freeText: "" });
    const [editingRoutine, setEditingRoutine] = useState(null);
    const [libOpen, setLibOpen] = useState(false);
    const [libTarget, setLibTarget] = useState("workout");
    const [libQuery, setLibQuery] = useState("");
    const [libPart, setLibPart] = useState("all");
    const types = { Strength: "var(--violet)", Cardio: "var(--rose)", HIIT: "var(--peach)", Flexibility: "var(--mint)" };
    const routines = Array.isArray(data.fitness.routines) ? data.fitness.routines : [];
    const resetNw = () => setNw({ name: "", type: "Strength", emoji: "🏋️", duration: "", calories: "", exerciseRows: [newExerciseRow()], notesMode: false, freeText: "" });
    const insertLibraryExercise = (ex) => {
        const row = newExerciseRow({ name: ex.name, notes: `${ex.equipment} · ${ex.target}` });
        if (libTarget === "routine" && editingRoutine) {
            setEditingRoutine(r => Object.assign({}, r, { exercises: [...(r.exercises || []), row] }));
        } else {
            setNw(w => Object.assign({}, w, { exerciseRows: [...(w.exerciseRows || []), row] }));
        }
        setLibOpen(false);
        toast(`Added ${ex.name}`, "success");
    };
    const openLibrary = (target) => { setLibTarget(target); setLibQuery(""); setLibPart("all"); setLibOpen(true); };
    const collectExercises = () => {
        if (nw.notesMode) {
            const lines = String(nw.freeText || "").split("\n").map(s => s.trim()).filter(Boolean);
            return lines.map(l => parseExerciseString(l) || { name: l, sets: 0, reps: "", weight: "", rest: "", notes: "" });
        }
        return (nw.exerciseRows || []).filter(r => r && r.name && r.name.trim());
    };
    const add = () => {
        if (!nw.name.trim()) { toast("Give your workout a name first", "error"); return; }
        const rows = collectExercises();
        const w = {
            id: Date.now(), date: "Today",
            name: nw.name, type: nw.type, emoji: nw.emoji || "🏋️",
            duration: +nw.duration || 0, calories: +nw.calories || 0,
            // Preserve both representations: legacy string list for older code
            // paths (Recent Workouts chips, AI prompts) and structured rows
            // for the new editor when this workout is reopened/duplicated.
            exercises: rows.map(exerciseRowToString).filter(Boolean),
            exerciseRows: rows,
        };
        setData(d => Object.assign({}, d, {
            fitness: Object.assign({}, d.fitness, { workoutsThisWeek: (d.fitness.workoutsThisWeek || 0) + 1, workouts: [w, ...(d.fitness.workouts || [])] }),
            user: Object.assign({}, d.user, { xp: (d.user.xp || 0) + 50 }),
            streaks: Object.assign({}, d.streaks, { workouts: (d.streaks.workouts || 0) + 1 }),
        }));
        toast(`+50 XP · ${nw.name} logged! 💪`, "xp");
        setShowAdd(false);
        resetNw();
    };
    const newRoutine = () => setEditingRoutine({ id: newRoutineId(), name: "", emoji: "🏋️", type: "Strength", exercises: [newExerciseRow()], _isNew: true, _notesMode: false, _freeText: "" });
    // Bulk-paste free-text exercises into the routine being edited. Mirrors
    // the Log Workout "Notes mode" so users can build routines quickly by
    // pasting from notes/messages and parsing into structured rows.
    const applyRoutineNotes = () => {
        if (!editingRoutine) return;
        const lines = String(editingRoutine._freeText || "").split("\n").map(s => s.trim()).filter(Boolean);
        if (!lines.length) { toast("Paste at least one exercise", "error"); return; }
        const rows = lines.map(l => parseExerciseString(l) || { name: l, sets: 0, reps: "", weight: "", rest: "", notes: "" });
        setEditingRoutine(r => Object.assign({}, r, { exercises: [...(r.exercises || []), ...rows], _freeText: "", _notesMode: false }));
        toast(`Added ${rows.length} exercise${rows.length === 1 ? "" : "s"}`, "success");
    };
    const editRoutine = (r) => setEditingRoutine(JSON.parse(JSON.stringify(r)));
    const saveRoutine = () => {
        const r = editingRoutine;
        if (!r || !r.name || !r.name.trim()) { toast("Name your routine first", "error"); return; }
        const cleaned = (r.exercises || []).filter(e => e && e.name && e.name.trim());
        if (!cleaned.length) { toast("Add at least one exercise", "error"); return; }
        const isNew = !!r._isNew;
        const record = { id: r.id, name: r.name.trim(), emoji: r.emoji || "🏋️", type: r.type || "Strength", exercises: cleaned, createdAt: r.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
        setData(d => {
            const list = Array.isArray(d.fitness.routines) ? d.fitness.routines : [];
            const next = isNew ? [record, ...list] : list.map(x => x.id === record.id ? record : x);
            return Object.assign({}, d, { fitness: Object.assign({}, d.fitness, { routines: next }) });
        });
        setEditingRoutine(null);
        toast(isNew ? `Saved "${record.name}" 🏋️` : `Updated "${record.name}"`, "success");
    };
    const duplicateRoutine = (r) => {
        const copy = { id: newRoutineId(), name: `${r.name} (copy)`, emoji: r.emoji, type: r.type, exercises: JSON.parse(JSON.stringify(r.exercises || [])), createdAt: new Date().toISOString() };
        setData(d => Object.assign({}, d, { fitness: Object.assign({}, d.fitness, { routines: [copy, ...(d.fitness.routines || [])] }) }));
        toast(`Duplicated "${r.name}"`, "success");
    };
    const deleteRoutine = (r) => {
        if (!window.confirm(`Delete routine "${r.name}"?`)) return;
        setData(d => Object.assign({}, d, { fitness: Object.assign({}, d.fitness, { routines: (d.fitness.routines || []).filter(x => x.id !== r.id) }) }));
        toast(`Deleted "${r.name}"`, "info");
    };
    const startFromRoutine = (r) => {
        const rows = (r.exercises || []).map(e => Object.assign({}, newExerciseRow(), e));
        setNw({ name: r.name, type: r.type || "Strength", emoji: r.emoji || "🏋️", duration: "", calories: "", exerciseRows: rows.length ? rows : [newExerciseRow()], notesMode: false, freeText: "" });
        setShowAdd(true);
        setTab("log");
    };
    const saveCurrentAsRoutine = () => {
        const rows = collectExercises();
        if (!nw.name.trim()) { toast("Name your workout first", "error"); return; }
        if (!rows.length) { toast("Add at least one exercise", "error"); return; }
        const r = { id: newRoutineId(), name: nw.name.trim(), emoji: nw.emoji || "🏋️", type: nw.type || "Strength", exercises: rows, createdAt: new Date().toISOString() };
        setData(d => Object.assign({}, d, { fitness: Object.assign({}, d.fitness, { routines: [r, ...(d.fitness.routines || [])] }) }));
        toast(`Saved "${r.name}" to routines 📒`, "success");
    };
    const filteredLibrary = (() => {
        const q = libQuery.trim().toLowerCase();
        return EXERCISE_LIBRARY.filter(e => {
            if (libPart !== "all" && e.bodyPart !== libPart) return false;
            if (!q) return true;
            return e.name.toLowerCase().includes(q) || (e.target || "").toLowerCase().includes(q) || (e.equipment || "").toLowerCase().includes(q);
        }).slice(0, 200);
    })();
    // Render helpers for the structured exercise editor.
    const updateRow = (target, idx, patch) => {
        if (target === "routine") {
            setEditingRoutine(r => Object.assign({}, r, { exercises: (r.exercises || []).map((e, i) => i === idx ? Object.assign({}, e, patch) : e) }));
        } else {
            setNw(w => Object.assign({}, w, { exerciseRows: (w.exerciseRows || []).map((e, i) => i === idx ? Object.assign({}, e, patch) : e) }));
        }
    };
    const removeRow = (target, idx) => {
        if (target === "routine") {
            setEditingRoutine(r => Object.assign({}, r, { exercises: (r.exercises || []).filter((_, i) => i !== idx) }));
        } else {
            setNw(w => Object.assign({}, w, { exerciseRows: (w.exerciseRows || []).filter((_, i) => i !== idx) }));
        }
    };
    const moveRow = (target, idx, dir) => {
        const swap = (arr) => {
            const j = idx + dir;
            if (j < 0 || j >= arr.length) return arr;
            const next = arr.slice();
            const tmp = next[idx]; next[idx] = next[j]; next[j] = tmp;
            return next;
        };
        if (target === "routine") {
            setEditingRoutine(r => Object.assign({}, r, { exercises: swap(r.exercises || []) }));
        } else {
            setNw(w => Object.assign({}, w, { exerciseRows: swap(w.exerciseRows || []) }));
        }
    };
    const addBlankRow = (target) => {
        if (target === "routine") {
            setEditingRoutine(r => Object.assign({}, r, { exercises: [...(r.exercises || []), newExerciseRow()] }));
        } else {
            setNw(w => Object.assign({}, w, { exerciseRows: [...(w.exerciseRows || []), newExerciseRow()] }));
        }
    };
    const renderExerciseEditor = (target, rows) => React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
        (rows || []).map((row, i) => React.createElement("div", { key: i, style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, padding: 9, display: "flex", flexDirection: "column", gap: 6 } },
            React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
                React.createElement("input", { className: "inp", placeholder: "Exercise name", value: row.name, onChange: e => updateRow(target, i, { name: e.target.value }), style: { flex: 1, padding: "8px 10px", fontSize: 13 } }),
                React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 28, height: 28, fontSize: 12 }, title: "Move up", onClick: () => moveRow(target, i, -1) }, "\u2191"),
                React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 28, height: 28, fontSize: 12 }, title: "Move down", onClick: () => moveRow(target, i, +1) }, "\u2193"),
                React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 28, height: 28, fontSize: 14, color: "var(--rose)" }, title: "Remove", onClick: () => removeRow(target, i) }, "\u00D7")),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 } },
                React.createElement("input", { className: "inp", type: "number", placeholder: "Sets", value: row.sets || "", onChange: e => updateRow(target, i, { sets: +e.target.value || 0 }), style: { padding: "6px 8px", fontSize: 12 } }),
                React.createElement("input", { className: "inp", placeholder: "Reps", value: row.reps || "", onChange: e => updateRow(target, i, { reps: e.target.value }), style: { padding: "6px 8px", fontSize: 12 } }),
                React.createElement("input", { className: "inp", placeholder: "Weight", value: row.weight || "", onChange: e => updateRow(target, i, { weight: e.target.value }), style: { padding: "6px 8px", fontSize: 12 } }),
                React.createElement("input", { className: "inp", placeholder: "Rest", value: row.rest || "", onChange: e => updateRow(target, i, { rest: e.target.value }), style: { padding: "6px 8px", fontSize: 12 } })),
            React.createElement("input", { className: "inp", placeholder: "Notes (form cue, tempo, equipment…)", value: row.notes || "", onChange: e => updateRow(target, i, { notes: e.target.value }), style: { padding: "6px 8px", fontSize: 11.5, color: "var(--text-muted)" } }))),
        React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
            React.createElement("button", { className: "btn btn-g btn-sm", style: { flex: "1 1 120px", minHeight: 34, fontSize: 12 }, onClick: () => addBlankRow(target) }, "+ Add exercise"),
            React.createElement("button", { className: "btn btn-s btn-sm", style: { flex: "1 1 120px", minHeight: 34, fontSize: 12 }, onClick: () => openLibrary(target) }, "\uD83D\uDCDA Library")));
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Fitness \uD83D\uDCAA"),
                React.createElement("p", { className: "ss2" },
                    data.fitness.workoutsThisWeek,
                    "/",
                    data.settings.workoutGoalPerWeek,
                    " workouts this week")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "Log Workout")),
        React.createElement("div", { className: "tabs sp" }, ["log", "routines"].map(t => React.createElement("div", { key: t, className: `tab ${tab === t ? "active" : ""}`, onClick: () => setTab(t), style: { textTransform: "capitalize" } }, t))),
        tab === "log" && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card gv sp" },
                React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 14 } },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Weekly Calories Burned"),
                    React.createElement("span", { className: "b bv" },
                        "\uD83D\uDD25 ",
                        data.fitness.weekData.reduce((a, b) => a + b, 0),
                        " kcal")),
                React.createElement(BarChart, { data: data.fitness.weekData, color: "var(--violet)", height: 75, labels: WEEK_LABELS })),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Recent Workouts"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, data.fitness.workouts.map(w => (React.createElement("div", { key: w.id, style: { display: "flex", alignItems: "flex-start", gap: 13, padding: "13px 15px", background: "var(--surface2)", borderRadius: 15, border: "1px solid var(--border)" } },
                    React.createElement("span", { style: { fontSize: 24, marginTop: 2 } }, w.emoji),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontWeight: 600, fontSize: 13.5 } }, w.name),
                        React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", display: "flex", gap: 9, marginTop: 3, flexWrap: "wrap" } },
                            React.createElement("span", null,
                                "\u23F1 ",
                                w.duration,
                                "min"),
                            React.createElement("span", null,
                                "\uD83D\uDD25 ",
                                w.calories,
                                " kcal"),
                            React.createElement("span", null, w.date)),
                        w.exercises && w.exercises.length > 0 && (React.createElement("div", { style: { marginTop: 7, display: "flex", gap: 5, flexWrap: "wrap" } },
                            (Array.isArray(w.exercises) ? w.exercises : []).slice(0, 3).map((e, i) => React.createElement("span", { key: i, className: "b bi", style: { fontSize: 9.5 } }, e)),
                            Array.isArray(w.exercises) && w.exercises.length > 3 && React.createElement("span", { className: "b bi", style: { fontSize: 9.5 } },
                                "+",
                                w.exercises.length - 3,
                                " more")))),
                    React.createElement("span", { className: "b", style: { background: `${types[w.type] || "var(--violet)"}1a`, color: types[w.type] || "var(--violet)", flexShrink: 0 } }, w.type)))))))),
        tab === "routines" && (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            React.createElement("button", { className: "btn btn-p w100", onClick: newRoutine },
                React.createElement(Ic, { n: "plus", size: 14, color: "#fff" }),
                "Create routine"),
            routines.length === 0 && React.createElement("div", { className: "card", style: { textAlign: "center", color: "var(--text-muted)", fontSize: 12.5, padding: "22px 14px" } },
                React.createElement("div", { style: { fontSize: 30, marginBottom: 6 } }, "\uD83D\uDCDD"),
                "No routines yet. Create one to save your favorite workouts."),
            routines.map(r => React.createElement("div", { key: r.id, className: "card" },
                React.createElement("div", { className: "flex fac fjb mb2" },
                    React.createElement("div", { className: "flex fac gap2" },
                        React.createElement("span", { style: { fontSize: 22 } }, r.emoji || "🏋️"),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, r.name),
                            React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", marginTop: 1 } },
                                (r.exercises || []).length, " exercises · ", r.type || "Strength"))),
                    React.createElement("button", { className: "btn btn-p btn-sm", onClick: () => startFromRoutine(r) }, "Start \u25B6")),
                (r.exercises || []).length > 0 && React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 } },
                    (r.exercises || []).slice(0, 5).map((e, i) => React.createElement("span", { key: i, className: "b bv", style: { fontSize: 10 } }, exerciseRowToString(e) || e.name)),
                    (r.exercises || []).length > 5 && React.createElement("span", { className: "b bi", style: { fontSize: 10 } }, "+", (r.exercises || []).length - 5, " more")),
                React.createElement("div", { style: { display: "flex", gap: 6 } },
                    React.createElement("button", { className: "btn btn-g btn-sm", style: { flex: 1, fontSize: 11.5 }, onClick: () => editRoutine(r) }, "Edit"),
                    React.createElement("button", { className: "btn btn-g btn-sm", style: { flex: 1, fontSize: 11.5 }, onClick: () => duplicateRoutine(r) }, "Duplicate"),
                    React.createElement("button", { className: "btn btn-g btn-sm", style: { flex: 1, fontSize: 11.5, color: "var(--rose)" }, onClick: () => deleteRoutine(r) }, "Delete")))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "Log Workout \uD83D\uDCAA", maxWidth: 540 },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11, maxHeight: "75vh", overflowY: "auto", paddingRight: 4 } },
                React.createElement("div", { style: { display: "flex", gap: 9 } },
                    React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                        React.createElement("input", { className: "inp", value: nw.emoji, onChange: e => setNw(w => Object.assign({}, w, { emoji: e.target.value })), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                    React.createElement(Field, { label: "Workout Name", style: { flex: 1 } },
                        React.createElement("input", { className: "inp", placeholder: "Morning Run", value: nw.name, onChange: e => setNw(w => Object.assign({}, w, { name: e.target.value })) }))),
                React.createElement(Field, { label: "Type" },
                    React.createElement("select", { className: "inp", value: nw.type, onChange: e => setNw(w => Object.assign({}, w, { type: e.target.value })) }, Object.keys(types).map(t => React.createElement("option", { key: t }, t)))),
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: "Duration (min)" },
                        React.createElement("input", { className: "inp", type: "number", placeholder: "45", value: nw.duration, onChange: e => setNw(w => Object.assign({}, w, { duration: e.target.value })) })),
                    React.createElement(Field, { label: "Calories burned" },
                        React.createElement("input", { className: "inp", type: "number", placeholder: "300", value: nw.calories, onChange: e => setNw(w => Object.assign({}, w, { calories: e.target.value })) }))),
                React.createElement("div", { className: "flex fac fjb", style: { marginTop: 4 } },
                    React.createElement("label", { className: "label", style: { margin: 0 } }, "Exercises"),
                    React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11, padding: "4px 8px", minHeight: 24 }, onClick: () => setNw(w => Object.assign({}, w, { notesMode: !w.notesMode })) },
                        nw.notesMode ? "Structured" : "Notes mode")),
                nw.notesMode
                    ? React.createElement("textarea", { className: "inp", rows: 6, placeholder: "Squats 4×8 @ 135lb\nBench 3×10\nRow 4×8", value: nw.freeText, onChange: e => setNw(w => Object.assign({}, w, { freeText: e.target.value })) })
                    : renderExerciseEditor("workout", nw.exerciseRows)),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 14, flexWrap: "wrap" } },
                React.createElement("button", { className: "btn btn-g", style: { flex: "1 1 100%", fontSize: 12 }, onClick: saveCurrentAsRoutine }, "\uD83D\uDCD2 Save as routine"),
                React.createElement("button", { className: "btn btn-g", style: { flex: 1 }, onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p", style: { flex: 1 }, onClick: add }, "Log \uD83D\uDCAA"))),
        // Routine editor modal
        React.createElement(Modal, { open: !!editingRoutine, onClose: () => setEditingRoutine(null), title: editingRoutine && editingRoutine._isNew ? "New Routine \uD83D\uDCDD" : "Edit Routine \uD83D\uDCDD", maxWidth: 540 },
            editingRoutine && React.createElement(React.Fragment, null,
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11, maxHeight: "75vh", overflowY: "auto", paddingRight: 4 } },
                    React.createElement("div", { style: { display: "flex", gap: 9 } },
                        React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                            React.createElement("input", { className: "inp", value: editingRoutine.emoji, onChange: e => setEditingRoutine(r => Object.assign({}, r, { emoji: e.target.value })), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                        React.createElement(Field, { label: "Routine Name", style: { flex: 1 } },
                            React.createElement("input", { className: "inp", placeholder: "Upper Body A", value: editingRoutine.name, onChange: e => setEditingRoutine(r => Object.assign({}, r, { name: e.target.value })) }))),
                    React.createElement(Field, { label: "Type" },
                        React.createElement("select", { className: "inp", value: editingRoutine.type || "Strength", onChange: e => setEditingRoutine(r => Object.assign({}, r, { type: e.target.value })) }, Object.keys(types).map(t => React.createElement("option", { key: t }, t)))),
                    React.createElement("div", { className: "flex fac fjb", style: { marginTop: 4 } },
                        React.createElement("label", { className: "label", style: { margin: 0 } }, "Exercises"),
                        React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11, padding: "4px 8px", minHeight: 24 }, onClick: () => setEditingRoutine(r => Object.assign({}, r, { _notesMode: !r._notesMode })) },
                            editingRoutine._notesMode ? "Structured" : "Paste notes")),
                    editingRoutine._notesMode
                        ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
                            React.createElement("textarea", { className: "inp", rows: 5, placeholder: "Paste exercises (one per line):\nSquats 4×8 @ 135lb\nBench 3×10\nRow 4×8-10", value: editingRoutine._freeText || "", onChange: e => setEditingRoutine(r => Object.assign({}, r, { _freeText: e.target.value })) }),
                            React.createElement("button", { className: "btn btn-s btn-sm", style: { fontSize: 11.5 }, onClick: applyRoutineNotes }, "Parse & add"))
                        : renderExerciseEditor("routine", editingRoutine.exercises)),
                React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 14 } },
                    React.createElement("button", { className: "btn btn-g w100", onClick: () => setEditingRoutine(null) }, "Cancel"),
                    React.createElement("button", { className: "btn btn-p w100", onClick: saveRoutine }, "Save \uD83D\uDCBE")))),
        // Exercise library picker modal
        React.createElement(Modal, { open: libOpen, onClose: () => setLibOpen(false), title: "Exercise Library \uD83D\uDCDA", maxWidth: 520 },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                React.createElement("input", { className: "inp", placeholder: "Search (squat, biceps, cable…)", value: libQuery, onChange: e => setLibQuery(e.target.value), autoFocus: true }),
                React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                    ["all", ...EXERCISE_BODY_PARTS].map(p => React.createElement("button", { key: p, className: `btn btn-sm ${libPart === p ? "btn-p" : "btn-g"}`, style: { fontSize: 10.5, padding: "4px 9px", minHeight: 26, textTransform: "capitalize" }, onClick: () => setLibPart(p) }, p))),
                React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, filteredLibrary.length, " of ", EXERCISE_LIBRARY.length, " exercises"),
                React.createElement("div", { style: { maxHeight: "55vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 } },
                    filteredLibrary.map(ex => React.createElement("div", { key: ex.id, onClick: () => insertLibraryExercise(ex), style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, cursor: "pointer" } },
                        React.createElement("img", { src: ex.gifUrl || ex.thumbnail, alt: ex.name, width: 40, height: 40, loading: "lazy", style: { width: 40, height: 40, borderRadius: 10, objectFit: "cover", flexShrink: 0, background: "var(--surface)" }, onError: e => { if (e.currentTarget.src !== ex.thumbnail) e.currentTarget.src = ex.thumbnail; } }),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { fontWeight: 600, fontSize: 12.5 } }, ex.name),
                            React.createElement("div", { style: { fontSize: 10, color: "var(--text-muted)", marginTop: 2 } }, ex.bodyPart, " · ", ex.equipment, " · ", ex.target)),
                        React.createElement("span", { className: "b bv", style: { fontSize: 10 } }, "+ Add"))),
                    filteredLibrary.length === 0 && React.createElement("div", { style: { textAlign: "center", color: "var(--text-muted)", fontSize: 12, padding: 18 } }, "No matches"))))));
}
function SkincarePage({ data, setData, toast }) {
    const [tab, setTab] = useState("routine");
    const toggle = (time, i) => {
        const wasDone = data.skincare.routine[time][i].done;
        setData(d => (Object.assign(Object.assign({}, d), { skincare: Object.assign(Object.assign({}, d.skincare), { routine: Object.assign(Object.assign({}, d.skincare.routine), { [time]: d.skincare.routine[time].map((s, j) => j === i ? Object.assign(Object.assign({}, s), { done: !s.done }) : s) }) }), user: !wasDone ? Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 15 }) : d.user })));
        if (!wasDone)
            toast(`+15 XP · ${data.skincare.routine[time][i].name} ✨`, "xp");
    };
    const am = data.skincare.routine.morning.every(s => s.done), pm = data.skincare.routine.evening.every(s => s.done);
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "sh" },
            React.createElement("h2", { className: "st" }, "Skincare \u2728"),
            React.createElement("p", { className: "ss2" },
                "\uD83D\uDD25 ",
                data.skincare.streak,
                " day streak \u00B7 Score: ",
                data.skincare.skinScore,
                "/100")),
        React.createElement("div", { className: "tabs sp" }, ["routine", "products"].map(t => React.createElement("div", { key: t, className: `tab ${tab === t ? "active" : ""}`, onClick: () => setTab(t), style: { textTransform: "capitalize" } }, t))),
        tab === "routine" && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card gm sp flex fac gap4", style: { flexWrap: "wrap" } },
                React.createElement(Ring, { value: data.skincare.skinScore, max: 100, size: 96, color: "var(--mint)", label: data.skincare.skinScore, sub: "Score" }),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 17, fontWeight: 700, marginBottom: 5 } }, "Glowing \u2728"),
                    React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 10 } }, "Consistency is paying off!"),
                    React.createElement("div", { style: { display: "flex", gap: 7 } },
                        React.createElement("span", { className: "b bm" },
                            "\uD83D\uDD25 ",
                            data.skincare.streak,
                            " days"),
                        React.createElement("span", { className: "b bv" }, am && pm ? "All done! 🎉" : "In progress...")))),
            React.createElement("div", { className: "g2 sp" }, [["morning", "☀️ Morning"], ["evening", "🌙 Evening"]].map(([time, label]) => (React.createElement("div", { key: time, className: "card" },
                React.createElement("div", { className: "flex fac gap2", style: { marginBottom: 13 } },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 14 } }, label),
                    (time === "morning" ? am : pm) && React.createElement("span", { className: "b bm" }, "Done \u2713")),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, data.skincare.routine[time].map((s, i) => (React.createElement("div", { key: i, className: `hr ${s.done ? "done" : ""}`, onClick: () => toggle(time, i) },
                    React.createElement("div", { className: "hc" }, s.done ? "✓" : ""),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, s.name),
                        React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, s.brand)))))))))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "7-Day Streak"),
                React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "space-between" } }, WEEK_LABELS.map((day, i) => (React.createElement("div", { key: day, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5 } },
                    React.createElement("div", { style: { width: 34, height: 34, borderRadius: 9, background: data.skincare.weekData[i] ? "rgba(127,255,212,0.18)" : "var(--surface2)", border: `1px solid ${data.skincare.weekData[i] ? "var(--mint)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 } }, data.skincare.weekData[i] ? "✨" : ""),
                    React.createElement("span", { style: { fontSize: 9.5, color: "var(--text-dim)" } }, day.slice(0, 1))))))))),
        tab === "products" && (React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } }, data.skincare.products.map(p => (React.createElement("div", { key: p.id, className: "card flex fac gap3" },
            React.createElement("div", { style: { width: 44, height: 44, borderRadius: 13, background: "rgba(225,29,46,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 } }, p.emoji),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, p.name),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } },
                    p.brand,
                    " \u00B7 ",
                    p.category),
                React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-dim)", marginTop: 3 } },
                    "Replenish: ",
                    p.replenishDate)),
            React.createElement("div", { style: { display: "flex", gap: 2 } }, Array.from({ length: 5 }).map((_, i) => React.createElement("span", { key: i, style: { fontSize: 12, color: i < p.rating ? "var(--gold)" : "var(--text-dim)" } }, i < p.rating ? "★" : "☆"))))))))));
}
function SleepPage({ data, setData, toast }) {
    const [showAdd, setShowAdd] = useState(false);
    const [ns, setNs] = useState({ bedtime: "11:00 PM", wake: "7:00 AM", quality: 4, notes: "" });
    const logs = data.sleep.logs;
    const avgHours = logs.length === 0 ? "0.0" : (logs.slice(0, 7).reduce((s, l) => s + l.hours, 0) / Math.min(logs.length, 7)).toFixed(1);
    const qualityColor = q => q >= 4 ? "var(--mint)" : q >= 3 ? "var(--gold)" : q >= 2 ? "var(--peach)" : "var(--rose)";
    const calcHours = (bed, wake) => {
        const p = t => { const [h, m] = t.replace(/(AM|PM)/, "").trim().split(":").map(Number); return (t.includes("PM") && h !== 12 ? h + 12 : h === 12 && t.includes("AM") ? 0 : h) * 60 + m; };
        let diff = p(wake) - p(bed);
        if (diff < 0)
            diff += 1440;
        return +(diff / 60).toFixed(1);
    };
    const add = () => {
        const hours = calcHours(ns.bedtime, ns.wake);
        const log = { id: Date.now(), date: TODAY(), bedtime: ns.bedtime, wake: ns.wake, hours, quality: ns.quality, notes: ns.notes };
        setData(d => (Object.assign(Object.assign({}, d), { sleep: Object.assign(Object.assign({}, d.sleep), { logs: [log, ...d.sleep.logs] }), user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 20 }), streaks: Object.assign(Object.assign({}, d.streaks), { sleep: hours >= d.sleep.goalHours ? (d.streaks.sleep || 0) + 1 : 0 }) })));
        toast(`+20 XP · ${hours}h sleep logged 😴`, "xp");
        setShowAdd(false);
        setNs({ bedtime: "11:00 PM", wake: "7:00 AM", quality: 4, notes: "" });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Sleep \uD83D\uDE34"),
                React.createElement("p", { className: "ss2" },
                    "Avg ",
                    avgHours,
                    "h \u00B7 Goal ",
                    data.sleep.goalHours,
                    "h \u00B7 \uD83D\uDD25 ",
                    data.streaks.sleep,
                    " streak")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "Log Sleep")),
        React.createElement("div", { className: "g3 sp" }, [{ label: "Avg Hours", val: avgHours + "h", color: "var(--sky)", icon: "😴", sub: `Goal: ${data.sleep.goalHours}h` }, { label: "Avg Quality", val: (logs.slice(0, 7).reduce((s, l) => s + l.quality, 0) / Math.min(logs.length, 7)).toFixed(1) + "/5", color: "var(--violet)", icon: "⭐", sub: "sleep quality" }, { label: "Streak", val: data.streaks.sleep + "d", color: "var(--gold)", icon: "🔥", sub: "consecutive nights" }].map((s, i) => (React.createElement("div", { key: i, className: "sc" },
            React.createElement("div", { className: "si", style: { background: `${s.color}18` } }, s.icon),
            React.createElement("div", { className: "sv", style: { color: s.color } }, s.val),
            React.createElement("div", { className: "sl" }, s.label),
            React.createElement("div", { className: "ss" }, s.sub))))),
        React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "7-Day Sleep Hours"),
            React.createElement(BarChart, { data: [...logs].reverse().slice(0, 7).map(l => l.hours), color: "var(--sky)", height: 75, labels: [...logs].reverse().slice(0, 7).map(l => l.date.slice(-2)) })),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Sleep Log"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, logs.map(log => (React.createElement("div", { key: log.id, style: { padding: "13px 15px", background: "var(--surface2)", borderRadius: 14, border: "1px solid var(--border)" } },
                React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 6 } },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, log.date),
                    React.createElement("div", { className: "flex fac gap2" },
                        React.createElement("span", { className: "b bs" },
                            log.hours,
                            "h"),
                        React.createElement("span", { className: "b", style: { background: `${qualityColor(log.quality)}18`, color: qualityColor(log.quality) } },
                            log.quality,
                            "/5 \u2B50"))),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } },
                    "\uD83C\uDF19 ",
                    log.bedtime,
                    " \u2192 \u2600\uFE0F ",
                    log.wake),
                log.notes && React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-dim)", marginTop: 4, fontStyle: "italic" } }, log.notes)))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "Log Sleep \uD83D\uDE34" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: "Bedtime" },
                        React.createElement("input", { className: "inp", value: ns.bedtime, onChange: e => setNs(s => (Object.assign(Object.assign({}, s), { bedtime: e.target.value }))), placeholder: "11:00 PM" })),
                    React.createElement(Field, { label: "Wake Time" },
                        React.createElement("input", { className: "inp", value: ns.wake, onChange: e => setNs(s => (Object.assign(Object.assign({}, s), { wake: e.target.value }))), placeholder: "7:00 AM" }))),
                React.createElement(Field, { label: `Quality: ${ns.quality}/5 ${"⭐".repeat(ns.quality)}` },
                    React.createElement("input", { type: "range", min: 1, max: 5, value: ns.quality, onChange: e => setNs(s => (Object.assign(Object.assign({}, s), { quality: +e.target.value }))), style: { width: "100%", accentColor: "var(--violet)" } })),
                React.createElement(Field, { label: "Notes" },
                    React.createElement("input", { className: "inp", placeholder: "How did you sleep?", value: ns.notes, onChange: e => setNs(s => (Object.assign(Object.assign({}, s), { notes: e.target.value }))) })),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } },
                    "Calculated: ",
                    calcHours(ns.bedtime, ns.wake),
                    "h")),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Log Sleep \uD83D\uDE34")))));
}
function BodyPage({ data, setData, toast }) {
    const [showAdd, setShowAdd] = useState(false);
    const [nm, setNm] = useState({ weight: "", waist: "", hips: "", chest: "", arms: "", thighs: "" });
    const logs = data.body.measurements, latest = logs[0] || {}, prev = logs[1] || {};
    const delta = k => { if (!latest[k] || !prev[k])
        return null; return (latest[k] - prev[k]).toFixed(1); };
    const metrics = [{ key: "weight", label: "Weight", unit: "lbs", color: "var(--rose)", emoji: "⚖️" }, { key: "waist", label: "Waist", unit: "cm", color: "var(--violet)", emoji: "📏" }, { key: "hips", label: "Hips", unit: "cm", color: "var(--peach)", emoji: "📐" }, { key: "chest", label: "Chest", unit: "cm", color: "var(--indigo)", emoji: "📏" }, { key: "arms", label: "Arms", unit: "cm", color: "var(--mint)", emoji: "💪" }, { key: "thighs", label: "Thighs", unit: "cm", color: "var(--sky)", emoji: "🦵" }];
    const add = () => {
        const m = { id: Date.now(), date: TODAY() };
        metrics.forEach(k => { if (nm[k.key])
            m[k.key] = +nm[k.key]; });
        setData(d => (Object.assign(Object.assign({}, d), { body: Object.assign(Object.assign({}, d.body), { measurements: [m, ...d.body.measurements] }), user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 20 }) })));
        toast("+20 XP · Measurements logged! 📏", "xp");
        setShowAdd(false);
        setNm({ weight: "", waist: "", hips: "", chest: "", arms: "", thighs: "" });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Body \uD83D\uDCCF"),
                React.createElement("p", { className: "ss2" },
                    logs.length,
                    " measurements \u00B7 Track your progress")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "Log")),
        React.createElement("div", { className: "g3 sp" }, metrics.map(m => {
            const d = delta(m.key), down = d && +d < 0;
            return (React.createElement("div", { key: m.key, className: "sc" },
                React.createElement("div", { style: { fontSize: 20 } }, m.emoji),
                React.createElement("div", { className: "sv", style: { color: m.color } },
                    latest[m.key] || "—",
                    React.createElement("span", { style: { fontSize: 12, fontWeight: 400 } },
                        " ",
                        m.unit)),
                React.createElement("div", { className: "sl" }, m.label),
                d && React.createElement("div", { style: { fontSize: 10.5, color: down ? "var(--mint)" : "var(--rose)" } },
                    down ? "↓" : "↑",
                    " ",
                    Math.abs(+d),
                    m.unit)));
        })),
        logs.length >= 3 && (React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Weight Trend"),
            React.createElement(BarChart, { data: [...logs].slice(0, 7).reverse().map(l => l.weight || 0), color: "var(--rose)", height: 70, labels: [...logs].slice(0, 7).reverse().map(l => l.date.slice(-5)) }))),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "History"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, logs.map(log => (React.createElement("div", { key: log.id, style: { padding: "13px 15px", background: "var(--surface2)", borderRadius: 14, border: "1px solid var(--border)" } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13, marginBottom: 8 } }, log.date),
                React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, metrics.filter(m => log[m.key]).map(m => React.createElement("span", { key: m.key, className: "b", style: { background: `${m.color}18`, color: m.color, fontSize: 11 } },
                    m.label,
                    ": ",
                    log[m.key],
                    m.unit)))))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "Log Measurements \uD83D\uDCCF" },
            React.createElement("div", { className: "g2", style: { gap: 12 } }, metrics.map(m => React.createElement(Field, { key: m.key, label: `${m.emoji} ${m.label} (${m.unit})` },
                React.createElement("input", { className: "inp", type: "number", step: "0.1", placeholder: latest[m.key] || "0", value: nm[m.key], onChange: e => setNm(n => (Object.assign(Object.assign({}, n), { [m.key]: e.target.value }))) })))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Log \uD83D\uDCCF")))));
}
function CyclePage({ data, setData, toast }) {
    const [showLog, setShowLog] = useState(false);
    const [nl, setNl] = useState({ flow: "medium", cramps: 2, mood: "okay", notes: "" });
    const c = data.cycle, phase = getCyclePhase(c.lastPeriodStart, c.cycleLength);
    const nextPeriod = () => { const s = new Date(c.lastPeriodStart + ", 2026"); s.setDate(s.getDate() + c.cycleLength); return s.toLocaleDateString("en-US", { month: "short", day: "numeric" }); };
    const ovulationDate = () => { const s = new Date(c.lastPeriodStart + ", 2026"); s.setDate(s.getDate() + 14); return s.toLocaleDateString("en-US", { month: "short", day: "numeric" }); };
    const phases = [{ name: "Menstrual", days: "1-5", color: "var(--rose)", emoji: "🌸", desc: "Rest, iron-rich foods, gentle movement" }, { name: "Follicular", days: "6-13", color: "var(--mint)", emoji: "🌱", desc: "Energy rising, great for strength training" }, { name: "Ovulation", days: "14-16", color: "var(--gold)", emoji: "⭐", desc: "Peak energy & confidence — HIIT time!" }, { name: "Luteal", days: "17-28", color: "var(--violet)", emoji: "🌙", desc: "Slow down, prioritize sleep & magnesium" }];
    const addLog = () => {
        setData(d => (Object.assign(Object.assign({}, d), { cycle: Object.assign(Object.assign({}, d.cycle), { logs: [Object.assign({ date: TODAY() }, nl), ...d.cycle.logs] }), user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 15 }) })));
        toast("+15 XP · Cycle logged 🌸", "xp");
        setShowLog(false);
        setNl({ flow: "medium", cramps: 2, mood: "okay", notes: "" });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Cycle \uD83C\uDF38"),
                React.createElement("p", { className: "ss2" },
                    "Day ",
                    phase.day,
                    " of ",
                    c.cycleLength,
                    " \u00B7 ",
                    c.cycleLength,
                    "-day cycle")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowLog(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "Log Today")),
        React.createElement("div", { className: "card gr sp" },
            React.createElement("div", { className: "flex fac gap3", style: { flexWrap: "wrap" } },
                React.createElement("div", { style: { width: 80, height: 80, borderRadius: "50%", background: `${phase.color}22`, border: `2px solid ${phase.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 } }, phase.emoji),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: phase.color } },
                        phase.phase,
                        " Phase"),
                    React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)", margin: "4px 0 8px" } },
                        "Day ",
                        phase.day,
                        " of ",
                        c.cycleLength),
                    React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", fontStyle: "italic" } },
                        "\uD83D\uDCA1 ",
                        phase.advice)))),
        React.createElement("div", { className: "g2 sp" },
            React.createElement("div", { className: "sc" },
                React.createElement("div", { style: { fontSize: 20 } }, "\uD83E\uDE78"),
                React.createElement("div", { className: "sv", style: { color: "var(--rose)" } }, nextPeriod()),
                React.createElement("div", { className: "sl" }, "Next Period"),
                React.createElement("div", { className: "ss" }, "Predicted")),
            React.createElement("div", { className: "sc" },
                React.createElement("div", { style: { fontSize: 20 } }, "\uD83E\uDD5A"),
                React.createElement("div", { className: "sv", style: { color: "var(--gold)" } }, ovulationDate()),
                React.createElement("div", { className: "sl" }, "Ovulation"),
                React.createElement("div", { className: "ss" }, "Predicted"))),
        React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Cycle Phases Guide"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, phases.map(p => (React.createElement("div", { key: p.name, style: { display: "flex", gap: 13, padding: "12px 14px", borderRadius: 13, background: p.name === phase.phase ? `${p.color}12` : "var(--surface2)", border: `1px solid ${p.name === phase.phase ? p.color : "var(--border)"}` } },
                React.createElement("span", { style: { fontSize: 22 } }, p.emoji),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontWeight: 600, fontSize: 13, color: p.color } },
                        p.name,
                        " ",
                        React.createElement("span", { style: { color: "var(--text-dim)", fontWeight: 400, fontSize: 11 } },
                            "\u00B7 Day ",
                            p.days)),
                    React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginTop: 3 } }, p.desc)),
                p.name === phase.phase && React.createElement("span", { className: "b", style: { marginLeft: "auto", background: `${p.color}18`, color: p.color, flexShrink: 0, alignSelf: "center" } }, "Now")))))),
        c.logs.length > 0 && (React.createElement("div", { className: "card" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Recent Logs"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, c.logs.slice(0, 5).map((log, i) => (React.createElement("div", { key: i, style: { display: "flex", gap: 10, padding: "10px 13px", background: "var(--surface2)", borderRadius: 12 } },
                React.createElement("span", { style: { fontSize: 16 } }, "\uD83E\uDE78"),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontWeight: 600, fontSize: 12.5 } }, log.date),
                    React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", display: "flex", gap: 7, marginTop: 2 } },
                        React.createElement("span", null,
                            "Flow: ",
                            log.flow),
                        React.createElement("span", null,
                            "Cramps: ",
                            log.cramps,
                            "/5"),
                        React.createElement("span", null,
                            "Mood: ",
                            log.mood))))))))),
        React.createElement(Modal, { open: showLog, onClose: () => setShowLog(false), title: "Log Today \uD83C\uDF38" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement(Field, { label: "Flow" },
                    React.createElement("select", { className: "inp", value: nl.flow, onChange: e => setNl(l => (Object.assign(Object.assign({}, l), { flow: e.target.value }))) }, ["spotting", "light", "medium", "heavy", "very heavy"].map(f => React.createElement("option", { key: f }, f)))),
                React.createElement(Field, { label: `Cramps: ${nl.cramps}/5` },
                    React.createElement("input", { type: "range", min: 0, max: 5, value: nl.cramps, onChange: e => setNl(l => (Object.assign(Object.assign({}, l), { cramps: +e.target.value }))), style: { width: "100%", accentColor: "var(--rose)" } })),
                React.createElement(Field, { label: "Mood" },
                    React.createElement("select", { className: "inp", value: nl.mood, onChange: e => setNl(l => (Object.assign(Object.assign({}, l), { mood: e.target.value }))) }, ["great", "good", "okay", "tired", "irritable", "sad", "anxious"].map(m => React.createElement("option", { key: m }, m)))),
                React.createElement(Field, { label: "Notes" },
                    React.createElement("input", { className: "inp", placeholder: "Symptoms, notes...", value: nl.notes, onChange: e => setNl(l => (Object.assign(Object.assign({}, l), { notes: e.target.value }))) }))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowLog(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: addLog }, "Log \uD83C\uDF38")))));
}
function JournalPage({ data, setData, toast }) {
    const [showAdd, setShowAdd] = useState(false);
    const [ne, setNe] = useState({ mood: "😊", moodScore: 7, energy: 7, tags: "", text: "" });
    const MOODS = ["😔", "😐", "🙂", "😊", "😄"];
    const TAGS = ["#grateful", "#productive", "#tired", "#stressed", "#happy", "#anxious", "#calm", "#energized"];
    const heatColor = s => { if (s >= 8)
        return "rgba(127,255,212,0.8)"; if (s >= 6)
        return "rgba(225,29,46,0.6)"; if (s >= 4)
        return "rgba(255,185,151,0.5)"; return "rgba(255,51,68,0.5)"; };
    const add = () => {
        const entry = Object.assign(Object.assign({ id: Date.now(), date: TODAY() }, ne), { tags: ne.tags.split(" ").filter(t => t.startsWith("#")) });
        setData(d => (Object.assign(Object.assign({}, d), { journal: Object.assign(Object.assign({}, d.journal), { entries: [entry, ...d.journal.entries] }), user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 20 }), streaks: Object.assign(Object.assign({}, d.streaks), { logging: d.streaks.logging + 1 }) })));
        toast("+20 XP · Journal entry saved 📓", "xp");
        setShowAdd(false);
        setNe({ mood: "😊", moodScore: 7, energy: 7, tags: "", text: "" });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Journal \uD83D\uDCD3"),
                React.createElement("p", { className: "ss2" },
                    "\uD83D\uDD25 ",
                    data.streaks.logging,
                    " day streak \u00B7 ",
                    data.journal.entries.length,
                    " entries")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "Write")),
        React.createElement("div", { className: "card sp" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Mood Heatmap"),
            React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                data.journal.entries.map((e, i) => React.createElement("div", { key: i, className: "hm-cell", title: `${e.date}: ${e.mood} ${e.moodScore}/10`, style: { background: heatColor(e.moodScore || 5) } })),
                Array.from({ length: Math.max(0, 20 - data.journal.entries.length) }).map((_, i) => React.createElement("div", { key: `e${i}`, className: "hm-cell", style: { background: "var(--surface2)" } }))),
            React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 10, fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap" } }, [["rgba(127,255,212,0.8)", "Great (8+)"], ["rgba(225,29,46,0.6)", "Good (6-7)"], ["rgba(255,51,68,0.5)", "Low (<4)"]].map(([c, l]) => (React.createElement("span", { key: l, style: { display: "flex", alignItems: "center", gap: 4 } },
                React.createElement("span", { style: { width: 10, height: 10, borderRadius: 3, background: c, display: "inline-block" } }),
                l))))),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, data.journal.entries.map(e => (React.createElement("div", { key: e.id, className: "card", style: { borderLeft: `3px solid ${e.moodScore >= 8 ? "var(--mint)" : e.moodScore >= 6 ? "var(--violet)" : e.moodScore >= 4 ? "var(--peach)" : "var(--rose)"}` } },
            React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 8 } },
                React.createElement("div", { className: "flex fac gap2" },
                    React.createElement("span", { style: { fontSize: 22 } }, e.mood),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, e.date),
                        React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } },
                            "Mood: ",
                            e.moodScore,
                            "/10 \u00B7 Energy: ",
                            e.energy,
                            "/10"))),
                React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" } }, (Array.isArray(e.tags) ? e.tags : []).map((t, i) => React.createElement("span", { key: i, className: "b bv", style: { fontSize: 9.5 } }, t)))),
            e.text && React.createElement("p", { style: { fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.6 } }, e.text))))),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "New Journal Entry \uD83D\uDCD3" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement("div", null,
                    React.createElement("label", { className: "label" }, "Mood"),
                    React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", marginTop: 4 } }, MOODS.map((m, i) => React.createElement("div", { key: m, onClick: () => setNe(e => (Object.assign(Object.assign({}, e), { mood: m, moodScore: (i + 1) * 2 }))), style: { fontSize: 28, cursor: "pointer", opacity: ne.mood === m ? 1 : 0.35, transition: "all 0.15s", transform: ne.mood === m ? "scale(1.25)" : "scale(1)" } }, m)))),
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: `Mood: ${ne.moodScore}/10` },
                        React.createElement("input", { type: "range", min: 1, max: 10, value: ne.moodScore, onChange: e => setNe(n => (Object.assign(Object.assign({}, n), { moodScore: +e.target.value }))), style: { width: "100%", accentColor: "var(--violet)" } })),
                    React.createElement(Field, { label: `Energy: ${ne.energy}/10` },
                        React.createElement("input", { type: "range", min: 1, max: 10, value: ne.energy, onChange: e => setNe(n => (Object.assign(Object.assign({}, n), { energy: +e.target.value }))), style: { width: "100%", accentColor: "var(--rose)" } }))),
                React.createElement("div", null,
                    React.createElement("label", { className: "label" }, "Quick Tags"),
                    React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 } }, TAGS.map(t => React.createElement("span", { key: t, onClick: () => setNe(e => (Object.assign(Object.assign({}, e), { tags: e.tags.includes(t) ? e.tags.replace(t, "").trim() : e.tags + " " + t }))), className: `b ${ne.tags.includes(t) ? "bv" : "bi"}`, style: { cursor: "pointer" } }, t)))),
                React.createElement(Field, { label: "Today's Note" },
                    React.createElement("textarea", { className: "inp", rows: 4, placeholder: "How are you feeling?", value: ne.text, onChange: e => setNe(n => (Object.assign(Object.assign({}, n), { text: e.target.value }))) }))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Save \uD83D\uDCD3")))));
}
function BudgetPage({ data, setData, toast }) {
    const [tab, setTab] = useState("overview");
    const [showAddTx, setShowAddTx] = useState(false);
    const [showAddBill, setShowAddBill] = useState(false);
    const [showAddAcct, setShowAddAcct] = useState(false);
    const [showAddCat, setShowAddCat] = useState(false);
    const [showAddRec, setShowAddRec] = useState(false);
    const [editingAcct, setEditingAcct] = useState(null);
    const [editingCat, setEditingCat] = useState(null);
    const [editingRec, setEditingRec] = useState(null);
    const [filterCat, setFilterCat] = useState("All");
    const [reconcileAcct, setReconcileAcct] = useState(null);
    const [reconcile, setReconcile] = useState({ date: isoTodayLocal(), statement: "" });
    // CSV import: step 1 pick file+account, 2 map columns, 3 preview & commit
    const [showImport, setShowImport] = useState(false);
    const [importStep, setImportStep] = useState(1);
    const [importFileName, setImportFileName] = useState("");
    const [importRows, setImportRows] = useState([]); // raw rows incl header
    const [importHasHeader, setImportHasHeader] = useState(true);
    const [importMap, setImportMap] = useState({ date: -1, desc: -1, amount: -1, debit: -1, credit: -1, category: -1 });
    const [importAcctId, setImportAcctId] = useState("");
    const [importAmountMode, setImportAmountMode] = useState("signed"); // "signed" | "flip" | "split"
    const [importDefaultCat, setImportDefaultCat] = useState("Other");
    const [importSkip, setImportSkip] = useState({}); // row idx -> true means skip
    const [importDupOnly, setImportDupOnly] = useState(false); // skip all dups toggle
    const [importParseErr, setImportParseErr] = useState("");
    const b = data.budget;
    const accounts = Array.isArray(b.accounts) ? b.accounts : [];
    const recurring = Array.isArray(b.recurring) ? b.recurring : [];
    const txs = Array.isArray(b.transactions) ? b.transactions : [];
    const defaultAcctId = accounts[0] ? accounts[0].id : "";
    const [nt, setNt] = useState({ name: "", amount: "", category: "Other", emoji: "💸", note: "", type: "expense", accountId: defaultAcctId, toAccountId: "" });
    const [nb, setNb] = useState({ name: "", amount: "", dueDay: "", emoji: "📄", autoPay: false });
    const [na, setNa] = useState({ name: "", subtype: "checking", openingBalance: "", emoji: "🏦", color: "var(--mint)" });
    const [nc, setNc] = useState({ name: "", budget: "", emoji: "📁", color: "var(--violet)", rollover: false });
    const [nr, setNr] = useState({ name: "", amount: "", accountId: defaultAcctId, category: "Other", emoji: "🔁", cadence: "monthly", nextRunDate: isoTodayLocal(), kind: "expense" });
    // ---- computed (this month + all-time) ----
    const now = new Date();
    const yr = now.getFullYear();
    const mo = now.getMonth();
    const inMonth = (t, y, m) => { const d = parseTxDate(t.date); return d && d.getFullYear() === y && d.getMonth() === m; };
    const thisMonthTxs = txs.filter(t => inMonth(t, yr, mo));
    const thisMonthSpent = thisMonthTxs.filter(t => t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0);
    const thisMonthIncome = thisMonthTxs.filter(t => t.amount > 0 && t.type !== "transfer").reduce((s, t) => s + t.amount, 0);
    const totalSpent = txs.filter(t => t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0);
    const totalIncome = txs.filter(t => t.amount > 0 && t.type !== "transfer").reduce((s, t) => s + t.amount, 0);
    const saved = totalIncome - totalSpent;
    const networth = netWorthFromAccounts(accounts, txs);
    const totalAssets = totalAssetsFromAccounts(accounts, txs);
    const totalLiab = totalLiabilitiesFromAccounts(accounts, txs);
    const catSpentMonth = (name, y, m) => txs.filter(t => t.category === name && t.amount < 0 && t.type !== "transfer" && inMonth(t, y, m)).reduce((s, t) => s + Math.abs(t.amount), 0);
    const computedCats = b.categories.map(c => {
        const spent = +catSpentMonth(c.name, yr, mo).toFixed(2);
        // Previous calendar month (handles Jan -> Dec of previous year).
        const prev = new Date(yr, mo - 1, 1);
        const lastSpent = +catSpentMonth(c.name, prev.getFullYear(), prev.getMonth()).toFixed(2);
        const carry = c.rollover ? Math.max(0, (+c.budget || 0) - lastSpent) : 0;
        return Object.assign({}, c, { spent, carry, effBudget: (+c.budget || 0) + carry });
    });
    const acctName = (id) => (accounts.find(a => a.id === id) || {}).name || "?";
    // ---- Reports helpers ----
    const monthsBack = (n) => {
        const out = [];
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date(yr, mo - i, 1);
            out.push({ year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleDateString("en-US", { month: "short" }) });
        }
        return out;
    };
    const months6 = monthsBack(6);
    const reportRows = months6.map(m => {
        const mTxs = txs.filter(t => inMonth(t, m.year, m.month));
        return Object.assign({}, m, {
            income: mTxs.filter(t => t.amount > 0 && t.type !== "transfer").reduce((s, t) => s + t.amount, 0),
            expense: mTxs.filter(t => t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0),
        });
    });
    const reportMax = Math.max(1, ...reportRows.map(r => Math.max(r.income, r.expense)));
    const rankByName = (predicate) => {
        const map = new Map();
        for (const t of txs) {
            if (!t || t.type === "transfer" || !predicate(t)) continue;
            const key = (t.name || "Unknown").trim() || "Unknown";
            const prev = map.get(key) || { count: 0, total: 0 };
            map.set(key, { count: prev.count + 1, total: prev.total + Math.abs(t.amount) });
        }
        return [...map.entries()].map(([name, v]) => Object.assign({ name }, v)).sort((a, b) => b.total - a.total).slice(0, 5);
    };
    const topMerchants = rankByName(t => t.amount < 0);
    const topSources = rankByName(t => t.amount > 0);
    const monthCatBreakdown = (() => {
        const map = new Map();
        for (const t of thisMonthTxs) {
            if (!t || t.amount >= 0 || t.type === "transfer") continue;
            const k = t.category || "Other";
            map.set(k, (map.get(k) || 0) + Math.abs(t.amount));
        }
        const list = [...map.entries()].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
        const sum = list.reduce((s, x) => s + x.total, 0);
        return { list, sum };
    })();
    const networthTrend = (() => {
        const months = monthsBack(12);
        return months.map(m => {
            const end = new Date(m.year, m.month + 1, 0, 23, 59, 59, 999);
            const cutoffTxs = txs.filter(t => { const d = parseTxDate(t.date); return d && d <= end; });
            return Object.assign({}, m, { value: netWorthFromAccounts(accounts, cutoffTxs) });
        });
    })();
    const nwMin = Math.min(...networthTrend.map(x => x.value), 0);
    const nwMax = Math.max(...networthTrend.map(x => x.value), 0);
    const nwRange = (nwMax - nwMin) || 1;
    const savePct = totalIncome > 0 ? Math.round((saved / totalIncome) * 100) : 0;
    const allCats = ["All", "Income", "Transfer", ...b.categories.map(c => c.name)];
    const filteredTx = filterCat === "All"
        ? txs
        : (filterCat === "Transfer" ? txs.filter(t => t.type === "transfer") : txs.filter(t => t.category === filterCat));
    const addTx = () => {
        if (nt.type === "transfer") {
            if (!nt.amount || !nt.accountId || !nt.toAccountId || nt.accountId === nt.toAccountId) {
                toast("Pick two different accounts", "error"); return;
            }
            const tx = { id: newBudgetId(), date: TODAY(), name: nt.name.trim() || "Transfer", amount: Math.abs(+nt.amount), type: "transfer", fromAccountId: nt.accountId, toAccountId: nt.toAccountId, emoji: "🔄", note: nt.note };
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { transactions: [tx, ...d.budget.transactions] }) }));
            toast(`Transferred $${tx.amount.toFixed(2)} 🔄`);
        } else {
            if (!nt.name.trim() || !nt.amount || !nt.accountId) {
                toast("Fill name, amount, account", "error"); return;
            }
            const amt = nt.type === "income" ? Math.abs(+nt.amount) : -Math.abs(+nt.amount);
            const tx = { id: newBudgetId(), date: TODAY(), name: nt.name.trim(), amount: amt, category: nt.type === "income" ? "Income" : nt.category, emoji: nt.emoji, note: nt.note, accountId: nt.accountId };
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { transactions: [tx, ...d.budget.transactions] }) }));
            toast(nt.type === "income" ? `+$${Math.abs(amt).toFixed(2)} income logged 💚` : `-$${Math.abs(amt).toFixed(2)} logged`);
        }
        setShowAddTx(false);
        setNt({ name: "", amount: "", category: nt.category || "Other", emoji: "💸", note: "", type: "expense", accountId: defaultAcctId, toAccountId: "" });
    };
    const addBill = () => {
        if (!nb.name.trim() || !nb.amount || !nb.dueDay) return;
        setData(d => (Object.assign(Object.assign({}, d), { budget: Object.assign(Object.assign({}, d.budget), { bills: [...d.budget.bills, { id: Date.now(), name: nb.name, amount: +nb.amount, dueDay: +nb.dueDay, emoji: nb.emoji, paid: false, autoPay: nb.autoPay }] }) })));
        toast(`Bill "${nb.name}" added!`);
        setShowAddBill(false);
        setNb({ name: "", amount: "", dueDay: "", emoji: "📄", autoPay: false });
    };
    const toggleBillPaid = id => setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { bills: d.budget.bills.map(bl => bl.id === id ? Object.assign({}, bl, { paid: !bl.paid }) : bl) }) }));
    const delTx = id => setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { transactions: d.budget.transactions.filter(t => t.id !== id) }) }));
    // ---- CSV Import ----
    const resetImport = () => {
        setImportStep(1); setImportFileName(""); setImportRows([]); setImportHasHeader(true);
        setImportMap({ date: -1, desc: -1, amount: -1, debit: -1, credit: -1, category: -1 });
        setImportAcctId(defaultAcctId); setImportAmountMode("signed");
        setImportDefaultCat((b.categories[0] && b.categories[0].name) || "Other");
        setImportSkip({}); setImportDupOnly(false); setImportParseErr("");
    };
    const openImport = () => {
        if (accounts.length === 0) { toast("Add an account first", "error"); return; }
        resetImport(); setShowImport(true);
    };
    const handleImportFile = (file) => {
        if (!file) return;
        setImportParseErr("");
        const reader = new FileReader();
        reader.onload = () => {
            const text = String(reader.result || "");
            const rows = parseCSV(text);
            if (rows.length === 0) { setImportParseErr("That file looks empty or unreadable."); return; }
            // Pad short rows so every row has the same width as the widest.
            const w = rows.reduce((m, r) => Math.max(m, r.length), 0);
            const padded = rows.map(r => { const c = r.slice(); while (c.length < w) c.push(""); return c; });
            setImportFileName(file.name || "import.csv");
            setImportRows(padded);
            // Heuristic: first row is a header if any cell is non-numeric & not a date.
            const first = padded[0] || [];
            const looksHeader = first.some(c => {
                const s = String(c).trim(); if (!s) return false;
                if (parseImportDate(s)) return false;
                if (!isNaN(parseImportAmount(s))) return false;
                return true;
            });
            setImportHasHeader(looksHeader);
            const headers = looksHeader ? first : first.map((_, i) => "Column " + (i + 1));
            setImportMap(autoDetectCsvMap(headers));
        };
        reader.onerror = () => setImportParseErr("Could not read that file.");
        reader.readAsText(file);
    };
    // Build the previewed transactions from current mapping. Each entry has
    // {idx, ok, date, name, amount, category, dup, error}.
    const importPreview = (function () {
        if (importRows.length === 0) return [];
        const dataRows = importHasHeader ? importRows.slice(1) : importRows;
        const existingKeys = new Set(txs.map(t => {
            const d = parseTxDate(t.date); const iso = d ? (d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")) : t.date;
            return iso + "|" + (+t.amount || 0).toFixed(2) + "|" + String(t.name || "").trim().toLowerCase();
        }));
        const seenInFile = new Set();
        return dataRows.map((row, idx) => {
            const dStr = importMap.date >= 0 ? row[importMap.date] : "";
            const iso = parseImportDate(dStr);
            const name = (importMap.desc >= 0 ? String(row[importMap.desc] || "").trim() : "") || "Imported";
            let amount = NaN;
            if (importAmountMode === "split") {
                const deb = importMap.debit >= 0 ? parseImportAmount(row[importMap.debit]) : NaN;
                const cre = importMap.credit >= 0 ? parseImportAmount(row[importMap.credit]) : NaN;
                if (!isNaN(deb) && deb !== 0) amount = -Math.abs(deb);
                else if (!isNaN(cre) && cre !== 0) amount = Math.abs(cre);
            } else {
                const raw = importMap.amount >= 0 ? parseImportAmount(row[importMap.amount]) : NaN;
                if (!isNaN(raw)) amount = importAmountMode === "flip" ? -raw : raw;
            }
            const cat = (importMap.category >= 0 && String(row[importMap.category] || "").trim()) || importDefaultCat || "Other";
            const error = !iso ? "Bad date" : isNaN(amount) ? "Bad amount" : "";
            const key = (iso || "") + "|" + (isNaN(amount) ? "0.00" : amount.toFixed(2)) + "|" + name.toLowerCase();
            // Flag as duplicate if it matches an existing ledger entry OR an
            // earlier row from this same file (intra-batch dedup).
            const dup = !error && (existingKeys.has(key) || seenInFile.has(key));
            if (!error) seenInFile.add(key);
            return { idx, ok: !error, date: iso, name, amount, category: cat, dup, error };
        });
    })();
    const importCommit = () => {
        if (importStep === 1) {
            if (importRows.length === 0) { toast("Pick a CSV file first", "error"); return; }
            if (!importAcctId) { toast("Pick an account", "error"); return; }
            setImportStep(2); return;
        }
        if (importStep === 2) {
            if (importMap.date < 0) { toast("Map the Date column", "error"); return; }
            if (importAmountMode === "split") {
                if (importMap.debit < 0 && importMap.credit < 0) { toast("Map at least one of Debit/Credit", "error"); return; }
            } else if (importMap.amount < 0) { toast("Map the Amount column", "error"); return; }
            setImportStep(3); return;
        }
        // Step 3: commit.
        const acct = accounts.find(a => a.id === importAcctId);
        const newTxs = importPreview
            .filter(p => p.ok && !importSkip[p.idx] && !(importDupOnly && p.dup))
            .map(p => ({
                id: newBudgetId(),
                date: p.date,
                name: p.name,
                amount: +p.amount.toFixed(2),
                category: p.amount > 0 ? "Income" : (p.category || "Other"),
                emoji: p.amount > 0 ? "💵" : "💸",
                note: "Imported from " + importFileName,
                accountId: importAcctId,
            }));
        if (newTxs.length === 0) { toast("Nothing to import", "error"); return; }
        setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { transactions: [...newTxs, ...d.budget.transactions] }) }));
        toast(`Imported ${newTxs.length} transaction${newTxs.length === 1 ? "" : "s"} into ${acct ? acct.name : "account"} 📥`);
        setShowImport(false);
    };
    const exportCSV = () => {
        const rows = [["Date", "Description", "Amount", "Category", "Account", "Note"], ...txs.map(t => {
            const acct = t.type === "transfer"
                ? `${acctName(t.fromAccountId)}→${acctName(t.toAccountId)}`
                : acctName(t.accountId);
            return [t.date, `"${(t.name || "").replace(/"/g, "''")}"`, t.amount, t.type === "transfer" ? "Transfer" : (t.category || ""), `"${acct}"`, `"${(t.note || "").replace(/"/g, "''")}"`];
        })];
        const csv = rows.map(r => r.join(",")).join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        const a = document.createElement("a");
        a.href = url; a.download = "lifesync-finance.csv"; a.click();
        toast("Finance CSV exported! 📊");
    };
    // ---- Account CRUD ----
    const saveAcct = () => {
        const src = editingAcct || na;
        if (!src.name || !String(src.name).trim()) { toast("Name the account", "error"); return; }
        const sub = accountSubtype(src.subtype || "checking");
        const opening = +src.openingBalance || 0;
        const signedOpening = sub.type === "liability" ? -Math.abs(opening) : opening;
        if (editingAcct) {
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { accounts: d.budget.accounts.map(a => a.id === editingAcct.id ? Object.assign({}, a, { name: src.name.trim(), subtype: src.subtype, type: sub.type, openingBalance: signedOpening, emoji: src.emoji || sub.emoji, color: src.color || sub.color }) : a) }) }));
            toast(`Updated "${src.name}"`);
        } else {
            const rec = { id: newBudgetId(), name: src.name.trim(), type: sub.type, subtype: src.subtype, openingBalance: signedOpening, emoji: src.emoji || sub.emoji, color: src.color || sub.color, createdAt: new Date().toISOString() };
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { accounts: [...d.budget.accounts, rec] }) }));
            toast(`Account "${rec.name}" added 🏦`);
        }
        setShowAddAcct(false); setEditingAcct(null);
        setNa({ name: "", subtype: "checking", openingBalance: "", emoji: "🏦", color: "var(--mint)" });
    };
    const delAcct = (id) => {
        const acct = accounts.find(a => a.id === id);
        if (!acct) return;
        const used = txs.filter(t => t.accountId === id || t.fromAccountId === id || t.toAccountId === id).length;
        const usedByRec = (b.recurring || []).filter(r => r.accountId === id).length;
        if (used > 0 || usedByRec > 0) {
            const others = accounts.filter(a => a.id !== id);
            if (others.length === 0) { toast("Add another account first, then move transactions over.", "error"); return; }
            const list = others.map((a, i) => `${i + 1}. ${a.name}`).join("\n");
            const pick = window.prompt(`"${acct.name}" has ${used} transaction(s)${usedByRec ? ` and ${usedByRec} recurring rule(s)` : ""}. Move them to which account?\n\n${list}\n\nEnter a number, or Cancel to abort.`);
            const idx = parseInt(pick, 10);
            if (!idx || idx < 1 || idx > others.length) { toast("Delete cancelled.", "error"); return; }
            const targetId = others[idx - 1].id;
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, {
                accounts: d.budget.accounts.filter(a => a.id !== id),
                recurring: (d.budget.recurring || []).map(r => r.accountId === id ? Object.assign({}, r, { accountId: targetId }) : r),
                transactions: d.budget.transactions.map(t => (t.accountId === id || t.fromAccountId === id || t.toAccountId === id) ? Object.assign({}, t, {
                    accountId: t.accountId === id ? targetId : t.accountId,
                    fromAccountId: t.fromAccountId === id ? targetId : t.fromAccountId,
                    toAccountId: t.toAccountId === id ? targetId : t.toAccountId,
                }) : t),
            }) }));
            toast(`Deleted "${acct.name}" — items moved to ${others[idx - 1].name}`);
            return;
        }
        if (!window.confirm(`Delete account "${acct.name}"?`)) return;
        setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, {
            accounts: d.budget.accounts.filter(a => a.id !== id),
            transactions: d.budget.transactions.map(t => (t.accountId === id || t.fromAccountId === id || t.toAccountId === id) ? Object.assign({}, t, {
                accountId: t.accountId === id ? "" : t.accountId,
                fromAccountId: t.fromAccountId === id ? "" : t.fromAccountId,
                toAccountId: t.toAccountId === id ? "" : t.toAccountId,
            }) : t),
        }) }));
        toast(`Deleted "${acct.name}"`);
    };
    // ---- Reconcile ----
    const openReconcile = (acct) => {
        setReconcileAcct(acct);
        setReconcile({ date: isoTodayLocal(), statement: "" });
    };
    const postReconcile = () => {
        if (!reconcileAcct) return;
        if (reconcile.statement === "" || isNaN(+reconcile.statement)) {
            toast("Enter your statement balance", "error"); return;
        }
        if (!reconcile.date) { toast("Pick a date", "error"); return; }
        const computed = accountBalanceOnDate(reconcileAcct, txs, reconcile.date);
        // For liabilities the user enters what they owe (positive); the
        // ledger stores liabilities as negative, so flip the sign first.
        const target = reconcileAcct.type === "liability"
            ? -Math.abs(+reconcile.statement)
            : +reconcile.statement;
        const diff = +(target - computed).toFixed(2);
        if (Math.abs(diff) < 0.005) {
            toast("Already balanced — no adjustment needed ✨");
            setReconcileAcct(null);
            return;
        }
        const tx = {
            id: newBudgetId(),
            date: reconcile.date,
            name: "Reconcile adjustment",
            amount: diff,
            category: "Adjustment",
            emoji: "⚖️",
            note: `Statement balance $${(+reconcile.statement).toFixed(2)} on ${reconcile.date}`,
            accountId: reconcileAcct.id,
        };
        setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { transactions: [tx, ...d.budget.transactions] }) }));
        toast(`Reconciled "${reconcileAcct.name}" — ${diff > 0 ? "+" : "-"}$${Math.abs(diff).toFixed(2)} adjustment posted`);
        setReconcileAcct(null);
    };
    // ---- Category CRUD ----
    const saveCat = () => {
        const src = editingCat || nc;
        if (!src.name || !String(src.name).trim()) { toast("Name the category", "error"); return; }
        if (editingCat) {
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, {
                categories: d.budget.categories.map(c => c.id === editingCat.id ? Object.assign({}, c, { name: src.name.trim(), budget: +src.budget || 0, color: src.color, emoji: src.emoji, rollover: !!src.rollover }) : c),
                transactions: d.budget.transactions.map(t => t.category === editingCat.name ? Object.assign({}, t, { category: src.name.trim() }) : t),
            }) }));
            toast(`Updated "${src.name}"`);
        } else {
            const rec = { id: newBudgetId(), name: src.name.trim(), budget: +src.budget || 0, color: src.color || "var(--violet)", emoji: src.emoji || "📁", rollover: !!src.rollover };
            setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { categories: [...d.budget.categories, rec] }) }));
            toast(`Category "${rec.name}" added`);
        }
        setShowAddCat(false); setEditingCat(null);
        setNc({ name: "", budget: "", emoji: "📁", color: "var(--violet)", rollover: false });
    };
    const delCat = (id) => {
        const cat = b.categories.find(c => c.id === id);
        if (!cat) return;
        if (!window.confirm(`Delete category "${cat.name}"?`)) return;
        setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { categories: d.budget.categories.filter(c => c.id !== id) }) }));
        toast(`Deleted "${cat.name}"`);
    };
    // ---- Recurring CRUD ----
    const saveRec = () => {
        const src = editingRec || nr;
        if (!src.name || !String(src.name).trim() || !src.amount || !src.accountId) { toast("Fill name, amount, account", "error"); return; }
        const amt = src.kind === "income" ? Math.abs(+src.amount) : -Math.abs(+src.amount);
        if (editingRec) {
            setData(d => {
                const next = Object.assign({}, d, { budget: Object.assign({}, d.budget, {
                    recurring: d.budget.recurring.map(r => r.id === editingRec.id ? Object.assign({}, r, { name: src.name.trim(), amount: amt, accountId: src.accountId, category: src.category || "Other", emoji: src.emoji || (amt > 0 ? "💵" : "💸"), cadence: src.cadence || "monthly", nextRunDate: src.nextRunDate || isoTodayLocal() }) : r),
                }) });
                return postDueRecurringRules(next);
            });
            toast(`Rule updated`);
        } else {
            const rec = { id: newBudgetId(), name: src.name.trim(), amount: amt, accountId: src.accountId, category: src.category || "Other", emoji: src.emoji || (amt > 0 ? "💵" : "💸"), cadence: src.cadence || "monthly", nextRunDate: src.nextRunDate || isoTodayLocal(), createdAt: new Date().toISOString() };
            setData(d => {
                const next = Object.assign({}, d, { budget: Object.assign({}, d.budget, { recurring: [...d.budget.recurring, rec] }) });
                return postDueRecurringRules(next);
            });
            toast(`Rule "${rec.name}" added 🔁`);
        }
        setShowAddRec(false); setEditingRec(null);
        setNr({ name: "", amount: "", accountId: defaultAcctId, category: "Other", emoji: "🔁", cadence: "monthly", nextRunDate: isoTodayLocal(), kind: "expense" });
    };
    const delRec = (id) => {
        const r = recurring.find(x => x.id === id);
        if (!r) return;
        if (!window.confirm(`Delete recurring rule "${r.name}"?`)) return;
        setData(d => Object.assign({}, d, { budget: Object.assign({}, d.budget, { recurring: d.budget.recurring.filter(x => x.id !== id) }) }));
        toast("Rule deleted");
    };
    const runRecNow = (id) => {
        setData(d => {
            const next = Object.assign({}, d, { budget: Object.assign({}, d.budget, { recurring: d.budget.recurring.map(r => r.id === id ? Object.assign({}, r, { nextRunDate: isoTodayLocal() }) : r) }) });
            return postDueRecurringRules(next);
        });
        toast("Posted 🔁");
    };
    return (React.createElement("div", { className: "pe" },
          React.createElement("div", { className: "flex fac fjb sh", style: { flexWrap: "wrap", gap: 10 } },
              React.createElement("div", null,
                  React.createElement("h2", { className: "st" }, "Finance \uD83D\uDCB0"),
                  React.createElement("p", { className: "ss2" },
                      "Net worth: ",
                      React.createElement("strong", { style: { color: networth >= 0 ? "var(--gold)" : "var(--rose)" } }, "$" + networth.toLocaleString()),
                      "  \u00B7  " + savePct + "% saved")),
              React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
                  React.createElement("button", { className: "btn btn-s btn-sm", onClick: exportCSV },
                      React.createElement(Ic, { n: "download", size: 13 }), "CSV"),
                  React.createElement("button", { className: "btn btn-p btn-sm", onClick: () => setShowAddBill(true) }, "+ Bill"),
                  React.createElement("button", { className: "btn btn-p", onClick: () => { setNt(n => Object.assign({}, n, { accountId: defaultAcctId })); setShowAddTx(true); } },
                      React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }), "Add Transaction"))),
          React.createElement("div", { className: "tabs sp", style: { overflowX: "auto" } },
              ["overview", "transactions", "budgets", "bills", "accounts", "reports"].map(t =>
                  React.createElement("div", { key: t, className: `tab ${tab === t ? "active" : ""}`, onClick: () => setTab(t), style: { textTransform: "capitalize", whiteSpace: "nowrap" } }, t))),

          // ===== OVERVIEW =====
          tab === "overview" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 18 } },
              React.createElement("div", { className: "g3" }, [
                  { icon: "\uD83D\uDCB5", val: "$" + thisMonthIncome.toLocaleString(), label: "Income (mo)", color: "var(--mint)", sub: (b.incomeSources.length || 0) + " sources" },
                  { icon: "\uD83D\uDCB8", val: "$" + thisMonthSpent.toFixed(0), label: "Spent (mo)", color: "var(--rose)", sub: thisMonthIncome > 0 ? Math.round((thisMonthSpent / thisMonthIncome) * 100) + "% of income" : "\u2014" },
                  { icon: "\uD83C\uDFE6", val: "$" + networth.toLocaleString(), label: "Net worth", color: networth >= 0 ? "var(--gold)" : "var(--rose)", sub: accounts.length + " accounts" },
              ].map((s, i) => React.createElement("div", { key: i, className: "sc" },
                  React.createElement("div", { className: "si", style: { background: s.color + "18" } }, s.icon),
                  React.createElement("div", { className: "sv", style: { color: s.color } }, s.val),
                  React.createElement("div", { className: "sl" }, s.label),
                  React.createElement("div", { className: "ss" }, s.sub)))),
              accounts.length > 0 && React.createElement("div", { className: "card" },
                  React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 12 } },
                      React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Accounts"),
                      React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setTab("accounts") }, "Manage \u2192")),
                  React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 } },
                      accounts.map(a => {
                          const bal = accountCurrentBalance(a, txs);
                          const isLiab = a.type === "liability";
                          return React.createElement("div", { key: a.id, style: { flex: "0 0 auto", minWidth: 140, background: "var(--surface2)", border: "1px solid " + (a.color || "var(--border)") + "33", borderRadius: 12, padding: 12 } },
                              React.createElement("div", { style: { fontSize: 18 } }, a.emoji || "\uD83C\uDFE6"),
                              React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginTop: 2 } }, a.name),
                              React.createElement("div", { style: { fontWeight: 800, fontSize: 16, color: bal < 0 ? "var(--rose)" : "var(--text)", marginTop: 2 } },
                                  ((isLiab && bal < 0) ? "-" : "") + "$" + Math.abs(bal).toLocaleString()));
                      }))),
              React.createElement("div", { className: "card gg flex fac gap4", style: { flexWrap: "wrap" } },
                  React.createElement(Ring, { value: saved, max: b.savingsGoal, size: 96, color: "var(--gold)", label: savePct + "%", sub: "saved" }),
                  React.createElement("div", { style: { flex: 1, minWidth: 180 } },
                      React.createElement("div", { style: { fontSize: 17, fontWeight: 700, marginBottom: 4 } }, savePct >= 100 ? "Goal hit! \uD83C\uDF89" : savePct >= 50 ? "Halfway there! \uD83D\uDCAA" : "Building momentum \u2728"),
                      React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 10 } },
                          "$" + saved.toFixed(0) + " of $" + b.savingsGoal.toLocaleString() + " goal"),
                      React.createElement("div", { className: "xb", style: { height: 8 } },
                          React.createElement("div", { className: "xf", style: { width: Math.min((saved / Math.max(1, b.savingsGoal)) * 100, 100) + "%" } })))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 13 } },
                      React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5 } }, "Top Categories (this month)"),
                      React.createElement("button", { className: "btn btn-g btn-sm", onClick: () => setTab("budgets") }, "All \u2192")),
                  computedCats.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 16, color: "var(--text-muted)", fontSize: 12.5 } }, "No categories yet. Add one on Budgets tab."),
                  [...computedCats].sort((a, b) => b.spent - a.spent).slice(0, 4).map(cat =>
                      React.createElement("div", { key: cat.id, style: { marginBottom: 13 } },
                          React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 5 } },
                              React.createElement("span", { className: "flex fac gap2", style: { fontSize: 13, fontWeight: 600 } },
                                  cat.emoji, " ", cat.name,
                                  cat.spent > cat.effBudget && React.createElement("span", { className: "b br", style: { fontSize: 9.5 } }, "Over!")),
                              React.createElement("span", { style: { fontSize: 11.5, color: cat.spent > cat.effBudget ? "var(--rose)" : "var(--text-muted)" } },
                                  "$" + cat.spent.toFixed(0) + " / $" + cat.effBudget.toFixed(0))),
                          React.createElement("div", { className: "pb" },
                              React.createElement("div", { className: "pf", style: { width: Math.min((cat.spent / Math.max(1, cat.effBudget)) * 100, 100) + "%", background: cat.spent > cat.effBudget ? "var(--rose)" : cat.color } }))))),
          ),

          // ===== TRANSACTIONS =====
          tab === "transactions" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
              React.createElement("div", { className: "flex fac fjb", style: { flexWrap: "wrap", gap: 8 } },
                  React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
                      allCats.map(cat => React.createElement("button", { key: cat, onClick: () => setFilterCat(cat), className: "btn btn-sm " + (filterCat === cat ? "btn-s" : "btn-g"), style: { fontSize: 11 } }, cat))),
                  React.createElement("button", { className: "btn btn-s btn-sm", onClick: openImport },
                      React.createElement(Ic, { n: "upload", size: 13 }), "Import CSV")),
              React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } },
                  filteredTx.length + " transactions  \u00B7  ",
                  React.createElement("span", { style: { color: "var(--rose)" } }, "-$" + filteredTx.filter(t => t.amount < 0 && t.type !== "transfer").reduce((s, t) => s + Math.abs(t.amount), 0).toFixed(2)),
                  "  \u00B7  ",
                  React.createElement("span", { style: { color: "var(--mint)" } }, "+$" + filteredTx.filter(t => t.amount > 0 && t.type !== "transfer").reduce((s, t) => s + t.amount, 0).toFixed(2))),
              React.createElement("div", { className: "card", style: { padding: 0, overflow: "hidden" } },
                  filteredTx.length === 0 && React.createElement("div", { style: { padding: 36, textAlign: "center", color: "var(--text-muted)", fontSize: 13 } }, "No transactions"),
                  filteredTx.map((tx, idx) => {
                      const isTransfer = tx.type === "transfer";
                      const label = isTransfer ? (acctName(tx.fromAccountId) + " \u2192 " + acctName(tx.toAccountId)) : acctName(tx.accountId);
                      return React.createElement("div", { key: tx.id, className: "flex fac gap3", style: { padding: "13px 17px", borderBottom: idx < filteredTx.length - 1 ? "1px solid var(--border)" : "none" } },
                          React.createElement("div", { style: { width: 38, height: 38, borderRadius: 11, background: (tx.amount > 0 && !isTransfer) ? "rgba(127,255,212,0.1)" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 } }, isTransfer ? "\uD83D\uDD04" : tx.emoji),
                          React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                              React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, tx.name),
                              React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", display: "flex", gap: 7, marginTop: 2, flexWrap: "wrap" } },
                                  React.createElement("span", null, tx.date),
                                  React.createElement("span", { className: "b " + (isTransfer ? "bv" : (tx.amount > 0 ? "bm" : "bi")), style: { fontSize: 9.5 } }, isTransfer ? "Transfer" : tx.category),
                                  React.createElement("span", { style: { color: "var(--text-dim)" } }, "\u00B7 " + label),
                                  tx.note && React.createElement("span", { style: { color: "var(--text-dim)", fontStyle: "italic" } }, tx.note))),
                          React.createElement("span", { style: { fontWeight: 700, fontSize: 15, color: isTransfer ? "var(--violet)" : (tx.amount > 0 ? "var(--mint)" : "var(--rose)"), flexShrink: 0 } },
                              isTransfer ? ("$" + Math.abs(tx.amount).toFixed(2)) : ((tx.amount > 0 ? "+" : "-") + "$" + Math.abs(tx.amount).toFixed(2))),
                          React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 26, height: 26, fontSize: 15, color: "var(--text-dim)", flexShrink: 0 }, onClick: () => delTx(tx.id) }, "\u00D7"));
                  }))),

          // ===== BUDGETS =====
          tab === "budgets" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              React.createElement("div", { className: "flex fac fjb" },
                  React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)" } },
                      "Budgeted: ", React.createElement("strong", { style: { color: "var(--text)" } }, "$" + computedCats.reduce((s, c) => s + (+c.budget || 0), 0).toLocaleString()),
                      "  \u00B7  Spent (mo): ", React.createElement("strong", { style: { color: "var(--rose)" } }, "$" + thisMonthSpent.toFixed(0))),
                  React.createElement("button", { className: "btn btn-p btn-sm", onClick: () => { setEditingCat(null); setNc({ name: "", budget: "", emoji: "\uD83D\uDCC1", color: "var(--violet)", rollover: false }); setShowAddCat(true); } }, "+ Category")),
              computedCats.length === 0 && React.createElement("div", { className: "card", style: { textAlign: "center", color: "var(--text-muted)", fontSize: 13, padding: 30 } }, "No categories yet. Add one to start budgeting."),
              computedCats.map(cat => {
                  const pct = Math.min((cat.spent / Math.max(1, cat.effBudget)) * 100, 100);
                  const over = cat.spent > cat.effBudget;
                  const rem = cat.effBudget - cat.spent;
                  return React.createElement("div", { key: cat.id, className: "card", style: { borderLeft: "3px solid " + (over ? "var(--rose)" : cat.color) } },
                      React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 10 } },
                          React.createElement("div", { className: "flex fac gap2" },
                              React.createElement("span", { style: { fontSize: 21 } }, cat.emoji),
                              React.createElement("div", null,
                                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, cat.name,
                                      cat.rollover && React.createElement("span", { className: "b bv", style: { fontSize: 9.5, marginLeft: 6 } }, "Rollover")),
                                  React.createElement("div", { style: { fontSize: 11, color: over ? "var(--rose)" : "var(--mint)" } },
                                      over ? "Over by $" + Math.abs(rem).toFixed(0) : "$" + rem.toFixed(0) + " remaining",
                                      cat.carry > 0 && " \u00B7 +$" + cat.carry.toFixed(0) + " carry"))),
                          React.createElement("div", { style: { textAlign: "right" } },
                              React.createElement("div", { style: { fontWeight: 800, fontSize: 16, color: over ? "var(--rose)" : "var(--text)" } }, "$" + cat.spent.toFixed(0)),
                              React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-dim)" } }, "/ $" + cat.effBudget.toFixed(0)))),
                      React.createElement("div", { className: "pb", style: { height: 7, marginBottom: 10 } },
                          React.createElement("div", { className: "pf", style: { width: pct + "%", background: over ? "var(--rose)" : cat.color, height: 7 } })),
                      React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end" } },
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11 }, onClick: () => { setEditingCat(Object.assign({}, cat)); setShowAddCat(true); } }, "Edit"),
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11, color: "var(--rose)" }, onClick: () => delCat(cat.id) }, "Delete")));
              })),

          // ===== BILLS =====
          tab === "bills" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 18 } },
              React.createElement("div", { className: "flex fac fjb" },
                  React.createElement("div", null,
                      React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)" } },
                          "Monthly: ", React.createElement("strong", { style: { color: "var(--text)" } }, "$" + b.bills.reduce((s, bl) => s + bl.amount, 0).toFixed(0))),
                      React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginTop: 2 } },
                          "Annual: ", React.createElement("strong", { style: { color: "var(--text)" } }, "$" + (b.bills.reduce((s, bl) => s + bl.amount, 0) * 12).toLocaleString())))),
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, b.bills.map(bl =>
                  React.createElement("div", { key: bl.id, className: "card flex fac gap3" },
                      React.createElement("div", { style: { width: 42, height: 42, borderRadius: 12, background: bl.paid ? "rgba(127,255,212,0.12)" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 } }, bl.emoji),
                      React.createElement("div", { style: { flex: 1 } },
                          React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, bl.name),
                          React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, "Due: " + bl.dueDay + "th" + (bl.autoPay ? " \u00B7 AutoPay \u2713" : ""))),
                      React.createElement("div", { style: { textAlign: "right" } },
                          React.createElement("div", { style: { fontWeight: 800, fontSize: 15 } }, "$" + bl.amount),
                          React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)" } }, "monthly")),
                      React.createElement("button", { className: "btn btn-sm " + (bl.paid ? "btn-s" : "btn-p"), onClick: () => toggleBillPaid(bl.id), style: { flexShrink: 0, fontSize: 11 } }, bl.paid ? "Paid \u2713" : "Mark Paid")))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 12 } },
                      React.createElement("div", null,
                          React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Recurring Rules \uD83D\uDD01"),
                          React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2 } }, "Auto-post salary, rent, subs on schedule")),
                      React.createElement("button", { className: "btn btn-p btn-sm", onClick: () => { setEditingRec(null); setNr({ name: "", amount: "", accountId: defaultAcctId, category: "Other", emoji: "\uD83D\uDD01", cadence: "monthly", nextRunDate: isoTodayLocal(), kind: "expense" }); setShowAddRec(true); } }, "+ Rule")),
                  recurring.length === 0 && React.createElement("div", { style: { textAlign: "center", padding: 20, color: "var(--text-muted)", fontSize: 12.5 } }, "No recurring rules yet."),
                  React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, recurring.map(r =>
                      React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--surface2)", borderRadius: 11, border: "1px solid var(--border)" } },
                          React.createElement("span", { style: { fontSize: 20 } }, r.emoji || "\uD83D\uDD01"),
                          React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                              React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, r.name),
                              React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, r.cadence + " \u00B7 next " + r.nextRunDate + " \u00B7 " + acctName(r.accountId))),
                          React.createElement("span", { style: { fontWeight: 700, fontSize: 13.5, color: r.amount >= 0 ? "var(--mint)" : "var(--rose)" } }, (r.amount >= 0 ? "+" : "-") + "$" + Math.abs(r.amount).toFixed(2)),
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11 }, title: "Post now", onClick: () => runRecNow(r.id) }, "Run"),
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11 }, onClick: () => { setEditingRec(Object.assign({ kind: r.amount >= 0 ? "income" : "expense" }, r, { amount: Math.abs(r.amount) })); setShowAddRec(true); } }, "Edit"),
                          React.createElement("button", { className: "btn btn-g btn-ic", style: { width: 28, height: 28, fontSize: 14, color: "var(--text-dim)" }, onClick: () => delRec(r.id) }, "\u00D7"))))),
          ),

          // ===== ACCOUNTS =====
          tab === "accounts" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
              React.createElement("div", { className: "card gg" },
                  React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)", marginBottom: 4 } }, "Total Net Worth"),
                  React.createElement("div", { style: { fontSize: 32, fontWeight: 800, color: networth >= 0 ? "var(--gold)" : "var(--rose)" } }, "$" + networth.toLocaleString()),
                  React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 4 } },
                      "Assets ", React.createElement("strong", { style: { color: "var(--mint)" } }, "+$" + totalAssets.toLocaleString()),
                      "  \u00B7  Liabilities ", React.createElement("strong", { style: { color: "var(--rose)" } }, "-$" + totalLiab.toLocaleString()))),
              React.createElement("div", { className: "flex fac fjb" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Your Accounts"),
                  React.createElement("button", { className: "btn btn-p btn-sm", onClick: () => { setEditingAcct(null); setNa({ name: "", subtype: "checking", openingBalance: "", emoji: "\uD83C\uDFE6", color: "var(--mint)" }); setShowAddAcct(true); } }, "+ Account")),
              accounts.map(a => {
                  const bal = accountCurrentBalance(a, txs);
                  const isLiab = a.type === "liability";
                  const recentTxs = txs.filter(t => t.accountId === a.id || t.fromAccountId === a.id || t.toAccountId === a.id).slice(0, 5);
                  return React.createElement("div", { key: a.id, className: "card", style: { borderLeft: "3px solid " + (a.color || "var(--border)") } },
                      React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 8 } },
                          React.createElement("div", { className: "flex fac gap2" },
                              React.createElement("span", { style: { fontSize: 22 } }, a.emoji || "\uD83C\uDFE6"),
                              React.createElement("div", null,
                                  React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, a.name),
                                  React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, accountSubtype(a.subtype).label))),
                          React.createElement("div", { style: { textAlign: "right" } },
                              React.createElement("div", { style: { fontWeight: 800, fontSize: 18, color: bal < 0 ? "var(--rose)" : "var(--text)" } },
                                  ((isLiab && bal < 0) ? "-" : "") + "$" + Math.abs(bal).toLocaleString()),
                              React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-dim)" } }, isLiab && bal < 0 ? "owed" : (isLiab ? "credit" : "balance")))),
                      recentTxs.length > 0 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border)" } },
                          recentTxs.map(t => React.createElement("div", { key: t.id, style: { display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--text-muted)" } },
                              React.createElement("span", null, (t.emoji || "\u2022") + " " + (t.name || "")),
                              React.createElement("span", { style: { color: t.type === "transfer" ? "var(--violet)" : (t.amount > 0 ? "var(--mint)" : "var(--rose)") } },
                                  t.type === "transfer" ? ((t.fromAccountId === a.id ? "-" : "+") + "$" + Math.abs(t.amount).toFixed(2)) : ((t.amount > 0 ? "+" : "-") + "$" + Math.abs(t.amount).toFixed(2)))))),
                      React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 10 } },
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11 }, onClick: () => openReconcile(a) }, "Reconcile"),
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11 }, onClick: () => { setEditingAcct(Object.assign({}, a, { openingBalance: isLiab ? Math.abs(a.openingBalance || 0) : (a.openingBalance || 0) })); setShowAddAcct(true); } }, "Edit"),
                          React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 11, color: "var(--rose)" }, onClick: () => delAcct(a.id) }, "Delete")));
              })),

          // ===== REPORTS =====
          tab === "reports" && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
              React.createElement("div", { className: "card" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Income vs Expense (6 mo)"),
                  React.createElement("div", { style: { display: "flex", gap: 10, height: 130, alignItems: "flex-end" } }, reportRows.map(r =>
                      React.createElement("div", { key: r.label + r.year, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
                          React.createElement("div", { style: { width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 100 } },
                              React.createElement("div", { title: "Income $" + r.income.toFixed(0), style: { flex: 1, background: "var(--mint)", borderRadius: "4px 4px 0 0", height: ((r.income / reportMax) * 100) + "%", minHeight: r.income > 0 ? 2 : 0 } }),
                              React.createElement("div", { title: "Expense $" + r.expense.toFixed(0), style: { flex: 1, background: "var(--rose)", borderRadius: "4px 4px 0 0", height: ((r.expense / reportMax) * 100) + "%", minHeight: r.expense > 0 ? 2 : 0 } })),
                          React.createElement("span", { style: { fontSize: 10.5, color: "var(--text-dim)" } }, r.label)))),
                  React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 8, fontSize: 11, color: "var(--text-muted)" } },
                      React.createElement("span", null, React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, background: "var(--mint)", borderRadius: 2, marginRight: 4 } }), "Income"),
                      React.createElement("span", null, React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, background: "var(--rose)", borderRadius: 2, marginRight: 4 } }), "Expense"))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 12 } }, "Spending by Category (this month)"),
                  monthCatBreakdown.list.length === 0
                      ? React.createElement("div", { style: { textAlign: "center", padding: 20, color: "var(--text-muted)", fontSize: 12.5 } }, "No expenses yet this month")
                      : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, monthCatBreakdown.list.map((c, i) => {
                          const pct = monthCatBreakdown.sum > 0 ? (c.total / monthCatBreakdown.sum) * 100 : 0;
                          const color = (b.categories.find(cc => cc.name === c.name) || {}).color || "var(--violet)";
                          return React.createElement("div", { key: c.name + i },
                              React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 4 } },
                                  React.createElement("span", { style: { fontSize: 12, fontWeight: 600 } }, c.name),
                                  React.createElement("span", { style: { fontSize: 11.5, color: "var(--text-muted)" } }, "$" + c.total.toFixed(0) + " \u00B7 " + pct.toFixed(0) + "%")),
                              React.createElement("div", { className: "pb", style: { height: 6 } },
                                  React.createElement("div", { className: "pf", style: { width: pct + "%", background: color, height: 6 } })));
                      }))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 12 } }, "Net Worth Trend (12 mo)"),
                  React.createElement("div", { style: { display: "flex", gap: 4, height: 100, alignItems: "flex-end" } }, networthTrend.map(p => {
                      const h = ((p.value - nwMin) / nwRange) * 90 + 6;
                      return React.createElement("div", { key: p.label + p.year, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
                          React.createElement("div", { title: "$" + p.value.toLocaleString(), style: { width: "70%", height: h, background: p.value >= 0 ? "var(--gold)" : "var(--rose)", borderRadius: "4px 4px 0 0" } }),
                          React.createElement("span", { style: { fontSize: 9.5, color: "var(--text-dim)" } }, p.label));
                  }))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 10 } }, "Top Merchants"),
                  topMerchants.length === 0
                      ? React.createElement("div", { style: { textAlign: "center", padding: 16, color: "var(--text-muted)", fontSize: 12.5 } }, "No expenses logged")
                      : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, topMerchants.map((m, i) =>
                          React.createElement("div", { key: m.name + i, className: "flex fac fjb", style: { padding: "8px 10px", background: "var(--surface2)", borderRadius: 10 } },
                              React.createElement("div", null,
                                  React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600 } }, m.name),
                                  React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, m.count + " visits")),
                              React.createElement("span", { style: { fontWeight: 700, color: "var(--rose)" } }, "$" + m.total.toFixed(0)))))),
              React.createElement("div", { className: "card" },
                  React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 10 } }, "Top Income Sources"),
                  topSources.length === 0
                      ? React.createElement("div", { style: { textAlign: "center", padding: 16, color: "var(--text-muted)", fontSize: 12.5 } }, "No income logged")
                      : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, topSources.map((m, i) =>
                          React.createElement("div", { key: m.name + i, className: "flex fac fjb", style: { padding: "8px 10px", background: "var(--surface2)", borderRadius: 10 } },
                              React.createElement("div", null,
                                  React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600 } }, m.name),
                                  React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, m.count + " deposits")),
                              React.createElement("span", { style: { fontWeight: 700, color: "var(--mint)" } }, "$" + m.total.toFixed(0)))))),
          ),

          // ===== Add Transaction Modal =====
          React.createElement(Modal, { open: showAddTx, onClose: () => setShowAddTx(false), title: "Add Transaction" },
              React.createElement("div", { className: "tabs", style: { marginBottom: 14 } },
                  ["expense", "income", "transfer"].map(tp =>
                      React.createElement("div", { key: tp, className: "tab " + (nt.type === tp ? "active" : ""), onClick: () => setNt(t => Object.assign({}, t, { type: tp, emoji: tp === "income" ? "\uD83D\uDCB5" : (tp === "transfer" ? "\uD83D\uDD04" : "\uD83D\uDCB8") })), style: { textTransform: "capitalize" } },
                          tp === "expense" ? "\uD83D\uDCB8 Expense" : tp === "income" ? "\uD83D\uDCB5 Income" : "\uD83D\uDD04 Transfer"))),
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                  nt.type !== "transfer" && React.createElement("div", { style: { display: "flex", gap: 9 } },
                      React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                          React.createElement("input", { className: "inp", value: nt.emoji, onChange: e => setNt(t => Object.assign({}, t, { emoji: e.target.value })), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                      React.createElement(Field, { label: "Description", style: { flex: 1 } },
                          React.createElement("input", { className: "inp", placeholder: nt.type === "income" ? "Paycheck" : "Trader Joe's", value: nt.name, onChange: e => setNt(t => Object.assign({}, t, { name: e.target.value })) }))),
                  nt.type === "transfer" && React.createElement(Field, { label: "Description (optional)" },
                      React.createElement("input", { className: "inp", placeholder: "Move to savings", value: nt.name, onChange: e => setNt(t => Object.assign({}, t, { name: e.target.value })) })),
                  React.createElement("div", { className: "g2" },
                      React.createElement(Field, { label: "Amount ($)" },
                          React.createElement("input", { className: "inp", type: "number", step: "0.01", placeholder: "0.00", value: nt.amount, onChange: e => setNt(t => Object.assign({}, t, { amount: e.target.value })) })),
                      nt.type === "expense" && React.createElement(Field, { label: "Category" },
                          React.createElement("select", { className: "inp", value: nt.category, onChange: e => setNt(t => Object.assign({}, t, { category: e.target.value })) },
                              b.categories.length === 0 && React.createElement("option", { value: "Other" }, "Other"),
                              b.categories.map(c => React.createElement("option", { key: c.id, value: c.name }, c.name))))),
                  React.createElement("div", { className: "g2" },
                      React.createElement(Field, { label: nt.type === "transfer" ? "From account" : "Account" },
                          React.createElement("select", { className: "inp", value: nt.accountId, onChange: e => setNt(t => Object.assign({}, t, { accountId: e.target.value })) },
                              accounts.length === 0 && React.createElement("option", { value: "" }, "\u2014 add an account first \u2014"),
                              accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, (a.emoji || "\uD83C\uDFE6") + " " + a.name)))),
                      nt.type === "transfer" && React.createElement(Field, { label: "To account" },
                          React.createElement("select", { className: "inp", value: nt.toAccountId, onChange: e => setNt(t => Object.assign({}, t, { toAccountId: e.target.value })) },
                              React.createElement("option", { value: "" }, "\u2014"),
                              accounts.filter(a => a.id !== nt.accountId).map(a => React.createElement("option", { key: a.id, value: a.id }, (a.emoji || "\uD83C\uDFE6") + " " + a.name))))),
                  React.createElement(Field, { label: "Note" },
                      React.createElement("input", { className: "inp", placeholder: "Optional note", value: nt.note, onChange: e => setNt(t => Object.assign({}, t, { note: e.target.value })) }))),
              React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                  React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAddTx(false) }, "Cancel"),
                  React.createElement("button", { className: "btn btn-p w100", onClick: addTx }, "Add"))),

          // ===== Add Bill Modal =====
          React.createElement(Modal, { open: showAddBill, onClose: () => setShowAddBill(false), title: "Add Bill \uD83D\uDCC4" },
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                  React.createElement("div", { style: { display: "flex", gap: 9 } },
                      React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                          React.createElement("input", { className: "inp", value: nb.emoji, onChange: e => setNb(x => Object.assign({}, x, { emoji: e.target.value })), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                      React.createElement(Field, { label: "Bill Name", style: { flex: 1 } },
                          React.createElement("input", { className: "inp", placeholder: "Electric", value: nb.name, onChange: e => setNb(x => Object.assign({}, x, { name: e.target.value })) }))),
                  React.createElement("div", { className: "g2" },
                      React.createElement(Field, { label: "Amount ($)" },
                          React.createElement("input", { className: "inp", type: "number", placeholder: "85", value: nb.amount, onChange: e => setNb(x => Object.assign({}, x, { amount: e.target.value })) })),
                      React.createElement(Field, { label: "Due Day" },
                          React.createElement("input", { className: "inp", type: "number", min: "1", max: "31", placeholder: "15", value: nb.dueDay, onChange: e => setNb(x => Object.assign({}, x, { dueDay: e.target.value })) }))),
                  React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                      React.createElement("input", { type: "checkbox", checked: nb.autoPay, onChange: e => setNb(x => Object.assign({}, x, { autoPay: e.target.checked })), style: { accentColor: "var(--violet)", width: 16, height: 16 } }),
                      React.createElement("label", { style: { fontSize: 13 } }, "AutoPay"))),
              React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                  React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAddBill(false) }, "Cancel"),
                  React.createElement("button", { className: "btn btn-p w100", onClick: addBill }, "Add Bill"))),

          // ===== Add/Edit Account Modal =====
          React.createElement(Modal, { open: showAddAcct, onClose: () => { setShowAddAcct(false); setEditingAcct(null); }, title: editingAcct ? "Edit Account" : "Add Account \uD83C\uDFE6" }, (function () {
              const src = editingAcct || na;
              const setSrc = (mut) => editingAcct ? setEditingAcct(s => Object.assign({}, s, mut)) : setNa(s => Object.assign({}, s, mut));
              const sub = accountSubtype(src.subtype || "checking");
              return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                  React.createElement(Field, { label: "Type" },
                      React.createElement("select", { className: "inp", value: src.subtype || "checking", onChange: e => { const s = accountSubtype(e.target.value); setSrc({ subtype: e.target.value, emoji: src.emoji || s.emoji, color: src.color || s.color }); } },
                          ACCOUNT_SUBTYPES.map(s => React.createElement("option", { key: s.key, value: s.key }, s.label + " (" + s.type + ")")))),
                  React.createElement("div", { style: { display: "flex", gap: 9 } },
                      React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                          React.createElement("input", { className: "inp", value: src.emoji || sub.emoji, onChange: e => setSrc({ emoji: e.target.value }), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                      React.createElement(Field, { label: "Name", style: { flex: 1 } },
                          React.createElement("input", { className: "inp", placeholder: sub.label, value: src.name || "", onChange: e => setSrc({ name: e.target.value }) }))),
                  React.createElement(Field, { label: sub.type === "liability" ? "Amount owed (opening)" : "Opening balance ($)" },
                      React.createElement("input", { className: "inp", type: "number", step: "0.01", placeholder: "0.00", value: src.openingBalance, onChange: e => setSrc({ openingBalance: e.target.value }) })),
                  React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, sub.type === "liability" ? "Enter the amount currently owed; we'll track it as a debt." : "Enter the current balance in this account."),
                  React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 8 } },
                      React.createElement("button", { className: "btn btn-g w100", onClick: () => { setShowAddAcct(false); setEditingAcct(null); } }, "Cancel"),
                      React.createElement("button", { className: "btn btn-p w100", onClick: saveAcct }, editingAcct ? "Save" : "Add Account")));
          })()),

          // ===== Reconcile Modal =====
          React.createElement(Modal, { open: !!reconcileAcct, onClose: () => setReconcileAcct(null), title: reconcileAcct ? "Reconcile " + reconcileAcct.name : "Reconcile" }, (function () {
              if (!reconcileAcct) return null;
              const isLiab = reconcileAcct.type === "liability";
              const computed = accountBalanceOnDate(reconcileAcct, txs, reconcile.date);
              const computedShown = isLiab ? Math.abs(computed) : computed;
              const stmtNum = reconcile.statement === "" || isNaN(+reconcile.statement) ? null : +reconcile.statement;
              const target = stmtNum === null ? null : (isLiab ? -Math.abs(stmtNum) : stmtNum);
              const diff = stmtNum === null ? null : +(target - computed).toFixed(2);
              const diffColor = diff === null ? "var(--text-muted)" : (Math.abs(diff) < 0.005 ? "var(--mint)" : (diff > 0 ? "var(--mint)" : "var(--rose)"));
              return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                  React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.45 } },
                      "Enter your real-world ", isLiab ? "amount owed" : "balance", " from a bank or card statement and we'll post an adjustment to match."),
                  React.createElement(Field, { label: "Statement date" },
                      React.createElement("input", { className: "inp", type: "date", value: reconcile.date, onChange: e => setReconcile(r => Object.assign({}, r, { date: e.target.value })) })),
                  React.createElement(Field, { label: isLiab ? "Statement amount owed ($)" : "Statement balance ($)" },
                      React.createElement("input", { className: "inp", type: "number", step: "0.01", placeholder: "0.00", value: reconcile.statement, onChange: e => setReconcile(r => Object.assign({}, r, { statement: e.target.value })) })),
                  React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 6 } },
                      React.createElement("div", { className: "flex fac fjb", style: { fontSize: 12 } },
                          React.createElement("span", { style: { color: "var(--text-muted)" } }, "Our balance on this date"),
                          React.createElement("span", { style: { fontWeight: 700 } }, "$" + computedShown.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))),
                      React.createElement("div", { className: "flex fac fjb", style: { fontSize: 12 } },
                          React.createElement("span", { style: { color: "var(--text-muted)" } }, "Your statement"),
                          React.createElement("span", { style: { fontWeight: 700 } }, stmtNum === null ? "—" : ("$" + stmtNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))),
                      React.createElement("div", { style: { height: 1, background: "var(--border)", margin: "2px 0" } }),
                      React.createElement("div", { className: "flex fac fjb", style: { fontSize: 13 } },
                          React.createElement("span", { style: { color: "var(--text-muted)" } }, "Difference"),
                          React.createElement("span", { style: { fontWeight: 800, color: diffColor } },
                              diff === null ? "—" : ((diff > 0 ? "+" : (diff < 0 ? "-" : "")) + "$" + Math.abs(diff).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))),
                      diff !== null && Math.abs(diff) >= 0.005 && React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } },
                          "An \"Adjustment\" transaction of ", (diff > 0 ? "+" : "-"), "$", Math.abs(diff).toFixed(2), " will be posted on ", reconcile.date, ".")),
                  React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 4 } },
                      React.createElement("button", { className: "btn btn-g w100", onClick: () => setReconcileAcct(null) }, "Cancel"),
                      React.createElement("button", { className: "btn btn-p w100", onClick: postReconcile }, "Post Adjustment")));
          })()),

          // ===== Import CSV Modal =====
          React.createElement(Modal, { open: showImport, onClose: () => setShowImport(false), title: "Import Transactions \uD83D\uDCC1", maxWidth: 620 }, (function () {
              const headers = (importRows[0] || []).map((h, i) => importHasHeader ? (String(h || "").trim() || ("Column " + (i + 1))) : ("Column " + (i + 1)));
              const colOptions = [React.createElement("option", { key: "_none", value: -1 }, "— not mapped —"), ...headers.map((h, i) => React.createElement("option", { key: i, value: i }, h))];
              const dataRowCount = Math.max(0, importRows.length - (importHasHeader ? 1 : 0));
              const okCount = importPreview.filter(p => p.ok).length;
              const dupCount = importPreview.filter(p => p.ok && p.dup).length;
              const errCount = importPreview.filter(p => !p.ok).length;
              const willImport = importPreview.filter(p => p.ok && !importSkip[p.idx] && !(importDupOnly && p.dup)).length;
              return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                  // Stepper
                  React.createElement("div", { style: { display: "flex", gap: 6, fontSize: 11, color: "var(--text-muted)" } },
                      ["1. File", "2. Map columns", "3. Preview"].map((s, i) => React.createElement("span", { key: i, style: { padding: "3px 9px", borderRadius: 999, background: importStep === (i + 1) ? "rgba(225,29,46,0.18)" : "var(--surface2)", color: importStep === (i + 1) ? "var(--violet)" : "var(--text-muted)", fontWeight: 600 } }, s))),

                  // STEP 1 — pick file + account
                  importStep === 1 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                      React.createElement(Field, { label: "Target account" },
                          React.createElement("select", { className: "inp", value: importAcctId, onChange: e => setImportAcctId(e.target.value) },
                              React.createElement("option", { value: "" }, "— pick one —"),
                              accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, (a.emoji || "\uD83C\uDFE6") + " " + a.name)))),
                      React.createElement(Field, { label: "CSV file" },
                          React.createElement("input", { type: "file", accept: ".csv,text/csv", onChange: e => handleImportFile(e.target.files && e.target.files[0]), style: { fontSize: 13, color: "var(--text-muted)" } })),
                      importFileName && React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } },
                          "Loaded ", React.createElement("strong", { style: { color: "var(--text)" } }, importFileName),
                          " \u00B7 ", importRows.length, " rows"),
                      importParseErr && React.createElement("div", { style: { fontSize: 12, color: "var(--rose)" } }, importParseErr),
                      importRows.length > 0 && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12 } },
                          React.createElement("input", { type: "checkbox", checked: importHasHeader, onChange: e => setImportHasHeader(e.target.checked), style: { accentColor: "var(--violet)", width: 15, height: 15 } }),
                          React.createElement("label", { style: { color: "var(--text-muted)" } }, "First row is a header")),
                      importRows.length > 0 && React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 } },
                          "Tip: most bank exports work as-is. Common header names like \"Date\", \"Description\", \"Amount\", \"Debit\", \"Credit\" are auto-detected.")),

                  // STEP 2 — column mapping
                  importStep === 2 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                      React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } }, "Tell us which CSV column holds each piece of info."),
                      React.createElement("div", { className: "g2" },
                          React.createElement(Field, { label: "Date column *" },
                              React.createElement("select", { className: "inp", value: importMap.date, onChange: e => setImportMap(m => Object.assign({}, m, { date: +e.target.value })) }, colOptions)),
                          React.createElement(Field, { label: "Description column" },
                              React.createElement("select", { className: "inp", value: importMap.desc, onChange: e => setImportMap(m => Object.assign({}, m, { desc: +e.target.value })) }, colOptions))),
                      React.createElement(Field, { label: "Amount style" },
                          React.createElement("select", { className: "inp", value: importAmountMode, onChange: e => setImportAmountMode(e.target.value) },
                              React.createElement("option", { value: "signed" }, "Single column \u2014 negative = expense"),
                              React.createElement("option", { value: "flip" }, "Single column \u2014 positive = expense (flip sign)"),
                              React.createElement("option", { value: "split" }, "Two columns \u2014 separate Debit / Credit"))),
                      importAmountMode !== "split"
                          ? React.createElement(Field, { label: "Amount column *" },
                              React.createElement("select", { className: "inp", value: importMap.amount, onChange: e => setImportMap(m => Object.assign({}, m, { amount: +e.target.value })) }, colOptions))
                          : React.createElement("div", { className: "g2" },
                              React.createElement(Field, { label: "Debit (expense)" },
                                  React.createElement("select", { className: "inp", value: importMap.debit, onChange: e => setImportMap(m => Object.assign({}, m, { debit: +e.target.value })) }, colOptions)),
                              React.createElement(Field, { label: "Credit (income)" },
                                  React.createElement("select", { className: "inp", value: importMap.credit, onChange: e => setImportMap(m => Object.assign({}, m, { credit: +e.target.value })) }, colOptions))),
                      React.createElement("div", { className: "g2" },
                          React.createElement(Field, { label: "Category column (optional)" },
                              React.createElement("select", { className: "inp", value: importMap.category, onChange: e => setImportMap(m => Object.assign({}, m, { category: +e.target.value })) }, colOptions)),
                          React.createElement(Field, { label: "Default category" },
                              React.createElement("select", { className: "inp", value: importDefaultCat, onChange: e => setImportDefaultCat(e.target.value) },
                                  React.createElement("option", { value: "Other" }, "Other"),
                                  b.categories.map(c => React.createElement("option", { key: c.id, value: c.name }, c.name))))),
                      // Quick sample preview of first 3 mapped rows
                      importPreview.length > 0 && React.createElement("div", { style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 11, padding: 10, fontSize: 11.5 } },
                          React.createElement("div", { style: { color: "var(--text-muted)", marginBottom: 5, fontWeight: 600 } }, "Sample (first 3 rows)"),
                          importPreview.slice(0, 3).map(p => React.createElement("div", { key: p.idx, style: { display: "flex", justifyContent: "space-between", gap: 8, padding: "3px 0", color: p.ok ? "var(--text)" : "var(--rose)" } },
                              React.createElement("span", { style: { flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, (p.date || "?") + " \u00B7 " + p.name),
                              React.createElement("span", { style: { fontWeight: 700, color: p.ok ? (p.amount > 0 ? "var(--mint)" : "var(--rose)") : "var(--rose)" } }, p.ok ? ((p.amount > 0 ? "+" : "-") + "$" + Math.abs(p.amount).toFixed(2)) : p.error))))),

                  // STEP 3 — preview table
                  importStep === 3 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                      React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12 } },
                          React.createElement("span", { className: "b bm" }, okCount + " ready"),
                          dupCount > 0 && React.createElement("span", { className: "b bg" }, dupCount + " duplicate" + (dupCount === 1 ? "" : "s")),
                          errCount > 0 && React.createElement("span", { className: "b br" }, errCount + " skipped (bad row" + (errCount === 1 ? "" : "s") + ")"),
                          React.createElement("span", { style: { color: "var(--text-muted)", marginLeft: "auto" } }, willImport + " will import")),
                      dupCount > 0 && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12 } },
                          React.createElement("input", { type: "checkbox", checked: importDupOnly, onChange: e => setImportDupOnly(e.target.checked), style: { accentColor: "var(--violet)", width: 15, height: 15 } }),
                          React.createElement("label", { style: { color: "var(--text-muted)" } }, "Skip all duplicates (same date + amount + description)")),
                      React.createElement("div", { style: { maxHeight: 320, overflowY: "auto", border: "1px solid var(--border)", borderRadius: 11 } },
                          importPreview.length === 0 && React.createElement("div", { style: { padding: 16, textAlign: "center", color: "var(--text-muted)", fontSize: 12.5 } }, "No rows to preview."),
                          importPreview.map(p => {
                              const skipped = !p.ok || importSkip[p.idx] || (importDupOnly && p.dup);
                              return React.createElement("div", { key: p.idx, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 11px", borderBottom: "1px solid var(--border)", opacity: skipped ? 0.45 : 1, background: p.dup ? "rgba(251,191,36,0.05)" : "transparent" } },
                                  React.createElement("input", { type: "checkbox", disabled: !p.ok, checked: p.ok && !importSkip[p.idx] && !(importDupOnly && p.dup), onChange: e => setImportSkip(s => Object.assign({}, s, { [p.idx]: !e.target.checked })), style: { accentColor: "var(--violet)", width: 15, height: 15 } }),
                                  React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                      React.createElement("div", { style: { fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, p.name),
                                      React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)", display: "flex", gap: 6, flexWrap: "wrap" } },
                                          React.createElement("span", null, p.date || "?"),
                                          p.ok && React.createElement("span", null, "\u00B7 " + (p.amount > 0 ? "Income" : p.category)),
                                          p.dup && React.createElement("span", { style: { color: "var(--gold)" } }, "\u00B7 Duplicate"),
                                          !p.ok && React.createElement("span", { style: { color: "var(--rose)" } }, "\u00B7 " + p.error))),
                                  React.createElement("span", { style: { fontWeight: 700, fontSize: 13, color: p.ok ? (p.amount > 0 ? "var(--mint)" : "var(--rose)") : "var(--text-dim)", flexShrink: 0 } },
                                      p.ok ? ((p.amount > 0 ? "+" : "-") + "$" + Math.abs(p.amount).toFixed(2)) : "—"));
                          }))),

                  // Footer buttons
                  React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 4 } },
                      importStep > 1 && React.createElement("button", { className: "btn btn-g", onClick: () => setImportStep(s => s - 1) }, "Back"),
                      React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowImport(false) }, "Cancel"),
                      React.createElement("button", { className: "btn btn-p w100", onClick: importCommit, disabled: importStep === 1 && importRows.length === 0 },
                          importStep < 3 ? "Next" : ("Import " + willImport))));
          })()),

          // ===== Add/Edit Category Modal =====
          React.createElement(Modal, { open: showAddCat, onClose: () => { setShowAddCat(false); setEditingCat(null); }, title: editingCat ? "Edit Category" : "Add Category" }, (function () {
              const src = editingCat || nc;
              const setSrc = (mut) => editingCat ? setEditingCat(s => Object.assign({}, s, mut)) : setNc(s => Object.assign({}, s, mut));
              return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                  React.createElement("div", { style: { display: "flex", gap: 9 } },
                      React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                          React.createElement("input", { className: "inp", value: src.emoji || "\uD83D\uDCC1", onChange: e => setSrc({ emoji: e.target.value }), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                      React.createElement(Field, { label: "Name", style: { flex: 1 } },
                          React.createElement("input", { className: "inp", placeholder: "Groceries", value: src.name || "", onChange: e => setSrc({ name: e.target.value }) }))),
                  React.createElement(Field, { label: "Monthly budget ($)" },
                      React.createElement("input", { className: "inp", type: "number", placeholder: "300", value: src.budget, onChange: e => setSrc({ budget: e.target.value }) })),
                  React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                      React.createElement("input", { type: "checkbox", checked: !!src.rollover, onChange: e => setSrc({ rollover: e.target.checked }), style: { accentColor: "var(--violet)", width: 16, height: 16 } }),
                      React.createElement("label", { style: { fontSize: 13 } }, "Rollover unused budget into next month")),
                  React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 8 } },
                      React.createElement("button", { className: "btn btn-g w100", onClick: () => { setShowAddCat(false); setEditingCat(null); } }, "Cancel"),
                      React.createElement("button", { className: "btn btn-p w100", onClick: saveCat }, editingCat ? "Save" : "Add Category")));
          })()),

          // ===== Add/Edit Recurring Rule Modal =====
          React.createElement(Modal, { open: showAddRec, onClose: () => { setShowAddRec(false); setEditingRec(null); }, title: editingRec ? "Edit Recurring Rule" : "Add Recurring Rule \uD83D\uDD01" }, (function () {
              const src = editingRec || nr;
              const setSrc = (mut) => editingRec ? setEditingRec(s => Object.assign({}, s, mut)) : setNr(s => Object.assign({}, s, mut));
              return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                  React.createElement("div", { className: "tabs" },
                      ["expense", "income"].map(k => React.createElement("div", { key: k, className: "tab " + (src.kind === k ? "active" : ""), onClick: () => setSrc({ kind: k, emoji: k === "income" ? "\uD83D\uDCB5" : "\uD83D\uDCB8" }), style: { textTransform: "capitalize" } }, k === "income" ? "\uD83D\uDCB5 Income" : "\uD83D\uDCB8 Expense"))),
                  React.createElement("div", { style: { display: "flex", gap: 9 } },
                      React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                          React.createElement("input", { className: "inp", value: src.emoji || "\uD83D\uDD01", onChange: e => setSrc({ emoji: e.target.value }), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                      React.createElement(Field, { label: "Name", style: { flex: 1 } },
                          React.createElement("input", { className: "inp", placeholder: src.kind === "income" ? "Salary" : "Netflix", value: src.name || "", onChange: e => setSrc({ name: e.target.value }) }))),
                  React.createElement("div", { className: "g2" },
                      React.createElement(Field, { label: "Amount ($)" },
                          React.createElement("input", { className: "inp", type: "number", step: "0.01", placeholder: "0.00", value: src.amount, onChange: e => setSrc({ amount: e.target.value }) })),
                      React.createElement(Field, { label: "Account" },
                          React.createElement("select", { className: "inp", value: src.accountId, onChange: e => setSrc({ accountId: e.target.value }) },
                              accounts.length === 0 && React.createElement("option", { value: "" }, "\u2014 add an account \u2014"),
                              accounts.map(a => React.createElement("option", { key: a.id, value: a.id }, (a.emoji || "\uD83C\uDFE6") + " " + a.name))))),
                  src.kind === "expense" && React.createElement(Field, { label: "Category" },
                      React.createElement("select", { className: "inp", value: src.category, onChange: e => setSrc({ category: e.target.value }) },
                          b.categories.length === 0 && React.createElement("option", { value: "Other" }, "Other"),
                          b.categories.map(c => React.createElement("option", { key: c.id, value: c.name }, c.name)))),
                  React.createElement("div", { className: "g2" },
                      React.createElement(Field, { label: "Cadence" },
                          React.createElement("select", { className: "inp", value: src.cadence, onChange: e => setSrc({ cadence: e.target.value }) },
                              ["daily", "weekly", "monthly", "yearly"].map(c => React.createElement("option", { key: c, value: c }, c)))),
                      React.createElement(Field, { label: "Next run" },
                          React.createElement("input", { className: "inp", type: "date", value: src.nextRunDate, onChange: e => setSrc({ nextRunDate: e.target.value }) }))),
                  React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 8 } },
                      React.createElement("button", { className: "btn btn-g w100", onClick: () => { setShowAddRec(false); setEditingRec(null); } }, "Cancel"),
                      React.createElement("button", { className: "btn btn-p w100", onClick: saveRec }, editingRec ? "Save" : "Add Rule")));
          })())
      ));
  }
function GoalsPage({ data, setData, toast }) {
    const [showAdd, setShowAdd] = useState(false);
    const [ng, setNg] = useState({ name: "", category: "Custom", current: "", target: "", unit: "", deadline: "", emoji: "🎯", color: "var(--violet)", reverse: false });
    const add = () => {
        if (!ng.name.trim() || !ng.target)
            return;
        setData(d => (Object.assign(Object.assign({}, d), { goals: [...d.goals, Object.assign(Object.assign({ id: Date.now() }, ng), { current: +ng.current || 0, target: +ng.target })] })));
        toast("New goal added! 🎯");
        setShowAdd(false);
        setNg({ name: "", category: "Custom", current: "", target: "", unit: "", deadline: "", emoji: "🎯", color: "var(--violet)", reverse: false });
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "flex fac fjb sh" },
            React.createElement("div", null,
                React.createElement("h2", { className: "st" }, "Goals \uD83C\uDFAF"),
                React.createElement("p", { className: "ss2" },
                    data.goals.length,
                    " active goals")),
            React.createElement("button", { className: "btn btn-p", onClick: () => setShowAdd(true) },
                React.createElement(Ic, { n: "plus", size: 15, color: "#fff" }),
                "New Goal")),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, data.goals.map(g => {
            const pct = g.reverse ? Math.min(100, Math.round(((g.target * 2 - g.current) / (g.target)) * 100)) : Math.min(100, Math.round((g.current / g.target) * 100));
            const days = DAYS_LEFT(g.deadline), done = pct >= 100;
            return (React.createElement("div", { key: g.id, className: "card", style: { borderLeft: `3px solid ${g.color}` } },
                React.createElement("div", { className: "flex fac gap3", style: { flexWrap: "wrap" } },
                    React.createElement("span", { style: { fontSize: 28 } }, g.emoji),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { className: "flex fac fjb", style: { flexWrap: "wrap", gap: 6 } },
                            React.createElement("div", { style: { fontWeight: 700, fontSize: 15 } }, g.name),
                            React.createElement("div", { className: "flex fac gap2" },
                                React.createElement("span", { className: "b", style: { background: `${g.color}1a`, color: g.color, fontSize: 10 } }, g.category),
                                done && React.createElement("span", { className: "b bm" }, "Done! \uD83C\uDF89"))),
                        React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", margin: "5px 0 10px" } },
                            "Current: ",
                            React.createElement("strong", { style: { color: "var(--text)" } },
                                g.current,
                                " ",
                                g.unit),
                            " \u2192 Target: ",
                            React.createElement("strong", { style: { color: g.color } },
                                g.target,
                                " ",
                                g.unit)),
                        React.createElement("div", { className: "pb", style: { marginBottom: 6 } },
                            React.createElement("div", { className: "pf", style: { width: `${pct}%`, background: g.color } })),
                        React.createElement("div", { className: "flex fac fjb", style: { fontSize: 11, color: "var(--text-dim)" } },
                            React.createElement("span", null,
                                pct,
                                "% complete"),
                            days !== null && React.createElement("span", null,
                                "\u23F0 ",
                                days,
                                "d left")),
                        React.createElement("div", { className: "flex fac gap2", style: { marginTop: 10 } },
                            React.createElement("input", { className: "inp", type: "number", step: "0.1", placeholder: "Update progress...", style: { maxWidth: 160, fontSize: 12 }, onBlur: e => { if (e.target.value) {
                                    setData(d => (Object.assign(Object.assign({}, d), { goals: d.goals.map(x => x.id === g.id ? Object.assign(Object.assign({}, x), { current: +e.target.value }) : x) })));
                                    e.target.value = "";
                                } }, onKeyDown: e => { if (e.key === "Enter" && e.target.value) {
                                    setData(d => (Object.assign(Object.assign({}, d), { goals: d.goals.map(x => x.id === g.id ? Object.assign(Object.assign({}, x), { current: +e.target.value }) : x) })));
                                    e.target.value = "";
                                } } }),
                            React.createElement("button", { className: "btn btn-g btn-sm", style: { fontSize: 12, color: "var(--text-dim)" }, onClick: () => setData(d => (Object.assign(Object.assign({}, d), { goals: d.goals.filter(x => x.id !== g.id) }))) }, "Remove"))))));
        })),
        React.createElement(Modal, { open: showAdd, onClose: () => setShowAdd(false), title: "New Goal \uD83C\uDFAF" },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 11 } },
                React.createElement("div", { style: { display: "flex", gap: 9 } },
                    React.createElement(Field, { label: "Emoji", style: { width: 58 } },
                        React.createElement("input", { className: "inp", value: ng.emoji, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { emoji: e.target.value }))), style: { textAlign: "center", fontSize: 20, padding: "8px 4px" } })),
                    React.createElement(Field, { label: "Goal Name", style: { flex: 1 } },
                        React.createElement("input", { className: "inp", placeholder: "Run 5K under 25min", value: ng.name, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { name: e.target.value }))) }))),
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: "Category" },
                        React.createElement("select", { className: "inp", value: ng.category, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { category: e.target.value }))) }, ["Weight", "Fitness", "Nutrition", "Budget", "Skincare", "Sleep", "Habits", "Custom"].map(c => React.createElement("option", { key: c }, c)))),
                    React.createElement(Field, { label: "Unit" },
                        React.createElement("input", { className: "inp", placeholder: "lbs, min, $, days...", value: ng.unit, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { unit: e.target.value }))) }))),
                React.createElement("div", { className: "g2" },
                    React.createElement(Field, { label: "Current" },
                        React.createElement("input", { className: "inp", type: "number", placeholder: "0", value: ng.current, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { current: e.target.value }))) })),
                    React.createElement(Field, { label: "Target" },
                        React.createElement("input", { className: "inp", type: "number", placeholder: "100", value: ng.target, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { target: e.target.value }))) }))),
                React.createElement(Field, { label: "Deadline (e.g. Aug 1)" },
                    React.createElement("input", { className: "inp", placeholder: "Aug 1", value: ng.deadline, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { deadline: e.target.value }))) })),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("input", { type: "checkbox", checked: ng.reverse, onChange: e => setNg(g => (Object.assign(Object.assign({}, g), { reverse: e.target.checked }))), style: { accentColor: "var(--violet)", width: 16, height: 16 } }),
                    React.createElement("label", { style: { fontSize: 13 } }, "Lower is better (weight, run time)"))),
            React.createElement("div", { style: { display: "flex", gap: 9, marginTop: 18 } },
                React.createElement("button", { className: "btn btn-g w100", onClick: () => setShowAdd(false) }, "Cancel"),
                React.createElement("button", { className: "btn btn-p w100", onClick: add }, "Add Goal \uD83C\uDFAF")))));
}
function ProgressPage({ data }) {
    const { level, xpInLevel, xpNeeded } = calcLevel(data.user.xp);
    const unlocked = data.achievements.filter(a => a.unlocked).length;
    const avgMood = data.journal.entries.length === 0 ? "0.0" : (data.journal.entries.slice(0, 7).reduce((s, e) => s + (e.moodScore || 5), 0) / Math.min(data.journal.entries.length, 7)).toFixed(1);
    const avgSleep = data.sleep.logs.length === 0 ? "0.0" : (data.sleep.logs.slice(0, 7).reduce((s, l) => s + l.hours, 0) / Math.min(data.sleep.logs.length, 7)).toFixed(1);
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "sh" },
            React.createElement("h2", { className: "st" }, "Progress \uD83D\uDCCA"),
            React.createElement("p", { className: "ss2" }, "Your wellness analytics")),
        React.createElement("div", { className: "card gg sp flex fac gap4", style: { flexWrap: "wrap" } },
            React.createElement("div", { style: { width: 68, height: 68, borderRadius: "50%", background: "var(--grad-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 } }, "\u2B50"),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 21, fontWeight: 800 } },
                    "Level ",
                    level,
                    " Wellness Warrior"),
                React.createElement("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 9 } },
                    data.user.xp.toLocaleString(),
                    " XP \u00B7 ",
                    xpNeeded - xpInLevel,
                    " to Level ",
                    level + 1),
                React.createElement("div", { className: "xb", style: { height: 9 } },
                    React.createElement("div", { className: "xf", style: { width: `${(xpInLevel / xpNeeded) * 100}%` } })))),
        React.createElement("div", { className: "g4 sp" }, [{ icon: "😊", val: avgMood + "/10", label: "Avg Mood", color: "var(--violet)" }, { icon: "😴", val: avgSleep + "h", label: "Avg Sleep", color: "var(--sky)" }, { icon: "🔥", val: (data.habits.length === 0 ? 0 : Math.max(...data.habits.map(h => h.streak))) + "d", label: "Best Streak", color: "var(--gold)" }, { icon: "🏆", val: `${unlocked}/${data.achievements.length}`, label: "Achievements", color: "var(--mint)" }].map((s, i) => (React.createElement("div", { key: i, className: "sc" },
            React.createElement("div", { className: "si", style: { background: `${s.color}18` } }, s.icon),
            React.createElement("div", { className: "sv", style: { color: s.color } }, s.val),
            React.createElement("div", { className: "sl" }, s.label))))),
        React.createElement("div", { className: "g2 sp" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Calories (7d)"),
                React.createElement(BarChart, { data: data.nutrition.weekData, color: "var(--peach)", height: 70, labels: WEEK_LABELS.map(d => d[0]) })),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Workouts (7d)"),
                React.createElement(BarChart, { data: data.fitness.weekData, color: "var(--violet)", height: 70, labels: WEEK_LABELS.map(d => d[0]) })),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Sleep (7d)"),
                React.createElement(BarChart, { data: [...data.sleep.logs].reverse().slice(0, 7).map(l => l.hours), color: "var(--sky)", height: 70, labels: [...data.sleep.logs].reverse().slice(0, 7).map(l => l.date.slice(-2)) })),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Mood (7d)"),
                React.createElement(BarChart, { data: (data.journal.entries.length ? [...data.journal.entries].slice(0, 7).reverse() : []).map(e => e.moodScore || 5), color: "var(--rose)", height: 70, labels: [...data.journal.entries].reverse().slice(0, 7).map(e => e.date.slice(-2)) }))),
        React.createElement("div", { className: "card" },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "\uD83C\uDFC6 Achievements"),
            React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 14 } },
                unlocked,
                "/",
                data.achievements.length,
                " unlocked"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } }, data.achievements.map(a => (React.createElement("div", { key: a.id, className: `ach ${a.unlocked ? "ul" : ""}` },
                React.createElement("div", { className: `ai2 ${a.unlocked ? "" : "lk"}`, style: { background: `${a.color}1a` } }, a.emoji),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, color: a.unlocked ? a.color : "var(--text-dim)" } }, a.name),
                    React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)" } }, a.desc)),
                a.unlocked ? React.createElement("span", { className: "b bg" }, "\u2713 Earned") : React.createElement(Ic, { n: "lock", size: 15, color: "var(--text-dim)" }))))))));
}
function CheckInPage({ data, setData, toast }) {
    const [mood, setMood] = useState(7), [energy, setEnergy] = useState(7), [weight, setWeight] = useState(""), [notes, setNotes] = useState(""), [done, setDone] = useState(false);
    const submit = () => {
        setData(d => { var _a; return (Object.assign(Object.assign({}, d), { checkins: [{ id: Date.now(), date: TODAY(), weight: +weight || ((_a = d.checkins[0]) === null || _a === void 0 ? void 0 : _a.weight) || 0, mood, energy, notes }, ...d.checkins], user: Object.assign(Object.assign({}, d.user), { xp: d.user.xp + 30 }) })); });
        toast("+30 XP · Check-in saved! 🌟", "xp");
        setDone(true);
    };
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "sh" },
            React.createElement("h2", { className: "st" }, "Check-In \uD83D\uDCCB"),
            React.createElement("p", { className: "ss2" }, "Weekly wellness snapshot")),
        !done ? (React.createElement("div", { className: "card gr", style: { maxWidth: 480 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 17, marginBottom: 18 } }, "How are you feeling? \uD83C\uDF38"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
                React.createElement(Field, { label: `Mood: ${mood}/10 ${mood >= 8 ? "😄" : mood >= 6 ? "🙂" : "😔"}` },
                    React.createElement("input", { type: "range", min: 1, max: 10, value: mood, onChange: e => setMood(+e.target.value), style: { width: "100%", accentColor: "var(--rose)" } })),
                React.createElement(Field, { label: `Energy: ${energy}/10 ${energy >= 8 ? "⚡" : energy >= 6 ? "💫" : "😴"}` },
                    React.createElement("input", { type: "range", min: 1, max: 10, value: energy, onChange: e => setEnergy(+e.target.value), style: { width: "100%", accentColor: "var(--violet)" } })),
                React.createElement(Field, { label: "Weight (optional)" },
                    React.createElement("input", { className: "inp", type: "number", step: "0.1", placeholder: "134.9", value: weight, onChange: e => setWeight(e.target.value) })),
                React.createElement(Field, { label: "Notes" },
                    React.createElement("textarea", { className: "inp", rows: 3, placeholder: "How was your week?", value: notes, onChange: e => setNotes(e.target.value) })),
                React.createElement("button", { className: "btn btn-p w100", onClick: submit }, "Save Check-In \u2728")))) : (React.createElement("div", { className: "card gm", style: { maxWidth: 480, textAlign: "center", padding: 40 } },
            React.createElement("div", { style: { fontSize: 48, marginBottom: 14 } }, "\uD83C\uDF89"),
            React.createElement("div", { style: { fontSize: 21, fontWeight: 800, marginBottom: 7 } }, "Check-in saved!"),
            React.createElement("div", { style: { color: "var(--text-muted)", fontSize: 13 } }, "+30 XP earned. Keep it up!"),
            React.createElement("button", { className: "btn btn-s", style: { marginTop: 18 }, onClick: () => setDone(false) }, "Log another"))),
        React.createElement("div", { className: "card", style: { marginTop: 18 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 13 } }, "Past Check-ins"),
            data.checkins.map((c, i) => (React.createElement("div", { key: i, style: { padding: "13px 15px", background: "var(--surface2)", borderRadius: 14, border: "1px solid var(--border)", marginBottom: 9 } },
                React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 7 } },
                    React.createElement("span", { style: { fontWeight: 700 } }, c.date),
                    React.createElement("div", { className: "flex fac gap2" },
                        React.createElement("span", { className: "b br" },
                            "\uD83D\uDE0A ",
                            c.mood,
                            "/10"),
                        React.createElement("span", { className: "b bv" },
                            "\u26A1 ",
                            c.energy,
                            "/10"),
                        c.weight && React.createElement("span", { className: "b bm" },
                            "\u2696\uFE0F ",
                            c.weight,
                            " lbs"))),
                c.notes && React.createElement("p", { style: { fontSize: 12.5, color: "var(--text-muted)" } }, c.notes)))))));
}
function AICoachPage({ data, setData, toast }) {
    var _a;
    const [input, setInput] = useState(""), [loading, setLoading] = useState(false);
    const endRef = useRef(null), inputRef = useRef(null);
    useEffect(() => { var _a; return (_a = endRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); }, [data.messages]);
    const avgSleep = data.sleep.logs.length === 0 ? "0.0" : (data.sleep.logs.slice(0, 7).reduce((s, l) => s + l.hours, 0) / Math.min(data.sleep.logs.length, 7)).toFixed(1);
    const cycle = getCyclePhase(data.cycle.lastPeriodStart, data.cycle.cycleLength);
    const recentMoods = data.journal.entries.slice(0, 5).map(e => `${e.date}: ${e.moodScore}/10`).join(", ");
    const computedCats = data.budget.categories.map(c => (Object.assign(Object.assign({}, c), { spent: +catSpent(data.budget.transactions, c.name).toFixed(2) })));
    const overBudget = computedCats.filter(c => c.spent > c.budget).map(c => c.name).join(", ") || "none";
    const goalModeLabel = data.user.goalMode === "cut" ? "cutting (300 cal deficit)" : data.user.goalMode === "bulk" ? "bulking (300 cal surplus)" : "maintaining";
    const focusAreas = (data.user.primaryGoals || []).join(", ") || "general wellness";
    const system = `You are Luna, a warm empowering AI wellness coach in LifeSync for ${data.user.displayName || data.user.name || "the user"}.
PROFILE: Age ${data.user.age || "?"}, ${data.user.activityLevel || "moderate"} activity, currently ${goalModeLabel}. Focus areas: ${focusAreas}.
DATA: Level ${calcLevel(data.user.xp).level}, ${data.user.xp} XP. Streaks: habits ${data.streaks.habits}d, workouts ${data.streaks.workouts}d, journaling ${data.streaks.logging}d. Today: ${data.habits.filter(h => h.doneToday).length}/${data.habits.length} habits. Calories: ${data.nutrition.calories.current}/${data.settings.calorieGoal}. Protein: ${data.nutrition.protein.current}/${data.settings.proteinGoal}g. Water: ${data.nutrition.water.current}/${data.settings.waterGoal} cups. Avg sleep: ${avgSleep}h (goal ${data.sleep.goalHours}h). ${((_a = data.settings) === null || _a === void 0 ? void 0 : _a.gender) === "male" ? "" : (`Cycle phase: ${cycle.phase} day ${cycle.day}. `)}Recent moods: ${recentMoods}. Over budget: ${overBudget}.
Be warm, brief (2-4 sentences), 1-2 emojis, specific and data-driven. Reference their actual numbers and goal mode.`;
    const send = async () => {
        var _a, _b, _c;
        if (!input.trim() || loading)
            return;
        const msg = input.trim();
        setInput("");
        setData(d => (Object.assign(Object.assign({}, d), { messages: [...d.messages, { role: "user", content: msg }] })));
        setLoading(true);
        try {
            // NVIDIA NIM API — OpenAI-compatible, free tier
            const NVIDIA_KEY = "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";
            const apiMessages = [
                { role: "system", content: system },
                ...data.messages.slice(-10).map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.content })),
                { role: "user", content: msg }
            ];
            const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + NVIDIA_KEY,
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    model: "meta/llama-3.3-70b-instruct",
                    messages: apiMessages,
                    temperature: 0.7,
                    top_p: 0.95,
                    max_tokens: 1000,
                    stream: false
                })
            });
            if (!res.ok) {
                const errText = await res.text().catch(() => "");
                throw new Error("API error " + res.status + ": " + errText.slice(0, 150));
            }
            const d = await res.json();
            const text = ((_c = (_b = (_a = d.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "I'm here to help! Ask me anything about your wellness journey ✨";
            setData(d => (Object.assign(Object.assign({}, d), { messages: [...d.messages, { role: "ai", content: text }] })));
        }
        catch (err) {
            const fallback = (() => {
                const lower = msg.toLowerCase();
                if(lower.includes("protein")) return `You're currently targeting ${data.settings.proteinGoal}g of protein. Split it across 4-5 meals and prioritize lean protein sources. ✨`;
                if(lower.includes("sleep")) return `Your recent average sleep is ${avgSleep}h. Try reducing screen exposure 30-60 minutes before bed and keep a consistent sleep schedule. 😴`;
                if(lower.includes("workout")) return `You've been consistent lately. Focus on progressive overload, recovery, and hitting your weekly workout target of ${data.settings.workoutGoalPerWeek} sessions. 💪`;
                return `I'm running in offline mode right now, but I can still help with habits, workouts, nutrition, sleep, budgeting, and routines based on your saved data. ✨`;
            })();
            setData(d => (Object.assign(Object.assign({}, d), { messages: [...d.messages, { role: "ai", content: fallback }] })));
        }
        setLoading(false);
    };
    const suggestions = ["What should I focus on today?", "Analyze my week", "Help me hit my protein goal", "Plan a workout", "How's my budget?", "Tips for my cycle phase?"];
    return (React.createElement("div", { className: "pe", style: { display: "flex", flexDirection: "column", height: "calc(100vh - 110px)" } },
        React.createElement("div", { className: "sh" },
            React.createElement("h2", { className: "st" }, "AI Coach \u2728"),
            React.createElement("p", { className: "ss2" }, "Luna knows your full health data \u00B7 Private wellness AI")),
        React.createElement("div", { className: "card", style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" } },
            React.createElement("div", { style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 13, padding: "4px 0", marginBottom: 4 } },
                data.messages.map((m, i) => (React.createElement("div", { key: i, style: { display: "flex", gap: 9, alignItems: "flex-end", flexDirection: m.role === "user" ? "row-reverse" : "row" } },
                    m.role === "ai" && React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: "var(--grad-violet)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 } }, "\u2728"),
                    React.createElement("div", { className: `cb ${m.role === "ai" ? "ai" : "user"}` }, m.content)))),
                loading && React.createElement("div", { style: { display: "flex", gap: 9, alignItems: "flex-end" } },
                    React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: "var(--grad-violet)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 } }, "\u2728"),
                    React.createElement("div", { className: "cb ai loading", style: { width: 70, height: 34 } },
                        React.createElement("span", { style: { letterSpacing: 4 } }, "\u00B7\u00B7\u00B7"))),
                React.createElement("div", { ref: endRef })),
            data.messages.length < 3 && React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 11 } }, suggestions.map(s => React.createElement("button", { key: s, className: "btn btn-s btn-sm", style: { fontSize: 11 }, onClick: () => { var _a; setInput(s); (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); } }, s))),
            React.createElement("div", { style: { display: "flex", gap: 9 } },
                React.createElement("input", { ref: inputRef, className: "inp", placeholder: "Ask Luna anything about your health, goals, or life\u2026", value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key === "Enter" && send() }),
                React.createElement("button", { className: "btn btn-p btn-ic", onClick: send, disabled: loading || !input.trim() },
                    React.createElement(Ic, { n: "send", size: 15, color: "#fff" }))))));
}
function ThemeCard({ theme, setTheme, toast }) {
    return React.createElement("div", { className: "card" },
        React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "🎨 Appearance"),
        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12 } }, "Pick a color scheme. Light mode is available too."),
        React.createElement("div", { className: "g2", style: { gap: 8 } },
            Object.entries(THEMES).map(([id, t]) => React.createElement("button", {
                key: id, className: "btn",
                onClick: () => { setTheme(id); updateActiveProfile({ theme: id }); toast(`Theme: ${t.label}`, "success"); },
                style: {
                    padding: "12px 10px", display: "flex", alignItems: "center", gap: 10,
                    border: theme === id ? "2px solid var(--violet)" : "1px solid var(--border)",
                    background: theme === id ? "rgba(225,29,46,0.12)" : "var(--surface2)",
                    justifyContent: "flex-start"
                }
            },
                React.createElement("div", { style: { width: 28, height: 28, borderRadius: 8, background: t.vars["--grad-rose"], display: "grid", placeItems: "center", fontSize: 14, flexShrink: 0 } }, t.emoji),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" } },
                    React.createElement("span", { style: { fontSize: 12.5, fontWeight: 600 } }, t.label),
                    React.createElement("div", { style: { display: "flex", gap: 3 } },
                        ["--bg", "--surface", "--violet", "--rose", "--mint", "--gold"].map(k => React.createElement("span", { key: k, style: { width: 9, height: 9, borderRadius: "50%", background: t.vars[k], border: "1px solid rgba(255,255,255,0.12)" } }))))))));
}
function LegacyImportCard({ setData, toast }) {
    const auth = getAuthState();
    const [legacy, setLegacy] = useState([]);
    useEffect(() => {
        const out = [];
        const authId = auth && auth.userId;
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (!k || !k.startsWith("lifesync-v7-") || k.endsWith("-cloud-state")) continue;
                const id = k.slice("lifesync-v7-".length);
                if (!id || id === authId) continue;
                try {
                    const d = JSON.parse(localStorage.getItem(k) || "null");
                    if (!d || !hasMeaningfulContent(d)) continue;
                    out.push({
                        key: k, id, data: d,
                        stats: {
                            habits: (d.habits || []).length,
                            workouts: ((d.fitness || {}).workouts || []).length,
                            meals: ((d.nutrition || {}).logs || []).length,
                            journal: (((d.journal || {}).entries) || []).length,
                            goals: (d.goals || []).length,
                        },
                    });
                } catch (_) { }
            }
        } catch (_) { }
        setLegacy(out);
    }, [auth && auth.userId]);
    if (!auth || legacy.length === 0) return null;

    const download = (entry) => {
        try {
            const blob = new Blob([JSON.stringify(entry.data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `lifesync-legacy-${entry.id}.json`;
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (e) { toast && toast("Download failed", "error"); }
    };
    const importInto = (entry) => {
        if (!window.confirm("Import this data into your account?\n\nThis REPLACES your current dashboard with the imported data. Your old data on this device stays put so you can re-export later.")) return;
        try {
            setData(entry.data);
            toast && toast("Imported — encrypting + syncing now ✨", "success");
        } catch (e) { toast && toast("Import failed: " + (e.message || e), "error"); }
    };
    const discard = (entry) => {
        if (!window.confirm("Delete this local backup from this device? This can't be undone.")) return;
        try { localStorage.removeItem(entry.key); setLegacy(l => l.filter(x => x.key !== entry.key)); }
        catch (_) { }
    };

    return React.createElement("div", { className: "card" },
        React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "📦 Legacy data on this device"),
        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.5 } },
            "Data from before you created your account is still saved on this device. Download it as a backup or import it directly into your account."),
        legacy.map(e => React.createElement("div", { key: e.key, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 10, marginBottom: 8, background: "var(--surface2)" } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 600, marginBottom: 4, wordBreak: "break-all" } }, "profile id: ", e.id),
            React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 10 } },
                `${e.stats.habits} habits · ${e.stats.workouts} workouts · ${e.stats.meals} meals · ${e.stats.journal} journal · ${e.stats.goals} goals`),
            React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
                React.createElement("button", { className: "btn btn-s", onClick: () => download(e), style: { fontSize: 11 } }, "⬇ Download JSON"),
                React.createElement("button", { className: "btn btn-p btn-s", onClick: () => importInto(e), style: { fontSize: 11 } }, "Import into account"),
                React.createElement("button", { className: "btn btn-s", onClick: () => discard(e), style: { fontSize: 11, color: "var(--text-muted)" } }, "Discard")))));
}

function AccountCard({ toast }) {
    const auth = getAuthState();
    const email = (auth && auth.email) || "";
    const displayName = email ? _displayLogin(email) : "—";
    const isSynthetic = _isSyntheticLogin(email);
    const offline = !!(auth && auth.offline);
    const [accounts, setAccounts] = useState(() => _listVerifiers());
    const [switching, setSwitching] = useState(null); // email being switched to
    const [pw, setPw] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const refreshAccounts = () => setAccounts(_listVerifiers());

    const onSignOut = () => {
        if (!window.confirm("Sign out?\n\nThis device's local copy of your data will be wiped. You can sign back in anytime to restore from the cloud.")) return;
        try { authSignOut(); }
        catch (e) { console.error(e); }
    };
    const startSwitch = (em) => { setSwitching(em); setPw(""); setErr(""); };
    const cancelSwitch = () => { setSwitching(null); setPw(""); setErr(""); };
    const doSwitch = async () => {
        if (!switching || !pw) { setErr("Enter the password for " + switching); return; }
        setBusy(true); setErr("");
        try {
            // Sign out current (flushes their data) — preserves other verifiers
            authSignOut();
            // Then sign in to the target. Try online first; fall back to offline.
            const isOnline = typeof navigator === "undefined" ? true : navigator.onLine !== false;
            try {
                if (isOnline) await authSignInOnline(switching, pw);
                else await authSignInOffline(switching, pw);
            } catch (e) {
                if (_loadVerifier(switching) && /failed|network|fetch|load/i.test(String(e.message || e))) {
                    await authSignInOffline(switching, pw);
                } else { throw e; }
            }
            toast && toast("Switched to " + _displayLogin(switching), "success");
        } catch (e) {
            setErr(String(e.message || e));
        }
        setBusy(false);
    };
    const removeAccount = (em) => {
        if (em === (auth && auth.email)) { toast && toast("Sign out first to remove the active account", "error"); return; }
        if (!window.confirm("Remove offline access for " + _displayLogin(em) + " on this device?\n\nThe account itself stays intact — you can sign back in anytime with internet.")) return;
        try { localStorage.removeItem(AUTH_VERIFIER_PREFIX + em); refreshAccounts(); }
        catch (_) { }
    };
    const addAnother = () => {
        if (!window.confirm("Sign out and add another account?\n\nYour current account's data is flushed to the cloud before sign-out. You can switch back anytime.")) return;
        try { authSignOut(); }
        catch (e) { console.error(e); }
    };

    const others = accounts.filter(a => a.email !== (auth && auth.email));

    return React.createElement("div", { className: "card" },
        React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "🔐 Account"),
        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.5 } }, "End-to-end encrypted. Your data is unreadable without your password — including by us."),
        React.createElement("div", { style: { fontSize: 12, marginBottom: 4 } },
            React.createElement("span", { style: { color: "var(--text-muted)" } }, "Signed in as "),
            React.createElement("span", { style: { fontWeight: 600 } }, displayName)),
        offline && React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 8 } }, "Currently offline — changes sync once you reconnect."),
        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" } },
            React.createElement("button", { className: "btn btn-danger btn-s", onClick: onSignOut, style: { fontSize: 11.5 } }, "Sign out")),

        // — Other accounts on this device —
        React.createElement("div", { style: { borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 14 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 600, marginBottom: 8 } }, "Other accounts on this device"),
            others.length === 0
                ? React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 10 } }, "No other accounts saved here yet.")
                : others.map(a => React.createElement("div", { key: a.email, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 10, marginBottom: 8, background: "var(--surface2)" } },
                    React.createElement("div", { style: { fontSize: 12, fontWeight: 600, marginBottom: 6, wordBreak: "break-all" } }, _displayLogin(a.email)),
                    switching === a.email
                        ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
                            React.createElement("input", { className: "inp", type: "password", placeholder: "Password for " + _displayLogin(a.email), value: pw, onChange: e => setPw(e.target.value), autoFocus: true, onKeyDown: e => { if (e.key === "Enter") doSwitch(); } }),
                            err && React.createElement("div", { style: { fontSize: 11, color: "var(--rose)" } }, err),
                            React.createElement("div", { style: { display: "flex", gap: 6 } },
                                React.createElement("button", { className: "btn btn-p btn-s", onClick: doSwitch, disabled: busy, style: { fontSize: 11 } }, busy ? "Switching…" : "Sign in"),
                                React.createElement("button", { className: "btn btn-s", onClick: cancelSwitch, disabled: busy, style: { fontSize: 11 } }, "Cancel")))
                        : React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
                            React.createElement("button", { className: "btn btn-s", onClick: () => startSwitch(a.email), style: { fontSize: 11 } }, "Switch to this account"),
                            React.createElement("button", { className: "btn btn-s", onClick: () => removeAccount(a.email), style: { fontSize: 11, color: "var(--text-muted)" } }, "Remove from device")))),
            React.createElement("button", { className: "btn btn-s w100", onClick: addAnother, style: { fontSize: 12, marginTop: 4 } }, "+ Add another account")));
}

function ProfilesCard({ toast }) {
    const [state, setState] = useState(() => loadProfiles());
    const [editing, setEditing] = useState(null);
    const [tmpName, setTmpName] = useState("");
    const [tmpAvatar, setTmpAvatar] = useState("");
    const refresh = () => setState(loadProfiles());
    const onSwitch = (id) => {
        if (id === state.activeId) return;
        if (!window.confirm("Switch profile? The app will reload to load that profile's data.")) return;
        switchProfile(id);
        window.location.reload();
    };
    const onAdd = () => {
        const name = window.prompt("Profile name?", "Friend");
        if (!name) return;
        if (!window.confirm(`Create profile "${name}" and switch to it? The app will reload.`)) return;
        addProfile(name.trim(), "✨", "red");
        window.location.reload();
    };
    const onDelete = (id) => {
        const p = state.profiles.find(x => x.id === id);
        if (!p) return;
        if (state.profiles.length <= 1) { toast("Need at least one profile", "error"); return; }
        if (!window.confirm(`Delete profile "${p.name}" and all its data (local + cloud)? This cannot be undone.`)) return;
        const wasActive = id === state.activeId;
        deleteProfile(id);
        if (wasActive) window.location.reload(); else refresh();
    };
    const saveEdit = (id) => {
        const p = loadProfiles();
        const i = p.profiles.findIndex(x => x.id === id);
        if (i >= 0) {
            if (tmpName.trim()) p.profiles[i].name = tmpName.trim();
            if (tmpAvatar.trim()) p.profiles[i].avatar = tmpAvatar.trim();
            saveProfiles(p);
        }
        setEditing(null);
        refresh();
        toast("Profile updated", "success");
    };
    return React.createElement("div", { className: "card" },
        React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 4 } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "👥 Profiles"),
            React.createElement("button", { className: "btn btn-s btn-sm", onClick: onAdd, style: { fontSize: 11 } }, "+ Add")),
        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12 } }, "Switch between users. Each profile has its own data, theme, and cloud sync."),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
            state.profiles.map(p => {
                const active = p.id === state.activeId;
                if (editing === p.id) {
                    return React.createElement("div", { key: p.id, style: { padding: 10, border: "1px solid var(--border)", borderRadius: 10, background: "var(--surface2)", display: "flex", flexDirection: "column", gap: 8 } },
                        React.createElement("div", { className: "flex fac", style: { gap: 8 } },
                            React.createElement("input", { className: "inp", style: { width: 56, textAlign: "center", fontSize: 18 }, value: tmpAvatar, onChange: e => setTmpAvatar(e.target.value), maxLength: 2 }),
                            React.createElement("input", { className: "inp", style: { flex: 1 }, value: tmpName, onChange: e => setTmpName(e.target.value), placeholder: "Name" })),
                        React.createElement("div", { className: "flex", style: { gap: 6 } },
                            React.createElement("button", { className: "btn btn-p btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => saveEdit(p.id) }, "Save"),
                            React.createElement("button", { className: "btn btn-s btn-sm", style: { flex: 1, fontSize: 11 }, onClick: () => setEditing(null) }, "Cancel")));
                }
                return React.createElement("div", { key: p.id, style: { padding: "10px 12px", border: active ? "2px solid var(--violet)" : "1px solid var(--border)", borderRadius: 10, background: active ? "rgba(225,29,46,0.10)" : "var(--surface2)", display: "flex", alignItems: "center", gap: 10 } },
                    React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "var(--grad-rose)", display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0 } }, p.avatar || "✨"),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { fontSize: 13, fontWeight: 600 } }, p.name, active && React.createElement("span", { className: "b bm", style: { fontSize: 9, marginLeft: 6 } }, "ACTIVE")),
                        React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-muted)" } }, "Theme: " + ((THEMES[p.theme] || THEMES.red).label))),
                    !active && React.createElement("button", { className: "btn btn-s btn-sm", style: { fontSize: 10.5, padding: "5px 9px" }, onClick: () => onSwitch(p.id) }, "Switch"),
                    React.createElement("button", { className: "btn btn-s btn-sm", style: { fontSize: 10.5, padding: "5px 9px" }, onClick: () => { setEditing(p.id); setTmpName(p.name); setTmpAvatar(p.avatar || "✨"); } }, "Edit"),
                    state.profiles.length > 1 && React.createElement("button", { className: "btn btn-danger btn-sm", style: { fontSize: 10.5, padding: "5px 9px" }, onClick: () => onDelete(p.id) }, "✕"));
            })));
}
function SettingsPage({ data, setData, toast, installed = false, installPrompt = null, install = () => { }, notifStatus = 'default', requestNotifs = () => { }, theme = 'red', setTheme = () => { } }) {
    const [s, setS] = useState(Object.assign({}, data.settings));
    const [name, setName] = useState(data.user.name);
    const save = () => { setData(d => (Object.assign(Object.assign({}, d), { settings: s, user: Object.assign(Object.assign({}, d.user), { name }) }))); toast("Settings saved! ✨"); };
    const exportData = () => {
        const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `lifesync-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        toast("Full backup exported! 💾");
    };
    const importData = e => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = ev => { try {
            setData(JSON.parse(ev.target.result));
            toast("Backup restored! ✨");
        }
        catch (_a) {
            toast("Invalid file", "error");
        } };
        reader.readAsText(file);
    };
    const otherIntegrations = [
        { name: "Plaid (Banking)", emoji: "🏦", status: "Requires signup", howto: "Sign up at plaid.com/docs → Free dev tier → Connects Chase, BofA, most US banks. Auto-imports all transactions with categories." },
        { name: "Workday (Payroll)", emoji: "💼", status: "Needs IT access", howto: "Ask HR/IT: 'I need read access to my employee data via Workday REST API — payroll and time-off endpoints.' They provide OAuth credentials." },
        { name: "Google Fit", emoji: "📱", status: "API available (free)", howto: "Enable Google Fit API at console.cloud.google.com → OAuth flow → Pulls steps, sleep, workouts on Android devices." },
        { name: "Open Food Facts", emoji: "🥗", status: "✅ Already connected!", howto: "Free, no key needed. Already powering your Nutrition food search — 3M+ products worldwide." },
    ];
    return (React.createElement("div", { className: "pe" },
        React.createElement("div", { className: "sh" },
            React.createElement("h2", { className: "st" }, "Settings \u2699\uFE0F"),
            React.createElement("p", { className: "ss2" }, "Personalize LifeSync")),
        React.createElement("div", { className: "card gm", style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" } },
            React.createElement("div", { style: { width: 38, height: 38, borderRadius: 12, background: "rgba(127,255,212,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 } }, "\u2601\uFE0F"),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13 } }, "Supabase Cloud Storage"),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 } }, "Auto-saves every 3 seconds \u00B7 Syncs across devices")),
            React.createElement("span", { className: "b bm", style: { fontSize: 10 } }, "\u25CF Connected")),
        React.createElement("div", { className: "card", style: { borderColor: installed ? "rgba(127,255,212,0.3)" : "var(--border)" } },
            React.createElement("div", { className: "flex fac fjb", style: { marginBottom: installed || notifStatus === "granted" ? 12 : 0 } },
                React.createElement("div", { className: "flex fac gap2" },
                    React.createElement("span", { style: { fontSize: 20 } }, "\uD83D\uDCF1"),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, "Install as App"),
                        React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2 } }, installed ? "Installed on this device" : "Add to home screen"))),
                installed ? React.createElement("span", { className: "b bm", style: { fontSize: 10 } }, "\u2713 Installed") :
                    installPrompt ? React.createElement("button", { className: "btn btn-p btn-sm", onClick: install }, "Install") :
                        React.createElement("span", { className: "b bi", style: { fontSize: 10 } }, "Open in browser to install")),
            installed && (React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)" } }, "LifeSync is installed on this device. Opens like a native app, works offline. \u2728")),
            React.createElement("div", { style: { height: 1, background: "var(--border)", margin: "12px 0" } }),
            React.createElement("div", { className: "flex fac fjb" },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, "\uD83D\uDD14 Notifications"),
                    React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2 } }, notifStatus === "granted" ? "Habit reminders · Water alerts · Bill warnings" :
                        notifStatus === "denied" ? "Blocked in browser settings" :
                            notifStatus === "unsupported" ? "Not supported on this device" :
                                "Get reminders for habits, water & bills")),
                notifStatus === "default" && React.createElement("button", { className: "btn btn-s btn-sm", onClick: requestNotifs }, "Enable"),
                notifStatus === "granted" && React.createElement("span", { className: "b bm", style: { fontSize: 10 } }, "\u2713 On"),
                notifStatus === "denied" && React.createElement("span", { className: "b br", style: { fontSize: 10 } }, "Blocked"))),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            getAuthState()
                ? React.createElement(AccountCard, { toast: toast })
                : React.createElement(ProfilesCard, { toast: toast }),
            getAuthState() && React.createElement(LegacyImportCard, { setData: setData, toast: toast }),
            React.createElement(ThemeCard, { theme: theme, setTheme: setTheme, toast: toast }),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Profile Setup"),React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 12 } }, "Tell Luna who you are and what your goals are so the AI can personalize your experience."),
                React.createElement(Field, { label: "Your Name" },
                    React.createElement("input", { className: "inp", value: name, onChange: e => setName(e.target.value) }))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 6 } }, "Goal Mode"),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12 } }, "Switching recalculates your calorie + macro targets."),
                React.createElement("div", { className: "g3", style: { gap: 8 } }, [
                    { id: "cut", label: "Cutting", sub: "−300 cal/day", icon: "📉" },
                    { id: "maintain", label: "Maintain", sub: "TDEE", icon: "⚖️" },
                    { id: "bulk", label: "Bulking", sub: "+300 cal/day", icon: "📈" },
                ].map(o => React.createElement("button", { key: o.id, className: "btn", style: { padding: "10px 8px", flexDirection: "column", gap: 2, border: (data.user.goalMode || "maintain") === o.id ? "2px solid var(--violet)" : "1px solid var(--border)", background: (data.user.goalMode || "maintain") === o.id ? "rgba(225,29,46,0.12)" : "var(--surface2)" }, onClick: () => {
                    const newProfile = Object.assign({}, data.user, { goalMode: o.id });
                    const t = computeTargets(newProfile);
                    setData(d => Object.assign({}, d, { user: Object.assign({}, d.user, { goalMode: o.id }), settings: Object.assign({}, d.settings, { calorieGoal: t.calorieGoal, proteinGoal: t.proteinGoal, carbsGoal: t.carbsGoal, fatGoal: t.fatGoal }) }));
                    setS(x => Object.assign({}, x, { calorieGoal: t.calorieGoal, proteinGoal: t.proteinGoal, carbsGoal: t.carbsGoal, fatGoal: t.fatGoal }));
                    toast(`Targets updated · ${t.calorieGoal} kcal`, "success");
                } },
                    React.createElement("span", { style: { fontSize: 18 } }, o.icon),
                    React.createElement("span", { style: { fontSize: 12, fontWeight: 600 } }, o.label),
                    React.createElement("span", { style: { fontSize: 10, color: "var(--text-muted)" } }, o.sub))))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Daily Goals"),
                React.createElement("div", { className: "g2", style: { gap: 12 } }, [["calorieGoal", "Calorie Goal", "kcal"], ["proteinGoal", "Protein Goal", "g"], ["carbsGoal", "Carbs Goal", "g"], ["fatGoal", "Fat Goal", "g"], ["waterGoal", "Water Goal", "cups"], ["workoutGoalPerWeek", "Workouts / Week", "sessions"], ["savingsGoal", "Monthly Savings", "$"]].map(([k, label, unit]) => (React.createElement(Field, { key: k, label: `${label} (${unit})` },
                    React.createElement("input", { className: "inp", type: "number", value: s[k], onChange: e => setS(x => (Object.assign(Object.assign({}, x), { [k]: +e.target.value }))) })))))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Preferences"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                    React.createElement("div", { className: "flex fac fjb" },
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 13 } }, "Mode"),
                            React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2 } }, s.gender === "male" ? "Hides cycle tracking" : "Shows cycle tracking")),
                        React.createElement("select", { className: "inp", style: { width: 130 }, value: s.gender || "female", onChange: e => setS(x => (Object.assign(Object.assign({}, x), { gender: e.target.value }))) },
                            React.createElement("option", { value: "female" }, "Female"),
                            React.createElement("option", { value: "male" }, "Male"))),
                    React.createElement("div", { className: "flex fac fjb" },
                        React.createElement("span", { style: { fontSize: 13 } }, "Weight Unit"),
                        React.createElement("select", { className: "inp", style: { width: 100 }, value: s.weightUnit, onChange: e => setS(x => (Object.assign(Object.assign({}, x), { weightUnit: e.target.value }))) },
                            React.createElement("option", null, "lbs"),
                            React.createElement("option", null, "kg"))),
                    React.createElement("div", { className: "flex fac fjb" },
                        React.createElement("span", { style: { fontSize: 13 } }, "Currency"),
                        React.createElement("select", { className: "inp", style: { width: 100 }, value: s.currency, onChange: e => setS(x => (Object.assign(Object.assign({}, x), { currency: e.target.value }))) }, ["USD", "EUR", "GBP", "CAD", "AUD", "JPY"].map(c => React.createElement("option", { key: c }, c)))))),
            React.createElement("button", { className: "btn btn-p w100", onClick: save, style: { padding: "12px" } }, "Save Settings \u2728"),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 6 } }, "App Version \uD83D\uDD04"),
                React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginBottom: 12 } }, "Force-pull the newest version of LifeSync. Clears the offline cache, re-registers the service worker, and reloads. Your data stays intact."),
                React.createElement("button", { className: "btn btn-p w100", style: { padding: "12px" }, onClick: async () => {
                    if (!window.confirm("Check for updates now? The page will reload.")) return;
                    try {
                        if ("serviceWorker" in navigator) {
                            const regs = await navigator.serviceWorker.getRegistrations();
                            await Promise.all(regs.map(r => r.unregister()));
                        }
                        if (window.caches) {
                            const keys = await caches.keys();
                            await Promise.all(keys.map(k => caches.delete(k)));
                        }
                        toast("Updating LifeSync\u2026 \u2728");
                        setTimeout(() => { window.location.reload(); }, 400);
                    } catch (err) {
                        toast("Update failed \u2014 try a hard refresh", "error");
                    }
                } }, "Check for Updates \uD83D\uDD04")),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 14 } }, "Data & Backup"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                    React.createElement("button", { className: "btn btn-s w100", onClick: () => {
                            if (window.confirm("Restart onboarding? This keeps your data but walks you through setup again.")) {
                                setData(d => Object.assign({}, d, { user: Object.assign({}, d.user, { onboarded: false }) }));
                            }
                        } },
                        React.createElement(Ic, { n: "sparkles", size: 14 }),
                        "Restart Onboarding"),
                    React.createElement("button", { className: "btn btn-s w100", onClick: () => {
                            if (window.confirm("Load demo data? This replaces your current data with the Aria sample profile (good for previewing features).")) {
                                setData(makeDemoData());
                                toast("Demo data loaded ✨", "success");
                            }
                        } },
                        React.createElement(Ic, { n: "sparkles", size: 14 }),
                        "Load Demo Data (preview)"),
                    React.createElement("button", { className: "btn btn-s w100", onClick: exportData },
                        React.createElement(Ic, { n: "download", size: 14 }),
                        "Export Full Backup (JSON)"),
                    React.createElement("label", { className: "btn btn-s w100", style: { cursor: "pointer", justifyContent: "center" } },
                        React.createElement(Ic, { n: "upload", size: 14 }),
                        "Restore from Backup",
                        React.createElement("input", { type: "file", accept: ".json", onChange: importData, style: { display: "none" } })),
                    React.createElement("button", { className: "btn btn-danger w100", onClick: async () => {
                            if (!window.confirm("⚠ FULL RESET — erase ALL data (local + cloud) and start fresh? This cannot be undone.")) return;
                            try {
                                localStorage.removeItem(profileStorageKey(sbUid()));
                                localStorage.removeItem(profileCloudStateKey(sbUid()));
                                localStorage.removeItem("zepp_last_sync");
                                try {
                                    await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${sbUid()}`, { method: "DELETE", headers: SB_HDR });
                                } catch (_e) { /* ignore cloud errors */ }
                                if ("caches" in window) {
                                    const ks = await caches.keys();
                                    await Promise.all(ks.map(k => caches.delete(k)));
                                }
                                window.location.reload();
                            } catch (_e) {
                                window.location.reload();
                            }
                        } },
                        React.createElement(Ic, { n: "refresh", size: 14 }),
                        "Reset Everything (local + cloud)"))),
            React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, color: "var(--text-muted)", marginBottom: -6 } }, "\uD83D\uDD17 Watch Integration"),
            React.createElement(ZeppSyncPanel, { data: data, setData: setData, toast: toast }),
            React.createElement(HealthWebhookPanel, { data: data, toast: toast }),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "\uD83D\uDD17 Other Integrations"),
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 14 } }, "Connect more data sources"),
                otherIntegrations.map(item => (React.createElement("div", { key: item.name, style: { padding: "13px 0", borderBottom: "1px solid var(--border)" } },
                    React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 6 } },
                        React.createElement("div", { className: "flex fac gap2" },
                            React.createElement("span", { style: { fontSize: 18 } }, item.emoji),
                            React.createElement("span", { style: { fontWeight: 600, fontSize: 13 } }, item.name)),
                        React.createElement("span", { className: "b bi", style: { fontSize: 9.5 } }, item.status)),
                    React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 } }, item.howto))))),
            React.createElement("div", { className: "card" },
                React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5, marginBottom: 4 } }, "\u2328\uFE0F Keyboard Shortcuts"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginTop: 10 } }, [["/ ", "Open search"], ["D", "Dashboard"], ["H", "Habits"], ["N", "Nutrition"], ["F", "Fitness"], ["B", "Budget"], ["G", "Goals"], ["A", "AI Coach"], ["P", "Progress"], ["S", "Settings"]].map(([k, v]) => (React.createElement("div", { key: k, className: "flex fac fjb", style: { fontSize: 12.5 } },
                    React.createElement("span", { style: { color: "var(--text-muted)" } }, v),
                    React.createElement("kbd", { style: { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "monospace" } }, k)))))))));
}
function GlobalSearch({ data, onNavigate, onClose }) {
    const [q, setQ] = useState("");
    const inputRef = useRef(null);
    useEffect(() => { var _a; (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, []);
    const results = useMemo(() => {
        if (!q.trim())
            return [];
        const ql = q.toLowerCase(), r = [];
        data.habits.forEach(h => { if (h.name.toLowerCase().includes(ql))
            r.push({ type: "Habit", emoji: h.icon, title: h.name, sub: `🔥 ${h.streak}d streak`, page: "habits" }); });
        data.fitness.workouts.forEach(w => { if (w.name.toLowerCase().includes(ql))
            r.push({ type: "Workout", emoji: w.emoji, title: w.name, sub: `${w.date} · ${w.duration}min`, page: "fitness" }); });
        data.nutrition.logs.forEach(l => { if (l.name.toLowerCase().includes(ql))
            r.push({ type: "Food", emoji: l.emoji, title: l.name, sub: `${l.cal} kcal`, page: "nutrition" }); });
        data.budget.transactions.forEach(t => { if (t.name.toLowerCase().includes(ql))
            r.push({ type: "Transaction", emoji: t.emoji, title: t.name, sub: `${t.date} · ${t.amount > 0 ? "+" : "-"}$${Math.abs(t.amount).toFixed(2)}`, page: "budget" }); });
        data.goals.forEach(g => { if (g.name.toLowerCase().includes(ql))
            r.push({ type: "Goal", emoji: g.emoji, title: g.name, sub: `${Math.min(100, Math.round((g.current / g.target) * 100))}%`, page: "goals" }); });
        data.journal.entries.forEach(e => { var _a; if ((_a = e.text) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(ql))
            r.push({ type: "Journal", emoji: e.mood, title: e.date + " entry", sub: (e.text || "").slice(0, 50) + "…", page: "journal" }); });
        return r.slice(0, 12);
    }, [q, data]);
    return (React.createElement("div", { className: "search-bar" },
        React.createElement(Ic, { n: "search", size: 18, color: "var(--text-muted)" }),
        React.createElement("input", { ref: inputRef, style: { flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'Sora',sans-serif", fontSize: 15 }, placeholder: "Search habits, workouts, food, transactions, goals\u2026", value: q, onChange: e => setQ(e.target.value), onKeyDown: e => e.key === "Escape" && onClose() }),
        React.createElement("button", { className: "btn btn-g btn-sm", onClick: onClose }, "ESC"),
        results.length > 0 && (React.createElement("div", { style: { position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--border-bright)", borderTop: "none", borderRadius: "0 0 16px 16px", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", overflow: "hidden", zIndex: 9999 } }, results.map((r, i) => (React.createElement("div", { key: i, style: { display: "flex", gap: 12, padding: "12px 20px", cursor: "pointer", borderBottom: "1px solid var(--border)" }, onClick: () => { onNavigate(r.page); onClose(); }, onMouseEnter: e => e.currentTarget.style.background = "var(--surface2)", onMouseLeave: e => e.currentTarget.style.background = "" },
            React.createElement("span", { style: { fontSize: 19, flexShrink: 0 } }, r.emoji),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, r.title),
                React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } },
                    r.type,
                    " \u00B7 ",
                    r.sub)))))))));
}
function SchedulePage({ data, setData, toast }) {
    const h = React.createElement;
    const sc = data.schedule || { blocks: [], overrides: {}, settings: {} };
    const [tab, setTab] = useState("day");
    const [selKey, setSelKey] = useState(todayKey());
    const [editing, setEditing] = useState(null); // { context: "base"|dateKey, block, isNew }
    const [exportDays, setExportDays] = useState(7);

    const cloneSc = () => ({
        blocks: (sc.blocks || []).slice(),
        overrides: Object.assign({}, sc.overrides || {}),
        settings: Object.assign({}, sc.settings || {}),
        seeded: sc.seeded,
    });
    const save = (ns) => setData(d => Object.assign({}, d, { schedule: ns }));

    const customizeDay = (key) => {
        const ns = cloneSc();
        ns.overrides[key] = resolveDay(sc, key).map(b => Object.assign({}, b, { id: newSchedId() }));
        save(ns); toast("Day customized — edits here won't change your routine", "success");
    };
    const resetDay = (key) => {
        const ns = cloneSc(); delete ns.overrides[key]; save(ns); toast("Day reset to your routine", "success");
    };
    const removeBlock = (context, id) => {
        const ns = cloneSc();
        if (context === "base") ns.blocks = ns.blocks.filter(b => b.id !== id);
        else if (Array.isArray(ns.overrides[context])) ns.overrides[context] = ns.overrides[context].filter(b => b.id !== id);
        save(ns); toast("Block removed", "success");
    };
    const upsertBlock = (context, block, isNew) => {
        const ns = cloneSc();
        if (context === "base") {
            ns.blocks = isNew ? [...ns.blocks, block] : ns.blocks.map(b => b.id === block.id ? block : b);
        } else {
            const cur = Array.isArray(ns.overrides[context]) ? ns.overrides[context] : [];
            ns.overrides[context] = isNew ? [...cur, block] : cur.map(b => b.id === block.id ? block : b);
        }
        save(ns);
    };
    const setLead = (min) => { const ns = cloneSc(); ns.settings.reminderLeadMin = Math.max(0, min | 0); save(ns); };

    const openNew = (context) => setEditing({
        context, isNew: true,
        block: { id: newSchedId(), title: "", emoji: "📌", type: "custom", start: "09:00", end: "10:00", days: [0, 1, 2, 3, 4, 5, 6], reminder: true, asTodo: false, notes: "" },
    });
    const openEdit = (context, block) => setEditing({ context, isNew: false, block: Object.assign({ days: [0, 1, 2, 3, 4, 5, 6] }, block) });

    const nowMin = (() => { try { const p = _CHICAGO_DATE_PARTS(); return p.hour * 60 + p.minute; } catch (e) { return -1; } })();

    const blockRow = (b, context) => {
        const t = schedType(b.type);
        const bs = minutesOf(b.start), be = minutesOf(b.end);
        const within = be > bs ? (nowMin >= bs && nowMin < be) : (nowMin >= bs || nowMin < be); // handle overnight wrap
        const isNow = selKey === todayKey() && nowMin >= 0 && within;
        return h("div", { key: b.id, className: "card", style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", marginBottom: 8, borderLeft: `3px solid ${t.color}`, opacity: isNow ? 1 : 0.97, boxShadow: isNow ? `0 0 0 1px ${t.color}` : undefined } },
            h("div", { style: { fontSize: 22, width: 30, textAlign: "center" } }, b.emoji || t.emoji),
            h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { className: "flex fac", style: { gap: 8 } },
                    h("span", { style: { fontWeight: 700, fontSize: 15 } }, b.title || "Untitled"),
                    isNow && h("span", { style: { fontSize: 10, fontWeight: 800, background: "var(--rose)", color: "#fff", padding: "1px 7px", borderRadius: 20 } }, "NOW"),
                    b.asTodo && h("span", { style: { fontSize: 10, fontWeight: 700, color: "var(--sky)", border: "1px solid var(--border-bright)", padding: "1px 6px", borderRadius: 20 } }, "Reminder")),
                h("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 } },
                    `${fmtTime12(b.start)} – ${fmtTime12(b.end)} · ${fmtDur(b.start, b.end)}`),
                b.notes && h("div", { style: { fontSize: 12, color: "var(--text-dim)", marginTop: 2 } }, b.notes)),
            h("button", { className: "btn btn-g btn-ic", title: "Edit", onClick: () => openEdit(context, b) }, h(Ic, { n: "settings", size: 14 })),
            h("button", { className: "btn btn-g btn-ic", title: "Delete", onClick: () => removeBlock(context, b.id) }, h(Ic, { n: "x", size: 14 })));
    };

    // ── Day tab ──
    const dayBlocks = resolveDay(sc, selKey);
    const custom = dayIsCustom(sc, selKey);
    const rel = relDayLabel(selKey);
    const dayTab = h("div", null,
        h("div", { className: "card", style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", marginBottom: 14 } },
            h("button", { className: "btn btn-g btn-ic", onClick: () => setSelKey(k => addDaysKey(k, -1)) }, h(Ic, { n: "x", size: 0 }), "‹"),
            h("div", { style: { textAlign: "center", flex: 1 } },
                h("div", { style: { fontWeight: 800, fontSize: 16 } }, prettyDateKey(selKey)),
                h("div", { style: { fontSize: 12, color: "var(--text-muted)" } }, rel || (custom ? "Custom day" : "Following routine"))),
            h("button", { className: "btn btn-g btn-ic", onClick: () => setSelKey(k => addDaysKey(k, 1)) }, "›")),
        h("div", { className: "flex fac", style: { gap: 8, marginBottom: 14, flexWrap: "wrap" } },
            selKey !== todayKey() && h("button", { className: "btn btn-s btn-sm", onClick: () => setSelKey(todayKey()) }, "Jump to today"),
            !custom && h("button", { className: "btn btn-p btn-sm", onClick: () => customizeDay(selKey) }, "Customize this day"),
            custom && h("button", { className: "btn btn-p btn-sm", onClick: () => openNew(selKey) }, "+ Add block"),
            custom && h("button", { className: "btn btn-s btn-sm", onClick: () => resetDay(selKey) }, "Reset to routine")),
        custom && h("div", { style: { fontSize: 12.5, color: "var(--gold)", marginBottom: 12 } }, "✏️ This day is customized. Changes here only affect this date."),
        dayBlocks.length === 0
            ? h("div", { className: "card", style: { textAlign: "center", padding: 30, color: "var(--text-muted)" } }, "Nothing scheduled. ", !custom ? "Add blocks in the Routine tab, or customize this day." : "Tap “+ Add block”.")
            : dayBlocks.map(b => blockRow(b, custom ? selKey : "base")),
        !custom && dayBlocks.length > 0 && h("div", { style: { fontSize: 12, color: "var(--text-dim)", marginTop: 6, textAlign: "center" } }, "These come from your base routine. “Customize this day” to make one-off changes."));

    // ── Routine tab ──
    const baseSorted = (sc.blocks || []).slice().sort((a, b) => minutesOf(a.start) - minutesOf(b.start));
    const routineRow = (b) => {
        const t = schedType(b.type);
        const days = Array.isArray(b.days) ? b.days : [0, 1, 2, 3, 4, 5, 6];
        const allDays = days.length === 7;
        return h("div", { key: b.id, className: "card", style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 13px", marginBottom: 8, borderLeft: `3px solid ${t.color}` } },
            h("div", { style: { fontSize: 22, width: 30, textAlign: "center" } }, b.emoji || t.emoji),
            h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { className: "flex fac", style: { gap: 8 } },
                    h("span", { style: { fontWeight: 700, fontSize: 15 } }, b.title || "Untitled"),
                    b.asTodo && h("span", { style: { fontSize: 10, fontWeight: 700, color: "var(--sky)", border: "1px solid var(--border-bright)", padding: "1px 6px", borderRadius: 20 } }, "Reminder")),
                h("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 } }, `${fmtTime12(b.start)} – ${fmtTime12(b.end)} · ${fmtDur(b.start, b.end)}`),
                h("div", { style: { fontSize: 11.5, color: "var(--text-dim)", marginTop: 3 } }, allDays ? "Every day" : days.map(d => WEEKDAY_ABBR[d]).join(", "))),
            h("button", { className: "btn btn-g btn-ic", onClick: () => openEdit("base", b) }, h(Ic, { n: "settings", size: 14 })),
            h("button", { className: "btn btn-g btn-ic", onClick: () => removeBlock("base", b.id) }, h(Ic, { n: "x", size: 14 })));
    };
    const routineTab = h("div", null,
        h("div", { className: "flex fac fjb", style: { marginBottom: 14 } },
            h("div", { style: { fontSize: 13, color: "var(--text-muted)" } }, "Your repeating daily routine. Applies to every matching weekday."),
            h("button", { className: "btn btn-p btn-sm", onClick: () => openNew("base") }, "+ Add block")),
        baseSorted.length === 0
            ? h("div", { className: "card", style: { textAlign: "center", padding: 30, color: "var(--text-muted)" } }, "No routine blocks yet. Tap “+ Add block” to start.")
            : baseSorted.map(routineRow));

    // ── Export tab ──
    const lead = (sc.settings || {}).reminderLeadMin != null ? sc.settings.reminderLeadMin : 10;
    const calCount = (() => { let n = 0; for (let i = 0; i < exportDays; i++) n += resolveDay(sc, addDaysKey(todayKey(), i)).filter(b => !b.asTodo).length; return n; })();
    const remCount = (() => { let n = 0; for (let i = 0; i < exportDays; i++) n += resolveDay(sc, addDaysKey(todayKey(), i)).filter(b => b.asTodo).length; return n; })();
    const doExport = (kind) => {
        const start = todayKey();
        if (kind === "cal" || kind === "both") downloadTextFile("lifesync-calendar.ics", buildCalendarICS(sc, start, exportDays), "text/calendar");
        if (kind === "rem" || kind === "both") setTimeout(() => downloadTextFile("lifesync-reminders.ics", buildRemindersICS(sc, start, exportDays), "text/calendar"), kind === "both" ? 400 : 0);
        toast("Export ready — open the file on your iPhone/Mac to import", "success");
    };
    const rangeChip = (d) => h("button", { key: d, className: "btn btn-sm " + (exportDays === d ? "btn-p" : "btn-s"), onClick: () => setExportDays(d) }, `${d} days`);
    const exportTab = h("div", null,
        h("div", { className: "card", style: { padding: 16, marginBottom: 14 } },
            h("div", { className: "label" }, "How far ahead to export"),
            h("div", { className: "flex fac", style: { gap: 8, marginBottom: 16, flexWrap: "wrap" } }, [7, 14, 30].map(rangeChip)),
            h(Field, { label: "Alert / reminder lead time (minutes before)" },
                h("input", { className: "inp", type: "number", min: 0, max: 1440, value: lead, onChange: e => setLead(+e.target.value) }))),
        h("div", { className: "card", style: { padding: 16, marginBottom: 14, borderLeft: "3px solid var(--mint)" } },
            h("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 4 } }, "📅 Apple Calendar"),
            h("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 12 } }, `${calCount} timed event${calCount === 1 ? "" : "s"} over the next ${exportDays} days, each with a ${lead}-min alert.`),
            h("button", { className: "btn btn-p w100", onClick: () => doExport("cal") }, h(Ic, { n: "download", size: 15 }), " Export Calendar (.ics)")),
        h("div", { className: "card", style: { padding: 16, marginBottom: 14, borderLeft: "3px solid var(--sky)" } },
            h("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 4 } }, "✅ Apple Reminders"),
            h("div", { style: { fontSize: 12.5, color: "var(--text-muted)", marginBottom: 12 } }, remCount > 0 ? `${remCount} task${remCount === 1 ? "" : "s"} over the next ${exportDays} days. Mark a block as “Reminder” to include it here.` : "No blocks are marked as “Reminder” tasks yet. Edit a block and turn on “Add to Reminders as a task”."),
            h("button", { className: "btn btn-p w100", onClick: () => doExport("rem") }, h(Ic, { n: "download", size: 15 }), " Export Reminders (.ics)")),
        h("button", { className: "btn btn-s w100", style: { marginBottom: 14 }, onClick: () => doExport("both") }, "Export both files"),
        h("div", { className: "card", style: { padding: 14, fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.6 } },
            h("div", { style: { fontWeight: 700, color: "var(--text-muted)", marginBottom: 6 } }, "How to import on Apple"),
            "Tap the downloaded ", h("b", null, ".ics"), " file on your iPhone, iPad, or Mac. Calendar events open in ", h("b", null, "Apple Calendar"), " and reminder tasks open in ", h("b", null, "Reminders"), ". Times are saved as written, so an 8:00 block stays 8:00."));

    // ── Editor modal ──
    const ed = editing;
    const updEd = (patch) => setEditing(e => Object.assign({}, e, { block: Object.assign({}, e.block, patch) }));
    const toggleDay = (d) => updEd({ days: (ed.block.days || []).includes(d) ? ed.block.days.filter(x => x !== d) : [...(ed.block.days || []), d].sort() });
    const saveEditing = () => {
        const b = ed.block;
        if (!b.title || !b.title.trim()) { toast("Give it a title first", "error"); return; }
        const validHM = (s) => { const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim()); return !!m && +m[1] <= 23 && +m[2] <= 59; };
        if (!validHM(b.start) || !validHM(b.end)) { toast("Enter valid times (00:00–23:59)", "error"); return; }
        if (ed.context === "base" && (!b.days || b.days.length === 0)) { toast("Pick at least one weekday", "error"); return; }
        upsertBlock(ed.context, Object.assign({}, b, { title: b.title.trim() }), ed.isNew);
        setEditing(null); toast(ed.isNew ? "Block added" : "Block saved", "success");
    };
    const editorModal = ed && h(Modal, { open: true, onClose: () => setEditing(null), title: ed.isNew ? "New block" : "Edit block" },
        h("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            h(Field, { label: "Title" }, h("input", { className: "inp", value: ed.block.title, placeholder: "e.g. Lunch, Deep work", onChange: e => updEd({ title: e.target.value }) })),
            h("div", { className: "g2" },
                h(Field, { label: "Emoji" }, h("input", { className: "inp", value: ed.block.emoji, maxLength: 4, onChange: e => updEd({ emoji: e.target.value }) })),
                h(Field, { label: "Type" }, h("select", { className: "inp", value: ed.block.type, onChange: e => { const ty = schedType(e.target.value); updEd({ type: e.target.value, emoji: (!ed.block.emoji || SCHED_TYPES.some(t => t.emoji === ed.block.emoji)) ? ty.emoji : ed.block.emoji }); } }, SCHED_TYPES.map(t => h("option", { key: t.id, value: t.id }, `${t.emoji} ${t.label}`))))),
            h("div", { className: "g2" },
                h(Field, { label: "Start" }, h("input", { className: "inp", type: "time", value: ed.block.start, onChange: e => updEd({ start: e.target.value }) })),
                h(Field, { label: "End" }, h("input", { className: "inp", type: "time", value: ed.block.end, onChange: e => updEd({ end: e.target.value }) }))),
            ed.context === "base" && h(Field, { label: "Repeat on" },
                h("div", { className: "flex fac", style: { gap: 6, flexWrap: "wrap" } },
                    WEEKDAY_ABBR.map((lbl, d) => h("button", { key: d, type: "button", className: "btn btn-sm " + ((ed.block.days || []).includes(d) ? "btn-p" : "btn-s"), style: { minWidth: 44, padding: "6px 0" }, onClick: () => toggleDay(d) }, lbl)))),
            h(Field, { label: "Notes (optional)" }, h("input", { className: "inp", value: ed.block.notes || "", onChange: e => updEd({ notes: e.target.value }) })),
            h("label", { className: "flex fac", style: { gap: 10, cursor: "pointer", fontSize: 14 } },
                h("input", { type: "checkbox", checked: !!ed.block.reminder, onChange: e => updEd({ reminder: e.target.checked }) }),
                "Add an alert before it starts"),
            h("label", { className: "flex fac", style: { gap: 10, cursor: "pointer", fontSize: 14 } },
                h("input", { type: "checkbox", checked: !!ed.block.asTodo, onChange: e => updEd({ asTodo: e.target.checked }) }),
                "Send to Apple Reminders as a task (instead of Calendar)"),
            h("div", { className: "flex fac", style: { gap: 10, marginTop: 6 } },
                h("button", { className: "btn btn-p w100", onClick: saveEditing }, ed.isNew ? "Add block" : "Save"),
                !ed.isNew && h("button", { className: "btn btn-g", onClick: () => { removeBlock(ed.context, ed.block.id); setEditing(null); } }, h(Ic, { n: "x", size: 15 })))));

    const tabBtn = (id, label) => h("button", { key: id, className: "btn btn-sm " + (tab === id ? "btn-p" : "btn-s"), onClick: () => setTab(id) }, label);
    return h("div", { className: "pe" },
        h("div", { className: "sh", style: { marginBottom: 16 } },
            h("div", null,
                h("h1", { className: "st" }, "Schedule"),
                h("div", { style: { fontSize: 13, color: "var(--text-muted)" } }, "Your daily routine, per-day tweaks, and Apple export"))),
        h("div", { className: "flex fac", style: { gap: 8, marginBottom: 18, flexWrap: "wrap" } },
            tabBtn("day", "Day"), tabBtn("routine", "Base Routine"), tabBtn("export", "Export to Apple")),
        tab === "day" ? dayTab : tab === "routine" ? routineTab : exportTab,
        editorModal);
}
const NAV = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" }, { id: "habits", label: "Habits", icon: "habits" },
    { id: "nutrition", label: "Nutrition", icon: "nutrition" }, { id: "fitness", label: "Fitness", icon: "fitness" },
    { id: "skincare", label: "Skincare", icon: "skin" }, { id: "sleep", label: "Sleep", icon: "sleep" },
    { id: "body", label: "Body", icon: "body" }, { id: "cycle", label: "Cycle", icon: "cycle" },
    { id: "journal", label: "Journal", icon: "journal" }, { id: "budget", label: "Finance", icon: "budget" },
    { id: "schedule", label: "Schedule", icon: "schedule" },
    { id: "goals", label: "Goals", icon: "goals" }, { id: "progress", label: "Progress", icon: "progress" },
    { id: "checkin", label: "Check-In", icon: "clipboard" }, { id: "ai", label: "AI Coach", icon: "ai" },
    { id: "settings", label: "Settings", icon: "settings" },
];
const MOBILE_NAV = ["dashboard", "habits", "nutrition", "ai", "settings"];
// ══ THEMES ═══════════════════════════════════════════════════════════════════
const THEMES = {
    red: { label: "Red & Black", emoji: "🔥", dark: true, vars: { "--bg": "#050505", "--surface": "#0f0a0a", "--surface2": "#1a0e0e", "--surface3": "#241414", "--border": "rgba(255,77,77,0.14)", "--border-bright": "rgba(255,77,77,0.34)", "--text": "#fff5f5", "--text-muted": "#b08a8a", "--text-dim": "#6a4040", "--rose": "#ff3344", "--violet": "#e11d2e", "--indigo": "#a83333", "--mint": "#4ade80", "--gold": "#fbbf24", "--peach": "#ff6b6b", "--sky": "#d97757", "--red": "#ff1a2e", "--grad-rose": "linear-gradient(135deg,#ff1a2e,#7a0a14)", "--grad-violet": "linear-gradient(135deg,#e11d2e,#1a0606)" } },
    light: { label: "Light", emoji: "☀️", dark: false, vars: { "--bg": "#faf8f7", "--surface": "#ffffff", "--surface2": "#f4eeec", "--surface3": "#e9e0dc", "--border": "rgba(180,40,50,0.16)", "--border-bright": "rgba(180,40,50,0.4)", "--text": "#1a0a0a", "--text-muted": "#6a4040", "--text-dim": "#9a7878", "--rose": "#dc2626", "--violet": "#b91c1c", "--indigo": "#991b1b", "--mint": "#16a34a", "--gold": "#ca8a04", "--peach": "#ef4444", "--sky": "#c2410c", "--red": "#b91c1c", "--grad-rose": "linear-gradient(135deg,#dc2626,#7c2d12)", "--grad-violet": "linear-gradient(135deg,#b91c1c,#450a0a)" } },
    midnight: { label: "Midnight Purple", emoji: "🌙", dark: true, vars: { "--bg": "#0a0812", "--surface": "#13101e", "--surface2": "#1c1828", "--surface3": "#221e30", "--border": "rgba(180,150,255,0.12)", "--border-bright": "rgba(200,170,255,0.28)", "--text": "#f0ecff", "--text-muted": "#8b7fa8", "--text-dim": "#4a4060", "--rose": "#ff6b9d", "--violet": "#c77dff", "--indigo": "#8b9eff", "--mint": "#7fffd4", "--gold": "#ffd700", "--peach": "#ffb997", "--sky": "#87ceeb", "--red": "#ff4d6d", "--grad-rose": "linear-gradient(135deg,#ff6b9d,#c77dff)", "--grad-violet": "linear-gradient(135deg,#c77dff,#8b9eff)" } },
    ocean: { label: "Ocean Deep", emoji: "🌊", dark: true, vars: { "--bg": "#04111d", "--surface": "#0a1a2e", "--surface2": "#102744", "--surface3": "#163660", "--border": "rgba(56,189,248,0.15)", "--border-bright": "rgba(56,189,248,0.35)", "--text": "#e0f2fe", "--text-muted": "#7da3c4", "--text-dim": "#445a73", "--rose": "#22d3ee", "--violet": "#0ea5e9", "--indigo": "#3b82f6", "--mint": "#5eead4", "--gold": "#fbbf24", "--peach": "#67e8f9", "--sky": "#06b6d4", "--red": "#fb7185", "--grad-rose": "linear-gradient(135deg,#22d3ee,#0ea5e9)", "--grad-violet": "linear-gradient(135deg,#0ea5e9,#1e3a8a)" } },
    forest: { label: "Forest", emoji: "🌲", dark: true, vars: { "--bg": "#0a1410", "--surface": "#0f1f18", "--surface2": "#152e22", "--surface3": "#1c3d2d", "--border": "rgba(74,222,128,0.14)", "--border-bright": "rgba(74,222,128,0.34)", "--text": "#dcfce7", "--text-muted": "#86a896", "--text-dim": "#4a5d52", "--rose": "#4ade80", "--violet": "#10b981", "--indigo": "#065f46", "--mint": "#84cc16", "--gold": "#facc15", "--peach": "#a3e635", "--sky": "#22c55e", "--red": "#dc2626", "--grad-rose": "linear-gradient(135deg,#4ade80,#10b981)", "--grad-violet": "linear-gradient(135deg,#10b981,#064e3b)" } },
    mono: { label: "Monochrome", emoji: "◐", dark: true, vars: { "--bg": "#000000", "--surface": "#0c0c0c", "--surface2": "#1a1a1a", "--surface3": "#262626", "--border": "rgba(255,255,255,0.12)", "--border-bright": "rgba(255,255,255,0.3)", "--text": "#ffffff", "--text-muted": "#9ca3af", "--text-dim": "#525252", "--rose": "#e5e5e5", "--violet": "#ffffff", "--indigo": "#a3a3a3", "--mint": "#d4d4d4", "--gold": "#f5f5f5", "--peach": "#e5e5e5", "--sky": "#a3a3a3", "--red": "#fafafa", "--grad-rose": "linear-gradient(135deg,#fafafa,#737373)", "--grad-violet": "linear-gradient(135deg,#ffffff,#404040)" } },
};
function themeCSS(name) {
    const t = THEMES[name] || THEMES.red;
    return ":root{" + Object.entries(t.vars).map(([k, v]) => k + ":" + v).join(";") + "}";
}
// ══ PROFILES ═════════════════════════════════════════════════════════════════
const PROFILES_KEY = "lifesync-profiles";
function loadProfiles() {
    try {
        const raw = localStorage.getItem(PROFILES_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            if (p && Array.isArray(p.profiles) && p.profiles.length > 0 && p.activeId) return p;
        }
    } catch (_a) { }
    const def = { profiles: [{ id: "kamruns", name: "Me", avatar: "🔥", theme: "red" }], activeId: "kamruns" };
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(def)); } catch (_b) { }
    return def;
}
function saveProfiles(p) { try { localStorage.setItem(PROFILES_KEY, JSON.stringify(p)); } catch (_a) { } }
function getActiveProfile() {
    const p = loadProfiles();
    return p.profiles.find(x => x.id === p.activeId) || p.profiles[0];
}
function profileStorageKey(id) { return "lifesync-v7-" + id; }
function profileCloudStateKey(id) { return "lifesync-v7-" + id + "-cloud-state"; }
// One-time migration of pre-profile-system data:
// older builds stored everything under the single key `lifesync-v7`.
// If that legacy key still holds real data and the active profile's
// per-profile key is empty, copy it across so the user's work isn't lost.
// We mark the legacy key with `{__migrated:true}` so this never re-runs.
const LEGACY_KEY = "lifesync-v7";
function migrateLegacyData() {
    try {
        const legacyRaw = localStorage.getItem(LEGACY_KEY);
        if (!legacyRaw) return;
        let legacy;
        try { legacy = JSON.parse(legacyRaw); } catch (_p) { return; }
        if (!legacy || legacy.__migrated) return;
        if (!legacy.user) return; // doesn't look like a LifeSync payload
        const active = getActiveProfile();
        const destKey = profileStorageKey(active.id);
        const existing = localStorage.getItem(destKey);
        let destHasContent = false;
        if (existing) {
            try {
                const parsed = JSON.parse(existing);
                // Use the same comprehensive content check as the cloud-merge
                // path so any populated section (habits, fitness, nutrition,
                // journal, budget, goals, sleep, user-driven messages, or an
                // onboarded user) protects the destination from being clobbered.
                destHasContent = hasMeaningfulContent(parsed);
            } catch (_q) { }
        }
        if (!destHasContent) {
            localStorage.setItem(destKey, JSON.stringify(legacy));
        }
        localStorage.setItem(LEGACY_KEY, JSON.stringify({ __migrated: true, migratedAt: new Date().toISOString() }));
    } catch (e) {
        console.warn("[LifeSync] legacy migration skipped:", e);
    }
}
try { migrateLegacyData(); } catch (_a) { }
function updateActiveProfile(patch) {
    const p = loadProfiles();
    const i = p.profiles.findIndex(x => x.id === p.activeId);
    if (i >= 0) { p.profiles[i] = Object.assign({}, p.profiles[i], patch); saveProfiles(p); }
}
function addProfile(name, avatar, theme) {
    const p = loadProfiles();
    const id = "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    p.profiles.push({ id, name: name || "New profile", avatar: avatar || "✨", theme: theme || "red" });
    p.activeId = id;
    saveProfiles(p);
    // Seed an empty data row immediately so no race can read an uninitialized key.
    try { localStorage.setItem(profileStorageKey(id), JSON.stringify(makeData())); } catch (_a) { }
    return id;
}
function switchProfile(id) {
    const p = loadProfiles();
    if (p.profiles.find(x => x.id === id)) { p.activeId = id; saveProfiles(p); }
}
function deleteProfile(id) {
    const p = loadProfiles();
    if (p.profiles.length <= 1) return false;
    p.profiles = p.profiles.filter(x => x.id !== id);
    try { localStorage.removeItem(profileStorageKey(id)); } catch (_a) { }
    try { localStorage.removeItem(profileCloudStateKey(id)); } catch (_c) { }
    try { fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${id}`, { method: "DELETE", headers: SB_HDR }); } catch (_b) { }
    if (p.activeId === id) p.activeId = p.profiles[0].id;
    saveProfiles(p);
    return true;
}
// ══ SUPABASE ═════════════════════════════════════════════════════════════════
const SB_URL = "https://zjaevznmthrpvhbpdjuj.supabase.co";
const SB_KEY = "sb_publishable_5NwcvTweidtsFG4yhUj8Lw_exLp5Rbm";
const SB_HDR = { "Content-Type": "application/json", "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` };
function sbUid() {
    if (_authState && _authState.userId) return _authState.userId;
    return getActiveProfile().id;
}

// ══ AUTH + CRYPTO ═══════════════════════════════════════════════════════════
// Supabase Auth for proper accounts + zero-knowledge AES-GCM encryption of
// cloud data. The user's password never leaves the device — only the
// Supabase password (for sign-in/JWT) and a PBKDF2-derived encryption key
// (which stays in memory + sessionStorage).
//
// Storage:
//   localStorage   lifesync-auth.session            { access_token, refresh_token, expires_at, user }
//   localStorage   lifesync-auth.verifier.<email>   { vSalt, vIter, vHash, eSalt, eIter, userId, displayName, avatar }
//   localStorage   lifesync-auth.active-email       <email>
//   sessionStorage lifesync-auth.enckey.<userId>    raw AES-256 key (cleared when tab closes)
//   Supabase row   user_id=<authUid> data:          { v:1, eSalt, eIter, iv, ct }    (ciphertext)
//
// "Forgot password" resets the Supabase login only — previously-encrypted
// data becomes unrecoverable because the encryption key is derived from
// the password. Standard zero-knowledge tradeoff.

const AUTH_SESSION_KEY = "lifesync-auth.session";
const AUTH_ACTIVE_EMAIL_KEY = "lifesync-auth.active-email";
const AUTH_VERIFIER_PREFIX = "lifesync-auth.verifier.";
const AUTH_SYNTHETIC_DOMAIN = "lifesync.local";
const USERNAME_RE = /^[a-z0-9](?:[a-z0-9_.\-]{1,30}[a-z0-9])?$/;
function _normalizeLogin(raw) {
    const s = String(raw || "").trim().toLowerCase();
    if (!s) return "";
    if (s.includes("@")) return s; // real email path (backwards compat)
    return s + "@" + AUTH_SYNTHETIC_DOMAIN;
}
function _isSyntheticLogin(emailOrLogin) {
    const s = String(emailOrLogin || "").toLowerCase();
    return s.endsWith("@" + AUTH_SYNTHETIC_DOMAIN);
}
function _displayLogin(emailOrLogin) {
    const s = String(emailOrLogin || "");
    if (_isSyntheticLogin(s)) return s.slice(0, s.length - (AUTH_SYNTHETIC_DOMAIN.length + 1));
    return s;
}
const AUTH_ENCKEY_PREFIX = "lifesync-auth.enckey.";
const PBKDF2_ITER = 250000;

let _authState = null;
function getAuthState() { return _authState; }
function setAuthState(s) {
    _authState = s;
    try { window.dispatchEvent(new CustomEvent("lifesync:auth-changed", { detail: { signedIn: !!s } })); } catch (_) { }
}

function _b64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
function _unb64(s) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
function _rand(n) { const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }

async function _pbkdf2Bits(password, saltBytes, iter, bits) {
    const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
    return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: saltBytes, iterations: iter }, km, bits);
}
async function _deriveEncKey(password, saltBytes, iter) {
    const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: saltBytes, iterations: iter }, km, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}
async function _aesEncrypt(key, plaintext) {
    const iv = _rand(12);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext));
    return { iv: _b64(iv), ct: _b64(ct) };
}
async function _aesDecrypt(key, ivB64, ctB64) {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: _unb64(ivB64) }, key, _unb64(ctB64));
    return new TextDecoder().decode(pt);
}

function _loadSession() { try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null"); } catch (_) { return null; } }
function _saveSession(s) { try { localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(s)); } catch (_) { } }
function _clearSession() { try { localStorage.removeItem(AUTH_SESSION_KEY); } catch (_) { } }
function _loadVerifier(email) { try { return JSON.parse(localStorage.getItem(AUTH_VERIFIER_PREFIX + email) || "null"); } catch (_) { return null; } }
function _saveVerifier(email, v) { try { localStorage.setItem(AUTH_VERIFIER_PREFIX + email, JSON.stringify(v)); } catch (_) { } }
function _listVerifiers() {
    const out = [];
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf(AUTH_VERIFIER_PREFIX) === 0) {
            try { const v = JSON.parse(localStorage.getItem(k) || "null"); if (v) out.push(Object.assign({ email: k.slice(AUTH_VERIFIER_PREFIX.length) }, v)); } catch (_) { }
        }
    }
    return out;
}
async function _cacheEncKey(userId, key) {
    try {
        const raw = await crypto.subtle.exportKey("raw", key);
        sessionStorage.setItem(AUTH_ENCKEY_PREFIX + userId, _b64(raw));
    } catch (_) { }
}
async function _readCachedEncKey(userId) {
    try {
        const s = sessionStorage.getItem(AUTH_ENCKEY_PREFIX + userId);
        if (!s) return null;
        return await crypto.subtle.importKey("raw", _unb64(s), { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
    } catch (_) { return null; }
}
function _clearCachedEncKey(userId) { try { sessionStorage.removeItem(AUTH_ENCKEY_PREFIX + userId); } catch (_) { } }

async function _supa(path, body, accessToken) {
    const headers = { "Content-Type": "application/json", apikey: SB_KEY };
    if (accessToken) headers.Authorization = "Bearer " + accessToken;
    const r = await fetch(SB_URL + path, { method: "POST", headers, body: JSON.stringify(body) });
    let j = null; try { j = await r.json(); } catch (_) { }
    if (!r.ok) {
        const msg = (j && (j.error_description || j.msg || j.error || j.message)) || ("HTTP " + r.status);
        throw new Error(msg);
    }
    return j || {};
}

// Map an authState-aware Supabase request header bag. When the user is
// signed in we require their JWT — we never fall back to the publishable
// bearer for user-data endpoints (which would silently bypass RLS if it
// were ever enabled and conflate identities).
function _sbHeaders() {
    if (_authState) {
        const h = { "Content-Type": "application/json", apikey: SB_KEY };
        if (_authState.accessToken) h.Authorization = "Bearer " + _authState.accessToken;
        return h;
    }
    return Object.assign({}, SB_HDR);
}

function _setActiveAuthProfile(meta) {
    try {
        const p = loadProfiles();
        const existing = p.profiles.find(x => x.id === meta.userId);
        if (existing) {
            if (meta.displayName) existing.name = meta.displayName;
            if (meta.avatar) existing.avatar = meta.avatar;
        } else {
            p.profiles.push({ id: meta.userId, name: meta.displayName || "Me", avatar: meta.avatar || "🔥", theme: "red" });
        }
        p.activeId = meta.userId;
        saveProfiles(p);
    } catch (_) { }
}

async function authSignUp({ email, password, displayName, avatar, importLocalData }) {
    // Local-only sign-up. Reject if a verifier already exists for this username.
    if (_loadVerifier(email)) throw new Error("That username is already taken on this device.");
    const userId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID()
        : ("u-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10));

    const eSaltBytes = _rand(16); const vSaltBytes = _rand(16);
    const eSalt = _b64(eSaltBytes); const vSalt = _b64(vSaltBytes);
    const encKey = await _deriveEncKey(password, eSaltBytes, PBKDF2_ITER);
    const vBits = await _pbkdf2Bits(password, vSaltBytes, PBKDF2_ITER, 256);

    _saveVerifier(email, {
        vSalt, vIter: PBKDF2_ITER, vHash: _b64(vBits),
        eSalt, eIter: PBKDF2_ITER, userId,
        displayName: displayName || "", avatar: avatar || "🔥",
    });
    try { localStorage.setItem(AUTH_ACTIVE_EMAIL_KEY, email); } catch (_) { }
    await _cacheEncKey(userId, encKey);

    // Optional import of pre-auth local data
    let seed = null;
    if (importLocalData) {
        try {
            const p = loadProfiles();
            const oldId = p && p.activeId;
            if (oldId && oldId !== userId) {
                const raw = localStorage.getItem(profileStorageKey(oldId));
                if (raw) seed = JSON.parse(raw);
            }
        } catch (_) { }
    }
    if (!seed) seed = makeData();
    seed.user = Object.assign({}, seed.user, {
        displayName: displayName || seed.user.displayName || "",
        avatar: avatar || seed.user.avatar || "🔥",
    });

    _setActiveAuthProfile({ userId, displayName, avatar });
    try { localStorage.setItem(profileStorageKey(userId), JSON.stringify(seed)); } catch (_) { }

    setAuthState({
        userId, email, displayName, avatar,
        encKey, encSalt: eSalt, encIter: PBKDF2_ITER,
    });
    return { needsConfirm: false, userId, email };
}

// Local-only sign-in: verifies the password against the per-username
// verifier and derives the AES key. No network, no Supabase.
async function authSignInOffline(email, password) {
    const v = _loadVerifier(email);
    if (!v) throw new Error("No account found with that username on this device.");
    const bits = await _pbkdf2Bits(password, _unb64(v.vSalt), v.vIter || PBKDF2_ITER, 256);
    if (_b64(bits) !== v.vHash) throw new Error("Wrong password.");
    const encKey = await _deriveEncKey(password, _unb64(v.eSalt), v.eIter || PBKDF2_ITER);
    try { localStorage.setItem(AUTH_ACTIVE_EMAIL_KEY, email); } catch (_) { }
    await _cacheEncKey(v.userId, encKey);
    _setActiveAuthProfile({ userId: v.userId, displayName: v.displayName, avatar: v.avatar });
    setAuthState({
        userId: v.userId, email,
        encKey, encSalt: v.eSalt, encIter: v.eIter || PBKDF2_ITER,
        displayName: v.displayName, avatar: v.avatar,
    });
}
// Online alias kept for callsites; local-only now.
const authSignInOnline = authSignInOffline;

async function authRecover(_email) {
    throw new Error("This app uses zero-knowledge encryption — passwords can't be recovered. Without it, your data is permanently locked.");
}

function authSignOut() {
    const s = _authState;
    if (s) {
        _clearCachedEncKey(s.userId);
        // Wipe local plaintext copies — otherwise the next person on this
        // device could read the dashboard from localStorage.
        try { localStorage.removeItem(profileStorageKey(s.userId)); } catch (_) { }
        try { localStorage.removeItem(profileCloudStateKey(s.userId)); } catch (_) { }
    }
    _clearSession();
    try { localStorage.removeItem(AUTH_ACTIVE_EMAIL_KEY); } catch (_) { }
    setAuthState(null);
}

async function authBootstrap() {
    const activeEmail = (function () { try { return localStorage.getItem(AUTH_ACTIVE_EMAIL_KEY); } catch (_) { return null; } })();
    if (!activeEmail) return false;
    const v = _loadVerifier(activeEmail);
    if (!v) return false;
    const cached = await _readCachedEncKey(v.userId);
    if (!cached) return false;
    _setActiveAuthProfile({ userId: v.userId, displayName: v.displayName, avatar: v.avatar });
    setAuthState({
        userId: v.userId, email: activeEmail,
        encKey: cached, encSalt: v.eSalt, encIter: v.eIter || PBKDF2_ITER,
        displayName: v.displayName, avatar: v.avatar,
    });
    return true;
}

async function _encryptedSbSave(data) {
    if (!_authState || !_authState.encKey) throw new Error("Not signed in");
    if (!_authState.accessToken) throw new Error("not_authenticated"); // offline / token cleared — caller retries when online
    const { iv, ct } = await _aesEncrypt(_authState.encKey, JSON.stringify(data));
    const blob = { v: 1, eSalt: _authState.encSalt, eIter: _authState.encIter, iv, ct };
    const r = await fetch(`${SB_URL}/rest/v1/lifesync`, {
        method: "POST",
        headers: Object.assign({}, _sbHeaders(), { Prefer: "resolution=merge-duplicates" }),
        body: JSON.stringify({ user_id: _authState.userId, data: blob, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error("sb_" + r.status);
}
async function _encryptedSbLoad() {
    if (!_authState || !_authState.encKey) return null;
    if (!_authState.accessToken) return null;
    const r = await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${_authState.userId}&select=data`, { headers: _sbHeaders() });
    if (!r.ok) return null;
    const rows = await r.json();
    const blob = rows && rows[0] && rows[0].data;
    if (!blob) return null;
    if (blob.v !== 1 || !blob.iv || !blob.ct) return blob; // legacy plaintext — let merge logic decide
    try { return JSON.parse(await _aesDecrypt(_authState.encKey, blob.iv, blob.ct)); }
    catch (_) { return null; }
}
function _encryptedSbFlushKeepalive(data) {
    if (!_authState || !_authState.encKey) return false;
    // SubtleCrypto is async; fire encrypt-then-keepalive-post and hope the
    // browser flushes the request before unload completes. Modern Chrome /
    // Safari give us ~30s for keepalive requests.
    _aesEncrypt(_authState.encKey, JSON.stringify(data)).then(({ iv, ct }) => {
        const blob = { v: 1, eSalt: _authState.encSalt, eIter: _authState.encIter, iv, ct };
        try {
            fetch(`${SB_URL}/rest/v1/lifesync`, {
                method: "POST",
                headers: Object.assign({}, _sbHeaders(), { Prefer: "resolution=merge-duplicates" }),
                body: JSON.stringify({ user_id: _authState.userId, data: blob, updated_at: new Date().toISOString() }),
                keepalive: true,
            }).catch(() => { });
        } catch (_) { }
    }).catch(() => { });
    return true;
}

// Auth-aware persistence wrappers. When signed in: encrypted path. When not:
// REFUSE to read/write cloud — the app requires auth now. Pre-auth callers
// (boot ordering) get nulls / silent no-ops rather than leaking plaintext.
// Local-only build: no cloud sync. All data lives in localStorage and is
// gated behind the per-username PBKDF2-derived encryption key (still useful
// for the encKey check that gates the app while signed in).
async function sbLoad() { return null; }
async function sbSave(_d) { return; }
function sbFlushKeepalive(_d) { return false; }
// Returns true only when the data row contains real user-created content.
// Importantly, the default empty profile ships with a seeded Luna greeting in
// `messages` and an empty `journal.entries`, so we must NOT count the bare
// presence of `messages` and we must read journal entries from `.entries`.
function hasMeaningfulContent(d) {
    if (!d || !d.user) return false;
    if (d.user.onboarded === true) return true;
    const counts = [
        (d.habits || []).length,
        ((d.fitness || {}).workouts || []).length,
        ((d.nutrition || {}).logs || []).length,
        (((d.journal || {}).entries) || []).length,
        ((d.budget || {}).transactions || []).length,
        (d.goals || []).length,
        ((d.sleep || {}).logs || []).length,
        // Exclude the seeded Luna greeting — only count user-driven message growth.
        Math.max(0, ((d.messages || []).length) - 1),
    ];
    return counts.some(n => n > 0);
}
// ══ ONBOARDING ════════════════════════════════════════════════════════════════
// Computes BMR using Mifflin-St Jeor, multiplies by activity factor, then
// applies cut/bulk adjustment. Returns target calories + macros.
function computeTargets(p) {
    var _a, _b, _c;
    const age = +p.age || 25;
    const h = +p.heightCm || 170;
    const w = +p.weightKg || 70;
    const sex = p.gender === "male" ? "m" : p.gender === "female" ? "f" : "n";
    const bmr = sex === "m" ? 10 * w + 6.25 * h - 5 * age + 5
              : sex === "f" ? 10 * w + 6.25 * h - 5 * age - 161
                            : 10 * w + 6.25 * h - 5 * age - 78;
    const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, "very-active": 1.9 };
    const tdee = bmr * ((_a = factors[p.activityLevel]) !== null && _a !== void 0 ? _a : 1.55);
    const adj = p.goalMode === "cut" ? -300 : p.goalMode === "bulk" ? 300 : 0;
    const cal = Math.round((tdee + adj) / 10) * 10;
    // Macros: protein 1g/lb of bodyweight, fat 25% of cals, rest carbs
    const lbs = w * 2.205;
    const protein = Math.round(lbs);
    const fat = Math.round((cal * 0.25) / 9);
    const carbs = Math.max(0, Math.round((cal - protein * 4 - fat * 9) / 4));
    return { calorieGoal: cal, proteinGoal: protein, carbsGoal: carbs, fatGoal: fat, tdee: Math.round(tdee), bmr: Math.round(bmr) };
}
function OnboardingFlow({ onComplete }) {
    const [step, setStep] = useState(0);
    const [p, setP] = useState({
        displayName: "Kam", gender: "", pronouns: "",
        age: "", heightCm: "", weightKg: "", weightUnit: "lbs", heightUnit: "ft",
        heightFt: "", heightIn: "",
        activityLevel: "moderate", goalMode: "maintain", primaryGoals: [],
    });
    const upd = (patch) => setP(x => Object.assign({}, x, patch));
    const toggle = (g) => setP(x => Object.assign({}, x, { primaryGoals: x.primaryGoals.includes(g) ? x.primaryGoals.filter(z => z !== g) : x.primaryGoals.concat(g) }));
    const steps = [
        { title: "Welcome to LifeSync ✨", sub: "Let's set things up so I can actually help you. Takes 60 seconds.", canNext: true },
        { title: "What should I call you?", sub: "This is how the app will greet you everywhere.", canNext: p.displayName.trim().length > 0 },
        { title: "How do you identify?", sub: "Used for cycle tracking visibility and tone — purely your call.", canNext: !!p.gender },
        { title: "A bit about your body", sub: "Used to calculate your calorie & macro targets. Stays on your device.", canNext: +p.age > 0 && +p.weightKg > 0 && (p.heightUnit === "cm" ? +p.heightCm > 0 : (+p.heightFt > 0)) },
        { title: "How active are you?", sub: "Be honest — undershooting is better than overshooting.", canNext: !!p.activityLevel },
        { title: "What's your goal right now?", sub: "Cutting trims 300 cal/day. Bulking adds 300. You can change this anytime.", canNext: !!p.goalMode },
        { title: "What matters most to you?", sub: "Pick anything you want to focus on. Multi-select.", canNext: p.primaryGoals.length > 0 },
        { title: "All set, " + (p.displayName || "friend") + " 🌟", sub: "Your targets are calculated. Hit Finish to jump in.", canNext: true },
    ];
    const cur = steps[step];
    const finish = () => {
        // Normalize height to cm
        let hCm = +p.heightCm;
        if (p.heightUnit === "ft") {
            const ft = +p.heightFt || 0, inch = +p.heightIn || 0;
            hCm = Math.round((ft * 12 + inch) * 2.54);
        }
        // Normalize weight to kg
        let wKg = +p.weightKg;
        if (p.weightUnit === "lbs") wKg = +p.weightKg / 2.205;
        const profile = Object.assign({}, p, { heightCm: hCm, weightKg: wKg });
        const targets = computeTargets(profile);
        onComplete({ profile, targets });
    };
    const previewTargets = step >= 6 ? (() => {
        let hCm = +p.heightCm;
        if (p.heightUnit === "ft") hCm = Math.round(((+p.heightFt || 0) * 12 + (+p.heightIn || 0)) * 2.54);
        let wKg = p.weightUnit === "lbs" ? (+p.weightKg / 2.205) : +p.weightKg;
        return computeTargets(Object.assign({}, p, { heightCm: hCm, weightKg: wKg }));
    })() : null;
    const goalOpts = [
        { id: "fitness", label: "Fitness & workouts", emoji: "💪" },
        { id: "nutrition", label: "Nutrition & macros", emoji: "🥗" },
        { id: "skincare", label: "Skincare", emoji: "✨" },
        { id: "sleep", label: "Better sleep", emoji: "😴" },
        { id: "mood", label: "Mood & journaling", emoji: "📓" },
        { id: "budget", label: "Budget & money", emoji: "💰" },
        { id: "habits", label: "Daily habits", emoji: "🔥" },
        { id: "body", label: "Body composition", emoji: "⚖️" },
    ];
    const genderOpts = [
        { id: "male", label: "Male", emoji: "♂" },
        { id: "female", label: "Female", emoji: "♀" },
        { id: "non-binary", label: "Non-binary", emoji: "⚧" },
        { id: "prefer-not-to-say", label: "Prefer not to say", emoji: "•" },
    ];
    const activityOpts = [
        { id: "sedentary", label: "Sedentary", sub: "Desk job, little movement" },
        { id: "light", label: "Light", sub: "Light exercise 1–3×/wk" },
        { id: "moderate", label: "Moderate", sub: "Exercise 3–5×/wk" },
        { id: "active", label: "Active", sub: "Hard training 6–7×/wk" },
        { id: "very-active", label: "Athlete", sub: "2x/day or physical job" },
    ];
    const goalModeOpts = [
        { id: "cut", label: "Cutting", emoji: "🔥", sub: "Lose fat (−300 cal/day)" },
        { id: "maintain", label: "Maintaining", emoji: "⚖️", sub: "Stay where you are" },
        { id: "bulk", label: "Bulking", emoji: "📈", sub: "Build muscle (+300 cal/day)" },
    ];
    return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", zIndex: 1 } },
        React.createElement("style", null, CSS),
        React.createElement("style", null, themeCSS(getActiveProfile().theme || "red")),
        React.createElement("div", { className: "orb orb1" }),
        React.createElement("div", { className: "orb orb2" }),
        React.createElement("div", { className: "orb orb3" }),
        React.createElement("div", { className: "card", style: { maxWidth: 520, width: "100%", padding: 28 } },
            React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 20 } },
                steps.map((_, i) => React.createElement("div", { key: i, style: { flex: 1, height: 3, borderRadius: 2, background: i <= step ? "var(--violet)" : "var(--surface3)", transition: "background 0.3s" } }))),
            React.createElement("h2", { style: { fontFamily: "'DM Serif Display',serif", fontSize: 26, marginBottom: 6, lineHeight: 1.2 } }, cur.title),
            React.createElement("p", { style: { color: "var(--text-muted)", fontSize: 13.5, marginBottom: 22, lineHeight: 1.5 } }, cur.sub),
            // Step content
            step === 0 && React.createElement("div", { style: { fontSize: 60, textAlign: "center", padding: "20px 0" } }, "🔥"),
            step === 1 && React.createElement("div", null,
                React.createElement("label", { className: "label" }, "Your name or nickname"),
                React.createElement("input", { className: "inp", value: p.displayName, autoFocus: true, onChange: e => upd({ displayName: e.target.value }), placeholder: "Kam", style: { fontSize: 16 } })),
            step === 2 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                genderOpts.map(o => React.createElement("button", { key: o.id, className: "btn", style: { padding: "14px 16px", textAlign: "left", justifyContent: "flex-start", border: p.gender === o.id ? "2px solid var(--violet)" : "1px solid var(--border)", background: p.gender === o.id ? "rgba(225,29,46,0.12)" : "var(--surface2)" }, onClick: () => upd({ gender: o.id }) },
                    React.createElement("span", { style: { fontSize: 18, marginRight: 10 } }, o.emoji),
                    React.createElement("span", null, o.label))),
                React.createElement("div", { style: { marginTop: 10 } },
                    React.createElement("label", { className: "label" }, "Pronouns (optional)"),
                    React.createElement("input", { className: "inp", value: p.pronouns, onChange: e => upd({ pronouns: e.target.value }), placeholder: "she/her, he/him, they/them…" }))),
            step === 3 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
                React.createElement("div", null,
                    React.createElement("label", { className: "label" }, "Age"),
                    React.createElement("input", { className: "inp", type: "number", value: p.age, onChange: e => upd({ age: e.target.value }), placeholder: "25" })),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 4 } },
                        React.createElement("span", { className: "label", style: { margin: 0 } }, "Height"),
                        React.createElement("div", { style: { display: "flex", gap: 6 } },
                            ["ft", "cm"].map(u => React.createElement("button", { key: u, className: "btn btn-sm", style: { padding: "4px 10px", background: p.heightUnit === u ? "var(--violet)" : "var(--surface2)", color: p.heightUnit === u ? "#fff" : "var(--text-muted)" }, onClick: () => upd({ heightUnit: u }) }, u)))),
                    p.heightUnit === "cm"
                        ? React.createElement("input", { className: "inp", type: "number", value: p.heightCm, onChange: e => upd({ heightCm: e.target.value }), placeholder: "170" })
                        : React.createElement("div", { style: { display: "flex", gap: 8 } },
                            React.createElement("input", { className: "inp", type: "number", value: p.heightFt, onChange: e => upd({ heightFt: e.target.value }), placeholder: "ft", style: { flex: 1 } }),
                            React.createElement("input", { className: "inp", type: "number", value: p.heightIn, onChange: e => upd({ heightIn: e.target.value }), placeholder: "in", style: { flex: 1 } }))),
                React.createElement("div", null,
                    React.createElement("div", { className: "flex fac fjb", style: { marginBottom: 4 } },
                        React.createElement("span", { className: "label", style: { margin: 0 } }, "Current weight"),
                        React.createElement("div", { style: { display: "flex", gap: 6 } },
                            ["lbs", "kg"].map(u => React.createElement("button", { key: u, className: "btn btn-sm", style: { padding: "4px 10px", background: p.weightUnit === u ? "var(--violet)" : "var(--surface2)", color: p.weightUnit === u ? "#fff" : "var(--text-muted)" }, onClick: () => upd({ weightUnit: u }) }, u)))),
                    React.createElement("input", { className: "inp", type: "number", step: "0.1", value: p.weightKg, onChange: e => upd({ weightKg: e.target.value }), placeholder: p.weightUnit === "lbs" ? "150" : "70" }))),
            step === 4 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                activityOpts.map(o => React.createElement("button", { key: o.id, className: "btn", style: { padding: "12px 14px", textAlign: "left", justifyContent: "flex-start", border: p.activityLevel === o.id ? "2px solid var(--violet)" : "1px solid var(--border)", background: p.activityLevel === o.id ? "rgba(225,29,46,0.12)" : "var(--surface2)" }, onClick: () => upd({ activityLevel: o.id }) },
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, o.label),
                        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 } }, o.sub))))),
            step === 5 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                goalModeOpts.map(o => React.createElement("button", { key: o.id, className: "btn", style: { padding: "14px 16px", textAlign: "left", justifyContent: "flex-start", border: p.goalMode === o.id ? "2px solid var(--violet)" : "1px solid var(--border)", background: p.goalMode === o.id ? "rgba(225,29,46,0.12)" : "var(--surface2)" }, onClick: () => upd({ goalMode: o.id }) },
                    React.createElement("span", { style: { fontSize: 20, marginRight: 12 } }, o.emoji),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, o.label),
                        React.createElement("div", { style: { fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 } }, o.sub))))),
            step === 6 && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
                goalOpts.map(o => React.createElement("button", { key: o.id, className: "btn", style: { padding: "12px 10px", textAlign: "left", justifyContent: "flex-start", border: p.primaryGoals.includes(o.id) ? "2px solid var(--violet)" : "1px solid var(--border)", background: p.primaryGoals.includes(o.id) ? "rgba(225,29,46,0.12)" : "var(--surface2)" }, onClick: () => toggle(o.id) },
                    React.createElement("span", { style: { fontSize: 16, marginRight: 8 } }, o.emoji),
                    React.createElement("span", { style: { fontSize: 12.5 } }, o.label)))),
            step === 7 && previewTargets && React.createElement("div", { style: { background: "var(--surface2)", borderRadius: 14, padding: 18, marginBottom: 8 } },
                React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 } }, "Your daily targets"),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
                    [["Calories", previewTargets.calorieGoal + " kcal"], ["Protein", previewTargets.proteinGoal + " g"], ["Carbs", previewTargets.carbsGoal + " g"], ["Fat", previewTargets.fatGoal + " g"]].map(([l, v]) => React.createElement("div", { key: l },
                        React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, l),
                        React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: "var(--violet)" } }, v)))),
                React.createElement("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 12, lineHeight: 1.5 } }, "TDEE: " + previewTargets.tdee + " kcal · " + (p.goalMode === "cut" ? "−300 cal cut" : p.goalMode === "bulk" ? "+300 cal bulk" : "maintain"))),
            // Nav buttons
            React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 24 } },
                step > 0 && React.createElement("button", { className: "btn btn-s", onClick: () => setStep(step - 1), style: { flex: "0 0 auto", padding: "12px 18px" } }, "← Back"),
                step < steps.length - 1
                    ? React.createElement("button", { className: "btn btn-p", onClick: () => cur.canNext && setStep(step + 1), disabled: !cur.canNext, style: { flex: 1, padding: "12px 18px", opacity: cur.canNext ? 1 : 0.5 } }, step === 0 ? "Get started" : "Continue →")
                    : React.createElement("button", { className: "btn btn-p", onClick: finish, style: { flex: 1, padding: "12px 18px" } }, "Finish ✨"))));
}
function SaveStatusPill({ status, expanded }) {
    const cfg = status === "saved" ? { label: "Saved ✓", color: "var(--mint)", bg: "rgba(74,222,128,0.12)" }
        : status === "saving" ? { label: "Saving…", color: "var(--gold)", bg: "rgba(251,191,36,0.14)" }
        : status === "local-error" ? { label: "Not saved ⚠", color: "var(--rose)", bg: "rgba(255,51,68,0.16)" }
        : { label: "Cloud offline", color: "var(--peach)", bg: "rgba(255,107,107,0.14)" };
    return React.createElement("span", {
        title: status === "saved" ? "Your data is saved locally and to the cloud"
            : status === "saving" ? "Saving your latest change…"
            : status === "local-error" ? "Browser storage is full or blocked — changes will be lost on refresh"
            : "Saved locally, cloud sync failed",
        style: {
            marginLeft: "auto",
            fontSize: expanded ? 10 : 9, fontWeight: 700,
            color: cfg.color, background: cfg.bg,
            padding: expanded ? "3px 8px" : "3px 5px",
            borderRadius: 999, whiteSpace: "nowrap",
            border: `1px solid ${cfg.color}`,
            opacity: 0.95,
        }
    }, expanded ? cfg.label : (status === "saved" ? "✓" : status === "saving" ? "…" : "⚠"));
}
// ══ AUTH GATE ════════════════════════════════════════════════════════════════
function AuthGate({ children }) {
    const [authReady, setAuthReady] = useState(false);
    const [authed, setAuthed] = useState(false);
    const [mode, setMode] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [importLocal, setImportLocal] = useState(true);
    const [hasLocalData, setHasLocalData] = useState(false);
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        (async () => {
            const ok = await authBootstrap();
            setAuthed(!!ok);
            // Pre-fill username
            try {
                const active = localStorage.getItem(AUTH_ACTIVE_EMAIL_KEY);
                if (active) setEmail(_displayLogin(active));
                else {
                    const list = _listVerifiers();
                    if (list[0]) setEmail(_displayLogin(list[0].email));
                }
            } catch (_) { }
            // Detect pre-auth local data to offer migration
            try {
                const p = loadProfiles();
                if (p && p.activeId) {
                    const raw = localStorage.getItem(profileStorageKey(p.activeId));
                    if (raw) {
                        const d = JSON.parse(raw);
                        if (hasMeaningfulContent(d)) setHasLocalData(true);
                    }
                }
            } catch (_) { }
            setAuthReady(true);
        })();
        const onAuth = () => setAuthed(!!getAuthState());
        window.addEventListener("lifesync:auth-changed", onAuth);
        return () => {
            window.removeEventListener("lifesync:auth-changed", onAuth);
        };
    }, []);

    if (!authReady) {
        return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 13 } }, "Loading…");
    }
    if (authed) return children;

    const submit = async (ev) => {
        if (ev && ev.preventDefault) ev.preventDefault();
        setErr(""); setInfo(""); setBusy(true);
        try {
            const raw = email.trim().toLowerCase();
            if (!raw || !password) throw new Error("Username and password are required.");
            if (!USERNAME_RE.test(raw)) {
                throw new Error("Username must be 2-32 chars: letters, numbers, dot, underscore, or hyphen (start/end with letter or number).");
            }
            const em = _normalizeLogin(raw);
            if (mode === "signup") {
                if (password.length < 8) throw new Error("Password must be at least 8 characters.");
                if (!displayName.trim()) throw new Error("Pick a display name.");
                await authSignUp({ email: em, password, displayName: displayName.trim(), avatar: "🔥", importLocalData: hasLocalData && importLocal });
            } else {
                await authSignInOffline(em, password);
            }
        } catch (e) {
            setErr(String(e && e.message || e));
        }
        setBusy(false);
    };

    const card = (innerEls) => React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, background: "var(--bg)", color: "#fff" } },
        React.createElement("div", { className: "card", style: { width: "100%", maxWidth: 380, padding: 24, color: "#fff" } }, innerEls));

    const title = mode === "signup" ? "Create account" : "Welcome back";
    const sub = mode === "signup"
        ? "Local-only & encrypted. Your data is unreadable without your password — even to us."
        : "Sign in to unlock your data.";

    return card(React.createElement(React.Fragment, null,
        React.createElement("div", { style: { textAlign: "center", marginBottom: 18 } },
            React.createElement("div", { style: { fontSize: 36, marginBottom: 6 } }, "🌸"),
            React.createElement("div", { style: { fontWeight: 800, fontSize: 20, marginBottom: 4 } }, "LifeSync"),
            React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 } }, sub)),

        React.createElement("div", { style: { fontWeight: 700, fontSize: 14, marginBottom: 12 } }, title),

        React.createElement("form", { onSubmit: submit, style: { display: "flex", flexDirection: "column", gap: 10 } },
            mode === "signup" && React.createElement("input", { className: "inp", placeholder: "Display name", value: displayName, onChange: e => setDisplayName(e.target.value), autoComplete: "name" }),
            React.createElement("input", { className: "inp", type: "text", placeholder: "Username", value: email, onChange: e => setEmail(e.target.value), autoComplete: "username", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, autoFocus: !email }),
            React.createElement("input", { className: "inp", type: "password", placeholder: mode === "signup" ? "Choose a password (8+ chars)" : "Password", value: password, onChange: e => setPassword(e.target.value), autoComplete: mode === "signup" ? "new-password" : "current-password", autoFocus: !!email }),

            mode === "signup" && hasLocalData && React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.4, cursor: "pointer" } },
                React.createElement("input", { type: "checkbox", checked: importLocal, onChange: e => setImportLocal(e.target.checked), style: { marginTop: 2 } }),
                React.createElement("span", null, "Import the data I already have on this device into my new account.")),

            mode === "signup" && React.createElement("div", { style: { fontSize: 10.5, color: "var(--text-dim)", lineHeight: 1.5, background: "var(--surface2)", padding: "8px 10px", borderRadius: 8, marginTop: 2 } },
                "⚠ Your password is the encryption key. If you forget it, your data is gone — there's no recovery. Use a password manager."),

            err && React.createElement("div", { style: { fontSize: 12, color: "var(--rose)", lineHeight: 1.45, background: "rgba(225,29,46,0.08)", border: "1px solid rgba(225,29,46,0.3)", borderRadius: 8, padding: "8px 10px" } }, err),
            info && React.createElement("div", { style: { fontSize: 12, color: "var(--mint)", lineHeight: 1.45, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "8px 10px" } }, info),

            React.createElement("button", { type: "submit", className: "btn btn-p w100", disabled: busy, style: { padding: "11px", marginTop: 4 } },
                busy ? "Working…" : (mode === "signup" ? "Create account" : "Sign in"))),

        React.createElement("div", { style: { marginTop: 14, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12 } },
            mode === "signup"
                ? React.createElement("button", { className: "btn btn-s", onClick: () => { setMode("signin"); setErr(""); setInfo(""); }, style: { fontSize: 11.5, padding: "6px 10px" } }, "I already have an account")
                : React.createElement("button", { className: "btn btn-s", onClick: () => { setMode("signup"); setErr(""); setInfo(""); }, style: { fontSize: 11.5, padding: "6px 10px" } }, "Create account"))
    ));
}

// One-time hydration normalizer. Ensures fields added in later versions
// (currently: nutrition.recipes) are always present on legacy profiles so
// downstream code can rely on a stable shape without per-read fallbacks.
function normalizeLoadedData(d) {
    if (!d || typeof d !== "object") return d;
    if (d.nutrition && typeof d.nutrition === "object") {
        if (!Array.isArray(d.nutrition.recipes)) d.nutrition.recipes = [];
    }
    if (d.fitness && typeof d.fitness === "object") {
        if (!Array.isArray(d.fitness.routines)) d.fitness.routines = [];
        // One-time upgrade: lift legacy string-only templates into structured
        // routines so users carry over their saved workouts when the new
        // Routines UI ships. Gated by an explicit marker so that if a user
        // later deletes their routines, we don't resurrect them on next load.
        if (!d.fitness.routinesMigratedFromTemplates) {
            if (d.fitness.routines.length === 0 && Array.isArray(d.fitness.templates) && d.fitness.templates.length) {
                d.fitness.routines = d.fitness.templates.map((t, i) => ({
                    id: `migrated_${i + 1}_${Date.now().toString(36)}`,
                    name: t.name || "Routine",
                    emoji: t.emoji || "🏋️",
                    type: "Strength",
                    exercises: (Array.isArray(t.exercises) ? t.exercises : []).map(s => parseExerciseString(s) || { name: String(s || ""), sets: 0, reps: "", weight: "", rest: "", notes: "" }),
                    createdAt: new Date().toISOString(),
                }));
            }
            d.fitness.routinesMigratedFromTemplates = true;
        }
    }
    if (d.budget && typeof d.budget === "object") {
        if (!Array.isArray(d.budget.accounts)) d.budget.accounts = [];
        if (!Array.isArray(d.budget.recurring)) d.budget.recurring = [];
        if (!Array.isArray(d.budget.transactions)) d.budget.transactions = [];
        if (!Array.isArray(d.budget.categories)) d.budget.categories = [];
        // Backfill rollover flag on existing categories so downstream code can rely on it.
        d.budget.categories = d.budget.categories.map(c => Object.assign({ rollover: false }, c));
        // One-time accounts migration: create a default Checking account, lift
        // any legacy assets/liabilities entries into accounts, and assign the
        // default accountId to every existing non-transfer transaction. Gated
        // by an explicit marker so deletes don't get resurrected on reload.
        if (!d.budget.accountsMigrated) {
            let defaultId = null;
            if (d.budget.accounts.length === 0) {
                defaultId = newBudgetId();
                d.budget.accounts.push({
                    id: defaultId, name: "Checking", type: "asset", subtype: "checking",
                    openingBalance: 0, color: "var(--mint)", emoji: "🏦",
                    createdAt: new Date().toISOString(),
                });
            } else {
                defaultId = d.budget.accounts[0].id;
            }
            if (Array.isArray(d.budget.assets) && d.budget.assets.length) {
                for (const a of d.budget.assets) {
                    d.budget.accounts.push({
                        id: newBudgetId(), name: a.name || "Asset", type: "asset", subtype: "other_asset",
                        openingBalance: +a.amount || 0, color: "var(--sky)", emoji: a.emoji || "📦",
                        createdAt: new Date().toISOString(),
                    });
                }
            }
            if (Array.isArray(d.budget.liabilities) && d.budget.liabilities.length) {
                for (const l of d.budget.liabilities) {
                    d.budget.accounts.push({
                        id: newBudgetId(), name: l.name || "Liability", type: "liability", subtype: "loan",
                        openingBalance: -Math.abs(+l.amount || 0), color: "var(--rose)", emoji: l.emoji || "💳",
                        createdAt: new Date().toISOString(),
                    });
                }
            }
            d.budget.transactions = d.budget.transactions.map(t =>
                (t && !t.accountId && t.type !== "transfer") ? Object.assign({}, t, { accountId: defaultId }) : t);
            d.budget.accountsMigrated = true;
        }
        // Post any due recurring rules whose nextRunDate has arrived.
        const after = postDueRecurringRules(d);
        if (after !== d) d.budget = after.budget;
    }
    // Schedule slice: backfill shape + one-time seed of a starter routine so
    // the page is usable out of the box. Gated so deletes aren't resurrected.
    if (!d.schedule || typeof d.schedule !== "object") d.schedule = {};
    if (!Array.isArray(d.schedule.blocks)) d.schedule.blocks = [];
    if (!d.schedule.overrides || typeof d.schedule.overrides !== "object") d.schedule.overrides = {};
    if (!d.schedule.settings || typeof d.schedule.settings !== "object") d.schedule.settings = {};
    if (typeof d.schedule.settings.reminderLeadMin !== "number") d.schedule.settings.reminderLeadMin = 10;
    if (!d.schedule.seeded) {
        if (d.schedule.blocks.length === 0) d.schedule.blocks = defaultScheduleBlocks();
        d.schedule.seeded = true;
    }
    return d;
}

function App() {
    const [theme, setThemeState] = useState(() => getActiveProfile().theme || "red");
    const setTheme = (t) => { setThemeState(t); };
    const [data, setData] = useState(() => {
        try {
            const key = profileStorageKey(sbUid());
            let s = localStorage.getItem(key);
            if (!s) {
                try {
                    const legacyRaw = localStorage.getItem("lifesync-v7");
                    if (legacyRaw) {
                        const legacy = JSON.parse(legacyRaw);
                        if (legacy && !legacy.__migrated) {
                            const { __migrated, ...payload } = legacy;
                            const serialized = JSON.stringify(payload);
                            localStorage.setItem(key, serialized);
                            try {
                                localStorage.setItem("lifesync-v7", JSON.stringify({ ...legacy, __migrated: true }));
                            } catch (_b) { }
                            s = serialized;
                        }
                    }
                } catch (_c) { }
            }
            return normalizeLoadedData(s ? JSON.parse(s) : makeData());
        }
        catch (_a) {
            return normalizeLoadedData(makeData());
        }
    });
    const [dbReady, setDbReady] = useState(false);
    // Cloud-failure counter + banner-dismissed flag are persisted per-profile
    // so a refresh during an outage doesn't reset the warning to 0 and hide
    // the banner — which is exactly the moment users are most at risk of
    // losing data. Stored under `lifesync-v7-<id>-cloud-state`.
    const cloudStateKey = profileCloudStateKey(sbUid());
    const readPersistedCloudState = () => {
        try {
            const s = localStorage.getItem(cloudStateKey);
            if (!s) return { failCount: 0, dismissed: false };
            const p = JSON.parse(s) || {};
            const n = +p.failCount;
            return {
                failCount: Number.isFinite(n) && n > 0 ? n : 0,
                dismissed: !!p.dismissed,
            };
        } catch (_a) { return { failCount: 0, dismissed: false }; }
    };
    // Initial saveStatus reflects persisted failure state so the banner
    // (which is gated on `saveStatus !== "saved"`) reappears immediately on
    // reload if the previous session ended with 3+ failures.
    const [saveStatus, setSaveStatus] = useState(() => readPersistedCloudState().failCount >= 3 ? "error" : "saved"); // "saved" | "saving" | "error" | "local-error"
    const [cloudFailCount, setCloudFailCount] = useState(() => readPersistedCloudState().failCount);
    const [cloudBannerDismissed, setCloudBannerDismissed] = useState(() => readPersistedCloudState().dismissed);
    useEffect(() => {
        try {
            if (cloudFailCount === 0 && !cloudBannerDismissed) {
                localStorage.removeItem(cloudStateKey);
            } else {
                localStorage.setItem(cloudStateKey, JSON.stringify({ failCount: cloudFailCount, dismissed: cloudBannerDismissed }));
            }
        } catch (_a) { /* quota / private mode — non-critical */ }
    }, [cloudFailCount, cloudBannerDismissed, cloudStateKey]);
    const [retrying, setRetrying] = useState(false);
    const saveTimer = useRef(null);
    const retryTimer = useRef(null);
    const retryAttempt = useRef(0);
    // Generation token: every edit / manual retry / unmount bumps this so
    // any already-fired-but-still-running retry callback (which clearTimeout
    // can't cancel) becomes a no-op before it touches state or reschedules.
    const retryGen = useRef(0);
    // Single-flight guard so debounced save, manual retry, and background
    // retry never call sbSave concurrently for overlapping data.
    const saveInFlight = useRef(false);
    const mountedRef = useRef(true);
    const dataRef = useRef(data);
    const localErrorShown = useRef(false);
    useEffect(() => { dataRef.current = data; }, [data]);
    // Background auto-retry helper — schedules a fire-and-forget Supabase
    // upsert with exponential backoff (5s → 15s → 60s, capped). On success it
    // clears the retry chain; on failure it schedules the next attempt. The
    // generation token (`retryGen`) ensures in-flight callbacks from a
    // superseded chain can never touch state or revive themselves.
    const scheduleCloudRetry = useCallback(() => {
        clearTimeout(retryTimer.current);
        const delays = [5000, 15000, 60000];
        const delay = delays[Math.min(retryAttempt.current, delays.length - 1)];
        retryAttempt.current += 1;
        const myGen = retryGen.current;
        retryTimer.current = setTimeout(async () => {
            if (myGen !== retryGen.current || !mountedRef.current) return;
            if (saveInFlight.current) {
                // Another save (debounced or manual) is already in-flight —
                // reschedule one step out so we don't pile concurrent upserts.
                if (mountedRef.current && myGen === retryGen.current) scheduleCloudRetry();
                return;
            }
            saveInFlight.current = true;
            try {
                await sbSave(dataRef.current);
                if (myGen !== retryGen.current || !mountedRef.current) return;
                retryAttempt.current = 0;
                setSaveStatus("saved");
                setCloudFailCount(0);
                setCloudBannerDismissed(false);
            } catch (e) {
                console.warn("[LifeSync] auto-retry cloud save failed:", e);
                if (myGen !== retryGen.current || !mountedRef.current) return;
                setSaveStatus("error");
                setCloudFailCount(c => c + 1);
                scheduleCloudRetry();
            } finally {
                saveInFlight.current = false;
            }
        }, delay);
    }, []);
    // Bump generation + clear timers on unmount so any in-flight retry no-ops.
    useEffect(() => () => {
        mountedRef.current = false;
        retryGen.current += 1;
        clearTimeout(retryTimer.current);
        clearTimeout(saveTimer.current);
    }, []);
    // Daily reset at local midnight — clears habit checks, zeros nutrition,
    // empties today's meal log, breaks streaks for habits that weren't done.
    // Runs on mount (catches overnight closes / multi-day absences),
    // re-runs once cloud hydration settles (`dbReady`) so a remote payload
    // carrying a stale `lastResetDate` is normalized before the user
    // interacts with it, on a timer firing each local midnight while the
    // tab is open, and on visibilitychange + focus so a backgrounded tab
    // catches up on return. `check` is idempotent: when the stamp already
    // matches today it returns the same data reference and React bails out.
    useEffect(() => {
        let timer = null;
        const check = () => {
            const today = LOCAL_DAY_KEY();
            setData(d => {
                // `dataIsFromPriorDay` is checked FIRST so an incorrectly-
                // stamped `lastResetDate` (from an earlier broken build that
                // wrote today's key without performing the reset) can't keep
                // the user stuck on yesterday's checks/totals.
                if (dataIsFromPriorDay(d)) return applyDailyReset(d);
                const last = d && d.user && d.user.lastResetDate;
                if (!last) {
                    return Object.assign({}, d, { user: Object.assign({}, d.user || {}, { lastResetDate: today }) });
                }
                if (last !== today) return applyDailyReset(d);
                return d;
            });
        };
        const scheduleMidnight = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                check();
                scheduleMidnight();
            }, MS_TO_NEXT_LOCAL_MIDNIGHT());
        };
        const onVisible = () => {
            if (typeof document === "undefined" || document.visibilityState === "visible") check();
        };
        check();
        scheduleMidnight();
        document.addEventListener("visibilitychange", onVisible);
        window.addEventListener("focus", onVisible);
        return () => {
            clearTimeout(timer);
            document.removeEventListener("visibilitychange", onVisible);
            window.removeEventListener("focus", onVisible);
        };
    }, []);
    // Re-run the daily-reset check the moment hydration completes. Today
    // `sbLoad` is a no-op, but if a remote payload is ever restored it could
    // arrive with a stale `lastResetDate`; this effect normalizes it
    // immediately so the user never sees yesterday's checks/totals on open.
    useEffect(() => {
        if (!dbReady) return;
        const today = LOCAL_DAY_KEY();
        setData(d => {
            if (dataIsFromPriorDay(d)) return applyDailyReset(d);
            const last = d && d.user && d.user.lastResetDate;
            if (!last) return Object.assign({}, d, { user: Object.assign({}, d.user || {}, { lastResetDate: today }) });
            if (last !== today) return applyDailyReset(d);
            return d;
        });
    }, [dbReady]);
    // On first load — pull from Supabase, merge with localStorage. Never replace
    // a locally onboarded / populated profile with an empty or stale remote row.
    useEffect(() => {
        sbLoad().then(remote => {
            if (remote) {
                setData(local => {
                    var _a, _b;
                    const remoteTs = new Date(((_a = remote === null || remote === void 0 ? void 0 : remote.user) === null || _a === void 0 ? void 0 : _a.lastSaved) || 0).getTime();
                    const localTs = new Date(((_b = local === null || local === void 0 ? void 0 : local.user) === null || _b === void 0 ? void 0 : _b.lastSaved) || 0).getTime();
                    const localHasContent = hasMeaningfulContent(local);
                    const remoteHasContent = hasMeaningfulContent(remote);
                    const localOnboarded = !!(local && local.user && local.user.onboarded);
                    const remoteOnboarded = !!(remote && remote.user && remote.user.onboarded);
                    // Hard guard: an onboarded local profile must never be replaced
                    // by a not-onboarded remote, regardless of timestamp.
                    if (localOnboarded && !remoteOnboarded) return local;
                    // Refuse to wipe a populated local profile with an empty remote.
                    if (localHasContent && !remoteHasContent) return local;
                    // Only accept remote when strictly newer AND has content.
                    if (remoteHasContent && remoteTs > localTs) return remote;
                    return local;
                });
            }
            setDbReady(true);
        }).catch(e => { console.warn("[LifeSync] cloud load failed:", e); setDbReady(true); });
    }, []);
    // Save to localStorage instantly + Supabase debounced 800ms.
    // Cloud save is gated on dbReady — until the initial sbLoad() resolves,
    // we MUST NOT push local state up, or a slow remote fetch on a stale
    // device could be lost to a fast local clobber.
    useEffect(() => {
        try {
            localStorage.setItem(profileStorageKey(sbUid()), JSON.stringify(data));
        }
        catch (e) {
            console.error("[LifeSync] localStorage save failed:", e);
            setSaveStatus("local-error");
            if (!localErrorShown.current) {
                localErrorShown.current = true;
                toast("Couldn't save locally — check storage / private mode", "error");
            }
            return;
        }
        if (!dbReady) return;
        setSaveStatus("saving");
        clearTimeout(saveTimer.current);
        // A new edit supersedes any in-flight retry — cancel the timer AND
        // bump the generation so any already-running retry callback no-ops.
        clearTimeout(retryTimer.current);
        retryAttempt.current = 0;
        retryGen.current += 1;
        const myGen = retryGen.current;
        saveTimer.current = setTimeout(async () => {
            if (myGen !== retryGen.current || !mountedRef.current) return;
            if (saveInFlight.current) {
                // Reschedule this debounce one tick out rather than fight an
                // in-flight retry for the same row.
                saveTimer.current = setTimeout(() => {
                    if (myGen === retryGen.current && mountedRef.current) scheduleCloudRetry();
                }, 200);
                return;
            }
            saveInFlight.current = true;
            try {
                await sbSave(dataRef.current);
                if (myGen !== retryGen.current || !mountedRef.current) return;
                setSaveStatus("saved");
                setCloudFailCount(0);
                setCloudBannerDismissed(false);
            }
            catch (e) {
                console.warn("[LifeSync] cloud save failed:", e);
                if (myGen !== retryGen.current || !mountedRef.current) return;
                setSaveStatus("error");
                setCloudFailCount(c => c + 1);
                // Kick off background retry chain; this resolves transient
                // outages (flaky wifi, brief Supabase blips) without the user
                // ever needing to click Retry.
                scheduleCloudRetry();
            }
            finally {
                saveInFlight.current = false;
            }
        }, 800);
    }, [data, dbReady, scheduleCloudRetry]);
    // Flush pending save on tab close / refresh / hide. Uses fetch keepalive
    // (not sendBeacon — beacon can't carry the Supabase Authorization header).
    useEffect(() => {
        let flushed = false; // one-shot guard so pagehide+beforeunload+visibilitychange don't trigger duplicate upserts during teardown
        const flush = () => {
            if (flushed) return;
            if (!dbReady) return; // never push pre-hydration state to cloud
            if (saveStatus === "saved" || saveStatus === "local-error") return;
            flushed = true;
            clearTimeout(saveTimer.current);
            // Fire-and-forget keepalive POST; we can't observe the server response
            // because the page is unloading, so leave saveStatus as "saving" —
            // it will reconcile to "saved" or "error" on the next mount.
            sbFlushKeepalive(dataRef.current);
        };
        const onVis = () => { if (document.visibilityState === "hidden") flush(); };
        window.addEventListener("pagehide", flush);
        window.addEventListener("beforeunload", flush);
        document.addEventListener("visibilitychange", onVis);
        return () => {
            window.removeEventListener("pagehide", flush);
            window.removeEventListener("beforeunload", flush);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, [saveStatus, dbReady]);
    const [page, setPage] = useState("dashboard");
    const [expanded, setExpanded] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    // ── Pinch-zoom recovery ──────────────────────────────────────────────────
    // If the user gets stuck zoomed-in (e.g. pinched a chart or an old build
    // that auto-zoomed an input), we briefly clamp the viewport's
    // maximum-scale to 1 on tab change. Most mobile browsers honor this in
    // real time and snap the page back to 100%; we then restore scaling so
    // intentional pinch-zoom remains available on charts/images.
    useEffect(() => {
        try {
            const meta = document.querySelector('meta[name="viewport"]');
            if (!meta) return;
            const restore = "width=device-width,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover";
            meta.setAttribute("content", "width=device-width,initial-scale=1.0,maximum-scale=1.0,viewport-fit=cover");
            const t = setTimeout(() => meta.setAttribute("content", restore), 350);
            return () => clearTimeout(t);
        } catch (_a) { /* no-op */ }
    }, [page]);
    // ── :has() fallback: toggle body.modal-open when any overlay mounts ──────
    // Safari < 15.4 / Firefox < 121 don't support `body:has(.overlay)`.
    // A MutationObserver gives us a reliable cross-browser scroll-lock so the
    // background page can't scroll while a modal is open.
    useEffect(() => {
        try {
            // NOTE: the module-scope `CSS` const is the app's stylesheet
            // string; use `window.CSS` to get the actual feature-detection API.
            const wCSS = typeof window !== "undefined" ? window.CSS : null;
            const supportsHas = !!(wCSS && wCSS.supports && wCSS.supports("selector(body:has(.overlay))"));
            if (supportsHas) return;
            const update = () => {
                const open = !!document.querySelector(".overlay, .search-bar");
                document.body.classList.toggle("modal-open", open);
            };
            const mo = new MutationObserver(update);
            mo.observe(document.body, { childList: true, subtree: true });
            update();
            return () => mo.disconnect();
        } catch (_a) { /* no-op */ }
    }, []);
    const { toasts, toast } = useToast();
    // Background Zepp sync
    useZeppSync(setData, toast);
    // Background Apple Health (Health Auto Export) sync
    useHealthWebhookSync(setData, toast);
    // PWA: service worker, install prompt, notifications
    const { installed, installPrompt, notifStatus, requestNotifs, install } = usePWA(data, toast);
    useEffect(() => {
        const h = e => {
            var _a, _b;
            if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName)) {
                e.preventDefault();
                setSearchOpen(true);
                return;
            }
            if (e.key === "Escape") {
                setSearchOpen(false);
                return;
            }
            if (e.ctrlKey || e.metaKey)
                return;
            const sc = { d: "dashboard", h: "habits", n: "nutrition", f: "fitness", b: "budget", g: "goals", a: "ai", p: "progress", s: "settings" };
            if (sc[e.key] && !["INPUT", "TEXTAREA"].includes((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.tagName))
                setPage(sc[e.key]);
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, []);
    const retryCloudSave = useCallback(async () => {
        if (retrying || saveInFlight.current) return;
        setRetrying(true);
        setSaveStatus("saving");
        // Cancel any pending background retry + debounced save and bump the
        // generation so neither one fires concurrently with this manual retry.
        clearTimeout(retryTimer.current);
        clearTimeout(saveTimer.current);
        retryGen.current += 1;
        saveInFlight.current = true;
        try {
            await sbSave(dataRef.current);
            retryAttempt.current = 0;
            setSaveStatus("saved");
            setCloudFailCount(0);
            setCloudBannerDismissed(false);
            toast("Cloud sync restored ✓");
        }
        catch (e) {
            console.warn("[LifeSync] manual cloud retry failed:", e);
            setSaveStatus("error");
            setCloudFailCount(c => c + 1);
            toast("Still can't reach the cloud — try again later", "error");
            saveInFlight.current = false;
            // Resume background retries from the next backoff step.
            scheduleCloudRetry();
            return;
        }
        finally {
            setRetrying(false);
        }
        saveInFlight.current = false;
    }, [retrying, toast, scheduleCloudRetry]);
    const exportCloudBackup = useCallback(() => {
        try {
            const url = URL.createObjectURL(new Blob([JSON.stringify(dataRef.current, null, 2)], { type: "application/json" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = `lifesync-backup-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            toast("Backup exported 💾");
        }
        catch (e) {
            console.error("[LifeSync] export failed:", e);
            toast("Export failed", "error");
        }
    }, [toast]);
    const showCloudBanner = cloudFailCount >= 3 && !cloudBannerDismissed && saveStatus !== "saved";
    const setDataStamped = useCallback(updater => {
        setData(prev => {
            const next = typeof updater === "function" ? updater(prev) : updater;
            return Object.assign(Object.assign({}, next), { user: Object.assign(Object.assign({}, next.user), { lastSaved: new Date().toISOString() }) });
        });
    }, []);
    // Gate the app on onboarding completion
    if (!data.user || !data.user.onboarded) {
        return React.createElement(React.Fragment, null,
            React.createElement("style", null, CSS),
            React.createElement("style", null, themeCSS(theme)),
            React.createElement(OnboardingFlow, { onComplete: ({ profile, targets }) => {
                setDataStamped(d => Object.assign({}, d, {
                    user: Object.assign({}, d.user, {
                        name: profile.displayName,
                        displayName: profile.displayName,
                        pronouns: profile.pronouns,
                        age: +profile.age,
                        heightCm: profile.heightCm,
                        weightKg: profile.weightKg,
                        activityLevel: profile.activityLevel,
                        primaryGoals: profile.primaryGoals,
                        goalMode: profile.goalMode,
                        onboarded: true,
                    }),
                    settings: Object.assign({}, d.settings, {
                        gender: profile.gender,
                        weightUnit: profile.weightUnit,
                        calorieGoal: targets.calorieGoal,
                        proteinGoal: targets.proteinGoal,
                        carbsGoal: targets.carbsGoal,
                        fatGoal: targets.fatGoal,
                    }),
                    nutrition: Object.assign({}, d.nutrition, {
                        calories: { current: 0, goal: targets.calorieGoal },
                        protein: { current: 0, goal: targets.proteinGoal },
                        carbs: { current: 0, goal: targets.carbsGoal },
                        fat: { current: 0, goal: targets.fatGoal },
                    }),
                    messages: [{ role: "ai", content: "Hey " + profile.displayName + " ✨ I'm Luna, your wellness AI. Based on your goals (" + profile.primaryGoals.join(", ") + ") and a " + profile.goalMode + " phase, your daily target is " + targets.calorieGoal + " kcal. Ask me anything!" }],
                }));
            }}));
    }
    const props = { data, setData: setDataStamped, toast, setPage };
    const pages = {
        dashboard: React.createElement(DashPage, Object.assign({}, props)), habits: React.createElement(HabitsPage, Object.assign({}, props)), nutrition: React.createElement(NutritionPage, Object.assign({}, props)),
        fitness: React.createElement(FitnessPage, Object.assign({}, props)), skincare: React.createElement(SkincarePage, Object.assign({}, props)), sleep: React.createElement(SleepPage, Object.assign({}, props)),
        body: React.createElement(BodyPage, Object.assign({}, props)), cycle: React.createElement(CyclePage, Object.assign({}, props)), journal: React.createElement(JournalPage, Object.assign({}, props)),
        budget: React.createElement(BudgetPage, Object.assign({}, props)), schedule: React.createElement(SchedulePage, Object.assign({}, props)), goals: React.createElement(GoalsPage, Object.assign({}, props)), progress: React.createElement(ProgressPage, { data: data }),
        checkin: React.createElement(CheckInPage, Object.assign({}, props)), ai: React.createElement(AICoachPage, Object.assign({}, props)), settings: React.createElement(SettingsPage, Object.assign({}, props, { installed: installed, installPrompt: installPrompt, install: install, notifStatus: notifStatus, requestNotifs: requestNotifs, theme: theme, setTheme: setTheme })),
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, CSS),
        React.createElement("style", null, themeCSS(theme)),
        React.createElement("div", { className: "orb orb1" }),
        React.createElement("div", { className: "orb orb2" }),
        React.createElement("div", { className: "orb orb3" }),
        installPrompt && !installed && (React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 3000,
                background: "linear-gradient(135deg,rgba(225,29,46,0.95),rgba(255,51,68,0.95))",
                backdropFilter: "blur(12px)", padding: "11px 20px",
                display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } },
            React.createElement("span", { style: { fontSize: 18 } }, "\uD83C\uDF38"),
            React.createElement("span", { style: { flex: 1, fontSize: 13, fontWeight: 600, color: "#fff" } }, "Add LifeSync to your home screen for the full app experience"),
            React.createElement("button", { onClick: install, style: { background: "#fff", color: "var(--violet)", border: "none", borderRadius: 9, padding: "7px 16px", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 12.5, cursor: "pointer" } }, "Install"),
            React.createElement("button", { onClick: () => setInstallPrompt(null), style: { background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 18, cursor: "pointer", padding: "0 4px" } }, "\u00D7"))),
        showCloudBanner && React.createElement("div", { role: "alert", style: { position: "fixed", top: (installPrompt && !installed) ? 48 : 0, left: 0, right: 0, zIndex: 3000,
                background: "linear-gradient(135deg,rgba(180,30,30,0.96),rgba(255,80,80,0.96))",
                backdropFilter: "blur(12px)", padding: "11px 20px", color: "#fff",
                display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", boxShadow: "0 2px 14px rgba(0,0,0,0.25)" } },
            React.createElement("span", { style: { fontSize: 18 } }, "\u26A0\uFE0F"),
            React.createElement("span", { style: { flex: 1, fontSize: 13, fontWeight: 600, minWidth: 220 } },
                "Cloud sync has failed " + cloudFailCount + " times in a row. Your changes are saved on this device only — export a backup to be safe."),
            React.createElement("button", { onClick: exportCloudBackup, style: { background: "#fff", color: "#b51e1e", border: "none", borderRadius: 9, padding: "7px 14px", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 12.5, cursor: "pointer" } }, "Export data (JSON)"),
            React.createElement("button", { onClick: retryCloudSave, disabled: retrying, style: { background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 9, padding: "7px 14px", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 12.5, cursor: retrying ? "default" : "pointer", opacity: retrying ? 0.6 : 1 } }, retrying ? "Retrying…" : "Retry now"),
            React.createElement("button", { onClick: () => setCloudBannerDismissed(true), "aria-label": "Dismiss", style: { background: "transparent", border: "none", color: "rgba(255,255,255,0.8)", fontSize: 20, cursor: "pointer", padding: "0 4px", lineHeight: 1 } }, "\u00D7")),
        searchOpen && React.createElement(GlobalSearch, { data: data, onNavigate: setPage, onClose: () => setSearchOpen(false) }),
        React.createElement("div", { className: "app" },
            React.createElement("aside", { className: `sidebar ${expanded ? "ex" : ""}`, onMouseEnter: () => setExpanded(true), onMouseLeave: () => setExpanded(false) },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 10 } },
                    React.createElement("div", { className: "s-logo", onClick: () => setPage("dashboard") }, "\uD83C\uDF38"),
                    expanded && React.createElement("span", { className: "s-logo-text" }, "LifeSync"),
                    React.createElement(SaveStatusPill, { status: saveStatus, expanded: expanded })),
                React.createElement("div", { className: "ni", onClick: () => setSearchOpen(true), title: "Search (/)" },
                    React.createElement(Ic, { n: "search", size: 17 }),
                    React.createElement("span", { className: "nl" }, "Search"),
                    expanded && React.createElement("kbd", { style: { marginLeft: "auto", fontSize: 10, color: "var(--text-dim)", fontFamily: "monospace", background: "var(--surface2)", padding: "1px 5px", borderRadius: 4 } }, "/")),
                React.createElement("div", { className: "sdiv" }),
                NAV.slice(0, 3).map(item => React.createElement("div", { key: item.id, className: `ni ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), title: item.label },
                    React.createElement(Ic, { n: item.icon, size: 17 }),
                    React.createElement("span", { className: "nl" }, item.label))),
                React.createElement("div", { className: "sdiv" }),
                NAV.slice(3, 9).filter(item => { var _a; return !(item.id === "cycle" && ((_a = data.settings) === null || _a === void 0 ? void 0 : _a.gender) === "male"); }).map(item => React.createElement("div", { key: item.id, className: `ni ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), title: item.label },
                    React.createElement(Ic, { n: item.icon, size: 17 }),
                    React.createElement("span", { className: "nl" }, item.label))),
                React.createElement("div", { className: "sdiv" }),
                NAV.slice(9).map(item => (React.createElement("div", { key: item.id, className: `ni ${page === item.id ? "active" : ""}`, onClick: () => setPage(item.id), title: item.label },
                    React.createElement(Ic, { n: item.icon, size: 17 }),
                    React.createElement("span", { className: "nl" }, item.label),
                    item.id === "ai" && React.createElement("span", { className: "nbadge" }, "AI")))),
                React.createElement("div", { style: { marginTop: "auto" } },
                    React.createElement("div", { className: "sdiv" }),
                    React.createElement("div", { className: "ni", style: { cursor: "default" } },
                        React.createElement("div", { style: { width: 24, height: 24, borderRadius: "50%", background: "var(--grad-rose)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 } }, data.user.avatar),
                        React.createElement("span", { className: "nl", style: { fontSize: 12, color: "var(--text-muted)" } }, data.user.name)))),
            React.createElement("main", { className: "main", key: page }, pages[page] || pages.dashboard),
            React.createElement("nav", { className: "mob-nav" },
                MOBILE_NAV.map(id => {
                    const item = NAV.find(n => n.id === id);
                    return (React.createElement("div", { key: id, className: `mob-ni ${page === id ? "active" : ""}`, onClick: () => setPage(id) },
                        React.createElement(Ic, { n: item.icon, size: 22, color: page === id ? "var(--violet)" : "var(--text-muted)" }),
                        React.createElement("span", null, item.label)));
                }),
                React.createElement("div", { className: "mob-ni", onClick: () => setSearchOpen(true) },
                    React.createElement(Ic, { n: "search", size: 22, color: "var(--text-muted)" }),
                    React.createElement("span", null, "Search")))),
        React.createElement(Toasts, { toasts: toasts })));
}


    var root = window.createRoot(document.getElementById('root'));
    root.render(React.createElement(AuthGate, null, React.createElement(App)));
    var loader = document.getElementById('loading');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(function(){ loader.remove(); }, 500);
    }
  } catch(e) {
    var el = document.getElementById('err');
    if (el) {
      el.style.display = 'block';
      el.textContent = '⚠ Boot error: ' + e.message + '\n\n' + (e.stack || '');
    }
    console.error(e);
  }
}

if (window.React) {
  bootApp();
} else {
  window.addEventListener('react-ready', bootApp);
  setTimeout(function() {
    if (!window.React) {
      var el = document.getElementById('err');
      if (el) {
        el.style.display = 'block';
        el.textContent = '⚠ React did not load within 10s. Check network and reload.';
      }
    }
  }, 10000);
}
