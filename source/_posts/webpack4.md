---
title: 'webpack4のドキュメントをざっくりまとめた 基本編'
description: 'webpack4のドキュメントの中で、基本的な部分から大事だなとおもった部分を抜き出してまとめました。'
category: webpack
id: webpack4
tags:
  - webpack
thumbnail: thumbnail.png
date: 2018-05-09 00:00:00
---
 
webpackについて最低限頭にいれておきたいことをドキュメントから抜き出してまとめました。  
configの書き方などは掲載していないのでご注意ください。

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
私たちは開発する際に、プログラムを機能ごとにファイル分割することがあります。  
この分割されたファイルをモジュールと呼びます。  
長いソースコードを分割することで、可読性が上がりテストも容易になります。  
結果、バグも少なくなり効率の良い開発を行うことが出来ます。

#### Bundle
この記事の中では、モジュールを1つのjsにまとめることと認識しておけば問題ないです。


## webpackとは
そもそも[webpack](https://webpack.js.org/)とは一体何者なのでしょうか。    
<br>
webpackは、モジュールをいい感じに1つのファイルにまとめて出力してくれるツール(モジュールバンドラ)です。  


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
最初のころはLoadersとごちゃまぜになることが多いPluginsですが、中身は別物です。  
Loadersは特定のタイプのモジュールをwebpackで扱えるように変換しますが、[Plugins](https://webpack.js.org/concepts/#plugins)は様々なタスクを実行できるようにします。  
<br>
例えば、webpackで出力したbundle.jsを読み込んだHTMLを生成したい場合は`html-webpack-plugin`というプラグインを使用します。  

#### Mode
`development(開発環境向け)`, `production(本番環境向け)`、`none(全ての機能を無効)`が設定可能です。  
指定した値によって、各環境に対応した最適化をwebpackが行ってくれます。  
<br>
development選択時はコードの圧縮はされませんが、production選択時は圧縮されるなどの違いがあります。   
modeの変更による詳しい説明は[こちら](https://webpack.js.org/concepts/mode/#usage)。  


### ついでに覚えておきたいこと

#### webpack.config.js
webpackはwebpack.config.jsというファイルに設定を記述していきますが、  
v4からは`ゼロコンフィグ`と呼ばれる設定ファイルがなくてもバンドルできるしくみが用意されています。  
（ただし何も設定しなくてもよいわけではなく、実行時に引数としてコマンドを記述する必要があります。）

<!-- #### resolver
[resolver](https://webpack.js.org/concepts/module-resolution/)は、絶対パスでモジュールを探すのに役立つライブラリです。  
`enhanced-resolve`というものをつかって、pathをいい感じにごにょごにょしてくれるので開発者は非常に楽になります。  

#### Manifest
Manifest dataというものを知っていますか？  
これは、全てのモジュールの情報がつまったものです。  -->

#### Polyfill
JavaScriptの中には古いブラウザで動かない関数などが存在するのですが、  
Polyfillをつかうことで古いブラウザでも動作するように拡張することができます。  


<br>
<br>
<br>

基本的な説明はここまでです。   