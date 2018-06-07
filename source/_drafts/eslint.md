---
title: ESLintとPrettierを併用してお手軽コードチェックするまで
# thumbnail: thumbnail.png
date: 2018-06-07 11:58:56
description:
category: Lint
id: eslint-Prettier
tags: ESLint
---

色々な人が参画/離任を繰り返した結果、手がつけられないぐらいの量になった負のレガシー。  
自分がいるうちに少しでも綺麗にしておきたいと思い、ESLintとPrettierについて調べたので記事にしました。

<!-- toc -->

## 現状の問題点を考える
まず今現在私が扱っているコード達は、古く、そして歴代のフロントエンドエンジニアによって何年もの月日をかけて熟成されたものです。  
コーディング規約はあるものの、人によってインデントはタブだったり半角スペース2つだったり、ダブルクォーテーションとシングルクォーテーション...色々なものが混在しています。  
<br>
諸事情でこれら小さい粒だけを直すことができないので、別案件の着手ついでに直していましたが、  
数が多すぎるが故に全てを一度で直しきれずに所々に残ってしまっています。  
こんな状態ではレビューコストもかかるし、何よりパッと見ただけで汚い。  
更に今後新しく参画してくるであろうエンジニアによって更に熟成が進んでしまうことが予想されます。  
<br>
ということで、なるべく工数がかからないような方法を用いて常日頃からコードを綺麗にしておき、熟成するスピードを遅らせる必要がありました。  

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
- babel-eslint  
→ESLint標準のパーサーで対応しきれなさそうな場合に必要。
- eslint  
→ESLint本体
- eslint-config-prettier  
→ESLintのフォーマットの設定を無効
- eslint-loader  
→webpack用のloader
- eslint-plugin-prettier  
→ESLint上でPrettierを動かす
- prettier  
→Prettier本体

### .eslintrc.jsの作成。

.eslintrc.jsにルールなどを書いていきます。  
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
    "semi": [2, "never"],  //セミコロンチェック 参考）https://eslint.org/docs/rules/semi
    "no-console": "off", //console.log()のチェック 参考）https://eslint.org/docs/rules/no-console#rule-details
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

### npm scriptsの設定
簡単に実行できるよう、npm scriptsに以下のように追記します。  

```js
"lint": "eslint --ext .js --ignore-path .gitignore ."
```

実行する際は、`npm run lint`です。  
ちなみに`--fix`をつけるとエラー個所をルールにそってESLintがフォーマットしてくれます。（Prettierではないです。）  


## エディタと連携する

## あとがき
