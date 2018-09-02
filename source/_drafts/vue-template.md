---
title: Vue-cli3の導入手順まとめ
thumbnail: thumbnail.png
date: 2018-08-15 16:13:55
description:
category: vue
id: vue-template
tags: Vue
---

Vue-cli3を導入してWebアプリを作成したときの手順をまとめました。  

<!-- toc -->

## Vue-cli3の導入
まず現時点でnodeは`v8.11.2`、npmは`5.6.0`です。  
<br>
導入は[公式の手順通り](https://cli.vuejs.org/guide/installation.html)にすすめます。  
```md
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
<br>
一応バージョンを確認しておきます。  
```console
vue --version
3.0.0-rc.11
```
これで準備が出来ました。  

## プロジェクトの作成
では次にプロジェクトの作成をします。  
v3ではGUIを使用しての作成が出来るようになっているので、実際に使用していきます。  
```console
vue ui
```
<br>
すると`Vueプロジェクトマネージャ`が開くので、`作成`を選択します。  
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
vue-cliでは、vue.config.jsに設定
プロジェクトルート(package.jsonの隣)においておくと、特に設定しなくても勝手に読み込まれます。  

### vueファイル内にscssファイルをimportする
vueファイルで毎回共通化したscss(例えば_variables.scss)をimportすると、何度もimportされてしまうことになります。  
その場合は、下記のように設定することで
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

### portを変える

```js
module.exports = {
  devServer: {
    port: xxxx
  }
}
```
