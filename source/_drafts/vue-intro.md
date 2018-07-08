---
title: vue-intro
#thumbnail: thumbnail.png
date: 2018-06-29 16:45:58
description:
category:
id: vue-intro
tags: vue, nuxt
---

今回はVue.jsのフレームワーク、Nuxt.jsと、firebase各種を用いて小さなサイトの構築を行いました。  

<!-- toc -->

## Nuxt.jsの導入
Nuxt.jsを導入したことがある方は読み飛ばして構いません。  
<br>
公式の[スクラッチから始める](https://ja.nuxtjs.org/guide/installation#%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%83%E3%83%81%E3%81%8B%E3%82%89%E5%A7%8B%E3%82%81%E3%82%8B)を参考に導入していきます。  
`package.json`が作成されていることが前提です。  
```console
npm i -S nuxt
```

次に`/src/pages/index.vue`を作成し、中身に下記を記述します。  
```vue
<template>
  <h1>Hello world!</h1>
</template>
```

/src配下が認識されるよう、`nuxt.config.js` を作成し、下記を追加します。  
```js
module.exports = {
  srcDir: 'src/'
}
```


`package.json`には
```console
"dev": "nuxt"
```
を追加しておきます。


そして、`npm run dev`で起動します。

http://localhost:3000にアクセスすると、「Hello world!」 が表示されたかと思います。  
Nuxt.jsの導入確認は以上です。  

## firebaseの導入
```console
npm i -S firebase
```

次に、firebaseの設定ファイルを追加します。
```js
// /firebase.jsonを作成し、下記を記述
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

```js
// /firestore.rulesを作成し、下記を記述
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

```js
// /firestore.indexes.jsonを作成し、下記を記述
{
  "indexes": []
}
```

そして、firebaseとjsの結合部分の処理を記載します。
```js
// /src/plugins/firebaseInit.jsを作成し、下記を記述(ファイル名は自由です)
import firebase from 'firebase'
import 'firebase/firestore'
import config from './../util/firebaseConfig'
const firebaseApp = firebase.initializeApp(config)

const settings = { timestampsInSnapshots: true }
const firestore = firebaseApp.firestore()
firestore.settings(settings)

export default (!firebase.apps.length ? firebase.app() : firestore)
```

```js
// /src/util/firebaseConfig.jsを作成し、下記を記述(ディレクトリ・ファイル名は自由です)
export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: ''
}
```

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