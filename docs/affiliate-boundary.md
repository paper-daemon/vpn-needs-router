# Affiliate display boundary

VPN Needs Routerは、用途から先に確認すべき条件を整理する診断本体と、承認済みの場合だけ出す広告候補を分離します。

## 表示境界

`AFFILIATE_OFFERS`のうち、結果へ出すのは`enabled: true`の項目だけです。

回帰fixtureではdisabledとenabledの候補を同時に渡し、次を確認します。

- 診断結果は通常どおり表示される
- disabled offerはHTMLへ出ない
- enabled offerだけ表示される
- 広告リンクは`sponsored nofollow noopener`

```bash
node tests/test_affiliate.js
```

公開mainで6 assertions PASS。

広告候補が0件でも診断本体は成立します。提携状態を診断ロジックの順位や必要条件へ混ぜないための境界です。
