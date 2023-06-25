'use client'

import { useEffect } from "react"

type Props = {
  content: string
}

export function MarkdownReader({ content }: Props) {
  
  useEffect(() => {
    const parser = new DOMParser()
    const contentParsed = parser.parseFromString(content, 'text/html').body
    const article = document.querySelector('.article')
    article?.appendChild(contentParsed)
  }, [content])

  return (
    <article className="prose article dark:prose-invert max-w-none">
    </article>
  )
}
