import React from "react"
import { Image } from "@chakra-ui/react"

interface LegendProps {
  legend: {
    url: string
    width: number
    height: number
    scale: number
  }
}

export const LegendComponent: React.FC<LegendProps> = ({ legend }: LegendProps) => {
  return (
    <Image
      src={legend.url}
      width={`${Math.round(legend.width * legend.scale)}px`}
      height={`${Math.round(legend.height * legend.scale)}px`}
      alt='legend'
      style={{ position: 'absolute', left: '8px', bottom: '36px', zIndex: 100, pointerEvents: 'none' }}
    />
  )
}
