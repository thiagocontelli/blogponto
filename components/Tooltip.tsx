'use client'

import { ReactNode, useRef } from "react"

type Props = {
  children: ReactNode
  tooltip: string
}

export function Tooltip({ children, tooltip }: Props) {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)
  
  function onMouseEnter({ clientX }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!tooltipRef.current || !container.current) return;

    const { left } = container.current.getBoundingClientRect()
    
    tooltipRef.current.style.left = clientX - left + 'px'
  }
  
  return (
    <div
      ref={container}
      onMouseEnter={onMouseEnter}
      className="group relative inline-block"
    >
      {children}
      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-700 text-white py-1 px-2 text-sm rounded absolute top-full mt-2 whitespace-nowrap"
      >
        {tooltip}
      </span>
    </div>
  )
}
