// screens-design-photo.jsx — §11 design 7-stepper variants + §12 photo form

// ═════════════════════════════════════════════════════════════════
// §11 · 美工 / 設計流程 7-stepper
// ═════════════════════════════════════════════════════════════════

// Stepper variants:
//   1. Standard linear (at step 4)
//   2. Rejected at step 5 — looped back to step 4 (a v3 round)
//   3. Completed (all done)
//   4. Rejected hard at step 2 — by 行銷 / 公關初審

const DESIGN_STEPS = [
  '開單單位提需求',
  '行銷 / 公關初審',
  '指派 PM 與設計來源',
  '設計完成回傳',
  '直屬主管確認',
  '相關單位確認',
  '完成結案',
];

function StepperExpanded({ at, variant = 'linear', rejectedAtIdx, comment }) {
  // status by index: 'done' | 'current' | 'todo' | 'rejected'
  const stepStatus = (i) => {
    if (variant === 'completed') return 'done';
    if (variant === 'rejected-hard') {
      if (i < rejectedAtIdx) return 'done';
      if (i === rejectedAtIdx) return 'rejected';
      return 'todo';
    }
    if (variant === 'looped' && rejectedAtIdx != null) {
      if (i < rejectedAtIdx) return 'done';
      if (i === rejectedAtIdx) return 'rejected';
      if (i === at) return 'current';
      if (i < at) return 'done';
      return 'todo';
    }
    if (i < at) return 'done';
    if (i === at) return 'current';
    return 'todo';
  };

  const colorFor = (st) => st === 'done' ? TOKENS.statusSuccess
    : st === 'current' ? TOKENS.primary
    : st === 'rejected' ? TOKENS.statusDanger
    : null;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      {DESIGN_STEPS.map((s, i) => {
        const st = stepStatus(i);
        const c = colorFor(st);
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto', width: 130 }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: st === 'todo' ? 'transparent' : c,
                border: st === 'todo' ? `1.5px solid ${TOKENS.text3}` : 'none',
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
              }}>
                {st === 'done'      && <Icon name="Check"  size={14} stroke={2.4} />}
                {st === 'current'   && <span style={{ width: 9, height: 9, background: '#fff', borderRadius: '50%' }} />}
                {st === 'rejected'  && <Icon name="Undo2"  size={13} stroke={2.4} />}
                {st === 'todo'      && <span style={{ fontSize: 12, color: TOKENS.text3 }}>{i + 1}</span>}
              </span>
              <span style={{
                marginTop: 8, fontSize: 12, fontWeight: 500, textAlign: 'center',
                color: st === 'todo' ? TOKENS.text3 : TOKENS.text1,
                textDecoration: st === 'done' ? 'none' : 'none',
              }}>{s}</span>
              {st === 'current' && <span style={{ fontSize: 10, color: TOKENS.primary, marginTop: 2, fontWeight: 500 }}>進行中</span>}
              {st === 'rejected' && <span style={{ fontSize: 10, color: TOKENS.statusDanger, marginTop: 2, fontWeight: 500 }}>已退回</span>}
              {st === 'done' && variant === 'completed' && i === 6 && <span style={{ fontSize: 10, color: TOKENS.statusSuccess, marginTop: 2, fontWeight: 500 }}>結案</span>}
            </div>
            {i < DESIGN_STEPS.length - 1 && (() => {
              const fromSt = stepStatus(i);
              const toSt = stepStatus(i + 1);
              const lineColor =
                fromSt === 'done' ? TOKENS.statusSuccess
                : fromSt === 'rejected' || toSt === 'rejected' ? TOKENS.statusDanger
                : TOKENS.border;
              return (
                <div style={{
                  height: 2, flex: 1, background: lineColor,
                  marginTop: 13,
                }} />
              );
            })()}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DesignFlowScreen() {
  return (
    <Screen
      active="request"
      role="admin"
      user={{ name: 'lina', role: 'super_admin', dept: '數位處' }}
      crumbs={['需求單', '美工 / 設計流程 reference']}
      height={1380}
    >
      <PageHeader
        title="美工 / 設計流程 reference"
        sub="§11 七步流程的四種狀態樣式 · 退回不重開單,沿用同需求單號"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          {
            title: '狀態 1 · 標準線性流程',
            sub: '進行到第 4 關「設計完成回傳」· REQ-20260520-01 v3',
            badge: <StatusBadge status="進行中" />,
            stepper: <StepperExpanded at={3} variant="linear" />,
            timeline: [
              { at: 0, who: 'verna',  when: '05-20 09:00', text: '開單:餐券面額分三檔 + 雙語並列' },
              { at: 1, who: 'sophia', when: '05-20 09:42', text: '初審通過 · 歸類為「美工設計 · EDM」' },
              { at: 2, who: 'tom',    when: '05-20 11:20', text: '指派 PM:sophia · 設計來源:館內' },
              { at: 3, who: 'sophia', when: '05-20 16:01', text: '上稿 v3 · 等待主管確認' },
            ],
          },
          {
            title: '狀態 2 · 退回後再循環(沿用同單號)',
            sub: '第 5 關退回回到第 4 關 · 由 v2 進到 v3 · 同一個 REQ-20260520-01',
            badge: <StatusBadge status="待確認" />,
            stepper: <StepperExpanded at={3} variant="looped" rejectedAtIdx={4} />,
            timeline: [
              { at: 4, who: 'sophia', when: '05-20 14:32', kind: 'reject', text: '退回 v2 · 字級偏小,主標請改 48 / 副標 24' },
              { at: 3, who: 'tom',    when: '05-20 16:01', text: '上稿 v3 修正,等待主管再次確認' },
            ],
            comment: '退回紀錄會自動寫入版本 + 審閱紀錄,不需重新開單。',
          },
          {
            title: '狀態 3 · 完成結案',
            sub: '七步完成 · 系統自動寫入結案紀錄 · 已歸檔',
            badge: <StatusBadge status="完成" />,
            stepper: <StepperExpanded at={7} variant="completed" />,
            timeline: [
              { at: 6, who: 'tom', when: '05-15 10:00', kind: 'confirm', text: '結案 · 上稿完成,EDM 已寄出' },
            ],
          },
          {
            title: '狀態 4 · 初審不通過(早期退回)',
            sub: '第 2 關「行銷 / 公關初審」不通過 · 退回開單單位修改',
            badge: <StatusBadge status="退回" />,
            stepper: <StepperExpanded at={1} variant="rejected-hard" rejectedAtIdx={1} />,
            timeline: [
              { at: 1, who: 'sophia', when: '05-22 10:15', kind: 'reject', text: '退回:需求描述過於模糊,請補充用途 + 受眾;另外此檔期已有相似需求 REQ-20260520-01' },
            ],
            comment: '初審不通過將直接退回開單單位,不會進入 PM 指派流程。',
          },
        ].map((sec, i) => (
          <section key={i} style={{
            padding: '20px 24px', background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`, borderRadius: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{sec.title}</h3>
              {sec.badge}
            </div>
            <div style={{ fontSize: 12, color: TOKENS.text2, marginBottom: 20 }}>{sec.sub}</div>
            {sec.stepper}
            {sec.timeline && (
              <div style={{
                marginTop: 20, paddingTop: 16, borderTop: `1px solid ${TOKENS.border}`,
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ fontSize: 12, color: TOKENS.text3, marginBottom: 4 }}>系統自動寫入的紀錄</div>
                {sec.timeline.map((t, ti) => (
                  <div key={ti} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <span className="tms-mono" style={{ color: TOKENS.text3, width: 84 }}>{t.when}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: TOKENS.surface2, color: TOKENS.text2 }}>關 {t.at + 1}</span>
                    <Avatar name={t.who} size={16} />
                    <strong style={{ fontWeight: 500, width: 60 }}>{t.who}</strong>
                    {t.kind === 'reject' && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: TOKENS.statusDanger + '1f', color: TOKENS.statusDanger, fontWeight: 500 }}>退回</span>}
                    {t.kind === 'confirm' && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: TOKENS.statusSuccess + '1f', color: TOKENS.statusSuccess, fontWeight: 500 }}>確認</span>}
                    <span style={{ color: TOKENS.text1, flex: 1 }}>{t.text}</span>
                  </div>
                ))}
                {sec.comment && (
                  <div style={{ marginTop: 8, padding: '8px 10px', background: TOKENS.surface2, borderRadius: 3, fontSize: 12, color: TOKENS.text2 }}>
                    <strong style={{ color: TOKENS.text1, fontWeight: 500 }}>規則 · </strong>{sec.comment}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}

        {/* legend */}
        <div style={{ padding: '14px 20px', background: TOKENS.surface, border: `1px dashed ${TOKENS.border}`, borderRadius: 6, display: 'flex', gap: 16, fontSize: 12, color: TOKENS.text2, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500, color: TOKENS.text1 }}>圖例</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: TOKENS.statusSuccess, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Check" size={10} color="#fff" stroke={2.4} /></span> 完成 · 灰勾</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: TOKENS.primary }} /> 進行中</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: TOKENS.statusDanger, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="Undo2" size={10} color="#fff" stroke={2.4} /></span> 已退回</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${TOKENS.text3}` }} /> 尚未開始</span>
          <span style={{ marginLeft: 'auto', color: TOKENS.text3 }}>連線顏色 = 上一關狀態 · 退回時整段連線轉紅</span>
        </div>
      </div>
    </Screen>
  );
}

// ═════════════════════════════════════════════════════════════════
// §12 · 拍照需求完整表單(Q3 全欄位)
// ═════════════════════════════════════════════════════════════════

function FormGroup2({ title, num, children, sub }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12, padding: '0 0 8px',
        borderBottom: `1px solid ${TOKENS.border}`, marginBottom: 16,
      }}>
        {num && <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text3 }}>0{num}</span>}
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{title}</h3>
        {sub && <span style={{ fontSize: 12, color: TOKENS.text2, marginLeft: 8 }}>{sub}</span>}
      </div>
      {children}
    </section>
  );
}

const SCENE_OPTIONS = ['客房', '套房', '泳池', '健身房', '大廳', 'lobby bar', '咖啡廳', '中餐廳', '西餐廳', '日料', '婚宴會場', '宴會廳', '會議室', '溫泉區', '戶外景觀', '空拍'];
const PHOTO_USAGE = ['官網', 'EDM', '社群 IG', '社群 FB', 'Line OA', '電子看板', '印刷物', 'OOH', '影音素材', '新聞稿'];
const DELIVERY_FMT = ['原檔 RAW', '高解析 JPG', '網路用 JPG', '直立 9:16', '橫式 16:9', '方版 1:1', '影片 MP4', 'PSD 分層'];

function PhotoRequestFormScreen() {
  return (
    <Screen
      active="request"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['需求單', 'REQ-20260517-02', '拍照需求細節']}
      height={1500}
    >
      <PageHeader
        title="拍照需求細節"
        sub="REQ-20260517-02 · 餐飲部夏季新菜單拍攝 · §12 完整欄位"
        actions={
          <>
            <Button>取消</Button>
            <Button>儲存草稿</Button>
            <Button variant="primary" icon="CheckCircle2">儲存並回需求單</Button>
          </>
        }
      />

      {/* helper banner */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px',
        background: TOKENS.primarySoft, border: `1px solid ${TOKENS.primary}33`, borderRadius: 6,
        marginBottom: 16,
      }}>
        <Icon name="Camera" size={16} color={TOKENS.primary} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>拍照需求併入同需求單,不獨立開單</div>
          <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>本表單內容將寫入需求單下的「拍照」執行項目 · §12 八個欄位全部對應到 SPEC</div>
        </div>
      </div>

      <div style={{
        padding: 24, background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderRadius: 6, marginBottom: 16,
      }}>

        <FormGroup2 title="基本資訊" num="1">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px' }}>
            <Field label="拍攝日期" required helper="可選單日或區間">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Input value="2026-06-08" icon="Calendar" mono />
                <span style={{ color: TOKENS.text3 }}>→</span>
                <Input value="2026-06-09" icon="Calendar" mono />
              </div>
            </Field>
            <Field label="主題" required>
              <Input value="夏季新菜單 · 海鮮 / 涼麵 / 創意 cocktail" />
            </Field>
            <Field label="需求單位窗口" required>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, height: 32,
                padding: '0 8px', border: `1px solid ${TOKENS.border}`, borderRadius: 3,
                background: TOKENS.surface,
              }}>
                <Avatar name="verna" size={20} />
                <span style={{ fontSize: 13 }}>verna</span>
                <span style={{ fontSize: 11, color: TOKENS.text3, marginLeft: 4 }}>· 餐飲部</span>
                <span style={{ flex: 1 }} />
                <Icon name="ChevronDown" size={12} color={TOKENS.text2} />
              </div>
            </Field>
          </div>
        </FormGroup2>

        <FormGroup2 title="地點" num="2" sub="可選一館或多館">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
            <Field label="館別" required>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
                minHeight: 32, padding: '4px 8px',
                border: `1px solid ${TOKENS.border}`, borderRadius: 3, background: TOKENS.surface,
              }}>
                <VenueTag code="SH" /><VenueTag code="LM" /><VenueTag code="MU" />
                <span style={{ fontSize: 12, color: TOKENS.text3, paddingLeft: 4 }}>+ 新增</span>
              </div>
            </Field>
            <Field label="實際地點" helper="若多館請列各館對應地點">
              <Input value="SH · 5F 西餐廳 + 8F lobby bar / LM · 3F 中餐廳 / MU · 戶外溫泉區" />
            </Field>
          </div>
        </FormGroup2>

        <FormGroup2 title="場景清單" num="3" sub="多選 + 自訂 · 影響攝影器材與工時估算">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {SCENE_OPTIONS.map((sc) => {
              const on = ['西餐廳', '中餐廳', 'lobby bar', '戶外景觀'].includes(sc);
              return (
                <span key={sc} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  height: 30, padding: '0 12px', borderRadius: 15,
                  background: on ? TOKENS.primarySoft : TOKENS.surface,
                  border: `1px solid ${on ? TOKENS.primary + '55' : TOKENS.border}`,
                  color: on ? TOKENS.primary : TOKENS.text1,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>
                  {on && <Icon name="Check" size={12} stroke={2.4} />}
                  {sc}
                </span>
              );
            })}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              height: 30, padding: '0 12px', borderRadius: 15,
              background: TOKENS.surface, border: `1px dashed ${TOKENS.borderStrong}`,
              fontSize: 13, color: TOKENS.text2, cursor: 'pointer',
            }}><Icon name="Plus" size={12} /> 新增場景</span>
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', background: TOKENS.surface2, borderRadius: 3, fontSize: 12, color: TOKENS.text2 }}>
            已選 4 個場景 · 預估 1.5 天 · 建議攝影師 1 主 + 1 助理 · 燈光需求中等
          </div>
        </FormGroup2>

        <FormGroup2 title="照片用途 & 交付格式" num="4" sub="多選 · 用途決定交付規格與後製範圍">
          <Field label="照片用途" required w="100%">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {PHOTO_USAGE.map((u) => {
                const on = ['官網', 'EDM', '社群 IG', '社群 FB', '電子看板'].includes(u);
                return (
                  <span key={u} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    height: 28, padding: '0 12px', borderRadius: 14,
                    background: on ? TOKENS.primarySoft : TOKENS.surface,
                    border: `1px solid ${on ? TOKENS.primary + '55' : TOKENS.border}`,
                    color: on ? TOKENS.primary : TOKENS.text1, fontSize: 13, fontWeight: 500,
                  }}>
                    {on && <Icon name="Check" size={12} stroke={2.4} />}
                    {u}
                  </span>
                );
              })}
            </div>
          </Field>
          <Field label="交付格式" required helper="影響檔案輸出 + 修圖工作量" w="100%">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
              {DELIVERY_FMT.map((f) => {
                const on = ['原檔 RAW', '高解析 JPG', '網路用 JPG', '直立 9:16', '橫式 16:9'].includes(f);
                return (
                  <span key={f} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    height: 28, padding: '0 12px', borderRadius: 14,
                    background: on ? TOKENS.primarySoft : TOKENS.surface,
                    border: `1px solid ${on ? TOKENS.primary + '55' : TOKENS.border}`,
                    color: on ? TOKENS.primary : TOKENS.text1, fontSize: 13, fontWeight: 500,
                  }}>
                    {on && <Icon name="Check" size={12} stroke={2.4} />}
                    {f}
                  </span>
                );
              })}
            </div>
          </Field>
        </FormGroup2>

        <FormGroup2 title="修圖需求" num="5" sub="影響後製工時 · 與外包供應商比照報價">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
            <Field label="修圖等級" required>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { v: 'basic',    l: '輕度修圖', d: '色彩 / 曝光 / 構圖裁切',                    on: false },
                  { v: 'standard', l: '標準修圖', d: '+ 瑕疵清除、皮膚 / 食物質感優化',           on: true },
                  { v: 'advanced', l: '深度修圖', d: '+ 物件合成、場景替換、海報級重繪',        on: false },
                ].map((r) => (
                  <label key={r.v} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '10px 12px', borderRadius: 3,
                    background: r.on ? TOKENS.primarySoft : TOKENS.surface,
                    border: `1px solid ${r.on ? TOKENS.primary + '55' : TOKENS.border}`,
                    cursor: 'pointer',
                  }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                      background: r.on ? TOKENS.primary : 'transparent',
                      border: `1.5px solid ${r.on ? TOKENS.primary : TOKENS.borderStrong}`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>{r.on && <span style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: r.on ? TOKENS.primary : TOKENS.text1 }}>{r.l}</div>
                      <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>{r.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </Field>
            <Field label="額外處理">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { l: '輸出多版社群裁切(9:16 / 1:1 / 16:9)',         on: true  },
                  { l: '需要 logo / 文字疊加版本',                       on: true  },
                  { l: '提供未浮水印與有浮水印兩種',                     on: false },
                  { l: '需要動態版本(短影片 / 動態 banner)',           on: false },
                  { l: '由攝影師提供拍攝花絮側拍',                       on: true  },
                ].map((c, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, padding: '4px 0', cursor: 'pointer' }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                      background: c.on ? TOKENS.primary : 'transparent',
                      border: `1.5px solid ${c.on ? TOKENS.primary : TOKENS.borderStrong}`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>{c.on && <Icon name="Check" size={10} color="#fff" stroke={3} />}</span>
                    <span>{c.l}</span>
                  </label>
                ))}
              </div>
            </Field>
          </div>
          <Field label="修圖備註" helper="特殊需求請文字描述,例如:菜色擺盤已經 stylist 處理過,僅需色彩;模特兒須磨皮但保留紋理" w="100%">
            <div style={{
              minHeight: 64, padding: '8px 12px',
              border: `1px solid ${TOKENS.border}`, borderRadius: 3, background: TOKENS.surface,
              fontSize: 13, color: TOKENS.text1, lineHeight: 1.6,
            }}>
              本次菜色擺盤已由 stylist 處理過,僅需色彩 + 輕度質感;戶外景觀請避免過度後製,保留自然光感。
              所有照片完成後請統一上傳至 REQ 附件區的 v1 / v2 / final 三個層級。
            </div>
          </Field>
        </FormGroup2>

        <FormGroup2 title="供應商 / 採購" num="6" sub="若為外包拍攝,可從這裡產生關聯採購單">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px' }}>
            <Field label="拍攝來源">
              <Input value="外包(關聯採購單)" type="select" />
            </Field>
            <Field label="預估費用" helper="送出後將產出採購單草稿">
              <Input value="NT$ 95,000" mono />
            </Field>
            <Field label="供應商">
              <Input value="好景影像工作室" />
            </Field>
          </div>
          <div style={{ marginTop: 12, padding: '10px 14px', background: TOKENS.surface2, borderRadius: 3, fontSize: 13, color: TOKENS.text2, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="ShoppingCart" size={14} color={TOKENS.text2} />
            送出後將建立 <span className="tms-mono" style={{ color: TOKENS.primary }}>PO-20260525-NEW</span>,關聯本需求單;預估金額 NT$ 95,000 將需 super_admin 雙簽。
          </div>
        </FormGroup2>
      </div>
    </Screen>
  );
}

Object.assign(window, { DesignFlowScreen, PhotoRequestFormScreen, StepperExpanded, DESIGN_STEPS, SCENE_OPTIONS });
