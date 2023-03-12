---
title: HTTP缓存
date: 2023-01-31
tags:
 - HTTP
categories:
 - 前端
---

## HTTP的缓存有哪些方案

> [参考博客](https://blog.csdn.net/wyouwd1/article/details/123469152)

浏览器缓存分为**强缓存**和**协商缓存**。当客户端请求某个资源时，获取缓存的流程如下

*  先根据这个资源的一些 http header 判断它是否命中强缓存，先检查`Cache-Control`，如果命中，则直接从本地获取缓存资源，不会发请求到服务器；
*  当强缓存没有命中时，客户端会发送请求到服务器，服务器通过另一些request header验证这个资源是否命中协商缓存，称为http再验证，如果命中，服务器将请求返回，但不返回资源，而是返回304告诉客户端直接从缓存中获取，客户端收到返回后就会从缓存中获取资源；（服务器通过请求头中的`If-Modified-Since`或者`If-None-Match`字段检查资源是否更新）
*  强缓存和协商缓存共同之处在于，如果命中缓存，服务器都不会返回资源； 区别是，强缓存不会发送请求到服务器，但协商缓存会。
*  当协商缓存也没命中时，服务器就会将资源发送回客户端。
*  当 ctrl+f5 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
*  当 f5刷新网页时，跳过强缓存，但是会检查协商缓存；

**强缓存**

*  Expires（该字段是 http1.0 时的规范，值为一个绝对时间的 GMT 格式的时间字符串，代表缓存资源的过期时间）
*  Cache-Control:max-age（该字段是 http1.1的规范，强缓存利用其 max-age 值来判断缓存资源的最大生命周期，它的值单位为秒）

（如果同时出现`Cache-Control：max-age`和`Expires`，那么`max-age`优先级更高，因为`Expires`是绝对时间 如果用户的本地时间错乱了 可能会有问题，`max-age` 是相对时间 和本地时间无关）

**协商缓存**

*  Last-Modified（值为资源最后更新时间，随服务器response返回，即使文件改回去，日期也会变化）
*  If-Modified-Since（通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有修改，则命中协商缓存）
*  ETag（表示资源内容的唯一标识，随服务器response返回，仅根据文件内容是否变化判断）
*  If-None-Match（服务器通过比较请求头部的If-None-Match与当前资源的ETag是否一致来判断资源是否在两次请求之间有过修改，如果没有修改，则命中协商缓存）

**不会缓存的情况**

1. HTTP 信息头中包含 Cache-Control:no-cache ，pragma:no-cache（HTTP1.0），或 Cache-Control: max-age=0 等告诉浏览器不用缓存的请求；

2. 需要根据 Cookie，认证信息等决定输入内容的动态请求是不能被缓存的；

3. 经过 HTTPS 安全加密的请求；

4. POST 请求无法被缓存；

5. HTTP 响应头中不包含 Last-Modified/Etag，也不包含 Cache-Control/Expires 的请求无法被缓存；
