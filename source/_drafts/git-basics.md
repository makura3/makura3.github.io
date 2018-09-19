---
title: gitについて勉強し直した話
# thumbnail: thumbnail.png
date: 2018-09-17 23:48:04
description:
category:
id:
tags:
---

脱Sourcetreeしたので、一度Gitについておさらいしました。  
Git初心者を対象とした記事となります。  

<!-- toc -->

## Gitとは


## それぞれの用語について

## Branching and Merging 
### checkout

Gitのcheckoutは二種類あります。  
・ブランチを変更する
```bash
git checkout <branch>
```

・

### pull
普段何気なく、選択したブランチのソースをローカルのブランチにpullしていますが、ドキュメントを読んでみると  
*git pull runs git fetch with the given parameters and calls git merge to merge the retrieved branch heads into the current branch*
とあり、  
git pull hoge とは、git fetchしたあとhogeブランチを検索し、ローカルブランチにhogeブランチをマージします。

### commit

## あとがき
