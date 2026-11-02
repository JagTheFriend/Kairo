import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-10 place-items-center rounded-full border border-line text-ink transition hover:bg-surface-alt"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={17} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  )
}
