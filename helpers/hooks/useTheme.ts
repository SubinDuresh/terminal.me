import Themes from '~/assets/themes.json'
import { ThemeContext } from '~/types/theme'
import config from '~/assets/config.json'
import { findTheme } from '~/helpers/findTheme'

export const useTheme = (): ThemeContext => {
  const theme = ref((config.theme && findTheme(config.theme)) || Themes[0])

  const setTheme = async (themeName: string) => {
    const index = Themes.findIndex((_theme) => {
      return _theme.name.toLowerCase() === themeName.toLowerCase()
    })

    if (index === -1) {
      return `Theme '${themeName}' is not exists. Try 'theme ls' to list available themes.`
    }

    theme.value = Themes[index]

    if (!process.server) localStorage.setItem('theme', themeName)

    await nextTick(() => {})
  }

  return [theme, setTheme]
}
