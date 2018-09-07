---
title: Vue CLI 3の導入手順まとめ
thumbnail: thumbnail.png
date: 2018-08-15 16:13:55
description:
category: vue
id: vue-template
tags: Vue
---

Vue-cli3を導入した時の手順をまとめました。  

<!-- toc -->

## Vue-cli3のインストール
まず現時点でnodeは`v8.11.2`、npmは`5.6.0`です。  
<br>
導入は[公式の手順通り](https://cli.vuejs.org/guide/installation.html)にすすめます。  
グローバルインストールしたくない方は適時変更してください。  
```md
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
<br>
バージョンを確認しておきます。  
```console
vue --version
3.0.0-rc.11
```
これで準備が出来ました。  

## プロジェクトの作成
では次にプロジェクトの作成をします。  
v3ではGUIを使用しての作成が出来るようになっているので、実際に使用していきます。  
(もちろん、従来どおりターミナルからの作成も可能です。)  
```console
vue ui
```
<br>
適当な場所で上記を実行すると`Vueプロジェクトマネージャ`が開くので`作成`を選択します。  
<br>
フォルダを選択し、プロジェクト名などを決めていきます。  
![Vueプロジェクトマネージャ](create.png "Vueプロジェクトマネージャ")
<br>
次に、必要なプラグインの設定をしていきます。  
これは人の好みによりけりですが、今回は`Babel`、`Router`、`Vuex`、`CSS Pre-processors`、`Linter`、`設定ファイルを使用する`を選びました。  
次の画面では、CSS Pre-processorsはSCSS/SASS、LinterはESLint+Prettier + Lint on saveを選択しています。  
<br>
最後にプロジェクトを作成ボタンを押すとインストールが始まります。  
※nodeのバージョンがよろしくないとこの時にエラーが起こります  

### プロジェクトの実行
インストール完了後、プロジェクトタスク画面からプロジェクトを起動します。  
このようにステータスが成功になれば導入は終了です。  
![プロジェクトタスク画面](success.png "プロジェクトタスク画面")  
<br>
出力タブに記載されているURLにアクセス出来るか確認してみてください。
```console
  App running at:
  - Local:   http://localhost:xxxx/
  - Network: http://......./
```
<br>
デフォルトでホットリロード対応しているので、ストレスなく実装出来ると思います。  

## vue.config.jsで設定をカスタムする
vue-cliではvue.config.jsに設定を記述し、
プロジェクトルート(package.jsonの隣)においておくと、特に設定しなくても勝手に読み込まれます。  

### vueファイル内にscssファイルをimportする
共通化したいscss(例えば_variables.scssなど)をプロジェクト内で一度だけimportしたい場合、  
下記のように設定します。  
```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/scss/_global.scss";'
      }
    }
  }
}
```
これでvueファイルで定義した変数が使えるようになっていると思います。  

### portを変える

```js
module.exports = {
  devServer: {
    port: xxxx
  }
}
```