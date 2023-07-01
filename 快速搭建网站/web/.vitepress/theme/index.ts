// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

// 添加用的的刷新量

try{
  process
}catch(e){
  fetch("https://leisurely.cc/api/website/updateOnline")
}

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
