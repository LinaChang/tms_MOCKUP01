// shell.jsx — App shell (sidebar + header) used by every full-screen artboard.

const NAV_ITEMS = [
  { id: 'dashboard', label: '儀表板',         icon: 'LayoutDashboard' },
  { id: 'request',   label: '需求單',         icon: 'Inbox',           badge: 28 },
  { id: 'project',   label: '專案進度',       icon: 'GitBranch' },
  { id: 'gantt',     label: '工作負載甘特圖', icon: 'BarChart3' },
  { id: 'announce',  label: '公告與會議',     icon: 'Megaphone' },
  { id: 'files',     label: '檔案與資源',     icon: 'FolderOpen' },
  { id: 'po',        label: '採購單',         icon: 'ShoppingCart' },
  { id: 'accounts',  label: '帳號與權限',     icon: 'ShieldUser' },
];

// Per §5: editor / viewer should see locked modules differently.
// `lockedFor` maps role → set of nav ids that are disabled.
const LOCKS = {
  viewer:  new Set(['accounts', 'po']),
  editor:  new Set(['accounts']),
};

function Sidebar({ active = 'dashboard', collapsed = false, role = 'admin' }) {
  const locks = LOCKS[role] || new Set();
  return (
    <aside style={{
      width: collapsed ? 64 : 240, flexShrink: 0,
      borderRight: `1px solid ${TOKENS.border}`,
      background: TOKENS.surface,
      display: 'flex', flexDirection: 'column',
      alignSelf: 'stretch',
    }}>
      {/* brand */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center',
        padding: collapsed ? '0' : '0 16px', justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: `1px solid ${TOKENS.border}`,
      }}>
        <Wordmark collapsed={collapsed} subtitle="v1" />
      </div>

      {/* nav */}
      <nav style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((it) => {
          const isActive = it.id === active;
          const isLocked = locks.has(it.id);
          return (
            <a key={it.id} title={isLocked ? '權限不足' : it.label} style={{
              height: 40, padding: collapsed ? 0 : '0 12px',
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 10, borderRadius: 3, position: 'relative',
              background: isActive ? TOKENS.surface2 : 'transparent',
              color: isLocked ? TOKENS.text3 : TOKENS.text1,
              cursor: isLocked ? 'not-allowed' : 'pointer',
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
              opacity: isLocked ? 0.55 : 1,
            }}>
              {isActive && (
                <span style={{
                  position: 'absolute', left: 0, top: 8, bottom: 8, width: 3,
                  background: TOKENS.primary, borderRadius: '0 2px 2px 0',
                }} />
              )}
              <Icon name={it.icon} size={16} color={isActive ? TOKENS.primary : (isLocked ? TOKENS.text3 : TOKENS.text2)} />
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.badge && !isLocked && (
                    <span className="tms-mono" style={{
                      fontSize: 11, fontWeight: 500,
                      color: isActive ? TOKENS.primary : TOKENS.text2,
                      background: isActive ? TOKENS.surface : TOKENS.surface2,
                      padding: '2px 6px', borderRadius: 10, minWidth: 22, textAlign: 'center',
                    }}>{it.badge}</span>
                  )}
                  {isLocked && <Icon name="Lock" size={12} color={TOKENS.text3} />}
                </>
              )}
            </a>
          );
        })}
      </nav>

      {/* collapse */}
      <div style={{ borderTop: `1px solid ${TOKENS.border}`, padding: 8 }}>
        <button type="button" style={{
          width: '100%', height: 32,
          display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 8, padding: collapsed ? 0 : '0 8px',
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: TOKENS.text2, fontSize: 13, borderRadius: 3,
        }}>
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronsLeft'} size={14} />
          {!collapsed && <span>收合導覽</span>}
        </button>
      </div>
    </aside>
  );
}

function Crumbs({ path = [] }) {
  return (
    <nav aria-label="麵包屑" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
      {path.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="ChevronRight" size={12} color={TOKENS.text3} />}
          <span style={{
            color: i === path.length - 1 ? TOKENS.text1 : TOKENS.text2,
            fontWeight: i === path.length - 1 ? 500 : 400,
          }}>{p}</span>
        </React.Fragment>
      ))}
    </nav>
  );
}

function Header({ crumbs, user = { name: 'sophia', role: 'admin', dept: '行銷處' }, search = true }) {
  return (
    <header style={{
      height: 56, flexShrink: 0,
      borderBottom: `1px solid ${TOKENS.border}`, background: TOKENS.surface,
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
    }}>
      <Crumbs path={crumbs} />
      <span style={{ flex: 1 }} />
      {search && (
        <div style={{ width: 240 }}>
          <Input placeholder="搜尋編號、專案、人員" icon="Search" />
        </div>
      )}
      <button type="button" aria-label="通知" style={{
        width: 32, height: 32, borderRadius: 3, border: `1px solid ${TOKENS.border}`,
        background: TOKENS.surface, cursor: 'pointer', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <Icon name="Bell" size={14} color={TOKENS.text2} />
        <span style={{
          position: 'absolute', top: 5, right: 6, width: 6, height: 6,
          background: TOKENS.statusDanger, borderRadius: '50%',
        }} />
      </button>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        paddingLeft: 16, borderLeft: `1px solid ${TOKENS.border}`,
      }}>
        <Avatar name={user.name} size={28} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.1 }}>
            {user.name} <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400 }}> · {user.dept}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RoleBadge role={user.role} />
          </span>
        </div>
        <Button size="sm" variant="ghost" icon="RotateCcw" style={{ marginLeft: 4 }}>切換 demo 帳號</Button>
      </div>
    </header>
  );
}

// PageHeader — title row + actions per §24.3
function PageHeader({ title, sub, actions, sticky }) {
  return (
    <div style={{
      height: 'auto', minHeight: 56, padding: '12px 0',
      display: 'flex', alignItems: 'center', gap: 16,
      ...(sticky ? { position: 'sticky', top: 0, background: TOKENS.bg, zIndex: 1 } : {}),
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500, color: TOKENS.text1, lineHeight: 1.2 }}>{title}</h1>
        {sub && <div style={{ marginTop: 4, fontSize: 12, color: TOKENS.text2 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>
    </div>
  );
}

// Outer frame helper: a screen artboard at 1440 × 900 (minimum).
// Container uses minHeight so content can grow past the spec'd height;
// main uses overflow:visible so the artboard never crops the page bottom.
function Screen({ active, role = 'admin', user, crumbs, children, sidebarCollapsed, height = 900, width = 1440 }) {
  return (
    <div className="tms" style={{
      width, minHeight: height, background: TOKENS.bg, display: 'flex', overflow: 'visible',
      position: 'relative',
    }}>
      <Sidebar active={active} collapsed={sidebarCollapsed} role={role} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header crumbs={crumbs} user={user} />
        <main style={{ flex: 1, overflow: 'visible', padding: '0 24px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Toast (success / live-demo bottom slide)
function SuccessToast({ title = '已儲存', sub = '異動將透過 email 通知 PM 與協作人員', style }) {
  return (
    <div style={{
      width: 320, minHeight: 56, padding: '10px 12px',
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
      display: 'flex', alignItems: 'center', gap: 10, ...style,
    }}>
      <Icon name="CheckCircle2" size={18} color={TOKENS.statusSuccess} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12, color: TOKENS.text2 }}>{sub}</div>
      </div>
      <button type="button" aria-label="關閉" style={{
        background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
      }}><Icon name="X" size={14} color={TOKENS.text3} /></button>
    </div>
  );
}

function MailToast({ msg = '異動已 email 通知相關人員', style }) {
  return (
    <div style={{
      maxWidth: 480, height: 48, padding: '0 16px',
      background: TOKENS.text1, color: '#f5f4f2', borderRadius: 6,
      display: 'inline-flex', alignItems: 'center', gap: 10, ...style,
    }}>
      <Icon name="Mail" size={14} />
      <span style={{ fontSize: 14 }}>{msg}</span>
      <Icon name="X" size={14} color={TOKENS.text3} style={{ marginLeft: 8, cursor: 'pointer' }} />
    </div>
  );
}

Object.assign(window, { NAV_ITEMS, Sidebar, Header, Crumbs, PageHeader, Screen, SuccessToast, MailToast });
