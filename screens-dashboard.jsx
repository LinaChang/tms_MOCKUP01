// screens-dashboard.jsx — Dashboard (1440 × 900)

// Per §9: stats / 待處理-完成 status counts / personal workload / 即將到期專案 /
// 最近異動 / 需審核項目 / 甘特圖入口

const STATS = [
  { label: '我的需求單', value: 24, sub: '進行中 11 · 待我處理 3', delta: '+2 本週' },
  { label: '我擔任 PM',  value: 6,  sub: '4 個專案進行中',          delta: '本週 2 件到期' },
  { label: '待我簽核',   value: 3,  sub: '最久已等 2 天',            delta: '注意', deltaTone: 'pending' },
  { label: '本月完成',   value: 18, sub: '上月 21,-14%',             delta: '', },
];

const STATUS_DIST = [
  { name: '待處理', value: 12, color: TOKENS.statusNeutral },
  { name: '進行中', value: 36, color: TOKENS.statusProgress },
  { name: '待確認', value: 16, color: TOKENS.statusPending },
  { name: '完成',   value: 12, color: TOKENS.statusSuccess },
  { name: '取消',   value: 4,  color: TOKENS.statusCancel },
];

const DUE_SOON = [
  { id: 'REQ-20260520-01', title: '喜來登 6 月母親節餐券 EDM 設計',     pm: 'sophia', venue: 'SH',  due: '05-28', daysLeft: 3, status: '進行中' },
  { id: 'REQ-20260518-02', title: '艾美週年慶活動主視覺 KV',              pm: 'ivens',  venue: 'LM',  due: '05-29', daysLeft: 4, status: '待確認' },
  { id: 'REQ-20260515-04', title: '集團官網 6 月優惠 banner 更新',         pm: 'sophia', venue: 'GRP', due: '05-30', daysLeft: 5, status: '進行中' },
  { id: 'REQ-20260514-01', title: '寒沐溫泉季秋冬廣告拍攝',                pm: 'lina',   venue: 'MU',  due: '06-02', daysLeft: 8, status: '進行中' },
  { id: 'REQ-20260512-03', title: '餐飲部夏季新菜單拍攝',                  pm: 'ivens',  venue: 'GRP', due: '06-05', daysLeft: 11,status: '待處理' },
];

const RECENT = [
  { who: 'sophia', what: '退回了', target: 'REQ-20260520-01 v3 稿', detail: '字級偏小,主標請改 48 / 副標 24', when: '14:32', type: 'reject' },
  { who: 'tom',    what: '上傳附件至', target: 'REQ-20260518-02',     detail: '艾美_週年慶_主視覺_提案A.pdf · 4.2 MB',   when: '13:08', type: 'file' },
  { who: 'lina',   what: '建立了', target: 'PO-20260518-01',            detail: '寒沐秋冬廣告外包供應商:好景影像工作室', when: '11:24', type: 'create' },
  { who: 'verna',  what: '在審閱中提問', target: 'REQ-20260515-04',     detail: '餐券面額可否同時放雙語?',             when: '09:15', type: 'comment' },
  { who: 'ivens',  what: '完成了', target: 'REQ-20260510-02',           detail: '艾美下午茶平面 + 影片素材',           when: '昨日',  type: 'done' },
];

const REVIEW_QUEUE = [
  { id: 'REQ-20260520-01', kind: '版本確認', from: 'tom',   age: '2 小時' },
  { id: 'REQ-20260519-03', kind: '直屬主管', from: 'ivens', age: '6 小時' },
  { id: 'PO-20260518-01',  kind: '採購核准', from: 'lina',  age: '1 天' },
];

function StatCard({ s }) {
  return (
    <div style={{
      flex: 1, padding: '16px 20px',
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      <div style={{ fontSize: 13, color: TOKENS.text2 }}>{s.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: -0.5 }}>{s.value}</span>
        {s.delta && (
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: s.deltaTone === 'pending' ? TOKENS.statusPending : TOKENS.text2,
          }}>{s.delta}</span>
        )}
      </div>
      <div style={{ fontSize: 12, color: TOKENS.text3, marginTop: 6 }}>{s.sub}</div>
    </div>
  );
}

function StatusDistribution() {
  const total = STATUS_DIST.reduce((a, b) => a + b.value, 0);
  return (
    <div style={{
      padding: 20, background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>需求單狀態分布</h3>
        <Segmented options={['全部', '我的']} value="全部" />
      </div>
      {/* stacked bar */}
      <div style={{
        height: 12, borderRadius: 2, overflow: 'hidden',
        display: 'flex', background: TOKENS.surface2,
      }}>
        {STATUS_DIST.map((s) => (
          <div key={s.name} style={{ width: `${(s.value / total) * 100}%`, background: s.color }} />
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {STATUS_DIST.map((s) => (
          <div key={s.name}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
              <span style={{ fontSize: 12, color: TOKENS.text2 }}>{s.name}</span>
            </div>
            <div className="tms-mono" style={{ fontSize: 18, fontWeight: 700, color: TOKENS.text1 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkloadMini() {
  // tiny gantt-ish strip for §9 个人工作負載
  const people = [
    { name: 'sophia', role: 'PM',  bars: [{ s: 1,  e: 12, fill: 0.7, c: TOKENS.primary, t: '母親節 EDM' }, { s: 14, e: 21, fill: 0.3, c: TOKENS.primary, t: '泳池 party' }] },
    { name: 'ivens',  role: 'PM',  bars: [{ s: 3,  e: 18, fill: 0.5, c: TOKENS.primary, t: '週年慶 KV' }, { s: 20, e: 27, fill: 0.1, c: TOKENS.primary, t: '夏季菜單' }] },
    { name: 'tom',    role: 'collab', bars: [{ s: 5,  e: 14, fill: 0.8, c: TOKENS.primary, t: 'banner 更新', dash: true }] },
    { name: 'lina',   role: 'PM',  bars: [{ s: 8,  e: 28, fill: 0.4, c: TOKENS.primary, t: '寒沐秋冬廣告' }] },
    { name: 'verna',  role: 'view', bars: [] },
  ];
  const days = 31;
  return (
    <div style={{
      padding: 20, background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>本月工作負載 · 月報</h3>
        <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          前往完整甘特圖<Icon name="ChevronRight" size={12} />
        </a>
      </div>
      {/* axis */}
      <div style={{ display: 'flex', height: 18, paddingLeft: 80, fontSize: 10, color: TOKENS.text3 }} className="tms-mono">
        {[1, 5, 10, 15, 20, 25, 30].map((d) => (
          <div key={d} style={{ position: 'relative', flex: d === 30 ? 1 : (d === 1 ? 4 : 5), borderLeft: d === 1 ? 'none' : `1px solid ${TOKENS.border}`, paddingLeft: 4 }}>
            5/{d}
          </div>
        ))}
      </div>
      {people.map((p, i) => (
        <div key={p.name} style={{
          display: 'flex', alignItems: 'center', height: 32,
          borderTop: `1px solid ${TOKENS.border}`,
          background: i % 2 ? TOKENS.surface2 : 'transparent',
        }}>
          <div style={{ width: 80, display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
            <Avatar name={p.name} size={20} />
            <span style={{ fontSize: 12 }}>{p.name}</span>
          </div>
          <div style={{ flex: 1, position: 'relative', height: '100%' }}>
            {p.bars.map((b, j) => (
              <div key={j} style={{
                position: 'absolute', top: 6, height: 20,
                left: `${((b.s - 1) / days) * 100}%`,
                width: `${((b.e - b.s) / days) * 100}%`,
                background: b.dash ? 'transparent' : b.c,
                border: b.dash ? `1px dashed ${b.c}` : 'none',
                borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 6, gap: 4,
                overflow: 'hidden',
              }}>
                <span style={{ fontSize: 10, color: b.dash ? b.c : '#fff', whiteSpace: 'nowrap', fontWeight: 500 }}>{b.t}</span>
                {!b.dash && <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${b.fill * 100}%`, background: 'rgba(255,255,255,0.15)', borderRadius: 3 }} />}
              </div>
            ))}
            {/* milestone */}
            {p.name === 'ivens' && (
              <div style={{ position: 'absolute', top: 8, left: `${(15 / days) * 100}%`, transform: 'translateX(-50%)' }}>
                <Icon name="Diamond" size={14} color={TOKENS.statusPending} stroke={2} />
              </div>
            )}
            {p.bars.length === 0 && (
              <span style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: TOKENS.text3 }}>
                本月無專案
              </span>
            )}
          </div>
        </div>
      ))}
      {/* legend */}
      <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 11, color: TOKENS.text2, paddingLeft: 80 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: TOKENS.primary, borderRadius: 2 }} />PM 負責</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, border: `1px dashed ${TOKENS.primary}`, borderRadius: 2 }} />協作</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="Diamond" size={10} color={TOKENS.statusPending} stroke={2} />里程碑</span>
      </div>
    </div>
  );
}

function DueSoonList() {
  return (
    <div style={{
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${TOKENS.border}` }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>即將到期 · 14 天內</h3>
        <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>查看全部</a>
      </div>
      {DUE_SOON.map((r) => (
        <div key={r.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 20px', borderBottom: `1px solid ${TOKENS.border}`,
        }}>
          <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.primary, width: 140, flexShrink: 0 }}>{r.id}</span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: TOKENS.text1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {r.title}
          </span>
          <VenueTag code={r.venue} />
          <Avatar name={r.pm} size={20} />
          <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2, width: 56, textAlign: 'right' }}>{r.due}</span>
          <span style={{
            fontSize: 11, fontWeight: 500, width: 50, textAlign: 'right',
            color: r.daysLeft <= 3 ? TOKENS.statusDanger : r.daysLeft <= 7 ? TOKENS.statusPending : TOKENS.text2,
          }}>
            剩 {r.daysLeft} 天
          </span>
          <StatusBadge status={r.status} />
        </div>
      ))}
    </div>
  );
}

function RecentActivity() {
  const iconFor = {
    reject:  { i: 'Undo2',         c: TOKENS.statusDanger  },
    file:    { i: 'Paperclip',     c: TOKENS.text2         },
    create:  { i: 'Plus',          c: TOKENS.primary       },
    comment: { i: 'Mail',          c: TOKENS.text2         },
    done:    { i: 'CheckCircle2',  c: TOKENS.statusSuccess },
  };
  return (
    <div style={{
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${TOKENS.border}` }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>最近異動</h3>
      </div>
      <div style={{ padding: '8px 20px' }}>
        {RECENT.map((r, i) => {
          const ic = iconFor[r.type];
          return (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < RECENT.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
              <span style={{
                width: 24, height: 24, borderRadius: '50%',
                background: ic.c + '14', color: ic.c,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={ic.i} size={12} color={ic.c} stroke={2} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13 }}>
                  <strong style={{ fontWeight: 500 }}>{r.who}</strong>
                  <span style={{ color: TOKENS.text2 }}> {r.what} </span>
                  <a className="tms-mono" style={{ color: TOKENS.primary, cursor: 'pointer' }}>{r.target}</a>
                </div>
                <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{r.detail}</div>
              </div>
              <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, flexShrink: 0 }}>{r.when}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReviewQueue() {
  return (
    <div style={{
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
    }}>
      <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `1px solid ${TOKENS.border}` }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>待我處理</h3>
        <span style={{ fontSize: 11, color: TOKENS.text3 }}>共 {REVIEW_QUEUE.length} 件</span>
      </div>
      {REVIEW_QUEUE.map((r, i) => (
        <div key={r.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 20px', borderBottom: i < REVIEW_QUEUE.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
        }}>
          <span style={{ width: 6, height: 6, background: TOKENS.statusPending, borderRadius: '50%' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <a className="tms-mono" style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>{r.id}</a>
            <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{r.kind} · 由 {r.from} 送出</div>
          </div>
          <span style={{ fontSize: 11, color: TOKENS.text3 }}>等待 {r.age}</span>
          <Button size="sm">處理</Button>
        </div>
      ))}
    </div>
  );
}

function DashboardScreen() {
  return (
    <Screen active="dashboard" crumbs={['儀表板']} user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}>
      <PageHeader
        title="儀表板"
        sub="2026 年 5 月 25 日(週一) · 早安,sophia"
        actions={<>
          <Button icon="Filter">本月</Button>
          <Button variant="primary" icon="Plus">新增需求單</Button>
        </>}
      />

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {STATS.map((s, i) => <StatCard key={i} s={s} />)}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 16 }}>
        <StatusDistribution />
        <ReviewQueue />
      </div>

      <div style={{ marginBottom: 16 }}>
        <WorkloadMini />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <DueSoonList />
        <RecentActivity />
      </div>

      <div style={{ marginTop: 24, paddingBottom: 16, fontSize: 11, color: TOKENS.text3, textAlign: 'center' }}>
        資料更新於 2026-05-25 14:42 · 工作負荷計分公式已取消(原 SPEC),改以工作負載甘特圖認定
      </div>
    </Screen>
  );
}

Object.assign(window, { DashboardScreen, STATS, STATUS_DIST });
