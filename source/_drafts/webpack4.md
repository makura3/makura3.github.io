---
title: 'webpackのドキュメント読んだ'
date: 2018-04-30 00:00:00
description: 
category: 
id: 
tags: 
thumbnail: thumbnail.png
---

英語の勉強がてらwebpackの公式ドキュメントを読みました。  
結論としては全く英語が得意になった気はしないのですが、webpackの知識は溜まったのでメモします。  

<!-- toc -->

## はじめに
本記事はwebpack初心者向けの記事となっています。  
<br>
webpackってなんなの？一体何ができるの？といった  
基本的な疑問を解決することが目的です。  
<br>
webpackのバージョンは4系(現時点でv4.6.0)となっています。


## webpackとは
そもそも[webpack](https://webpack.js.org/)とは一体何者なのでしょうか。    
<br>
簡単に説明すると私たちが普段コーディングする際、機能ごとにファイルを分割したりします。(モジュール)
webpackはその機能ごとに分割したファイルを、いい感じに1つのファイルにまとめて出力してくれるツール(モジュールバンドラ)です。

<!-- webpackがサポートしている言語は[こちら](https://webpack.js.org/concepts/modules/#supported-module-types)に記載されています。 -->

### 4つのコアコンセプト
webpackを扱う上で、4つのコアコンセプトを理解しておく必要があります。 
<br>

#### Entry
[エントリーポイント](https://webpack.js.org/concepts/#entry)といいます。
モジュール群の親です。依存モジュールなどの管理をします。

#### Output
バンドルしたファイルをどこに、どんな名前で出力するか[Output](https://webpack.js.org/concepts/#output)で設定することができます。

#### Loaders
webpackではデフォルトでJavaScriptのバンドルを行いますが、[ローダー](https://webpack.js.org/concepts/#loaders)を追加することでCSSやIMGファイルのバンドルが可能になります。

####Plugins

## webpackを導入してみる
では実際に導入し、セットアップします。