// screens-questions.jsx — Open Questions & cover artboards

// ─────────────────────────────────────────────────────────────────
// Cover / Handoff artboard
// ─────────────────────────────────────────────────────────────────
function CoverArtboard({ width = 880, height = 1900 }) {
  const Box = ({ children, style }) => (
    <div style={{ border: `1px solid ${TOKENS.border}`, borderRadius: 6, background: TOKENS.surface, padding: 20, ...style }}>{children}</div>
  );

  return (
    <div className="tms" style={{ width, minHeight: height, background: TOKENS.bg, padding: 40, overflow: 'visible' }}>
      <div style={{ marginBottom: 16 }}>
        <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, letterSpacing: 1 }}>
          HANDOFF · 2026-05-25 · v3 含 P0 + P1 + P2
        </div>
        <h1 style={{ margin: '8px 0 6px', fontSize: 32, fontWeight: 500, letterSpacing: -0.5, color: TOKENS.primary }}>
          KickOff · 0525 v1.0 討論版 · 會議決議重點
        </h1>
      </div>

      <Box style={{ marginBottom: 16, borderLeft: `4px solid ${TOKENS.primary}`, background: TOKENS.surface }}>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: TOKENS.text1, lineHeight: 1.5 }}>
          <li style={{ fontWeight: 600 }}>
            重要文件:&nbsp;
            <a
              href="https://docs.google.com/document/d/19yCX-3R3ofe7zXKAoyWPNUYnCnXIrIiCu8YL4D4NNyI/edit?tab=t.3som5coizaw5"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TOKENS.primary, textDecoration: 'underline' }}
            >
              【數位專案】行銷處內部管理平台開發 ↗
            </a>
          </li>
          <li>需求單另外找專門時間討論</li>
          <li>移除採購單</li>
          <li>下次開始都先以最大權限討論系統，再逐步收斂權限</li>
          <li>主要專案負責人 Tom，考量行銷單位正在進行整併事宜，此系統暫由 lina 協助建置，Verna 協助撰寫需求規格書</li>
          <li>一週至少要有兩天各半小時確認需求</li>
          <li>這份文件作為 KickOff 主要資料，未來依照需求討論會逐步調整之</li>
        </ul>
      </Box>

      <Box style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 500 }}>本檔涵蓋範圍</h3>
        <div style={{ fontSize: 14, color: TOKENS.text2, lineHeight: 1.7 }}>
          依 DESIGN-REQUIREMENTS §23,三波交付一次到位:<br />
          <strong style={{ color: TOKENS.text1, fontWeight: 500 }}>P0</strong> App shell · 登入 · 共用元件 · 儀表板 · 需求單列表 (4 狀態) · 詳情 · 新增<br />
          <strong style={{ color: TOKENS.text1, fontWeight: 500 }}>P1</strong> 專案詳情 · 工作負載甘特圖 月/季/年 · 公告列表 + 詳情 · 會議列表 + 詳情 + timeline<br />
          <strong style={{ color: TOKENS.text1, fontWeight: 500 }}>P2</strong> 檔案資源 · 採購單列表 + 雙簽詳情 · 帳號權限 · 美工 7-stepper · 拍照需求完整表單
        </div>
      </Box>

      <Box style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>本檔交付清單 · 共 26 個 artboard</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: TOKENS.surface2 }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}`, width: 36 }}>#</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}`, width: 50 }}>波</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}` }}>Artboard</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}` }}>對應 §</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500, color: TOKENS.text2, borderBottom: `1px solid ${TOKENS.border}`, width: 180 }}>狀態覆蓋</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['01', 'P0', '01-AppShell · Login default',         '§7, §8, §24', 'default'],
              ['02', 'P0', '01-AppShell · Login loading',         '§7, §30',     'loading'],
              ['03', 'P0', '01-AppShell · Login error',           '§7, §30',     'error'],
              ['04', 'P0', '99-Components-Tokens',                '§3, §25-28',  'reference'],
              ['05', 'P0', '03-Dashboard',                        '§9, §24',     'admin'],
              ['06', 'P0', '04-Request-List · default',           '§10, §26',    'default'],
              ['07', 'P0', '04-Request-List · empty',             '§26, §30',    'empty'],
              ['08', 'P0', '04-Request-List · loading',           '§26, §30',    'loading skeleton'],
              ['09', 'P0', '04-Request-List · readonly',          '§5, §10',     'viewer 視角'],
              ['09b', 'P0', '04-Request-List · editor',           '§5, §10',     'editor 視角(ryan)'],
              ['10', 'P0', '05-Request-Detail',                   '§10, §11, §16', '進行中 + 待確認'],
              ['11', 'P0', '06-Request-Create',                   '§10, §27',     '驗證 error'],
              ['12', 'P1', '07-Project-Detail',                   '§13, §14',     'admin'],
              ['13', 'P1', '08-Gantt-Month',                      '§15, §29',     '多軌堆疊 + 跨人相依'],
              ['14', 'P1', '08-Gantt-Quarter',                    '§29',          '個人→專案'],
              ['15', 'P1', '08-Gantt-Year',                       '§29',          '高密度'],
              ['16', 'P1', '10-Announcement-List',                '§16',          '置頂/即將結束/已結束'],
              ['17', 'P1', '10-Announcement-Detail',              '§16',          '已讀狀態'],
              ['18', 'P1', '11-Meeting-List',                     '§16',          '即將進行/已結束/取消'],
              ['19', 'P1', '11-Meeting-Detail + timeline',        '§16',          'agenda + 紀錄 + timeline'],
              ['20', 'P2', '12-Files-Resources',                  '§17',          '附件 + 資源連結 + 上傳'],
              ['21', 'P2', '13-PO-List',                          '§18',          '4 狀態並陳'],
              ['22', 'P2', '13-PO-Detail',                        '§18',          'super_admin 雙簽待核'],
              ['23', 'P2', '14-Accounts',                         '§5, §19',      '14 人 + 權限矩陣'],
              ['24', 'P2', '15-Design-7-stepper',                 '§11',          '4 種流程狀態'],
              ['25', 'P2', '16-Photo-Request-Form',               '§12',          '8 欄位全到位'],
            ].map((r, i) => (
              <tr key={i}>
                <td className="tms-mono" style={{ padding: '6px 12px', color: TOKENS.text3, borderBottom: `1px solid ${TOKENS.border}` }}>{r[0]}</td>
                <td style={{ padding: '6px 12px', borderBottom: `1px solid ${TOKENS.border}` }}>
                  <span style={{
                    fontSize: 10, fontWeight: 500, padding: '1px 6px', borderRadius: 2,
                    background:
                      r[1] === 'P0' ? TOKENS.statusSuccess + '1f' :
                      r[1] === 'P1' ? TOKENS.statusPending + '1f' :
                                       TOKENS.primarySoft,
                    color:
                      r[1] === 'P0' ? TOKENS.statusSuccess :
                      r[1] === 'P1' ? TOKENS.statusPending :
                                       TOKENS.primary,
                  }}>{r[1]}</span>
                </td>
                <td style={{ padding: '6px 12px', borderBottom: `1px solid ${TOKENS.border}`, fontWeight: 500 }}>{r[2]}</td>
                <td style={{ padding: '6px 12px', borderBottom: `1px solid ${TOKENS.border}`, color: TOKENS.text2 }}>{r[3]}</td>
                <td style={{ padding: '6px 12px', borderBottom: `1px solid ${TOKENS.border}`, color: TOKENS.text2 }}>{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Box style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>設計系統摘要</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, color: TOKENS.text2, lineHeight: 1.8 }}>
          <div>
            <div style={{ color: TOKENS.text1, fontWeight: 500, marginBottom: 4 }}>字型</div>
            Noto Sans TC(全站)+ JetBrains Mono(編號 / 日期 / 金額)<br />
            字級 4 級:24 / 18 / 14 / 12;字重 300 / 400 / 500 / 700
          </div>
          <div>
            <div style={{ color: TOKENS.text1, fontWeight: 500, marginBottom: 4 }}>色彩</div>
            §3 暫定色票(已確認沿用)+ §28 六色狀態 token<br />
            無陰影,僅 1px hairline;圓角 3px / 6px
          </div>
          <div>
            <div style={{ color: TOKENS.text1, fontWeight: 500, marginBottom: 4 }}>佈局</div>
            最小寬 1280px / 最大 1440px;左導覽 240 / 64;header 56;內距 24<br />
            行高 3 檔:32 / 40 / 48
          </div>
          <div>
            <div style={{ color: TOKENS.text1, fontWeight: 500, marginBottom: 4 }}>品牌</div>
            <strong style={{ color: TOKENS.statusPending }}>過渡 wordmark</strong> 已就位:任務行 + sage check<br />
            待品牌方交付 SVG / PNG / favicon 後一鍵替換
          </div>
        </div>
      </Box>

      <Box>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 500 }}>P2 重點落地</h3>
        <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: TOKENS.text2, lineHeight: 1.9 }}>
          <li><strong style={{ color: TOKENS.text1, fontWeight: 500 }}>檔案資源</strong>:8 個檔案類型 badge(PSD/PDF/DOC/ZIP/FIG/JPG/MP4...)+ 拖放上傳 + 25MB 規則 + 資源連結預覽</li>
          <li><strong style={{ color: TOKENS.text1, fontWeight: 500 }}>採購單雙簽</strong>:&gt; NT$ 100,000 觸發 super_admin 雙簽;金額對照與供應商過往紀錄並列;待核 / 已核 / 草稿 / 已取消四狀態</li>
          <li><strong style={{ color: TOKENS.text1, fontWeight: 500 }}>帳號權限</strong>:14 人(使用中 / 已邀請 / 候補)三狀態;9 候補虛線占位含「指派」按鈕;§5 權限矩陣完整對照表</li>
          <li><strong style={{ color: TOKENS.text1, fontWeight: 500 }}>美工 7-stepper</strong>:4 種流程狀態(線性 / 退回循環 / 完成 / 初審退回),含每個狀態的系統紀錄樣式</li>
          <li><strong style={{ color: TOKENS.text1, fontWeight: 500 }}>拍照需求</strong>:§12 八欄位全到位 — 日期 / 主題 / 窗口 / 館別 / 場景清單(16 個 chip)/ 用途 / 交付格式 / 修圖等級(輕中重)+ 外包供應商連動 PO</li>
        </ul>
      </Box>

      <div style={{ marginTop: 24, fontSize: 11, color: TOKENS.text3, fontFamily: '"JetBrains Mono", monospace' }}>
        三波交付完成 · 進入審稿流程(§36):Lina + Sophia + Tom → Verna 試讀 → 開發可行性對齊
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Open Questions artboard (collects all 不確定 items)
// ─────────────────────────────────────────────────────────────────
const QUESTIONS = [
  // ─── 已釐清 ──────────────────────────────────────────────
  { group: '已釐清', tone: 'done', q: 'P0 / P1 / P2 全數啟動',              detail: '三波依 §23 順序逐張交付,共 26 個 artboard 已就位。', src: '本輪推進', who: '已完成' },
  { group: '已釐清', tone: 'done', q: 'Logo · 過渡 wordmark',                 detail: 'sidebar + login 已換上過渡 wordmark(任務行 + sage check)。', src: 'Q · q_logo', who: '已回覆' },
  { group: '已釐清', tone: 'done', q: '色票沿用',                             detail: '沿用 §3 暫定色票 + §28 六色狀態 token,不再調整。', src: 'Q · q_palette', who: '已回覆' },
  { group: '已釐清', tone: 'done', q: '拍照需求最終欄位',                     detail: '§12 八欄位全採用,P2 完整表單已就位。', src: 'Q · q_photo_fields', who: '已回覆' },
  { group: '已釐清', tone: 'done', q: '正式登入暫不進 v1',                    detail: 'live demo 用權限差異自動登入;login 展示「忘記密碼」文字未實作。', src: 'Q · q_login_real', who: '已回覆' },
  { group: '已釐清', tone: 'done', q: '候補 9 人',                             detail: 'emma / ryan / chloe · noah / mia / liam · grace / leo / hannah。已落地到 login + 帳號管理 + 出席名單 + 人員選擇器。', src: 'Q · candidates', who: '已回覆' },

  // ─── P2 待 SPEC 對齊 ──────────────────────────────────────
  { group: 'P2 待 SPEC 對齊', tone: 'mid', q: '採購單金額閾值 / 雙簽規則',     detail: '畫稿假設「&gt; NT$ 100,000 觸發 super_admin 雙簽」。SPEC 若有別的金額或不需雙簽,需回頭調整 PO 詳情頁的提示帶。', src: '§18, §34', who: 'Lina / Tom' },
  { group: 'P2 待 SPEC 對齊', tone: 'mid', q: '採購單與需求單關聯數',           detail: '畫稿目前 1 對 1(PO list 顯示一筆 linked REQ;REQ 詳情右欄一張關聯卡)。若允許 1 對多需把右欄改成列表,並修改 PO 編號搜尋欄。', src: '§18', who: 'Lina' },
  { group: 'P2 待 SPEC 對齊', tone: 'mid', q: '使用者「候補 vs 已邀請」邊界',  detail: '畫稿區分 candidate(無 email)/ invited(寄出未驗證)/ active 三狀態。SPEC §19 未明確;若簡化為兩狀態,需移除「重寄邀請」按鈕。', src: '§19', who: 'Sophia' },
  { group: 'P2 待 SPEC 對齊', tone: 'low', q: '修圖等級三檔命名',              detail: 'P2 拍照表單使用「輕度 / 標準 / 深度」三檔。SPEC 若改用其他分法(例如僅二檔)需同步調整選項與外包報價區間。', src: '§12', who: 'Lina / 外包窗口' },
  { group: 'P2 待 SPEC 對齊', tone: 'low', q: '檔案類型 badge 顏色',           detail: 'PSD / PDF / DOC / ZIP / FIG / JPG / MP4 各自賦色,非品牌色,僅為視覺識別。是否進品牌規範?', src: '§17', who: '品牌方' },

  // ─── 本輪新增(P1 後)──────────────────────────────────────
  { group: '本輪新增', tone: 'mid', q: '甘特圖月報的可視寬度',                 detail: '依 §29 月報 32px / 日 = 992px。實際可視 880-900px,需水平捲動 1-2 天。是否接受捲動或調整 28px / 日?', src: '§29', who: 'Lina' },
  { group: '本輪新增', tone: 'low', q: '年報甘特圖密度策略',                  detail: 'P1 已示範 bar 無文字 + hover tooltip + 月軸 64px + Q1-Q4 兩層。確認是否符合預期。', src: '§29', who: 'Lina' },
  { group: '本輪新增', tone: 'low', q: '會議 timeline kind 命名',              detail: '7 種:create / start / question / answer / reject / version / confirm / end。SPEC 若不同需調整。', src: '§16, §34', who: 'Lina' },
  { group: '本輪新增', tone: 'low', q: '公告「已讀狀態」欄位是否進 SPEC',     detail: '畫面已展示「14/14 已讀」。需 SPEC 加上 read receipts 欄位,或從 v1 拿掉。', src: '§16', who: 'Lina' },

  // ─── P0 留下的低優項 ──────────────────────────────────────
  { group: 'P0 留下', tone: 'mid', q: '全站搜尋是否進 v1',                    detail: 'header 240px 搜尋框目前可用;若 v1 不做,先以 disabled + placeholder「v1 後續開放」顯示。', src: '§35-11', who: 'Tom' },
  { group: 'P0 留下', tone: 'low', q: '密集 / 寬鬆 row 切換',                  detail: '需求單列表預設 48px。若需切換,需追加密度 toggle。', src: '§26, §35-10', who: 'Sophia' },
  { group: 'P0 留下', tone: 'low', q: '深色模式',                              detail: 'v1 未畫。若品牌方明確需要再啟動,token 結構可直接擴充。', src: '§35-4', who: '品牌方' },
];

const TONE_STYLE = {
  high: { bg: TOKENS.statusDanger + '14', fg: TOKENS.statusDanger, label: '高' },
  mid:  { bg: TOKENS.statusPending + '14', fg: TOKENS.statusPending, label: '中' },
  low:  { bg: TOKENS.statusNeutral + '14', fg: TOKENS.statusNeutral, label: '低' },
  done: { bg: TOKENS.statusSuccess + '14', fg: TOKENS.statusSuccess, label: '已決' },
};

function OpenQuestionsArtboard({ width = 880, height = 2100 }) {
  const groups = ['已釐清', 'P2 待 SPEC 對齊', '本輪新增', 'P0 留下'];
  return (
    <div className="tms" style={{ width, minHeight: height, background: TOKENS.bg, padding: 40, overflow: 'visible' }}>
      <div style={{ marginBottom: 16 }}>
        <div className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3, letterSpacing: 1 }}>OPEN QUESTIONS · P0 + P1 + P2 後</div>
        <h1 style={{ margin: '8px 0 6px', fontSize: 32, fontWeight: 500, letterSpacing: -0.5 }}>不確定項目清單</h1>
        <div style={{ fontSize: 14, color: TOKENS.text2, lineHeight: 1.7 }}>
          已釐清 {QUESTIONS.filter((q) => q.tone === 'done').length} 項 ·
          P2 SPEC 對齊 {QUESTIONS.filter((q) => q.group === 'P2 待 SPEC 對齊').length} 項 ·
          本輪新增 {QUESTIONS.filter((q) => q.group === '本輪新增').length} 項 ·
          P0 留下 {QUESTIONS.filter((q) => q.group === 'P0 留下').length} 項。
        </div>
      </div>

      {groups.map((g) => {
        const items = QUESTIONS.filter((q) => q.group === g);
        return (
          <section key={g} style={{
            marginBottom: 20, background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
          }}>
            <div style={{
              padding: '14px 20px', borderBottom: `1px solid ${TOKENS.border}`,
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{g}</h3>
              <span style={{ fontSize: 12, color: TOKENS.text3 }}>{items.length} 項</span>
            </div>
            {items.map((q, i) => {
              const t = TONE_STYLE[q.tone];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr 140px',
                  gap: 16, padding: '14px 20px',
                  borderBottom: i < items.length - 1 ? `1px solid ${TOKENS.border}` : 'none',
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    height: 22, borderRadius: 3, fontSize: 11, fontWeight: 700,
                    background: t.bg, color: t.fg,
                  }}>{t.label}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4,
                                  textDecoration: q.tone === 'done' ? 'line-through' : 'none',
                                  color: q.tone === 'done' ? TOKENS.text2 : TOKENS.text1 }}>{q.q}</div>
                    <div style={{ fontSize: 13, color: TOKENS.text2, lineHeight: 1.6 }}>{q.detail}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, fontSize: 11 }}>
                    <span className="tms-mono" style={{ color: TOKENS.text3 }}>{q.src}</span>
                    <span style={{ color: q.tone === 'done' ? TOKENS.statusSuccess : TOKENS.text2 }}>
                      {q.tone === 'done' ? '✓ ' : '由 '}{q.who}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}

      <div style={{ marginTop: 24, padding: 16, border: `1px dashed ${TOKENS.border}`, borderRadius: 6, background: TOKENS.surface }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>P2 待釐清(下一波啟動前)</div>
        <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: TOKENS.text2, lineHeight: 1.8 }}>
          <li>採購單金額計算規則、簽核閾值、與需求單關聯數(1 對 1 / 1 對多)</li>
          <li>檔案資源頁:資源連結 vs 附件 是否同模組,還是分兩個 tab</li>
          <li>帳號權限頁:候補 → 正式角色的指派流程(誰可以指派、是否需要 super_admin 雙簽)</li>
          <li>美工 / 設計 7-stepper 是否允許跳關 / 退回到指定關卡</li>
          <li>拍照需求:場景清單是否多選 chip 加自訂,還是預設 enum;修圖需求是否分等級</li>
        </ul>
      </div>
    </div>
  );
}

Object.assign(window, { CoverArtboard, OpenQuestionsArtboard, QUESTIONS });
