---
title: Vuex和Pinia
date: 2023-04-28
tags:
 - Vue
categories:
 - 前端
---

## Vuex和Pinia的使用和区别

> [参考博客](https://juejin.cn/post/7121209657678364685)

### Vuex

- `state`用来存放共享变量的地方
- `getter`，可以增加一个`getter`派生状态，(相当于`store`中的计算属性），用来获得共享变量的值
- `mutations`用来存放修改`state`的方法，用**commit**触发。 
- `actions`也是用来存放修改state的方法，用**dispatch**触发，不过`action`是在`mutations`的基础上进行。常用来做一些异步操作
- `modules` 将store分割成模块(module)，应用较大时使用，每个module定义里都有完整的state，最后用**creatStore**整合

Vuex在vue3中使用，用**useStore**获取

```vue
<template>
  <div></div>
</template>
<script setup>
import { useStore } from 'vuex'
let vuexStore = useStore()
console.log(vuexStore.state.vuexmsg); //hello vuex
</script>
```

modules使用：

```js
import { createStore } from "vuex";
const moduleA = {
  namespaced: true, //防止提交一些mutation或者actions中的方法重名，modules一般会采用命名空间的方式
  state: () => ({ 
    count:1
   }),
  mutations: {
    setCount(state, data) {
      state.count = data;
    },
  },
  actions: {
    getuser() {
      //do something
    },
  },
  getters: { ... }
}

const moduleB = {
  namespaced: true,
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

export default createStore({
  strict: true,
  //全局state，类似于vue中的data
  state() {
    return {
      vuexmsg: "hello vuex",
      name: "xiaoyue",
    };
  },
  modules: {
    moduleA,
    moduleB
  },
});

// 组件中使用
import { useStore } from 'vuex'
let vuexStore = useStore()
console.log(vuexStore.state.moduleA.count) //1
vuexStore.commit('setCount', 2)
console.log(vuexStore.state.moduleA.count) //2
vuexStore.dispatch('getuser')
// 修改
vuexStore.commit('moduleA/setCount', 2)
vuexStore.dispatch('moduleA/getuser')
```

### Pinia

Pinia其实可以理解为Vuex5，换了个叫法名称

```js
// 定义 没有了mutations和modules
import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
  state: () => {
    return {
      piniaMsg: "hello pinia",
      name: "xiaoyue"
    };
  },
  getters: {},
  actions: {
    setName(data) {
      this.name = data;
    },
  },
});
// 没有modules，如果想使用多个store，直接定义多个store传入不同的id即可
export const storeB = defineStore("storeB", {...});
export const storeC = defineStore("storeB", {...});

// 使用
<template>
  <div>{{name}}</div> // 响应式storeToRefs解构赋值
</template>
<script setup>
import { storeA } from '@/piniaStore/storeA'
import { storeToRefs } from 'pinia'
let piniaStoreA = storeA()
console.log(piniaStoreA.piniaMsg); //hello pinia
// storeToRefs解构赋值,传统的直接对piniaStoreA解构赋值做不到响应式
let { piniaMsg, name } = storeToRefs(piniaStoreA) // 后续name变了在页面中能做到响应式

//修改
// 直接修改（不推荐此方式），并且调试工具能够记录到每一次state的变化（Vuex中直接修改记录不到）
piniaStoreA.piniaMsg = 'hello juejin'
console.log(piniaStoreA.piniaMsg); //hello juejin
// 使用$patch直接批量修改（不推荐）
piniaStoreA.$patch({
  piniaMsg: 'hello juejin',
  name: 'daming'
})
console.log(piniaStoreA.name);//daming
// 使用actions里的函数进行修改（推荐）不需要再使用dispatch函数，直接调用store的方法即可
piniaStoreA.setName('daming')

//重置 $reset将状态重置为初始值
piniaStoreA.$reset()
</script>
```

### 总结区别

- Pinia没有了mutations，直接在actions里修改，也不需要再使用dispatch函数，直接调用store里actions定义的方法即可
- Pinia没有了modules，如果想使用多个store，直接定义多个store传入不同的id即可
- Pinia加入了**storeToRefs**进行对多个参数变量解构赋值，使其在页面中做到响应式
- Pinia对数据直接修改，调试工具能够记录到每一次state的变化，Vuex中直接修改记录不到（都不推荐直接修改的方式，推荐在store层统一管理）
- Pinia加入了**$patch**直接批量修改
- Pinia可以用重置 $reset将状态重置为初始值