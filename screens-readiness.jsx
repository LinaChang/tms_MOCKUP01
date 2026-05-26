// screens-readiness.jsx — Live demo readiness checklist artboard

const READINESS = [
  {
    cat: 'A · 設計交付完整性',
    sub: '26 artboard 已交付,但部分狀態 / 角色未獨立示範',
    items: [
      { st: 'done', t: '七模組 + 共用元件 + handoff 一次到位', d: '§23 P0/P1/P2 全部畫稿就位', owner: 'Design' },
      { st: 'done', t: '4 種角色至少各畫一張代表畫面',         d: 'super_admin (Accounts/PO) / admin (大部分) / editor (List ryan) / viewer (List readonly) / pending (Accounts 候補)', owner: 'Design' },
      { st: 'todo', t: 'editor 視角擴充至 Dashboard / Request Detail', d: 'List 已示範;若需 Dashboard 與 Detail 的 editor 視角(隱藏退回 / 通過按鈕)可再補', owner: 'Design' },
      { st: 'todo', t: 'hover / focus / disabled 狀態獨立樣式表', d: '元件 reference 已示範部分;§35 第 12 點要求每頁皆涵蓋 8 種狀態,建議獨立 states reference artboard', owner: 'Design' },
      { st: 'risk', t: '甘特圖月報的可視寬度',                  d: '32px / 日 = 992px,實際內距後可能水平捲動 1-2 天。需 Lina 確認接受捲動或調 28px', owner: 'Lina' },
    ],
  },
  {
    cat: 'B · SPEC.md 對齊',
    sub: '§34 要求每個 SPEC 欄位都必須對應到具體畫面元件',
    items: [
      { st: 'todo', t: 'SPEC 欄位 ↔ 畫面元件交叉檢查',          d: '由 Lina 帶領,走過 SPEC.md 每章節,確認每欄位在 26 個 artboard 都有對應元件;發現遺漏時設計補畫', owner: 'Lina + Design' },
      { st: 'risk', t: '採購單金額閾值 / 雙簽規則',              d: '畫稿假設 > NT$ 100,000 雙簽。SPEC 若不同需調整 PO 詳情頁提示帶', owner: 'Lina / Tom' },
      { st: 'risk', t: '採購單與需求單關聯數 1 對 1 / 1 對多',   d: '現為 1 對 1。允許 1 對多需把右欄改列表式', owner: 'Lina' },
      { st: 'risk', t: '使用者「候補 vs 已邀請」邊界',           d: '畫稿區分 candidate / invited / active 三狀態;SPEC §19 未明確', owner: 'Sophia' },
      { st: 'risk', t: '修圖等級分級 / 命名',                    d: '畫稿用「輕度 / 標準 / 深度」三檔;SPEC §12 標「待確認」', owner: 'Lina + 外包窗口' },
    ],
  },
  {
    cat: 'C · 內容資料一致性',
    sub: 'live demo 時跨 artboard 看到的應該是同一份資料',
    items: [
      { st: 'done', t: '14 人帳號名稱一致',                     d: 'sophia / tom / ivens / lina / verna + 9 候補(emma / ryan / chloe / noah / mia / liam / grace / leo / hannah)貫穿全檔', owner: 'Design' },
      { st: 'done', t: 'REQ / PO / PRJ 編號規則一致',           d: 'REQ-YYYYMMDD-NN · PO-YYYYMMDD-NN · PRJ-YYYYMM-NNN', owner: 'Design' },
      { st: 'todo', t: '統一一份「demo 資料種子檔」',           d: '目前各 artboard 各有 demo 陣列,live demo 時實際資料應該由一份 seed 檔生成;建議 dev 把 26 個 artboard 的 demo 資料整併成 seed.json', owner: 'Dev' },
      { st: 'todo', t: '跨 artboard 同一筆 REQ 的數值對得起',  d: '例:Request List 的 REQ-20260520-01 進度 80% 對應 Request Detail 的 80%;目前部分對得起、部分為各自的 demo 值', owner: 'Dev' },
    ],
  },
  {
    cat: 'D · 開發切版可行性(§36 末段)',
    sub: '由 dev 走一遍 26 個 artboard,確認可實作',
    items: [
      { st: 'todo', t: '所有顏色 / 字級 / 間距 / 圓角皆引用 token',  d: '畫稿源碼已用 TOKENS 物件;dev 端切版時需轉為 CSS variables 或設計系統 token', owner: 'Dev' },
      { st: 'todo', t: '所有 icon 皆為 Lucide 名稱',              d: '本檔內聯 Lucide path;dev 切版直接使用 lucide-react 或 lucide-static', owner: 'Dev' },
      { st: 'todo', t: '互動狀態完整(8 種)',                      d: '預設 / hover / focus / disabled / loading / empty / error / readonly · 設計需在元件 reference 補齊', owner: 'Design + Dev' },
      { st: 'todo', t: '跨頁元件一致性',                            d: 'StatusBadge / RoleBadge / Avatar / Button / Input 等在所有 artboard 是同一套元件,dev 端切版時切勿各自重做', owner: 'Dev' },
      { st: 'risk', t: '甘特圖實作可行性',                          d: '甘特圖是技術複雜度最高的一塊。建議第一版用 frappe-gantt 或自行用 div + percentage 實作,避免一開始就上 D3', owner: 'Dev' },
    ],
  },
  {
    cat: 'E · 後端 / 資料庫(live demo 真的能動的條件)',
    sub: '設計範圍外但 live demo 必備',
    items: [
      { st: 'todo', t: '14 人帳號建立 + 自動登入按鈕串接',         d: '畫稿示範 5 個 demo button;dev 端建好 14 帳號(5 確認 + 9 候補 placeholder),按鈕點擊即注入 session', owner: 'Dev' },
      { st: 'todo', t: '需求單 CRUD + 退回 / 上稿 / 簽核',          d: 'demo 時觀眾會問:「能不能真的退回?」要能跑通完整 7-stepper 流程', owner: 'Dev' },
      { st: 'todo', t: '附件上傳(實體存儲)',                      d: '25MB 內檔案可上傳;影片是否進 v1 待 Lina 確認', owner: 'Dev' },
      { st: 'done', t: '通知系統 v1 用 mock 即可',                  d: '§21 已決定 live demo 不接 SMTP;底部滑出文字「異動已 email 通知」即可', owner: 'Spec confirmed' },
      { st: 'todo', t: '甘特圖資料來源',                            d: '甘特圖的 bar = REQ + 任務時程的衍生視圖。dev 端需決定 query 還是 cache,影響月 / 季 / 年切換的速度', owner: 'Dev' },
    ],
  },
  {
    cat: 'F · Live demo 操作劇本',
    sub: '不在原 SPEC 但 demo 必備',
    items: [
      { st: 'todo', t: 'demo 腳本(15-30 分鐘)',                  d: '建議路徑:1. 介紹 login → 2. tom 視角看 Dashboard / 待處理 → 3. sophia 開新需求單 → 4. tom 簽核 → 5. 甘特圖看工作負載 → 6. verna 視角看唯讀。順序需 Sophia / Tom 拍板', owner: 'Sophia / Tom' },
      { st: 'todo', t: '預先建立的測試資料',                       d: '不要 live demo 時才手動建。dev 端需用 seed 檔灌入 12-15 張 REQ + 3 個專案 + 2 場會議 + 1 條公告', owner: 'Dev' },
      { st: 'todo', t: '異常情境 fallback',                         d: '若 demo 中網路慢 / 伺服器掛,需有預錄影片 backup;或直接展示靜態 mockup 連結', owner: 'Sophia' },
      { st: 'todo', t: 'demo 環境 URL + 帳密分發',                  d: 'live demo 後若請主管自己再點,需給連結。url + 帳密 + 注意事項一張 cheat sheet', owner: 'Tom' },
    ],
  },
  {
    cat: 'G · 對外保護',
    sub: '§1「第一版不對外公開,以登入牆保護;有網址的人只會看到登入頁」',
    items: [
      { st: 'done', t: 'Cloudflare Access / IP 限制 v1 不做',       d: '§22 已明訂', owner: 'Spec confirmed' },
      { st: 'todo', t: '基本登入牆(避免 URL 外洩立刻可看)',       d: '即便 v1 不做 session,登入頁的「未登入 → 看不到任何內容」需確保。SPA 路由保護 + API 401', owner: 'Dev' },
      { st: 'todo', t: 'robots.txt + noindex meta',                 d: '避免搜尋引擎收錄', owner: 'Dev' },
    ],
  },
  {
    cat: 'H · 品牌側收斂',
    sub: '畫稿目前使用過渡 wordmark + 暫定色票',
    items: [
      { st: 'risk', t: 'Logo 正式檔(SVG / PNG / favicon)',         d: '畫稿用過渡 wordmark。品牌方收齊後一鍵替換 LogoMark + Wordmark 元件', owner: '品牌方' },
      { st: 'done', t: '正式色票暫時沿用',                          d: 'Q · q_palette 已回覆「沿用,不再調整」', owner: 'Sophia confirmed' },
      { st: 'todo', t: '正式品牌字型(Noto Sans TC 確認)',         d: 'Noto Sans TC 是 OFL 1.1 可免費商用。若品牌方有付費字型偏好,需另行授權盤點', owner: '品牌方' },
      { st: 'todo', t: '深色模式',                                  d: 'v1 不畫。token 結構已預留,後續需要再啟動', owner: '品牌方' },
    ],
  },
];

const ST_STYLE = {
  done: { c: TOKENS.statusSuccess, l: '已就位', i: 'CheckCircle2' },
  todo: { c: TOKENS.statusPending, l: '待處理', i: 'Clock' },
  risk: { c: TOKENS.statusDanger,  l: '風險',   i: 'AlertCircle' },
};

function ReadinessArtboard({ width = 1080, height = 2400 }) {
  const total = READINESS.reduce((a, c) => a + c.items.length, 0);
  const counts = {
    done: READINESS.reduce((a, c) => a + c.items.filter((i) => i.st === 'done').length, 0),
    todo: READINESS.reduce((a, c) => a + c.items.filter((i) => i.st === 'todo').length, 0),
    risk: READINESS.reduce((a, c) => a + c.items.filter((i) => i.st === 'risk').length, 0),
  };
  return (
    <div className="tms" style={{ width, minHeight: height, background: TOKENS.bg, padding: 40, overflow: 'visible' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, letterSpacing: 1 }}>
          LIVE DEMO READINESS · 2026-05-25
        </div>
        <h1 style={{ margin: '8px 0 6px', fontSize: 32, fontWeight: 500, letterSpacing: -0.5 }}>
          v1 Live Demo 啟動前確認清單
        </h1>
        <div style={{ fontSize: 14, color: TOKENS.text2, lineHeight: 1.7 }}>
          設計交付 ≠ live demo 就緒。本檔列出 8 大類共 {total} 項檢核,讓 Lina / Sophia / Tom / Dev 一起走過,確認從畫稿到 demo 環境之間還有什麼。
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { l: '共計項目',  v: total,       sub: '8 大類',                          tone: TOKENS.text1 },
          { l: '已就位',    v: counts.done, sub: `${Math.round(counts.done / total * 100)}%`, tone: TOKENS.statusSuccess },
          { l: '待處理',    v: counts.todo, sub: 'live demo 前要動',                  tone: TOKENS.statusPending },
          { l: '風險 / 需拍板', v: counts.risk, sub: '影響範圍大',                       tone: TOKENS.statusDanger },
        ].map((s) => (
          <div key={s.l} style={{ padding: '16px 20px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: TOKENS.text2 }}>{s.l}</div>
            <div className="tms-mono" style={{ fontSize: 32, fontWeight: 700, color: s.tone, marginTop: 4, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      {READINESS.map((cat, ci) => (
        <section key={ci} style={{
          marginBottom: 16, background: TOKENS.surface,
          border: `1px solid ${TOKENS.border}`, borderRadius: 6,
        }}>
          <div style={{
            padding: '14px 20px', borderBottom: `1px solid ${TOKENS.border}`,
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{cat.cat}</h3>
              <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{cat.sub}</div>
            </div>
            <span style={{ fontSize: 12, color: TOKENS.text3 }}>
              {cat.items.filter((i) => i.st === 'done').length} / {cat.items.length} 完成
            </span>
          </div>
          {cat.items.map((it, ii) => {
            const s = ST_STYLE[it.st];
            return (
              <div key={ii} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 160px',
                gap: 16, padding: '14px 20px',
                borderBottom: ii < cat.items.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, height: 22, padding: '0 8px',
                  borderRadius: 3, fontSize: 11, fontWeight: 500,
                  background: s.c + '1f', color: s.c, alignSelf: 'flex-start',
                }}>
                  <Icon name={s.i} size={11} stroke={2} />{s.l}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 500, marginBottom: 4,
                    textDecoration: it.st === 'done' ? 'line-through' : 'none',
                    color: it.st === 'done' ? TOKENS.text2 : TOKENS.text1,
                  }}>{it.t}</div>
                  <div style={{ fontSize: 13, color: TOKENS.text2, lineHeight: 1.6 }}>{it.d}</div>
                </div>
                <div style={{
                  fontSize: 12, color: TOKENS.text2, textAlign: 'right', alignSelf: 'center',
                }}>
                  <div style={{ color: TOKENS.text3, fontSize: 10, fontFamily: '"JetBrains Mono", monospace' }}>OWNER</div>
                  <div style={{ marginTop: 2, fontWeight: 500 }}>{it.owner}</div>
                </div>
              </div>
            );
          })}
        </section>
      ))}

      {/* Suggested timeline */}
      <section style={{
        marginTop: 24, padding: '16px 20px',
        background: TOKENS.surface, border: `1px dashed ${TOKENS.border}`, borderRadius: 6,
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>建議推進順序</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
          {[
            { step: 1, t: '本週 · SPEC 對齊', d: 'Lina 帶 Sophia / Tom 走過 B 類 5 項。風險最高的 4 項拍板',                     who: 'Lina' },
            { step: 2, t: '下週 · 設計補畫', d: 'A 類 editor 視角 + 8 種狀態 reference;品牌 logo 若到位也一併替換',              who: 'Design' },
            { step: 3, t: '兩週內 · Dev 切版', d: 'C 類 seed 檔 + D 類 token / icon / 互動狀態實作;甘特圖獨立 spike',                who: 'Dev' },
            { step: 4, t: '三週內 · 端對端', d: 'E 類後端串接,F 類腳本 + 測試資料就位;G 類登入牆 + noindex',                     who: 'Dev / Sophia' },
            { step: 5, t: '第四週 · live demo', d: '邀請相關人員 · 走腳本 · 收集 §36 三輪審稿意見',                                who: 'All' },
          ].map((p, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ width: 180, flexShrink: 0, textAlign: 'center' }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: TOKENS.primary, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                }}>{p.step}</span>
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 500 }}>{p.t}</div>
                <div style={{ fontSize: 11, color: TOKENS.text2, marginTop: 4, lineHeight: 1.5 }}>{p.d}</div>
                <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 6, fontFamily: '"JetBrains Mono", monospace' }}>{p.who}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 2, background: TOKENS.border, marginTop: 13 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ReadinessArtboard, READINESS });
