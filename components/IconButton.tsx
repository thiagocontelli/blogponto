'use client'

import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  href?: string
  children: ReactNode
  sr?: string
  onClick?: () => void
}

export default function IconButton({ href, children, sr, onClick }: Props) {
  return (
    <Link
      className="dark:text-gray-300 flex rounded text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
      href={href || ''}
      onClick={onClick}
    >
      <span className="sr-only">{sr}</span>
      {children}
    </Link>
  )
}
