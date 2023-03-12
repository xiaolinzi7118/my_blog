---
title: jQuery相关知识
date: 2020-03-20
tags:
 - jQuery
categories:
 - 前端
---

## 前言

jQuery是目前使用最广泛也是最长寿的JavaScript函数库，2006年发布沿用至今，所以还是很有必要对其了解且会用的。

jQuery思想总结来说，就是**选取元素，对其操作**，可以选取一个或多个，多个连续的操作可以用**链式**实现，所以也成为链式风格。

`window.jQuery()`是我们提供的全局函数，一般用`$`来指代jQuery。

简易版jQuery函数1：

```javascript
window.jQuery = (selector) => {
    const elements = document.querySelectorAll(selector);
    const api = {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className);
            }
        }
    }
    return api
}
const api = jQuery('.red').addClass('.green').addClass('.blue');
```

jQuery函数会生成一个对象（假设叫api）,对象里可以引用对应的方法，最后返回这个新构造的对象（api）,这个对象可以继续对元素（elements）进行操作。

优化后：

```javascript
window.$=window.jQuery = (selector) => {
    const elements = document.querySelectorAll(selector);
    return {
        addClass(className) {//闭包
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className);
            }
            return this //链式操作
        }
    }
}
const api = $('.red').addClass('.green').addClass('.blue');
```

---

## 选取元素

参数可以是CSS选择器，也可以是jQuery特有的表达式：

```javascript
$(document) //选择整个文档对象
$('#myId') //选择ID为myId的网页元素
$('.red') //选择class为red的网页元素
$('input[name=first]') // 选择name属性等于first的input元素
$('a:first') //选择网页中第一个a元素
```

选取的元素为一个或者多个，elements为一个伪数组。

也可以进一步筛选：

```javascript
$('div').has('p'); // 选择包含p元素的div元素
$('div').next('p'); //选择div元素后面的第一个p元素
$('div').first(); //选择第1个div元素
$('div').children(); //选择div的所有子元素
```

**根据参数决定是取值或者赋值：**

```javascript
$('h1').html(); //html()没有参数，表示取出h1的值
$('h1').html('Hello'); //html()有参数Hello，表示对h1进行赋值
.text() 取出或设置text内容
.attr() 取出或设置某个属性的值
.width() 取出或设置某个元素的宽度
.height() 取出或设置某个元素的高度
.val() 取出某个表单元素的值
```

**注意：如果选取了多个元素，那么赋值的时候，将对其中所有的元素赋值；取值的时候，则是只取出第一个元素的值（text除外）。**

## 链式操作

最终选中网页元素后，可以对它进行一系列的操作，所有操作可以连接在一起，以链条的形式写出来。

原理：每一步的jQuery操作，返回的都是一个jQuery对象，所以不同操作可以连在一起。

`$('div').find('h3').eq(2).html('Hello');`

分解出来看，就是：

```javascript
$('div') //找到div元素

　　.find('h3') //选择其中的h3元素

　　.eq(2) //选择第3个h3元素

　　.html('Hello'); //将它的内容改为Hello
```

jQuery还提供了end方法，可以使得对当前元素后退一步得到上一个元素进行操作：

```javascript
$('div')

　　.find('h3')

　　.eq(2)

　　.html('Hello')

　　.end() //退回到选中所有的h3元素的那一步

　　.eq(0) //选中第一个h3元素

　　.html('World'); //将它的内容改为World
```

jQuery函数内部实现后退原理，简易写出来就是：

```javascript
window.jQuery = (selector) => {
    const elements = document.querySelectorAll(selector);
    return {
        oldApi: selector.oldApi,
        addClass(className) {//闭包
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className);
            }
            return this //链式操作
        },
        find(selector) {
            let array = [];
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector));
                array = array.concat(elements2);
            }
            array.oldApi = this; // this 就是 旧 api
            return jQuery(array);
        },
        end() {
            return this.oldApi; // this 就是新 api
        }
    }
}
```

---

## 元素操作

**增**

创建元素的方法非常简单，$(新元素)即可创建元素：

```javascript
let div2 = $('<div>hello</div>');
$('div').append(div2);
//把创建的div2加入到div中
```

**删**

删除元素使用[.remove()](http://api.jquery.com/remove/)和[.detach()](http://api.jquery.com/detach/)。两者的区别在于，前者不保留被删除元素的事件，后者保留，有利于重新插入文档时使用。

清空元素内容（但是不删除该元素）使用[.empty()](http://api.jquery.com/empty/)。

**改**

```javascript
$('div').insertAfter($('p')); //把div元素移动p元素后面,返回div元素
$('p').after($('div'));  //把p元素加到div元素前面,返回p元素
```

方法效果一样，返回的元素不一样。

（关于事件操作后续更新中ing）

---

总结jQuery的设计模式：

* 不用new的构造函数，这个函数没有专门的名字。

* $（支持多种参数），这个模式叫做重载。

* 用闭包隐藏细节，这个模式没有专门的名字//闭包就是函数引用外部元素。

* $div.text()即可读也可写，getter/setter（如果两个参数就只读，3个参数就可以写）。

* $.fn是$.prototype的别名，这叫别名。

* jQuery针对不同浏览器使用不同代码，这叫适配器。

> 本文参考引用于[阮一峰的jQuery设计思想](http://www.ruanyifeng.com/blog/2011/07/jquery_fundamentals.html)



