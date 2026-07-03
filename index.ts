<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>NOXVEX KOL Tracker</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tabler-icons/1.119.0/iconfont/tabler-icons.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#060410;--surface1:#0F0A1E;--surface2:#1A1030;--surface3:#241540;
  --border:#2D1B4E;--border2:#3D2563;
  --text:#F0EAF8;--text2:#9B8EC4;--text3:#6B6280;
  --accent:#D4FF4F;--accent2:#B8E03A;
  --blue:#5BA4F5;--cyan:#4FFFE0;--orange:#FF9E4F;--red:#FF6B6B;--yellow:#FFD166;
  --live:#D4FF4F;--vip:#4FFFE0;--testing:#FF9E4F;--dm:#5BA4F5;--replied:#FFD166;
  --danger:#C0143C;
  --r:10px;--r-sm:6px;--r-xs:4px;
  --font:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--font);font-size:14px;line-height:1.5;overscroll-behavior:none}

/* ── SCROLLBARS ── */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}

/* ── LAYOUT ── */
#app{display:flex;flex-direction:column;height:100vh;max-width:480px;margin:0 auto;position:relative;overflow:hidden}
#header{flex-shrink:0;background:var(--surface1);border-bottom:1px solid var(--border);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;z-index:10}
#content{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:80px}
#nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;background:var(--surface1);border-top:1px solid var(--border);display:flex;z-index:10;padding:8px 0 max(8px,env(safe-area-inset-bottom))}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0;cursor:pointer;color:var(--text3);font-size:10px;font-weight:500;letter-spacing:0.3px;transition:color 0.15s;border:none;background:transparent}
.nav-item.active{color:var(--accent)}
.nav-item i{font-size:20px}
.nav-item .dot{width:4px;height:4px;border-radius:50%;background:var(--danger);position:absolute;top:6px;margin-left:12px}

/* ── HEADER ── */
.logo{display:flex;align-items:center;gap:8px}
.logo-mark{font-size:16px;font-weight:800;letter-spacing:3px;color:var(--accent)}
.logo-sub{font-size:10px;color:var(--text3);letter-spacing:1px}
.header-actions{display:flex;align-items:center;gap:8px}
.alert-badge{background:var(--danger);color:#fff;border-radius:12px;padding:3px 10px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:4px}
.icon-btn{width:36px;height:36px;border-radius:var(--r-sm);background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text2);transition:all .15s}
.icon-btn:hover{background:var(--surface3);color:var(--text)}

/* ── SEARCH BAR ── */
.search-wrap{padding:12px 16px;background:var(--surface1);border-bottom:1px solid var(--border)}
.search-row{display:flex;gap:8px}
.search-input{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-sm);padding:9px 12px 9px 36px;color:var(--text);font-size:13px;outline:none;position:relative;font-family:var(--font)}
.search-input:focus{border-color:var(--border2)}
.search-wrap-inner{position:relative;flex:1}
.search-wrap-inner i{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:16px;pointer-events:none}
.filter-btn{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-sm);padding:9px 12px;color:var(--text2);cursor:pointer;font-size:13px;font-family:var(--font);white-space:nowrap;display:flex;align-items:center;gap:5px;transition:all .15s}
.filter-btn:hover,.filter-btn.active{border-color:var(--accent);color:var(--accent)}

/* ── STATUS PILLS ── */
.pill{display:inline-flex;align-items:center;gap:4px;border-radius:20px;padding:3px 9px;font-size:11px;font-weight:500;white-space:nowrap}
.pill-sm{padding:2px 7px;font-size:10px}
.pill-outline{background:transparent;border:1px solid currentColor;opacity:.7}

/* ── METRIC CARDS ── */
.metrics-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:14px 16px}
.metric-card{background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:14px;position:relative;overflow:hidden}
.metric-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
.metric-card.blue::before{background:var(--blue)}
.metric-card.yellow::before{background:var(--yellow)}
.metric-card.cyan::before{background:var(--cyan)}
.metric-card.accent::before{background:var(--accent)}
.metric-card.orange::before{background:var(--orange)}
.metric-card.red::before{background:var(--red)}
.metric-val{font-size:26px;font-weight:700;line-height:1;margin-bottom:4px}
.metric-label{font-size:11px;color:var(--text3);letter-spacing:0.5px;text-transform:uppercase}
.metric-sub{font-size:10px;color:var(--text3);margin-top:3px}
.metric-trend{font-size:11px;font-weight:600;margin-top:6px}
.metric-trend.up{color:#4ade80}
.metric-trend.down{color:var(--red)}

/* ── SECTIONS ── */
.section{padding:0 16px;margin-bottom:18px}
.section-title{font-size:10px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}
.section-title-action{color:var(--accent);font-size:10px;cursor:pointer;text-transform:none;letter-spacing:0}

/* ── KOL CARDS ── */
.kol-list{display:flex;flex-direction:column;gap:8px;padding:0 16px}
.kol-card{background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:14px;cursor:pointer;transition:border-color .15s;position:relative;overflow:hidden}
.kol-card:hover{border-color:var(--border2)}
.kol-card.due{border-color:var(--danger);box-shadow:0 0 0 1px rgba(192,20,60,0.2)}
.kol-card.live{border-color:rgba(212,255,79,0.3)}
.kol-card-header{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px}
.kol-handle{font-size:15px;font-weight:600;letter-spacing:-0.2px}
.kol-followers{font-size:11px;color:var(--text3);margin-top:2px}
.kol-badges{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.kol-footer{display:flex;align-items:center;justify-content:space-between;margin-top:10px}
.kol-last-contact{font-size:11px;color:var(--text3)}
.kol-actions{display:flex;gap:6px}
.btn-sm{padding:5px 10px;border-radius:var(--r-xs);font-size:11px;font-weight:500;cursor:pointer;border:1px solid;font-family:var(--font);transition:all .15s;display:flex;align-items:center;gap:4px}
.btn-edit{background:var(--surface2);border-color:var(--border2);color:var(--text2)}
.btn-edit:hover{background:var(--surface3);color:var(--text)}
.btn-del{background:rgba(192,20,60,0.1);border-color:rgba(192,20,60,0.3);color:var(--red)}
.btn-del:hover{background:rgba(192,20,60,0.2)}
.kol-score-bar{height:3px;background:var(--surface2);border-radius:3px;margin-top:10px;overflow:hidden}
.kol-score-fill{height:100%;background:linear-gradient(90deg,var(--blue),var(--accent));border-radius:3px;transition:width .4s}
.kol-notes{font-size:11px;color:var(--text2);font-style:italic;margin-top:8px;line-height:1.5;border-left:2px solid var(--border2);padding-left:8px}

/* ── FUNNEL ── */
.funnel-wrap{background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:16px}
.funnel-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.funnel-label{font-size:12px;color:var(--text2);width:90px;flex-shrink:0}
.funnel-bar-wrap{flex:1;background:var(--surface2);border-radius:4px;height:12px;overflow:hidden;position:relative}
.funnel-bar{height:100%;border-radius:4px;transition:width .5s cubic-bezier(.4,0,.2,1)}
.funnel-num{font-size:12px;font-weight:600;width:28px;text-align:right;flex-shrink:0}
.funnel-pct{font-size:10px;color:var(--text3);width:36px;text-align:right;flex-shrink:0}

/* ── ACTIVITY FEED ── */
.feed-item{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.feed-item:last-child{border-bottom:none}
.feed-icon{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px}
.feed-body{flex:1;min-width:0}
.feed-handle{font-size:13px;font-weight:500}
.feed-handle span{font-weight:400;color:var(--text2)}
.feed-time{font-size:11px;color:var(--text3);margin-top:2px}

/* ── TEMPLATE TABLE ── */
.tmpl-row{display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)}
.tmpl-row:last-child{border-bottom:none}
.tmpl-name{font-size:12px;color:var(--text);font-weight:500}
.tmpl-meta{font-size:11px;color:var(--text3)}
.tmpl-bar-wrap{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden;grid-column:span 2;margin:2px 0}
.tmpl-bar{height:100%;background:var(--accent);border-radius:3px}

/* ── STATUS BREAKDOWN ── */
.status-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border)}
.status-row:last-child{border-bottom:none}
.status-bar-wrap{flex:1;height:5px;background:var(--surface2);border-radius:3px;overflow:hidden}
.status-bar{height:100%;border-radius:3px}
.status-ct{font-size:14px;font-weight:600;min-width:20px;text-align:right}

/* ── WEEK CHART ── */
.week-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.week-label{font-size:11px;color:var(--text2);width:68px;flex-shrink:0}
.week-bar-wrap{flex:1;background:var(--surface2);border-radius:4px;height:14px;overflow:hidden}
.week-bar{height:100%;border-radius:4px;transition:width .4s}
.week-num{font-size:12px;font-weight:600;width:20px;text-align:right;flex-shrink:0}

/* ── REVENUE CARD ── */
.rev-card{background:linear-gradient(135deg,var(--surface1) 0%,rgba(212,255,79,0.05) 100%);border:1px solid rgba(212,255,79,0.2);border-radius:var(--r);padding:16px;margin-bottom:10px}
.rev-amount{font-size:32px;font-weight:800;color:var(--accent);letter-spacing:-1px;line-height:1}
.rev-label{font-size:11px;color:var(--text3);margin-top:4px;text-transform:uppercase;letter-spacing:1px}

/* ── FOLLOW-UP ALERT ── */
.follow-up-alert{margin:12px 16px;background:rgba(192,20,60,0.1);border:1px solid rgba(192,20,60,0.4);border-radius:var(--r);padding:12px 14px}
.follow-up-title{color:var(--red);font-size:12px;font-weight:600;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.follow-up-names{display:flex;flex-wrap:wrap;gap:5px}
.follow-up-tag{background:var(--surface2);color:var(--text);border-radius:var(--r-xs);padding:3px 8px;font-size:11px;font-weight:500;cursor:pointer}
.follow-up-tag:hover{background:var(--surface3)}

/* ── ADD/EDIT FORM SHEET ── */
.sheet-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:50;display:flex;flex-direction:column;justify-content:flex-end;opacity:0;pointer-events:none;transition:opacity .25s}
.sheet-overlay.open{opacity:1;pointer-events:all}
.sheet{background:var(--surface1);border-radius:20px 20px 0 0;border-top:1px solid var(--border2);max-height:92vh;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}
.sheet-overlay.open .sheet{transform:translateY(0)}
.sheet-handle{width:36px;height:4px;background:var(--border2);border-radius:4px;margin:10px auto 0}
.sheet-header{padding:14px 16px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);flex-shrink:0}
.sheet-title{font-size:16px;font-weight:700}
.sheet-body{overflow-y:auto;padding:14px 16px;flex:1}
.sheet-footer{padding:12px 16px;border-top:1px solid var(--border);flex-shrink:0;display:flex;gap:8px}
.field-group{margin-bottom:16px}
.field-label{font-size:11px;color:var(--text3);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:6px;font-weight:500}
.field-divider{font-size:11px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;padding:8px 0 6px;border-bottom:1px solid var(--border);margin-bottom:12px;margin-top:6px;display:flex;align-items:center;gap:8px}
.field-divider i{font-size:14px}
input,select,textarea{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-sm);padding:10px 12px;color:var(--text);font-size:13px;font-family:var(--font);outline:none;transition:border-color .15s}
input:focus,select:focus,textarea:focus{border-color:var(--accent)}
select option{background:var(--surface1)}
textarea{min-height:72px;resize:vertical;line-height:1.5}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn-primary{flex:1;background:var(--accent);color:#0a0a0a;border:none;border-radius:var(--r-sm);padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:var(--font);letter-spacing:0.3px;transition:opacity .15s}
.btn-primary:hover{opacity:.9}
.btn-cancel{background:var(--surface2);color:var(--text2);border:1px solid var(--border);border-radius:var(--r-sm);padding:12px 16px;font-size:14px;cursor:pointer;font-family:var(--font);transition:all .15s}
.btn-cancel:hover{background:var(--surface3);color:var(--text)}
.notes-history{background:var(--bg);border-radius:var(--r-sm);padding:10px;margin-bottom:10px;max-height:160px;overflow-y:auto}
.note-entry{font-size:12px;color:var(--text2);padding:5px 0;border-bottom:1px solid var(--border);line-height:1.4}
.note-entry:last-child{border-bottom:none}
.note-date{color:var(--text3);font-size:11px}
.score-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.score-item{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-sm);padding:10px 8px;cursor:pointer;text-align:center;font-size:11px;transition:all .15s;font-weight:500}
.score-item:hover{border-color:var(--border2)}
.score-item.selected{background:rgba(212,255,79,0.1);border-color:var(--accent);color:var(--accent)}

/* ── REFERENCE TAB ── */
.ref-card{background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:14px;margin-bottom:12px}
.ref-title{font-size:11px;color:var(--accent);letter-spacing:1px;text-transform:uppercase;font-weight:600;margin-bottom:12px;display:flex;align-items:center;gap:6px}
.ref-title i{font-size:14px}
.ref-row{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)}
.ref-row:last-child{border-bottom:none}
.ref-label{font-size:13px;font-weight:500}
.ref-desc{font-size:11px;color:var(--text3);margin-top:2px}
.dm-template{background:var(--bg);border-radius:var(--r-sm);border-left:3px solid var(--accent);padding:12px 14px;font-size:12px;color:var(--accent);line-height:1.8;font-family:monospace;white-space:pre-wrap}
.daily-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.daily-num{width:20px;height:20px;background:rgba(212,255,79,0.1);border:1px solid rgba(212,255,79,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--accent);flex-shrink:0}
.daily-text{font-size:12px;color:var(--text2);line-height:1.5}
.dont-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.dont-icon{color:var(--red);font-size:15px;margin-top:1px;flex-shrink:0}

/* ── SORT/FILTER BAR ── */
.sort-bar{display:flex;gap:6px;overflow-x:auto;padding:10px 16px;scrollbar-width:none}
.sort-bar::-webkit-scrollbar{display:none}
.sort-chip{background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:5px 12px;font-size:11px;font-weight:500;color:var(--text3);cursor:pointer;white-space:nowrap;flex-shrink:0;transition:all .15s;font-family:var(--font)}
.sort-chip.active{background:rgba(212,255,79,0.1);border-color:var(--accent);color:var(--accent)}

/* ── VIP TIMER ── */
.vip-timer{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600}
.vip-timer.active{color:var(--cyan)}
.vip-timer.expired{color:var(--red)}

/* ── EMPTY STATE ── */
.empty{text-align:center;padding:48px 16px;color:var(--text3)}
.empty i{font-size:40px;display:block;margin-bottom:12px;color:var(--border2)}
.empty-title{font-size:16px;font-weight:600;color:var(--text2);margin-bottom:6px}
.empty-sub{font-size:13px}

/* ── QUICK-ADD FAB ── */
.fab{position:fixed;bottom:80px;right:50%;transform:translateX(calc(50% - 16px));width:50px;height:50px;border-radius:50%;background:var(--accent);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#0a0a0a;font-size:22px;z-index:9;box-shadow:0 4px 16px rgba(212,255,79,0.3);transition:transform .15s}
.fab:hover{transform:translateX(calc(50% - 16px)) scale(1.08)}
.fab.offset-fab{transform:translateX(calc(50% - 140px))}
.fab.offset-fab:hover{transform:translateX(calc(50% - 140px)) scale(1.08)}

/* ── INSIGHT CHIPS ── */
.insight-strip{display:flex;gap:8px;overflow-x:auto;padding:10px 16px 4px;scrollbar-width:none}
.insight-strip::-webkit-scrollbar{display:none}
.insight-chip{background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:10px 12px;flex-shrink:0;min-width:110px;cursor:default}
.insight-val{font-size:20px;font-weight:700;line-height:1;margin-bottom:3px}
.insight-lbl{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.5px}

/* ── PROGRESS RING ── */
.progress-ring-wrap{display:flex;justify-content:center;margin:4px 0}

/* ── TOAST ── */
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%) translateY(-80px);background:var(--accent);color:#0a0a0a;border-radius:var(--r-sm);padding:10px 18px;font-size:13px;font-weight:600;z-index:100;transition:transform .3s cubic-bezier(.4,0,.2,1);white-space:nowrap}
.toast.show{transform:translateX(-50%) translateY(0)}

/* ── PLATFORM BADGE ── */
.platform-dot{width:6px;height:6px;border-radius:50%;display:inline-block;margin-right:4px}
.platform-dot.tg{background:var(--blue)}
.platform-dot.tw{background:#1D9BF0}
.platform-dot.both{background:var(--accent)}

/* ── HEADER SUBTITLE ── */
.page-sub{font-size:11px;color:var(--text3);padding:8px 16px;letter-spacing:0.2px}

/* ── INLINE LINKS ── */
.link-row{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.link-chip{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r-xs);padding:4px 9px;font-size:11px;color:var(--text2);text-decoration:none;display:inline-flex;align-items:center;gap:4px;transition:all .15s}
.link-chip:hover{border-color:var(--border2);color:var(--text)}

/* ── PAGE TRANSITIONS ── */
.tab-content{animation:fadeIn .15s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}

/* ── HORIZON LINE ── */
hr.divider{border:none;border-top:1px solid var(--border);margin:12px 0}

@media(max-width:360px){
  .metric-val{font-size:22px}
  .kol-handle{font-size:14px}
}
</style>
</head>
<body>
<div id="app">
  <div id="header">
    <div class="logo">
      <span class="logo-mark">NOXVEX</span>
      <span class="logo-sub">KOL TRACKER</span>
    </div>
    <div class="header-actions" id="headerActions"></div>
  </div>
  <div id="content"></div>
  <nav id="nav">
    <button class="nav-item active" onclick="switchTab('dashboard')" id="nav-dashboard">
      <i class="ti ti-chart-bar" aria-hidden="true"></i>
      <span>Dashboard</span>
    </button>
    <button class="nav-item" onclick="switchTab('tracker')" id="nav-tracker">
      <i class="ti ti-target" aria-hidden="true"></i>
      <span>Tracker</span>
      <span class="dot" id="navDot" style="display:none"></span>
    </button>
    <button class="nav-item" onclick="switchTab('pipeline')" id="nav-pipeline">
      <i class="ti ti-git-merge" aria-hidden="true"></i>
      <span>Pipeline</span>
    </button>
    <button class="nav-item" onclick="switchTab('reference')" id="nav-reference">
      <i class="ti ti-book" aria-hidden="true"></i>
      <span>Ref</span>
    </button>
  </nav>
</div>

<!-- FAB -->
<button class="fab" id="fab" onclick="openSheet(null)" aria-label="Add KOL">
  <i class="ti ti-plus" aria-hidden="true"></i>
</button>

<!-- ADD/EDIT SHEET -->
<div class="sheet-overlay" id="sheetOverlay" onclick="maybeCloseSheet(event)">
  <div class="sheet" id="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-header">
      <span class="sheet-title" id="sheetTitle">Add KOL</span>
      <button class="icon-btn" onclick="closeSheet()" aria-label="Close"><i class="ti ti-x" aria-hidden="true"></i></button>
    </div>
    <div class="sheet-body" id="sheetBody"></div>
    <div class="sheet-footer">
      <button class="btn-cancel" onclick="closeSheet()">Cancel</button>
      <button class="btn-primary" onclick="saveKol()" id="saveBtn">Save KOL</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<script>
// ═══════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════
const STATUSES=["Prospect","DM Sent","Replied","VIP Activated","Testing","Negotiating","LIVE","Inactive","Declined","Ghosted"];
const SC={
  "Prospect":{bg:"rgba(155,142,196,0.15)",fg:"#9B8EC4"},
  "DM Sent":{bg:"rgba(91,164,245,0.15)",fg:"#5BA4F5"},
  "Replied":{bg:"rgba(255,209,102,0.15)",fg:"#FFD166"},
  "VIP Activated":{bg:"rgba(79,255,224,0.15)",fg:"#4FFFE0"},
  "Testing":{bg:"rgba(255,158,79,0.15)",fg:"#FF9E4F"},
  "Negotiating":{bg:"rgba(255,184,79,0.15)",fg:"#FFB84F"},
  "LIVE":{bg:"rgba(212,255,79,0.15)",fg:"#D4FF4F"},
  "Inactive":{bg:"rgba(138,138,138,0.15)",fg:"#8A8A8A"},
  "Declined":{bg:"rgba(255,107,107,0.15)",fg:"#FF6B6B"},
  "Ghosted":{bg:"rgba(107,98,128,0.15)",fg:"#6B6280"}
};
const FUNNEL_COLORS={"Prospect":"#9B8EC4","DM Sent":"#5BA4F5","Replied":"#FFD166","VIP Activated":"#4FFFE0","LIVE":"#D4FF4F"};
const TEMPLATES=["A - Personal + Partnership","B - Curiosity Hook","C - Creator-Focused","D - Straight to the Point","E - Social Proof"];
const TEMPLATE_MIGRATE={"A - Aggressive":"A - Personal + Partnership","B - Degen":"B - Curiosity Hook","C - Professional":"C - Creator-Focused","D - Punchy":"D - Straight to the Point","E - Value-first":"E - Social Proof"};
const REPLY_REASONS=["","Interested","Needs Time","Already Has Partner","No Affiliate Program","Too Expensive","No Reply Yet","Other"];
const SCORE_LABELS=["","Low","Medium","High","Very High"];
const SCORE_MAP={"":0,"Low":6,"Medium":13,"High":19,"Very High":25};
const ACT={dm:{icon:"ti-send",bg:"rgba(91,164,245,0.2)",c:"#5BA4F5"},reply:{icon:"ti-message",bg:"rgba(255,209,102,0.2)",c:"#FFD166"},vip:{icon:"ti-star",bg:"rgba(79,255,224,0.2)",c:"#4FFFE0"},live:{icon:"ti-bolt",bg:"rgba(212,255,79,0.2)",c:"#D4FF4F"},note:{icon:"ti-note",bg:"rgba(155,142,196,0.2)",c:"#9B8EC4"}};
const RATES=["30%","35%","40%","45%","50%","55%","60%"];
const PLATFORMS=["Telegram","Twitter/X","Both"];
const FOUND_VIA=["Kolscan","Twitter Search","Telegram Channel","Referral","Other"];
const VIBES=["Degen","Aggressive","Professional","Punchy","Value-first"];

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
let kols=[], tab="dashboard", editId=null, search="", sortBy="recent", filterStatus="", loaded=false;
let form={};

const EMPTY={
  handle:"",platform:"Telegram",followers:"",foundVia:"Telegram Channel",vibe:"Degen",template:"B - Curiosity Hook",
  status:"DM Sent",dateDMSent:todayStr(),replied:"",replyDate:"",replyReason:"",
  rateOffered:"40%",followUpSent:"",nextFollowUp:"",partnerLinkSent:"",
  telegramHandle:"",website:"",vipActivatedDate:"",dateOnboarded:"",monthlyRevenue:"",
  scoreEngagement:"",scoreAudience:"",scoreResponse:"",
  notesTimeline:[],noteDraft:"",vipHours:48,
  priority:""
};

// ═══════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════
function todayStr(){return new Date().toISOString().split("T")[0];}
function daysSince(d){if(!d)return null;return Math.floor((Date.now()-new Date(d))/86400000);}
function hoursSince(d){if(!d)return null;return(Date.now()-new Date(d))/3600000;}
function relTime(d){
  if(!d)return"";
  const h=hoursSince(d);
  if(h<1)return"just now";
  if(h<24)return Math.floor(h)+"h ago";
  const days=Math.floor(h/24);
  if(days===1)return"yesterday";
  if(days<7)return days+"d ago";
  return Math.floor(days/7)+"w ago";
}
function withinDays(d,n){if(!d)return false;const ds=daysSince(d);return ds!==null&&ds<=n&&ds>=0;}
function followerScore(f){const n=Number(f)||0;if(n>=50000)return 25;if(n>=15000)return 18;if(n>=5000)return 12;if(n>0)return 5;return 0;}
function kolScore(k){return followerScore(k.followers)+SCORE_MAP[k.scoreEngagement||""]+SCORE_MAP[k.scoreAudience||""]+SCORE_MAP[k.scoreResponse||""];}
function vipReached(k){return !!k.vipActivatedDate||["VIP Activated","Testing","Negotiating","LIVE","Inactive"].includes(k.status);}
function isFollowUpDue(k){
  if(["LIVE","Declined","Ghosted","Inactive"].includes(k.status))return false;
  if(k.nextFollowUp)return new Date(k.nextFollowUp)<=new Date(todayStr());
  if(!k.dateDMSent||k.replied==="Y")return false;
  if(!k.followUpSent&&daysSince(k.dateDMSent)>=3)return true;
  if(k.followUpSent&&daysSince(k.followUpSent)>=4)return true;
  return false;
}
function vipHoursLeft(k){if(!k.vipActivatedDate)return null;const h=k.vipHours||48;return Math.max(0,Math.round(h-hoursSince(k.vipActivatedDate)));}
function lastContactDate(k){
  const dates=[k.dateDMSent,k.replyDate,k.vipActivatedDate,k.dateOnboarded,k.followUpSent,...((k.notesTimeline||[]).map(n=>n.date))].filter(Boolean);
  if(!dates.length)return null;
  return dates.sort().reverse()[0];
}
function parseRate(r){const n=parseFloat(r);return isNaN(n)?0:n/100;}
function normalizeTemplate(t){if(TEMPLATE_MIGRATE[t])return TEMPLATE_MIGRATE[t];return TEMPLATES.includes(t)?t:EMPTY.template;}
function migrateKol(o){
  const STATUS_MIGRATE={DMd:"DM Sent"};
  const status=STATUS_MIGRATE[o.status]||(STATUSES.includes(o.status)?o.status:"Prospect");
  return {...EMPTY,...o,
    template:normalizeTemplate(o.variant||o.template||EMPTY.template),
    status,
    notesTimeline:o.notesTimeline||(o.notes?[{id:"legacy-"+o.id,date:o.dateDMSent||todayStr(),text:o.notes}]:[]),
    noteDraft:""
  };
}
function fmt(n){return Number(n||0).toLocaleString();}
function fmtFollowers(n){const v=Number(n)||0;if(v>=1000)return(v/1000).toFixed(1).replace(/\.0$/,"")+"k";return v||"";}
function pillar(label,bg,fg,extra=""){
  return `<span class="pill" style="background:${bg};color:${fg}">${extra}${label}</span>`;
}
function platformDot(p){
  if(!p)return"";
  const cls=p==="Telegram"?"tg":p==="Twitter/X"?"tw":"both";
  return `<span class="platform-dot ${cls}"></span>`;
}
function buildActivity(list){
  const events=[];
  list.forEach(k=>{
    if(k.dateDMSent)events.push({date:k.dateDMSent,label:"DM sent",handle:k.handle,type:"dm"});
    if(k.replyDate)events.push({date:k.replyDate,label:"Replied"+(k.replyReason?" — "+k.replyReason:""),handle:k.handle,type:"reply"});
    if(k.vipActivatedDate)events.push({date:k.vipActivatedDate,label:"VIP activated",handle:k.handle,type:"vip"});
    if(k.status==="LIVE"&&k.dateOnboarded)events.push({date:k.dateOnboarded,label:"Converted LIVE",handle:k.handle,type:"live"});
    (k.notesTimeline||[]).forEach(n=>events.push({date:n.date,label:n.text,handle:k.handle,type:"note"}));
  });
  return events.filter(e=>e.date).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,20);
}
function templateStats(list){
  const map={};
  TEMPLATES.forEach(t=>map[t]={sent:0,replies:0});
  list.forEach(k=>{
    const t=k.template||"—";
    if(!map[t])map[t]={sent:0,replies:0};
    if(k.dateDMSent)map[t].sent++;
    if(k.replied==="Y")map[t].replies++;
  });
  return Object.entries(map).map(([template,v])=>({template,...v,rate:v.sent?Math.round(v.replies/v.sent*100):0}));
}

// ═══════════════════════════════════════════════════
//  STORAGE
// ═══════════════════════════════════════════════════
async function loadData(){
  try{const r=await window.storage.get("nxv-kols-v5",false);if(r){kols=JSON.parse(r.value).map(k=>({...k,template:normalizeTemplate(k.template)}));loaded=true;render();return;}}catch{}
  try{const r=await window.storage.get("nxv-kols-v4",false);if(r){kols=JSON.parse(r.value).map(migrateKol);}}catch{}
  try{const r=await window.storage.get("nxv-kols-v3",false);if(r&&!kols.length){kols=JSON.parse(r.value).map(migrateKol);}}catch{}
  loaded=true;render();
}
async function saveData(){if(!loaded)return;try{await window.storage.set("nxv-kols-v5",JSON.stringify(kols),false);}catch{}}

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
let toastTimer;
function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

// ═══════════════════════════════════════════════════
//  TAB SWITCHING
// ═══════════════════════════════════════════════════
function switchTab(t){
  tab=t;
  document.querySelectorAll(".nav-item").forEach(el=>el.classList.remove("active"));
  document.getElementById("nav-"+t)?.classList.add("active");
  const fab=document.getElementById("fab");
  // Show FAB on all tabs — it always adds a KOL
  fab.style.display="flex";
  render();
}

// ═══════════════════════════════════════════════════
//  SHEET (Add/Edit KOL)
// ═══════════════════════════════════════════════════
function openSheet(kolId){
  editId=kolId;
  if(kolId!==null){
    const k=kols.find(x=>x.id===kolId);
    form={...k,noteDraft:""};
    document.getElementById("sheetTitle").textContent="Edit KOL";
    document.getElementById("saveBtn").textContent="Update KOL";
  }else{
    form={...EMPTY,dateDMSent:todayStr()};
    document.getElementById("sheetTitle").textContent="Add KOL";
    document.getElementById("saveBtn").textContent="Save KOL";
  }
  renderSheetBody();
  document.getElementById("sheetOverlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function closeSheet(){
  document.getElementById("sheetOverlay").classList.remove("open");
  document.body.style.overflow="";
  editId=null;
}
function maybeCloseSheet(e){if(e.target===document.getElementById("sheetOverlay"))closeSheet();}

function scoreBtn(field,level){
  const selected=form[field]===level;
  return `<button class="score-item${selected?" selected":""}" onclick="setScore('${field}','${level}')">${level||"—"}</button>`;
}
function syncFormFromDOM(){
  const g=(id,key)=>{const el=document.getElementById(id);if(el)form[key]=el.value;};
  g("f_handle","handle");g("f_followers","followers");g("f_platform","platform");
  g("f_tg","telegramHandle");g("f_web","website");g("f_status","status");
  g("f_rate","rateOffered");g("f_tmpl","template");g("f_via","foundVia");
  g("f_replied","replied");g("f_rr","replyReason");g("f_link","partnerLinkSent");
  g("f_rev","monthlyRevenue");g("f_dm","dateDMSent");g("f_fu","followUpSent");
  g("f_nfu","nextFollowUp");g("f_rd","replyDate");g("f_vip","vipActivatedDate");
  g("f_ob","dateOnboarded");g("f_note","noteDraft");
}
function setScore(field,level){
  syncFormFromDOM();
  form[field]=level;
  renderSheetBody();
}

function renderSheetBody(){
  const notesHtml=(form.notesTimeline&&form.notesTimeline.length)?
    `<div class="notes-history">${form.notesTimeline.slice().reverse().map(n=>`<div class="note-entry"><span class="note-date">${n.date} — </span>${n.text}</div>`).join("")}</div>`:
    "";

  document.getElementById("sheetBody").innerHTML=`
  <div class="field-divider"><i class="ti ti-user" aria-hidden="true"></i> Basics</div>
  <div class="field-group">
    <div class="field-label">Handle / Channel name</div>
    <input type="text" id="f_handle" value="${esc(form.handle)}" placeholder="@channel_name" oninput="form.handle=this.value">
  </div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Followers</div>
      <input type="number" id="f_followers" value="${form.followers||""}" placeholder="8000" oninput="form.followers=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Platform</div>
      <select id="f_platform" onchange="form.platform=this.value">${PLATFORMS.map(p=>`<option${form.platform===p?" selected":""}>${p}</option>`).join("")}</select>
    </div>
  </div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Telegram @</div>
      <input type="text" id="f_tg" value="${esc(form.telegramHandle)}" placeholder="@handle" oninput="form.telegramHandle=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Website</div>
      <input type="text" id="f_web" value="${esc(form.website)}" placeholder="site.com" oninput="form.website=this.value">
    </div>
  </div>

  <div class="field-divider"><i class="ti ti-target" aria-hidden="true"></i> Pipeline</div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Status</div>
      <select id="f_status" onchange="form.status=this.value">${STATUSES.map(s=>`<option${form.status===s?" selected":""}>${s}</option>`).join("")}</select>
    </div>
    <div class="field-group">
      <div class="field-label">Rate offered</div>
      <select id="f_rate" onchange="form.rateOffered=this.value">${RATES.map(r=>`<option${form.rateOffered===r?" selected":""}>${r}</option>`).join("")}</select>
    </div>
  </div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Template</div>
      <select id="f_tmpl" onchange="form.template=this.value">${TEMPLATES.map(t=>`<option${form.template===t?" selected":""}>${t}</option>`).join("")}</select>
    </div>
    <div class="field-group">
      <div class="field-label">Found via</div>
      <select id="f_via" onchange="form.foundVia=this.value">${FOUND_VIA.map(v=>`<option${form.foundVia===v?" selected":""}>${v}</option>`).join("")}</select>
    </div>
  </div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Replied?</div>
      <select id="f_replied" onchange="form.replied=this.value"><option value="">—</option><option value="Y"${form.replied==="Y"?" selected":""}>Yes</option><option value="N"${form.replied==="N"?" selected":""}>No</option></select>
    </div>
    <div class="field-group">
      <div class="field-label">Reply reason</div>
      <select id="f_rr" onchange="form.replyReason=this.value">${REPLY_REASONS.map(r=>`<option${form.replyReason===r?" selected":""}>${r||"—"}</option>`).join("")}</select>
    </div>
  </div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">Link sent?</div>
      <select id="f_link" onchange="form.partnerLinkSent=this.value"><option value="">—</option><option value="Y"${form.partnerLinkSent==="Y"?" selected":""}>Yes</option><option value="N"${form.partnerLinkSent==="N"?" selected":""}>No</option></select>
    </div>
    <div class="field-group">
      <div class="field-label">Est. monthly rev ($)</div>
      <input type="number" id="f_rev" value="${form.monthlyRevenue||""}" placeholder="500" oninput="form.monthlyRevenue=this.value">
    </div>
  </div>

  <div class="field-divider"><i class="ti ti-calendar" aria-hidden="true"></i> Timeline</div>
  <div class="grid-2">
    <div class="field-group">
      <div class="field-label">DM sent</div>
      <input type="date" id="f_dm" value="${form.dateDMSent||""}" onchange="form.dateDMSent=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Follow-up sent</div>
      <input type="date" id="f_fu" value="${form.followUpSent||""}" onchange="form.followUpSent=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Next follow-up</div>
      <input type="date" id="f_nfu" value="${form.nextFollowUp||""}" onchange="form.nextFollowUp=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Reply date</div>
      <input type="date" id="f_rd" value="${form.replyDate||""}" onchange="form.replyDate=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">VIP activated</div>
      <input type="date" id="f_vip" value="${form.vipActivatedDate||""}" onchange="form.vipActivatedDate=this.value">
    </div>
    <div class="field-group">
      <div class="field-label">Date onboarded</div>
      <input type="date" id="f_ob" value="${form.dateOnboarded||""}" onchange="form.dateOnboarded=this.value">
    </div>
  </div>

  <div class="field-divider"><i class="ti ti-chart-bar" aria-hidden="true"></i> Scoring</div>
  <div class="field-group">
    <div class="field-label">Engagement</div>
    <div class="score-grid">${SCORE_LABELS.map(l=>scoreBtn("scoreEngagement",l)).join("")}</div>
  </div>
  <div class="field-group">
    <div class="field-label">Audience match</div>
    <div class="score-grid">${SCORE_LABELS.map(l=>scoreBtn("scoreAudience",l)).join("")}</div>
  </div>
  <div class="field-group">
    <div class="field-label">Response probability</div>
    <div class="score-grid">${SCORE_LABELS.map(l=>scoreBtn("scoreResponse",l)).join("")}</div>
  </div>

  <div class="field-divider"><i class="ti ti-note" aria-hidden="true"></i> Notes</div>
  ${notesHtml}
  <div class="field-group">
    <div class="field-label">Add note</div>
    <input type="text" id="f_note" value="${esc(form.noteDraft||"")}" placeholder="e.g. asked about commission split" oninput="form.noteDraft=this.value">
  </div>
  `;
}

function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}

function saveKol(){
  syncFormFromDOM();
  if(!form.handle||!form.handle.trim()){showToast("Handle required");return;}
  let timeline=[...(form.notesTimeline||[])];
  if(form.noteDraft&&form.noteDraft.trim())timeline=[...timeline,{id:"n"+Date.now(),date:todayStr(),text:form.noteDraft.trim()}];
  const payload={...form,notesTimeline:timeline,noteDraft:""};
  if(editId!==null){
    kols=kols.map(x=>x.id===editId?{...payload,id:editId}:x);
  }else{
    kols=[...kols,{...payload,id:Date.now()}];
  }
  saveData();closeSheet();render();
  showToast(editId!==null?"KOL updated ✓":"KOL added ✓");
}

function deleteKol(id){
  if(!confirm("Delete this KOL?"))return;
  kols=kols.filter(x=>x.id!==id);
  saveData();render();
  showToast("Deleted");
}

// ═══════════════════════════════════════════════════
//  RENDER ENGINE
// ═══════════════════════════════════════════════════
function render(){
  updateNavBadge();
  renderHeader();
  const c=document.getElementById("content");
  if(!loaded){c.innerHTML=`<div class="empty"><i class="ti ti-loader" style="font-size:36px"></i><div class="empty-title">Loading...</div></div>`;return;}
  if(tab==="dashboard")c.innerHTML=renderDashboard();
  else if(tab==="tracker")c.innerHTML=renderTracker();
  else if(tab==="pipeline")c.innerHTML=renderPipeline();
  else if(tab==="reference")c.innerHTML=renderReference();
  c.scrollTop=0;
}

function updateNavBadge(){
  const dueList=kols.filter(isFollowUpDue);
  const dot=document.getElementById("navDot");
  if(dot)dot.style.display=dueList.length>0?"block":"none";
}

function renderHeader(){
  const dueList=kols.filter(isFollowUpDue);
  document.getElementById("headerActions").innerHTML=
    (dueList.length>0?`<span class="alert-badge"><i class="ti ti-bell" aria-hidden="true" style="font-size:12px"></i>${dueList.length}</span>`:"")
    +`<button class="icon-btn" onclick="openSheet(null)" aria-label="Add KOL" id="headerAdd"><i class="ti ti-plus" aria-hidden="true"></i></button>`;
}

// ═══════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════
function renderDashboard(){
  const dmSent=kols.filter(k=>k.dateDMSent).length;
  const replied=kols.filter(k=>k.replied==="Y").length;
  const vipCt=kols.filter(vipReached).length;
  const testing=kols.filter(k=>k.status==="Testing").length;
  const live=kols.filter(k=>k.status==="LIVE").length;
  const declined=kols.filter(k=>k.status==="Declined").length;
  const dueList=kols.filter(isFollowUpDue);
  const rPct=dmSent>0?Math.round(replied/dmSent*100):0;
  const cPct=replied>0?Math.round(live/replied*100):0;
  const oPct=dmSent>0?Math.round(live/dmSent*100):0;
  const liveKols=kols.filter(k=>k.status==="LIVE");
  const pipelineKols=kols.filter(k=>["Testing","Negotiating","VIP Activated"].includes(k.status));
  const mrr=liveKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0),0);
  const payout=liveKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0)*parseRate(k.rateOffered),0);
  const pipelinePotential=pipelineKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0),0);
  const sentWeek=kols.filter(k=>withinDays(k.dateDMSent,6)).length;
  const repliedWeek=kols.filter(k=>withinDays(k.replyDate,6)).length;
  const liveWeek=kols.filter(k=>k.status==="LIVE"&&withinDays(k.dateOnboarded,6)).length;
  const activity=buildActivity(kols);
  const tStats=templateStats(kols);
  const maxTRate=Math.max(1,...tStats.map(t=>t.rate));

  const funnelSteps=[
    {label:"Prospects",val:kols.length,color:"#9B8EC4"},
    {label:"DM Sent",val:dmSent,color:"#5BA4F5"},
    {label:"Replied",val:replied,color:"#FFD166"},
    {label:"VIP Activated",val:vipCt,color:"#4FFFE0"},
    {label:"LIVE",val:live,color:"#D4FF4F"}
  ];
  const maxF=funnelSteps[0].val||1;

  const dueAlert=dueList.length>0?`
  <div class="follow-up-alert">
    <div class="follow-up-title"><i class="ti ti-bell-ringing" aria-hidden="true"></i>${dueList.length} follow-up${dueList.length>1?"s":""} due today</div>
    <div class="follow-up-names">${dueList.map(k=>`<span class="follow-up-tag" onclick="filterToKol('${k.id}')">${k.handle}</span>`).join("")}</div>
  </div>`:"";

  return `<div class="tab-content">
  ${dueAlert}

  <div style="padding:14px 16px 4px">
    <div class="section-title">Revenue</div>
  </div>
  <div class="insight-strip">
    <div class="insight-chip">
      <div class="insight-val" style="color:#D4FF4F">$${fmt(mrr)}</div>
      <div class="insight-lbl">MRR live</div>
    </div>
    <div class="insight-chip">
      <div class="insight-val" style="color:#FF9E4F">$${fmt(Math.round(payout))}</div>
      <div class="insight-lbl">Affiliate payout</div>
    </div>
    <div class="insight-chip">
      <div class="insight-val" style="color:#5BA4F5">$${fmt(pipelinePotential)}</div>
      <div class="insight-lbl">Pipeline est.</div>
    </div>
  </div>

  <div class="metrics-grid">
    <div class="metric-card blue">
      <div class="metric-val" style="color:#5BA4F5">${kols.length}</div>
      <div class="metric-label">Total KOLs</div>
      <div class="metric-sub">in tracker</div>
    </div>
    <div class="metric-card blue">
      <div class="metric-val" style="color:#5BA4F5">${dmSent}</div>
      <div class="metric-label">DMs sent</div>
      <div class="metric-sub">${sentWeek} this week</div>
    </div>
    <div class="metric-card yellow">
      <div class="metric-val" style="color:#FFD166">${replied}</div>
      <div class="metric-label">Replied</div>
      <div class="metric-sub">${rPct}% reply rate</div>
    </div>
    <div class="metric-card cyan">
      <div class="metric-val" style="color:#4FFFE0">${vipCt}</div>
      <div class="metric-label">VIP activated</div>
      <div class="metric-sub">${testing} testing</div>
    </div>
    <div class="metric-card accent">
      <div class="metric-val" style="color:#D4FF4F">${live}</div>
      <div class="metric-label">LIVE</div>
      <div class="metric-sub">${liveWeek} this week</div>
    </div>
    <div class="metric-card red">
      <div class="metric-val" style="color:#FF6B6B">${declined}</div>
      <div class="metric-label">Declined</div>
      <div class="metric-sub">${oPct}% overall conv.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Conversion funnel</div>
    <div class="funnel-wrap">
      ${funnelSteps.map((s,i)=>{
        const pct=maxF?Math.round(s.val/maxF*100):0;
        const dropPct=i>0&&funnelSteps[i-1].val?Math.round(s.val/funnelSteps[i-1].val*100):null;
        return `<div class="funnel-row">
          <div class="funnel-label">${s.label}</div>
          <div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${pct}%;background:${s.color}"></div></div>
          <div class="funnel-num" style="color:${s.color}">${s.val}</div>
          <div class="funnel-pct">${dropPct!==null?`<span style="color:var(--text3)">${dropPct}%</span>`:""}</div>
        </div>`;
      }).join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Conversion rates</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      <div class="metric-card" style="padding:10px">
        <div class="metric-val" style="font-size:20px">${rPct}%</div>
        <div class="metric-label">Reply rate</div>
      </div>
      <div class="metric-card" style="padding:10px">
        <div class="metric-val" style="font-size:20px">${cPct}%</div>
        <div class="metric-label">Close rate</div>
      </div>
      <div class="metric-card" style="padding:10px;border-color:rgba(212,255,79,0.3)">
        <div class="metric-val" style="font-size:20px;color:#D4FF4F">${oPct}%</div>
        <div class="metric-label">Overall</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">This week</div>
    <div class="funnel-wrap">
      <div class="week-row"><div class="week-label">DMs sent</div><div class="week-bar-wrap"><div class="week-bar" style="width:${sentWeek?'100':'0'}%;background:#5BA4F5"></div></div><div class="week-num" style="color:#5BA4F5">${sentWeek}</div></div>
      <div class="week-row"><div class="week-label">Replies</div><div class="week-bar-wrap"><div class="week-bar" style="width:${sentWeek?Math.round(repliedWeek/sentWeek*100):0}%;background:#FFD166"></div></div><div class="week-num" style="color:#FFD166">${repliedWeek}</div></div>
      <div class="week-row" style="margin-bottom:0"><div class="week-label">New LIVE</div><div class="week-bar-wrap"><div class="week-bar" style="width:${sentWeek?Math.round(liveWeek/sentWeek*100):0}%;background:#D4FF4F"></div></div><div class="week-num" style="color:#D4FF4F">${liveWeek}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Template performance</div>
    <div class="funnel-wrap">
      ${tStats.map(t=>`<div class="tmpl-row">
        <div class="tmpl-name">${t.template}</div>
        <div class="tmpl-meta" style="text-align:right">${t.sent} sent · ${t.replies} replies · <span style="color:#D4FF4F;font-weight:600">${t.rate}%</span></div>
        <div class="tmpl-bar-wrap"><div class="tmpl-bar" style="width:${maxTRate?Math.round(t.rate/maxTRate*100):0}%"></div></div>
      </div>`).join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Status breakdown</div>
    <div class="funnel-wrap">
      ${STATUSES.map(s=>{
        const sc=SC[s];const ct=kols.filter(k=>k.status===s).length;
        const pct=kols.length>0?ct/kols.length*100:0;
        return `<div class="status-row">
          <span class="pill pill-sm" style="background:${sc.bg};color:${sc.fg};min-width:92px;justify-content:center">${s}</span>
          <div class="status-bar-wrap"><div class="status-bar" style="width:${pct}%;background:${sc.fg}"></div></div>
          <div class="status-ct" style="color:${sc.fg}">${ct}</div>
        </div>`;
      }).join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Activity feed</div>
    <div class="funnel-wrap">
      ${activity.length===0?`<div style="color:var(--text3);font-size:13px;padding:8px 0">No activity yet — add a KOL to get started.</div>`:
        activity.map(e=>{const a=ACT[e.type]||ACT.note;return`<div class="feed-item">
          <div class="feed-icon" style="background:${a.bg}"><i class="ti ${a.icon}" aria-hidden="true" style="color:${a.c};font-size:14px"></i></div>
          <div class="feed-body">
            <div class="feed-handle" style="color:${a.c}">${esc(e.handle)} <span>— ${esc(e.label)}</span></div>
            <div class="feed-time">${relTime(e.date)}</div>
          </div>
        </div>`;}).join("")}
    </div>
  </div>
  </div>`;
}

// ═══════════════════════════════════════════════════
//  TRACKER
// ═══════════════════════════════════════════════════
function filterToKol(id){
  switchTab("tracker");
  search="";sortBy="recent";filterStatus="";
  render();
  setTimeout(()=>{
    const el=document.getElementById("kol-"+id);
    if(el)el.scrollIntoView({behavior:"smooth",block:"start"});
  },50);
}

function renderTracker(){
  let filtered=kols.filter(k=>{
    if(filterStatus&&k.status!==filterStatus)return false;
    if(!search)return true;
    const s=search.toLowerCase();
    const notesBlob=(k.notesTimeline||[]).map(n=>n.text).join(" ").toLowerCase();
    return [k.handle,k.telegramHandle,k.followers,k.platform,k.status,k.template,notesBlob].some(v=>String(v||"").toLowerCase().includes(s));
  });
  if(sortBy==="score")filtered=[...filtered].sort((a,b)=>kolScore(b)-kolScore(a));
  else if(sortBy==="followUp")filtered=[...filtered].sort((a,b)=>(isFollowUpDue(b)?1:0)-(isFollowUpDue(a)?1:0));
  else if(sortBy==="revenue")filtered=[...filtered].sort((a,b)=>(Number(b.monthlyRevenue)||0)-(Number(a.monthlyRevenue)||0));
  else if(sortBy==="recent")filtered=[...filtered].sort((a,b)=>b.id-a.id);

  const sortChips=[
    {k:"recent",l:"Recent"},
    {k:"score",l:"Score"},
    {k:"followUp",l:"Follow-up due"},
    {k:"revenue",l:"Revenue"},
  ];
  const statusChips=["","Prospect","DM Sent","Replied","VIP Activated","Testing","LIVE","Declined","Ghosted"];

  return `<div class="tab-content">
  <div class="search-wrap">
    <div class="search-row">
      <div class="search-wrap-inner">
        <i class="ti ti-search" aria-hidden="true"></i>
        <input class="search-input" type="text" placeholder="Search handle, notes..." value="${esc(search)}" oninput="search=this.value;render()">
      </div>
    </div>
  </div>
  <div class="sort-bar">
    ${sortChips.map(c=>`<button class="sort-chip${sortBy===c.k?" active":""}" onclick="sortBy='${c.k}';render()">${c.l}</button>`).join("")}
  </div>
  <div class="sort-bar" style="padding-top:0">
    ${statusChips.map(s=>`<button class="sort-chip${filterStatus===s?" active":""}" onclick="filterStatus='${s}';render()">${s||"All statuses"}</button>`).join("")}
  </div>

  ${filtered.length===0?`<div class="empty">
    <i class="ti ti-target" aria-hidden="true"></i>
    <div class="empty-title">${search||filterStatus?"No matches":"No KOLs yet"}</div>
    <div class="empty-sub">${search||filterStatus?"Try different search or filter":"Tap + to add your first prospect"}</div>
  </div>`:`<div class="kol-list">${filtered.map(k=>renderKolCard(k)).join("")}</div><div style="height:8px"></div>`}
  </div>`;
}

function renderKolCard(k){
  const due=isFollowUpDue(k);
  const sc=SC[k.status]||SC.Prospect;
  const lc=lastContactDate(k);
  const score=kolScore(k);
  const scoreMax=100;
  const vipLeft=k.status==="Testing"?vipHoursLeft(k):null;
  const lastNotes=(k.notesTimeline&&k.notesTimeline.length>0)?k.notesTimeline.slice(-1)[0]:null;

  const badges=[
    k.platform?`${platformDot(k.platform)}<span style="font-size:11px;color:var(--text2)">${k.platform}</span>`:"",
    k.template?pillar(k.template.split(" - ")[0],"rgba(61,37,99,0.5)","#9B8EC4",""):"",
    pillar(k.status,sc.bg,sc.fg,""),
    due?pillar("Follow up","rgba(192,20,60,0.2)","#FF6B6B","<i class='ti ti-bell' style='font-size:10px;margin-right:3px'></i>"):"",
    k.rateOffered?pillar(k.rateOffered,"rgba(212,255,79,0.1)","#D4FF4F",""):"",
    k.replied==="Y"?pillar("Replied ✓","rgba(212,255,79,0.1)","#D4FF4F",""):"",
    k.monthlyRevenue?pillar("$"+fmtFollowers(k.monthlyRevenue)+"/mo","rgba(212,255,79,0.08)","#D4FF4F",""):"",
    vipLeft!==null?(vipLeft>0?pillar(vipLeft+"h VIP","rgba(255,158,79,0.15)","#FF9E4F",""):pillar("VIP expired","rgba(255,107,107,0.15)","#FF6B6B","")):"",
  ].filter(Boolean);

  const links=[];
  if(k.telegramHandle)links.push(`<a href="https://t.me/${(k.telegramHandle||k.handle).replace(/^@/,"")}" target="_blank" rel="noopener" class="link-chip"><i class="ti ti-brand-telegram" aria-hidden="true" style="font-size:13px"></i> Telegram</a>`);
  if(k.website)links.push(`<a href="${k.website.startsWith("http")?k.website:"https://"+k.website}" target="_blank" rel="noopener" class="link-chip"><i class="ti ti-world" aria-hidden="true" style="font-size:13px"></i> Website</a>`);

  return `<div class="kol-card${due?" due":""}${k.status==="LIVE"?" live":""}" id="kol-${k.id}">
    <div class="kol-card-header">
      <div>
        <div class="kol-handle">${esc(k.handle)}</div>
        <div class="kol-followers">${k.followers?fmtFollowers(k.followers)+" followers":""}${k.foundVia?" · via "+k.foundVia:""}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div style="display:flex;flex-direction:column;align-items:center">
          <span style="font-size:14px;font-weight:700;color:${score>=60?"#D4FF4F":score>=40?"#FFD166":"#9B8EC4"}">${score}</span>
          <span style="font-size:9px;color:var(--text3)">SCORE</span>
        </div>
      </div>
    </div>
    <div class="kol-badges">${badges.join("")}</div>
    ${links.length?`<div class="link-row">${links.join("")}</div>`:""}
    ${lastNotes?`<div class="kol-notes">${esc(lastNotes.text)}</div>`:""}
    <div class="kol-score-bar"><div class="kol-score-fill" style="width:${Math.min(100,score)}%"></div></div>
    <div class="kol-footer">
      <div class="kol-last-contact">${lc?"Last contact "+relTime(lc):""}${k.nextFollowUp?" · next "+k.nextFollowUp:""}</div>
      <div class="kol-actions">
        <button class="btn-sm btn-edit" onclick="openSheet(${k.id})"><i class="ti ti-edit" aria-hidden="true"></i> Edit</button>
        <button class="btn-sm btn-del" onclick="deleteKol(${k.id})"><i class="ti ti-trash" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════
//  PIPELINE
// ═══════════════════════════════════════════════════
function renderPipeline(){
  const stages=[
    {label:"VIP Activated",key:"VIP Activated",color:"#4FFFE0",icon:"ti-star"},
    {label:"Testing",key:"Testing",color:"#FF9E4F",icon:"ti-flask"},
    {label:"Negotiating",key:"Negotiating",color:"#FFB84F",icon:"ti-messages"},
    {label:"LIVE",key:"LIVE",color:"#D4FF4F",icon:"ti-bolt"},
  ];
  const liveKols=kols.filter(k=>k.status==="LIVE");
  const mrr=liveKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0),0);
  const payout=liveKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0)*parseRate(k.rateOffered),0);
  const avgRate=liveKols.length?Math.round(liveKols.reduce((s,k)=>s+parseRate(k.rateOffered)*100,0)/liveKols.length):0;

  return `<div class="tab-content">
  <div class="metrics-grid">
    <div class="metric-card accent" style="grid-column:span 2">
      <div style="display:flex;align-items:baseline;gap:8px">
        <span class="metric-val" style="color:#D4FF4F">$${fmt(mrr)}</span>
        <span style="font-size:12px;color:var(--text3)">monthly recurring</span>
      </div>
      <div style="display:flex;gap:16px;margin-top:8px">
        <div><div style="font-size:12px;color:#FF9E4F;font-weight:600">$${fmt(Math.round(payout))}</div><div class="metric-sub">affiliate payout</div></div>
        <div><div style="font-size:12px;color:#D4FF4F;font-weight:600">${avgRate}%</div><div class="metric-sub">avg rate</div></div>
        <div><div style="font-size:12px;color:#D4FF4F;font-weight:600">${liveKols.length}</div><div class="metric-sub">live KOLs</div></div>
      </div>
    </div>
  </div>

  ${stages.map(stage=>{
    const stageKols=kols.filter(k=>k.status===stage.key);
    const potential=stageKols.reduce((s,k)=>s+(Number(k.monthlyRevenue)||0),0);
    return `<div class="section">
      <div class="section-title" style="color:${stage.color}">
        <span style="display:flex;align-items:center;gap:6px"><i class="ti ${stage.icon}" aria-hidden="true"></i> ${stage.label}</span>
        <span style="color:var(--text3)">${stageKols.length} KOLs${potential?` · $${fmt(potential)} est.`:""}</span>
      </div>
      ${stageKols.length===0?`<div style="background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);padding:14px;color:var(--text3);font-size:13px;text-align:center">No KOLs in ${stage.label}</div>`:
        `<div style="display:flex;flex-direction:column;gap:8px">${stageKols.map(k=>{
          const sc=SC[k.status];
          const vipLeft=stage.key==="Testing"?vipHoursLeft(k):null;
          return `<div style="background:var(--surface1);border:1px solid ${stage.color}30;border-radius:var(--r);padding:12px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="openSheet(${k.id})">
            <div style="width:36px;height:36px;border-radius:50%;background:${stage.color}20;border:1px solid ${stage.color}50;display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i class="ti ${stage.icon}" aria-hidden="true" style="color:${stage.color};font-size:16px"></i>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(k.handle)}</div>
              <div style="font-size:11px;color:var(--text3)">${k.followers?fmtFollowers(k.followers)+" followers · ":""} ${k.rateOffered||""} rate</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              ${k.monthlyRevenue?`<div style="font-size:13px;font-weight:700;color:${stage.color}">$${fmt(k.monthlyRevenue)}</div>`:""}
              ${vipLeft!==null?`<div class="vip-timer ${vipLeft>0?"active":"expired"}"><i class="ti ti-clock" aria-hidden="true" style="font-size:12px"></i> ${vipLeft>0?vipLeft+"h":"Expired"}</div>`:""}
            </div>
          </div>`;
        }).join("")}</div>`}
    </div>`;
  }).join("")}

  ${liveKols.length>0?`<div class="section">
    <div class="section-title" style="color:#D4FF4F"><span style="display:flex;align-items:center;gap:6px"><i class="ti ti-bolt" aria-hidden="true"></i> LIVE breakdown</span></div>
    <div style="background:var(--surface1);border:1px solid var(--border);border-radius:var(--r);overflow:hidden">
      ${liveKols.map((k,i)=>`<div style="display:flex;align-items:center;gap:10px;padding:11px 14px;${i>0?"border-top:1px solid var(--border)":""}">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600">${esc(k.handle)}</div>
          <div style="font-size:11px;color:var(--text3)">${k.rateOffered||""} · onboarded ${k.dateOnboarded||"—"}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:14px;font-weight:700;color:#D4FF4F">${k.monthlyRevenue?"$"+fmt(k.monthlyRevenue):""}</div>
          <div style="font-size:11px;color:#FF9E4F">${k.monthlyRevenue?"-$"+Math.round(Number(k.monthlyRevenue)*parseRate(k.rateOffered))+" payout":""}</div>
        </div>
      </div>`).join("")}
    </div>
  </div>`:""}
  </div>`;
}

// ═══════════════════════════════════════════════════
//  REFERENCE
// ═══════════════════════════════════════════════════
function renderReference(){
  return `<div class="tab-content" style="padding:14px 16px">

  <div class="ref-card">
    <div class="ref-title"><i class="ti ti-send" aria-hidden="true"></i> DM template</div>
    <div style="font-size:11px;color:var(--text3);margin-bottom:8px">Send the signal card image first, then this:</div>
    <div class="dm-template">[personalized line 1 — real and specific]

That card 👆 — NOXVEX generated it in seconds.
40 smart wallets, safety scored, all on-chain.

40% recurring on everyone you bring.
Free VIP to test first: noxvex.pro/proof</div>
  </div>

  <div class="ref-card">
    <div class="ref-title"><i class="ti ti-user-check" aria-hidden="true"></i> Vibe → template map</div>
    ${[
      {style:"Bold, LFG, flexing gains",tone:"High caps, hype",tmpl:"A - Personal + Partnership"},
      {style:"lowercase, memes, ser/wagmi",tone:"No punctuation, ironic",tmpl:"B - Curiosity Hook"},
      {style:"Threads, charts, data",tone:"Long-form, no hype",tmpl:"C - Creator-Focused"},
      {style:"Big account, terse",tone:"Short posts, ignores fluff",tmpl:"D - Straight to the Point"},
      {style:"Community educator",tone:"Gives advice, low ego",tmpl:"E - Social Proof"},
    ].map(r=>`<div class="ref-row">
      <div>
        <div class="ref-label">${r.style}</div>
        <div class="ref-desc">${r.tone}</div>
      </div>
      <div>${pillar(r.tmpl.split(" - ")[0],"rgba(61,37,99,0.6)","#D4FF4F","")}</div>
    </div>`).join("")}
  </div>

  <div class="ref-card">
    <div class="ref-title"><i class="ti ti-coin" aria-hidden="true"></i> Rate guide</div>
    ${[
      {rate:"30%",tier:"Community partner",note:"Default / starter"},
      {rate:"40%",tier:"Partner ⭐",note:"Lead with this for mid KOLs"},
      {rate:"50%",tier:"Headliner 👑",note:"Close a strong KOL"},
      {rate:"+5–10%",tier:"L2 override",note:"When they refer other KOLs"},
    ].map(r=>`<div class="ref-row">
      <div><div class="ref-label" style="color:#D4FF4F;font-size:15px;font-weight:700">${r.rate}</div><div class="ref-desc">${r.note}</div></div>
      <div>${pillar(r.tier,"rgba(212,255,79,0.08)","#9B8EC4","")}</div>
    </div>`).join("")}
  </div>

  <div class="ref-card">
    <div class="ref-title"><i class="ti ti-chart-bar" aria-hidden="true"></i> Score weighting</div>
    ${[
      {cat:"Followers",pts:"0–25",desc:"<5k=5, 5–15k=12, 15–50k=18, 50k+=25"},
      {cat:"Engagement",pts:"0–25",desc:"Low / Medium / High / Very High"},
      {cat:"Audience match",pts:"0–25",desc:"Low / Medium / High / Very High"},
      {cat:"Response prob.",pts:"0–25",desc:"Low / Medium / High / Very High"},
    ].map(r=>`<div class="ref-row">
      <div><div class="ref-label">${r.cat}</div><div class="ref-desc">${r.desc}</div></div>
      <div>${pillar(r.pts+" pts","rgba(61,37,99,0.6)","#D4FF4F","")}</div>
    </div>`).join("")}
  </div>

  <div class="ref-card">
    <div class="ref-title"><i class="ti ti-calendar" aria-hidden="true"></i> Daily rhythm</div>
    ${["Add 5 new prospects (Kolscan + Twitter)","Send 5–8 DMs — personalize line 1 every time","Set a next follow-up date on every DM","Work the follow-up queue first — one nudge then move on","Onboard same-day: free VIP + partner link","Fire 1–2 signals via /scout to grow proof page"].map((item,i)=>`
    <div class="daily-item">
      <div class="daily-num">${i+1}</div>
      <div class="daily-text">${item}</div>
    </div>`).join("")}
  </div>

  <div class="ref-card">
    <div class="ref-title" style="color:#FF6B6B"><i class="ti ti-x" aria-hidden="true"></i> Never do this</div>
    ${["Never send the same DM twice in the same niche","Don't cold-DM 'join my paid signals' — starts at negative trust","Don't chase 50k+ KOLs first — they ignore cold DMs","Never more than one follow-up — one nudge, then move on","Never expose engine internals or data sources"].map(rule=>`
    <div class="dont-item">
      <i class="ti ti-x dont-icon" aria-hidden="true"></i>
      <div class="daily-text">${rule}</div>
    </div>`).join("")}
  </div>

  </div>`;
}

// ═══════════════════════════════════════════════════
//  STATUS BREAKDOWN (inline helper for dashboard)
// ═══════════════════════════════════════════════════
// patch the status row rendering issue
function fixStatusRows(){
  // already handled inline above
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
window.addEventListener("DOMContentLoaded",()=>{
  switchTab("dashboard");
  loadData();
});
</script>
</body>
</html>
