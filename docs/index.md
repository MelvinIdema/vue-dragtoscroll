---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "VueDragToScroll"
  text: "A Vue composable for drag to scroll."
  tagline: "A minimal styled, configurable Vue composable to easily implement drag scroll."
  actions:
    - theme: brand
      text: Composable
      link: /composable
    - theme: alt
      text: Directive
      link: /directive
  image:
    src: /VueDragToScroll-logo-v1.svg
    alt: VueDragToScroll

features:
  - title: Composable
    details: Easy to use, configurable composable for plug-and-play
  - title: Directive
    details: An even easier to use, not configurable directive for the small use-cases
---

<style>
  :root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #42b883 30%,
    #35495e
  );

  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #42b883 50%,
    #35495e 50%
  );

  --vp-button-brand-bg: hsl(166, 50%, 50%);
  --vp-button-brand-hover-bg: hsl(166, 50%, 35%);
}
</style>