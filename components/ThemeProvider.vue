<script setup lang="ts">
import Themes from '~/assets/themes.json'
import config from '~/assets/config.json'
import { findTheme } from '~/helpers/findTheme'
import { ThemeContext } from '~/types/theme'

const theme = ref((config.theme && findTheme(config.theme)) || Themes[0])

const setTheme = (themeName: string) => {
  const index = Themes.findIndex((_theme) => {
    return _theme.name.toLowerCase() === themeName.toLowerCase()
  })

  if (index === -1) {
    return `Theme '${themeName}' is not exists. Try 'theme ls' to list available themes.`
  }
  theme.value = Themes[index]

  if (!process.server) localStorage.setItem('theme', themeName)

  nextTick(() => {})
}

// setTheme after mounted
onMounted(() => {
  if (!process.server) {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      setTheme(savedTheme)
    }
  }
})

provide('theme', { theme, setTheme } as ThemeContext)
</script>

<template>
  <slot></slot>
</template>
