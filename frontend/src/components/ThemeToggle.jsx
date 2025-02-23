import { useTheme } from "@/context/ThemeProvider"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 shadow-md transition-all"
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
