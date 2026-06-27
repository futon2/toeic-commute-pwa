# TOEIC通勤学習 PWA

Windowsだけで作って、iPhoneのSafariから使えるTOEIC学習アプリのプロトタイプです。

## 機能

- 5分、10分、15分の短時間学習タイマー
- TOEIC Part 5風の文法問題
- 単語カード
- 間違えた問題の復習リスト
- 学習数、正答率、連続学習日数の保存
- GitHub Pagesに置ける静的PWA構成

## ローカルで試す

まずは `index.html` をブラウザで開くと画面を確認できます。

Service Workerを含むPWAとして試す場合は、フォルダ内で簡易サーバーを起動します。

```powershell
cd C:\Users\takah\Documents\Codex\toeic-commute-pwa
python -m http.server 8000
```

その後、ブラウザで次を開きます。

```text
http://localhost:8000
```

## iPhoneで使う流れ

1. GitHubにアカウントを作る
2. このフォルダのファイルをGitHubリポジトリにアップロードする
3. GitHub Pagesを有効にする
4. iPhoneのSafariで公開URLを開く
5. 共有ボタンから「ホーム画面に追加」を選ぶ

詳しい手順はCodexの回答内に記載しています。
