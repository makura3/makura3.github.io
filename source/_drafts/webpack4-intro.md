---
title: webpack4-intro
# thumbnail: thumbnail.png
date: 2018-05-06 17:05:38
description:
category: webpack
id:
tags: webpack
---

<!-- toc -->

## はじめに
 

## webpackの導入
npm init -y

### extract-text-webpack-plugin
基本的にwebpackは各モジュールをまとめて一つもしくは複数のjsファイルにするのですが、このプラグインを使用するとテキストとして出力が可能です。  

<br>
このプラグインは現在webpackv4に対応していないのですが、(extract-text-webpack-pluginのissues)[https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701]によると、webpack4に対応したバージョンがプレリリースされているようでした。
正式にリリースされるのを待ちつつ、今回は自己責任でプレリリースされているものを採用します。
npm i -D extract-text-webpack-plugin@next