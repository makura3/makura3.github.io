---
title: ESLintとPrettierとVSCodeでお手軽コードチェックするまで
# thumbnail: thumbnail.png
date: 2018-07-31 23:00:00
description: ESLintとPrettierを使って、保存時にフォーマットとコード検証する手順をまとめました。
category: Lint
id: eslint-Prettier
tags: [ESLint, Prettier]
---

色々な人が参画/離任を繰り返した結果、手がつけられないぐらいの量になった負の遺産(みたいなソースコード)。  
自分がいるうちに少しでも綺麗にしておきたいと思い、ESLintとPrettierについて調べたので記事にしました。

<!-- toc -->

## 現状の問題点を考える
まず、現在私が扱っているコードは古く、そして歴代のフロントエンドエンジニアによって何年もの月日をかけて熟成されたものです。  
コーディング規約はあるものの、インデントはタブだったり半角スペース2つだったり、文字列はダブルクォーテーションだったりシングルクォーテーションだったり...  
挙げきれないのですが、こんなカオスな感じになっています。  
<br>
諸事情でこれら小さい粒だけを直すことができないので、案件ついでにチビチビと直していましたが
数が多すぎるが故に全てを一度で直しきれずに所々に残ってしまっています。  
こんな状態ではレビューコストもかかるし、何よりパッと見ただけで汚い。  
今後新しく参画してくるであろうエンジニア(もちろん自分も含みますが)によって更に熟成が進んでしまうことが予想されます。  
<br>
なるべく工数がかからないような方法を用いて常日頃からコードを綺麗にしておき、熟成するスピードを遅らせる必要がありそうです。  

## ツールの説明
今回使用するツールの説明です。  
<br>
- ESLint  
　→コード検証ツール。コードのフォーマットも可能です。  
- Prettier  
　→コードフォーマッター。  

<br>
ESLint1本でコードの検証とフォーマットをしてしまいたいところですが、これだけでは対応しきれないことがあるらしいので、  
今回はフォーマットに特化したPrettierを併用していきます。


## 導入方法

### 必要なパッケージをインストール

```console
npm i -D babel-eslint eslint eslint-config-prettier eslint-loader eslint-plugin-prettier prettier
```
<br>
各パッケージの説明です。  
<br>
- *babel-eslint*  
→ESLint標準のパーサーで対応しきれなさそうな場合に必要。
- *eslint*  
→ESLint本体
- *eslint-config-prettier*  
→ESLintのフォーマットに対するルールを無効
- *eslint-loader*  
→webpack用のloader
- *eslint-plugin-prettier*  
→ESLint上でPrettierを動かす
- *prettier*  
→Prettier本体

### .eslintrc.jsの作成

プロジェクトルートに.eslintrc.jsを置き、設定とルールを書いていきます。  
```yml
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  extends: [
    "eslint:recommended", //ESLintで基本的なルールチェック(更に細かく個別指定可)
    "plugin:prettier/recommended"  //一番下に書かないとうまく動かない場合も
  ],
  plugins: [],
  // ここにカスタムルールを追加します。
  rules: {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true, //シングルクォーテーションのフォーマット 参考）https://prettier.io/docs/en/options.html#quotes
        "semi": false //セミコロンのフォーマット 参考）https://prettier.io/docs/en/options.html#semicolons
      }
    ],
  }
}
```

### ESLintだけ使ってみる
ちゃんと動くかチェックします。  
簡単に実行できるよう、npm scriptsに以下のように追記しておきましょう。  

```js
"lint": "eslint --ext .js --ignore-path .gitignore ."
```

実行する際は、`npm run lint`です。  
カスタムルールを追加していないので、eslint:recommendedの基本的なルールチェックが走ります。  
<br>
ちなみに`--fix`をつけるとエラー個所をルールにそってESLintがフォーマットしてくれます。（Prettierではないです。）  
<br>
<br>
たま〜にPrettierで一括フォーマット怖い！みたいな場合があるので、その時は上記のようにESLintだけ使います。  


## エディタ(VSCode)と連携して保存時にフォーマット&構文チェックする
VSCodeと連携して、ファイルを保存した時にフォーマット&構文チェックされるようにします。  
手が止まらずゴリゴリ実装できるのでとても便利です。  

<br>
まず、VSCode上で[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)と[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)のインストール/有効化をしておいてください。  
<br>

VSCodeの設定ファイルはこんな感じになります。  
```js
{
  "prettier.eslintIntegration": true, //prettier-eslintを使うようになる
  "eslint.enable": true, // ESLint有効化
  // 適応するファイルタイプを決定
  "eslint.validate": [
    "javascript",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  // プロジェクト配下のeslintrc.jsを読み込み
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  // 保存時にESLint--fixで自動フォーマット どちらかで良い
  "editor.formatOnSave": false,
  "eslint.autoFixOnSave": true
}
```

<br>
これで設定は終わりです！  
あとは保存してちゃんと動くか確認し、快適な実装ライフを楽しんでください。  
<br>
こんなにすぐ導入できるなんて嬉しいですね。  

## あとがき
試しに大型案件の無法地帯だったソースを検証してみたところ、とんでもない量のエラーが出ました。  
古いシステムの場合でも環境作るのがめんどくさいとか思ってないで、早いタイミングで導入した方が良いですね。  
<br>
JSの他にもstylelint＋Prettierでもう少し快適な実装ライフが送れそうなのでそのうち調べて導入しようと思ってます。  