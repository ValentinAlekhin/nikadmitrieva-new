import React from 'react'

import {
  Wrapper,
  StyledProgressiveImg,
  Overlay,
  OverlayContent,
  IconBackground,
  PlusIcon,
  Title,
} from './styled'

export interface SeriesCardProps {
  title?: string
  image: any
  key?: string | number
}

const SeriesCard = ({ title, image }: SeriesCardProps) => {
  return (
    <Wrapper>
      <StyledProgressiveImg
        placeholder={image.placeholder}
        webp={image.webp}
        jpg={image.jpg}
        defaultImg={image.jpg}
      />
      <Overlay>
        <OverlayContent>
          <IconBackground>
            <PlusIcon />
          </IconBackground>
          {title ? <Title>{title}</Title> : null}
        </OverlayContent>
      </Overlay>
    </Wrapper>
  )
}

export default SeriesCard
