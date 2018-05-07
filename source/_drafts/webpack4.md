---
title: webpackのドキュメントを自分向けにざっくりまとめた
description: 'webpack4のドキュメントの中で、'
category: webpack
id: webpack4
tags:
  - webpack
thumbnail: thumbnail.png
date: 2018-04-30 00:00:00
---
 
webpackについて最低限頭にいれておきたいことをドキュメントから抜き出してまとめました。  
configの書き方は掲載していないので、ご注意ください。

<!-- toc -->

## はじめに
本記事はwebpack初心者向けの記事となっています。  
<br>
webpackってなんなの？一体何ができるの？といった基本的な疑問を解決することが目的です。  
環境構築については触れていません。(別記事準備中)  
<br>
前提として、webpackのバージョンは4系(現時点でv4.7.0)です。  


## 頭の片隅にいれておきたい前知識

#### Modules
私たちは、開発する際にプログラムを機能ごとにファイル分割することがあります。  
この分割されたファイルをモジュールと呼びます。  

#### Bundle
モジュールを1つにまとめること　と認識しておけば問題ないです。


## webpackとは
そもそも[webpack](https://webpack.js.org/)とは一体何者なのでしょうか。    
<br>
webpackはモジュールを、いい感じに1つのファイルにまとめて出力してくれるツール(モジュールバンドラ)です。  


### コアコンセプト
webpackを扱う上で、コアコンセプトを理解しておく必要があります。 
<br>

#### Entry
[エントリーポイント](https://webpack.js.org/concepts/#entry)といいます。
モジュール群の親で、依存モジュールなどの管理をします。  
複数指定が可能です。   

#### Output
[Outputオプション](https://webpack.js.org/concepts/output/#usage)を設定することで、出力時のファイル名と、ディレクトリを指定することが出来ます。 
複数のエントリーポイントがある場合は、ファイル名が被らないようにする必要があります。   

#### Loaders
webpackではデフォルトでJavaScriptが扱えますが、[ローダー](https://webpack.js.org/concepts/#loaders)を追加することでCSSやIMGなどJavaScript以外のものが扱えるようになります。  

#### Plugins
Loadersは特定のタイプのモジュールをwebpackで扱えるように変換しますが、[Plugins](https://webpack.js.org/concepts/#plugins)は様々なタスクを実行できるようにします。  
例えば、webpackで出力したbundle.jsを読み込んだHTMLを生成したい場合は`html-webpack-plugin`を使用します。  

#### Mode
`development`, `production(デフォルト)`、`none`が設定可能です。  
指定した値によって、各環境に対応した最適化をwebpackが行ってくれます。

modeの変更による詳しい説明は[こちら](https://webpack.js.org/concepts/mode/#usage)。  


### ついでに覚えておきたいこと
#### resolver
[resolver](https://webpack.js.org/concepts/module-resolution/)は、絶対パスでモジュールを探すのに役立つライブラリです。  
<br> 
`enhanced-resolve`というものをつかって、pathをいい感じにごにょごにょしてくれるので開発者は非常に楽になります。  

#### Manifest
Manifest dataというものを知っていますか？  
これは、全てのモジュールの情報がつまったものです。  



<br>

以上のことをふまえて、実際に環境構築をしてみましょう。(別記事準備中)  