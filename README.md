# VPN Needs Router

用途からVPN選びで確認すべき条件を整理する、依存なしの静的Webアプリです。

- 商品ありきではなく用途から診断
- アフィリエイト候補は初期状態で空
- 承認済み広告のみ `affiliate-config.js` に追加
- 広告リンクは `rel="sponsored nofollow noopener"` 付き
- 有効化した広告も `http` / `https` 以外のURLは表示せず、名称・開示文・URL属性はHTMLエスケープ
- [広告候補の表示境界と回帰テスト](docs/affiliate-boundary.md)

## Local
`python3 -m http.server 8000`

## Monetization rule
未提携・未承認のトラッキングURLは入れません。広告を追加する場合は表示上も明示します。

## Affiliate rendering boundary

`affiliate-config.js` は内部設定ですが、公開静的ページへ描画する時点でもfail-closedにします。`javascript:` 等の非HTTP(S) URLは候補から除外し、`name` / `disclosure` / `href` はHTMLとして解釈されないようescapeします。

## 収益化ポリシー

共通スロット仕様 v1.0。提携承認済みリンクだけを有効化し、広告表記を付けます。診断本体は広告なしでも動作します。

## Affiliate policy
The tool stays useful without affiliate links. Only approved programs may be enabled, with clear disclosure. Unapproved services use normal official links or no link.
