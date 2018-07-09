---
title: Nuxt.jsとfirestoreを組み合わせて簡単なサイトを作った話
#thumbnail: thumbnail.png
date: 2018-06-29 16:45:58
description:
category: vue
id: nuxt-intro
tags: [firestore, Nuxt, Vue]
---

今回はVue.jsのフレームワーク、Nuxt.jsと、firebase各種を用いて小さなサイトの構築を行いました。  
各種導入の際に詰まることが多かったので、手順をまとめました。  

<!-- toc -->

## Nuxt.jsの導入
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


## firebaseのAPIKeyを取得する

firestore導入作業を始める前に、*firebaseでプロジェクトを新規作成し、APIKeyを入手*しておいてください。  
<br>
青色の*「プロジェクトを追加」*でプロジェクトを作成し、
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


## firestoreの導入
次にfiresotreの導入をしていきます。  

```console
npm i -S firebase
```
<br>

[Cloud Firestoreを使ってみる](https://firebase.google.com/docs/firestore/quickstart?hl=ja)を参考に、設定ファイルを追加します。  
複数ファイル必要なので、一つずつ。  
<br>
`firebase.json`を作成し、下記を記述します。
```js
// /firebase.json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

<br>
`firestore.rules`を作成し、下記を記述します。
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
`firestore.indexes.json`を作成し、下記を記述します。
```js
// /firestore.indexes.json
{
  "indexes": []
}
```

<br>
そして、firestoreとjsの結合部分の処理を記載します。  

`firebaseInit.js`を作成し、下記を記述します。(ファイル名は自由です)

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
プッシュしないように気をつけて下さいね。  

<br>

そして、先程作成したプラグインが使えるように`nuxt.config.js`に設定を追記します。  
```js
// /nuxt.config.js
module.exports = {
  srcDir: 'src/',
  plugins: [{ src: '~/plugins/firebaseInit' }]
}
```

storeの設定をしておきます。
```js
// /src/store/index.jsを作成し、下記を追記
import Vuex from 'vuex'
import {
  INIT
} from './types'
import db from '~/plugins/firebaseInit'

const itemRef = db.collection('items')

const myPlugin = store => store.dispatch(INIT)

const store = () =>
  new Vuex.Store({
    state: {
      itemList: []
    },
    mutations: {
      [INIT](state, data) {
        state.itemList = data
      }
    },
    actions: {
      [INIT]({ commit }) {
        // commit('LOADING', true)
        itemRef.get().then(res => {
          let list = []
          res.forEach(doc => {
            let data = {
              id: doc.id,
              url: doc.data().url,
              name: doc.data().name,
              description: doc.data().description
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
    plugins: [myPlugin]
  })

export default store
```

```js
// /src/store/types.jsを作成し、下記を追記
export const INIT = 'INIT'
```

そして最後に、vueファイルを変更していきます。
```vue
<template>
  <div>
    <p v-for="(item, index) in init" :key="index">{{item.name}}</p>
  </div>
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

設定は以上です。  
`npm run dev`で確認してみます。  

このように登録した分だけデータが表示されていれば正しく設定出来ています。