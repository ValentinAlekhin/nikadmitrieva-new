import React from 'react'

import { Wrapper, Letter } from './styled'

const IridescentText = ({ text }) => {
  return (
    <Wrapper>
      {text.split('').map((letter, i) => (
        <Letter key={i}>{letter}</Letter>
      ))}
    </Wrapper>
  )
}

export default IridescentText
