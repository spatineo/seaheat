import { Image } from "@chakra-ui/react"

interface LegendProps {
 url: string
 width: number
 height: number
 scale: number
}

export const LegendComponent = ({ url, width, height, scale }: LegendProps) => {
  return (
    <Image 
      src={url}
      width={`${Math.round(width * scale)}px`}
      height={`${Math.round(height * scale)}px`}
      alt='legend'
      style={{ position: 'absolute', right: '3px', bottom: '3px', zIndex: 100}}
  />
  )
}