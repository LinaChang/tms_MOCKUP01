// screens-foundation.jsx — Login page + Components reference artboards

// ─────────────────────────────────────────────────────────────────
// Login page (1440 × 900)
// ─────────────────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  { name: 'sophia', role: 'admin',       dept: '行銷處' },
  { name: 'tom',    role: 'super_admin', dept: '行銷處' },
  { name: 'ivens',  role: 'admin',       dept: '數位處' },
  { name: 'lina',   role: 'super_admin', dept: '數位處' },
  { name: 'verna',  role: 'viewer',      dept: '餐飲部' },
];

// Per §6 + Q5 reply: 候補 9 人,依隨機填入。Email、角色「待確認」。
const CANDIDATES = [
  { name: 'emma',   dept: '行銷處', role: 'pending' },
  { name: 'ryan',   dept: '行銷處', role: 'pending' },
  { name: 'chloe',  dept: '行銷處', role: 'pending' },
  { name: 'noah',   dept: '數位處', role: 'pending' },
  { name: 'mia',    dept: '數位處', role: 'pending' },
  { name: 'liam',   dept: '數位處', role: 'pending' },
  { name: 'grace',  dept: '餐飲部', role: 'pending' },
  { name: 'leo',    dept: '餐飲部', role: 'pending' },
  { name: 'hannah', dept: '餐飲部', role: 'pending' },
];

function LoginPage({ state = 'default', width = 1440, height = 900 }) {
  // state: default | loading | error
  return (
    <div className="tms" style={{
      width, height, background: TOKENS.bg, display: 'flex',
      alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      {/* subtle paper texture via radial */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 20% 30%, ${TOKENS.surface2} 0%, transparent 50%),
                     radial-gradient(circle at 80% 70%, ${TOKENS.surface2} 0%, transparent 40%)`,
        opacity: 0.6,
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', width: 880, minHeight: 560,
        background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6,
        display: 'grid', gridTemplateColumns: '380px 1fr',
      }}>
        {/* Left — credentials */}
        <div style={{ padding: '48px 40px', borderRight: `1px solid ${TOKENS.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 32 }}>
            <Wordmark size="lg" subtitle="MARKETING TASKS · v1" />
            <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 10 }}>行銷部任務與內容管理系統</div>
          </div>

          <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 500 }}>登入</h2>
          <div style={{ fontSize: 12, color: TOKENS.text2, marginBottom: 24 }}>第一版內部 demo,僅限受邀人員</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="帳號" required>
              <Input
                placeholder="輸入帳號"
                value={state === 'error' ? 'sophie' : ''}
                error={state === 'error'}
                icon="User"
              />
            </Field>
            <Field label="密碼" required error={state === 'error' ? '帳號或密碼錯誤,請再試一次' : null}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Input
                  placeholder="輸入密碼"
                  value={state === 'error' ? '••••••' : ''}
                  error={state === 'error'}
                  icon="Lock"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <a style={{
                    fontSize: 12, color: TOKENS.primary, cursor: 'pointer',
                    textDecoration: 'none',
                  }} title="第一版未實作,僅顯示文字">忘記密碼?</a>
                </div>
              </div>
            </Field>
            <Button variant="primary" size="lg" loading={state === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
              {state === 'loading' ? '登入中' : '登入'}
            </Button>
            <div style={{
              fontSize: 12, color: TOKENS.text3, textAlign: 'center', lineHeight: 1.6,
              padding: '8px 12px', background: TOKENS.surface2, borderRadius: 3,
            }}>
              忘記密碼第一版未提供自助重設,請洽<strong style={{ fontWeight: 500, color: TOKENS.text2 }}> tom </strong>或<strong style={{ fontWeight: 500, color: TOKENS.text2 }}> lina </strong>重設
            </div>
          </div>

          <div style={{ flex: 1 }} />
          <div style={{
            marginTop: 32, paddingTop: 16, borderTop: `1px solid ${TOKENS.border}`,
            fontSize: 11, color: TOKENS.text3, display: 'flex', justifyContent: 'space-between',
          }}>
            <span>v1.0.0 · 2026-05-25</span>
            <span>內部系統 · 登入即代表同意使用規範</span>
          </div>
        </div>

        {/* Right — demo accounts */}
        <div style={{ padding: '48px 40px', background: TOKENS.surface2, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Demo 帳號 · 各權限差異一鍵登入</div>
            <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>
              live demo 不做完整 session;點擊任一帳號即進入該角色視角,用於確認權限差異。
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEMO_ACCOUNTS.map((a) => (
              <button key={a.name} type="button" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 3,
                background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}>
                <Avatar name={a.name} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: TOKENS.text2 }}>{a.dept}</div>
                </div>
                <RoleBadge role={a.role} />
                <Icon name="ChevronRight" size={14} color={TOKENS.text3} />
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />
          <div style={{
            marginTop: 24, padding: 14, borderRadius: 3,
            background: TOKENS.surface, border: `1px dashed ${TOKENS.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Icon name="Users" size={12} color={TOKENS.text2} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>候補 9 位</span>
              <span style={{ fontSize: 11, color: TOKENS.text3 }}>email + 角色 待確認</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CANDIDATES.map((c) => (
                <span key={c.name} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 8px 3px 4px', borderRadius: 10,
                  background: TOKENS.surface2, border: `1px dashed ${TOKENS.border}`,
                  fontSize: 11, color: TOKENS.text2,
                }}>
                  <Avatar name={c.name} size={16} />
                  {c.name}
                  <span style={{ color: TOKENS.text3, fontSize: 10 }}>· {c.dept.slice(0, 2)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* state label outside card */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        fontSize: 11, fontWeight: 500, color: TOKENS.text3,
        fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.5,
      }}>STATE · {state.toUpperCase()}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Components reference (atomic library page, 1080 × 1200)
// ─────────────────────────────────────────────────────────────────
function ComponentsRef({ width = 1200, height = 1700 }) {
  const Section = ({ title, num, children }) => (
    <section style={{ marginBottom: 32 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${TOKENS.border}`,
      }}>
        <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3 }}>§{num}</span>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{title}</h3>
      </div>
      {children}
    </section>
  );
  const Cell = ({ label, children, span = 1 }) => (
    <div style={{ gridColumn: `span ${span}`, padding: 12, border: `1px solid ${TOKENS.border}`, borderRadius: 3, background: TOKENS.surface }}>
      <div style={{ fontSize: 11, color: TOKENS.text3, marginBottom: 8, fontFamily: '"JetBrains Mono", monospace' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
  return (
    <div className="tms" style={{
      width, minHeight: height, background: TOKENS.bg, padding: 32, overflow: 'visible',
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>共用元件 reference</h2>
        <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 4 }}>
          §25-§28 落地版 · 全站只用以下原子元件,新元件需先進此庫
        </div>
      </div>

      <Section title="Color tokens" num="3 / 28">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {[
            ['primary', TOKENS.primary],
            ['secondary', TOKENS.secondary],
            ['bg', TOKENS.bg],
            ['surface', TOKENS.surface],
            ['surface-2', TOKENS.surface2],
            ['border', TOKENS.border],
            ['text-1', TOKENS.text1],
            ['text-2', TOKENS.text2],
            ['text-3', TOKENS.text3],
            ['status-progress', TOKENS.statusProgress],
            ['status-pending', TOKENS.statusPending],
            ['status-success', TOKENS.statusSuccess],
            ['status-cancel', TOKENS.statusCancel],
            ['status-danger', TOKENS.statusDanger],
            ['status-neutral', TOKENS.statusNeutral],
          ].map(([name, c]) => (
            <div key={name} style={{ border: `1px solid ${TOKENS.border}`, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: 40, background: c }} />
              <div style={{ padding: '6px 8px', background: TOKENS.surface }}>
                <div className="tms-mono" style={{ fontSize: 11 }}>{name}</div>
                <div className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3 }}>{c}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" num="3">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 16, background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 3 }}>
            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>24 / 500 頁面標題</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>18 / 500 區塊標題</div>
            <div style={{ fontSize: 14, fontWeight: 400, marginBottom: 8 }}>14 / 400 內文表格表單</div>
            <div style={{ fontSize: 12, color: TOKENS.text2 }}>12 / 400 說明文字</div>
          </div>
          <div style={{ padding: 16, background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 3 }}>
            <div className="tms-mono" style={{ fontSize: 14 }}>REQ-20260520-01</div>
            <div className="tms-mono" style={{ fontSize: 14 }}>2026-05-20 14:32</div>
            <div className="tms-mono" style={{ fontSize: 14 }}>NT$ 128,000</div>
            <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 8 }}>
              編號、日期、金額一律用 JetBrains Mono(tnum)
            </div>
          </div>
        </div>
      </Section>

      <Section title="Buttons" num="25">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <Cell label="primary · md / lg"><Button variant="primary" icon="Plus">新增需求單</Button><Button variant="primary" size="lg" icon="Plus">主要操作</Button></Cell>
          <Cell label="secondary · default / danger"><Button>取消</Button><Button danger icon="Trash2">刪除</Button></Cell>
          <Cell label="text · inline"><Button variant="text">送出簽核</Button><Button variant="text" icon="Download">下載</Button></Cell>
          <Cell label="loading / disabled"><Button variant="primary" loading>儲存中</Button><Button disabled>已停用</Button></Cell>
          <Cell label="size · sm 28 / md 32 / lg 40"><Button size="sm">sm</Button><Button>md</Button><Button size="lg">lg</Button></Cell>
          <Cell label="icon only · 32"><button type="button" style={{ width: 32, height: 32, borderRadius: 3, border: `1px solid ${TOKENS.border}`, background: TOKENS.surface, cursor: 'pointer' }}><Icon name="Pencil" size={14} /></button><button type="button" style={{ width: 32, height: 32, borderRadius: 3, border: `1px solid ${TOKENS.border}`, background: TOKENS.surface, cursor: 'pointer' }}><Icon name="MoreHorizontal" size={14} /></button></Cell>
        </div>
      </Section>

      <Section title="Inputs · field states" num="25 / 27">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
          <Field label="預設"><Input placeholder="輸入文字" /></Field>
          <Field label="focus"><Input value="進行中" focus /></Field>
          <Field label="必填 + error" required error="此欄位必填"><Input placeholder="專案名稱" error /></Field>
          <Field label="disabled"><Input value="REQ-20260520-01" disabled mono /></Field>
        </div>
      </Section>

      <Section title="Status badges" num="28">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['待處理', '進行中', '待確認', '完成', '取消', '待簽核', '通過', '退回', '草稿', '已核准'].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </Section>

      <Section title="Role / venue tags" num="28">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <RoleBadge role="super_admin" /><RoleBadge role="admin" /><RoleBadge role="editor" /><RoleBadge role="viewer" /><RoleBadge role="pending" />
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['GRP','SH','LM','HB','MU'].map((c) => <VenueTag key={c} code={c} />)}
          <span style={{ marginLeft: 16, fontSize: 12, color: TOKENS.text3 }}>多館別 →</span>
          <VenueTag code="SH" /><VenueTag code="LM" /><VenueTag code="HB" /><VenueTag code="+2" />
        </div>
      </Section>

      <Section title="Chips · filter / segmented" num="26">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Segmented options={['全部資料', '我的資料']} value="全部資料" />
          <Chip>狀態</Chip>
          <Chip count={2} selected>館別</Chip>
          <Chip count={1} selected>PM</Chip>
          <Chip icon="Calendar">2026/05/01 - 05/31</Chip>
          <span style={{ flex: 1 }} />
          <Button variant="text" size="sm">重設</Button>
        </div>
      </Section>

      <Section title="Feedback · toasts" num="30">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <SuccessToast title="需求單已建立" sub="REQ-20260525-03 已自動指派 PM ivens" />
          <MailToast />
          <div style={{
            display: 'inline-flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 12px', borderRadius: 3,
            background: TOKENS.statusDanger + '0f', border: `1px solid ${TOKENS.statusDanger}55`,
            maxWidth: 360,
          }}>
            <Icon name="AlertCircle" size={16} color={TOKENS.statusDanger} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: TOKENS.statusDanger }}>無法送出</div>
              <div style={{ fontSize: 12, color: TOKENS.text2 }}>有 2 個必填欄位未填寫,請檢查專案類型、PM 指派</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

Object.assign(window, { LoginPage, ComponentsRef, DEMO_ACCOUNTS, CANDIDATES });
