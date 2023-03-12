const sidebar = require('./siderbar.js');
console.log('sidebar: ', sidebar);
module.exports = {
  "title": "xiaolinzi",
  "description": "学无止境，越学越有劲~",
  "dest": "public",
  "base": "/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "plugins": [
    ["@vuepress-reco/vuepress-plugin-comments"],
    ["vuepress-plugin-meting"],
    [
      "sakura",
      {
        num: 5, // 默认20
        show: true, //  是否显示
        zIndex: -1, // 层级
        img: {
          replace: false, // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: '...' // 绝对路径
        },
      },
    ],
    [
      "cursor-effects",
      {
        size: 4, // size of the particle, default: 2
        shape: "circle", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        audios: [
          {
            name: "See You Again",
            artist: "Wiz Khalifa",
            url: "/bgm/See You Again.mp3",
            cover: "/bgm/See You Again.png",
          },
          {
            name: "幻听",
            artist: "许嵩",
            url: "/bgm/幻听.mp3",
            cover: "/bgm/幻听.png",
          },
        ],
        // 是否默认播放
        autoplay: false,
        // 是否默认缩小
        autoShrink: true,
        // 缩小时缩为哪种模式
        shrinkMode: "float",
        // 悬浮窗样式
        floatStyle: { bottom: "20px", "z-index": "999999" },
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "mode": 'light',
    "subSidebar": 'auto',
    "valineConfig": {
      "appId": 'RJ122P14nBKdEewpadr6TA4V-gzGzoHsz',
      "appKey": 'zJKTzQh4IyXLSkPRQOoLypjT',
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      { "text": 'About', "link": '/blogs/views/messageBoard.html', "icon": 'reco-suggestion' },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/xiaolinzi7118",
            "icon": "reco-github"
          }
        ]
      }
    ],
    sidebar,
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/avatar.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "xiaolinzi",
    "authorAvatar": "/avatar.jpg",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  }
}
