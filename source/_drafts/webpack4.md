---
title: 'webpackのドキュメント読んだ'
date: 2018-04-30 00:00:00
description: ''
category: webpack 
id: webpack4
tags: [webpack]
thumbnail: thumbnail.png
---

英語の勉強がてらwebpackの公式ドキュメントを読みました。  
結論としては全く英語が得意になった気はしないのですが、webpackの知識は溜まったのでメモします。  

<!-- toc -->

## はじめに
本記事はwebpack初心者向けの記事となっています。  
<br>
webpackってなんなの？一体何ができるの？といった基本的な疑問を解決することが目的です。  
<br>
前提として、webpackのバージョンは4系(現時点でv4.6.0)です。


## webpackとは
そもそも[webpack](https://webpack.js.org/)とは一体何者なのでしょうか。    
<br>
簡単に説明すると私たちが普段コーディングする際、機能ごとにファイルを分割したりします。(モジュール)
webpackはその機能ごとに分割したファイルを、いい感じに1つのファイルにまとめて出力してくれるツール(モジュールバンドラ)です。

<!-- webpackがサポートしている言語は[こちら](https://webpack.js.org/concepts/modules/#supported-module-types)に記載されています。 -->

### コアコンセプト
webpackを扱う上で、コアコンセプトを理解しておく必要があります。 
<br>

#### Entry
[エントリーポイント](https://webpack.js.org/concepts/#entry)といいます。
モジュール群の親です。依存モジュールなどの管理をします。

#### Output
バンドルしたファイルをどこに、どんな名前で出力するか[Output](https://webpack.js.org/concepts/#output)で設定することができます。

#### Loaders
webpackではデフォルトでJavaScriptが扱えますが、[ローダー](https://webpack.js.org/concepts/#loaders)を追加することでCSSやIMGなどJavaScript以外のものが扱えるようになります。

#### Plugins

wip

#### Mode
`development`, `production(デフォルト)`、`、none`が設定可能。  
指定した値によって、各環境に対応した最適化をwebpackが行ってくれます。

modeの変更による詳しい説明は[こちら](https://webpack.js.org/concepts/mode/)。  

wip

