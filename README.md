# TOEIC通勤学習 PWA

Windowsだけで作って、iPhoneのSafariから使えるTOEIC学習アプリです。

## 現在の仕様

- 文法、単語、イディオム、類義語の4タブ
- 1セッション10問
- 10問内では同じ単語・イディオムを重複出題しない
- カテゴリー内の通し番号を表示
- 単語とイディオムは問題文を単語・イディオムだけにした4択形式
- 単語は1語だけを出題
- 類義語は英語から近い意味の英語を選ぶ形式
- 単語とイディオムは発音ボタンで読み上げ
- 単語・イディオムの解説には例文を3つ表示
- 正解、不正解に応じて色と軽いアニメーションを表示
- 解説は短く、例文と使い方を表示
- 今日解いた問題数を端末内に保存

## データ数

現時点の実データは、単語1500件、イディオム1500件、類義語1500件、文法100問です。

データは `data.js` に分離しています。件数を検証する場合は次を実行します。

```powershell
cd C:\Users\takah\Documents\Codex\toeic-commute-pwa
C:\Users\takah\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tools\validate-toeic-data.js
```

## ローカルで試す

```powershell
cd C:\Users\takah\Documents\Codex\toeic-commute-pwa
C:\Users\takah\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m http.server 8000
```

ブラウザで次を開きます。

```text
http://localhost:8000
```

## GitHub Pagesへ反映

GitHubのリポジトリ画面で、このフォルダ内のファイルをアップロードして `Commit changes` を押すと公開ページに反映されます。

iPhone側で古い画面が出る場合は、Safariで再読み込みするか、数分待ってから開き直してください。
