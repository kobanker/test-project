---
description: 今の差分を Codex（監視役）に見せて、指摘を brain/reviews/ に残す
---

`.claude/hooks/codex-review.sh` を手で走らせる。Stop フックと同じことを、今この瞬間にやる。

1. `echo '{}' | .claude/hooks/codex-review.sh` を実行する。
2. 出来上がった `brain/reviews/` の最新ファイルを読む。
3. 指摘を要約して私に伝える。直すかどうかは私が決めるので、勝手に直さない。

`codex` が入っていない場合はスクリプトが黙って終わる。そのときは
`docs/setup-claude-codex-obsidian.md` の導入手順を案内する。
