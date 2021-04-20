import React from 'react'

import {
  Wrapper,
  StyledProgressiveImg,
  Overlay,
  OverlayContent,
  IconBackground,
  PlusIcon,
  FullscreenIcon,
  Title,
} from './styled'

export interface SeriesCardProps {
  title?: string
  image: any
  icon: 'plus' | 'fullscreen'
  key?: string | number
}

const imageBreakpoints = [
  { imageWidth: 600, windowWidth: 480 },
  { imageWidth: 1000, windowWidth: 768 },
  { imageWidth: 600, windowWidth: 992 },
  { imageWidth: 600, windowWidth: 1200 },
  { imageWidth: 600, windowWidth: 1400 },
  { imageWidth: 600, windowWidth: 2000 },
]

const SeriesCard = ({ title, image, icon }: SeriesCardProps) => {
  const createSrcSet = (src: string) =>
    imageBreakpoints
      .map(
        ({ imageWidth, windowWidth }) =>
          `${src}?width=${imageWidth} ${windowWidth}w`
      )
      .join(',\n')

  return (
    <Wrapper>
      <StyledProgressiveImg
        placeholder={image.placeholder}
        webp={createSrcSet(image.webp)}
        jpg={createSrcSet(image.jpg)}
        defaultImg={image.jpg}
      />
      <Overlay>
        <OverlayContent>
          <IconBackground>
            {icon === 'plus' ? <PlusIcon /> : null}
            {icon === 'fullscreen' ? <FullscreenIcon /> : null}
          </IconBackground>
          {title ? <Title>{title}</Title> : null}
        </OverlayContent>
      </Overlay>
    </Wrapper>
  )
}

export default SeriesCard
