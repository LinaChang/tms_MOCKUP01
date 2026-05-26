// screens-request-form.jsx — Request create/edit page (1440 × 1200)

function FormGroup({ title, num, children, sub }) {
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

function FormRow({ children, cols = 2 }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 320px)`, gap: '12px 24px',
      marginBottom: 16,
    }}>{children}</div>
  );
}

function PersonChip({ name, role, candidate, removable }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 28,
      padding: '0 10px 0 4px', borderRadius: 14,
      background: TOKENS.surface,
      border: candidate ? `1px dashed ${TOKENS.border}` : `1px solid ${TOKENS.border}`,
      fontSize: 13,
    }}>
      <Avatar name={name} size={20} />
      <span>{name}</span>
      {candidate && <span style={{ fontSize: 11, color: TOKENS.text3 }}>(候補)</span>}
      {removable && <Icon name="X" size={12} color={TOKENS.text3} style={{ cursor: 'pointer', marginLeft: 2 }} />}
    </span>
  );
}

function RequestFormScreen() {
  return (
    <Screen
      active="request"
      role="admin"
      user={{ name: 'sophia', role: 'admin', dept: '行銷處' }}
      crumbs={['需求單', '新增需求單']}
      height={1180}
    >
      <PageHeader
        title="新增需求單"
        sub="REQ-20260525-04 · 開單人 sophia · 開單日 2026-05-25"
        actions={
          <>
            <Button>取消</Button>
            <Button>儲存草稿</Button>
            <Button variant="primary" icon="CheckCircle2">建立並送出初審</Button>
          </>
        }
      />

      {/* Top-of-form error summary (illustrating §27 validation) */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px',
        background: TOKENS.statusDanger + '0d', border: `1px solid ${TOKENS.statusDanger}55`, borderRadius: 6,
        marginBottom: 16,
      }}>
        <Icon name="AlertCircle" size={16} color={TOKENS.statusDanger} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: TOKENS.statusDanger }}>有 2 個必填欄位尚未填寫</div>
          <div style={{ fontSize: 12, color: TOKENS.text2, marginTop: 2 }}>
            <a style={{ color: TOKENS.primary, cursor: 'pointer' }}>專案類型</a>
            <span>、</span>
            <a style={{ color: TOKENS.primary, cursor: 'pointer' }}>負責 PM</a>
            <span> · 點擊跳至欄位</span>
          </div>
        </div>
        <Icon name="X" size={14} color={TOKENS.text3} style={{ cursor: 'pointer', marginTop: 2 }} />
      </div>

      <div style={{
        padding: 24, background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderRadius: 6, marginBottom: 16,
      }}>

        {/* 01 基本資料 */}
        <FormGroup title="基本資料" num="1">
          <FormRow>
            <Field label="需求單編號" helper="儲存後自動生成,可改前綴">
              <Input value="REQ-20260525-04" disabled mono />
            </Field>
            <Field label="專案名稱" required>
              <Input value="喜來登 6 月母親節餐券 EDM 設計 v2" />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="館別" required helper="可複選,集團案請選 GRP">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
                minHeight: 32, padding: '4px 8px',
                border: `1px solid ${TOKENS.border}`, borderRadius: 3, background: TOKENS.surface,
              }}>
                <VenueTag code="SH" />
                <VenueTag code="LM" />
                <span style={{ fontSize: 12, color: TOKENS.text3, paddingLeft: 4 }}>+ 新增</span>
              </div>
            </Field>
            <Field label="開單單位" required>
              <Input value="行銷處" type="select" />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="期程" required>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Input value="2026-05-25" icon="Calendar" mono />
                <span style={{ color: TOKENS.text3 }}>→</span>
                <Input value="2026-06-05" icon="Calendar" mono />
              </div>
            </Field>
            <Field label="開單日期">
              <Input value="2026-05-25" icon="Calendar" mono disabled />
            </Field>
          </FormRow>
          <Field label="備註" w="100%" helper="可寫具體要求、字級、配色、競品參考等">
            <div style={{
              minHeight: 96, padding: '8px 12px',
              border: `1px solid ${TOKENS.border}`, borderRadius: 3, background: TOKENS.surface,
              fontSize: 14, lineHeight: 1.6, color: TOKENS.text1,
            }}>
              母親節主視覺保留 5 月份既有色系;餐券面額分 NT$ 1,200 / 2,400 / 3,600 三檔;
              需求單位希望至少 1 版有插畫風格備用提案。
            </div>
          </Field>
        </FormGroup>

        {/* 02 分類與來源 */}
        <FormGroup title="分類與來源" num="2">
          <FormRow cols={4}>
            <Field label="專案類型" required error="必填">
              <Input placeholder="選擇類型" type="select" error />
            </Field>
            <Field label="需求大類" required>
              <Input value="美工設計" type="select" />
            </Field>
            <Field label="美工 / 設計製作分類">
              <Input value="電子製作物" type="select" />
            </Field>
            <Field label="設計來源" required>
              <Input value="館內設計" type="select" />
            </Field>
          </FormRow>
          <Field label="額外項目" w="100%" helper="多選,影響後續執行項目自動帶入">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { l: '製作物輸出', on: true },
                { l: '社群媒體',  on: true },
                { l: 'EDM',       on: true },
                { l: '官網更新',  on: false },
                { l: '電子看板',  on: false },
                { l: '印刷品',    on: false },
              ].map((x) => (
                <span key={x.l} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  height: 28, padding: '0 12px', borderRadius: 14,
                  background: x.on ? TOKENS.primarySoft : TOKENS.surface,
                  border: `1px solid ${x.on ? TOKENS.primary + '55' : TOKENS.border}`,
                  color: x.on ? TOKENS.primary : TOKENS.text1,
                  fontSize: 13, fontWeight: 500,
                }}>
                  {x.on && <Icon name="Check" size={12} stroke={2.4} />}
                  {x.l}
                </span>
              ))}
            </div>
          </Field>
        </FormGroup>

        {/* 03 人員指派 */}
        <FormGroup title="人員指派" num="3" sub="PM 必填,協作可多選,候補占位以虛線標示">
          <FormRow>
            <Field label="負責 PM" required error="請指派 PM">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, height: 32,
                padding: '0 8px', border: `1px solid ${TOKENS.statusDanger}`, borderRadius: 3,
                background: TOKENS.surface,
              }}>
                <Icon name="User" size={14} color={TOKENS.text3} />
                <span style={{ flex: 1, fontSize: 14, color: TOKENS.text3 }}>選擇 PM…</span>
                <Icon name="ChevronDown" size={14} color={TOKENS.text2} />
              </div>
            </Field>
            <Field label="開單人">
              <PersonChip name="sophia" />
            </Field>
          </FormRow>
          <Field label="協作人員" helper="可多選 · PM + 協作都計入工作負載" w="100%">
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
              minHeight: 40, padding: 6, border: `1px solid ${TOKENS.border}`, borderRadius: 3,
              background: TOKENS.surface,
            }}>
              <PersonChip name="tom"   removable />
              <PersonChip name="ivens" removable />
              <PersonChip name="(行銷處候補 1)" candidate removable />
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 13, color: TOKENS.text2, padding: '0 8px', cursor: 'pointer',
              }}>
                <Icon name="Plus" size={12} /> 新增協作
              </span>
            </div>
          </Field>
        </FormGroup>

        {/* 04 執行項目 */}
        <FormGroup title="執行項目" num="4" sub="可預先建立,送出後依流程進度開啟">
          <div style={{ border: `1px solid ${TOKENS.border}`, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: 36, alignItems: 'center', padding: '0 12px', background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`, fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>
              <span style={{ width: 240 }}>任務名稱</span>
              <span style={{ width: 140 }}>類別</span>
              <span style={{ width: 120 }}>負責人</span>
              <span style={{ width: 112 }}>截止日</span>
              <span style={{ width: 96 }}>狀態</span>
              <span style={{ flex: 1, textAlign: 'right' }}>操作</span>
            </div>
            {[
              { name: '初稿提案(雙語雙版)', kind: '設計製作', owner: 'sophia', due: '2026-05-28', status: '未開始' },
              { name: '主管初審',           kind: '主管確認', owner: 'tom',    due: '2026-05-30', status: '未開始' },
              { name: '需求單位確認',       kind: '相關單位', owner: 'verna',  due: '2026-06-02', status: '未開始' },
              { name: '完稿輸出 + EDM 排程', kind: '設計製作', owner: 'sophia', due: '2026-06-05', status: '未開始' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 12px', borderBottom: `1px solid ${TOKENS.border}` }}>
                <span style={{ width: 240, fontSize: 13 }}>{t.name}</span>
                <span style={{ width: 140 }}><Chip>{t.kind}</Chip></span>
                <span style={{ width: 120 }}><PersonChip name={t.owner} /></span>
                <span style={{ width: 112 }} className="tms-mono"><span style={{ fontSize: 12 }}>{t.due}</span></span>
                <span style={{ width: 96 }}><StatusBadge status={t.status} /></span>
                <span style={{ flex: 1, textAlign: 'right', color: TOKENS.text3 }}>
                  <Icon name="Pencil" size={12} style={{ marginRight: 12, cursor: 'pointer' }} />
                  <Icon name="Trash2" size={12} style={{ cursor: 'pointer' }} />
                </span>
              </div>
            ))}
            <div style={{ padding: '8px 12px', background: TOKENS.surface }}>
              <Button size="sm" variant="text" icon="Plus">新增任務</Button>
            </div>
          </div>
        </FormGroup>

        {/* 05 附件 */}
        <FormGroup title="附件" num="5" sub="單檔 25MB · Office / 圖片 / 文字 / 25MB 內影音">
          <div style={{
            height: 96, border: `1px dashed ${TOKENS.borderStrong}`, borderRadius: 3,
            background: TOKENS.surface2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
            marginBottom: 12,
          }}>
            <Icon name="Upload" size={24} color={TOKENS.text2} stroke={1.4} />
            <div style={{ fontSize: 14 }}>拖放檔案到此處,或<a style={{ color: TOKENS.primary, cursor: 'pointer' }}> 點擊選擇</a></div>
            <div style={{ fontSize: 12, color: TOKENS.text3 }}>單檔 25 MB 以內 · 同時最多 5 個檔案</div>
          </div>

          {/* a row in-progress + completed + failed for state demo */}
          <div style={{ border: `1px solid ${TOKENS.border}`, borderRadius: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <Icon name="FileText" size={14} color={TOKENS.text2} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span>需求單位提供:logo + 字型 pack.zip</span>
                  <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2 }}>3.2 / 5.6 MB</span>
                </div>
                <div style={{ height: 4, background: TOKENS.surface2, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: '57%', height: '100%', background: TOKENS.primary }} />
                </div>
              </div>
              <Icon name="X" size={14} color={TOKENS.text3} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: `1px solid ${TOKENS.border}` }}>
              <Icon name="FileText" size={14} color={TOKENS.text2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>brief.docx</div>
                <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2 }}>102 KB · sophia · 剛剛</div>
              </div>
              <Icon name="CheckCircle2" size={14} color={TOKENS.statusSuccess} />
              <Icon name="Download" size={14} color={TOKENS.text2} style={{ marginLeft: 6 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
              <Icon name="FileText" size={14} color={TOKENS.statusDanger} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>母親節參考影片_v0.mov</div>
                <div style={{ fontSize: 11, color: TOKENS.statusDanger, marginTop: 2 }}>檔案超過 25 MB(實際 32.4 MB)</div>
              </div>
              <Button size="sm" variant="text">重試</Button>
              <Icon name="X" size={14} color={TOKENS.text3} />
            </div>
          </div>
        </FormGroup>

        {/* 06 版本紀錄 */}
        <FormGroup title="退回 / 版本紀錄" num="6" sub="退回不重開單,沿用本單號;系統自動寫入下表">
          <div style={{
            padding: '24px', background: TOKENS.surface2, borderRadius: 3,
            textAlign: 'center', color: TOKENS.text3, fontSize: 13,
          }}>
            尚無退回紀錄 · 此區於首次退回或上稿後自動填入
          </div>
        </FormGroup>

      </div>

      {/* Sticky submit bar */}
      <div style={{
        position: 'sticky', bottom: 0, marginTop: 16, marginLeft: -24, marginRight: -24,
        height: 64, padding: '0 24px',
        background: TOKENS.surface, borderTop: `1px solid ${TOKENS.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Button danger icon="Trash2">捨棄草稿</Button>
        <span style={{ fontSize: 12, color: TOKENS.text3, marginLeft: 12 }}>最後儲存 · 2 分鐘前</span>
        <span style={{ flex: 1 }} />
        <Button>取消</Button>
        <Button>儲存草稿</Button>
        <Button variant="primary" size="lg" icon="CheckCircle2">建立並送出初審</Button>
      </div>
    </Screen>
  );
}

Object.assign(window, { RequestFormScreen });
