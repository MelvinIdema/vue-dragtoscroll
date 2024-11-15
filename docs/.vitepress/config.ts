import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue-dragtoscroll/',
  title: "VueDragToScroll",
  description: "A Vue composable for drag to scroll.",
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Usage',
        items: [
          { text: 'Composable', link: '/composable' },
          { text: 'Directive', link: '/directive' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/melvinidema/vue-dragtoscroll' }
    ]
  }
})
