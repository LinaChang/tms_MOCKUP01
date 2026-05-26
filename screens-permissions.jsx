// screens-permissions.jsx — Feature and Permission Matrix Screen

const MODULES_PERMISSIONS = [
  {
    module: '儀表板 (Dashboard)',
    features: [
      { id: 'db_view_stats', n: '檢視統計數據與圖表', desc: '包含待處理件數、工作負載、最近異動等', super_admin: 'allow', admin: 'allow', editor: 'own_only', viewer: 'allow' },
      { id: 'db_view_workload', n: '檢視所有人員工作負載', desc: '檢視全體同仁的工作分配與瓶頸統計', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'allow' }
    ]
  },
  {
    module: '需求單 (Request)',
    features: [
      { id: 'req_view', n: '檢視需求單列表與詳情', desc: '查看行銷需求單內容、進度與討論串', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'allow' },
      { id: 'req_create', n: '新增/起草需求單', desc: '填寫包含館別、主視覺、上線時間等基本資料', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'none' },
      { id: 'req_edit_any', n: '編輯他人建立的需求單', desc: '修改他人起草或進行中的需求欄位', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' },
      { id: 'req_edit_own', n: '編輯自己建立的需求單', desc: '限自己為申請人或主辦人的需求單變更', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'none' },
      { id: 'req_delete', n: '刪除/作廢需求單', desc: '撤銷不需要的需求單', super_admin: 'allow', admin: 'allow', editor: 'own_only', viewer: 'none' }
    ]
  },
  {
    module: '美工/設計流程 (Design 7-stepper)',
    features: [
      { id: 'step_flow', n: '推進審核與設計階段', desc: '控制 7 個 stepper 狀態（起草、初審、設計中、完稿、結案等）', super_admin: 'allow', admin: 'allow', editor: 'own_only', viewer: 'none' },
      { id: 'step_reject', n: '退回/初審不通過', desc: '執行退回流程、輸入退回原因並觸發退回循環', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' }
    ]
  },
  {
    module: '專案進度 (Project)',
    features: [
      { id: 'prj_view', n: '檢視專案詳情與任務群組', desc: '查看專案里程碑、關聯需求單與工作清單', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'allow' },
      { id: 'prj_manage', n: '建立/編輯專案與里程碑', desc: '新增專案、指派專案負責人、設定關鍵節點', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' }
    ]
  },
  {
    module: '工作負載甘特圖 (Gantt)',
    features: [
      { id: 'gantt_view', n: '檢視月/季/年甘特圖', desc: '查看跨專案、跨人員時間軸相依性圖表', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'allow' },
      { id: 'gantt_drag', n: '拖曳調整時程 (Gantt Drag)', desc: '直接在甘特圖上調整任務開始與結束時間', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' }
    ]
  },
  {
    module: '公告與會議 (Announcements & Meetings)',
    features: [
      { id: 'ann_view', n: '檢視公告與會議紀錄', desc: '查看公告詳情與會議討論 Timeline 紀錄', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'allow' },
      { id: 'ann_publish', n: '發佈公告/新增會議資訊', desc: '建立新公告、發起會議並登載會議議程', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'none' }
    ]
  },
  {
    module: '檔案與資源 (Files & Resources)',
    features: [
      { id: 'file_view', n: '瀏覽與下載附件資料庫', desc: '查看所有專案上傳的檔案與資源連結預覽', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'allow' },
      { id: 'file_upload', n: '上傳檔案與附件', desc: '拖放上傳 25MB 以內設計稿、報價單或簡報', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'none' },
      { id: 'file_delete', n: '刪除/封存檔案與資源', desc: '刪除過期附件或封存資源連結', super_admin: 'allow', admin: 'allow', editor: 'own_only', viewer: 'none' }
    ]
  },
  {
    module: '採購單 (Purchase Order)',
    features: [
      { id: 'po_view', n: '檢視採購單列表與金額對照', desc: '查看各品項採購狀態與預估金額累計', super_admin: 'allow', admin: 'allow', editor: 'own_only', viewer: 'none' },
      { id: 'po_apply', n: '申請採購單/填寫品項', desc: '送出新的採購申請單並上傳報價單附件', super_admin: 'allow', admin: 'allow', editor: 'allow', viewer: 'none' },
      { id: 'po_approve_normal', n: '一般金額簽核 (<= NT$ 100,000)', desc: '針對十萬以下之採購案進行單簽核准', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' },
      { id: 'po_approve_double', n: '高額雙簽審核 (> NT$ 100,000)', desc: '十萬以上採購，需觸發最高管理者雙簽確認', super_admin: 'allow', admin: 'none', editor: 'none', viewer: 'none' }
    ]
  },
  {
    module: '帳號與權限 (Accounts & Permissions)',
    features: [
      { id: 'acc_view', n: '檢視使用者列表與權限', desc: '查看帳號狀態、角色分配與最近活動時間', super_admin: 'allow', admin: 'allow', editor: 'none', viewer: 'none' },
      { id: 'acc_invite', n: '新增/邀請/停用使用者', desc: '建立新成員、重寄邀請信或停用離職成員帳號', super_admin: 'allow', admin: 'none', editor: 'none', viewer: 'none' },
      { id: 'acc_role_assign', n: '指派/變更系統角色', desc: '為候補人員指派正式角色，或調整現有權限', super_admin: 'allow', admin: 'none', editor: 'none', viewer: 'none' }
    ]
  }
];

function PermissionMatrixScreen() {
  const [activeTab, setActiveTab] = React.useState('all'); // all, super_admin, admin, editor, viewer
  const [editMode, setEditMode] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // Local state for modified permissions to simulate real back-office editing
  const [permissions, setPermissions] = React.useState(MODULES_PERMISSIONS);

  const showToast = (title, sub) => {
    setToast({ title, sub });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCellClick = (moduleIndex, featureIndex, role) => {
    if (!editMode) return;
    
    // Rotate status: allow -> own_only -> none -> allow
    const nextStatus = {
      allow: 'own_only',
      own_only: 'none',
      none: 'allow'
    };

    const newPerms = [...permissions];
    const currentVal = newPerms[moduleIndex].features[featureIndex][role];
    newPerms[moduleIndex].features[featureIndex][role] = nextStatus[currentVal];
    setPermissions(newPerms);
  };

  const handleSave = () => {
    setEditMode(false);
    showToast('權限變更成功', '系統已即時套用最新權限對照矩陣，異動已記錄於稽核日誌。');
  };

  const handleReset = () => {
    // Reset to initial spec
    setPermissions(JSON.parse(JSON.stringify(MODULES_PERMISSIONS)));
    setEditMode(false);
    showToast('重設完成', '已恢復為系統 v1 預設權限配置。');
  };

  const getCellLabel = (status) => {
    switch (status) {
      case 'allow':
        return { l: '允許編輯', bg: '#4f7a3a1a', fg: '#4f7a3a', icon: 'CheckCircle2' };
      case 'own_only':
        return { l: '限個人/報表', bg: '#244c5a1a', fg: '#244c5a', icon: 'Eye' };
      case 'none':
      default:
        return { l: '禁止/無權限', bg: '#9c9a921a', fg: '#9c9a92', icon: 'Lock' };
    }
  };

  const renderCell = (status, moduleIndex, featureIndex, role) => {
    const c = getCellLabel(status);
    const isInteractive = editMode;

    return (
      <td
        key={role}
        onClick={() => handleCellClick(moduleIndex, featureIndex, role)}
        style={{
          padding: '10px 12px',
          borderBottom: `1px solid ${TOKENS.border}`,
          textAlign: 'center',
          width: 140,
          background: isInteractive ? `${c.bg}44` : 'transparent',
          cursor: isInteractive ? 'pointer' : 'default',
          transition: 'all 0.15s ease',
        }}
        className={isInteractive ? 'tms-cell-hover' : ''}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          borderRadius: 4,
          background: c.bg,
          color: c.fg,
          fontSize: 11,
          fontWeight: 500,
          border: isInteractive ? `1px dashed ${c.fg}66` : '1px solid transparent'
        }}>
          <Icon name={c.icon} size={11} color={c.fg} />
          <span>{c.l}</span>
        </div>
      </td>
    );
  };

  return (
    <Screen
      active="accounts"
      role="super_admin"
      user={{ name: 'tom', role: 'super_admin', dept: '行銷處' }}
      crumbs={['帳號與權限', '功能權限對照表']}
      height={1100}
    >
      {/* Dynamic Toast popup */}
      {toast && (
        <SuccessToast
          title={toast.title}
          sub={toast.sub}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'tms-pulse 2s infinite'
          }}
        />
      )}

      {/* Inject custom CSS helper for table hover effects in edit mode */}
      <style dangerouslySetInnerHTML={{__html: `
        .tms-cell-hover:hover {
          background: rgba(0, 0, 0, 0.02) !important;
          transform: scale(1.02);
        }
        .tms-cell-hover:active {
          transform: scale(0.98);
        }
      `}} />

      <PageHeader
        title="功能模組權限對照表"
        sub="設定系統內四大角色（最高管理者、管理者、編輯者、瀏覽者）對所有模組的操作與報表檢視權限"
        actions={
          <>
            {editMode ? (
              <>
                <Button variant="ghost" onClick={handleReset}>重設預設值</Button>
                <Button variant="primary" icon="Check" onClick={handleSave}>儲存權限設定</Button>
              </>
            ) : (
              <Button variant="primary" icon="Pencil" onClick={() => setEditMode(true)}>切換至編輯模式</Button>
            )}
          </>
        }
      />

      {/* Dashboard Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { l: '功能模組數', v: permissions.length, s: '涵蓋系統所有核心頁面', tone: TOKENS.primary },
          { l: '細部權限條目', v: permissions.reduce((acc, curr) => acc + curr.features.length, 0), s: '支援細粒度功能控管', tone: TOKENS.statusProgress },
          { l: '現行系統角色', v: 4, s: '最高管理者 / 管理者 / 編輯 / 瀏覽', tone: TOKENS.statusSuccess },
          { l: '當前模式', v: editMode ? '編輯模式' : '檢視模式', s: editMode ? '點擊儲存以套用最新權限' : '點擊上方按鈕進入權限編輯', tone: editMode ? TOKENS.statusPending : TOKENS.text2 },
        ].map((s) => (
          <div key={s.l} style={{ padding: '14px 20px', background: TOKENS.surface, border: `1px solid ${TOKENS.border}`, borderRadius: 6 }}>
            <div style={{ fontSize: 12, color: TOKENS.text2 }}>{s.l}</div>
            <div className="tms-mono" style={{ fontSize: 26, fontWeight: 700, color: s.tone, marginTop: 4, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: TOKENS.text3, marginTop: 6 }}>{s.s}</div>
          </div>
        ))}
      </div>

      <div style={{
        height: 48, display: 'flex', alignItems: 'center', gap: 12,
        padding: '0 16px',
        background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
        borderRadius: '6px 6px 0 0', borderBottom: 'none',
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: TOKENS.text2 }}>檢視角色：</span>
        <div style={{
          display: 'inline-flex', height: 28, padding: 2, borderRadius: 14, flexShrink: 0,
          background: TOKENS.surface2, border: `1px solid ${TOKENS.border}`,
        }}>
          {[
            { id: 'all', l: '全部' },
            { id: 'super_admin', l: '最高管理者' },
            { id: 'admin', l: '管理者' },
            { id: 'editor', l: '編輯者' },
            { id: 'viewer', l: '瀏覽者' }
          ].map((tab) => (
            <span 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '0 12px', borderRadius: 12,
                background: activeTab === tab.id ? TOKENS.surface : 'transparent',
                color: activeTab === tab.id ? TOKENS.text1 : TOKENS.text2,
                fontSize: 13, fontWeight: 500,
                boxShadow: activeTab === tab.id ? `inset 0 0 0 1px ${TOKENS.border}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.12s'
              }}
            >
              {tab.l}
            </span>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        {editMode && (
          <span style={{ fontSize: 12, color: TOKENS.statusPending, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="AlertCircle" size={12} /> 編輯模式下，點擊各個單元格即可變更權限狀態（允許 -> 僅看自己 -> 禁止）
          </span>
        )}
      </div>

      {/* Permission Matrix Table */}
      <div style={{ 
        background: TOKENS.surface, 
        border: `1px solid ${TOKENS.border}`, 
        borderRadius: '0 0 6px 6px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: TOKENS.surface2, height: 40, borderBottom: `1px solid ${TOKENS.border}` }}>
              <th style={{ textAlign: 'left', padding: '0 16px', fontWeight: 600, color: TOKENS.text1, width: 220 }}>功能模組</th>
              <th style={{ textAlign: 'left', padding: '0 16px', fontWeight: 600, color: TOKENS.text1 }}>功能項目與細部說明</th>
              {activeTab === 'all' && (
                <>
                  <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}>
                    <RoleBadge role="super_admin" compact />
                  </th>
                  <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}>
                    <RoleBadge role="admin" compact />
                  </th>
                  <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}>
                    <RoleBadge role="editor" compact />
                  </th>
                  <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}>
                    <RoleBadge role="viewer" compact />
                  </th>
                </>
              )}
              {activeTab === 'super_admin' && <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}><RoleBadge role="super_admin" /></th>}
              {activeTab === 'admin' && <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}><RoleBadge role="admin" /></th>}
              {activeTab === 'editor' && <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}><RoleBadge role="editor" /></th>}
              {activeTab === 'viewer' && <th style={{ padding: '0 12px', fontWeight: 500, color: TOKENS.text2, width: 140, textAlign: 'center' }}><RoleBadge role="viewer" /></th>}
            </tr>
          </thead>
          <tbody>
            {permissions.map((mod, moduleIndex) => (
              <React.Fragment key={mod.module}>
                {/* Module Category Row */}
                <tr style={{ background: `${TOKENS.primaryTint}`, height: 36, borderBottom: `1px solid ${TOKENS.border}` }}>
                  <td colSpan={activeTab === 'all' ? 6 : 3} style={{ padding: '0 16px', fontWeight: 600, color: TOKENS.primary, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="FolderOpen" size={13} color={TOKENS.primary} />
                      {mod.module}
                    </div>
                  </td>
                </tr>

                {/* Individual Feature Rows */}
                {mod.features.map((feat, featureIndex) => (
                  <tr key={feat.id} style={{ borderBottom: `1px solid ${TOKENS.border}`, height: 56 }}>
                    <td style={{ padding: '0 16px 0 32px', fontSize: 12, color: TOKENS.text3 }} className="tms-mono">
                      {feat.id.toUpperCase()}
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: TOKENS.text1 }}>{feat.n}</div>
                      <div style={{ fontSize: 11, color: TOKENS.text2, marginTop: 2 }}>{feat.desc}</div>
                    </td>
                    {activeTab === 'all' && (
                      <>
                        {renderCell(feat.super_admin, moduleIndex, featureIndex, 'super_admin')}
                        {renderCell(feat.admin, moduleIndex, featureIndex, 'admin')}
                        {renderCell(feat.editor, moduleIndex, featureIndex, 'editor')}
                        {renderCell(feat.viewer, moduleIndex, featureIndex, 'viewer')}
                      </>
                    )}
                    {activeTab === 'super_admin' && renderCell(feat.super_admin, moduleIndex, featureIndex, 'super_admin')}
                    {activeTab === 'admin' && renderCell(feat.admin, moduleIndex, featureIndex, 'admin')}
                    {activeTab === 'editor' && renderCell(feat.editor, moduleIndex, featureIndex, 'editor')}
                    {activeTab === 'viewer' && renderCell(feat.viewer, moduleIndex, featureIndex, 'viewer')}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Screen>
  );
}

Object.assign(window, { PermissionMatrixScreen });
