---
title: 'Hexoでブログ構築 まとめ'
date: 2018-04-23 19:30:00
category: Hexo
id: hexo-summary
tags: [Hexo]
# thumbnail: thumbnail.jpg
---

先日[Hexo](https://hexo.io/)を使って、Github pagesでブログを公開しました。   
公開まで簡単に出来る！とよく紹介されているのですが、なんだかんだで引っかかったところが多々あったのでまとめてみました。  

<!-- toc -->

## Hexo設定関係のつまづき
### configが複数あるんだけども
Hexoではブログ本体に関する設定_config.ymlと、テーマに関する_config.ymlが存在します。  
<br>
使い分けですが、絶対に必要な設定(デプロイなどの設定)を前者に、  
なくても問題ない設定（google_analyticsなど）を後者に記述するようにしています。

## ページ作成に関するつまづき
### 新規でページを増やしたい
Hexoでページを増やす場合は少々面倒です。
```console
$ hexo new page testPage
```
上記を実行すると`/source/testPage/index.md`が作成され、これがページの元になります。  
<br> 
index.mdの中身は、
```md
---
layout: testPage①
---
```
とします。 
<br>  
次に、`/themes/themeName/layout`の配下にtestPage.ejs②を作成すると、  
[/testPage](/testPage.html)でアクセスできるようになります。  
<br>
作成する際、①と②は同じ名前を指定するようにしてください。

### 404ページ
404ページは自分で作成する必要があります。  
新規ページ作成と同様に`$ hexo new page 404`とし、index.mdに
```md
---
permalink: /404.html
---
```
と記載してください。  
[/404.html](/404.html)でアクセスが可能になります。  
<br>
通常ページと同じく、layoutの設定も可能なのでオリジナルの404ページが作れます。



## 記事作成に関するつまづき
### 記事の途中に目次を入れたい
[目次生成のヘルパー](https://hexo.io/docs/helpers.html#toc)が公式で用意されていますが、記事の途中に挿入することはできません。  
目次の前にまえがきを設置しておきたかったので、`hexo-toc`というプラグインを導入しました。  
設定方法は[github](https://github.com/bubkoo/hexo-toc)をご覧ください。

### パーマリンクの設定
SEOの観点から、非常に大切な部分です。
`project/_config.yml`に設定を記述します。
散々迷った結果、
```
permalink: :category/:id/
```
とし、カテゴリー+記事ID(スラッグ)の形としました。  
記事投稿後にカテゴリーを変える可能性がある場合は、categoryがはいっているとURLが変わってしまうため記事IDのみでいいのではないでしょうか。  
<br>
記事ごとに記事IDを設定する場合は、.mdの上部で設定をする必要があります。
```md
---
id: idname
---
```

## テーマに関するつまづき

### テーマを探す
[公式](https://hexo.io/themes/index.html)や[Github](https://github.com/search?utf8=%E2%9C%93&q=hexo-theme&ref=simplesearch)から好みのテーマを探すことができます。  
`themes/`にテーマフォルダを配置し、project/_config.ymlの中の`theme: themeName`の部分を変更します。  
<br>
ちなみにこのブログで現在使用しているテーマは自作したものなので、ある程度形になってきたらそのうち配布する予定です。

### scssのコンパイル
Hexoには、node-sassがくっついています。  
`hexo-renderer-scss`をnpm installし、
`_config.yml`に下記を記載しました。
```yml
# style settings
node_sass:
  debug: false
  outputStyle: compressed
  precision: 5
  sourceComments: false
  includePaths: ['./node_modules/normalize-scss/sass/','./node_modules/reset-css/']
```
個人的にnormalize.cssとreset.cssを追加でimportできるようにしています。(npm install必須)  

### ページ毎にヘッダーを出しわけたい
[公式の変数一覧](https://hexo.io/docs/variables.html#Page-Variables)の中に`page.layout`という変数があるので、ページ毎にejs内で分岐することが可能です。  
<br>
<br>
<br>
その他にもcircleCIで自動デプロイまで行なってみたりしているので  
そのうち紹介できたらいいなと思ってます。