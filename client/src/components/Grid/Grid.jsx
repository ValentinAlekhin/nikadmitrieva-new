import React from 'react'

import useWindowSize from 'hooks/useWindowSize'
import { breakpoints } from 'style/variables'

import { Wrapper, Column, ColumnItem } from './styled'

const Grid = ({ items }) => {
  const { width } = useWindowSize()

  const getColumnsNum = () => {
    if (width >= breakpoints.xl) {
      return 3
    } else if (width >= breakpoints.sm) {
      return 2
    } else {
      return 1
    }
  }

  const createGrid = () => {
    const columnsNum = getColumnsNum()
    const arrGrid = Array(columnsNum)
      .fill([])
      .map((_, i) => {
        const result = []
        for (let index = i; index < items.length; index += columnsNum) {
          result.push(items[index])
        }
        return result
      })
      .map((el, i) => (
        <Column key={i}>
          {el.map((el2, i2) => (
            <ColumnItem key={i2}>{el2}</ColumnItem>
          ))}
        </Column>
      ))

    return arrGrid
  }

  return <Wrapper>{createGrid()}</Wrapper>
}

export default Grid
