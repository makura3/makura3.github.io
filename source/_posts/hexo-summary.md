---
title: 'Hexoでブログ構築 まとめ'
date: 2018-04-23 19:30:00
description: 'Hexoでブログを構築しました。descriptionなどのSEOに関する設定から新規ページの作成方法など、つまづいた部分をまとめています。'
category: Hexo
id: hexo-summary
tags: [Hexo]
thumbnail: thumbnail.png
---

先日[Hexo](https://hexo.io/)を使って、Github pagesでブログを公開しました。   
公開まで簡単に出来る！とよく紹介されているのですが、なんだかんだで引っかかったところが多々あったのでまとめてみました。  

<!-- toc -->

## Hexo設定関係のつまづき
### configが複数あるんだけども
Hexoではブログ本体に関する設定`_config.yml`と、テーマに関する`_config.yml`が存在します。  
<br>
使い分けですが、絶対に必要な設定(デプロイなどの設定)を前者に、  
なくても問題ない設定（google_analyticsなど）を後者に記述するようにしています。  

### RSSの設置
RSSの設置は、[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)というプラグインで対応しました。  
<br>
sitemap導入時と同じようにnpm installし、必要に応じてconfig.ymlでオプションを変更してください。  
デフォルト値では、[http://localhost:4000/atom.xml](http://localhost:4000/atom.xml)で生成されます。

## SEOに関する設定のつまづき
### meta descriptionの設定
デフォルト値をconfig.ymlに記述しておき、記事ページではdescriptionが重複しないよう毎回設定しています。  
記事の文字を抜き出して自動で設定することも可能ですが、より効果のある文章にするために意図的に手動にしています。
```javascript
// head.ejsに下記を記述

<% if (page.description) { %>
  <meta name="description" content="<%= page.description %>">
<% } else if(config.description) { %>
  <meta name="description" content="<%= config.description %>">
<% } %>
```

```md
# 記事.mdの設定

---
(略)
description: 'descriptionに設定したい文章をここに'
(略)
---
```

### sitemapを作る
公式のプラグインが用意されているので、そちらを使用しました。  
[hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)  
<br>
npm installし、必要に応じて`_config.yml`でオプションを変更してください。  
デフォルト値では、[http://localhost:4000/sitemap.xml](http://localhost:4000/sitemap.xml)で生成されます。

<!-- ### OGPの設定
簡単に言うと、URLを共有した際に見た目がリッチになるアレです。  
こちらは[公式がヘルパー](https://hexo.io/docs/helpers.html#open-graph)を用意していますが、使い方が書いてない。 -->

### google-analyticsの設定
トラッキングIDを`themes/themeName/_config.yml`に設定し、ejsで出力するようにしました。
```js
<% if (theme.google_analytics){ %>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<%= theme.google_analytics %>"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '<%= theme.google_analytics %>');
  </script>
<% } %>
```

### robots.txtの設置
[hexo-generator-robotstxt](https://github.com/leecrossley/hexo-generator-robotstxt)というプラグインが有名そうだったのですが、1ファイル置けばいいだけなので手動で設置しました。  
配置先は`project/source/`です。  
<br>
中身は下記の通り。  
```txt
User-Agent:*
Disallow:
Sitemap:https://makura3.github.io/sitemap.xml
```

Google Search Consoleのrobots.txt テスターで正しく記述されているか確認しておくと良いです。


## ページ作成に関するつまづき
### 新規でページを増やしたい
Hexoでページを増やす場合は少々面倒です。
```console
$ hexo new page testPage
```
実行すると`/source/testPage/index.md`が作成されます。  
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
<br>
<br>
プラグインを入れるともう少し簡単にページが作れるようですが、  
更新が止まっている＆必須ではなかったので導入は見送りました。

### 404ページ
404ページは自分で作成する必要があります。  
`$ hexo new page 404`とし、index.mdに
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
`themes/`にテーマフォルダを配置し、`project/_config.yml`の中の`theme: themeName`の部分を変更します。  
<br>
ちなみにこのブログで現在使用しているテーマは自作したものなので、ある程度形になってきたらそのうち配布する予定です。

### scssのコンパイル
Hexoには、node-sassがくっついています。  
`hexo-renderer-scss`をnpm installし、`_config.yml`に下記を記載しました。  
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