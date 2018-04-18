---
title: 'Hexoでブログを構築しました。'
date: 2018-04-18 22:58:27
category: text
tags: [hexo, node-sass, circleCI]
thumbnail: thumbnail.jpg
---

先日*Hexo*を使って、Github pagesにブログを開設しました。   
公開まで簡単に出来る！とよく記載されているのですが、なんだかんだで引っかかったところがあったのでそんな部分ををまとめました。  

<!-- toc -->

## Hexoはグローバルインストールじゃなくても良い
[公式サイト](https://hexo.io/)のトップにこれで導入してねと下記のように表示されていますが、
-gしなくともnpxで起動できるので、ローカルインストールでいいのではと思います。
```console
npm install hexo-cli -g
```

### 見出し2

## Hexoの使いかた

## テーマの設定

Hexoではテーマを自由に変更することが出来ます。
変更方法は下記の二通り。
- テーマを拾ってくる
- 自作する

[公式](https://hexo.io/themes/index.html)や[Github](https://github.com/search?utf8=%E2%9C%93&q=hexo-theme&ref=simplesearch)から好みのものを探すことができます。



[リンク](http://www.yahoo.co.jp/ "リンク")

|     l      |        c    |     r        |
|:----------:|:-----------:|:------------:|
| This       |        This |     This     |

- 箇条書き
- 箇条書き２
- 箇条書き３

- 箇条書き
1. 番号フル
2. 番号フル２


文章を*強調したい場合*はこうなるよ

```javascript
// コメント
console.log("コードの中身");
```