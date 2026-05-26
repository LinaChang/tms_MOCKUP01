# 🚀 行銷處作業系統 (mkt-tms) - 互動式設計原型

這是從 **Claude Design** 擷取下來的完整互動式設計原型網頁資源。所有相關資源（包含 React 元件、設計 Tokens、排版樣式及狀態資料）已完整下載並整理在此資料夾中。

您可以直接在本機端啟動此網頁，或是將其上傳到 GitHub 並透過 **GitHub Pages** 免費發佈！

---

## 📂 資料夾結構說明

* `index.html` / `mkt-tms-P0.html` - 原型網頁的主入口 HTML 檔案。
* `design-canvas.jsx` - 負責渲染多面板的設計畫布元件。
* `tokens.jsx` - 定義了設計系統中的色彩、間距、字體等 Token。
* `shell.jsx` - 應用程式的外殼 (App Shell)。
* `screens-*.jsx` - 各個特定功能畫面的 React/JSX 程式碼（如 Dashboard、Gantt、列表、表單等）。
* `DESIGN-README.md` - 設計系統的詳細交付說明文件。
* `chats/` - 包含原始設計對話紀錄。
* `uploads/` - 包含相關設計規格文件。

---

## 💻 如何在本機端運行

由於此原型使用 `Babel Standalone` 在瀏覽器中動態編譯 JSX 檔案，直接雙擊 `index.html` 開啟會因為瀏覽器的安全限制（CORS 跨網域原則）而無法載入外部的 `.jsx` 檔案。

**請使用以下任一簡單方式在本機啟動網頁伺服器：**

### 1. 使用 Node.js (推薦)
在終端機中切換到此資料夾，並執行：
```bash
npx serve
```
或者，如果您有安裝 global 伺服器工具：
```bash
npx http-server .
```
接著在瀏覽器中打開終端機顯示的網址（通常是 `http://localhost:3000` 或 `http://localhost:8080`）即可。

### 2. 使用 Python
如果您電腦有安裝 Python，執行：
```bash
python3 -m http.server 8000
```
並在瀏覽器中打開 `http://localhost:8000`。

### 3. 使用 VS Code 套件
如果您使用 VS Code，安裝 **Live Server** 擴充套件，然後在 VS Code 中右鍵點擊 `index.html` 並選擇 **"Open with Live Server"** 即可。

---

## 🌐 如何上傳並發佈到 GitHub Pages

為了讓其他人也能線上瀏覽這個設計原型，您可以將這個資料夾發佈到 GitHub Pages：

### 第一步：建立 GitHub 儲存庫 (Repository)
1. 登入您的 GitHub 帳號。
2. 點擊右上角 `+` -> **New repository**。
3. 將儲存庫命名為 `mkt-tms-design`（或您喜歡的名字），並保持為 **Public**。
4. **不要**勾選 "Add a README file"，直接點擊 **Create repository**。

### 第二步：初始化 Git 並推送到 GitHub
打開終端機，執行以下指令（請將 `<YOUR_USERNAME>` 替換為您的 GitHub 帳號）：
```bash
# 初始化 Git
git init

# 將所有檔案加入暫存區並提交
git add .
git commit -m "Initialize mkt-tms design mockups"

# 分支命名為 main
git branch -M main

# 關聯遠端儲存庫
git remote add origin https://github.com/<YOUR_USERNAME>/mkt-tms-design.git

# 推送到 GitHub
git push -u origin main
```

### 第三步：啟用 GitHub Pages
1. 在 GitHub 網頁上進入您的儲存庫，點擊右上角的 **Settings**。
2. 在左側選單中找到 **Pages**。
3. 在 **Build and deployment** 下的 **Branch** 選擇 `main` 分支與 `/ (root)` 資料夾。
4. 點擊 **Save**。

大約等待 1-2 分鐘，GitHub 就會為您產生一個公開的網址（網址格式通常為 `https://<YOUR_USERNAME>.github.io/mkt-tms-design/`），您就可以將此連結分享給其他人或團隊成員線上查看囉！ 🎉
