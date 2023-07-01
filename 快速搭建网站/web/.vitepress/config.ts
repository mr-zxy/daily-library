import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "快速搭建网站",
  description: "2小时让你的网站上线",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '我的网站', link: '/website' },
      { text: '我的直播间', link: '/live' }
    ],

    sidebar: [
      {
        text: '菜单',
        items: [
          { text: '我的网站', link: '/website' },
          { text: '我的直播间', link: '/live' }
        ]
      }
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
