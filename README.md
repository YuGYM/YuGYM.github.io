# YuGYM Portfolio

可直接部署至 GitHub Pages 的純 HTML、CSS、JavaScript 作品集網站，不需要安裝套件或執行建置。

## 上傳前請先修改


3. 在 `js/main.js` 的 `projects` 陣列中替換 9 個示範專案；每筆資料會自動產生縮略卡與完整案例視窗。
4. 若 GitHub 帳號不是 `YuGYM`，請修改頁尾 GitHub 連結。

## 檔案結構

```text
YuGYM.github.io/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   └── images/        # 之後放專案縮略圖與案例圖片
├── css/
│   └── style.css
└── js/
    └── main.js
```

## 本機預覽

直接雙擊 `index.html` 即可，或使用任一靜態網站伺服器開啟此資料夾。

## GitHub Pages

將本資料夾內所有檔案上傳至 `YuGYM.github.io` repository 的 `main` branch。若 repository 名稱與 GitHub 帳號一致，GitHub Pages 通常會以 `https://你的帳號.github.io/` 提供網站。

## 設計與無障礙

- 字體順序：Poppins、Noto Sans TC、sans-serif
- Icon：Phosphor Icons Regular（CDN）
- 支援鍵盤 Focus、語意化標籤與 Skip Link
- 支援 `prefers-reduced-motion`，使用者開啟「減少動態效果」時會停用大部分動畫
- 響應式斷點涵蓋桌面、平板與手機
