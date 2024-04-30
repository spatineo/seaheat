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

export const LegendComponent = ({ legend }: LegendProps) => {
  return (
    <Image
      src={legend.url}
      width={`${Math.round(legend.width * legend.scale)}px`}
      height={`${Math.round(legend.height * legend.scale)}px`}
      alt='legend'
      style={{ position: 'absolute', right: '3px', bottom: '3px', zIndex: 100 }}
    />
  )
}
