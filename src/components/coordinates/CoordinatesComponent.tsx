import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Input } from "@chakra-ui/react"
import { fromLonLat, toLonLat } from "ol/proj"

type Coordinates = Array<number> | null

interface CoordinatesComponentProps {
  coordinates: Coordinates
  projection: string
  setCoordinates?: (coords: Coordinates) => void
}

export const CoordinatesComponent: React.FC<CoordinatesComponentProps> = ({coordinates, projection, setCoordinates}: CoordinatesComponentProps) => {
  const [editableLocation, setEditableLocation] = useState<(string)[]>(['', ''])

  const latLonCoordinates = useMemo(() => {
    if (!coordinates) {
      return null
    }
    return toLonLat(coordinates, projection)
  }, [coordinates, projection])

  useEffect(() => {
    if (latLonCoordinates) {
      setEditableLocation((prevValue) => {
        const newValue = [...prevValue]
        let modified = false

        latLonCoordinates.forEach((coord, idx) => {
          const currentCord = Number(prevValue[idx])
          if (Math.abs(coord - currentCord) > 0.0005) {
            newValue[idx] = Number(coord).toFixed(3)
            modified = true
          }
        })

        return modified ? newValue : prevValue
      })
    }
  }, [latLonCoordinates])

  const onChangeConvertedLocation = useCallback((value: string, coordIdx: number) => {
    const newEditableLocation = [...editableLocation]
    newEditableLocation[coordIdx] = value
    setEditableLocation(newEditableLocation)

    if (!setCoordinates) {
      return
    }

    const matchNumberWithDecimal = /^[0-9]+(\.[0-9]*)?$/

    const fullyRealizedLocation = newEditableLocation.filter(n => matchNumberWithDecimal.exec(n)).length === 2

    if (fullyRealizedLocation) {
      const newLocation = fromLonLat(newEditableLocation.map(str => Number(str)), projection)

      const coordsChanged = coordinates ? coordinates.find((coord, idx) => newLocation[idx] !== coord) : true

      if (coordsChanged) {
        setCoordinates(newLocation)
      }
    }
  }, [editableLocation, projection, coordinates, setCoordinates])

  return (<>
    <Input
      type="text"
      width="6em"
      value={editableLocation[0]}
      onChange={(e) => onChangeConvertedLocation(e.target.value, 0)}
    />
    <Input
      type="text"
      width="6em"
      value={editableLocation[1]}
      onChange={(e) => onChangeConvertedLocation(e.target.value, 1)}
    />
  </>)
}
