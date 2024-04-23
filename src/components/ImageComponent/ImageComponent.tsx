import { Image } from "@chakra-ui/react"

interface ImageProps {
 url: string
 width: number
 height: number
 scale: number
}

export const ImageComponent = ({ url, width, height, scale }: ImageProps) => {
  return (
    <Image 
      src={url}
      width={`${Math.round(width * scale)}px`}
      height={`${Math.round(height * scale)}px`}
      alt='legend'
      style={{ position: 'absolute', right: '3px', bottom: '3px'}}
  />
  )
}