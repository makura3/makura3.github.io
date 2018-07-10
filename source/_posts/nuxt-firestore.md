---
title: Nuxt.jsとfirestoreを組み合わせて簡単なサイトを作った話
#thumbnail: thumbnail.png
date: 2018-07-10 18:30:00
description:
category: vue
id: nuxt-intro
tags: [firestore, Nuxt, Vue]
---

今回はVue.jsのフレームワーク、Nuxt.jsと、firebase各種を用いて小さなサイトの構築を行いました。  
各種導入の際に詰まることが多かったので、手順をまとめました。  

<!-- toc -->

## Nuxt.jsの導入・表示確認まで
ローカルホストでHelloWorldするまでの手順になるので、*Nuxt.jsを導入したことがある方は読み飛ばして構いません。*  
<br>
公式の[スクラッチから始める](https://ja.nuxtjs.org/guide/installation#%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%83%E3%83%81%E3%81%8B%E3%82%89%E5%A7%8B%E3%82%81%E3%82%8B)を参考に導入していきます。  
`package.json`が作成されていることが前提です。  

```console
npm i -S nuxt
```

<br>

次に`/src/pages/index.vue`を作成し、下記を記述します。  
```vue
<template>
  <h1>Hello world!</h1>
</template>
```

<br>

そして、/src配下が認識されるよう`nuxt.config.js` を作成し、下記を記述します。  
（ルートにディレクトリを掘る場合はこの設定はしなくても問題ありません。）
```js
//nuxt.config.js
module.exports = {
  srcDir: 'src/'
}
```

<br>

`package.json`には
```console
"dev": "nuxt"
```
を追加しておきます。  
<br>
そして、`npm run dev`で起動します。

http://localhost:3000 にアクセスすると「Hello world!」 が表示されたかと思います。  
<br>
Nuxt.jsの導入確認は以上です。  

## firebase側の設定

### firebaseのAPIKeyを取得する

firestore導入作業を始める前に、*firebaseでプロジェクトを新規作成し、APIKeyを入手*しておいてください。  
<br>
左側青色の*「プロジェクトを追加」*でプロジェクトを作成し、
![firebase](firebase.jpg "firebase")

<br>
<br>
APIKeyは、コンソール画面の*「ウェブアプリにfirebaseを追加」* から取得できます。  
<br>
![APIKeyの取得](APIKey.jpg "APIKeyの取得")

<br>
<br>
更に、*firestoreを有効*にしておきます。  
<br>
![firestoreの有効化](firestore.jpg "firestoreの有効化")


### firestoreにデータを登録する

作成したfirebaseのプロジェクトにデータを登録します。  
今回は分かりやすいようにitemコレクションの中に、nameフィールドを持ったドキュメントを3つ登録しました。  
<br>
![firestoreにデータを登録](col.png "firestoreにデータを登録")
データの登録方法については今回省きます。  

### firestoreの導入
次にfiresotreの導入をしていきます。  

```console
npm i -S firebase
```
<br>
<br>

firestoreの設定ファイルを追加します。  
複数ファイル必要なので、一つずつ。  
<br>
`firestore.rules`を作成し、下記を記述します。  
これはFirestoreのデータにアクセスできるかどうかのルールを記述するものですが、今回はただのサンプルなので全てのデータに対して読み書きが自由にできるようになっています。  
```js
// /firestore.rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
<br>
<br>
`firestore.indexes.json`を作成し、下記を記述します。  
これはfirestoreのインデックスを管理するものですが、今回は指定なしのまま進めます。
```json
// /firestore.indexes.json
{
  "indexes": []
}
```

<br>
<br>
そして、前手順で作った２つの設定ファイルをを読み込ませるための`firebase.json`を作成し、下記を記述します。  
とはいえ今回それぞれの設定内容が簡単になっているのであまり考えなくても良いのですが。  

```js
// /firebase.json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```
<br>
<br>
そして、jsとの結合部分を記述します。  
plugins配下に`firebaseInit.js`を作成し、下記を記述します。(ファイル名は自由です)  
```js
// /src/plugins/firebaseInit.js
import firebase from 'firebase'
import 'firebase/firestore'
import config from './../util/firebaseConfig'
const firebaseApp = firebase.initializeApp(config)

const settings = { timestampsInSnapshots: true }
const firestore = firebaseApp.firestore()
firestore.settings(settings)

export default (!firebase.apps.length ? firebase.app() : firestore)
```
<br>
<br>
APIKeyなどは`firebaseConfig.js`を作成し、別ファイルで管理するようにしました。  
ディレクトリ・ファイル名は自由ですし、気にならない方はfirebaseInit.jsに書いても動作的には問題ないです。  
```js
// /src/util/firebaseConfig.js
export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: ''
}
```
事前に用意しておいたAPIKeyはここに貼り付けておきます。  
プッシュしないように気をつけて下さい。  
<br>
<br>
そして、先程作成したプラグインが使えるように`nuxt.config.js`に設定を追記します。  
```js
// /nuxt.config.js
module.exports = {
  srcDir: 'src/',
  plugins: [{ src: '~/plugins/firebaseInit' }]
}
```

## storeの設定
 
store配下にindex.jsを作成し、処理を記述していきます。  
<br>
Nuxt.jsではstoreを作成する時に*クラシックモード*(index.jsのみ)と*モジュールモード*(store配下のjsがモジュールに変換される)がありますが、今回は記述量が少ないのでクラシックモードを選択しています。  
```js
// /src/store/index.js
import Vuex from 'vuex'
import {
  INIT
} from './types'
import db from '~/plugins/firebaseInit'

const itemRef = db.collection('items')

const initPlugin = store => store.dispatch(INIT)

const store = () =>
  new Vuex.Store({
    state: {
      itemList: []
    },
    mutations: {
      INIT(state, data) {
        state.itemList = data
      }
    },
    actions: {
      INIT({ commit }) {
        itemRef.get().then(res => {
          let list = []
          res.forEach(doc => {
            let data = {
              id: doc.id,
              name: doc.data().name,
            }
            list.push(data)
          })
          commit('INIT', list)
        })
      }
    },
    getters: {
      getItems: state => {
        return state.itemList
      }
    },
    plugins: [initPlugin]
  })

export default store
```
<br>
<br>
タイプもindex.jsの中に入れても良かったのですが、癖で別ファイル化してます。  
```js
// /src/store/types.js
export const INIT = 'INIT'
```
<br>
<br>
pluginsにinitPluginを設定することで、store初期化時にINITアクションが呼ばれるようになっています。  
データの取得は、`db.collection`でコレクションを指定して、get()で出来ます。  
更新するときはupdate()だったり、非常に分かりやすいです。  


## vueファイルの設定

Nuxt.jsの導入のHelloWorld表示で使用したvueファイルを変更していきます。
```vue
<template>
  <ul>
    <li v-for="(item,index) in init" :key="index">
      {{ item.id }}：{{ item.name }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      init: 'getItems'
    })
  }
}
</script>
```
mapGettersでgetItemsというgetterをinitという名前でマッピングしています。  
今回は入れてないのですが、最初はItemsの中身がないので真っ白になってしまいます。  
そのため、データの取得が終わるまではローディング画像を出すなりした方が良さそうです。  
<br>
<br>
設定は以上になります。  
さっそく`npm run dev`で確認してみます。  
<br>
ローカルでも[サンプルページ](https://makuraswork.firebaseapp.com)のように、登録したデータが表示されていれば正しく設定出来ています。  
今回はfirebase Hostingを使ってデプロイしてみました。  

## 実際に作業してみた所感
vueの経験が足りなかったが故に導入が終わるまでは苦労しましたが、記事にして振り返ってみると割と簡単に連携できるのかなという印象でした。  
storeの部分を分割して綺麗にしておけばより良さそう。  
他には設定ファイルの多さが若干気になりますが、小さいプロジェクトなら問題ないのかなぁ...。  
<br>
とはいえfirestore＋Hostingの組み合わせがプライベートで勉強するにはとても楽ちんなので、今後どんどん使っていきたいです。  
<br>
おしまい。