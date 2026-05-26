// screens-request-list.jsx — Request list with default / empty / loading / readonly states

// Per §10 + §26: list with sort, filter chips, segmented, pagination.

const REQS = [
  { id: 'REQ-20260525-02', title: '喜來登泳池 party 海報',                 venue: ['SH'],         dept: '行銷處', type: 'C 小型任務',  pm: 'sophia', collab: ['tom'],          status: '待處理', progress: 0,  kind: '美工設計', source: '館內設計', created: '2026-05-25' },
  { id: 'REQ-20260525-01', title: '艾美下午茶平面 + 影片素材',              venue: ['LM'],         dept: '行銷處', type: 'D 一般專案',  pm: 'sophia', collab: ['ivens','tom'],   status: '進行中', progress: 35, kind: '美工設計', source: '館內設計', created: '2026-05-25' },
  { id: 'REQ-20260520-01', title: '喜來登 6 月母親節餐券 EDM 設計',         venue: ['SH'],         dept: '行銷處', type: 'A 大專案',    pm: 'sophia', collab: ['tom','ivens'],   status: '待確認', progress: 80, kind: '美工設計', source: '館內設計', created: '2026-05-20' },
  { id: 'REQ-20260520-02', title: '艾美週年慶活動主視覺 KV',                venue: ['LM'],         dept: '行銷處', type: 'A 大專案',    pm: 'ivens',  collab: ['sophia','lina'], status: '進行中', progress: 50, kind: '美工設計', source: '外包設計', created: '2026-05-20' },
  { id: 'REQ-20260518-03', title: '寒沐溫泉季秋冬廣告拍攝',                 venue: ['MU'],         dept: '數位處', type: 'A 大專案',    pm: 'lina',   collab: ['ivens'],         status: '進行中', progress: 25, kind: '拍照需求', source: '外包設計', created: '2026-05-18' },
  { id: 'REQ-20260518-01', title: '集團官網 6 月優惠 banner 更新',           venue: ['GRP'],        dept: '數位處', type: 'B 例行性',    pm: 'sophia', collab: ['tom'],           status: '進行中', progress: 60, kind: '一般需求', source: '館內設計', created: '2026-05-18' },
  { id: 'REQ-20260517-02', title: '餐飲部夏季新菜單拍攝',                   venue: ['SH','LM','MU'],dept:'餐飲部', type: 'D 一般專案',  pm: 'ivens',  collab: ['verna'],         status: '待處理', progress: 5,  kind: '拍照需求', source: '館內設計', created: '2026-05-17' },
  { id: 'REQ-20260516-01', title: '寒居中秋月餅外盒設計',                   venue: ['HB'],         dept: '行銷處', type: 'D 一般專案',  pm: 'lina',   collab: ['tom','sophia'],  status: '進行中', progress: 40, kind: '美工設計', source: '待確認',   created: '2026-05-16' },
  { id: 'REQ-20260515-04', title: '集團異業合作:聯名信用卡優惠',           venue: ['GRP'],        dept: '行銷處', type: 'E 異業合作',  pm: 'tom',    collab: ['sophia'],        status: '待確認', progress: 70, kind: '一般需求', source: '館內設計', created: '2026-05-15' },
  { id: 'REQ-20260515-02', title: '艾美週年慶印刷文宣品(DM × 5)',          venue: ['LM'],         dept: '行銷處', type: 'C 小型任務',  pm: 'ivens',  collab: ['sophia'],        status: '完成',   progress: 100,kind: '美工設計', source: '館內設計', created: '2026-05-15' },
  { id: 'REQ-20260513-01', title: '寒沐電子看板秋季影片素材',               venue: ['MU'],         dept: '數位處', type: 'C 小型任務',  pm: 'lina',   collab: ['ivens'],         status: '取消',   progress: 0,  kind: '美工設計', source: '館內設計', created: '2026-05-13' },
  { id: 'REQ-20260512-03', title: '喜來登 7 月住房優惠 EDM',                venue: ['SH'],         dept: '行銷處', type: 'B 例行性',    pm: 'sophia', collab: [],                status: '進行中', progress: 15, kind: '美工設計', source: '館內設計', created: '2026-05-12' },
];

// Table columns config (mirrors §10 list spec). Widths sum to ~1100 so they
// fit the 1152px main content area without flex-shrinking (which was wrapping
// CJK text inside cells).
const COLS = [
  { key: 'id',       label: '編號',     w: 130, sortable: true },
  { key: 'title',    label: '專案名稱', w: 224, sortable: true },
  { key: 'venue',    label: '館別',     w: 88  },
  { key: 'dept',     label: '開單單位', w: 76  },
  { key: 'type',     label: '專案類型', w: 96  },
  { key: 'pm',       label: 'PM',       w: 88  },
  { key: 'collab',   label: '協作',     w: 84  },
  { key: 'status',   label: '狀態',     w: 88  },
  { key: 'progress', label: '進度',     w: 96  },
  { key: 'created',  label: '開單日',   w: 96, sortable: true },
  { key: '__',       label: '',         w: 36  },
];

function TableHead({ cols }) {
  return (
    <div style={{
      display: 'flex', position: 'sticky', top: 0, zIndex: 2,
      background: TOKENS.surface2, borderBottom: `1px solid ${TOKENS.border}`,
      height: 40, alignItems: 'center', padding: '0 12px',
    }}>
      {cols.map((c) => (
        <div key={c.key} style={{
          width: c.w, flexShrink: 0, paddingRight: 8,
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, fontWeight: 500, color: TOKENS.text2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {c.label}
          {c.sortable && <Icon name={c.key === 'created' ? 'ArrowDown' : 'ArrowUpDown'} size={11} color={c.key === 'created' ? TOKENS.text1 : TOKENS.text3} />}
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, status }) {
  const c = status === '完成' ? TOKENS.statusSuccess : status === '取消' ? TOKENS.statusCancel : status === '待確認' ? TOKENS.statusPending : TOKENS.statusProgress;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height: 4, background: TOKENS.surface2, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: c }} />
      </div>
      <span className="tms-mono" style={{ fontSize: 11, color: TOKENS.text2, width: 32, textAlign: 'right' }}>{value}%</span>
    </div>
  );
}

function CollabAvatars({ list }) {
  if (!list || !list.length) return <span style={{ fontSize: 12, color: TOKENS.text3 }}>—</span>;
  const shown = list.slice(0, 3);
  const extra = list.length - shown.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((n, i) => (
        <div key={n} style={{ marginLeft: i ? -6 : 0, boxShadow: `0 0 0 1.5px ${TOKENS.surface}`, borderRadius: '50%' }}>
          <Avatar name={n} size={22} />
        </div>
      ))}
      {extra > 0 && <span style={{ fontSize: 11, color: TOKENS.text2, marginLeft: 4 }}>+{extra}</span>}
    </div>
  );
}

function TableRow({ r, selected, readonly }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 12px', height: 48,
      borderBottom: `1px solid ${TOKENS.border}`,
      background: selected ? TOKENS.primarySoft : 'transparent',
      position: 'relative',
    }}>
      {selected && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: TOKENS.primary }} />}
      <div style={{ width: 130, flexShrink: 0, paddingRight: 8 }}>
        <a className="tms-mono" style={{ fontSize: 13, color: TOKENS.primary, cursor: 'pointer', whiteSpace: 'nowrap' }}>{r.id}</a>
      </div>
      <div style={{ width: 224, flexShrink: 0, paddingRight: 8, minWidth: 0 }}>
        <a style={{
          fontSize: 14, color: TOKENS.primary, cursor: 'pointer',
          display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{r.title}</a>
        <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.kind} · {r.source}</div>
      </div>
      <div style={{ width: 88, flexShrink: 0, paddingRight: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {r.venue.slice(0, 2).map((v) => <VenueTag key={v} code={v} />)}
        {r.venue.length > 2 && <VenueTag code={`+${r.venue.length - 2}`} />}
      </div>
      <div style={{ width: 76, flexShrink: 0, paddingRight: 8, fontSize: 13, color: TOKENS.text1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.dept}</div>
      <div style={{ width: 96, flexShrink: 0, paddingRight: 8, fontSize: 13, color: TOKENS.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.type}</div>
      <div style={{ width: 88, flexShrink: 0, paddingRight: 8, display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        <Avatar name={r.pm} size={22} />
        <span style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.pm}</span>
      </div>
      <div style={{ width: 84, flexShrink: 0, paddingRight: 8 }}><CollabAvatars list={r.collab} /></div>
      <div style={{ width: 88, flexShrink: 0, paddingRight: 8 }}><StatusBadge status={r.status} /></div>
      <div style={{ width: 96, flexShrink: 0, paddingRight: 12 }}><ProgressBar value={r.progress} status={r.status} /></div>
      <div style={{ width: 96, flexShrink: 0, paddingRight: 8 }}>
        <span className="tms-mono" style={{ fontSize: 12, color: TOKENS.text2, whiteSpace: 'nowrap' }}>{r.created}</span>
      </div>
      <div style={{ width: 36, flexShrink: 0, display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" aria-label="更多操作" disabled={readonly} style={{
          width: 28, height: 28, borderRadius: 3,
          background: 'transparent', border: 'none', cursor: readonly ? 'not-allowed' : 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          opacity: readonly ? 0.4 : 0.7,
        }}>
          <Icon name="MoreHorizontal" size={14} color={TOKENS.text2} />
        </button>
      </div>
    </div>
  );
}

function FilterBar({ scope = '全部資料', readonly, editor }) {
  return (
    <div style={{
      minHeight: 48, display: 'flex', alignItems: 'center', gap: 8, rowGap: 8,
      padding: '8px 16px', flexWrap: 'wrap',
      background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: '6px 6px 0 0',
      borderBottom: 'none',
    }}>
      {!readonly && !editor && <Segmented options={['全部資料', '我的資料']} value={scope} />}
      {editor && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: TOKENS.text2, paddingRight: 8 }}>
          <Icon name="Lock" size={12} color={TOKENS.text2} /> 編輯者僅可看 / 操作自己的資料
        </span>
      )}
      {readonly && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: TOKENS.text2, paddingRight: 8 }}>
          <Icon name="Eye" size={12} color={TOKENS.text2} /> 唯讀模式 · 僅可瀏覽公開內容
        </span>
      )}
      <span style={{ width: 1, height: 20, background: TOKENS.border, margin: '0 4px' }} />
      <Chip count={2} selected>狀態</Chip>
      <Chip count={3} selected>館別</Chip>
      <Chip>處 / 部</Chip>
      <Chip>專案類型</Chip>
      <Chip>PM</Chip>
      <Chip>需求大類</Chip>
      <Chip icon="Calendar">2026/05/01 - 05/31</Chip>
      <span style={{ flex: 1 }} />
      <Button variant="text" size="sm">重設</Button>
      <span style={{ width: 1, height: 20, background: TOKENS.border, margin: '0 4px' }} />
      <Input placeholder="本頁搜尋" icon="Search" style={{ width: 180 }} />
    </div>
  );
}

function Pagination({ total = 28, page = 1, perPage = 25 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '12px 16px',
      background: TOKENS.surface,
      border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderRadius: '0 0 6px 6px',
    }}>
      <span style={{ fontSize: 12, color: TOKENS.text2 }}>共 {total} 筆 · 目前第 {page} 頁</span>
      <span style={{ flex: 1 }} />
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 12, color: TOKENS.text2, marginRight: 8 }}>每頁</span>
        <Input value="25" type="select" w={72} style={{ height: 28 }} />
        <span style={{ width: 1, height: 20, background: TOKENS.border, margin: '0 8px' }} />
        <Button size="sm" variant="ghost" icon="ChevronLeft" disabled>上一頁</Button>
        {[1, 2].map((n) => (
          <span key={n} style={{
            display: 'inline-flex', width: 28, height: 28, borderRadius: 3,
            alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500,
            background: n === page ? TOKENS.primary : 'transparent',
            color: n === page ? '#fff' : TOKENS.text1,
            border: n === page ? 'none' : `1px solid ${TOKENS.border}`,
            cursor: 'pointer',
          }}>{n}</span>
        ))}
        <Button size="sm" variant="ghost" iconRight="ChevronRight">下一頁</Button>
      </div>
    </div>
  );
}

function RequestListScreen({ variant = 'default' }) {
  // variant: default | empty | loading | readonly | editor

  const userMap = {
    default:  { name: 'sophia', role: 'admin',  dept: '行銷處' },
    readonly: { name: 'verna',  role: 'viewer', dept: '餐飲部' },
    editor:   { name: 'ryan',   role: 'editor', dept: '行銷處' },
  };
  const user = userMap[variant] || userMap.default;
  const role = user.role;

  const labelMap = {
    default: 'DEFAULT',
    empty: 'EMPTY',
    loading: 'LOADING',
    readonly: 'READONLY · viewer 視角',
    editor: 'EDITOR 視角 · 強制「我的資料」',
  };

  // editor sees only requests where they're pm / collab / 開單人
  const editorRows = REQS.filter((r) => r.pm === 'ryan' || r.collab.includes('ryan') || r.dept === '行銷處').slice(0, 5)
    .map((r, i) => ({ ...r, pm: i < 2 ? 'ryan' : r.pm, collab: i < 2 ? r.collab : ['ryan', ...r.collab].slice(0, 3) }));

  return (
    <Screen active="request" role={role} user={user} crumbs={['需求單', '列表']}>
      <PageHeader
        title="需求單"
        sub={
          variant === 'editor'
            ? `${labelMap[variant]} · 共 ${editorRows.length} 筆 · 你只能看 / 編輯 PM、協作或開單人為自己的需求單(§5)`
            : `${labelMap[variant]} · ${variant === 'readonly' ? '依公開設定顯示' : '依目前篩選顯示 28 筆 · 排序:更新時間 ↓'}`
        }
        actions={
          <>
            {variant !== 'readonly' && variant !== 'editor' && <Button icon="Download">匯出</Button>}
            {variant === 'editor' && <Button icon="Download">匯出</Button>}
            <Button variant="primary" icon="Plus" disabled={variant === 'readonly'}>新增需求單</Button>
          </>
        }
      />

      <FilterBar
        scope={variant === 'readonly' ? null : variant === 'editor' ? '我的資料' : '全部資料'}
        readonly={variant === 'readonly'}
        editor={variant === 'editor'}
      />

      <div style={{
        background: TOKENS.surface,
        border: `1px solid ${TOKENS.border}`, borderTop: 'none', borderBottom: 'none',
      }}>
        <TableHead cols={COLS} />

        {variant === 'default' && REQS.map((r, i) => (
          <TableRow key={r.id} r={r} selected={i === 2} />
        ))}

        {variant === 'editor' && editorRows.map((r, i) => (
          <TableRow key={r.id} r={r} selected={i === 0} />
        ))}

        {variant === 'readonly' && REQS.slice(0, 4).map((r) => (
          <TableRow key={r.id} r={{ ...r, collab: [] }} readonly />
        ))}

        {variant === 'loading' && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', height: 48, padding: '0 12px', borderBottom: `1px solid ${TOKENS.border}`, gap: 12 }}>
            <div className="tms-skel" style={{ width: 112, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 200, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 70, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 58, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 80, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 22, flexShrink: 0, height: 22, borderRadius: '50%' }} />
            <div className="tms-skel" style={{ width: 58, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 70, flexShrink: 0, height: 20, borderRadius: 3 }} />
            <div className="tms-skel" style={{ width: 78, flexShrink: 0, height: 14 }} />
            <div className="tms-skel" style={{ width: 78, flexShrink: 0, height: 14 }} />
          </div>
        ))}

        {variant === 'empty' && (
          <div style={{
            height: 360, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            background: TOKENS.surface,
          }}>
            <Icon name="Inbox" size={48} color={TOKENS.text3} stroke={1.2} />
            <div style={{ fontSize: 14, color: TOKENS.text2 }}>目前沒有符合篩選條件的需求單</div>
            <div style={{ fontSize: 12, color: TOKENS.text3 }}>嘗試清除部分篩選,或新建一張需求單開始</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Button>清除篩選</Button>
              <Button variant="primary" icon="Plus">新增需求單</Button>
            </div>
          </div>
        )}
      </div>

      <Pagination
        total={variant === 'empty' ? 0 : variant === 'readonly' ? 4 : variant === 'editor' ? editorRows.length : 28}
        page={1}
      />

      {/* live-demo bottom slide-up notice (only on default) */}
      {variant === 'default' && (
        <div style={{
          position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}>
          <MailToast />
        </div>
      )}
    </Screen>
  );
}

Object.assign(window, { RequestListScreen, REQS, ProgressBar, CollabAvatars, Pagination, FilterBar });
