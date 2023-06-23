'use client'

import { useEffect } from "react"

type Props = {
  content: string
}

export function MdReader({ content }: Props) {
  
  useEffect(() => {
    const parser = new DOMParser()
    const contentParsed = parser.parseFromString(content, 'text/html').body
    const article = document.querySelector('.article')
    article?.appendChild(contentParsed)
  }, [])

  return (
    <article className="prose article mx-auto dark:prose-invert">
    </article>
  )
}
