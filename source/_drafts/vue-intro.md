---
title: vue-intro
#thumbnail: thumbnail.png
date: 2018-06-29 16:45:58
description:
category:
id: vue-intro
tags: vue, nuxt
---

今回は、Vue.jsのフレームワーク、Nuxt.jsと、firebase各種を用いて小さなサイトの構築を行いました。  

<!-- toc -->

## Nuxt.jsの導入
小さい規模の開発ならNuxt.jsがオススメそうなので、まずはNuxt.jsの導入からはじめます。  
<br>
スターターテンプレートを使用することも考えましたが、より詳しく学びたかったので[スクラッチから始める](https://ja.nuxtjs.org/guide/installation#%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%83%E3%83%81%E3%81%8B%E3%82%89%E5%A7%8B%E3%82%81%E3%82%8B)を参考に導入していきます。
`package.json`が作成されていることが前提です。  
```console
npm i -S nuxt
```