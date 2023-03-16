---
title: Proxy代理 和 Reflect
date: 2022-04-25
tags:
 - ES6
categories:
 - 前端
---

## Proxy代理 和 Reflect

> [参考博客](https://juejin.cn/post/6844904090116292616)

### Proxy

`Proxy` 是对象的包装，将代理上的操作转发到对象，并可以选择捕获其中的一些操作。它可以包装任何类型的对象，包括类和函数。

```js
let proxy = new Proxy(target, handler)
```

- `target` —— 是要包装的对象，可以是任何东西，包括函数。
- `handler` —— 代理配置：带有“钩子”（“traps”，即拦截操作的方法）的对象。比如 `get` 钩子用于读取 `target` 属性，`set` 钩子写入 `target` 属性等等，`ownKeys`钩子拦截 `for..in` ，`Object.keys` 和 `Object.values`

```js
let user = {
    name: "John",
    age: 30,
    _password: "***"
};
// 代理
user = new Proxy(user, {
    get(target, phrase) { // 拦截读取属性操作
        if (phrase in target) { //如果字典包含该短语
            return target[phrase]; // 返回译文
        } else {
            // 否则返回未翻译的短语
            return phrase;
        }
    },
    set(target, prop, val) { // 拦截写入操作
        if (typeof val == 'number') {
            target[prop] = val;
            return true;
        } else {
            return false;
        }
    },
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});

console.log('user: ', user); // { name: 'John', age: 30, _password: '***' }
// "ownKeys" 过滤掉 _password
for (let key in user) console.log(key); // name，然后是 age

// 对这些方法同样有效：
console.log(Object.keys(user)); // name,age
console.log(Object.values(user)); // John,30
```

**取消代理**

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

该调用返回一个带有 `proxy` 和 `revoke` 函数的对象以将其禁用。

```js
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// proxy 正常工作
alert(proxy.data); // Valuable data

// 之后某处调用
revoke();

// proxy 不再工作（已吊销）
alert(proxy.data); // Error
```

调用 `revoke()` 会从代理对象中删除对目标对象的所有内部引用，因此不再连接它们。之后可以对代理对象进行垃圾回收。

### Reflect

`Reflect` 是一个内置对象，可简化的创建 `Proxy`。对于任何 `Proxy` 钩子，都有一个带有相同参数的 `Reflect` 调用。我们应该使用它们将调用转发给目标对象。

```js
let user = {};
Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

**为什么Proxy要和Reflect联合起来使用**

触发代理对象的劫持时保证正确的 this 上下文指向。

receiver 不仅仅会表示代理对象本身同时也还有可能表示继承于代理对象的对象，具体需要区别与调用方，在 Reflect 中 get 钩子中第三个参数传递了 Proxy 中的 receiver 也就是 obj 作为形参，它会修改调用时的 this 指向

可以简单的将 `Reflect.get(target, key, receiver)` 理解成为 `target[key].call(receiver)`（伪代码）

```js
const parent = {
    name: 'parent',
    get value() {
        return this.name;
    },
};

const son = {
    name: 'son',
};
const handler = {
    get(target, key, receiver) {
        console.log(this === handler); // true
        console.log(receiver === son); // true
        // return target[key] 等同于 return Reflect.get(target, key) // 111 parent
        return Reflect.get(target, key, receiver); // 111 son
    }
}
const proxy = new Proxy(parent, handler);

// 设置son继承与parent的代理对象proxy
Object.setPrototypeOf(son, proxy);

console.log('111', son.value)
```