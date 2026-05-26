// screens-completion.jsx — Live demo coverage completion:
//   1. Project List
//   2. Modal & Drawer reference (3 modal sizes + 2 drawer sizes)
//   3. Notification panel (bell dropdown)
//   4. States reference (hover / focus / disabled / loading / empty / error)

// ═════════════════════════════════════════════════════════════════
// 1. Project List (§14 implied by §4 nav "專案進度")
// ═════════════════════════════════════════════════════════════════

const PROJECTS = [
  { id: 'PRJ-202605-001', name: '喜來登母親節活動 2026',     venue: ['SH','GRP'], type: 'A 大專案',   pm: 'sophia', collab: ['tom','ivens','verna'], reqs: 3, tasks: 7, progress: 78, status: '進行中', start: '2026-05-08', due: '2026-06-05' },
  { id: 'PRJ-202605-002', name: '艾美週年慶主視覺 KV',         venue: ['LM'],       type: 'A 大專案',   pm: 'ivens',  collab: ['sophia','lina'],       reqs: 2, tasks: 5, progress: 50, status: '進行中', start: '2026-05-03', due: '2026-06-28' },
  { id: 'PRJ-202605-003', name: '寒沐秋冬廣告拍攝',            venue: ['MU'],       type: 'A 大專案',   pm: 'lina',   collab: ['ivens'],                reqs: 1, tasks: 4, progress: 25, status: '進行中', start: '2026-05-08', due: '2026-08-30' },
  { id: 'PRJ-202606-001', name: '夏季新菜單拍攝',              venue: ['SH','LM','MU'], type: 'D 一般專案', pm: 'ivens',  collab: ['verna','sophia'],     reqs: 2, tasks: 6, progress: 20, status: '進行中', start: '2026-05-15', due: '2026-07-10' },
  { id: 'PRJ-202606-002', name: '寒居中秋月餅外盒設計',        venue: ['HB'],       type: 'D 一般專案', pm: 'lina',   collab: ['tom','sophia'],         reqs: 1, tasks: 5, progress: 30, status: '進行中', start: '2026-05-16', due: '2026-09-15' },
  { id: 'PRJ-202606-003', name: '集團夏季官網改版',            venue: ['GRP'],      type: 'A 大專案',   pm: 'sophia', collab: ['tom','ivens','lina'],   reqs: 4, tasks: 8, progress: 5,  status: '待處理', start: '2026-06-01', due: '2026-08-31' },
  { id: 'PRJ-202607-001', name: '喜來登泳池 party 系列',       venue: ['SH'],       type: 'C 小型任務', pm: 'sophia', collab: ['tom'],                  reqs: 2, tasks: 3, progress: 0,  status: '待處理', start: '2026-07-01', due: '2026-07-31' },
  { id: 'PRJ-202607-002', name: '集團異業合作 · 聯名信用卡',   venue: ['GRP'],      type: 'E 異業合作', pm: 'tom',    collab: ['sophia'],               reqs: 1, tasks: 6, progress: 70, status: '待確認', start: '2026-05-15', due: '2026-07-15' },
  { id: 'PRJ-202504-001', name: '2025 母親節活動回顧',         venue: ['GRP'],      type: 'B 例行性',   pm: 'sophia', collab: ['tom'],                  reqs: 8, tasks: 12, progress: 100, status: '完成',   start: '2025-04-01', due: '2025-06-30' },
  { id: 'PRJ-202604-002', name: '集團 1Q 數位廣告(已取消)',   venue: ['GRP'],      type: 'D 一般專案', pm: 'lina',   collab: ['ivens'],                reqs: 0, tasks: 0, progress: 0,  status: '取消',   start: '2026-04-15', due: '2026-06-30' },
];

const PRJ_COLS = [
  { key: 'id',       label: '編號',         w: 130, sortable: true },
  { key: 'name',     label: '專案名稱',     w: 280, sortable: true },
  { key: 'venue',    label: '館別',         w: 96  },
  { key: 'type',     label: '類型',         w: 100 },
  { key: 'pm',       label: 'PM',           w: 88  },
  { key: 'team',     label: '團隊',         w: 96  },
  { key: 'reqs',     label: 'REQ',          w: 56  },
  { key: 'progress', label: '進度',         w: 110 },
  { key: 'status',   label: '狀態',         w: 88  },
  { key: 'due',      label: '截止',         w: 96, sortable: true },
  { key: '__',       label: '',             w: 36  },
];

function ProjectListScreen() {
  return (
    <Screen
      active="project"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['專案進度', '專案列表']}
    >
      <PageHeader
        title="專案進度"
        sub={`共 ${PROJECTS.length} 個專案 · 7 進行中 · 2 待處理 · 1 待確認 · 1 完成 · 1 取消`}
        actions={
          <>
            <Button icon="BarChart3">在甘特圖查看</Button>
            <Button icon="Download">匯出</Button>
            <Button variant="primary" icon="Plus">新增專案</Button>
          </>
        }
      />

      <div style={{
        minHeight: 48, display: 'flex', alignItems: 'center', gap: 8, rowGap: 8,
        padding: '8px 16px', flexWrap: 'wrap',
        background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
        borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <Segmented options={['全部資料', '我擔任 PM', '我參與']} value="全部資料" />
        <Chip count={3} selected>狀態</Chip>
        <Chip>館別</Chip>
        <Chip>專案類型</Chip>
        <Chip icon="Calendar">2026 Q2</Chip>
        <span style={{ flex: 1 }} />
        <Button variant="text" size="sm">重設</Button>
        <span style={{ width: 1, height: 20, background: TOKENS.border, margin: '0 4px' }} />
        <Input placeholder="搜尋編號 / 名稱 / PM" icon="Search" style={{ width: 200 }} />
      </div>

      <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
        {/* head */}
        <div style={{
          display: 'flex', position: 'sticky', top: 0, zIndex: 2,
          background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`,
          height: 40, alignItems: 'center', padding: '0 12px',
        }}>
          {PRJ_COLS.map((c) => (
            <div key={c.key} style={{
              width: c.w, flexShrink: 0, paddingRight: 8,
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, fontWeight: 500, color: TOKENS.text2,
            }}>
              {c.label}
              {c.sortable && <Icon name={c.key === 'due' ? 'ArrowUp' : 'ArrowUpDown'} size={11} color={c.key === 'due' ? TOKENS.text1 : TOKENS.text3} />}
            </div>
          ))}
        </div>

        {/* rows */}
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', padding: '0 12px', height: 56,
            borderBottom: `1px solid ${TOKENS.border}`,
            background: i === 0 ? TOKENS.primarySoft : 'transparent', position: 'relative',
            opacity: p.status === '取消' ? 0.55 : 1,
          }}>
            {i === 0 && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: TOKENS.primary }} />}
            <div style={{ width: 130, flexShrink: 0, paddingRight: 8 }}>
              <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer', whiteSpace: 'nowrap' }}>{p.id}</a>
              <div className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3, marginTop: 2 }}>{p.start}</div>
            </div>
            <div style={{ width: 280, flexShrink: 0, paddingRight: 8, minWidth: 0 }}>
              <a style={{ fontSize: 14, color: TOKENS.primary, cursor: 'pointer', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</a>
              <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>{p.reqs} 個 REQ · {p.tasks} 個任務</div>
            </div>
            <div style={{ width: 96, flexShrink: 0, paddingRight: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {p.venue.slice(0, 2).map((v) => <VenueTag key={v} code={v} />)}
              {p.venue.length > 2 && <VenueTag code={`+${p.venue.length - 2}`} />}
            </div>
            <div style={{ width: 100, flexShrink: 0, paddingRight: 8, fontSize: 13, color: TOKENS.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.type}</div>
            <div style={{ width: 88, flexShrink: 0, paddingRight: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Avatar name={p.pm} size={22} /><span style={{ fontSize: 13 }}>{p.pm}</span>
            </div>
            <div style={{ width: 96, flexShrink: 0, paddingRight: 8 }}><CollabAvatars list={p.collab} /></div>
            <div style={{ width: 56, flexShrink: 0, paddingRight: 8 }}>
              <span className="tms-mono" style={{ fontSize: 13, fontWeight: 500 }}>{p.reqs}</span>
            </div>
            <div style={{ width: 110, flexShrink: 0, paddingRight: 12 }}><ProgressBar value={p.progress} status={p.status} /></div>
            <div style={{ width: 88, flexShrink: 0, paddingRight: 8 }}><StatusBadge status={p.status} /></div>
            <div style={{ width: 96, flexShrink: 0, paddingRight: 8 }}>
              <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2 }}>{p.due}</span>
            </div>
            <div style={{ width: 36, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <Icon name="MoreHorizontal" size={14} color={TOKENS.text3} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>

      <Pagination total={PROJECTS.length} page={1} />
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════════
// 2. Modal & Drawer reference (§31)
//    Stage view: backdrop + floating panel. Each tile demonstrates
//    one use case so dev can directly lift the markup.
// ═════════════════════════════════════════════════════════════════

function ModalStage({ size, title, sub, children, footer, w, h = 360 }) {
  const width = w || size;
  return (
    <div style={{
      position: 'relative', height: h, borderRadius: 6,
      background: 'rgba(20,20,18,0.4)', overflow: 'hidden',
      border: `1px solid ${TOKENS.border}`,
    }}>
      {/* dim screen mock-up */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.04) 6px 7px)',
      }} />
      {/* the modal */}
      <div style={{
        position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)',
        width, maxWidth: 'calc(100% - 32px)',
        background: TOKENS.surface, borderRadius: 6,
        border: `1px solid ${TOKENS.border}`, overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
      }}>
        <div style={{
          height: 56, padding: '0 20px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: `1px solid ${TOKENS.border}`,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
            {sub && <div style={{ fontSize: 12, color: TOKENS.text3, marginTop: 2 }}>{sub}</div>}
          </div>
          <Icon name="X" size={14} color={TOKENS.text3} style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ padding: 20 }}>{children}</div>
        {footer && (
          <div style={{
            height: 64, padding: '0 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderTop: `1px solid ${TOKENS.border}`, background: TOKENS.surface,
          }}>{footer}</div>
        )}
      </div>
      {/* size label */}
      <span className="tms-mono" style={{
        position: 'absolute', left: 8, bottom: 8,
        fontSize: 10, color: 'rgba(255,255,255,0.7)',
        background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 2,
      }}>{size}px</span>
    </div>
  );
}

function DrawerStage({ size, title, sub, children, w, h = 460 }) {
  return (
    <div style={{
      position: 'relative', height: h, borderRadius: 6,
      background: 'rgba(20,20,18,0.4)', overflow: 'hidden',
      border: `1px solid ${TOKENS.border}`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.04) 6px 7px)',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: w,
        maxWidth: 'calc(100% - 32px)',
        background: TOKENS.surface, borderLeft: `1px solid ${TOKENS.border}`,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          height: 56, padding: '0 20px',
          display: 'flex', alignItems: 'center', gap: 8,
          borderBottom: `1px solid ${TOKENS.border}`,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
            {sub && <div style={{ fontSize: 12, color: TOKENS.text3, marginTop: 2 }}>{sub}</div>}
          </div>
          <Icon name="X" size={14} color={TOKENS.text3} />
        </div>
        <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>{children}</div>
      </div>
      <span className="tms-mono" style={{
        position: 'absolute', left: 8, bottom: 8,
        fontSize: 10, color: 'rgba(255,255,255,0.7)',
        background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 2,
      }}>{size}</span>
    </div>
  );
}

function ModalDrawerNotifRef({ width = 1440, height = 1500 }) {
  const Card = ({ label, num, children, span = 1 }) => (
    <div style={{ gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3 }}>{num}</span>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{label}</h4>
      </div>
      {children}
    </div>
  );

  return (
    <div className="tms" style={{ width, minHeight: height, background: TOKENS.bg, padding: 32, overflow: 'visible' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, letterSpacing: 1 }}>§31 · MODAL / DRAWER · §21 NOTIFICATION</div>
        <h2 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 500 }}>覆蓋層 / 浮層 reference</h2>
        <div style={{ fontSize: 13, color: TOKENS.text2 }}>
          所有覆蓋層的版型 + 真實 demo 使用情境 · header / footer / backdrop 規範
        </div>
      </div>

      <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>Modal · 三檔寬度</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>

        <Card label="Small · 480px" num="MD-S">
          <ModalStage size={480} title="刪除需求單?" sub="REQ-20260520-01"
            footer={<>
              <span style={{ flex: 1 }} />
              <Button>取消</Button>
              <Button danger variant="primary" icon="Trash2">確定刪除</Button>
            </>}>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: TOKENS.text1 }}>
              刪除後將同時移除 6 個執行項目、5 個附件與 8 條溝通紀錄。
              此動作無法復原。
            </div>
            <div style={{ marginTop: 12, padding: '10px 12px', background: TOKENS.statusDanger + '0d', border: `1px solid ${TOKENS.statusDanger}33`, borderRadius: 3, fontSize: 12, color: TOKENS.statusDanger }}>
              <Icon name="AlertCircle" size={12} color={TOKENS.statusDanger} style={{ verticalAlign: '-2px', marginRight: 4 }} />
              本單尚有 1 張關聯採購單 PO-20260523-02 · 一併刪除前請先確認
            </div>
          </ModalStage>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>
            用於確認危險動作 · 短訊息 · footer 高 64 · 主要動作放右
          </div>
        </Card>

        <Card label="Medium · 640px" num="MD-M">
          <ModalStage size={640} title="新增使用者" sub="寄出邀請信後對方點擊驗證即啟用"
            footer={<>
              <span style={{ flex: 1 }} />
              <Button>取消</Button>
              <Button variant="primary" icon="Mail">建立並寄出邀請</Button>
            </>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="姓名" required><Input value="" placeholder="例:emma" /></Field>
              <Field label="Email" required><Input value="" placeholder="user@hotelgroup.tw" icon="Mail" /></Field>
              <Field label="處 / 部" required><Input value="行銷處" type="select" /></Field>
              <Field label="角色" required><Input value="編輯者" type="select" /></Field>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: TOKENS.text3 }}>
              帳號名稱(小寫英文)由 email 前綴自動生成 · 之後不可更改
            </div>
          </ModalStage>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>
            用於短表單 · 2 欄式 320px · 不放主要編輯流程(那要走獨立頁面)
          </div>
        </Card>

        <Card label="Large · 800px" num="MD-L">
          <ModalStage size={800} title="附件快速預覽" sub="喜來登_母親節_EDM_v3.psd · 18.4 MB"
            footer={<>
              <span style={{ fontSize: 12, color: TOKENS.text3, flex: 1 }}>由 tom 於 05-20 16:01 上傳</span>
              <Button icon="History">版本對照</Button>
              <Button variant="primary" icon="Download">下載</Button>
            </>}>
            <div style={{
              height: 180, borderRadius: 3,
              background: `repeating-linear-gradient(135deg, ${TOKENS.surface2} 0 12px, ${TOKENS.surface} 12px 13px)`,
              border: `1px solid ${TOKENS.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: TOKENS.text3, fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            }}>EDM v3 預覽縮圖 (placeholder)</div>
          </ModalStage>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>
            用於快速檢視 · 圖片預覽 · 版本對照 · 多檔切換
          </div>
        </Card>
      </div>

      <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>Drawer · 兩檔寬度 + Notification 浮層</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

        <Card label="Drawer 標準 · 400px" num="DW-S">
          <DrawerStage size="400px" title="進階篩選" sub="需求單列表" w={360}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="館別"><Input value="SH, LM" type="select" /></Field>
              <Field label="處 / 部"><Input value="行銷處" type="select" /></Field>
              <Field label="專案類型"><Input value="A 大專案" type="select" /></Field>
              <Field label="PM"><Input value="sophia (3)" type="select" /></Field>
              <Field label="協作"><Input value="未選擇" type="select" /></Field>
              <Field label="需求大類"><Input value="美工設計" type="select" /></Field>
              <Field label="設計來源"><Input value="館內設計" type="select" /></Field>
              <Field label="開單日區間">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Input value="2026-05-01" icon="Calendar" mono />
                  <span style={{ color: TOKENS.text3 }}>→</span>
                  <Input value="2026-05-31" icon="Calendar" mono />
                </div>
              </Field>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 12, borderTop: `1px solid ${TOKENS.border}` }}>
                <Button>重設</Button>
                <Button variant="primary" style={{ flex: 1, justifyContent: 'center' }}>套用 (12 筆)</Button>
              </div>
            </div>
          </DrawerStage>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>用於進階篩選器 · 多欄位但不複雜</div>
        </Card>

        <Card label="Drawer 寬 · 560px" num="DW-L">
          <DrawerStage size="560px" title="REQ-20260520-01" sub="喜來登 6 月母親節餐券 EDM 設計" w={500}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <StatusBadge status="待確認" />
              <span style={{ fontSize: 12, color: TOKENS.text3 }}>進度 80%</span>
              <span style={{ flex: 1 }} />
              <a className="tms-mono" style={{ fontSize: 11, color: TOKENS.primary }}>開啟完整詳情 →</a>
            </div>
            <div style={{ padding: '8px 0', borderTop: `1px solid ${TOKENS.border}` }}>
              <InfoRow label="館別" w={80}><VenueTag code="SH" /></InfoRow>
              <InfoRow label="PM" w={80}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name="sophia" size={20} />sophia</span>
              </InfoRow>
              <InfoRow label="期程" w={80}><span className="tms-mono" style={{ fontSize: 13 }}>05-20 → 05-28</span></InfoRow>
              <InfoRow label="附件" w={80}>5 個 · 最新 EDM_v3.psd</InfoRow>
              <InfoRow label="採購單" w={80}>
                <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary }}>PO-20260520-02</a>
              </InfoRow>
            </div>
            <div style={{ marginTop: 12, padding: '8px 12px', background: TOKENS.surface2, borderRadius: 3, fontSize: 12 }}>
              <strong style={{ fontWeight: 500 }}>最新異動 · </strong>
              <span style={{ color: TOKENS.text2 }}>sophia 退回 v2 · 字級偏小,主標請改 48 / 副標 24 · 14:32</span>
            </div>
          </DrawerStage>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>用於快速預覽 · 從列表點 row 開啟 · 不取代詳情頁</div>
        </Card>

        <Card label="Notification panel · 360px" num="NP">
          <div style={{
            position: 'relative', height: 460, borderRadius: 6,
            background: 'rgba(20,20,18,0.4)', overflow: 'hidden',
            border: `1px solid ${TOKENS.border}`,
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.04) 6px 7px)' }} />
            {/* simulated bell icon at top-right */}
            <div style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 3, background: TOKENS.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${TOKENS.border}` }}>
              <Icon name="Bell" size={14} color={TOKENS.primary} />
              <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: TOKENS.statusDanger, border: `1.5px solid ${TOKENS.surface}` }} />
            </div>
            {/* dropdown panel */}
            <div style={{
              position: 'absolute', top: 56, right: 12, width: 360,
              background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
              boxShadow: '0 12px 32px rgba(0,0,0,0.18)', overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${TOKENS.border}` }}>
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>通知</h4>
                <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 6px', borderRadius: 2, background: TOKENS.statusDanger + '1f', color: TOKENS.statusDanger, fontWeight: 500 }}>3 新</span>
                <span style={{ flex: 1 }} />
                <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>全部標為已讀</a>
              </div>
              {[
                { who: 'tom',    text: '退回了你的 REQ-20260520-01 v2 稿',  when: '14:32', new: true,  kind: 'reject' },
                { who: 'lina',   text: '新增了採購單 PO-20260524-01 需要核准', when: '11:18', new: true,  kind: 'po' },
                { who: 'verna',  text: '在 REQ-20260515-04 提問:餐券面額可否雙語?', when: '09:15', new: true,  kind: 'comment' },
                { who: 'ivens',  text: '完成了 REQ-20260510-02 並送出簽核',   when: '昨日',  new: false, kind: 'done' },
                { who: 'sophia', text: '上傳 喜來登_母親節_EDM_v3.psd',        when: '昨日',  new: false, kind: 'file' },
              ].map((n, i, arr) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, padding: '10px 16px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
                  background: n.new ? TOKENS.primarySoft + '55' : 'transparent',
                  position: 'relative',
                }}>
                  {n.new && <span style={{ position: 'absolute', top: 16, left: 6, width: 6, height: 6, borderRadius: '50%', background: TOKENS.primary }} />}
                  <Avatar name={n.who} size={26} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                      <strong style={{ fontWeight: 500 }}>{n.who}</strong>
                      <span style={{ color: TOKENS.text2 }}> {n.text}</span>
                    </div>
                    <div className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3, marginTop: 3 }}>{n.when}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'center', borderTop: `1px solid ${TOKENS.border}` }}>
                <a style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>查看全部通知 →</a>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: TOKENS.text3, lineHeight: 1.5 }}>由 header bell 圖示點開 · 未讀以淡主色背景 + 左側點 · 滾動式</div>
        </Card>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
// 4. States Reference (hover / focus / disabled / loading / empty / error)
// ═════════════════════════════════════════════════════════════════

function StatesRef({ width = 1200, height = 1480 }) {
  // For each component, show 6-8 states side by side.
  const Cell = ({ label, children, w }) => (
    <div style={{ width: w || 'auto', flexShrink: 0 }}>
      <div className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3, marginBottom: 6, letterSpacing: 0.5 }}>{label}</div>
      <div>{children}</div>
    </div>
  );
  const Row = ({ title, children, sub }) => (
    <section style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${TOKENS.border}` }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{title}</h3>
        {sub && <div style={{ fontSize: 12, color: TOKENS.text3, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>{children}</div>
    </section>
  );

  return (
    <div className="tms" style={{ width, minHeight: height, background: TOKENS.bg, padding: 32, overflow: 'visible' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, letterSpacing: 1 }}>STATES REFERENCE · §35 #12</div>
        <h2 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 500 }}>互動狀態完整對照</h2>
        <div style={{ fontSize: 13, color: TOKENS.text2 }}>
          每個原子元件的 8 種狀態 · 同列並陳,dev 切版時直接比對
        </div>
      </div>

      {/* Button states */}
      <Row title="Button · Primary" sub="6 狀態 + 危險變體">
        <Cell label="DEFAULT"><Button variant="primary" icon="Plus">新增需求單</Button></Cell>
        <Cell label="HOVER">
          <button type="button" style={{
            height: 32, padding: '0 12px', borderRadius: 3, fontSize: 14, fontWeight: 500,
            background: '#1d3e4a', color: '#fff', border: `1px solid #1d3e4a`,
            display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1.4,
          }}><Icon name="Plus" size={14} />新增需求單</button>
        </Cell>
        <Cell label="FOCUS">
          <button type="button" style={{
            height: 32, padding: '0 12px', borderRadius: 3, fontSize: 14, fontWeight: 500,
            background: TOKENS.primary, color: '#fff', border: `1px solid ${TOKENS.primary}`,
            outline: `2px solid ${TOKENS.focus}`, outlineOffset: 2,
            display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1.4,
          }}><Icon name="Plus" size={14} />新增需求單</button>
        </Cell>
        <Cell label="DISABLED"><Button variant="primary" icon="Plus" disabled>新增需求單</Button></Cell>
        <Cell label="LOADING"><Button variant="primary" loading>儲存中</Button></Cell>
        <Cell label="DANGER · default"><Button danger variant="primary" icon="Trash2">刪除</Button></Cell>
      </Row>

      <Row title="Button · Secondary">
        <Cell label="DEFAULT"><Button icon="Download">匯出</Button></Cell>
        <Cell label="HOVER">
          <button type="button" style={{
            height: 32, padding: '0 12px', borderRadius: 3, fontSize: 14, fontWeight: 500,
            background: TOKENS.surface2, color: TOKENS.text1, border: `1px solid ${TOKENS.borderStrong}`,
            display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1.4,
          }}><Icon name="Download" size={14} />匯出</button>
        </Cell>
        <Cell label="FOCUS">
          <button type="button" style={{
            height: 32, padding: '0 12px', borderRadius: 3, fontSize: 14, fontWeight: 500,
            background: TOKENS.surface, color: TOKENS.text1, border: `1px solid ${TOKENS.border}`,
            outline: `2px solid ${TOKENS.focus}`, outlineOffset: 2,
            display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1.4,
          }}><Icon name="Download" size={14} />匯出</button>
        </Cell>
        <Cell label="DISABLED"><Button icon="Download" disabled>匯出</Button></Cell>
        <Cell label="DANGER"><Button danger icon="Trash2">刪除</Button></Cell>
      </Row>

      {/* Input states */}
      <Row title="Input · 8 狀態">
        <Cell label="EMPTY" w={200}><Input placeholder="輸入文字" /></Cell>
        <Cell label="FILLED" w={200}><Input value="艾美週年慶 KV" /></Cell>
        <Cell label="HOVER" w={200}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%',
            height: 32, padding: '0 12px', borderRadius: 3,
            background: TOKENS.surface,
            border: `1px solid ${TOKENS.borderStrong}`,
          }}><span style={{ fontSize: 14, color: TOKENS.text1 }}>艾美週年慶 KV</span></span>
        </Cell>
        <Cell label="FOCUS" w={200}><Input value="艾美週年慶 KV" focus /></Cell>
        <Cell label="DISABLED" w={200}><Input value="REQ-20260520-01" disabled mono /></Cell>
        <Cell label="READONLY" w={200}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%',
            height: 32, padding: '0 12px', borderRadius: 3,
            background: TOKENS.surface2,
            border: `1px solid ${TOKENS.border}`,
          }}><span style={{ fontSize: 14, color: TOKENS.text2 }}>系統自動產生</span></span>
        </Cell>
        <Cell label="ERROR" w={200}><Input value="無效格式" error /></Cell>
        <Cell label="WITH ICON" w={200}><Input placeholder="搜尋" icon="Search" /></Cell>
      </Row>

      {/* Table row states */}
      <Row title="Table row · 4 狀態" sub="row 高 48px · 列尾「⋯」更多操作">
        <div style={{ width: 480, border: `1px solid ${TOKENS.border}`, borderRadius: 3, overflow: 'hidden' }}>
          {[
            { l: 'DEFAULT', bg: 'transparent', stripe: false },
            { l: 'HOVER',   bg: TOKENS.surface2, stripe: false },
            { l: 'SELECTED', bg: TOKENS.primarySoft, stripe: true },
            { l: 'DISABLED', bg: TOKENS.surface, stripe: false, dim: true },
          ].map((s, i, arr) => (
            <div key={s.l} style={{
              display: 'flex', alignItems: 'center', padding: '0 12px', height: 48,
              borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
              background: s.bg, position: 'relative', opacity: s.dim ? 0.5 : 1,
            }}>
              {s.stripe && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: TOKENS.primary }} />}
              <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, width: 130 }}>REQ-20260520-01</a>
              <span style={{ flex: 1, fontSize: 14 }}>喜來登 6 月母親節餐券</span>
              <StatusBadge status="進行中" />
              <span className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3, marginLeft: 12, letterSpacing: 0.5 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </Row>

      {/* Status & feedback */}
      <Row title="頁面層級回饋 · §30">
        <Cell label="LOADING(全頁)" w={320}>
          <div style={{
            height: 96, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, background: TOKENS.surface,
          }}>
            <span className="tms-spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>載入中</span>
          </div>
        </Cell>
        <Cell label="LOADING(skeleton)" w={320}>
          <div style={{
            padding: 12, border: `1px solid ${TOKENS.border}`, borderRadius: 6, background: TOKENS.surface,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div className="tms-skel" style={{ width: '60%', height: 14 }} />
            <div className="tms-skel" style={{ width: '90%', height: 14 }} />
            <div className="tms-skel" style={{ width: '75%', height: 14 }} />
          </div>
        </Cell>
        <Cell label="EMPTY" w={320}>
          <div style={{
            height: 96, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 4, background: TOKENS.surface,
          }}>
            <Icon name="Inbox" size={24} color={TOKENS.text3} stroke={1.2} />
            <span style={{ fontSize: 12, color: TOKENS.text2 }}>目前沒有需求單</span>
          </div>
        </Cell>
        <Cell label="ERROR(inline)" w={320}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            padding: '10px 12px', borderRadius: 3,
            background: TOKENS.statusDanger + '0d', border: `1px solid ${TOKENS.statusDanger}55`,
          }}>
            <Icon name="AlertCircle" size={14} color={TOKENS.statusDanger} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: TOKENS.statusDanger }}>儲存失敗</div>
              <div style={{ fontSize: 11, color: TOKENS.text2, marginTop: 2 }}>網路連線中斷,請重試</div>
            </div>
            <Button size="sm" variant="text">重試</Button>
          </div>
        </Cell>
        <Cell label="ERROR(全頁)" w={320}>
          <div style={{
            height: 96, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 4, background: TOKENS.surface, padding: '0 12px', textAlign: 'center',
          }}>
            <Icon name="AlertCircle" size={20} color={TOKENS.statusDanger} />
            <div style={{ fontSize: 12, fontWeight: 500 }}>連線失敗</div>
            <div style={{ fontSize: 10, color: TOKENS.text3 }}>無法連線到伺服器,請稍候再試</div>
            <a style={{ fontSize: 11, color: TOKENS.primary, marginTop: 4 }}>重試</a>
          </div>
        </Cell>
        <Cell label="SUCCESS toast" w={320}><SuccessToast /></Cell>
      </Row>

      {/* Badge / Chip / Tab states */}
      <Row title="標籤 / Chip / Tab">
        <Cell label="STATUS · 5 種">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <StatusBadge status="待處理" />
            <StatusBadge status="進行中" />
            <StatusBadge status="待確認" />
            <StatusBadge status="完成" />
            <StatusBadge status="取消" />
          </div>
        </Cell>
        <Cell label="CHIP · 4 狀態">
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip>預設</Chip>
            <Chip selected>已選</Chip>
            <Chip count={3} selected>含計數</Chip>
            <Chip dashed>虛線(候補)</Chip>
          </div>
        </Cell>
        <Cell label="TAB · 2 狀態">
          <div style={{ display: 'flex', height: 32, borderBottom: `1px solid ${TOKENS.border}` }}>
            <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: TOKENS.text1, borderBottom: `2px solid ${TOKENS.primary}`, marginBottom: -1 }}>當前 tab</div>
            <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>未選 tab</div>
          </div>
        </Cell>
      </Row>
    </div>
  );
}

Object.assign(window, {
  ProjectListScreen, PROJECTS,
  ModalDrawerNotifRef, ModalStage, DrawerStage,
  StatesRef,
});
