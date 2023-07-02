---
title: Vue Router
date: 2021-07-03
tags:
 - Vue
categories:
 - 前端
---

## VueRouter

**跳转**

*  `this.$router.push()`
*  `<router-link to=""></router-link>`

**占位**

```
<router-view></router-view>
```

### 路由懒加载方式

```js
// import 动态引入
const List = () => import('@/components/list.vue')
const router = new VueRouter({
	routes: [
        {path: "/list', component: List }
	]
})
// require 动态加载
const router = new VueRouter({
	routes: [
        {
        	path: "/list',
        	component: resolve => require(['@/components/list'], resolve)
        }
	]
})
```

### hash和history模式

*  `hash` 默认是hash模式
*  `history`

1.hash模式，URL带着一个#，例如：`http://www.abc.com/#/vue` hash值为`#/vue` 特点：hash值会出现在URL里，但是不会出现在HTTP请求中，所以改变hash值不会重新加载页面，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误。原理是**onhashchange()**来监听事件的改变，除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退

2.history模式，需要后台配置支持。如果后台没有正确配置，访问时会返回404。原理：**pushState() 和 replaceState()** 用于修改历史状态，进行修改时浏览器不会立即向后端发送请求；**forward()，back() 和 go() **对应浏览器的前进，后退和跳转操作。虽然history模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来

### 动态路由 参数

**获取页面路由变化：**

1.监听$route的变化

```vue
watch: {
  $route: {
    handler(val, oldVal) {
      console.log(val)
    },
    immediate: true,
    deep: true
  }
},
```

- $route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数
- $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。


2.`window.location.hash`读取#值

**定义动态路由，获取动态参数**

1.param方式

配置路由格式为`path: '/user/:userid'`，使用路由跳转，传递后路径为`/user/123`

```js
// 方法1:
<router-link :to="[ name: 'users', params: { userid: id }}>按钮</router-link>
// 方法2:
this.$router.push({name: 'users' ,params: {userid: this.id} })
// 方法3:
this.$router.push( '/user/' + this.id)
```

通过`$route.params.userid`获取传递的值

2.query方式

传递后路径为`/user?userid=123`

```js
// 方法1:
<router-link :to="[ name: 'users', query: { userid: id }}>按钮</router-link>
// 方法2:
this.$router.push({name: 'users' , query: {userid: this.id} })
// 方法3:
this.$router.push( '/user?userid=' + this.id)
```

通过`$route.query`获取传递的值

### 导航守卫

```js
router.beforeEach((to, from, next) => {
	if (to.path === '/login') return next()
	if (to是受控页面 && 没有登录) return next('/login')
	next()
})
// afterEach 
router.beforeEach((to, from) => {
    //跳转之后滚动条回到顶部
	window.scrollTo(0,0)
})
```
