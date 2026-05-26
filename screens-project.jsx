// screens-project.jsx — Project detail (1440 × 1100)
// Per §14 + §13:項目層級高於需求單,可關聯多個 REQ + 多個任務。

const PROJECT_TASKS = [
  { id: 'T-01', name: '主視覺定調會議', kind: '主管確認', owner: 'sophia', start: '05-08', due: '05-10', status: '完成',   progress: 100 },
  { id: 'T-02', name: '初稿提案三版', kind: '設計製作', owner: 'sophia', start: '05-10', due: '05-15', status: '完成',   progress: 100 },
  { id: 'T-03', name: '主管初審 + 改稿', kind: '主管確認', owner: 'tom',    start: '05-15', due: '05-18', status: '完成',   progress: 100 },
  { id: 'T-04', name: 'EDM 完稿(雙語)', kind: '設計製作', owner: 'sophia', start: '05-20', due: '05-28', status: '進行中', progress: 75 },
  { id: 'T-05', name: '社群版本切版', kind: '設計製作', owner: 'ivens',  start: '05-22', due: '05-30', status: '進行中', progress: 40 },
  { id: 'T-06', name: '相關單位確認', kind: '相關單位', owner: 'verna',  start: '05-28', due: '06-02', status: '待確認', progress: 0 },
  { id: 'T-07', name: '完稿輸出 + 排程', kind: '設計製作', owner: 'sophia', start: '06-02', due: '06-05', status: '未開始', progress: 0 },
];

const PROJECT_REQS = [
  { id: 'REQ-20260520-01', title: '喜來登 6 月母親節餐券 EDM 設計',   status: '待確認', progress: 80, pm: 'sophia' },
  { id: 'REQ-20260521-03', title: '社群版本切版(IG / FB)',             status: '進行中', progress: 40, pm: 'ivens' },
  { id: 'REQ-20260522-02', title: '電子看板 60s 動態版本',             status: '待處理', progress: 5,  pm: 'sophia' },
];

const MILESTONES = [
  { name: '主管初審通過',         date: '05-18', done: true,  kind: 'milestone' },
  { name: 'EDM 完稿截止',         date: '05-28', done: false, kind: 'milestone', current: true },
  { name: '相關單位簽核完成',     date: '06-02', done: false, kind: 'milestone' },
  { name: '上稿 / EDM 排程',     date: '06-05', done: false, kind: 'milestone' },
];

function ProjectStatStrip() {
  const items = [
    { l: '專案進度',    v: '78%',  s: '7 項任務 · 已完成 3' },
    { l: '剩餘天數',    v: '3',    s: '截止 2026-06-05',     tone: 'pending' },
    { l: '關聯需求單', v: '3',    s: '1 待確認 / 2 進行中' },
    { l: '工作負載',    v: '4人',  s: 'PM 2 · 協作 2' },
    { l: '附件 / 紀錄',  v: '12 / 8', s: '5 個版本,8 條溝通' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0,
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      {items.map((it, i) => (
        <div key={it.l} style={{
          padding: '14px 20px', borderLeft: i ? `1px solid ${TOKENS.border}` : 'none',
        }}>
          <div style={{ fontSize: 12, color: TOKENS.text2 }}>{it.l}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{
              fontSize: 24, fontWeight: 700, lineHeight: 1, letterSpacing: -0.3,
              color: it.tone === 'pending' ? TOKENS.statusPending : TOKENS.text1,
            }} className={it.l === '專案進度' ? '' : 'tms-mono'}>{it.v}</span>
          </div>
          <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 4 }}>{it.s}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectGanttStrip() {
  // Inline gantt for the single project — shows tasks as bars across May.
  // Day scale: May 1-31 + Jun 1-7
  const dayCount = 38; // May 1 → Jun 7
  const toX = (mmDD) => {
    const [mo, d] = mmDD.split('-').map(Number);
    const dayIdx = (mo === 5 ? d - 1 : 31 + (d - 1));
    return (dayIdx / dayCount) * 100;
  };
  const today = toX('05-25');

  return (
    <div style={{
      padding: '16px 20px', background: TOKENS.surface,
      border: `1px solid ${TOKENS.border}`, borderRadius: 6, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>時程 · 5/1 → 6/7</h3>
        <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          開啟完整甘特圖<Icon name="ChevronRight" size={12} />
        </a>
      </div>
      {/* Day scale */}
      <div style={{ position: 'relative', height: 20, paddingLeft: 140, fontSize: 10, color: TOKENS.text3 }} className="tms-mono">
        {[0, 7, 14, 21, 28, 35].map((d) => (
          <span key={d} style={{ position: 'absolute', left: `calc(140px + ${(d / dayCount) * 100}% * (100% - 140px) / 100%)`, top: 0 }}>
            {d < 31 ? `5/${d + 1}` : `6/${d - 30}`}
          </span>
        ))}
      </div>

      {/* Track */}
      <div style={{ position: 'relative', borderTop: `1px solid ${TOKENS.border}` }}>
        {PROJECT_TASKS.map((t, i) => {
          const left = toX(t.start);
          const right = toX(t.due);
          const w = right - left;
          const c = t.status === '完成' ? TOKENS.statusSuccess : t.status === '待確認' ? TOKENS.statusPending : t.status === '未開始' ? TOKENS.statusNeutral : TOKENS.primary;
          return (
            <div key={t.id} style={{
              display: 'flex', height: 32, alignItems: 'center',
              borderBottom: `1px solid ${TOKENS.border}`,
              background: i % 2 ? TOKENS.surface2 + '88' : 'transparent',
            }}>
              <div style={{ width: 140, paddingLeft: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Avatar name={t.owner} size={18} />
                <span style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
              </div>
              <div style={{ flex: 1, position: 'relative', height: '100%' }}>
                <div style={{
                  position: 'absolute', top: 6, left: `${left}%`, width: `${w}%`, height: 20,
                  background: c, borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 6,
                  overflow: 'hidden',
                }}>
                  <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${t.progress}%`, background: 'rgba(255,255,255,0.18)' }} />
                  <span className="tms-mono" style={{ fontSize: 10, color: '#fff', fontWeight: 500, position: 'relative' }}>{t.id}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* milestone row */}
        <div style={{ display: 'flex', height: 28, alignItems: 'center', borderBottom: `1px solid ${TOKENS.border}`, background: TOKENS.surface2 + '88' }}>
          <div style={{ width: 140, paddingLeft: 4, fontSize: 11, color: TOKENS.text2, fontWeight: 500 }}>里程碑</div>
          <div style={{ flex: 1, position: 'relative', height: '100%' }}>
            {MILESTONES.map((m, i) => {
              const x = toX(m.date);
              return (
                <div key={i} style={{
                  position: 'absolute', left: `${x}%`, top: '50%',
                  transform: 'translate(-50%, -50%)',
                }} title={`${m.name} · ${m.date}`}>
                  <Icon name="Diamond" size={14} color={m.done ? TOKENS.statusSuccess : (m.current ? TOKENS.statusPending : TOKENS.text3)} stroke={2.2} />
                </div>
              );
            })}
          </div>
        </div>

        {/* today indicator */}
        <div style={{
          position: 'absolute', left: `calc(140px + ${today}% * (100% - 140px) / 100%)`,
          top: 0, bottom: 0, width: 1, background: TOKENS.statusDanger, opacity: 0.6,
          pointerEvents: 'none',
        }}>
          <span style={{
            position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
            background: TOKENS.statusDanger, color: '#fff',
            fontSize: 9, padding: '1px 5px', borderRadius: 2, fontWeight: 500,
            fontFamily: '"JetBrains Mono", monospace', whiteSpace: 'nowrap',
          }}>今日 5/25</span>
        </div>
      </div>

      {/* legend */}
      <div style={{ marginTop: 10, display: 'flex', gap: 14, fontSize: 11, color: TOKENS.text2, paddingLeft: 140, alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: TOKENS.statusSuccess, borderRadius: 2 }} />完成</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: TOKENS.primary, borderRadius: 2 }} />進行中</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: TOKENS.statusPending, borderRadius: 2 }} />待確認</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="Diamond" size={10} color={TOKENS.statusPending} stroke={2.2} />里程碑</span>
      </div>
    </div>
  );
}

function ProjectDetailScreen() {
  return (
    <Screen
      active="project"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['專案進度', '專案列表', '喜來登母親節活動 2026']}
      height={1180}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span className="tms-mono" style={{ fontSize: 13, color: TOKENS.text2 }}>PRJ-202605-001</span>
            <StatusBadge status="進行中" />
            <VenueTag code="SH" /><VenueTag code="GRP" />
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>A 大專案 · 開始於 2026-05-08</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>喜來登母親節活動 2026</h1>
        </div>
        <Button icon="BarChart3">在甘特圖查看</Button>
        <Button icon="Pencil">編輯專案</Button>
        <Button variant="primary" icon="Plus">新增需求單</Button>
      </div>

      {/* Stats strip */}
      <div style={{ marginBottom: 16 }}>
        <ProjectStatStrip />
      </div>

      {/* Tabs */}
      <Tabs items={[
        { id: 'overview', label: '概覽' },
        { id: 'reqs',     label: '關聯需求單', count: 3 },
        { id: 'tasks',    label: '執行項目', count: 7 },
        { id: 'thread',   label: '審閱紀錄', count: 8 },
        { id: 'files',    label: '附件', count: 12 },
      ]} active="overview" />

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, marginTop: 16, marginBottom: 16 }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Gantt strip */}
          <ProjectGanttStrip />

          {/* Linked requests */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>關聯需求單 <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400 }}>3</span></h3>
              <Button size="sm" variant="text" icon="Link">關聯既有需求單</Button>
            </div>
            {PROJECT_REQS.map((r, i) => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                borderBottom: i < PROJECT_REQS.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
              }}>
                <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer', width: 140 }}>{r.id}</a>
                <a style={{ flex: 1, fontSize: 14, color: TOKENS.text1, cursor: 'pointer' }}>{r.title}</a>
                <Avatar name={r.pm} size={22} />
                <span style={{ fontSize: 12, width: 56 }}>{r.pm}</span>
                <div style={{ width: 120 }}><ProgressBar value={r.progress} status={r.status} /></div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>

          {/* Tasks (executive items) */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>執行項目 <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400 }}>7 項 · 3 完成 · 2 進行中</span></h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <Segmented options={['全部', '進行中', '待我處理']} value="全部" />
                <Button size="sm" variant="text" icon="Plus">新增項目</Button>
              </div>
            </div>
            {/* mini head */}
            <div style={{ display: 'flex', height: 32, alignItems: 'center', padding: '0 20px', background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, fontSize: 12, fontWeight: 500, color: TOKENS.text2 }}>
              <span style={{ width: 60 }}>編號</span>
              <span style={{ flex: 1 }}>任務</span>
              <span style={{ width: 100 }}>類別</span>
              <span style={{ width: 100 }}>負責</span>
              <span style={{ width: 130 }}>期程</span>
              <span style={{ width: 96 }}>狀態</span>
              <span style={{ width: 100, textAlign: 'right' }}>進度</span>
            </div>
            {PROJECT_TASKS.map((t, i) => (
              <div key={t.id} style={{ display: 'flex', height: 44, alignItems: 'center', padding: '0 20px', borderBottom: i < PROJECT_TASKS.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                <span className="tms-mono" style={{ width: 60, fontSize: 12, color: TOKENS.text2 }}>{t.id}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{t.name}</span>
                <span style={{ width: 100 }}><Chip>{t.kind}</Chip></span>
                <span style={{ width: 100, display: 'flex', alignItems: 'center', gap: 6 }}><Avatar name={t.owner} size={20} /><span style={{ fontSize: 12 }}>{t.owner}</span></span>
                <span className="tms-mono" style={{ width: 130, fontSize: 12, color: TOKENS.text2 }}>{t.start} → {t.due}</span>
                <span style={{ width: 96 }}><StatusBadge status={t.status} /></span>
                <div style={{ width: 100 }}><ProgressBar value={t.progress} status={t.status} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Team */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>專案團隊</h3>
              <Button size="sm" variant="text" icon="Plus">新增</Button>
            </div>
            <div style={{ padding: '0 16px' }}>
              {[
                { name: 'sophia', role: 'PM',    sub: '主要負責',  badge: '主 PM' },
                { name: 'ivens',  role: 'PM',    sub: '社群版本',  badge: 'PM' },
                { name: 'tom',    role: 'reviewer', sub: '直屬主管' },
                { name: 'verna',  role: 'stakeholder', sub: '需求單位窗口' },
                { name: 'emma',   role: 'pending', sub: '行銷處 · 待確認' },
              ].map((p, i, arr) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <Avatar name={p.name} size={28} role={p.role === 'pending' ? 'pending' : undefined} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: TOKENS.text3 }}>{p.sub}</div>
                  </div>
                  {p.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 2,
                      background: p.badge === '主 PM' ? TOKENS.primary : TOKENS.primarySoft,
                      color: p.badge === '主 PM' ? '#fff' : TOKENS.primary,
                    }}>{p.badge}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>里程碑</h3>
            </div>
            <div style={{ padding: '4px 16px' }}>
              {MILESTONES.map((m, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <Icon name="Diamond" size={14} color={m.done ? TOKENS.statusSuccess : (m.current ? TOKENS.statusPending : TOKENS.text3)} stroke={2.2} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: m.done ? TOKENS.text2 : TOKENS.text1, textDecoration: m.done ? 'line-through' : 'none' }}>{m.name}</div>
                  </div>
                  <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2 }}>05/{m.date.slice(3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent attachments */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>最近附件</h3>
              <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>全部 12 →</a>
            </div>
            {[
              { n: '喜來登_母親節_EDM_v3.psd',   who: 'tom',    when: '05-20' },
              { n: '社群版面_IG_story_v1.fig',  who: 'ivens',  when: '05-22' },
              { n: '電子看板_60s_腳本.docx',     who: 'sophia', when: '05-23' },
            ].map((f, i, arr) => (
              <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                <Icon name="FileText" size={14} color={TOKENS.text2} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.n}</div>
                  <div style={{ fontSize: 11, color: TOKENS.text3 }}>{f.who} · {f.when}</div>
                </div>
                <Icon name="Download" size={14} color={TOKENS.text2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { ProjectDetailScreen, PROJECT_TASKS, PROJECT_REQS, MILESTONES });
