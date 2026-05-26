// screens-gantt.jsx — 工作負載甘特圖 月 / 季 / 年 (§29)
// Three variants: month, quarter, year. Each per spec dimensions.

// ─── Shared demo data ──────────────────────────────────────────────
// May projects:每筆掛在某人身上,role=pm 用實色,role=collab 用 60% + 虛線。
//
// 為了展示分軌堆疊 + 同人 / 跨人相依,sophia 在 5 月有 3-4 條重疊條目。
const GANTT_BARS = [
  // sophia (PM 主力)
  { id: 'P-A', person: 'sophia', role: 'pm',     name: '喜來登母親節活動 2026', start: 1,  end: 30, progress: 78, status: 'progress', track: 0 },
  { id: 'P-G', person: 'sophia', role: 'pm',     name: '集團 6 月優惠 banner',  start: 10, end: 26, progress: 60, status: 'progress', track: 1 },
  { id: 'P-F', person: 'sophia', role: 'pm',     name: '喜來登泳池 party 海報', start: 22, end: 30, progress: 5,  status: 'neutral',  track: 2 },
  // tom
  { id: 'P-A', person: 'tom',    role: 'collab', name: '喜來登母親節活動 2026', start: 5,  end: 24, progress: 78, status: 'progress', track: 0 },
  { id: 'P-G', person: 'tom',    role: 'collab', name: '集團 6 月優惠 banner',  start: 12, end: 22, progress: 60, status: 'progress', track: 1 },
  { id: 'P-E', person: 'tom',    role: 'collab', name: '寒居中秋月餅外盒',      start: 18, end: 30, progress: 30, status: 'progress', track: 2 },
  // ivens
  { id: 'P-B', person: 'ivens',  role: 'pm',     name: '艾美週年慶主視覺 KV',   start: 3,  end: 28, progress: 50, status: 'progress', track: 0 },
  { id: 'P-D', person: 'ivens',  role: 'pm',     name: '夏季新菜單拍攝',        start: 15, end: 30, progress: 20, status: 'progress', track: 1 },
  // lina
  { id: 'P-C', person: 'lina',   role: 'pm',     name: '寒沐秋冬廣告拍攝',      start: 8,  end: 30, progress: 25, status: 'progress', track: 0 },
  { id: 'P-E', person: 'lina',   role: 'pm',     name: '寒居中秋月餅外盒',      start: 18, end: 30, progress: 30, status: 'progress', track: 1 },
  { id: 'P-B', person: 'lina',   role: 'collab', name: '艾美週年慶主視覺 KV',   start: 12, end: 25, progress: 50, status: 'progress', track: 2 },
  // verna
  { id: 'P-D', person: 'verna',  role: 'collab', name: '夏季新菜單拍攝',        start: 20, end: 30, progress: 20, status: 'progress', track: 0 },
  // emma (候補 — empty)
];

const GANTT_MILESTONES = [
  { person: 'sophia', date: 18, name: '主管初審通過 · 母親節 EDM',     track: 0 },
  { person: 'sophia', date: 28, name: '母親節 EDM 完稿截止',           track: 0, current: true },
  { person: 'ivens',  date: 22, name: '週年慶 KV 第二輪內審',          track: 0 },
  { person: 'lina',   date: 25, name: '寒沐秋冬廣告腳本定稿',          track: 0 },
];

// Dependencies: same person solid; cross person dashed
const GANTT_DEPS = [
  // sophia A(end 5/18 milestone) → sophia F(start 5/22): same-person solid
  { fromPerson: 'sophia', fromDate: 18, fromTrack: 0, toPerson: 'sophia', toDate: 22, toTrack: 2 },
  // cross-person: sophia G(end 5/26) → tom E(start 5/18, but example dep into a tom bar) → actually let me put cross-person from lina C → ivens D
  { fromPerson: 'lina',   fromDate: 14, fromTrack: 0, toPerson: 'ivens',  toDate: 15, toTrack: 1, cross: true },
];

const GANTT_PEOPLE = ['sophia', 'tom', 'ivens', 'lina', 'verna', 'emma'];
const ROW_BG_ALT = `${TOKENS.surface2}55`;

// ─── Common pieces ─────────────────────────────────────────────────
function GanttPersonLabel({ name, candidate, projectsCount, expanded = true, indent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 0 0 12px', height: 32,
      borderBottom: `1px solid ${TOKENS.border}`,
      background: TOKENS.surface,
    }}>
      {projectsCount != null && (
        <Icon name={expanded ? 'ChevronDown' : 'ChevronRight'} size={12} color={TOKENS.text3} />
      )}
      <Avatar name={name} size={20} role={candidate ? 'pending' : undefined} />
      <span style={{
        fontSize: 13, fontWeight: 500,
        color: candidate ? TOKENS.text3 : TOKENS.text1,
      }}>{name}</span>
      {candidate && <span style={{ fontSize: 11, color: TOKENS.text3 }}>(候補)</span>}
      {projectsCount != null && (
        <span style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 'auto', marginRight: 8 }}>{projectsCount} 案</span>
      )}
    </div>
  );
}

function GanttLegend({ style }) {
  return (
    <div style={{
      padding: '8px 12px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
      borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 6,
      fontSize: 11, color: TOKENS.text2, ...style,
    }}>
      <span style={{ fontWeight: 500, color: TOKENS.text1, fontSize: 12 }}>圖例</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 28, height: 10, background: TOKENS.primary, borderRadius: 2 }} /> PM 負責
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 28, height: 10, background: TOKENS.primary + '99', border: `1px dashed ${TOKENS.primary}`, borderRadius: 2 }} /> 協作
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name="Diamond" size={11} color={TOKENS.statusPending} stroke={2.2} /> 里程碑
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="28" height="10" style={{ overflow: 'visible' }}>
          <line x1="0" y1="5" x2="28" y2="5" stroke={TOKENS.text3} strokeWidth="1" />
          <polygon points="22,2 28,5 22,8" fill={TOKENS.text3} />
        </svg> 同人相依
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width="28" height="10" style={{ overflow: 'visible' }}>
          <line x1="0" y1="5" x2="28" y2="5" stroke={TOKENS.text3} strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="22,2 28,5 22,8" fill={TOKENS.text3} />
        </svg> 跨人相依
      </span>
    </div>
  );
}

function GanttFilterBar({ tab, onTab }) {
  return (
    <div style={{
      height: 48, display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 16px',
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
      borderRadius: '6px 6px 0 0', borderBottom: 'none',
    }}>
      <Chip count={1} selected>人員</Chip>
      <Chip>館別</Chip>
      <Chip>處 / 部</Chip>
      <Chip>專案類型</Chip>
      <Chip icon="Check">含協作</Chip>
      <span style={{ flex: 1 }} />
      <Button size="sm" icon="ChevronLeft">上一期</Button>
      <Button size="sm" iconRight="ChevronRight">下一期</Button>
      <Button size="sm" variant="text">回到今日</Button>
    </div>
  );
}

// ─── Month view ────────────────────────────────────────────────────
const DAYS_IN_MAY = 31;
const DAY_W = 30; // px (~spec 32)
const TIME_AXIS_W = DAYS_IN_MAY * DAY_W; // 930

function GanttMonth() {
  const personRows = GANTT_PEOPLE.map((name) => {
    const bars = GANTT_BARS.filter((b) => b.person === name);
    const trackCount = Math.max(1, ...bars.map((b) => b.track + 1));
    const milestones = GANTT_MILESTONES.filter((m) => m.person === name);
    return { name, bars, milestones, trackCount, candidate: name === 'emma' };
  });

  return (
    <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderRadius: '0 0 6px 6px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {/* Left axis */}
        <div style={{ width: 240, flexShrink: 0, borderRight: `1px solid ${TOKENS.border}` }}>
          <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12, fontWeight: 500, color: TOKENS.text2 }}>
            人員 · 6 人
          </div>
          {personRows.map((p, i) => (
            <div key={p.name} style={{
              height: 32 + 28 * (p.trackCount - 1),
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0 12px', borderBottom: `1px solid ${TOKENS.border}`,
              background: i % 2 ? ROW_BG_ALT : 'transparent',
            }}>
              <Avatar name={p.name} size={22} role={p.candidate ? 'pending' : undefined} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: p.candidate ? TOKENS.text3 : TOKENS.text1 }}>
                  {p.name}{p.candidate && <span style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 4 }}>(候補)</span>}
                </div>
                <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 1 }}>
                  {p.bars.length === 0 ? '本月無專案' : `${p.bars.filter((b) => b.role === 'pm').length} PM · ${p.bars.filter((b) => b.role === 'collab').length} 協作`}
                </div>
              </div>
              {p.trackCount > 1 && (
                <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 8, background: TOKENS.primarySoft, color: TOKENS.primary, fontWeight: 500 }}>
                  {p.trackCount} 軌
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Time axis (scrollable) */}
        <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', position: 'relative' }} className="tms-scroll">
          <div style={{ width: TIME_AXIS_W, position: 'relative' }}>
            {/* day header */}
            <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, display: 'flex' }}>
              {Array.from({ length: DAYS_IN_MAY }).map((_, i) => {
                const d = i + 1;
                const dow = (d + 4) % 7; // 5/1/2026 is Friday → idx 5; tweak
                const isWeekend = dow === 0 || dow === 6;
                const isWeekStart = dow === 1;
                return (
                  <div key={i} style={{
                    width: DAY_W, flexShrink: 0,
                    borderLeft: isWeekStart ? `1px solid ${TOKENS.borderStrong}` : `1px solid ${TOKENS.border}`,
                    background: isWeekend ? TOKENS.surface2 : 'transparent',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 9, color: TOKENS.text3, lineHeight: 1 }}>{['日', '一', '二', '三', '四', '五', '六'][dow]}</span>
                    <span className="tms-mono" style={{ fontSize: 11, color: isWeekend ? TOKENS.text3 : TOKENS.text1, marginTop: 2 }}>{d}</span>
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            {personRows.map((p, ri) => {
              const rowH = 32 + 28 * (p.trackCount - 1);
              return (
                <div key={p.name} style={{
                  height: rowH, position: 'relative',
                  borderBottom: `1px solid ${TOKENS.border}`,
                  background: ri % 2 ? ROW_BG_ALT : 'transparent',
                }}>
                  {/* day grid lines */}
                  {Array.from({ length: DAYS_IN_MAY }).map((_, i) => {
                    const dow = (i + 1 + 4) % 7;
                    const isWeekend = dow === 0 || dow === 6;
                    return (
                      <div key={i} style={{
                        position: 'absolute', left: i * DAY_W, top: 0, bottom: 0, width: DAY_W,
                        background: isWeekend ? TOKENS.surface2 + '55' : 'transparent',
                        borderLeft: dow === 1 ? `1px solid ${TOKENS.border}` : 'none',
                      }} />
                    );
                  })}

                  {/* bars */}
                  {p.bars.map((b, bi) => {
                    const left = (b.start - 1) * DAY_W;
                    const w = (b.end - b.start + 1) * DAY_W;
                    const c = TOKENS.primary;
                    return (
                      <div key={`${b.id}-${bi}`} title={`${b.name} · ${b.start}-${b.end} · ${b.role === 'pm' ? 'PM' : '協作'} · ${b.progress}%`}
                        style={{
                          position: 'absolute',
                          left: left + 2, width: w - 4,
                          top: 6 + b.track * 28, height: 22,
                          background: b.role === 'pm' ? c : c + '99',
                          border: b.role === 'collab' ? `1px dashed ${c}` : 'none',
                          borderRadius: 3, overflow: 'hidden',
                          display: 'flex', alignItems: 'center', paddingLeft: 6,
                        }}>
                        {b.role === 'pm' && <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${b.progress}%`, background: 'rgba(255,255,255,0.18)' }} />}
                        <span className="tms-mono" style={{ fontSize: 10, fontWeight: 500, color: b.role === 'pm' ? '#fff' : c, position: 'relative', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {b.id} · {b.name.length > 12 ? b.name.slice(0, 11) + '…' : b.name}
                        </span>
                      </div>
                    );
                  })}

                  {/* milestones */}
                  {p.milestones.map((m, mi) => (
                    <div key={mi} title={`${m.name} · 5/${m.date}`} style={{
                      position: 'absolute',
                      left: (m.date - 0.5) * DAY_W, top: 6 + m.track * 28, height: 22,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transform: 'translateX(-50%)', zIndex: 2,
                    }}>
                      <Icon name="Diamond" size={14} color={m.current ? TOKENS.statusPending : TOKENS.statusSuccess} stroke={2.4} />
                    </div>
                  ))}

                  {p.bars.length === 0 && (
                    <div style={{
                      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                      fontSize: 11, color: TOKENS.text3,
                    }}>該期間無專案</div>
                  )}
                </div>
              );
            })}

            {/* dependency arrows overlay */}
            <svg style={{ position: 'absolute', top: 48, left: 0, width: TIME_AXIS_W, height: '100%', pointerEvents: 'none' }}>
              {GANTT_DEPS.map((d, i) => {
                // Compute y positions
                const idxFrom = GANTT_PEOPLE.indexOf(d.fromPerson);
                const idxTo = GANTT_PEOPLE.indexOf(d.toPerson);
                let yFrom = 0, yTo = 0;
                for (let k = 0; k < idxFrom; k++) yFrom += 32 + 28 * (personRows[k].trackCount - 1);
                yFrom += 6 + d.fromTrack * 28 + 11;
                for (let k = 0; k < idxTo; k++) yTo += 32 + 28 * (personRows[k].trackCount - 1);
                yTo += 6 + d.toTrack * 28 + 11;
                const xFrom = (d.fromDate) * DAY_W;
                const xTo = (d.toDate - 1) * DAY_W + 2;
                return (
                  <g key={i}>
                    <path
                      d={`M${xFrom},${yFrom} L${xFrom + 6},${yFrom} L${xFrom + 6},${yTo} L${xTo - 6},${yTo}`}
                      fill="none" stroke={TOKENS.text3} strokeWidth="1"
                      strokeDasharray={d.cross ? '3 2' : '0'}
                    />
                    <polygon points={`${xTo - 6},${yTo - 3} ${xTo},${yTo} ${xTo - 6},${yTo + 3}`} fill={TOKENS.text3} />
                  </g>
                );
              })}
            </svg>

            {/* today line — 5/25 */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0,
              left: (25 - 1) * DAY_W + DAY_W / 2, width: 1,
              background: TOKENS.statusDanger, opacity: 0.5,
              pointerEvents: 'none',
            }}>
              <span style={{
                position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
                background: TOKENS.statusDanger, color: '#fff',
                fontSize: 9, padding: '1px 5px', borderRadius: 2,
                fontFamily: '"JetBrains Mono", monospace', fontWeight: 500, whiteSpace: 'nowrap',
              }}>5/25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Quarter view ──────────────────────────────────────────────────
// 个人→專案 兩層分組 · 24px/week · 13 weeks (5月-7月)
const QUARTER_WEEKS = 13;
const WEEK_W = 28;
const QUARTER_W = QUARTER_WEEKS * WEEK_W; // 364
const QUARTER_DATA = [
  { person: 'sophia', projects: [
    { id: 'PRJ-202605-001', name: '喜來登母親節活動 2026',  start: 1,  end: 5,  status: 'progress', progress: 78 },
    { id: 'PRJ-202606-003', name: '集團夏季官網改版',        start: 4,  end: 10, status: 'progress', progress: 25 },
    { id: 'PRJ-202607-001', name: '喜來登泳池 party 系列',   start: 8,  end: 12, status: 'neutral',  progress: 0 },
  ]},
  { person: 'tom', projects: [
    { id: 'PRJ-202605-001', name: '喜來登母親節活動 2026',  start: 2,  end: 4,  status: 'progress', progress: 78, collab: true },
    { id: 'PRJ-202607-002', name: '集團異業合作 · 信用卡',   start: 6,  end: 11, status: 'progress', progress: 15 },
  ]},
  { person: 'ivens', projects: [
    { id: 'PRJ-202605-002', name: '艾美週年慶主視覺 KV',     start: 1,  end: 5,  status: 'progress', progress: 50 },
    { id: 'PRJ-202606-001', name: '夏季新菜單拍攝',          start: 3,  end: 7,  status: 'progress', progress: 20 },
    { id: 'PRJ-202607-003', name: '艾美下午茶系列素材',      start: 9,  end: 13, status: 'neutral',  progress: 0 },
  ]},
  { person: 'lina', projects: [
    { id: 'PRJ-202605-003', name: '寒沐秋冬廣告拍攝',        start: 2,  end: 8,  status: 'progress', progress: 25 },
    { id: 'PRJ-202606-002', name: '寒居中秋月餅外盒',        start: 4,  end: 11, status: 'progress', progress: 30 },
  ]},
  { person: 'verna', projects: [
    { id: 'PRJ-202606-001', name: '夏季新菜單拍攝',          start: 4,  end: 7,  status: 'progress', progress: 20, collab: true },
  ]},
];
const QUARTER_MILESTONES = [
  { person: 'sophia', projectIdx: 0, week: 4,  name: '完稿截止' },
  { person: 'ivens',  projectIdx: 0, week: 4,  name: '主視覺定稿' },
  { person: 'lina',   projectIdx: 1, week: 9,  name: '中秋上市' },
];

function GanttQuarter() {
  return (
    <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        {/* Left axis */}
        <div style={{ width: 280, flexShrink: 0, borderRight: `1px solid ${TOKENS.border}` }}>
          <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12, fontWeight: 500, color: TOKENS.text2 }}>
            人員 · 專案
          </div>
          {QUARTER_DATA.map((g, gi) => (
            <React.Fragment key={g.person}>
              <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: TOKENS.surface, borderBottom: `1px solid ${TOKENS.border}`, fontWeight: 500 }}>
                <Icon name="ChevronDown" size={12} color={TOKENS.text3} />
                <Avatar name={g.person} size={20} />
                <span style={{ fontSize: 13 }}>{g.person}</span>
                <span style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 'auto' }}>{g.projects.length} 案</span>
              </div>
              {g.projects.map((p, pi) => (
                <div key={`${g.person}-${pi}`} style={{
                  height: 32, display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0 12px 0 36px',
                  borderBottom: `1px solid ${TOKENS.border}`,
                  background: pi % 2 ? ROW_BG_ALT : 'transparent',
                }}>
                  <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, width: 50 }}>{p.id.split('-')[2]}</span>
                  <span style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{p.name}</span>
                  {p.collab && <span style={{ fontSize: 9, color: TOKENS.text3 }}>協</span>}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Time axis */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* week header */}
          <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}` }}>
            {/* month band */}
            <div style={{ display: 'flex', height: 22, borderBottom: `1px solid ${TOKENS.border}` }}>
              {[
                { l: '5 月', wk: 5 }, { l: '6 月', wk: 4 }, { l: '7 月', wk: 4 },
              ].map((m, i) => (
                <div key={i} style={{
                  flex: `0 0 ${m.wk * WEEK_W}px`, borderRight: `1px solid ${TOKENS.border}`,
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                  fontSize: 11, fontWeight: 500, color: TOKENS.text2,
                }}>{m.l}</div>
              ))}
            </div>
            {/* week ticks */}
            <div style={{ display: 'flex', height: 26 }}>
              {Array.from({ length: QUARTER_WEEKS }).map((_, i) => (
                <div key={i} className="tms-mono" style={{
                  width: WEEK_W, flexShrink: 0,
                  borderLeft: i ? `1px solid ${TOKENS.border}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: TOKENS.text3,
                }}>W{i + 18}</div>
              ))}
            </div>
          </div>

          {/* rows */}
          {QUARTER_DATA.map((g, gi) => (
            <React.Fragment key={g.person}>
              <div style={{ height: 32, background: TOKENS.surface, borderBottom: `1px solid ${TOKENS.border}`, position: 'relative' }}>
                {/* small visual: total span of all projects */}
              </div>
              {g.projects.map((p, pi) => (
                <div key={`${g.person}-${pi}`} style={{ height: 32, position: 'relative', borderBottom: `1px solid ${TOKENS.border}`, background: pi % 2 ? ROW_BG_ALT : 'transparent' }}>
                  {/* week grid */}
                  {Array.from({ length: QUARTER_WEEKS }).map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: i * WEEK_W, top: 0, bottom: 0, width: WEEK_W, borderLeft: i ? `1px solid ${TOKENS.border}88` : 'none' }} />
                  ))}
                  {/* bar */}
                  <div style={{
                    position: 'absolute',
                    left: (p.start - 1) * WEEK_W + 2,
                    width: (p.end - p.start + 1) * WEEK_W - 4,
                    top: 6, height: 20,
                    background: p.collab ? TOKENS.primary + '99' : TOKENS.primary,
                    border: p.collab ? `1px dashed ${TOKENS.primary}` : 'none',
                    borderRadius: 3, overflow: 'hidden',
                    display: 'flex', alignItems: 'center', paddingLeft: 6,
                  }}>
                    <span style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${p.progress}%`, background: 'rgba(255,255,255,0.18)' }} />
                  </div>
                  {/* milestones for this row */}
                  {QUARTER_MILESTONES.filter((m) => m.person === g.person && m.projectIdx === pi).map((m, mi) => (
                    <div key={mi} title={m.name} style={{
                      position: 'absolute', left: (m.week - 0.5) * WEEK_W, top: 7,
                      transform: 'translateX(-50%)',
                    }}>
                      <Icon name="Diamond" size={12} color={TOKENS.statusPending} stroke={2.4} />
                    </div>
                  ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Year view ─────────────────────────────────────────────────────
const YEAR_MONTHS = 12;
const MONTH_W = 64;
const YEAR_DATA = [
  { person: 'sophia', projects: [
    { id: 'PRJ-202604', name: '春季住房優惠 EDM',     start: 4,  end: 5,  c: 'progress' },
    { id: 'PRJ-202605', name: '喜來登母親節活動',     start: 5,  end: 6,  c: 'progress' },
    { id: 'PRJ-202606', name: '集團夏季官網改版',     start: 6,  end: 8,  c: 'progress' },
    { id: 'PRJ-202607', name: '泳池 party 系列',      start: 7,  end: 8,  c: 'neutral' },
    { id: 'PRJ-202610', name: '萬聖節主題活動',       start: 10, end: 11, c: 'neutral' },
    { id: 'PRJ-202612', name: '冬季住房 + 跨年',      start: 11, end: 12, c: 'neutral' },
  ]},
  { person: 'tom', projects: [
    { id: 'PRJ-202605', name: '母親節主管確認',       start: 5,  end: 6,  c: 'progress', collab: true },
    { id: 'PRJ-202607', name: '異業合作 · 信用卡',    start: 6,  end: 9,  c: 'progress' },
    { id: 'PRJ-202611', name: '年度回顧報告',         start: 11, end: 12, c: 'neutral' },
  ]},
  { person: 'ivens', projects: [
    { id: 'PRJ-202605', name: '艾美週年慶 KV',        start: 5,  end: 7,  c: 'progress' },
    { id: 'PRJ-202606', name: '夏季新菜單拍攝',       start: 5,  end: 7,  c: 'progress' },
    { id: 'PRJ-202608', name: '艾美下午茶素材',       start: 7,  end: 9,  c: 'neutral' },
    { id: 'PRJ-202610', name: '秋季咖啡新品',         start: 9,  end: 10, c: 'neutral' },
    { id: 'PRJ-202612', name: '聖誕 EDM',             start: 11, end: 12, c: 'neutral' },
  ]},
  { person: 'lina', projects: [
    { id: 'PRJ-202604', name: '寒沐春節宴會回顧',     start: 4,  end: 4,  c: 'success' },
    { id: 'PRJ-202605', name: '寒沐秋冬廣告拍攝',     start: 5,  end: 8,  c: 'progress' },
    { id: 'PRJ-202606', name: '寒居中秋月餅',         start: 6,  end: 9,  c: 'progress' },
    { id: 'PRJ-202609', name: '寒沐溫泉季',           start: 9,  end: 11, c: 'neutral' },
    { id: 'PRJ-202612', name: '寒居冬季住房',         start: 11, end: 12, c: 'neutral' },
  ]},
  { person: 'verna', projects: [
    { id: 'PRJ-202606', name: '新菜單拍攝(餐飲)',   start: 6,  end: 7,  c: 'progress', collab: true },
    { id: 'PRJ-202609', name: '中秋餐飲推廣',         start: 9,  end: 10, c: 'neutral', collab: true },
  ]},
];

function GanttYear() {
  const cMap = {
    progress: TOKENS.primary,
    neutral:  TOKENS.statusNeutral,
    success:  TOKENS.statusSuccess,
    pending:  TOKENS.statusPending,
  };
  return (
    <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        {/* Left axis */}
        <div style={{ width: 280, flexShrink: 0, borderRight: `1px solid ${TOKENS.border}` }}>
          <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12, fontWeight: 500, color: TOKENS.text2 }}>
            人員 · 年度
          </div>
          {YEAR_DATA.map((g, gi) => (
            <React.Fragment key={g.person}>
              <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', background: TOKENS.surface, borderBottom: `1px solid ${TOKENS.border}`, fontWeight: 500 }}>
                <Icon name="ChevronDown" size={12} color={TOKENS.text3} />
                <Avatar name={g.person} size={20} />
                <span style={{ fontSize: 13 }}>{g.person}</span>
                <span style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 'auto' }}>{g.projects.length} 案</span>
              </div>
              {g.projects.map((p, pi) => (
                <div key={`${g.person}-${pi}`} style={{
                  height: 24, display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0 12px 0 36px',
                  borderBottom: `1px solid ${TOKENS.border}`,
                  background: pi % 2 ? ROW_BG_ALT : 'transparent',
                  fontSize: 11,
                }}>
                  <span className="tms-mono" style={{ color: TOKENS.text3, width: 50 }}>{p.id.split('-')[1]}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{p.name}</span>
                  {p.collab && <span style={{ fontSize: 9, color: TOKENS.text3 }}>協</span>}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Time axis */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* month header */}
          <div style={{ height: 48, background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}` }}>
            {/* Quarter band */}
            <div style={{ display: 'flex', height: 22, borderBottom: `1px solid ${TOKENS.border}` }}>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
                <div key={q} style={{
                  flex: `0 0 ${3 * MONTH_W}px`, borderRight: i < 3 ? `1px solid ${TOKENS.border}` : 'none',
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                  fontSize: 11, fontWeight: 500, color: TOKENS.text2,
                }}>{q}</div>
              ))}
            </div>
            {/* Month ticks */}
            <div style={{ display: 'flex', height: 26 }}>
              {['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'].map((m, i) => (
                <div key={m} style={{
                  width: MONTH_W, flexShrink: 0,
                  borderLeft: i ? `1px solid ${TOKENS.border}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: i === 4 ? TOKENS.primary : TOKENS.text2,
                  fontWeight: i === 4 ? 500 : 400,
                }}>{m}</div>
              ))}
            </div>
          </div>

          {YEAR_DATA.map((g, gi) => (
            <React.Fragment key={g.person}>
              <div style={{ height: 32, background: TOKENS.surface, borderBottom: `1px solid ${TOKENS.border}`, position: 'relative' }} />
              {g.projects.map((p, pi) => (
                <div key={`${g.person}-${pi}`} style={{ height: 24, position: 'relative', borderBottom: `1px solid ${TOKENS.border}`, background: pi % 2 ? ROW_BG_ALT : 'transparent' }}>
                  {/* month grid */}
                  {Array.from({ length: YEAR_MONTHS }).map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: i * MONTH_W, top: 0, bottom: 0, width: MONTH_W, borderLeft: i ? `1px solid ${TOKENS.border}88` : 'none' }} />
                  ))}
                  {/* bar — no labels in year view per §29 */}
                  <div title={`${p.name} · ${p.start}-${p.end} 月`} style={{
                    position: 'absolute',
                    left: (p.start - 1) * MONTH_W + 2,
                    width: (p.end - p.start + 1) * MONTH_W - 4,
                    top: 4, height: 16,
                    background: p.collab ? cMap[p.c] + '99' : cMap[p.c],
                    border: p.collab ? `1px dashed ${cMap[p.c]}` : 'none',
                    borderRadius: 3,
                  }} />
                </div>
              ))}
            </React.Fragment>
          ))}

          {/* today vertical line — 5/25 → 5 月後 80% */}
          <div style={{
            position: 'absolute',
            left: 4 * MONTH_W + MONTH_W * (25 / 31),
            top: 0, bottom: 0, width: 1,
            background: TOKENS.statusDanger, opacity: 0.5, pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen wrappers ───────────────────────────────────────────────
function GanttScreen({ variant = 'month' }) {
  const titleMap = { month: '月報', quarter: '季報', year: '年報' };
  const subMap = {
    month:   '2026 年 5 月 · 1 → 31 · 6 人 · 多軌堆疊範例 + 跨人相依',
    quarter: '2026 Q2 + 7 月 · 個人 → 專案 兩層分組 · 週 / 月刻度',
    year:    '2026 年度 · 月刻度 · 高密度,僅 hover 顯示專案名',
  };

  return (
    <Screen
      active="gantt"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['工作負載甘特圖', titleMap[variant]]}
      height={1100}
    >
      <PageHeader
        title={`工作負載甘特圖 · ${titleMap[variant]}`}
        sub={subMap[variant]}
        actions={
          <>
            <Button icon="Filter">進階篩選</Button>
            <Button icon="Download">匯出 PNG</Button>
            <Button variant="primary" icon="Plus">新增專案</Button>
          </>
        }
      />

      {/* Tabs for month/quarter/year */}
      <div style={{ display: 'flex', height: 40, borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 0, alignItems: 'center' }}>
        {[['month', '月報'], ['quarter', '季報'], ['year', '年報']].map(([id, l]) => (
          <div key={id} style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '0 20px', height: 40, fontSize: 14, fontWeight: 500,
            color: id === variant ? TOKENS.text1 : TOKENS.text2,
            borderBottom: id === variant ? `2px solid ${TOKENS.primary}` : '2px solid transparent',
            marginBottom: -1, cursor: 'pointer',
          }}>{l}</div>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: TOKENS.text3, paddingRight: 12 }}>工作負載認定:PM + 協作都算</span>
      </div>

      <div style={{ marginTop: 16, position: 'relative' }}>
        <GanttFilterBar />
        {variant === 'month'   && <GanttMonth />}
        {variant === 'quarter' && <GanttQuarter />}
        {variant === 'year'    && <GanttYear />}

        {/* Floating legend */}
        <div style={{ position: 'absolute', top: 60, right: 12 }}>
          <GanttLegend />
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { GanttScreen, GanttMonth, GanttQuarter, GanttYear, GANTT_BARS, GANTT_PEOPLE });
