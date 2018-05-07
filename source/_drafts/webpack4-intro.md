---
title: webpack4-intro
# thumbnail: thumbnail.png
date: 2018-05-06 17:05:38
description:
category:
id:
tags: webpack
---

<!-- toc -->

## はじめに
 

## webpackの導入
npm init -y

### extract-text-webpack-plugin
このプラグインは現在webpackv4に対応していないのですが、(extract-text-webpack-pluginのissues)[https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701]によると、webpack4に対応したバージョンがプレリリースされているようでした。
正式にリリースされるのを待ちつつ、今回は自己責任でプレリリースされているものを採用します。
npm i -D extract-text-webpack-plugin@next