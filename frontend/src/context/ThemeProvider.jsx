import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "dark",
  setTheme: () => {},
})

export function ThemeProvider({ children, storageKey = "vite-ui-theme" }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || "dark"
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem(storageKey, theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
