// screens-files-po-accounts.jsx — P2 modules: 檔案資源 / 採購單 / 帳號權限

// ═════════════════════════════════════════════════════════════════
// §17 · 檔案與資源 (Files & Resources)
// ═════════════════════════════════════════════════════════════════

const FILES = [
  { kind: 'file', n: '喜來登_母親節_EDM_v3.psd',         size: '18.4 MB', type: 'PSD',  uploader: 'tom',    when: '2026-05-20 16:01', link: 'REQ-20260520-01', tags: ['母親節','EDM','SH'],   downloads: 8 },
  { kind: 'file', n: '艾美_週年慶_主視覺_提案A.pdf',     size: '4.2 MB',  type: 'PDF',  uploader: 'sophia', when: '2026-05-20 11:42', link: 'REQ-20260520-02', tags: ['週年慶','KV','LM'],    downloads: 12 },
  { kind: 'file', n: '寒沐_秋冬廣告_腳本_v2.docx',       size: '208 KB',  type: 'DOC',  uploader: 'lina',   when: '2026-05-19 09:30', link: 'REQ-20260518-03', tags: ['秋冬','腳本','MU'],    downloads: 6 },
  { kind: 'file', n: '餐飲部_新菜單_試拍_20260518.zip',  size: '24.6 MB', type: 'ZIP',  uploader: 'ivens',  when: '2026-05-18 17:22', link: 'REQ-20260517-02', tags: ['菜單','拍照'],          downloads: 4 },
  { kind: 'file', n: '社群版面_IG_story_v1.fig',         size: '6.8 MB',  type: 'FIG',  uploader: 'ivens',  when: '2026-05-22 14:08', link: 'REQ-20260522-02', tags: ['社群','IG'],            downloads: 9 },
  { kind: 'file', n: '寒居_中秋_外盒_打樣對照.jpg',      size: '3.1 MB',  type: 'JPG',  uploader: 'lina',   when: '2026-05-21 10:15', link: 'REQ-20260516-01', tags: ['中秋','HB'],            downloads: 3 },
  { kind: 'file', n: '電子看板_60s_動態_v1.mp4',         size: '23.8 MB', type: 'MP4',  uploader: 'sophia', when: '2026-05-23 16:40', link: 'REQ-20260520-01', tags: ['電子看板','母親節'],   downloads: 5 },
  { kind: 'file', n: '集團_LOGO_pack_2026.zip',          size: '12.4 MB', type: 'ZIP',  uploader: 'tom',    when: '2026-04-15 09:00', link: '',                tags: ['品牌','LOGO','常用'], downloads: 21 },
];

const RESOURCE_LINKS = [
  { n: '集團 Brand Center · 暫定色票',           url: 'figma.com/file/xxx-brand', cat: '品牌',     desc: '主色 / 輔色 / 狀態色暫定;待品牌方正式交付', status: 'active',  by: 'tom',    when: '2026-05-12' },
  { n: 'Noto Sans TC 字型授權',                  url: 'fonts.google.com/noto-tc', cat: '品牌',     desc: 'OFL 1.1 · 全站使用',                          status: 'active',  by: 'tom',    when: '2026-05-12' },
  { n: '集團攝影 SOP(2026 修訂)',              url: 'docs.google.com/sop-2026', cat: '流程',     desc: '館內拍攝、場景命名、檔名規則',                status: 'active',  by: 'lina',   when: '2026-05-08' },
  { n: '外包供應商清單 · 設計 / 印刷 / 影像',    url: 'sheets.google.com/vendors', cat: '供應商',   desc: '含報價區間、過往合作專案',                   status: 'active',  by: 'sophia', when: '2026-05-05' },
  { n: '館別代碼對照(GRP/SH/LM/HB/MU)',        url: 'tms.internal/venue-codes', cat: '參考',     desc: '系統內 venue tag 對應全名',                   status: 'active',  by: 'lina',   when: '2026-04-20' },
  { n: '【舊】2025 母親節活動回顧簡報',          url: 'slides.google.com/2025-mom', cat: '回顧',     desc: '2025 年同檔期成效;素材可參考',              status: 'archived', by: 'sophia', when: '2025-06-05' },
];

const FILE_TYPE_COLOR = {
  PSD: '#3b6ea0', PDF: '#c0392b', DOC: '#2a6cd1', ZIP: '#777', FIG: '#8b5cf6',
  JPG: '#0f8a5b', PNG: '#0f8a5b', MP4: '#b08434', XLS: '#1f7d4a', PPT: '#c25b1f',
};

function FileTypeBadge({ type }) {
  return (
    <span className="tms-mono" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 36, height: 22, borderRadius: 3, fontSize: 10, fontWeight: 700,
      background: (FILE_TYPE_COLOR[type] || '#777') + '1f',
      color: FILE_TYPE_COLOR[type] || '#777',
      letterSpacing: 0.5,
    }}>{type}</span>
  );
}

function FilesResourcesScreen() {
  return (
    <Screen
      active="files"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['檔案與資源', '附件庫']}
      height={1300}
    >
      <PageHeader
        title="檔案與資源"
        sub={`共 ${FILES.length} 個附件 · ${RESOURCE_LINKS.length} 條資源連結 · 用量 92.1 MB`}
        actions={
          <>
            <Button icon="Filter">進階篩選</Button>
            <Button icon="Link">新增資源連結</Button>
            <Button variant="primary" icon="Upload">上傳檔案</Button>
          </>
        }
      />

      <Tabs items={[
        { id: 'files', label: '附件', count: FILES.length },
        { id: 'links', label: '資源連結', count: RESOURCE_LINKS.length },
        { id: 'usage', label: '空間用量' },
      ]} active="files" />

      <div style={{ marginTop: 16 }}>
        {/* Drop zone (compact) */}
        <div style={{
          padding: '12px 16px', marginBottom: 12,
          background: TOKENS.surface, border: `1px dashed ${TOKENS.borderStrong}`, borderRadius: 6,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Icon name="Upload" size={20} color={TOKENS.text2} stroke={1.4} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>拖放檔案到此處,或<a style={{ color: TOKENS.primary, cursor: 'pointer' }}> 點擊選擇</a></div>
            <div style={{ fontSize: 12, color: TOKENS.text3 }}>單檔 25 MB 以內 · 支援 Office / 圖片 / 文字 / 25MB 內影音 · 上傳後可關聯到需求單</div>
          </div>
          <Button>從 Google Drive 匯入</Button>
        </div>

        {/* Filter bar */}
        <div style={{
          height: 48, display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 16px',
          background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
          borderRadius: '6px 6px 0 0', borderBottom: 'none',
        }}>
          <Chip count={2} selected>檔案類型</Chip>
          <Chip>上傳者</Chip>
          <Chip>標籤</Chip>
          <Chip icon="Calendar">本月</Chip>
          <Chip>關聯需求單</Chip>
          <span style={{ flex: 1 }} />
          <Input placeholder="搜尋檔名、標籤" icon="Search" style={{ width: 240 }} />
        </div>

        {/* Files table */}
        <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
          {/* Head */}
          <div style={{ display: 'flex', padding: '0 16px', height: 40, alignItems: 'center', background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>
            <span style={{ width: 56 }}>類型</span>
            <span style={{ flex: 1 }}>檔名</span>
            <span style={{ width: 200 }}>標籤</span>
            <span style={{ width: 132 }}>關聯需求單</span>
            <span style={{ width: 100 }}>上傳者</span>
            <span style={{ width: 130 }}>上傳時間</span>
            <span style={{ width: 80, textAlign: 'right' }}>大小</span>
            <span style={{ width: 80, textAlign: 'right' }}>下載</span>
            <span style={{ width: 80 }} />
          </div>
          {FILES.map((f, i) => (
            <div key={f.n} style={{ display: 'flex', padding: '0 16px', height: 48, alignItems: 'center', borderBottom: `1px solid ${TOKENS.border}` }}>
              <span style={{ width: 56 }}><FileTypeBadge type={f.type} /></span>
              <a style={{ flex: 1, fontSize: 14, color: TOKENS.primary, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>{f.n}</a>
              <div style={{ width: 200, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {f.tags.slice(0, 3).map((t) => (
                  <span key={t} style={{
                    fontSize: 11, padding: '2px 6px', borderRadius: 3,
                    background: TOKENS.surface2, color: TOKENS.text2,
                  }}>{t}</span>
                ))}
              </div>
              <span style={{ width: 132 }}>
                {f.link ? <a className="tms-mono" style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>{f.link}</a> : <span style={{ fontSize: 12, color: TOKENS.text3 }}>—</span>}
              </span>
              <span style={{ width: 100, display: 'flex', alignItems: 'center', gap: 6 }}><Avatar name={f.uploader} size={20} /><span style={{ fontSize: 13 }}>{f.uploader}</span></span>
              <span className="tms-mono" style={{ width: 130, fontSize: 12, color: TOKENS.text2 }}>{f.when.replace(' ', ' ')}</span>
              <span className="tms-mono" style={{ width: 80, fontSize: 12, textAlign: 'right', color: TOKENS.text2 }}>{f.size}</span>
              <span className="tms-mono" style={{ width: 80, fontSize: 12, textAlign: 'right', color: TOKENS.text2 }}>{f.downloads}</span>
              <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                <Icon name="Download" size={14} color={TOKENS.text2} style={{ cursor: 'pointer' }} />
                <Icon name="Link" size={14} color={TOKENS.text2} style={{ cursor: 'pointer' }} />
                <Icon name="MoreHorizontal" size={14} color={TOKENS.text2} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          ))}
        </div>
        <Pagination total={FILES.length} page={1} />

        {/* Resource links section (shown below as preview of other tab) */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>資源連結 · 預覽</h3>
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>切到「資源連結」tab 查看完整列表</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {RESOURCE_LINKS.slice(0, 6).map((r) => (
              <div key={r.n} style={{
                padding: 14, background: TOKENS.surface,
                border: `1px solid ${TOKENS.border}`, borderRadius: 6,
                opacity: r.status === 'archived' ? 0.55 : 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <Icon name="Link" size={12} color={TOKENS.primary} />
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text2 }}>{r.cat}</span>
                  {r.status === 'archived' && <span style={{ fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text3 }}>已封存</span>}
                </div>
                <a style={{ fontSize: 14, fontWeight: 500, color: TOKENS.text1, cursor: 'pointer', display: 'block', marginBottom: 4 }}>{r.n}</a>
                <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.primary, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.url}</div>
                <div style={{ fontSize: 12, color: TOKENS.text2, lineHeight: 1.5, minHeight: 36 }}>{r.desc}</div>
                <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${TOKENS.border}`, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Avatar name={r.by} size={14} />{r.by} · {r.when}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════════
// §18 · 採購單 (Purchase Order)
// ═════════════════════════════════════════════════════════════════

const POs = [
  { id: 'PO-20260524-01', linked: 'REQ-20260520-02', item: '艾美週年慶 KV 外包設計',          supplier: '時景設計工作室',         qty: 1, est: 180000, actual: null,   purpose: '主視覺外包', applicant: 'ivens',  applied: '2026-05-24', approver: 'lina', approvedAt: null,         status: '待核准' },
  { id: 'PO-20260523-02', linked: 'REQ-20260520-01', item: 'EDM 模板授權費(年費)',           supplier: 'Stripo Newsletter',      qty: 1, est: 18000,  actual: 18000,  purpose: 'EDM 模板',  applicant: 'sophia', applied: '2026-05-23', approver: 'tom',  approvedAt: '2026-05-24 09:12', status: '已核准' },
  { id: 'PO-20260520-03', linked: 'REQ-20260518-03', item: '寒沐秋冬廣告外包拍攝 + 後製',     supplier: '好景影像工作室',         qty: 1, est: 480000, actual: null,   purpose: '廣告拍攝',  applicant: 'lina',   applied: '2026-05-20', approver: 'tom',  approvedAt: null,         status: '待核准' },
  { id: 'PO-20260518-01', linked: '',                item: '集團官網 banner 模板套用授權',    supplier: 'Envato Elements',       qty: 1, est: 6800,   actual: 6800,   purpose: 'banner 製作', applicant: 'sophia', applied: '2026-05-18', approver: 'tom',  approvedAt: '2026-05-18 16:40', status: '已核准' },
  { id: 'PO-20260516-04', linked: 'REQ-20260516-01', item: '寒居中秋月餅外盒打樣 ×3 版',      supplier: '群嘉印刷',               qty: 3, est: 24000,  actual: null,   purpose: '打樣',      applicant: 'lina',   applied: '2026-05-16', approver: 'tom',  approvedAt: null,         status: '草稿' },
  { id: 'PO-20260514-02', linked: 'REQ-20260513-01', item: '寒沐電子看板影片素材授權',        supplier: 'Pond5',                  qty: 5, est: 12500,  actual: 0,      purpose: '素材授權',  applicant: 'lina',   applied: '2026-05-14', approver: 'tom',  approvedAt: '2026-05-15 10:00', status: '已取消' },
];

function POListScreen() {
  return (
    <Screen
      active="po"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['採購單', '列表']}
    >
      <PageHeader
        title="採購單"
        sub="2 待核准 · 2 已核准 · 1 草稿 · 1 已取消 · 本月預估總額 NT$ 721,300"
        actions={
          <>
            <Button icon="Download">匯出</Button>
            <Button variant="primary" icon="Plus">新增採購單</Button>
          </>
        }
      />

      <div style={{
        height: 48, display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px',
        background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
        borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <Segmented options={['全部', '待我核准', '我申請的']} value="全部" />
        <Chip count={2} selected>狀態</Chip>
        <Chip>供應商</Chip>
        <Chip>申請人</Chip>
        <Chip icon="Calendar">本月</Chip>
        <span style={{ flex: 1 }} />
        <Input placeholder="搜尋編號、供應商、品項" icon="Search" style={{ width: 240 }} />
      </div>

      <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
        <div style={{ display: 'flex', padding: '0 16px', height: 40, alignItems: 'center', background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>
          <span style={{ width: 140 }}>編號</span>
          <span style={{ width: 132 }}>關聯需求單</span>
          <span style={{ flex: 1 }}>品項 / 用途</span>
          <span style={{ width: 160 }}>供應商</span>
          <span style={{ width: 50, textAlign: 'right' }}>數量</span>
          <span style={{ width: 110, textAlign: 'right' }}>預估</span>
          <span style={{ width: 110, textAlign: 'right' }}>實際</span>
          <span style={{ width: 88 }}>申請人</span>
          <span style={{ width: 96 }}>狀態</span>
          <span style={{ width: 32 }} />
        </div>
        {POs.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', padding: '0 16px', height: 56, alignItems: 'center', borderBottom: `1px solid ${TOKENS.border}` }}>
            <span style={{ width: 140 }}>
              <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer' }}>{p.id}</a>
              <div className="tms-mono" style={{ fontSize: 10, color: TOKENS.text3, marginTop: 2 }}>{p.applied}</div>
            </span>
            <span style={{ width: 132 }}>
              {p.linked
                ? <a className="tms-mono" style={{ fontSize: 12, color: TOKENS.primary, cursor: 'pointer' }}>{p.linked}</a>
                : <span style={{ fontSize: 12, color: TOKENS.text3 }}>—(無關聯)</span>}
            </span>
            <span style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ fontSize: 13, color: TOKENS.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.item}</div>
              <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>{p.purpose}</div>
            </span>
            <span style={{ width: 160, fontSize: 13, color: TOKENS.text2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{p.supplier}</span>
            <span className="tms-mono" style={{ width: 50, fontSize: 13, textAlign: 'right' }}>{p.qty}</span>
            <span className="tms-mono" style={{ width: 110, fontSize: 13, textAlign: 'right', color: TOKENS.text1, fontWeight: 500 }}>NT$ {p.est.toLocaleString()}</span>
            <span className="tms-mono" style={{
              width: 110, fontSize: 13, textAlign: 'right',
              color: p.actual == null ? TOKENS.text3 : p.actual > p.est ? TOKENS.statusDanger : TOKENS.text1,
              fontWeight: p.actual != null ? 700 : 400,
            }}>{p.actual == null ? '—' : `NT$ ${p.actual.toLocaleString()}`}</span>
            <span style={{ width: 88, display: 'flex', alignItems: 'center', gap: 6 }}><Avatar name={p.applicant} size={20} /><span style={{ fontSize: 12 }}>{p.applicant}</span></span>
            <span style={{ width: 96 }}><StatusBadge status={p.status} /></span>
            <span style={{ width: 32, textAlign: 'right' }}><Icon name="MoreHorizontal" size={14} color={TOKENS.text3} /></span>
          </div>
        ))}
      </div>

      <Pagination total={POs.length} page={1} />
    </Screen>
  );
}

function PODetailScreen() {
  return (
    <Screen
      active="po"
      role="admin"
      user={{ name: 'tom', role: 'super_admin', dept: '行銷處' }}
      crumbs={['採購單', 'PO-20260524-01']}
      height={1200}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 0 16px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span className="tms-mono" style={{ fontSize: 13, color: TOKENS.text2 }}>PO-20260524-01</span>
            <StatusBadge status="待核准" />
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>· 由 ivens 於 2026-05-24 11:18 送出</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>艾美週年慶 KV 外包設計</h1>
        </div>
        <Button danger icon="Undo2">退回</Button>
        <Button variant="primary" size="lg" icon="CheckCircle2">核准</Button>
      </div>

      {/* readonly approval review banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', background: TOKENS.statusPending + '0d',
        border: `1px solid ${TOKENS.statusPending}55`, borderRadius: 6,
        marginBottom: 16,
      }}>
        <Icon name="Clock" size={16} color={TOKENS.statusPending} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: TOKENS.statusPending }}>等待你核准</div>
          <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>本案已等候 2 小時 14 分 · 預估金額超過 NT$ 100,000 需 super_admin 雙簽</div>
        </div>
        <Avatar name="lina" size={22} />
        <span style={{ fontSize: 12, color: TOKENS.text2 }}>第二簽:lina(待簽)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '4px 20px 12px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '12px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>採購內容</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24 }}>
              <div>
                <InfoRow label="品項">艾美週年慶 KV 外包設計(主視覺 + 延伸應用)</InfoRow>
                <InfoRow label="數量"><span className="tms-mono">1 案</span></InfoRow>
                <InfoRow label="用途">主視覺外包 · 含 1 提案 + 2 次修改</InfoRow>
                <InfoRow label="供應商">
                  時景設計工作室
                  <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>過往合作 5 次 · 上次 2025-09 艾美週年慶</div>
                </InfoRow>
              </div>
              <div>
                <InfoRow label="預估金額">
                  <span className="tms-mono" style={{ fontSize: 18, fontWeight: 700 }}>NT$ 180,000</span>
                </InfoRow>
                <InfoRow label="實際金額">
                  <span style={{ fontSize: 12, color: TOKENS.text3 }}>—(結案後填入)</span>
                </InfoRow>
                <InfoRow label="關聯需求單">
                  <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer' }}>REQ-20260520-02</a>
                  <span style={{ fontSize: 12, color: TOKENS.text2, marginLeft: 6 }}>艾美週年慶活動主視覺 KV</span>
                </InfoRow>
                <InfoRow label="付款條件">驗收後 30 天</InfoRow>
              </div>
            </div>
          </div>

          <div style={{ padding: '4px 20px 12px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '12px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>附件 <span style={{ fontSize: 12, color: TOKENS.text3, fontWeight: 400 }}>3</span></h3>
              <Button size="sm" variant="text" icon="Upload">上傳</Button>
            </div>
            {[
              { n: '時景設計_艾美週年慶_報價單.pdf',     s: '420 KB', who: 'ivens',  when: '05-24 11:15' },
              { n: '艾美週年慶_KV_brief_v2.docx',          s: '188 KB', who: 'sophia', when: '05-22 16:30' },
              { n: '時景設計_過往合作對照.pdf',            s: '2.1 MB', who: 'ivens',  when: '05-24 11:18' },
            ].map((f, i, arr) => (
              <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                <Icon name="FileText" size={14} color={TOKENS.text2} />
                <a style={{ flex: 1, fontSize: 13, color: TOKENS.primary, cursor: 'pointer' }}>{f.n}</a>
                <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3 }}>{f.s}</span>
                <span style={{ fontSize: 11, color: TOKENS.text3 }}>{f.who} · {f.when}</span>
                <Icon name="Download" size={14} color={TOKENS.text2} />
              </div>
            ))}
          </div>

          {/* Approval history */}
          <div style={{ padding: '4px 20px 12px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '12px 0 8px', borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>核准歷程</h3>
            </div>
            {[
              { who: 'ivens',  role: 'admin',       what: '建立採購單並送簽',   when: '2026-05-24 11:18', status: 'done' },
              { who: 'tom',    role: 'super_admin', what: '第一簽 · 待你核准',  when: '等候 2 小時 14 分', status: 'current' },
              { who: 'lina',   role: 'super_admin', what: '第二簽',             when: '待第一簽完成後',    status: 'todo' },
            ].map((a, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.border}` : 'none' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: a.status === 'done' ? TOKENS.statusSuccess : a.status === 'current' ? TOKENS.statusPending : TOKENS.surface,
                  border: a.status === 'todo' ? `1.5px solid ${TOKENS.text3}` : 'none',
                  color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>
                  {a.status === 'done' ? <Icon name="Check" size={11} stroke={2.4} /> : a.status === 'current' ? <Icon name="Clock" size={12} stroke={2} /> : ''}
                </span>
                <Avatar name={a.who} size={24} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.who} <RoleBadge role={a.role} compact /></div>
                  <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{a.what}</div>
                </div>
                <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3 }}>{a.when}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6, padding: '14px 16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500 }}>金額對照</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: TOKENS.text2 }}>本案預估</span>
              <span className="tms-mono" style={{ fontWeight: 500 }}>NT$ 180,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: TOKENS.text2 }}>本月已核准累計</span>
              <span className="tms-mono">NT$ 24,800</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: TOKENS.text2 }}>本月待核累計</span>
              <span className="tms-mono" style={{ color: TOKENS.statusPending }}>NT$ 660,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderTop: `1px solid ${TOKENS.border}`, marginTop: 6 }}>
              <span style={{ color: TOKENS.text2 }}>本月預算</span>
              <span className="tms-mono">NT$ 1,200,000</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 4, background: TOKENS.surface2, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '57%', height: '100%', background: TOKENS.statusPending }} />
              </div>
              <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 4 }}>含本案後將使用 57% 預算</div>
            </div>
          </div>

          <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>供應商紀錄</h3>
            </div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>時景設計工作室</div>
              <div style={{ fontSize: 12, color: TOKENS.text2, marginBottom: 8 }}>過往合作 5 次 · 平均交期 18 天 · 0 次延誤</div>
              {[
                { y: '2025-09', p: '艾美週年慶 · NT$ 165,000' },
                { y: '2025-03', p: '集團春季活動 · NT$ 220,000' },
                { y: '2024-09', p: '艾美週年慶 · NT$ 152,000' },
              ].map((h, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? `1px solid ${TOKENS.border}` : 'none' }}>
                  <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, width: 60 }}>{h.y}</span>
                  <span style={{ fontSize: 12, color: TOKENS.text2 }}>{h.p}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════════
// §19 · 帳號與權限 (Accounts & Permissions)
// ═════════════════════════════════════════════════════════════════

const ALL_USERS = [
  // confirmed
  { name: 'tom',    email: 'tom@hotelgroup.tw',     role: 'super_admin', dept: '行銷處', status: 'active',  joinedAt: '2026-04-15', last: '2026-05-25 14:20' },
  { name: 'lina',   email: 'lina@hotelgroup.tw',    role: 'super_admin', dept: '數位處', status: 'active',  joinedAt: '2026-04-15', last: '2026-05-25 13:48' },
  { name: 'sophia', email: 'sophia@hotelgroup.tw',  role: 'admin',       dept: '行銷處', status: 'active',  joinedAt: '2026-04-20', last: '2026-05-25 14:42' },
  { name: 'ivens',  email: 'ivens@hotelgroup.tw',   role: 'admin',       dept: '數位處', status: 'active',  joinedAt: '2026-04-20', last: '2026-05-25 11:02' },
  { name: 'verna',  email: 'verna@hotelgroup.tw',   role: 'viewer',      dept: '餐飲部', status: 'active',  joinedAt: '2026-04-22', last: '2026-05-24 17:08' },
  // candidates
  { name: 'emma',   email: '',                       role: 'pending',     dept: '行銷處', status: 'candidate', joinedAt: '',          last: '' },
  { name: 'ryan',   email: 'ryan@hotelgroup.tw',     role: 'pending',     dept: '行銷處', status: 'invited',   joinedAt: '2026-05-22', last: '' },
  { name: 'chloe',  email: '',                       role: 'pending',     dept: '行銷處', status: 'candidate', joinedAt: '',          last: '' },
  { name: 'noah',   email: 'noah@hotelgroup.tw',     role: 'pending',     dept: '數位處', status: 'invited',   joinedAt: '2026-05-22', last: '' },
  { name: 'mia',    email: '',                       role: 'pending',     dept: '數位處', status: 'candidate', joinedAt: '',          last: '' },
  { name: 'liam',   email: '',                       role: 'pending',     dept: '數位處', status: 'candidate', joinedAt: '',          last: '' },
  { name: 'grace',  email: 'grace@hotelgroup.tw',    role: 'pending',     dept: '餐飲部', status: 'invited',   joinedAt: '2026-05-22', last: '' },
  { name: 'leo',    email: '',                       role: 'pending',     dept: '餐飲部', status: 'candidate', joinedAt: '',          last: '' },
  { name: 'hannah', email: '',                       role: 'pending',     dept: '餐飲部', status: 'candidate', joinedAt: '',          last: '' },
];

const ACCOUNT_STATUS = {
  active:    { l: '使用中',     c: TOKENS.statusSuccess },
  invited:   { l: '已寄出邀請', c: TOKENS.statusPending },
  candidate: { l: '候補 · 未補', c: TOKENS.text3 },
  disabled:  { l: '已停用',     c: TOKENS.statusCancel },
};

function AccountsScreen() {
  const counts = {
    total: ALL_USERS.length,
    active: ALL_USERS.filter((u) => u.status === 'active').length,
    invited: ALL_USERS.filter((u) => u.status === 'invited').length,
    candidate: ALL_USERS.filter((u) => u.status === 'candidate').length,
  };
  return (
    <Screen
      active="accounts"
      role="super_admin"
      user={{ name: 'tom', role: 'super_admin', dept: '行銷處' }}
      crumbs={['帳號與權限', '使用者列表']}
      height={1100}
    >
      <PageHeader
        title="帳號與權限"
        sub={`共 ${counts.total} 人 · ${counts.active} 使用中 · ${counts.invited} 已邀請 · ${counts.candidate} 候補`}
        actions={
          <>
            <Button icon="Download">匯出名單</Button>
            <Button icon="Mail">寄出未完成邀請(3)</Button>
            <Button variant="primary" icon="Plus">新增使用者</Button>
          </>
        }
      />

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { l: '使用中',     v: counts.active,    s: '所有人 5/25 內登入',           tone: TOKENS.statusSuccess },
          { l: '已邀請',     v: counts.invited,   s: '寄出未驗證',                    tone: TOKENS.statusPending },
          { l: '候補',       v: counts.candidate, s: 'email 未到位',                  tone: TOKENS.text3 },
          { l: '本月新增',   v: 7,                s: '比上月 +5',                     tone: TOKENS.primary },
        ].map((s) => (
          <div key={s.l} style={{ padding: '14px 20px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: TOKENS.text2 }}>{s.l}</div>
            <div className="tms-mono" style={{ fontSize: 28, fontWeight: 700, color: s.tone, marginTop: 4, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 6 }}>{s.s}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{
        height: 48, display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px',
        background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
        borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <Segmented options={['全部', '使用中', '需處理', '已停用']} value="全部" />
        <Chip>處 / 部</Chip>
        <Chip>角色</Chip>
        <span style={{ flex: 1 }} />
        <Input placeholder="搜尋姓名、email" icon="Search" style={{ width: 240 }} />
      </div>

      <div style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none' }}>
        <div style={{ display: 'flex', padding: '0 16px', height: 40, alignItems: 'center', background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>
          <span style={{ width: 200 }}>姓名</span>
          <span style={{ width: 240 }}>Email</span>
          <span style={{ width: 100 }}>處 / 部</span>
          <span style={{ width: 140 }}>角色</span>
          <span style={{ width: 140 }}>狀態</span>
          <span style={{ width: 100 }}>建立</span>
          <span style={{ flex: 1 }}>最近活動</span>
          <span style={{ width: 100, textAlign: 'right' }}>操作</span>
        </div>
        {ALL_USERS.map((u, i) => {
          const st = ACCOUNT_STATUS[u.status];
          const candidate = u.role === 'pending';
          return (
            <div key={u.name} style={{
              display: 'flex', padding: '0 16px', height: 56, alignItems: 'center',
              borderBottom: `1px solid ${TOKENS.border}`,
              background: candidate ? TOKENS.surface2 + '55' : 'transparent',
            }}>
              <span style={{ width: 200, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={u.name} size={28} role={candidate ? 'pending' : undefined} />
                <span style={{ fontSize: 14, fontWeight: 500, color: candidate ? TOKENS.text2 : TOKENS.text1 }}>{u.name}</span>
              </span>
              <span style={{ width: 240, fontSize: 13, color: TOKENS.text2 }} className="tms-mono">
                {u.email || <span style={{ fontStyle: 'italic', color: TOKENS.text3 }}>email 未填</span>}
              </span>
              <span style={{ width: 100, fontSize: 13 }}>{u.dept}</span>
              <span style={{ width: 140 }}>
                {candidate
                  ? <span style={{ fontSize: 12, color: TOKENS.text3 }}>角色待指派 ▾</span>
                  : <RoleBadge role={u.role} />}
              </span>
              <span style={{ width: 140 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 500,
                  padding: '3px 8px', borderRadius: 3,
                  background: st.c + '1f', color: st.c,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.c }} />
                  {st.l}
                </span>
              </span>
              <span className="tms-mono" style={{ width: 100, fontSize: 12, color: TOKENS.text2 }}>{u.joinedAt || '—'}</span>
              <span className="tms-mono" style={{ flex: 1, fontSize: 12, color: TOKENS.text2 }}>{u.last || <span style={{ fontStyle: 'italic', color: TOKENS.text3 }}>從未登入</span>}</span>
              <span style={{ width: 100, display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                {u.status === 'candidate' && <Button size="sm" variant="primary">指派</Button>}
                {u.status === 'invited' && <Button size="sm">重寄邀請</Button>}
                {u.status === 'active' && <Icon name="Pencil" size={14} color={TOKENS.text2} style={{ cursor: 'pointer', alignSelf: 'center' }} />}
                <Icon name="MoreHorizontal" size={14} color={TOKENS.text2} style={{ alignSelf: 'center', cursor: 'pointer' }} />
              </span>
            </div>
          );
        })}
      </div>

      <Pagination total={ALL_USERS.length} page={1} />

      {/* Permission matrix preview at bottom */}
      <div style={{ marginTop: 24, padding: '16px 20px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>權限矩陣 · §5 對照</h3>
          <span style={{ fontSize: 12, color: TOKENS.text3 }}>角色一律由上層指派,不可自行變更</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}` }}>權限</th>
              {['super_admin', 'admin', 'editor', 'viewer'].map((r) => (
                <th key={r} style={{ padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}`, width: 140 }}>
                  <RoleBadge role={r} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['看所有資料',           '✓', '✓', '只看自己', '依公開設定'],
              ['新增 / 編輯',          '✓', '✓', '✓(自己的)', '—'],
              ['刪除',                 '✓', '✓', '—',          '—'],
              ['審核 / 簽核',          '✓', '✓', '—',          '—'],
              ['上傳附件',             '✓', '✓', '✓',          '—'],
              ['管理使用者 / 設定',    '✓', '—', '—',          '—'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 12px', borderBottom: `1px solid ${TOKENS.border}`, fontWeight: 500 }}>{row[0]}</td>
                {row.slice(1).map((v, j) => (
                  <td key={j} style={{ padding: '8px 12px', borderBottom: `1px solid ${TOKENS.border}`, textAlign: 'center', color: v === '✓' ? TOKENS.statusSuccess : v === '—' ? TOKENS.text3 : TOKENS.text2 }}>
                    {v === '✓' ? <Icon name="Check" size={14} color={TOKENS.statusSuccess} stroke={2.2} /> : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Screen>
  );
}

Object.assign(window, { FilesResourcesScreen, POListScreen, PODetailScreen, AccountsScreen, FILES, POs, ALL_USERS });
