// screens-request-detail.jsx — Request detail (1440 × 1100ish to show full content)

const STEPS = [
  { name: '需求提出',  status: 'done' },
  { name: '初審',      status: 'done' },
  { name: '指派 PM / 設計來源', status: 'done' },
  { name: '設計完成回傳', status: 'current' },
  { name: '直屬主管確認', status: 'todo' },
  { name: '相關單位確認', status: 'todo' },
  { name: '完成結案',  status: 'todo' },
];

function Stepper({ steps }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      {steps.map((s, i) => {
        const done = s.status === 'done';
        const current = s.status === 'current';
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto', width: 132 }}>
              <span style={{
                width: 24, height: 24, borderRadius: '50%',
                background: done ? TOKENS.statusSuccess : current ? TOKENS.primary : 'transparent',
                border: current ? `none` : done ? 'none' : `1.5px solid ${TOKENS.text3}`,
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>
                {done ? <Icon name="Check" size={12} stroke={2.4} /> : (current ? <span style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} /> : i + 1)}
              </span>
              <span style={{
                marginTop: 8, fontSize: 13, fontWeight: 500, textAlign: 'center',
                color: current ? TOKENS.text1 : done ? TOKENS.text1 : TOKENS.text3,
              }}>{s.name}</span>
              {current && <span style={{ fontSize: 11, color: TOKENS.primary, marginTop: 2 }}>進行中</span>}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                height: 2, flex: 1, background: done ? TOKENS.statusSuccess : TOKENS.border,
                marginTop: 11,
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Communication thread per §16
const THREAD = [
  { who: 'verna', role: 'viewer',    when: '2026-05-21 09:15', kind: 'question',  text: '餐券面額可否同時放雙語?英文版客群這次比例會比較高。',
    attachments: [] },
  { who: 'sophia',role: 'admin',     when: '2026-05-21 10:02', kind: 'answer',    text: '可以,主標雙語並列、副標僅中文。我把雙語版 mockup 加進 v3。',
    attachments: [] },
  { who: 'sophia',role: 'admin',     when: '2026-05-20 14:32', kind: 'reject',    text: '字級偏小,主標請改 48 / 副標 24。',
    attachments: ['喜來登_母親節_EDM_v2_批註.pdf'] },
  { who: 'tom',   role: 'super_admin', when: '2026-05-20 16:01', kind: 'version', text: '已更新檔案,請見附件 v3。版本紀錄保留 v1 / v2 對照。',
    attachments: ['喜來登_母親節_EDM_v3.psd', '喜來登_母親節_EDM_v3.pdf'] },
];

const KIND_LABEL = {
  question: { text: '問題',  color: TOKENS.statusPending, icon: 'AlertCircle' },
  answer:   { text: '回答',  color: TOKENS.primary,        icon: 'Mail' },
  reject:   { text: '退回',  color: TOKENS.statusDanger,   icon: 'Undo2' },
  version:  { text: '版本',  color: TOKENS.text2,          icon: 'History' },
  confirm:  { text: '確認',  color: TOKENS.statusSuccess,  icon: 'CheckCircle2' },
};

function ThreadItem({ t, first }) {
  const k = KIND_LABEL[t.kind];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '16px 0', borderTop: first ? 'none' : `1px solid ${TOKENS.border}` }}>
      <Avatar name={t.who} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <strong style={{ fontSize: 14, fontWeight: 500 }}>{t.who}</strong>
          <RoleBadge role={t.role} />
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 500, padding: '2px 6px', borderRadius: 3,
            background: k.color + '1f', color: k.color,
          }}>
            <Icon name={k.icon} size={11} stroke={2} />{k.text}
          </span>
          <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 'auto' }}>{t.when}</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: TOKENS.text1, marginBottom: t.attachments.length ? 8 : 0 }}>
          {t.text}
        </div>
        {t.attachments.map((a) => (
          <div key={a} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 8,
            padding: '4px 10px', borderRadius: 3,
            background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
            fontSize: 12,
          }}>
            <Icon name="Paperclip" size={12} color={TOKENS.text2} />
            <a style={{ color: TOKENS.primary, cursor: 'pointer' }}>{a}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, children, w = 160 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0' }}>
      <span style={{ width: w, flexShrink: 0, fontSize: 13, color: TOKENS.text2 }}>{label}</span>
      <div style={{ flex: 1, fontSize: 14, color: TOKENS.text1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function Tabs({ items, active }) {
  return (
    <div style={{ display: 'flex', height: 40, borderBottom: `1px solid ${TOKENS.border}` }}>
      {items.map((i) => (
        <div key={i.id} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '0 16px', fontSize: 14, fontWeight: 500,
          color: i.id === active ? TOKENS.text1 : TOKENS.text2,
          borderBottom: i.id === active ? `2px solid ${TOKENS.primary}` : '2px solid transparent',
          marginBottom: -1, cursor: 'pointer',
        }}>
          {i.label}
          {i.count != null && (
            <span style={{
              fontSize: 11, fontWeight: 500,
              background: i.id === active ? TOKENS.primarySoft : TOKENS.surface2,
              color: i.id === active ? TOKENS.primary : TOKENS.text2,
              padding: '1px 6px', borderRadius: 8, minWidth: 18, textAlign: 'center',
            }}>{i.count}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function RequestDetailScreen() {
  return (
    <Screen
      active="request"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['需求單', '列表', 'REQ-20260520-01']}
      height={1100}
    >
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span className="tms-mono" style={{ fontSize: 13, color: TOKENS.text2 }}>REQ-20260520-01</span>
            <StatusBadge status="待確認" />
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>更新於 2026-05-21 10:02 by sophia</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>喜來登 6 月母親節餐券 EDM 設計</h1>
        </div>
        <Button icon="History">版本紀錄</Button>
        <Button icon="Copy">複製</Button>
        <Button danger icon="Undo2">退回</Button>
        <Button variant="primary" icon="CheckCircle2">通過送下一關</Button>
      </div>

      {/* Stepper card */}
      <div style={{
        padding: '20px 24px', background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderRadius: 6, marginBottom: 16,
      }}>
        <Stepper steps={STEPS} />
      </div>

      {/* Tabs */}
      <Tabs items={[
        { id: 'overview', label: '基本資料' },
        { id: 'tasks',    label: '執行項目', count: 6 },
        { id: 'thread',   label: '審閱 / 溝通紀錄', count: 4 },
        { id: 'files',    label: '附件', count: 5 },
        { id: 'po',       label: '採購單', count: 1 },
      ]} active="overview" />

      {/* Two column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginTop: 16, marginBottom: 16 }}>

        {/* Left: details + thread */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Basic info */}
          <div style={{
            padding: '4px 20px', background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
          }}>
            <div style={{ padding: '12px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>基本資料</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24 }}>
              <div>
                <InfoRow label="館別"><VenueTag code="SH" /> 喜來登</InfoRow>
                <InfoRow label="開單單位">行銷處</InfoRow>
                <InfoRow label="專案類型">A 大專案</InfoRow>
                <InfoRow label="需求大類">美工設計</InfoRow>
                <InfoRow label="製作分類">電子製作物 · EDM</InfoRow>
                <InfoRow label="設計來源">館內設計</InfoRow>
              </div>
              <div>
                <InfoRow label="開單人">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Avatar name="sophia" size={22} /> sophia · 2026-05-20
                  </span>
                </InfoRow>
                <InfoRow label="負責 PM">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Avatar name="sophia" size={22} /> sophia
                  </span>
                </InfoRow>
                <InfoRow label="協作">
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Chip icon="User">tom</Chip>
                    <Chip icon="User">ivens</Chip>
                  </div>
                </InfoRow>
                <InfoRow label="期程">
                  <span className="tms-mono" style={{ fontSize: 13 }}>2026-05-20 → 2026-05-28</span>
                  <span style={{ fontSize: 11, color: TOKENS.statusPending, marginLeft: 8 }}>剩 3 天</span>
                </InfoRow>
                <InfoRow label="進度">
                  <div style={{ width: 200 }}><ProgressBar value={80} status="待確認" /></div>
                </InfoRow>
                <InfoRow label="額外項目">
                  <span style={{ fontSize: 12, color: TOKENS.text2 }}>製作物輸出 · 社群媒體 · EDM</span>
                </InfoRow>
              </div>
            </div>
            <InfoRow label="備註" w={160}>
              <div style={{ fontSize: 13, color: TOKENS.text1, lineHeight: 1.6 }}>
                母親節主視覺保留 5 月份既有色系;餐券面額分 NT$ 1,200 / 2,400 / 3,600 三檔;
                需求單位希望「至少 1 版有插畫風格」備用提案。
              </div>
            </InfoRow>
          </div>

          {/* Tasks */}
          <div style={{
            padding: '4px 20px 16px', background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
          }}>
            <div style={{ padding: '12px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>執行項目 <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400, marginLeft: 6 }}>6 項 · 4 完成</span></h3>
              <Button size="sm" variant="text" icon="Plus">新增項目</Button>
            </div>
            {[
              { name: '初稿提案(雙語雙版)',        owner: 'sophia', status: '完成',   due: '05-22', kind: '設計製作' },
              { name: '主管初審 + 改字級',           owner: 'tom',    status: '完成',   due: '05-23', kind: '主管確認' },
              { name: 'v3 修正稿(48 / 24 字級)',   owner: 'sophia', status: '完成',   due: '05-25', kind: '設計製作' },
              { name: '雙語版面 mockup',             owner: 'ivens',  status: '進行中', due: '05-26', kind: '設計製作' },
              { name: '需求單位確認',                owner: 'verna',  status: '待確認', due: '05-27', kind: '相關單位' },
              { name: '完稿輸出 + EDM 排程',         owner: 'sophia', status: '未開始', due: '05-28', kind: '設計製作' },
            ].map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0', borderBottom: `1px solid ${TOKENS.border}`,
              }}>
                <StatusBadge status={t.status} />
                <span style={{ flex: 1, fontSize: 13 }}>{t.name}</span>
                <span style={{ fontSize: 11, color: TOKENS.text3 }}>{t.kind}</span>
                <Avatar name={t.owner} size={22} />
                <span style={{ fontSize: 12 }}>{t.owner}</span>
                <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2, width: 48 }}>{t.due}</span>
              </div>
            ))}
          </div>

          {/* Thread */}
          <div style={{
            padding: '4px 20px', background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
          }}>
            <div style={{ padding: '12px 0 0', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>審閱 / 溝通紀錄</h3>
              <Segmented options={['全部', '退回', '版本']} value="全部" />
            </div>
            <div>
              {THREAD.map((t, i) => <ThreadItem key={i} t={t} first={i === 0} />)}
            </div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${TOKENS.border}`, display: 'flex', gap: 12 }}>
              <Avatar name="sophia" size={32} />
              <div style={{ flex: 1 }}>
                <div style={{
                  border: `1px solid ${TOKENS.border}`, borderRadius: 3, padding: '10px 12px',
                  background: TOKENS.surface, minHeight: 80,
                }}>
                  <span style={{ fontSize: 13, color: TOKENS.text3 }}>新增回覆 · 可附加檔案或選擇紀錄類型</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <Input value="回答" type="select" w={120} style={{ height: 28 }} />
                  <Button size="sm" icon="Paperclip">附加檔案</Button>
                  <label style={{ fontSize: 12, color: TOKENS.text2, marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: TOKENS.primary }} />
                    對開單單位可見
                  </label>
                  <span style={{ flex: 1 }} />
                  <Button variant="primary" size="sm">送出</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Attachments */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>附件 <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400 }}>5</span></h3>
              <Button size="sm" variant="text" icon="Upload">上傳</Button>
            </div>
            {[
              { n: '喜來登_母親節_EDM_v3.psd',         s: '18.4 MB', who: 'tom',    when: '05-20 16:01', curr: true },
              { n: '喜來登_母親節_EDM_v3.pdf',         s: '2.1 MB',  who: 'tom',    when: '05-20 16:01' },
              { n: '喜來登_母親節_EDM_v2_批註.pdf',    s: '1.8 MB',  who: 'sophia', when: '05-20 14:32' },
              { n: '需求單位提供:logo + 字型 pack',   s: '5.6 MB',  who: 'verna',  when: '05-20 09:10' },
              { n: 'brief.docx',                       s: '102 KB',  who: 'sophia', when: '05-20 09:00' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                borderBottom: i < 4 ? `1px solid ${TOKENS.border}` : 'none',
              }}>
                <Icon name="FileText" size={14} color={TOKENS.text2} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: TOKENS.text1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.n}</span>
                    {f.curr && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.statusSuccess + '1f', color: TOKENS.statusSuccess }}>當前版本</span>}
                  </div>
                  <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>{f.s} · {f.who} · {f.when}</div>
                </div>
                <Icon name="Download" size={14} color={TOKENS.text2} />
              </div>
            ))}
          </div>

          {/* Approval */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>簽核</h3>
            </div>
            <div style={{ padding: '0 16px' }}>
              {[
                { who: 'sophia', role: '行銷處 PM',     status: '通過' },
                { who: 'tom',    role: '直屬主管',      status: '通過' },
                { who: 'verna',  role: '相關單位窗口',   status: '待簽核' },
              ].map((a, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <Avatar name={a.who} size={28} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{a.who}</div>
                    <div style={{ fontSize: 11, color: TOKENS.text3 }}>{a.role}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Linked PO */}
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>關聯採購單</h3>
              <Button size="sm" variant="text">關聯…</Button>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer' }}>PO-20260520-02</a>
                <StatusBadge status="待核准" />
              </div>
              <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 4 }}>EDM 模板授權費 · 預估 NT$ 18,000</div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { RequestDetailScreen, Tabs, ThreadItem, InfoRow, Stepper });
