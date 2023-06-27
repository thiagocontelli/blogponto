'use client'

import { ReactNode } from "react"
import { Tooltip as TooltipBase, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

type Props = {
  children: ReactNode
  tooltip: string
}

export function Tooltip({ children, tooltip }: Props) {
  return (
    <TooltipProvider>
      <TooltipBase>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
        </TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  )
}
