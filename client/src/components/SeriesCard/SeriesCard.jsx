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

const SeriesCard = ({ title, titleImage }) => {
  return (
    <Wrapper>
      <StyledProgressiveImg
        placeholder={titleImage.placeholder}
        webp={titleImage.webpSrcSet}
        jpg={titleImage.jpgSrcSet}
        defaultImg={titleImage.jpeg[0].src}
      />
      <Overlay>
        <OverlayContent>
          <IconBackground>
            <PlusIcon />
          </IconBackground>
          <Title>{title}</Title>
        </OverlayContent>
      </Overlay>
    </Wrapper>
  )
}

export default SeriesCard
