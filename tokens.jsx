// tokens.jsx — shared design tokens + tiny primitives (Lucide icons, badges, etc.)
// Loaded BEFORE all screen files. Exports to window.

const TOKENS = {
  // colors per §3
  primary: '#244C5A',
  primarySoft: '#244C5A1f', // 12% alpha used for badge backgrounds
  primaryTint: '#244C5A0d',
  secondary: '#9CAF88',
  bg: '#f5f4f2',
  surface: '#ffffff',
  surface2: '#f0eeeb',
  border: '#e2dfd9',
  borderStrong: '#d4cfc4',
  text1: '#1a1a18',
  text2: '#6b6b65',
  text3: '#9c9a92',
  // status per §28
  statusNeutral: '#6b6b65',
  statusProgress: '#244c5a',
  statusPending: '#b08434',
  statusSuccess: '#4f7a3a',
  statusCancel: '#9c9a92',
  statusDanger: '#c0392b',
  // focus
  focus: '#244c5a',
  // editor-role accent text
  editorText: '#4a5e3a',
  // role pill backgrounds
  roleAdminBg: '#244c5a1f',
  roleEditorBg: '#9caf881f',
  roleViewerBg: '#9c9a921f',
};
window.TOKENS = TOKENS;

// Inject global styles
if (!document.getElementById('tms-tokens-style')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.id = 'tms-tokens-style';
  s.textContent = `
    .tms { font-family: "Noto Sans TC", -apple-system, BlinkMacSystemFont, "PingFang TC", "Microsoft JhengHei", sans-serif;
           color: ${TOKENS.text1}; font-size: 14px; line-height: 1.5; font-weight: 400;
           font-feature-settings: "kern", "tnum"; }
    .tms-mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-feature-settings: "tnum"; }
    .tms, .tms * { box-sizing: border-box; }
    .tms ::selection { background: ${TOKENS.primary}33; }

    /* Scrollbars inside artboards stay flush */
    .tms-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .tms-scroll::-webkit-scrollbar-thumb { background: ${TOKENS.borderStrong}; border-radius: 4px; }
    .tms-scroll::-webkit-scrollbar-track { background: transparent; }

    /* skeleton */
    @keyframes tms-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
    .tms-skel { background: ${TOKENS.surface2}; border-radius: 3px; animation: tms-pulse 1.6s ease-in-out infinite; }

    /* spinner */
    @keyframes tms-spin { to { transform: rotate(360deg); } }
    .tms-spinner { display: inline-block; border: 2px solid ${TOKENS.border};
      border-top-color: ${TOKENS.primary}; border-radius: 50%; animation: tms-spin 0.8s linear infinite; }

    /* sticky-bar drop shadow alt = hairline */
    .tms-hairline { box-shadow: 0 -1px 0 ${TOKENS.border}; }
  `;
  document.head.appendChild(s);
}

// ──────────────────────────────────────────────────────────────────────
// Lucide icons (inline SVG paths, hand-copied from lucide-static — kept
// minimal to icons used by P0 screens per §28).
// ──────────────────────────────────────────────────────────────────────
const ICON_PATHS = {
  Plus:        'M5 12h14M12 5v14',
  Pencil:      'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z|m15 5 4 4',
  Trash2:      'M3 6h18|M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6|M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2|M10 11v6|M14 11v6',
  Copy:        'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2|M9 2h6v4H9z',
  Upload:      'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8l-5-5-5 5|M12 3v12',
  Download:    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3',
  Filter:      'M3 6h18M7 12h10M10 18h4',
  Search:      'M11 11a7 7 0 1 0-14 0 7 7 0 0 0 14 0z|m21 21-4.3-4.3', // mirrored later via transform
  Paperclip:   'm21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 17.99 8.84l-8.59 8.57a2 2 0 1 1-2.83-2.83l8.49-8.49',
  Link:        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  User:        'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Users:       'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75',
  ShieldCheck: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z|m9 12 2 2 4-4',
  Bell:        'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9|M10.3 21a1.94 1.94 0 0 0 3.4 0',
  Mail:        'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z|m22 6-10 7L2 6',
  Diamond:     'm12 2 10 10-10 10L2 12z',
  History:     'M3 12a9 9 0 1 0 3-6.7L3 8|M3 3v5h5|M12 7v5l4 2',
  MoreHorizontal: 'M12 12h.01|M19 12h.01|M5 12h.01',
  Circle:      'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0',
  CircleDot:   'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0|M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0',
  AlertCircle: 'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0|M12 8v4|M12 16h.01',
  CheckCircle: 'M22 11.08V12a10 10 0 1 1-5.93-9.14|m9 11 3 3L22 4',
  CheckCircle2:'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0|m9 12 2 2 4-4',
  XCircle:     'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0|m15 9-6 6|m9 9 6 6',
  Clock:       'M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0|M12 6v6l4 2',
  Undo2:       'M9 14 4 9l5-5|M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11',
  FileText:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8',
  ArrowUpDown: 'm21 16-4 4-4-4|M17 20V4|m3 8 4-4 4 4|M7 4v16',
  ArrowUp:     'm5 12 7-7 7 7|M12 19V5',
  ArrowDown:   'M12 5v14|m19 12-7 7-7-7',
  ChevronRight:'m9 18 6-6-6-6',
  ChevronDown: 'm6 9 6 6 6-6',
  ChevronLeft: 'm15 18-6-6 6-6',
  ChevronsLeft:'m11 17-5-5 5-5|m18 17-5-5 5-5',
  X:           'M18 6 6 18|m6 6 12 12',
  Check:       'M20 6 9 17l-5-5',
  Calendar:    'M8 2v4|M16 2v4|M3 10h18|M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  LayoutDashboard: 'M3 3h7v9H3z|M14 3h7v5h-7z|M14 12h7v9h-7z|M3 16h7v5H3z',
  Inbox:       'M22 12h-6l-2 3h-4l-2-3H2|M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  GitBranch:   'M6 3v12|M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M15 6a9 9 0 0 0-9 9',
  BarChart3:   'M3 3v18h18|M18 17V9|M13 17V5|M8 17v-3',
  Megaphone:   'm3 11 18-5v12L3 14v-3z|M11.6 16.8a3 3 0 1 1-5.8-1.6',
  FolderOpen:  'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2',
  ShoppingCart:'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12|M7.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z|M17.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  ShieldUser:  'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z|M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M7 18a5 5 0 0 1 10 0',
  PanelLeft:   'M3 3h18v18H3z|M9 3v18',
  LogOut:      'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|m16 17 5-5-5-5|M21 12H9',
  Camera:      'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z|M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Image:       'M3 3h18v18H3z|m21 15-5-5L5 21|M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  RotateCcw:   'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8|M3 3v5h5',
  Eye:         'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  EyeOff:      'M9.88 9.88a3 3 0 1 0 4.24 4.24|M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68|M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61|m2 2 20 20',
  Lock:        'M5 11h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z|M7 11V7a5 5 0 0 1 10 0v4',
  Building2:   'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z|M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2|M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0-2 2h-2|M10 6h4|M10 10h4|M10 14h4|M10 18h4',
};

function Icon({ name, size = 16, color = 'currentColor', stroke = 1.6, style, className }) {
  const paths = (ICON_PATHS[name] || '').split('|').filter(Boolean);
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0, ...style }} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Status / role / venue badges per §28
// ──────────────────────────────────────────────────────────────────────
const STATUS_MAP = {
  // 需求單 / 專案
  '待處理':   { token: 'neutral',  color: TOKENS.statusNeutral,  icon: 'Circle' },
  '進行中':   { token: 'progress', color: TOKENS.statusProgress, icon: 'CircleDot' },
  '待確認':   { token: 'pending',  color: TOKENS.statusPending,  icon: 'AlertCircle' },
  '完成':     { token: 'success',  color: TOKENS.statusSuccess,  icon: 'CheckCircle' },
  '取消':     { token: 'cancel',   color: TOKENS.statusCancel,   icon: 'XCircle' },
  // 任務
  '未開始':   { token: 'neutral',  color: TOKENS.statusNeutral,  icon: 'Circle' },
  // 簽核
  '待簽核':   { token: 'pending',  color: TOKENS.statusPending,  icon: 'Clock' },
  '通過':     { token: 'success',  color: TOKENS.statusSuccess,  icon: 'CheckCircle2' },
  '退回':     { token: 'danger',   color: TOKENS.statusDanger,   icon: 'Undo2' },
  // 採購
  '草稿':     { token: 'neutral',  color: TOKENS.statusNeutral,  icon: 'FileText' },
  '待核准':   { token: 'pending',  color: TOKENS.statusPending,  icon: 'Clock' },
  '已核准':   { token: 'success',  color: TOKENS.statusSuccess,  icon: 'CheckCircle2' },
  '已取消':   { token: 'cancel',   color: TOKENS.statusCancel,   icon: 'XCircle' },
};

function StatusBadge({ status, size = 'sm', withIcon = true }) {
  const m = STATUS_MAP[status] || { color: TOKENS.text2, icon: 'Circle' };
  const h = size === 'md' ? 22 : 20;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: h, padding: '0 8px', borderRadius: 3,
      background: m.color + '1f', color: m.color,
      fontSize: 12, fontWeight: 500, lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      {withIcon && <Icon name={m.icon} size={12} stroke={2} />}
      {status}
    </span>
  );
}

const ROLE_LABEL = {
  super_admin: '最高系統管理者',
  admin: '管理者',
  editor: '編輯者',
  viewer: '瀏覽者',
  pending: '待確認',
};
function RoleBadge({ role, compact }) {
  const map = {
    super_admin: { bg: TOKENS.primary,       fg: '#fff' },
    admin:       { bg: TOKENS.roleAdminBg,   fg: TOKENS.primary },
    editor:      { bg: TOKENS.roleEditorBg,  fg: TOKENS.editorText },
    viewer:      { bg: TOKENS.roleViewerBg,  fg: TOKENS.text2 },
    pending:     { bg: 'transparent',        fg: TOKENS.text3, border: `1px dashed ${TOKENS.border}` },
  }[role] || { bg: TOKENS.surface2, fg: TOKENS.text2 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 10px',
      borderRadius: 12, background: map.bg, color: map.fg, fontSize: 12, fontWeight: 500,
      lineHeight: 1, border: map.border, whiteSpace: 'nowrap',
    }}>{compact ? (role === 'super_admin' ? '最高管理者' : ROLE_LABEL[role]) : ROLE_LABEL[role]}</span>
  );
}

function VenueTag({ code }) {
  return (
    <span className="tms-mono" style={{
      display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 6px',
      borderRadius: 3, border: `1px solid ${TOKENS.border}`, color: TOKENS.text2,
      fontSize: 12, fontWeight: 500, lineHeight: 1, background: 'transparent',
    }}>{code}</span>
  );
}

// Avatar — initials, deterministic color from string
function avatarColor(name) {
  let h = 0;
  for (const c of name || '') h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const hue = h % 360;
  return `oklch(0.78 0.05 ${hue})`;
}
function Avatar({ name, size = 24, role }) {
  const initials = (name || '?').slice(0, 1).toUpperCase();
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: '50%',
      background: avatarColor(name), color: '#2a2a26',
      fontSize: size <= 24 ? 11 : 13, fontWeight: 500, flexShrink: 0,
      border: role === 'pending' ? `1px dashed ${TOKENS.border}` : 'none',
    }}>{initials}</span>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Buttons per §25
// ──────────────────────────────────────────────────────────────────────
function Button({
  variant = 'secondary', size = 'md', icon, iconRight, children, danger,
  disabled, loading, onClick, style,
}) {
  const heights = { sm: 28, md: 32, lg: 40 };
  const pad = { sm: '0 10px', md: '0 12px', lg: '0 16px' };
  const h = heights[size];
  const base = {
    height: h, padding: pad[size], borderRadius: 3, fontSize: 14, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
    fontFamily: 'inherit', lineHeight: 1.4, whiteSpace: 'nowrap', flexShrink: 0,
    transition: 'background 0.12s, border-color 0.12s, color 0.12s',
    opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
  };
  const styles = {
    primary: { ...base, background: TOKENS.primary, color: '#fff', border: `1px solid ${TOKENS.primary}` },
    secondary: { ...base, background: TOKENS.surface, color: danger ? TOKENS.statusDanger : TOKENS.text1, border: `1px solid ${TOKENS.border}` },
    text: { ...base, background: 'transparent', color: danger ? TOKENS.statusDanger : TOKENS.primary, border: '1px solid transparent', padding: pad[size] },
    ghost: { ...base, background: 'transparent', color: TOKENS.text1, border: '1px solid transparent' },
  }[variant];
  return (
    <button type="button" disabled={disabled} onClick={onClick} style={{ ...styles, ...style }}>
      {loading && <span className="tms-spinner" style={{ width: 12, height: 12, borderWidth: 1.5 }} />}
      {!loading && icon && <Icon name={icon} size={size === 'lg' ? 16 : 14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 16 : 14} />}
    </button>
  );
}

// Input
function Field({ label, required, error, helper, children, w }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w }}>
      {label && (
        <span style={{ fontSize: 14, fontWeight: 500, color: TOKENS.text1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {label}
          {required && <span aria-label="必填" style={{ width: 6, height: 6, borderRadius: '50%', background: TOKENS.statusDanger, display: 'inline-block' }} />}
        </span>
      )}
      {children}
      {error && <span style={{ fontSize: 12, color: TOKENS.statusDanger }}>{error}</span>}
      {!error && helper && <span style={{ fontSize: 12, color: TOKENS.text2 }}>{helper}</span>}
    </label>
  );
}

function Input({ value, placeholder, icon, error, disabled, focus, w, style, type = 'text', mono }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, width: w || '100%',
      height: 32, padding: '0 12px', borderRadius: 3,
      background: disabled ? TOKENS.surface2 : TOKENS.surface,
      border: error ? `1px solid ${TOKENS.statusDanger}` : focus ? `2px solid ${TOKENS.focus}` : `1px solid ${TOKENS.border}`,
      paddingLeft: icon ? 10 : 12,
      ...style,
    }}>
      {icon && <Icon name={icon} size={14} color={TOKENS.text3} />}
      <span className={mono ? 'tms-mono' : ''} style={{
        flex: 1, color: value ? TOKENS.text1 : TOKENS.text3, fontSize: 14,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{value || placeholder}</span>
      {type === 'select' && <Icon name="ChevronDown" size={14} color={TOKENS.text2} />}
    </span>
  );
}

// Chip — filter / person / venue chip
function Chip({ children, selected, count, icon, onClose, dashed }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 28,
      padding: '0 10px', borderRadius: 14, flexShrink: 0,
      background: selected ? TOKENS.primarySoft : TOKENS.surface,
      border: dashed ? `1px dashed ${TOKENS.border}` : `1px solid ${selected ? TOKENS.primary + '55' : TOKENS.border}`,
      color: selected ? TOKENS.primary : TOKENS.text1,
      fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {icon && <Icon name={icon} size={12} />}
      {children}
      {count != null && <span style={{ fontSize: 11, opacity: 0.7 }}>({count})</span>}
      {onClose && <Icon name="X" size={12} color={TOKENS.text2} />}
      {!onClose && !icon && count == null && <Icon name="ChevronDown" size={12} color={TOKENS.text2} />}
    </span>
  );
}

// Segmented control (e.g. 全部/我的)
function Segmented({ options, value }) {
  return (
    <div style={{
      display: 'inline-flex', height: 28, padding: 2, borderRadius: 14, flexShrink: 0,
      background: TOKENS.surface2, border: `1px solid ${TOKENS.border}`,
    }}>
      {options.map((o) => (
        <span key={o} style={{
          display: 'inline-flex', alignItems: 'center', padding: '0 12px', borderRadius: 12,
          background: value === o ? TOKENS.surface : 'transparent',
          color: value === o ? TOKENS.text1 : TOKENS.text2,
          fontSize: 13, fontWeight: 500,
          boxShadow: value === o ? `inset 0 0 0 1px ${TOKENS.border}` : 'none',
        }}>{o}</span>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Wordmark / Logo (transitional — replace when brand delivers SVG)
// ──────────────────────────────────────────────────────────────────────
// Concept: rounded square in primary, three task-list rows (varying opacity
// for hierarchy) + a small sage-green check overlapping the bottom row —
// reads as "marketing tasks, tracked". Single mark scales to 24 / 28 / 40.
function LogoMark({ size = 28, radius = 4 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 28 28" aria-label="mkt-tms logo" style={{ flexShrink: 0 }}>
      <rect width="28" height="28" rx={radius} fill={TOKENS.primary} />
      <path d="M7 9.5 H14" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 14   H21" stroke="rgba(255,255,255,0.9)"  strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 18.5 H16" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18.5 18.5 L20 20 L23 17" stroke={TOKENS.secondary} strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function Wordmark({ size = 'sm', subtitle, collapsed }) {
  if (collapsed) return <LogoMark size={28} />;
  const big = size === 'lg';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 12 : 10 }}>
      <LogoMark size={big ? 40 : 28} radius={big ? 6 : 4} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontSize: big ? 22 : 15, fontWeight: 500, letterSpacing: big ? 0.4 : 0.2,
          color: TOKENS.text1, lineHeight: 1, fontVariantLigatures: 'none',
        }}>
          mkt<span style={{ color: TOKENS.secondary, padding: '0 1px' }}>·</span>tms
        </span>
        {subtitle && (
          <span style={{
            fontSize: big ? 11 : 10, color: TOKENS.text3, letterSpacing: big ? 1.6 : 1,
            lineHeight: 1, fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase',
          }}>{subtitle}</span>
        )}
      </div>
    </div>
  );
}

// Re-export to window so other Babel files can access them
Object.assign(window, {
  TOKENS, Icon, ICON_PATHS, StatusBadge, RoleBadge, VenueTag, Avatar,
  Button, Field, Input, Chip, Segmented, avatarColor, ROLE_LABEL,
  LogoMark, Wordmark,
});
