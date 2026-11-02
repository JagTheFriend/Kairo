import { useEffect } from 'react'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Kairo` : 'Kairo — Plans worth making.'
  }, [title])
}
