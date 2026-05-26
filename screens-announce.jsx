// screens-announce.jsx — 公告與會議 + 審閱/溝通紀錄 timeline (§16)

// ─── Announcement list ────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { id: 'A-25', title: '6 月母親節活動 KPI 與分工方向(2026)',         pub: 'tom',    publishedAt: '2026-05-23 11:20', endsAt: '2026-06-15', pinned: true,  status: 'active',  views: 14, attach: 2 },
  { id: 'A-24', title: '【系統公告】mkt-tms v1 上線 + 教學連結',         pub: 'lina',   publishedAt: '2026-05-20 09:00', endsAt: '2026-06-30', pinned: true,  status: 'active',  views: 14, attach: 1 },
  { id: 'A-23', title: '本月部門例會時段調整通知',                       pub: 'sophia', publishedAt: '2026-05-19 17:42', endsAt: '2026-05-31', pinned: false, status: 'active',  views: 13, attach: 0 },
  { id: 'A-22', title: '外包供應商續約清單 · 請相關 PM 5/30 前回覆',      pub: 'lina',   publishedAt: '2026-05-18 14:30', endsAt: '2026-05-30', pinned: false, status: 'active',  views: 9,  attach: 1 },
  { id: 'A-21', title: '夏季新菜單拍攝 · 7 月排程確認',                 pub: 'ivens',  publishedAt: '2026-05-15 10:15', endsAt: '2026-06-01', pinned: false, status: 'active',  views: 11, attach: 0 },
  { id: 'A-20', title: '【FYI】品牌色票交付時程(暫定)',                pub: 'tom',    publishedAt: '2026-05-12 09:00', endsAt: '',           pinned: false, status: 'active',  views: 12, attach: 0 },
  { id: 'A-19', title: '5 月部門教育訓練 · 簡報模板使用',                 pub: 'sophia', publishedAt: '2026-05-08 14:00', endsAt: '2026-05-31', pinned: false, status: 'expiring', views: 12, attach: 3 },
  { id: 'A-18', title: '【已結束】4 月部門檢討會議紀要',                  pub: 'tom',    publishedAt: '2026-05-02 16:30', endsAt: '2026-05-15', pinned: false, status: 'archived', views: 14, attach: 1 },
];

function AnnouncementListScreen() {
  return (
    <Screen
      active="announce"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['公告與會議', '公告列表']}
    >
      <PageHeader
        title="公告"
        sub="2 筆置頂 · 5 筆生效中 · 1 筆即將結束"
        actions={
          <>
            <Button icon="Mail">會議列表</Button>
            <Button variant="primary" icon="Plus">新增公告</Button>
          </>
        }
      />

      <div style={{
        height: 48, display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <Segmented options={['全部', '置頂', '我發布的', '已結束']} value="全部" />
        <span style={{ width: 1, height: 20, background: TOKENS.border, margin: '0 4px' }} />
        <Chip>發布者</Chip>
        <Chip icon="Calendar">本月</Chip>
        <span style={{ flex: 1 }} />
        <Input placeholder="搜尋標題、內容" icon="Search" style={{ width: 240 }} />
      </div>

      <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
        {ANNOUNCEMENTS.map((a, i) => (
          <div key={a.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`,
            opacity: a.status === 'archived' ? 0.6 : 1,
          }}>
            <span style={{ width: 28, display: 'flex', justifyContent: 'center' }}>
              {a.pinned && <Icon name="Diamond" size={14} color={TOKENS.statusPending} stroke={2.2} title="置頂" />}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                {a.pinned && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.statusPending + '1f', color: TOKENS.statusPending }}>置頂</span>}
                {a.status === 'expiring' && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.statusPending + '1f', color: TOKENS.statusPending }}>即將結束</span>}
                {a.status === 'archived' && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text2 }}>已結束</span>}
                <a style={{ fontSize: 14, fontWeight: 500, color: TOKENS.text1, cursor: 'pointer' }}>{a.title}</a>
                {a.attach > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11, color: TOKENS.text3 }}><Icon name="Paperclip" size={11} color={TOKENS.text3} />{a.attach}</span>}
              </div>
              <div style={{ fontSize: 12, color: TOKENS.text3, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Avatar name={a.pub} size={16} />{a.pub}</span>
                <span>·</span>
                <span className="tms-mono">發布 {a.publishedAt}</span>
                {a.endsAt && <><span>·</span><span className="tms-mono">至 {a.endsAt}</span></>}
                <span>·</span>
                <span><Icon name="Eye" size={11} color={TOKENS.text3} style={{ marginRight: 3, verticalAlign: '-2px' }} />{a.views}/14 已讀</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={14} color={TOKENS.text3} />
          </div>
        ))}
      </div>

      <Pagination total={ANNOUNCEMENTS.length} page={1} />
    </Screen>
  );
}

// ─── Announcement detail ──────────────────────────────────────────
function AnnouncementDetailScreen() {
  return (
    <Screen
      active="announce"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['公告與會議', '公告列表', 'A-25']}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, paddingTop: 16 }}>

        <div>
          {/* Title row */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 2, background: TOKENS.statusPending + '1f', color: TOKENS.statusPending }}>置頂</span>
              <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2 }}>A-25</span>
              <span style={{ fontSize: 12, color: TOKENS.text3 }}>·</span>
              <span style={{ fontSize: 12, color: TOKENS.text2 }}>面向:行銷處、數位處、餐飲部</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: 1.3 }}>
              6 月母親節活動 KPI 與分工方向(2026)
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 13, color: TOKENS.text2 }}>
              <Avatar name="tom" size={24} />
              <span style={{ fontWeight: 500, color: TOKENS.text1 }}>tom</span>
              <RoleBadge role="super_admin" />
              <span>·</span>
              <span className="tms-mono">2026-05-23 11:20</span>
              <span>·</span>
              <span className="tms-mono">生效至 2026-06-15</span>
            </div>
          </div>

          {/* Content */}
          <article style={{
            padding: '24px 28px', background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
            fontSize: 14, lineHeight: 1.8, color: TOKENS.text1,
          }}>
            <p style={{ marginTop: 0 }}>
              各位夥伴,母親節是 5-6 月最重要的檔期。今年集團整體 KPI 為餐券銷售 +18%、住房 +10%,
              各館請依以下方向展開:
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 500, marginTop: 24, marginBottom: 8 }}>1. 主視覺與素材</h3>
            <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
              <li>主視覺由 sophia 負責,5/28 前完稿。雙語(中 / 英)並列版本必出。</li>
              <li>社群版本由 ivens 切版,IG / FB 9:16 + 1:1 各一套。</li>
              <li>電子看板 60s 動態版本需排入 5/30 製作。</li>
            </ul>

            <h3 style={{ fontSize: 16, fontWeight: 500, marginTop: 24, marginBottom: 8 }}>2. 餐券與住房分工</h3>
            <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
              <li>餐券面額分 NT$ 1,200 / 2,400 / 3,600 三檔,雙語並列。</li>
              <li>住房 package 由 lina 統籌,5/30 前提供詳情頁文案給 sophia 上稿。</li>
              <li>餐飲部窗口 verna 負責蒐集各館 F&B 限定品項,5/26 前回傳。</li>
            </ul>

            <h3 style={{ fontSize: 16, fontWeight: 500, marginTop: 24, marginBottom: 8 }}>3. 上稿與 EDM 排程</h3>
            <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
              <li>官網 banner 6/1 上稿,EDM 6/3 + 6/8 各一發。</li>
              <li>各館 Line OA 推播由各館行銷自行排程,集團統一給素材包。</li>
              <li>採購相關(KOL 合作、外包印刷)請開 PO 並關聯 REQ。</li>
            </ul>

            <p style={{ marginBottom: 0, color: TOKENS.text2, fontSize: 13, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${TOKENS.border}` }}>
              有疑問請直接在本公告下方留言,或於 5/27(三)10:30 部門例會提出。
            </p>
          </article>

          {/* Attachments */}
          <div style={{ marginTop: 16, padding: '14px 20px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500 }}>附件 · 2</h3>
            {[
              { n: '2026_母親節_KPI_拆解.xlsx',     s: '124 KB' },
              { n: '2026_母親節_時程_甘特圖.pdf',   s: '892 KB' },
            ].map((f) => (
              <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${TOKENS.border}` }}>
                <Icon name="FileText" size={14} color={TOKENS.text2} />
                <a style={{ flex: 1, fontSize: 13, color: TOKENS.primary, cursor: 'pointer' }}>{f.n}</a>
                <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text3 }}>{f.s}</span>
                <Icon name="Download" size={14} color={TOKENS.text2} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6, padding: '14px 16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500 }}>已讀狀態</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
              <span className="tms-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>14/14</span>
              <span style={{ fontSize: 12, color: TOKENS.text2 }}>已讀</span>
            </div>
            <div style={{ height: 4, background: TOKENS.surface2, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: TOKENS.statusSuccess }} />
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: TOKENS.text2, lineHeight: 1.6 }}>
              全部已讀 · 最後一位於 2026-05-23 16:42 讀取
            </div>
          </div>

          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>關聯項目</h3>
            </div>
            <div style={{ padding: '4px 16px' }}>
              {[
                { kind: '專案', id: 'PRJ-202605-001', name: '喜來登母親節活動 2026' },
                { kind: '需求單', id: 'REQ-20260520-01', name: 'EDM 設計' },
                { kind: '會議', id: 'M-2026-05-27', name: '部門例會' },
              ].map((r, i, arr) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text2 }}>{r.kind}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a className="tms-mono" style={{ fontSize: 11, color: TOKENS.primary, cursor: 'pointer' }}>{r.id}</a>
                    <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6, padding: '14px 16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 500 }}>操作</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button icon="Pencil">編輯</Button>
              <Button icon="Diamond">取消置頂</Button>
              <Button danger icon="Trash2">刪除</Button>
            </div>
          </div>
        </aside>
      </div>
    </Screen>
  );
}

// ─── Meeting list ─────────────────────────────────────────────────
const MEETINGS = [
  { id: 'M-2026-05-27', title: '5 月部門例會',                date: '2026-05-27', time: '10:30-12:00', host: 'tom',    location: '集團 8F 會議室 A', attendees: 14, hasMinutes: false, status: 'upcoming' },
  { id: 'M-2026-05-26', title: '母親節 EDM v3 最終審',         date: '2026-05-26', time: '14:00-15:00', host: 'sophia', location: 'Google Meet',     attendees: 6,  hasMinutes: false, status: 'upcoming' },
  { id: 'M-2026-05-23', title: '寒沐秋冬廣告腳本對齊',         date: '2026-05-23', time: '15:00-16:30', host: 'lina',   location: 'Google Meet',     attendees: 5,  hasMinutes: true,  status: 'done' },
  { id: 'M-2026-05-20', title: '艾美週年慶 KV 提案會',         date: '2026-05-20', time: '11:00-12:30', host: 'ivens',  location: '集團 8F 會議室 B', attendees: 8,  hasMinutes: true,  status: 'done' },
  { id: 'M-2026-05-15', title: '5/12 部門例會(改期)',         date: '2026-05-15', time: '10:30-12:00', host: 'tom',    location: '集團 8F 會議室 A', attendees: 13, hasMinutes: true,  status: 'done' },
  { id: 'M-2026-05-12', title: '5 月品牌色票對齊(取消)',     date: '2026-05-12', time: '14:00-15:00', host: 'lina',   location: 'Google Meet',     attendees: 0,  hasMinutes: false, status: 'cancelled' },
];

function MeetingListScreen() {
  return (
    <Screen
      active="announce"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['公告與會議', '會議列表']}
    >
      <PageHeader
        title="會議"
        sub="2 場即將進行 · 3 場已結束 · 1 場已取消"
        actions={
          <>
            <Button icon="Megaphone">公告列表</Button>
            <Button variant="primary" icon="Plus">新增會議</Button>
          </>
        }
      />

      <div style={{
        height: 48, display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <Segmented options={['全部', '即將進行', '我主持', '我出席']} value="全部" />
        <Chip>主持人</Chip>
        <Chip icon="Calendar">2026/05</Chip>
        <span style={{ flex: 1 }} />
        <Input placeholder="搜尋會議標題" icon="Search" style={{ width: 240 }} />
      </div>

      {/* group by date */}
      <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
        {MEETINGS.map((m, i) => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`,
            opacity: m.status === 'cancelled' ? 0.5 : 1,
          }}>
            <div style={{
              width: 60, flexShrink: 0, textAlign: 'center',
              padding: '8px 0', borderRadius: 3,
              background: m.status === 'upcoming' ? TOKENS.primarySoft : TOKENS.surface2,
              border: m.status === 'upcoming' ? `1px solid ${TOKENS.primary}55` : `1px solid ${TOKENS.border}`,
            }}>
              <div style={{ fontSize: 10, color: m.status === 'upcoming' ? TOKENS.primary : TOKENS.text3, fontWeight: 500 }}>
                {['日','一','二','三','四','五','六'][new Date(m.date).getDay()]}
              </div>
              <div className="tms-mono" style={{ fontSize: 18, fontWeight: 700, color: m.status === 'upcoming' ? TOKENS.primary : TOKENS.text2, lineHeight: 1.1 }}>
                {m.date.split('-')[2]}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                {m.status === 'cancelled' && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.statusCancel + '1f', color: TOKENS.statusCancel }}>已取消</span>}
                <a style={{ fontSize: 14, fontWeight: 500, color: TOKENS.text1, cursor: 'pointer' }}>{m.title}</a>
              </div>
              <div style={{ fontSize: 12, color: TOKENS.text2, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="tms-mono">{m.time}</span>
                <span>·</span>
                <span>{m.location}</span>
                <span>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>主持 <Avatar name={m.host} size={16} /> {m.host}</span>
                <span>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="Users" size={11} color={TOKENS.text3} />{m.attendees} 人</span>
              </div>
            </div>
            {m.hasMinutes ? (
              <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 3, background: TOKENS.statusSuccess + '1f', color: TOKENS.statusSuccess, fontWeight: 500 }}>已紀錄</span>
            ) : m.status === 'upcoming' ? (
              <Button size="sm">加入會議</Button>
            ) : m.status === 'cancelled' ? null : (
              <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 3, background: TOKENS.statusPending + '1f', color: TOKENS.statusPending, fontWeight: 500 }}>待紀錄</span>
            )}
            <Icon name="ChevronRight" size={14} color={TOKENS.text3} />
          </div>
        ))}
      </div>

      <Pagination total={MEETINGS.length} page={1} />
    </Screen>
  );
}

// ─── Meeting detail with comm timeline ─────────────────────────────
const MEETING_TIMELINE = [
  // Pre-meeting prep
  { when: '2026-05-23 11:20', who: 'tom',    role: 'super_admin', kind: 'create',  text: '建立會議 · 母親節 KPI 與分工方向' },
  { when: '2026-05-23 11:21', who: 'tom',    role: 'super_admin', kind: 'attach',  text: '上傳議程附件',  files: ['2026_母親節_KPI_拆解.xlsx'] },
  { when: '2026-05-23 14:08', who: 'sophia', role: 'admin',       kind: 'invite',  text: '加入出席者 sophia, ivens, lina, verna' },
  // Meeting in progress
  { when: '2026-05-27 10:30', who: 'tom',    role: 'super_admin', kind: 'start',   text: '會議開始 · 議程 1 / 分工方向確認' },
  { when: '2026-05-27 10:42', who: 'sophia', role: 'admin',       kind: 'question',text: '問題:雙語並列版本若空間不足,英文是否可縮為 70%?' },
  { when: '2026-05-27 10:45', who: 'tom',    role: 'super_admin', kind: 'answer',  text: '回答:可以,但 logo 區雙語並列不可調整。' },
  { when: '2026-05-27 11:05', who: 'verna',  role: 'viewer',      kind: 'confirm', text: '確認:F&B 限定品項已蒐集,5/26 前回傳。',
    visibility: '對開單單位可見' },
  { when: '2026-05-27 11:18', who: 'lina',   role: 'super_admin', kind: 'reject',  text: '退回:外包印刷供應商續約清單需先看到報價對照,本月不續約。' },
  { when: '2026-05-27 11:36', who: 'ivens',  role: 'admin',       kind: 'version', text: 'IG / FB 切版 mockup 已更新 v2',
    files: ['social_mockup_v2.fig'] },
  { when: '2026-05-27 12:00', who: 'tom',    role: 'super_admin', kind: 'end',     text: '會議結束 · 已產生紀錄' },
];

const MTL_KIND = {
  create:  { l: '建立',  c: TOKENS.text2,         i: 'Plus' },
  attach:  { l: '附件',  c: TOKENS.text2,         i: 'Paperclip' },
  invite:  { l: '邀請',  c: TOKENS.text2,         i: 'Users' },
  start:   { l: '開始',  c: TOKENS.primary,       i: 'CircleDot' },
  end:     { l: '結束',  c: TOKENS.statusSuccess, i: 'CheckCircle2' },
  question:{ l: '問題',  c: TOKENS.statusPending, i: 'AlertCircle' },
  answer:  { l: '回答',  c: TOKENS.primary,       i: 'Mail' },
  reject:  { l: '退回',  c: TOKENS.statusDanger,  i: 'Undo2' },
  version: { l: '版本',  c: TOKENS.text2,         i: 'History' },
  confirm: { l: '確認',  c: TOKENS.statusSuccess, i: 'CheckCircle2' },
};

function CommTimeline({ items }) {
  return (
    <div style={{ position: 'relative', paddingLeft: 8 }}>
      {/* vertical line */}
      <div style={{ position: 'absolute', left: 23, top: 14, bottom: 14, width: 1, background: TOKENS.border }} />
      {items.map((t, i) => {
        const k = MTL_KIND[t.kind] || MTL_KIND.create;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', position: 'relative' }}>
            {/* marker */}
            <span style={{
              width: 32, height: 32, flexShrink: 0,
              borderRadius: '50%', background: TOKENS.surface,
              border: `2px solid ${k.c}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1,
            }}>
              <Icon name={k.i} size={14} color={k.c} stroke={2} />
            </span>
            {/* content */}
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2, flexWrap: 'wrap' }}>
                <Avatar name={t.who} size={20} />
                <strong style={{ fontSize: 13, fontWeight: 500 }}>{t.who}</strong>
                <RoleBadge role={t.role} />
                <span style={{
                  fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 2,
                  background: k.c + '1f', color: k.c,
                }}>{k.l}</span>
                {t.visibility && <span style={{ fontSize: 10, color: TOKENS.text3, fontStyle: 'italic' }}>{t.visibility}</span>}
                <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 'auto' }}>{t.when}</span>
              </div>
              <div style={{ fontSize: 13, color: TOKENS.text1, lineHeight: 1.6 }}>{t.text}</div>
              {t.files && t.files.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {t.files.map((f) => (
                    <span key={f} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 8px', borderRadius: 3,
                      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
                      fontSize: 12,
                    }}>
                      <Icon name="Paperclip" size={11} color={TOKENS.text2} />
                      <a style={{ color: TOKENS.primary, cursor: 'pointer' }}>{f}</a>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MeetingDetailScreen() {
  return (
    <Screen
      active="announce"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['公告與會議', '會議列表', 'M-2026-05-27']}
      height={1280}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 0 16px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="tms-mono" style={{ fontSize: 13, color: TOKENS.text2 }}>M-2026-05-27</span>
            <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 2, background: TOKENS.statusSuccess + '1f', color: TOKENS.statusSuccess }}>已紀錄</span>
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>·</span>
            <span style={{ fontSize: 12, color: TOKENS.text2 }}>例會 · 月度</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>5 月部門例會</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, fontSize: 13, color: TOKENS.text2 }}>
            <span className="tms-mono">2026-05-27(三) 10:30-12:00</span>
            <span>·</span>
            <span>集團 8F 會議室 A</span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              主持 <Avatar name="tom" size={20} /><strong style={{ color: TOKENS.text1 }}>tom</strong>
            </span>
          </div>
        </div>
        <Button icon="Download">匯出會議紀錄</Button>
        <Button icon="Pencil">編輯</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 16 }}>
        {/* Left: agenda + minutes + timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Agenda */}
          <div style={{ padding: '4px 20px 16px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>議程</h3>
            </div>
            {[
              { i: 1, t: '分工方向確認(母親節 KPI + 主視覺 + 餐券)', who: 'tom',    min: 30, done: true },
              { i: 2, t: '艾美週年慶 KV 第二輪審查',                    who: 'ivens',  min: 20, done: true },
              { i: 3, t: '寒沐秋冬廣告腳本第三輪改稿說明',              who: 'lina',   min: 15, done: true },
              { i: 4, t: '系統 v1 上線後使用回饋',                       who: 'sophia', min: 15, done: false },
              { i: 5, t: '其他事項 / 跨部門協作問題',                    who: 'tom',    min: 10, done: false },
            ].map((a, i, arr) => (
              <div key={a.i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: a.done ? TOKENS.statusSuccess : TOKENS.surface,
                  border: a.done ? 'none' : `1.5px solid ${TOKENS.text3}`,
                  color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {a.done ? <Icon name="Check" size={12} stroke={2.4} /> : a.i}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: TOKENS.text1, textDecoration: a.done ? 'line-through' : 'none', opacity: a.done ? 0.7 : 1 }}>{a.t}</div>
                  <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>主談 {a.who} · 預計 {a.min} 分鐘</div>
                </div>
              </div>
            ))}
          </div>

          {/* Minutes (selectable into actions/comments) */}
          <div style={{ padding: '4px 20px 16px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>會議紀錄</h3>
              <span style={{ fontSize: 12, color: TOKENS.text3 }}>由 sophia 記錄 · 自動同步 timeline</span>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: TOKENS.text1 }}>
              <p style={{ margin: '8px 0' }}><strong style={{ fontWeight: 500 }}>1. 分工確認 · </strong>主視覺(sophia)、社群(ivens)、電子看板(共)、F&B 餐券(verna 蒐集);5/28 完稿、6/1 上稿。</p>
              <p style={{ margin: '8px 0' }}><strong style={{ fontWeight: 500 }}>2. 雙語版面 · </strong>英文可縮 70%,logo 區雙語並列不可調整。</p>
              <p style={{ margin: '8px 0' }}><strong style={{ fontWeight: 500 }}>3. 外包印刷 · </strong>本月不續約;lina 5/30 前提供報價對照後再議。</p>
              <p style={{ margin: '8px 0' }}><strong style={{ fontWeight: 500 }}>4. 待辦 · </strong>verna(5/26 回傳)、ivens(社群 v3 5/28)、lina(報價 5/30)、sophia(完稿 5/28)。</p>
            </div>
          </div>

          {/* Communication timeline */}
          <div style={{ padding: '4px 20px 16px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>審閱 / 溝通紀錄 timeline</h3>
              <Segmented options={['全部', '問題 / 回答', '退回', '版本']} value="全部" />
            </div>
            <CommTimeline items={MEETING_TIMELINE} />
          </div>
        </div>

        {/* Right: attendees + related + actions */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>出席 14 人 · 已到 12</h3>
              <Button size="sm" variant="text">名單</Button>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  { name: 'tom',    state: 'present', isHost: true  },
                  { name: 'sophia', state: 'present' },
                  { name: 'ivens',  state: 'present' },
                  { name: 'lina',   state: 'present' },
                  { name: 'verna',  state: 'present' },
                  { name: 'emma',   state: 'present',  candidate: true },
                  { name: 'ryan',   state: 'present',  candidate: true },
                  { name: 'chloe',  state: 'absent',   candidate: true },
                  { name: 'noah',   state: 'present',  candidate: true },
                  { name: 'mia',    state: 'present',  candidate: true },
                  { name: 'liam',   state: 'absent',   candidate: true },
                  { name: 'grace',  state: 'present',  candidate: true },
                  { name: 'leo',    state: 'present',  candidate: true },
                  { name: 'hannah', state: 'present',  candidate: true },
                ].map((p) => (
                  <span key={p.name} title={`${p.name} · ${p.state === 'present' ? '出席' : '請假'}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 8px 3px 4px', borderRadius: 10,
                    background: p.state === 'absent' ? TOKENS.surface2 : TOKENS.surface,
                    border: p.candidate ? `1px dashed ${TOKENS.border}` : `1px solid ${TOKENS.border}`,
                    fontSize: 11,
                    opacity: p.state === 'absent' ? 0.55 : 1,
                  }}>
                    <Avatar name={p.name} size={16} role={p.candidate ? 'pending' : undefined} />
                    {p.name}
                    {p.isHost && <span style={{ fontSize: 9, color: TOKENS.primary, marginLeft: 2 }}>主持</span>}
                    {p.state === 'absent' && <Icon name="X" size={9} color={TOKENS.text3} />}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>關聯項目</h3>
            </div>
            <div style={{ padding: '4px 16px' }}>
              {[
                { kind: '公告', id: 'A-25', name: '6 月母親節 KPI 與分工' },
                { kind: '專案', id: 'PRJ-202605-001', name: '喜來登母親節活動 2026' },
                { kind: '需求單', id: 'REQ-20260520-01', name: 'EDM 設計 v3' },
              ].map((r, i, arr) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text2 }}>{r.kind}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a className="tms-mono" style={{ fontSize: 11, color: TOKENS.primary, cursor: 'pointer' }}>{r.id}</a>
                    <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{r.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6, padding: '14px 16px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 500 }}>待辦事項(由紀錄產生)</h3>
            {[
              { who: 'verna',  what: '回傳 F&B 限定品項',     due: '05-26' },
              { who: 'ivens',  what: '社群版本 v3 切版',      due: '05-28' },
              { who: 'sophia', what: '母親節 EDM 完稿',        due: '05-28' },
              { who: 'lina',   what: '外包印刷報價對照',      due: '05-30' },
            ].map((t, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                <Icon name="Circle" size={14} color={TOKENS.text3} />
                <Avatar name={t.who} size={20} />
                <span style={{ flex: 1, fontSize: 12 }}>{t.what}</span>
                <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.statusPending }}>05/{t.due.slice(3)}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Screen>
  );
}

Object.assign(window, {
  AnnouncementListScreen, AnnouncementDetailScreen,
  MeetingListScreen, MeetingDetailScreen,
  CommTimeline, MEETING_TIMELINE,
});
